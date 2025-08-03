import winston from 'winston';
export declare const logger: winston.Logger;
export declare const auditLogger: winston.Logger;
export declare const emergencyLogger: winston.Logger;
export declare const logAudit: (message: string, meta?: any) => void;
export declare const logEmergency: (level: "warn" | "error", message: string, meta?: any) => void;
export declare const logViolation: (violation: any) => void;
export declare const logSLA: (incident: any) => void;
//# sourceMappingURL=logger.d.ts.map