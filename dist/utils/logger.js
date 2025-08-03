"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logSLA = exports.logViolation = exports.logEmergency = exports.logAudit = exports.emergencyLogger = exports.auditLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const logFormat = winston_1.default.format.combine(winston_1.default.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
}), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json());
const consoleFormat = winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({
    format: 'HH:mm:ss'
}), winston_1.default.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
        metaStr = ` ${JSON.stringify(meta)}`;
    }
    return `${timestamp} [${level}]: ${message}${metaStr}`;
}));
exports.logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: { service: 'untile-accessibility-monitoring' },
    transports: [
        new winston_1.default.transports.Console({
            format: consoleFormat
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'accessibility.log'),
            maxsize: 5242880,
            maxFiles: 5
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'error.log'),
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'audit.log'),
            level: 'info',
            maxsize: 10485760,
            maxFiles: 10
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'emergency.log'),
            level: 'warn',
            maxsize: 5242880,
            maxFiles: 3
        })
    ]
});
const fs_1 = __importDefault(require("fs"));
const logsDir = path_1.default.join(process.cwd(), 'logs');
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
exports.auditLogger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'audit-details.log'),
            maxsize: 10485760,
            maxFiles: 20
        })
    ]
});
exports.emergencyLogger = winston_1.default.createLogger({
    level: 'warn',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'emergency-details.log'),
            maxsize: 5242880,
            maxFiles: 5
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        })
    ]
});
const logAudit = (message, meta) => {
    exports.auditLogger.info(message, meta);
    exports.logger.info(`[AUDIT] ${message}`, meta);
};
exports.logAudit = logAudit;
const logEmergency = (level, message, meta) => {
    exports.emergencyLogger.log(level, message, meta);
    exports.logger.log(level, `[EMERGENCY] ${message}`, meta);
};
exports.logEmergency = logEmergency;
const logViolation = (violation) => {
    exports.logger.warn('Violação WCAG detectada', {
        criteria: violation.criteria?.id,
        severity: violation.severity,
        page: violation.page,
        element: violation.element
    });
};
exports.logViolation = logViolation;
const logSLA = (incident) => {
    exports.emergencyLogger.warn('SLA Incident', {
        type: incident.type,
        responseTime: incident.responseTime,
        deadline: incident.slaDeadline,
        status: incident.status
    });
};
exports.logSLA = logSLA;
//# sourceMappingURL=logger.js.map