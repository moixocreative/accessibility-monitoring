#!/usr/bin/env ts-node

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { PortfolioMonitor } from './monitoring/portfolio-monitor';
import { EmergencyResponse } from './emergency/emergency-response';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Instâncias dos serviços
const portfolioMonitor = new PortfolioMonitor();
const emergencyResponse = new EmergencyResponse();

// Rotas da API
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    service: 'UNTILE Accessibility Monitoring System'
  });
});

// API do Portfolio
app.get('/api/portfolio/stats', (req, res) => {
  try {
    const stats = portfolioMonitor.getPortfolioStats();
    res.json(stats);
  } catch (error) {
    logger.error('Erro ao obter estatísticas do portfolio:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/portfolio/sites', (req, res) => {
  try {
    const sites = portfolioMonitor.getSites();
    res.json(sites);
  } catch (error) {
    logger.error('Erro ao obter sites do portfolio:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/portfolio/audit', async (req, res) => {
  try {
    await portfolioMonitor.runPortfolioAudit();
    const stats = portfolioMonitor.getPortfolioStats();
    res.json({
      message: 'Auditoria do portfolio concluída',
      stats
    });
  } catch (error) {
    logger.error('Erro na auditoria do portfolio:', error);
    res.status(500).json({ error: 'Erro na auditoria do portfolio' });
  }
});

// API de Emergência
app.get('/api/emergency/incidents', (req, res) => {
  try {
    const activeIncidents = emergencyResponse.getActiveIncidents();
    res.json(activeIncidents);
  } catch (error) {
    logger.error('Erro ao obter incidentes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/emergency/report', (req, res) => {
  try {
    const report = emergencyResponse.generateEmergencyReport();
    res.json(report);
  } catch (error) {
    logger.error('Erro ao gerar relatório de emergência:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.post('/api/emergency/incident', async (req, res) => {
  try {
    const incidentData = req.body;
    const incident = await emergencyResponse.createIncident(incidentData);
    res.json(incident);
  } catch (error) {
    logger.error('Erro ao criar incidente:', error);
    res.status(500).json({ error: 'Erro ao criar incidente' });
  }
});

app.put('/api/emergency/incident/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await emergencyResponse.updateIncidentStatus(id, status);
    res.json({ message: 'Status atualizado com sucesso' });
  } catch (error) {
    logger.error('Erro ao atualizar status do incidente:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// API de WCAG
app.get('/api/wcag/criteria', (req, res) => {
  try {
    const { getCriteriaByPriority, getCriteriaByPrinciple } = require('./core/wcag-criteria');
    
    const priority = req.query.priority as string;
    const principle = req.query.principle as string;
    
    let criteria;
    if (priority) {
      criteria = getCriteriaByPriority(priority as any);
    } else if (principle) {
      criteria = getCriteriaByPrinciple(principle as any);
    } else {
      const { PRIORITY_WCAG_CRITERIA } = require('./core/wcag-criteria');
      criteria = PRIORITY_WCAG_CRITERIA;
    }
    
    res.json(criteria);
  } catch (error) {
    logger.error('Erro ao obter critérios WCAG:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// API de Monitorização
app.get('/api/monitoring/status', (req, res) => {
  try {
    const portfolioStats = portfolioMonitor.getPortfolioStats();
    const emergencyReport = emergencyResponse.generateEmergencyReport();
    
    res.json({
      portfolio: portfolioStats,
      emergency: emergencyReport,
      system: {
        status: 'active',
        uptime: process.uptime(),
        timestamp: new Date()
      }
    });
  } catch (error) {
    logger.error('Erro ao obter status do sistema:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota de documentação
app.get('/', (req, res) => {
  res.json({
    name: 'UNTILE Accessibility Monitoring System',
    version: '1.0.0',
    description: 'Sistema de monitorização de acessibilidade para conformidade WCAG 2.1 AA',
    endpoints: {
      health: '/health',
      portfolio: {
        stats: '/api/portfolio/stats',
        sites: '/api/portfolio/sites',
        audit: 'POST /api/portfolio/audit'
      },
      emergency: {
        incidents: '/api/emergency/incidents',
        report: '/api/emergency/report',
        create: 'POST /api/emergency/incident',
        update: 'PUT /api/emergency/incident/:id/status'
      },
      wcag: {
        criteria: '/api/wcag/criteria'
      },
      monitoring: {
        status: '/api/monitoring/status'
      }
    }
  });
});

// Middleware de tratamento de erros
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Inicializar sistema
async function startSystem() {
  try {
    logger.info('Iniciando sistema de monitorização de acessibilidade UNTILE');

    // Iniciar monitorização contínua
    portfolioMonitor.startMonitoring();

    // Verificar SLA breaches
    const slaBreaches = emergencyResponse.checkSLABreaches();
    if (slaBreaches.length > 0) {
      logger.warn(`${slaBreaches.length} incidentes com SLA excedido`);
    }

    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info(`Servidor iniciado na porta ${PORT}`);
      console.log(`\n🚀 UNTILE Accessibility Monitoring System`);
      console.log(`=========================================`);
      console.log(`📊 API disponível em: http://localhost:${PORT}`);
      console.log(`📋 Documentação: http://localhost:${PORT}/`);
      console.log(`🔍 Health check: http://localhost:${PORT}/health`);
      console.log(`\n📈 Endpoints principais:`);
      console.log(`  Portfolio: http://localhost:${PORT}/api/portfolio/stats`);
      console.log(`  Emergência: http://localhost:${PORT}/api/emergency/report`);
      console.log(`  WCAG: http://localhost:${PORT}/api/wcag/criteria`);
      console.log(`  Monitorização: http://localhost:${PORT}/api/monitoring/status`);
      console.log(`\n✅ Sistema pronto para monitorização!`);
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('Recebido sinal de paragem, limpando recursos...');
      await portfolioMonitor.cleanup();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      logger.info('Recebido sinal de terminação, limpando recursos...');
      await portfolioMonitor.cleanup();
      process.exit(0);
    });

  } catch (error) {
    logger.error('Erro fatal ao iniciar sistema:', error);
    process.exit(1);
  }
}

// Iniciar sistema se executado diretamente
if (require.main === module) {
  startSystem().catch(error => {
    logger.error('Erro fatal:', error);
    process.exit(1);
  });
}

export { app, portfolioMonitor, emergencyResponse }; 