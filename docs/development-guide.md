# Guia de Desenvolvimento - UNTILE Accessibility Monitoring

## 🎯 Visão Geral

Este guia destina-se a programadores que querem contribuir para o sistema de monitorização de acessibilidade UNTILE.

## 🏗️ Arquitetura do Sistema

### Estrutura de Pastas
```
src/
├── api/              # API REST endpoints
├── core/             # Lógica principal e critérios WCAG
├── emergency/        # Sistema de resposta de emergência
├── monitoring/       # Monitorização de portfolio
├── reporting/        # Geração de relatórios
├── scripts/          # Scripts executáveis
├── types/            # Definições TypeScript
├── utils/            # Utilitários (logger, etc.)
└── validation/       # Validação WCAG
```

### Tecnologias Utilizadas
- **TypeScript:** Linguagem principal
- **Node.js:** Runtime
- **Puppeteer:** Automação de browser
- **axe-core:** Validação de acessibilidade
- **Lighthouse:** Auditoria de performance
- **Express:** API REST
- **Winston:** Logging estruturado

## 🚀 Configuração de Desenvolvimento

### Pré-requisitos
```bash
# Verificar versões
node --version  # >=18.0.0
yarn --version  # >=1.22.0
git --version   # >=2.30.0
```

### Setup Inicial
```bash
# Clone e setup
git clone https://github.com/moixocreative/accessibility-monitoring.git
cd accessibility-monitoring
yarn install

# Configurar ambiente
cp env.example .env
# Editar .env com configurações de desenvolvimento
```

### Scripts de Desenvolvimento
```bash
# Desenvolvimento
yarn dev          # Modo desenvolvimento com nodemon
yarn build        # Compilar TypeScript
yarn lint         # Verificar linting
yarn test         # Executar testes

# Funcionalidades
yarn audit:wcag   # Testar auditoria WCAG
yarn emergency --test # Testar sistema de emergência
```

## 📝 Convenções de Código

### Estrutura de Ficheiros
```typescript
// Exemplo: src/validation/wcag-validator.ts
import { AuditResult, AccessibilityViolation } from '../types';
import { logger } from '../utils/logger';

export class WCAGValidator {
  private browser: Browser | null = null;

  constructor() {
    this.initBrowser();
  }

  async auditSite(url: string): Promise<AuditResult> {
    // Implementação
  }

  private async initBrowser(): Promise<void> {
    // Método privado
  }
}
```

### Nomenclatura
- **Classes:** PascalCase (`WCAGValidator`)
- **Métodos:** camelCase (`auditSite`)
- **Variáveis:** camelCase (`browser`)
- **Constantes:** UPPER_SNAKE_CASE (`PRIORITY_CRITERIA`)
- **Ficheiros:** kebab-case (`wcag-validator.ts`)

### Logging
```typescript
import { logger } from '../utils/logger';

// Logs estruturados
logger.info('Auditoria iniciada', { url, siteId });
logger.warn('Browser não disponível', { reason: 'timeout' });
logger.error('Erro na auditoria', { error, url });
```

## 🔧 Desenvolvimento de Funcionalidades

### 1. Adicionar Novo Critério WCAG
Editar `src/core/wcag-criteria.ts`:
```typescript
export const WCAG_CRITERIA: WCAGCriteria[] = [
  // Critérios existentes...
  {
    id: '1.4.11',
    name: 'Contraste Não-Textual',
    level: 'AA',
    principle: 'PERCEIVABLE',
    description: 'Contraste mínimo para elementos não-textuais',
    priority: 'P1'
  }
];
```

### 2. Adicionar Novo Site ao Portfolio
Editar `src/monitoring/portfolio-monitor.ts`:
```typescript
const portfolio = [
  // Sites existentes...
  {
    id: 'novo-site',
    name: 'Novo Site',
    url: 'https://novo-site.pt',
    technology: 'react'
  }
];
```

### 3. Criar Novo Script
Criar `src/scripts/novo-script.ts`:
```typescript
#!/usr/bin/env ts-node

import { logger } from '../utils/logger';

async function main() {
  logger.info('Iniciando novo script');
  
  try {
    // Implementação
    logger.info('Script concluído com sucesso');
  } catch (error) {
    logger.error('Erro no script:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
```

