"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const logger_1 = require("../utils/logger");
class NotificationService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || 'accessibility@untile.pt',
                pass: process.env.SMTP_PASS || 'password'
            }
        });
    }
    async sendEmergencyAlert(alert) {
        const subject = `[${alert.level}] ${alert.title}`;
        const html = this.generateEmergencyEmail(alert);
        try {
            await this.sendEmail({
                to: process.env.EMERGENCY_EMAIL || 'emergency@untile.pt',
                subject,
                html
            });
            if (process.env.SLACK_WEBHOOK_URL) {
                await this.sendSlackNotification(alert);
            }
            logger_1.logger.info('Alerta de emergência enviado', {
                level: alert.level,
                title: alert.title,
                sites: alert.sites.length
            });
        }
        catch (error) {
            logger_1.logger.error('Erro ao enviar alerta de emergência:', error);
            throw error;
        }
    }
    async sendMaintenanceAlert(alert) {
        const subject = `[MANUTENÇÃO] ${alert.title}`;
        const html = this.generateMaintenanceEmail(alert);
        try {
            await this.sendEmail({
                to: process.env.MAINTENANCE_EMAIL || 'maintenance@untile.pt',
                subject,
                html
            });
            logger_1.logger.info('Alerta de manutenção enviado', {
                title: alert.title,
                sites: alert.sites.length
            });
        }
        catch (error) {
            logger_1.logger.error('Erro ao enviar alerta de manutenção:', error);
            throw error;
        }
    }
    async sendAuthorityNotification(communication) {
        try {
            await this.sendEmail({
                to: communication.recipient,
                subject: communication.subject,
                html: communication.content
            });
            logger_1.logger.info('Notificação enviada para autoridade', {
                communicationId: communication.id,
                recipient: communication.recipient
            });
        }
        catch (error) {
            logger_1.logger.error('Erro ao enviar notificação para autoridade:', error);
            throw error;
        }
    }
    async sendEmail(options) {
        const mailOptions = {
            from: process.env.SMTP_FROM || 'accessibility@untile.pt',
            to: options.to,
            subject: options.subject,
            html: options.html
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendSlackNotification(alert) {
        try {
            const webhookUrl = process.env.SLACK_WEBHOOK_URL;
            if (!webhookUrl)
                return;
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
            logger_1.logger.info('Notificação Slack preparada', payload);
        }
        catch (error) {
            logger_1.logger.error('Erro ao enviar notificação Slack:', error);
        }
    }
    generateEmergencyEmail(alert) {
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
    generateMaintenanceEmail(alert) {
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
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification-service.js.map