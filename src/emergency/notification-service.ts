import nodemailer from 'nodemailer';
import { logger } from '../utils/logger';

interface EmergencyAlertOptions {
  title: string;
  description: string;
  severity: 'P0' | 'P1' | 'P2';
  url?: string;
  violations?: string[];
}

interface MaintenanceAlertOptions {
  title: string;
  description: string;
  action: string;
  url?: string;
}

export class NotificationService {
  private transporter: nodemailer.Transporter;
  private isTestMode: boolean;
  private shouldSendEmails: boolean;

  constructor() {
    this.isTestMode = process.env.NODE_ENV === 'test' || process.env.CI === 'true';
    this.shouldSendEmails = process.env.SEND_EMAILS !== 'false';
    
    // Criar mock transporter se em modo teste ou se emails estão desabilitados
    if (this.isTestMode || !this.shouldSendEmails) {
      this.transporter = {
        sendMail: async (options: any) => {
          logger.info('📧 EMAIL SIMULADO (Test Mode)', {
            to: options.to,
            subject: options.subject,
            from: options.from
          });
          return { messageId: 'test-message-id' };
        }
      } as any;
    } else {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER || 'your_smtp_user@example.com',
          pass: process.env.SMTP_PASS || 'your_smtp_password_here'
        }
      });
    }
  }

  async sendEmergencyAlert(options: EmergencyAlertOptions): Promise<void> {
    const subject = `[${options.severity}] Alerta de Emergência - ${options.title}`;
    const html = this.generateEmergencyTemplate(options);

    try {
      // Enviar para equipa de emergência
      await this.sendEmail({
        to: process.env.EMERGENCY_EMAIL || 'your_emergency_email@example.com',
        subject,
        html
      });

      logger.info(`Alerta de emergência ${options.severity} enviado`, {
        title: options.title,
        severity: options.severity
      });
    } catch (error) {
      logger.error('Erro ao enviar alerta de emergência:', error);
      // Não lançar erro em modo teste
      if (!this.isTestMode) {
        throw error;
      }
    }
  }

  async sendMaintenanceAlert(options: MaintenanceAlertOptions): Promise<void> {
    const subject = `[MANUTENÇÃO] ${options.title}`;
    const html = this.generateMaintenanceTemplate(options);

    try {
      await this.sendEmail({
        to: process.env.MAINTENANCE_EMAIL || process.env.EMERGENCY_EMAIL || 'your_maintenance_email@example.com',
        subject,
        html
      });

      logger.info('Alerta de manutenção enviado', {
        title: options.title,
        action: options.action
      });
    } catch (error) {
      logger.error('Erro ao enviar alerta de manutenção:', error);
      // Não lançar erro em modo teste
      if (!this.isTestMode) {
        throw error;
      }
    }
  }

  async sendAuthorityNotification(incident: any): Promise<void> {
    const subject = `[URGENTE] Violação Acessibilidade Digital - ${incident.title}`;
    const html = this.generateAuthorityTemplate(incident);

    try {
      await this.sendEmail({
        to: process.env.AUTHORITY_EMAIL || 'your_authority_email@example.com',
        subject,
        html
      });

      logger.info('Notificação para autoridade enviada', {
        incidentId: incident.id,
        title: incident.title
      });
    } catch (error) {
      logger.error('Erro ao enviar notificação para autoridade:', error);
      // Não lançar erro em modo teste
      if (!this.isTestMode) {
        throw error;
      }
    }
  }

  private async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<void> {
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER || 'your_smtp_from@example.com',
      to: options.to,
      subject: options.subject,
      html: options.html
    };

    await this.transporter.sendMail(mailOptions);
  }

  private generateEmergencyTemplate(options: EmergencyAlertOptions): string {
    const severityColor = {
      P0: '#ff0000',
      P1: '#ff6600',
      P2: '#ffcc00'
    };

    const severityText = {
      P0: 'CRÍTICO',
      P1: 'ALTO',
      P2: 'MÉDIO'
    };

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Alerta de Emergência</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .header { background-color: ${severityColor[options.severity]}; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .severity { background-color: ${severityColor[options.severity]}; color: white; padding: 10px; display: inline-block; }
            .footer { background-color: #f5f5f5; padding: 20px; margin-top: 20px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚨 ALERTA DE EMERGÊNCIA</h1>
            <div class="severity">${severityText[options.severity]}</div>
        </div>
        
        <div class="content">
            <h2>${options.title}</h2>
            <p><strong>Descrição:</strong> ${options.description}</p>
            
            ${options.url ? `<p><strong>URL:</strong> <a href="${options.url}">${options.url}</a></p>` : ''}
            
            ${options.violations && options.violations.length > 0 ? `
            <h3>Violations Detected:</h3>
            <ul>
                ${options.violations.map(v => `<li>${v}</li>`).join('')}
            </ul>
            ` : ''}
            
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString('pt-PT')}</p>
        </div>
        
        <div class="footer">
            <p><strong>UNTILE Accessibility Monitoring System</strong></p>
            <p>Email: ${process.env.SMTP_USER || 'your_smtp_user@example.com'} | Telefone: ${process.env.EMERGENCY_PHONE || '+351-XXX-XXX-XXX'}</p>
            <p>Este é um alerta automático. Não responda a este email.</p>
        </div>
    </body>
    </html>
    `.trim();
  }

  private generateMaintenanceTemplate(options: MaintenanceAlertOptions): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Alerta de Manutenção</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .header { background-color: #0066cc; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .action { background-color: #e6f3ff; padding: 15px; border-left: 4px solid #0066cc; }
            .footer { background-color: #f5f5f5; padding: 20px; margin-top: 20px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🔧 ALERTA DE MANUTENÇÃO</h1>
        </div>
        
        <div class="content">
            <h2>${options.title}</h2>
            <p><strong>Descrição:</strong> ${options.description}</p>
            
            ${options.url ? `<p><strong>URL:</strong> <a href="${options.url}">${options.url}</a></p>` : ''}
            
            <div class="action">
                <h3>Ação Necessária:</h3>
                <p>${options.action}</p>
            </div>
            
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString('pt-PT')}</p>
        </div>
        
        <div class="footer">
            <p><strong>UNTILE Accessibility Monitoring System</strong></p>
            <p>Email: ${process.env.SMTP_USER || 'your_smtp_user@example.com'}</p>
            <p>Este é um alerta automático. Não responda a este email.</p>
        </div>
    </body>
    </html>
    `.trim();
  }

  private generateAuthorityTemplate(incident: any): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Notificação para Autoridade</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .header { background-color: #cc0000; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .incident { background-color: #fff5f5; padding: 15px; border-left: 4px solid #cc0000; }
            .footer { background-color: #f5f5f5; padding: 20px; margin-top: 20px; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🚨 NOTIFICAÇÃO PARA AUTORIDADE</h1>
        </div>
        
        <div class="content">
            <h2>Violation de Acessibilidade Digital</h2>
            
            <div class="incident">
                <h3>Detalhes do Incidente:</h3>
                <p><strong>ID:</strong> ${incident.id}</p>
                <p><strong>Título:</strong> ${incident.title}</p>
                <p><strong>Descrição:</strong> ${incident.description}</p>
                <p><strong>Severidade:</strong> ${incident.severity}</p>
                <p><strong>URL:</strong> ${incident.url || 'N/A'}</p>
                <p><strong>Data/Hora:</strong> ${new Date().toLocaleString('pt-PT')}</p>
            </div>
            
            <h3>Medidas Tomadas:</h3>
            <ul>
                <li>Notificação imediata da equipa técnica</li>
                <li>Início do processo de correção</li>
                <li>Monitorização contínua da situação</li>
            </ul>
            
            <h3>Próximos Passos:</h3>
            <ul>
                <li>Correção das violações identificadas</li>
                <li>Validação da conformidade</li>
                <li>Relatório de resolução</li>
            </ul>
        </div>
        
        <div class="footer">
            <h3>CONTACTO TÉCNICO</h3>
            
            Responsável técnico: [Nome]
            Email: ${process.env.SMTP_USER || 'your_smtp_user@example.com'}
            Telefone: ${process.env.EMERGENCY_PHONE || '+351-XXX-XXX-XXX'}
            Disponibilidade: 24/7 para questões de acessibilidade
            
            Permanecemos à disposição para esclarecimentos adicionais.
            
            Cumprimentos,
            [Nome] - [Título]
            UNTILE | ${process.env.SMTP_USER || 'your_smtp_user@example.com'}
        </div>
    </body>
    </html>
    `.trim();
  }
} 