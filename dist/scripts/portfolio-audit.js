#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const portfolio_monitor_1 = require("../monitoring/portfolio-monitor");
const logger_1 = require("../utils/logger");
async function main() {
    logger_1.logger.info('Iniciando auditoria do portfolio UNTILE');
    const portfolioMonitor = new portfolio_monitor_1.PortfolioMonitor();
    try {
        await portfolioMonitor.runPortfolioAudit();
        const stats = portfolioMonitor.getPortfolioStats();
        console.log('\n📊 ESTATÍSTICAS DO PORTFOLIO');
        console.log('================================');
        console.log(`Total de sites: ${stats.totalSites}`);
        console.log(`Score médio WCAG: ${stats.averageScore}%`);
        console.log(`Total de violações: ${stats.totalViolations}`);
        console.log(`Violações críticas: ${stats.criticalViolations}`);
        console.log(`Conformidade: ${stats.compliancePercentage}%`);
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
        logger_1.logger.info('Auditoria do portfolio concluída');
    }
    catch (error) {
        logger_1.logger.error('Erro na auditoria do portfolio:', error);
        process.exit(1);
    }
    finally {
        await portfolioMonitor.cleanup();
    }
}
if (require.main === module) {
    main().catch(error => {
        logger_1.logger.error('Erro fatal:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=portfolio-audit.js.map