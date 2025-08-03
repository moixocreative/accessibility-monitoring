import winston from 'winston';
import path from 'path';

// Configuração de formatos
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let metaStr = '';
    if (Object.keys(meta).length > 0) {
      metaStr = ` ${JSON.stringify(meta)}`;
    }
    return `${timestamp} [${level}]: ${message}${metaStr}`;
  })
);

// Configuração do logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'untile-accessibility-monitoring' },
  transports: [
    // Console para desenvolvimento
    new winston.transports.Console({
      format: consoleFormat
    }),
    
    // Ficheiro para logs gerais
    new winston.transports.File({
      filename: path.join('logs', 'accessibility.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // Ficheiro separado para erros
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    
    // Ficheiro para auditorias
    new winston.transports.File({
      filename: path.join('logs', 'audit.log'),
      level: 'info',
      maxsize: 10485760, // 10MB
      maxFiles: 10
    }),
    
    // Ficheiro para emergências
    new winston.transports.File({
      filename: path.join('logs', 'emergency.log'),
      level: 'warn',
      maxsize: 5242880, // 5MB
      maxFiles: 3
    })
  ]
});

// Criar diretório de logs se não existir
import fs from 'fs';
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Logger específico para auditorias
export const auditLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', 'audit-details.log'),
      maxsize: 10485760, // 10MB
      maxFiles: 20
    })
  ]
});

// Logger específico para emergências
export const emergencyLogger = winston.createLogger({
  level: 'warn',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', 'emergency-details.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Funções de logging específicas
export const logAudit = (message: string, meta?: any) => {
  auditLogger.info(message, meta);
  logger.info(`[AUDIT] ${message}`, meta);
};

export const logEmergency = (level: 'warn' | 'error', message: string, meta?: any) => {
  emergencyLogger.log(level, message, meta);
  logger.log(level, `[EMERGENCY] ${message}`, meta);
};

export const logViolation = (violation: any) => {
  logger.warn('Violação WCAG detectada', {
    criteria: violation.criteria?.id,
    severity: violation.severity,
    page: violation.page,
    element: violation.element
  });
};

export const logSLA = (incident: any) => {
  emergencyLogger.warn('SLA Incident', {
    type: incident.type,
    responseTime: incident.responseTime,
    deadline: incident.slaDeadline,
    status: incident.status
  });
}; 