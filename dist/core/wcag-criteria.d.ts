import { WCAGCriteria } from '../types';
export declare const PRIORITY_WCAG_CRITERIA: WCAGCriteria[];
export declare function getCriteriaById(id: string): WCAGCriteria | undefined;
export declare function getCriteriaByPriority(priority: 'P0' | 'P1' | 'P2'): WCAGCriteria[];
export declare function getCriteriaByPrinciple(principle: 'PERCEIVABLE' | 'OPERABLE' | 'UNDERSTANDABLE' | 'ROBUST'): WCAGCriteria[];
export declare function getCriticalCriteria(): WCAGCriteria[];
export declare function isPriorityCriteria(id: string): boolean;
//# sourceMappingURL=wcag-criteria.d.ts.map