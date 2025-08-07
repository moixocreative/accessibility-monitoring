# Guia de Desenvolvimento - UNTILE Accessibility Monitoring System

## Visão Geral da Arquitetura

O UNTILE Accessibility Monitoring System é construído com uma arquitetura modular baseada em TypeScript, seguindo princípios de Clean Architecture e Domain-Driven Design.

### Estrutura do Projeto
```
src/
├── core/           # Lógica de negócio principal
├── monitoring/     # Sistema de monitorização
├── validation/     # Validação WCAG
├── emergency/      # Sistema de emergência
├── reporting/      # Geração de relatórios
├── api/           # API REST
├── utils/         # Utilitários
├── types/         # Definições de tipos
└── scripts/       # Scripts executáveis
```

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos
```bash
# Node.js 18+
node --version

# Yarn
yarn --version

# Git
git --version
```

### Instalação
```bash
# Clonar repositório
git clone https://github.com/moixocreative/untile-accessibility-monitoring.git
cd untile-accessibility-monitoring

# Instalar dependências
yarn install

# Configurar ambiente
cp env.example .env
```

### Configuração de Desenvolvimento (.env)
```bash
NODE_ENV=development
SEND_EMAILS=false
LOG_LEVEL=debug
MONITORING_INTERVAL=60000  # 1 minuto para desenvolvimento
```

## Convenções de Código

### TypeScript
- **Strict Mode**: Sempre ativo
- **ESLint**: Configurado com regras TypeScript
- **Prettier**: Formatação automática
- **Naming**: camelCase para variáveis, PascalCase para classes

### Estrutura de Ficheiros
```typescript
// src/validation/wcag-validator.ts
export class WCAGValidator {
  private browser: Browser | null = null;
  
  constructor() {
    // Inicialização
  }
  
  public async auditSite(url: string): Promise<AuditResult> {
    // Lógica pública
  }
  
  private async initBrowser(): Promise<void> {
    // Lógica privada
  }
}
```

### Imports e Exports
```typescript
// Imports organizados
import { Browser } from 'puppeteer';
import { AuditResult, AccessibilityViolation } from '../types';
import { logger } from '../utils/logger';

// Exports nomeados
export { WCAGValidator };
export type { AuditResult };
```

## Desenvolvimento de Funcionalidades

### 1. Adicionar Novo Critério WCAG

Editar `src/core/wcag-criteria.ts`:
```typescript
export const PRIORITY_WCAG_CRITERIA: WCAGCriteria[] = [
  // ... critérios existentes
  {
    id: '1.4.11',
    name: 'Contraste Não-Textual',
    level: 'AA',
    principle: 'PERCEIVABLE',
    priority: 'P1',
    description: 'Contraste mínimo 3:1 para elementos não-textuais',
    technology: {
      webflow: 'Verificação manual obrigatória',
      laravel: 'Variáveis CSS com valores conformes',
      wordpress: 'Auditoria tema + CSS personalizado'
    }
  }
];
```

### 2. Adicionar Novo Site ao Portfolio

Editar `src/monitoring/portfolio-monitor.ts`:
```typescript
private loadPortfolioSites(): void {
  this.sites = [
    // ... sites existentes
    {
      id: 'site_4',
      name: 'Novo Site',
      url: 'https://novosite.pt',
      technology: 'nextjs',
      client: 'Novo Cliente',
      lastAudit: new Date(),
      wcagScore: 0,
      violations: [],
      status: 'active'
    }
  ];
}
```

### 3. Criar Novo Script

Criar `src/scripts/novo-script.ts`:
```typescript
#!/usr/bin/env ts-node

import { logger } from '../utils/logger';

async function main() {
  logger.info('Iniciando novo script');
  
  try {
    // Lógica do script
    console.log('Script executado com sucesso');
  } catch (error) {
    logger.error('Erro no script:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    logger.error('Erro fatal:', error);
    process.exit(1);
  });
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

## Testes

### Estrutura de Testes
```typescript
// src/__tests__/validation/wcag-validator.test.ts
import { WCAGValidator } from '../../validation/wcag-validator';

describe('WCAGValidator', () => {
  let validator: WCAGValidator;
  
  beforeEach(() => {
    validator = new WCAGValidator();
  });
  
  afterEach(async () => {
    await validator.close();
  });
  
  it('should validate site accessibility', async () => {
    const result = await validator.auditSite('https://example.com');
    expect(result.wcagScore).toBeGreaterThan(0);
  });
});
```

### Executar Testes
```bash
# Todos os testes
yarn test