Adicionar ao `package.json`:
```json
{
  "scripts": {
    "novo-script": "ts-node src/scripts/novo-script.ts"
  }
}
```

## 🧪 Testes

### Testes Unitários
```typescript
// src/validation/__tests__/wcag-validator.test.ts
import { WCAGValidator } from '../wcag-validator';

describe('WCAGValidator', () => {
  let validator: WCAGValidator;

  beforeEach(() => {
    validator = new WCAGValidator();
  });

  test('should audit site successfully', async () => {
    const result = await validator.auditSite('https://example.com');
    expect(result.wcagScore).toBeGreaterThan(0);
  });
});
```

### Testes de Integração
```typescript
// src/scripts/__tests__/emergency-response.test.ts
import { EmergencyResponse } from '../../emergency/emergency-response';

describe('EmergencyResponse Integration', () => {
  test('should create P0 incident', async () => {
    const emergency = new EmergencyResponse();
    const incident = await emergency.createIncident({
      type: 'P0',
      title: 'Test Incident',
      sites: ['test-site'],
      violations: []
    });
    
    expect(incident.type).toBe('P0');
  });
});
```

## 🔍 Debugging

### Logs Detalhados
```bash
# Habilitar logs detalhados
export LOG_LEVEL=debug
yarn audit:wcag
```

### Debug com Node.js
```bash
# Debug com breakpoints
node --inspect-brk -r ts-node/register src/scripts/wcag-validation.ts
```

### Debug com VS Code
Criar `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug WCAG Validation",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/scripts/wcag-validation.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "console": "integratedTerminal"
    }
  ]
}
```

## 📦 Build e Deploy

### Build de Produção
```bash
# Compilar TypeScript
yarn build

# Verificar build
node dist/index.js
```

### Docker (Opcional)
```dockerfile
# Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
EXPOSE 3000
CMD ["yarn", "start"]
```

## 🔒 Segurança

### Variáveis de Ambiente
```bash
# Nunca commitar credenciais
echo ".env" >> .gitignore
echo "*.key" >> .gitignore
echo "secrets/" >> .gitignore
```

### Validação de Input
```typescript
// Sempre validar input
function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
```

## 📊 Performance

### Otimizações
```typescript
// Usar cache para requests
const cache = new Map<string, AuditResult>();

async function getCachedResult(url: string): Promise<AuditResult> {
  if (cache.has(url)) {
    return cache.get(url)!;
  }
  
  const result = await auditSite(url);
  cache.set(url, result);
  return result;
}
```

### Monitorização
```typescript
// Medir performance
const startTime = Date.now();
await auditSite(url);
const duration = Date.now() - startTime;
logger.info('Auditoria concluída', { duration, url });
```

## 🤝 Contribuição

### Workflow de Contribuição
1. **Fork** do repositório
2. **Criar branch** feature (`git checkout -b feature/nova-funcionalidade`)
3. **Desenvolver** funcionalidade
4. **Testar** localmente (`yarn lint && yarn build && yarn test`)
5. **Commit** seguindo convenções (`git commit -m 'feat: add nova funcionalidade'`)
6. **Push** para branch (`git push origin feature/nova-funcionalidade`)
7. **Criar PR** no GitHub

### Regras de Commit
```bash
# Formato: type: subject
feat: add new WCAG criteria validation
fix: resolve browser timeout issue
docs: update installation guide
style: format code according to standards
refactor: improve emergency response system
test: add unit tests for validator
chore: update dependencies
```

### Code Review
- **Linting:** `yarn lint` deve passar
- **Build:** `yarn build` deve compilar sem erros
- **Testes:** `yarn test` deve passar
- **Funcionalidade:** Testar manualmente

## 🆘 Recursos

### Documentação
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Puppeteer API](https://pptr.dev/api/)
- [axe-core API](https://github.com/dequelabs/axe-core)

### Ferramentas
- **VS Code:** Editor recomendado
- **ESLint:** Linting de código
- **Prettier:** Formatação de código
- **Jest:** Framework de testes

### Comunidade
- **Issues:** GitHub Issues
- **Discussions:** GitHub Discussions
- **Email:** accessibility@untile.pt
- **Slack:** #accessibility-development 