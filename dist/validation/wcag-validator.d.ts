import { AuditResult } from '../types';
export declare class WCAGValidator {
    private browser;
    constructor();
    private initBrowser;
    auditSite(url: string, siteId: string): Promise<AuditResult>;
    private runLighthouse;
    private runAxeCore;
    private analyzeViolations;
    private mapAxeRuleToWCAG;
    private mapSeverity;
    private calculateWCAGScore;
    private generateSummary;
    close(): Promise<void>;
}
//# sourceMappingURL=wcag-validator.d.ts.map