# Testes específicos
yarn test wcag-validator

# Testes com coverage
yarn test --coverage

# Testes em modo watch
yarn test --watch
```

## Debugging

### Logs Estruturados
```typescript
import { logger } from '../utils/logger';

logger.info('Iniciando auditoria', {
  url: 'https://example.com',
  timestamp: new Date(),
  user: 'developer'
});

logger.error('Erro na auditoria', {
  error: error.message,
  stack: error.stack,
  context: { url, siteId }
});
```

### Debug com VS Code
Criar `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Script",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/src/scripts/wcag-validation.ts",
      "runtimeArgs": ["-r", "ts-node/register"],
      "env": {
        "NODE_ENV": "development",
        "SEND_EMAILS": "false"
      }
    }
  ]
}
```

## Build e Deploy

### Build de Desenvolvimento
```bash
# Compilar TypeScript
yarn build

# Verificar tipos
yarn tsc --noEmit

# Linting
yarn lint
```

### Build de Produção
```bash
# Build otimizado
NODE_ENV=production yarn build

# Verificar bundle
yarn build --analyze
```

### Deploy
```bash
# Build para produção
yarn build

# Iniciar servidor
yarn start

# Com PM2
pm2 start dist/index.js --name "accessibility-monitoring"
```

## Integração com CI/CD

### GitHub Actions
O projeto inclui workflows configurados:

- **test.yml**: Testes automáticos em PRs
- **release.yml**: Deploy automático
- **sync-dist.yml**: Sincronização de ficheiros

### Configuração Local
```bash
# Instalar husky para git hooks
yarn husky install

# Adicionar pre-commit hook
yarn husky add .husky/pre-commit "yarn lint && yarn test"
```

## Performance e Otimização

### Monitorização de Performance
```typescript
// src/utils/performance.ts
export class PerformanceMonitor {
  private startTime: number;
  
  start(label: string) {
    this.startTime = Date.now();
    logger.info(`Iniciando: ${label}`);
  }
  
  end(label: string) {
    const duration = Date.now() - this.startTime;
    logger.info(`Concluído: ${label} (${duration}ms)`);
  }
}
```

### Otimizações Recomendadas
```typescript
// Cache de resultados
private cache = new Map<string, AuditResult>();

// Pool de browsers
private browserPool: Browser[] = [];

// Timeouts configuráveis
const TIMEOUTS = {
  navigation: 30000,
  axe: 30000,
  lighthouse: 60000
};
```

## Segurança

### Validação de Input
```typescript
// src/utils/validation.ts
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return url.startsWith('http');
  } catch {
    return false;
  }
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
}
```

### Gestão de Secrets
```typescript
// Nunca commitar credenciais
const config = {
  smtp: {
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
};
```

## Troubleshooting

### Problemas Comuns

#### TypeScript Compilation Errors
```bash
# Limpar cache
rm -rf node_modules/.cache

# Reinstalar dependências
yarn install

# Verificar tipos
yarn tsc --noEmit
```

#### Puppeteer Issues
```bash
# Instalar dependências do sistema
sudo apt-get install -y chromium-browser

# Configurar variáveis
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

#### Memory Leaks
```bash
# Monitorizar uso de memória
node --inspect src/scripts/monitoring.ts

# Verificar processos
ps aux | grep node
```

## Contribuição

### Processo de Contribuição
1. **Fork** do repositório
2. **Branch** para feature: `feature/nova-funcionalidade`
3. **Desenvolvimento** com testes
4. **Commit** seguindo Conventional Commits
5. **Push** e **Pull Request**

### Conventional Commits
```bash
feat: add new WCAG criterion validation
fix: resolve puppeteer timeout issue
docs: update installation guide
refactor: improve error handling
test: add unit tests for validator
```

### Code Review Checklist
- [ ] Código segue convenções
- [ ] Testes passam
- [ ] Documentação atualizada
- [ ] Logs apropriados
- [ ] Performance considerada
- [ ] Segurança verificada

## Recursos Adicionais

### Documentação Externa
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Puppeteer API](https://pptr.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Ferramentas Úteis
- **ESLint**: Linting de código
- **Prettier**: Formatação automática
- **Jest**: Framework de testes
- **Winston**: Logging estruturado

## Suporte

Para questões de desenvolvimento:
- **Email**: mauriciopereita@untile.pt
- **Issues**: GitHub Issues
- **Documentação**: [Guia de Instalação](installation-guide.md)
- **Logs**: Verificar `logs/` para debugging 