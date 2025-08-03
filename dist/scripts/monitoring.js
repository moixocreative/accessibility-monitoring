#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const portfolio_monitor_1 = require("../monitoring/portfolio-monitor");
const emergency_response_1 = require("../emergency/emergency-response");
const logger_1 = require("../utils/logger");
async function main() {
    logger_1.logger.info('Iniciando sistema de monitorização de acessibilidade UNTILE');
    const portfolioMonitor = new portfolio_monitor_1.PortfolioMonitor();
    const emergencyResponse = new emergency_response_1.EmergencyResponse();
    try {
        portfolioMonitor.startMonitoring();
        const slaBreaches = emergencyResponse.checkSLABreaches();
        if (slaBreaches.length > 0) {
            logger_1.logger.warn(`${slaBreaches.length} incidentes com SLA excedido`);
        }
        await portfolioMonitor.runPortfolioAudit();
        process.on('SIGINT', async () => {
            logger_1.logger.info('Recebido sinal de paragem, limpando recursos...');
            await portfolioMonitor.cleanup();
            process.exit(0);
        });
        logger_1.logger.info('Sistema de monitorização ativo');
    }
    catch (error) {
        logger_1.logger.error('Erro no sistema de monitorização:', error);
        process.exit(1);
    }
}
if (require.main === module) {
    main().catch(error => {
        logger_1.logger.error('Erro fatal:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=monitoring.js.map