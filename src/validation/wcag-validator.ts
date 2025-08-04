import puppeteer, { Browser, Page } from 'puppeteer';
import lighthouse from 'lighthouse';
import { AuditResult, AccessibilityViolation, WCAGCriteria } from '../types';
import { getCriteriaById, isPriorityCriteria } from '../core/wcag-criteria';
import { logger } from '../utils/logger';

export class WCAGValidator {
  private browser: Browser | null = null;

  constructor() {
    this.initBrowser();
  }

  /**
   * Inicializar browser para auditoria
   */
  private async initBrowser(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
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
      logger.info('Browser inicializado para auditoria WCAG');
    } catch (error) {
      logger.error('Erro ao inicializar browser:', error);
      throw error;
    }
  }

  /**
   * Executar auditoria completa de um site
   */
  async auditSite(url: string, siteId: string): Promise<AuditResult> {
    logger.info(`Iniciando auditoria WCAG para: ${url}`);

    try {
      // Executar Lighthouse
      const lighthouseResult = await this.runLighthouse(url);
      
      // Executar axe-core
      const axeResult = await this.runAxeCore(url);
      
      // Analisar violações
      const violations = this.analyzeViolations(axeResult, url);
      
      // Calcular score WCAG
      const wcagScore = this.calculateWCAGScore(lighthouseResult, axeResult);
      
      // Gerar resumo
      const summary = this.generateSummary(violations, wcagScore);

      const auditResult: AuditResult = {
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

      logger.info(`Auditoria concluída para ${url}. Score: ${wcagScore}%`);
      return auditResult;

    } catch (error) {
      logger.error(`Erro na auditoria de ${url}:`, error);
      throw error;
    }
  }

  /**
   * Executar Lighthouse
   */
  private async runLighthouse(url: string): Promise<any> {
    try {
      const result = await lighthouse(url, {
        output: 'json',
        onlyCategories: ['accessibility', 'performance', 'seo', 'best-practices'],
        chromeFlags: [
          '--headless',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
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
    } catch (error) {
      logger.error('Erro ao executar Lighthouse:', error);
      return {
        accessibility: 0,
        performance: 0,
        seo: 0,
        bestPractices: 0
      };
    }
  }

  /**
   * Executar axe-core
   */
  private async runAxeCore(url: string): Promise<any> {
    if (!this.browser) {
      logger.warn('Browser não inicializado, retornando resultados vazios');
      return {
        violations: [],
        passes: [],
        incomplete: [],
        inapplicable: []
      };
    }

    try {
      const page = await this.browser.newPage();
      
      // Configurar viewport
      await page.setViewport({ width: 1280, height: 720 });
      
      // Navegar para a página
      await page.goto(url, { waitUntil: 'networkidle2' });
      
      // Injetar e executar axe-core
      await page.addScriptTag({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.8.0/axe.min.js'
      });

      const axeResults = await page.evaluate(() => {
        return (globalThis as any).axe.run();
      });

      await page.close();

      return {
        violations: axeResults.violations || [],
        passes: axeResults.passes || [],
        incomplete: axeResults.incomplete || [],
        inapplicable: axeResults.inapplicable || []
      };

    } catch (error) {
      logger.error('Erro ao executar axe-core:', error);
      return {
        violations: [],
        passes: [],
        incomplete: [],
        inapplicable: []
      };
    }
  }

  /**
   * Analisar violações e mapear para critérios WCAG
   */
  private analyzeViolations(axeResults: any, pageUrl: string): AccessibilityViolation[] {
    const violations: AccessibilityViolation[] = [];

    for (const violation of axeResults.violations) {
      // Mapear regra axe para critério WCAG
      const wcagCriteria = this.mapAxeRuleToWCAG(violation.id);
      
      if (wcagCriteria && isPriorityCriteria(wcagCriteria.id)) {
        const accessibilityViolation: AccessibilityViolation = {
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

  /**
   * Mapear regra axe para critério WCAG
   */
  private mapAxeRuleToWCAG(axeRuleId: string): WCAGCriteria | undefined {
    // Mapeamento de regras axe para critérios WCAG prioritários
    const ruleMapping: Record<string, string> = {
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
    return wcagId ? getCriteriaById(wcagId) : undefined;
  }

  /**
   * Mapear severidade axe para violação
   */
  private mapSeverity(axeImpact: string): 'critical' | 'serious' | 'moderate' | 'minor' {
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

  /**
   * Calcular score WCAG baseado em Lighthouse e axe-core
   */
  private calculateWCAGScore(lighthouseResult: any, axeResult: any): number {
    // Score base do Lighthouse (40% do total)
    const lighthouseScore = lighthouseResult.accessibility * 0.4;
    
    // Score baseado em violações axe-core (60% do total)
    const totalViolations = axeResult.violations.length;
    const criticalViolations = axeResult.violations.filter((v: any) => 
      v.impact === 'critical' || v.impact === 'serious'
    ).length;
    
    // Penalizar violações críticas mais severamente
    const violationPenalty = (criticalViolations * 10) + (totalViolations * 2);
    const axeScore = Math.max(0, 100 - violationPenalty) * 0.6;
    
    return Math.round(lighthouseScore + axeScore);
  }

  /**
   * Gerar resumo da auditoria
   */
  private generateSummary(violations: AccessibilityViolation[], wcagScore: number) {
    const criticalViolations = violations.filter(v => v.severity === 'critical').length;
    const priorityViolations = violations.filter(v => 
      v.criteria.priority === 'P0' || v.criteria.priority === 'P1'
    ).length;

    return {
      totalViolations: violations.length,
      criticalViolations,
      priorityViolations,
      compliancePercentage: wcagScore
    };
  }

  /**
   * Fechar browser
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
} 