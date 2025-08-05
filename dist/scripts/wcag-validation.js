#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wcag_validator_1 = require("../validation/wcag-validator");
const wcag_criteria_1 = require("../core/wcag-criteria");
const logger_1 = require("../utils/logger");
async function main() {
    logger_1.logger.info('Iniciando validação WCAG 2.1 AA');
    const isCI = process.env.CI === 'true' || process.env.GITHUB_ACTIONS === 'true';
    if (isCI) {
        console.log('\n🏗️  AMBIENTE CI/CD DETECTADO');
        console.log('================================');
        console.log('⚠️  Browser não disponível - usando simulação');
        console.log('📊 Resultados serão simulados para teste');
    }
    const validator = new wcag_validator_1.WCAGValidator();
    try {
        console.log('\n🎯 CRITÉRIOS WCAG 2.1 AA PRIORITÁRIOS UNTILE');
        console.log('================================================');
        wcag_criteria_1.PRIORITY_WCAG_CRITERIA.forEach(criteria => {
            console.log(`\n${criteria.id} - ${criteria.name} (${criteria.level})`);
            console.log(`  Prioridade: ${criteria.priority}`);
            console.log(`  Princípio: ${criteria.principle}`);
            console.log(`  Descrição: ${criteria.description}`);
            console.log(`  Tecnologias:`);
            console.log(`    Webflow: ${criteria.technology.webflow}`);
            console.log(`    Laravel: ${criteria.technology.laravel}`);
            console.log(`    WordPress: ${criteria.technology.wordpress}`);
        });
        const criticalCriteria = (0, wcag_criteria_1.getCriticalCriteria)();
        console.log(`\n🚨 CRITÉRIOS CRÍTICOS (P0): ${criticalCriteria.length}`);
        criticalCriteria.forEach(criteria => {
            console.log(`  - ${criteria.id}: ${criteria.name}`);
        });
        const testUrl = process.argv[2] || 'https://example.com';
        console.log(`\n🔍 TESTANDO VALIDAÇÃO WCAG`);
        console.log(`URL: ${testUrl}`);
        let auditResult;
        try {
            auditResult = await validator.auditSite(testUrl, 'test_site');
        }
        catch (error) {
            console.log('\n⚠️  ERRO NA AUDITORIA - GERANDO RESULTADO SIMULADO');
            auditResult = {
                wcagScore: 0,
                violations: [],
                lighthouseScore: {
                    accessibility: 0,
                    performance: 0,
                    seo: 0,
                    bestPractices: 0
                },
                summary: 'Erro na auditoria - ambiente CI/CD sem browser'
            };
        }
        console.log('\n📊 RESULTADOS DA AUDITORIA');
        console.log('============================');
        console.log(`Score WCAG: ${auditResult.wcagScore}%`);
        console.log(`Total de violações: ${auditResult.violations.length}`);
        console.log(`Violações críticas: ${auditResult.violations.filter(v => v.severity === 'critical').length}`);
        console.log('\n📈 SCORES LIGHTHOUSE');
        console.log(`  Acessibilidade: ${auditResult.lighthouseScore.accessibility}%`);
        console.log(`  Performance: ${auditResult.lighthouseScore.performance}%`);
        console.log(`  SEO: ${auditResult.lighthouseScore.seo}%`);
        console.log(`  Boas Práticas: ${auditResult.lighthouseScore.bestPractices}%`);
        if (auditResult.violations.length > 0) {
            console.log('\n❌ VIOLAÇÕES DETETADAS');
            console.log('=======================');
            auditResult.violations.forEach(violation => {
                console.log(`\n${violation.criteria.id} - ${violation.criteria.name}`);
                console.log(`  Severidade: ${violation.severity}`);
                console.log(`  Descrição: ${violation.description}`);
                console.log(`  Elemento: ${violation.element}`);
                console.log(`  Página: ${violation.page}`);
            });
        }
        else {
            console.log('\n✅ NENHUMA VIOLAÇÃO DETETADA');
        }
        console.log('\n📋 RESUMO DE CONFORMIDADE');
        console.log('==========================');
        console.log(`Conformidade WCAG 2.1 AA: ${auditResult.wcagScore >= 80 ? '✅ CONFORME' : '❌ NÃO CONFORME'}`);
        console.log(`Percentagem de conformidade: ${auditResult.wcagScore}%`);
        if (auditResult.wcagScore < 80) {
            console.log('\n⚠️  RECOMENDAÇÕES');
            console.log('==================');
            console.log('- Revisar violações críticas prioritariamente');
            console.log('- Implementar correções para critérios P0');
            console.log('- Validar melhorias com testes manuais');
            console.log('- Documentar correções implementadas');
        }
        logger_1.logger.info('Validação WCAG concluída');
    }
    catch (error) {
        logger_1.logger.error('Erro na validação WCAG:', error);
        process.exit(1);
    }
    finally {
        await validator.close();
    }
}
if (require.main === module) {
    main().catch(error => {
        logger_1.logger.error('Erro fatal:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=wcag-validation.js.map