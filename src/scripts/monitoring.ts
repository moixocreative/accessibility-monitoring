#!/usr/bin/env ts-node

import { PortfolioMonitor } from '../monitoring/portfolio-monitor';
import { EmergencyResponse } from '../emergency/emergency-response';
import { logger } from '../utils/logger';

async function main() {
  logger.info('Iniciando sistema de monitorização de acessibilidade UNTILE');

  const portfolioMonitor = new PortfolioMonitor();
  const emergencyResponse = new EmergencyResponse();

  try {
    // Iniciar monitorização contínua
    portfolioMonitor.startMonitoring();

    // Verificar SLA breaches
    const slaBreaches = emergencyResponse.checkSLABreaches();
    if (slaBreaches.length > 0) {
      logger.warn(`${slaBreaches.length} incidentes com SLA excedido`);
    }

    // Executar auditoria inicial
    await portfolioMonitor.runPortfolioAudit();

    // Manter processo ativo
    process.on('SIGINT', async () => {
      logger.info('Recebido sinal de paragem, limpando recursos...');
      await portfolioMonitor.cleanup();
      process.exit(0);
    });

    logger.info('Sistema de monitorização ativo');

  } catch (error) {
    logger.error('Erro no sistema de monitorização:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    logger.error('Erro fatal:', error);
    process.exit(1);
  });
} 