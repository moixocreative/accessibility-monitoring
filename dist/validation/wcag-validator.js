"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCAGValidator = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const lighthouse_1 = __importDefault(require("lighthouse"));
const wcag_criteria_1 = require("../core/wcag-criteria");
const logger_1 = require("../utils/logger");
class WCAGValidator {
    browser = null;
    constructor() {
        this.initBrowser();
    }
    async initBrowser() {
        try {
            this.browser = await puppeteer_1.default.launch({
                headless: true,
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-accelerated-2d-canvas',
                    '--no-first-run',
                    '--no-zygote',
                    '--disable-gpu'
                ]
            });
            logger_1.logger.info('Browser inicializado para auditoria WCAG');
        }
        catch (error) {
            logger_1.logger.error('Erro ao inicializar browser:', error);
            throw error;
        }
    }
    async auditSite(url, siteId) {
        logger_1.logger.info(`Iniciando auditoria WCAG para: ${url}`);
        try {
            const lighthouseResult = await this.runLighthouse(url);
            const axeResult = await this.runAxeCore(url);
            const violations = this.analyzeViolations(axeResult, url);
            const wcagScore = this.calculateWCAGScore(lighthouseResult, axeResult);
            const summary = this.generateSummary(violations, wcagScore);
            const auditResult = {
                id: `audit_${Date.now()}`,
                siteId,
                timestamp: new Date(),
                wcagScore,
                violations,
                lighthouseScore: {
                    accessibility: lighthouseResult.accessibility || 0,
                    performance: lighthouseResult.performance || 0,
                    seo: lighthouseResult.seo || 0,
                    bestPractices: lighthouseResult.bestPractices || 0
                },
                axeResults: axeResult,
                summary
            };
            logger_1.logger.info(`Auditoria concluída para ${url}. Score: ${wcagScore}%`);
            return auditResult;
        }
        catch (error) {
            logger_1.logger.error(`Erro na auditoria de ${url}:`, error);
            throw error;
        }
    }
    async runLighthouse(url) {
        try {
            const result = await (0, lighthouse_1.default)(url, {
                port: 9222,
                output: 'json',
                onlyCategories: ['accessibility', 'performance', 'seo', 'best-practices']
            });
            const lhr = result?.lhr;
            if (!lhr) {
                return {
                    accessibility: 0,
                    performance: 0,
                    seo: 0,
                    bestPractices: 0
                };
            }
            return {
                accessibility: Math.round((lhr.categories?.accessibility?.score || 0) * 100),
                performance: Math.round((lhr.categories?.performance?.score || 0) * 100),
                seo: Math.round((lhr.categories?.seo?.score || 0) * 100),
                bestPractices: Math.round((lhr.categories?.['best-practices']?.score || 0) * 100)
            };
        }
        catch (error) {
            logger_1.logger.error('Erro ao executar Lighthouse:', error);
            return {
                accessibility: 0,
                performance: 0,
                seo: 0,
                bestPractices: 0
            };
        }
    }
    async runAxeCore(url) {
        if (!this.browser) {
            throw new Error('Browser não inicializado');
        }
        try {
            const page = await this.browser.newPage();
            await page.setViewport({ width: 1280, height: 720 });
            await page.goto(url, { waitUntil: 'networkidle2' });
            await page.addScriptTag({
                url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.0/axe.min.js'
            });
            const axeResults = await page.evaluate(() => {
                return globalThis.axe.run();
            });
            await page.close();
            return {
                violations: axeResults.violations || [],
                passes: axeResults.passes || [],
                incomplete: axeResults.incomplete || [],
                inapplicable: axeResults.inapplicable || []
            };
        }
        catch (error) {
            logger_1.logger.error('Erro ao executar axe-core:', error);
            return {
                violations: [],
                passes: [],
                incomplete: [],
                inapplicable: []
            };
        }
    }
    analyzeViolations(axeResults, pageUrl) {
        const violations = [];
        for (const violation of axeResults.violations) {
            const wcagCriteria = this.mapAxeRuleToWCAG(violation.id);
            if (wcagCriteria && (0, wcag_criteria_1.isPriorityCriteria)(wcagCriteria.id)) {
                const accessibilityViolation = {
                    id: `violation_${Date.now()}_${Math.random()}`,
                    criteria: wcagCriteria,
                    severity: this.mapSeverity(violation.impact),
                    description: violation.description,
                    element: violation.nodes?.[0]?.html || 'N/A',
                    page: pageUrl,
                    timestamp: new Date(),
                    status: 'open'
                };
                violations.push(accessibilityViolation);
            }
        }
        return violations;
    }
    mapAxeRuleToWCAG(axeRuleId) {
        const ruleMapping = {
            'color-contrast': '1.4.3',
            'image-alt': '1.1.1',
            'page-title': '2.4.2',
            'skip-link': '2.4.1',
            'focus-visible': '2.4.7',
            'label': '3.3.2',
            'form-field-multiple-labels': '3.3.2',
            'html-lang': '3.1.1',
            'aria-allowed-attr': '4.1.2',
            'aria-required-attr': '4.1.2',
            'aria-valid-attr-value': '4.1.2',
            'landmark-one-main': '1.3.1',
            'heading-order': '1.3.1',
            'list': '1.3.1',
            'button-name': '4.1.2',
            'link-name': '4.1.2',
            'input-button-name': '4.1.2',
            'frame-title': '2.4.2',
            'meta-viewport': '1.4.4',
            'meta-refresh': '2.2.1'
        };
        const wcagId = ruleMapping[axeRuleId];
        return wcagId ? (0, wcag_criteria_1.getCriteriaById)(wcagId) : undefined;
    }
    mapSeverity(axeImpact) {
        switch (axeImpact) {
            case 'critical':
                return 'critical';
            case 'serious':
                return 'serious';
            case 'moderate':
                return 'moderate';
            case 'minor':
                return 'minor';
            default:
                return 'moderate';
        }
    }
    calculateWCAGScore(lighthouseResult, axeResult) {
        const lighthouseScore = lighthouseResult.accessibility * 0.4;
        const totalViolations = axeResult.violations.length;
        const criticalViolations = axeResult.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious').length;
        const violationPenalty = (criticalViolations * 10) + (totalViolations * 2);
        const axeScore = Math.max(0, 100 - violationPenalty) * 0.6;
        return Math.round(lighthouseScore + axeScore);
    }
    generateSummary(violations, wcagScore) {
        const criticalViolations = violations.filter(v => v.severity === 'critical').length;
        const priorityViolations = violations.filter(v => v.criteria.priority === 'P0' || v.criteria.priority === 'P1').length;
        return {
            totalViolations: violations.length,
            criticalViolations,
            priorityViolations,
            compliancePercentage: wcagScore
        };
    }
    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}
exports.WCAGValidator = WCAGValidator;
//# sourceMappingURL=wcag-validator.js.map