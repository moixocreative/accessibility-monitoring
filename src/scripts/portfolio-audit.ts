#!/usr/bin/env ts-node

import { PortfolioMonitor } from '../monitoring/portfolio-monitor';
import { logger } from '../utils/logger';

async function main() {
  logger.info('Iniciando auditoria do portfolio UNTILE');

  const portfolioMonitor = new PortfolioMonitor();

  try {
    // Executar auditoria completa
    await portfolioMonitor.runPortfolioAudit();

    // Obter estatísticas
    const stats = portfolioMonitor.getPortfolioStats();
    
    console.log('\n📊 ESTATÍSTICAS DO PORTFOLIO');
    console.log('================================');
    console.log(`Total de sites: ${stats.totalSites}`);
    console.log(`Score médio WCAG: ${stats.averageScore}%`);
    console.log(`Total de violações: ${stats.totalViolations}`);
    console.log(`Violações críticas: ${stats.criticalViolations}`);
    console.log(`Conformidade: ${stats.compliancePercentage}%`);

    // Obter sites
    const sites = portfolioMonitor.getSites();
    
    console.log('\n🌐 SITES DO PORTFOLIO');
    console.log('=======================');
    sites.forEach(site => {
      console.log(`\n${site.name} (${site.technology})`);
      console.log(`  URL: ${site.url}`);
      console.log(`  Score WCAG: ${site.wcagScore}%`);
      console.log(`  Violações: ${site.violations.length}`);
      console.log(`  Última auditoria: ${site.lastAudit.toLocaleString('pt-PT')}`);
      
      if (site.violations.length > 0) {
        console.log('  Violações:');
        site.violations.forEach(violation => {
          console.log(`    - ${violation.criteria.name} (${violation.criteria.id}): ${violation.severity}`);
        });
      }
    });

    logger.info('Auditoria do portfolio concluída');

  } catch (error) {
    logger.error('Erro na auditoria do portfolio:', error);
    process.exit(1);
  } finally {
    await portfolioMonitor.cleanup();
  }
}

if (require.main === module) {
  main().catch(error => {
    logger.error('Erro fatal:', error);
    process.exit(1);
  });
} 