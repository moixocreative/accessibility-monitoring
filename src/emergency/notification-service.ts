import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';
import { EmergencyCommunication } from '../types';

interface EmergencyAlert {
  level: 'P0' | 'P1' | 'P2';
  title: string;
  description: string;
  sites: string[];
  violations: any[];
  deadline: Date;
}

interface MaintenanceAlert {
  title: string;
  description: string;
  sites: string[];
  violations: any[];
  deadline: Date;
}

export class NotificationService {
  private transporter: nodemailer.Transporter;
  private isTestMode: boolean;
  private shouldSendEmails: boolean;

  constructor() {
    this.isTestMode = process.env.NODE_ENV === 'test' || process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
    this.shouldSendEmails = process.env.SEND_EMAILS === 'true' || false;
    
    if (this.isTestMode || !this.shouldSendEmails) {
      // Em modo de teste ou quando emails estão desabilitados, criar um transporter mock
      this.transporter = {
        sendMail: async () => {
          logger.info('SIMULAÇÃO: Email simulado enviado (SEND_EMAILS=false ou modo de teste)');
          return Promise.resolve();
        }
      } as any;
    } else {
      // Em produção com emails habilitados, usar configuração real
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER || 'accessibility@untile.pt',
          pass: process.env.SMTP_PASS || 'password'
        }
      });
    }
  }

  /**
   * Enviar alerta de emergência
   */
  async sendEmergencyAlert(alert: EmergencyAlert): Promise<void> {
    const subject = `[${alert.level}] ${alert.title}`;
    const html = this.generateEmergencyEmail(alert);

    try {
      if (this.isTestMode || !this.shouldSendEmails) {
        // Em modo de teste ou quando emails estão desabilitados, apenas logar
        logger.info('SIMULAÇÃO: Alerta de emergência simulado (SEND_EMAILS=false ou modo de teste)', {
          level: alert.level,
          title: alert.title,
          sites: alert.sites.length,
          violations: alert.violations.length
        });
        return;
      }

      // Enviar para equipa de emergência
      await this.sendEmail({
        to: process.env.EMERGENCY_EMAIL || 'emergency@untile.pt',
        subject,
        html
      });

      // Enviar para Slack se configurado
      if (process.env.SLACK_WEBHOOK_URL) {
        await this.sendSlackNotification(alert);
      }

      logger.info('Alerta de emergência enviado', {
        level: alert.level,
        title: alert.title,
        sites: alert.sites.length
      });

    } catch (error) {
      logger.error('Erro ao enviar alerta de emergência:', error);
      // Em modo de teste ou quando emails estão desabilitados, não lançar erro
      if (!this.isTestMode && this.shouldSendEmails) {
        throw error;
      }
    }
  }

  /**
   * Enviar alerta de manutenção
   */
  async sendMaintenanceAlert(alert: MaintenanceAlert): Promise<void> {
    const subject = `[MANUTENÇÃO] ${alert.title}`;
    const html = this.generateMaintenanceEmail(alert);

    try {
      if (this.isTestMode || !this.shouldSendEmails) {
        // Em modo de teste ou quando emails estão desabilitados, apenas logar
        logger.info('SIMULAÇÃO: Alerta de manutenção simulado (SEND_EMAILS=false ou modo de teste)', {
          title: alert.title,
          sites: alert.sites.length,
          violations: alert.violations.length
        });
        return;
      }

      await this.sendEmail({
        to: process.env.MAINTENANCE_EMAIL || 'maintenance@untile.pt',
        subject,
        html
      });

      logger.info('Alerta de manutenção enviado', {
        title: alert.title,
        sites: alert.sites.length
      });

    } catch (error) {
      logger.error('Erro ao enviar alerta de manutenção:', error);
      // Em modo de teste ou quando emails estão desabilitados, não lançar erro
      if (!this.isTestMode && this.shouldSendEmails) {
        throw error;
      }
    }
  }

  /**
   * Enviar notificação para autoridade
   */
  async sendAuthorityNotification(communication: EmergencyCommunication): Promise<void> {
    try {
      if (this.isTestMode || !this.shouldSendEmails) {
        // Em modo de teste ou quando emails estão desabilitados, apenas logar
        logger.info('SIMULAÇÃO: Notificação para autoridade simulada (SEND_EMAILS=false ou modo de teste)', {
          communicationId: communication.id,
          recipient: communication.recipient,
          subject: communication.subject
        });
        return;
      }

      await this.sendEmail({
        to: communication.recipient,
        subject: communication.subject,
        html: communication.content
      });

      logger.info('Notificação enviada para autoridade', {
        communicationId: communication.id,
        recipient: communication.recipient
      });

    } catch (error) {
      logger.error('Erro ao enviar notificação para autoridade:', error);
      // Em modo de teste ou quando emails estão desabilitados, não lançar erro
      if (!this.isTestMode && this.shouldSendEmails) {
        throw error;
      }
    }
  }

  /**
   * Enviar email
   */
  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_FROM || 'accessibility@untile.pt',
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Enviar notificação Slack
   */
  private async sendSlackNotification(alert: EmergencyAlert): Promise<void> {
    try {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL;
      if (!webhookUrl) return;

      const color = alert.level === 'P0' ? '#ff0000' : alert.level === 'P1' ? '#ffaa00' : '#ffff00';
      
      const payload = {
        attachments: [{
          color,
          title: `🚨 ${alert.title}`,
          text: alert.description,
          fields: [
            {
              title: 'Nível',
              value: alert.level,
              short: true
            },
            {
              title: 'Sites Afetados',
              value: alert.sites.length.toString(),
              short: true
            },
            {
              title: 'Violações',
              value: alert.violations.length.toString(),
              short: true
            },
            {
              title: 'Deadline',
              value: alert.deadline.toLocaleString('pt-PT'),
              short: true
            }
          ],
          footer: 'UNTILE Accessibility Monitoring System'
        }]
      };

      // Em produção, usar axios ou fetch para enviar para Slack
      logger.info('Notificação Slack preparada', payload);

    } catch (error) {
      logger.error('Erro ao enviar notificação Slack:', error);
    }
  }

  /**
   * Gerar email de emergência
   */
  private generateEmergencyEmail(alert: EmergencyAlert): string {
    const violationsList = alert.violations
      .map(v => `<li><strong>${v.criteria?.name || 'Violação'}</strong>: ${v.description}</li>`)
      .join('');

    const sitesList = alert.sites.map(site => `<li>${site}</li>`).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Alerta de Emergência - Acessibilidade</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { background-color: ${alert.level === 'P0' ? '#ff0000' : alert.level === 'P1' ? '#ffaa00' : '#ffff00'}; 
                  color: white; padding: 20px; border-radius: 5px; }
        .content { margin: 20px 0; }
        .section { margin: 15px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; }
        .deadline { background-color: #f0f0f0; padding: 10px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🚨 ALERTA DE EMERGÊNCIA - ${alert.level}</h1>
        <h2>${alert.title}</h2>
    </div>

    <div class="content">
        <div class="section">
            <h3>Descrição</h3>
            <p>${alert.description}</p>
        </div>

        <div class="section">
            <h3>Sites Afetados</h3>
            <ul>${sitesList}</ul>
        </div>

        <div class="section">
            <h3>Violações Detectadas</h3>
            <ul>${violationsList}</ul>
        </div>

        <div class="section">
            <h3>Deadline SLA</h3>
            <div class="deadline">
                <strong>${alert.deadline.toLocaleString('pt-PT')}</strong>
                <br>
                ${alert.level === 'P0' ? 'SLA: 2 horas' : alert.level === 'P1' ? 'SLA: 8 horas' : 'SLA: 24 horas'}
            </div>
        </div>

        <div class="section">
            <h3>Ações Imediatas</h3>
            <ol>
                <li>Verificar violações identificadas</li>
                <li>Implementar correções prioritárias</li>
                <li>Validar conformidade WCAG 2.1 AA</li>
                <li>Atualizar status do incidente</li>
            </ol>
        </div>
    </div>

    <div class="footer">
        <p><strong>UNTILE Accessibility Monitoring System</strong></p>
        <p>Email: accessibility@untile.pt | Telefone: ${process.env.EMERGENCY_PHONE || '+351-XXX-XXX-XXX'}</p>
        <p>Este é um alerta automático. Não responda a este email.</p>
    </div>
</body>
</html>
    `.trim();
  }

  /**
   * Gerar email de manutenção
   */
  private generateMaintenanceEmail(alert: MaintenanceAlert): string {
    const violationsList = alert.violations
      .map(v => `<li><strong>${v.criteria?.name || 'Violação'}</strong>: ${v.description}</li>`)
      .join('');

    const sitesList = alert.sites.map(site => `<li>${site}</li>`).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Alerta de Manutenção - Acessibilidade</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .header { background-color: #007bff; color: white; padding: 20px; border-radius: 5px; }
        .content { margin: 20px 0; }
        .section { margin: 15px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; }
        .deadline { background-color: #f0f0f0; padding: 10px; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🔧 ALERTA DE MANUTENÇÃO</h1>
        <h2>${alert.title}</h2>
    </div>

    <div class="content">
        <div class="section">
            <h3>Descrição</h3>
            <p>${alert.description}</p>
        </div>

        <div class="section">
            <h3>Sites Afetados</h3>
            <ul>${sitesList}</ul>
        </div>

        <div class="section">
            <h3>Violações Detectadas</h3>
            <ul>${violationsList}</ul>
        </div>

        <div class="section">
            <h3>Deadline</h3>
            <div class="deadline">
                <strong>${alert.deadline.toLocaleString('pt-PT')}</strong>
                <br>
                SLA: 24 horas
            </div>
        </div>

        <div class="section">
            <h3>Ações Recomendadas</h3>
            <ol>
                <li>Revisar violações identificadas</li>
                <li>Planear correções durante manutenção</li>
                <li>Validar melhorias implementadas</li>
                <li>Atualizar documentação</li>
            </ol>
        </div>
    </div>

    <div class="footer">
        <p><strong>UNTILE Accessibility Monitoring System</strong></p>
        <p>Email: maintenance@untile.pt</p>
        <p>Este é um alerta automático. Não responda a este email.</p>
    </div>
</body>
</html>
    `.trim();
  }
} 