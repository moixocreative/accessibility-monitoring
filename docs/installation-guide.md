# Guia de Instalação - UNTILE Accessibility Monitoring System

## Pré-requisitos

### Sistema Operativo
- **Linux**: Ubuntu 20.04+ ou CentOS 8+
- **macOS**: 10.15+ (Catalina)
- **Windows**: 10+ (com WSL recomendado)

### Software Necessário
- **Node.js**: 18.0.0 ou superior
- **Yarn**: 1.22.0 ou superior
- **Git**: 2.30.0 ou superior

### Verificar Instalações
```bash
node --version    # Deve ser >= 18.0.0
yarn --version    # Deve ser >= 1.22.0
git --version     # Deve ser >= 2.30.0
```

## Instalação Passo a Passo

### 1. Clonar o Repositório
```bash
git clone https://github.com/moixocreative/untile-accessibility-monitoring.git
cd untile-accessibility-monitoring
```

### 2. Instalar Dependências
```bash
# Instalar dependências do projeto
yarn install

# Verificar se tudo foi instalado corretamente
yarn --version
```

### 3. Configurar Variáveis de Ambiente
```bash
# Copiar ficheiro de exemplo
cp env.example .env

# Editar configurações
nano .env
```

### 4. Configuração Básica (.env)
```bash
# Configurações Gerais
NODE_ENV=development
PORT=3000

# Monitorização
MONITORING_INTERVAL=3600000
ALERT_EMAIL=seu_email@untile.pt

# WCAG Validation
WCAG_LEVEL=AA
PRIORITY_CRITERIA=15

# Emergency Contacts
EMERGENCY_EMAIL=seu_email@untile.pt
AUTHORITY_EMAIL=seu_email@untile.pt

# Email Configuration (opcional para desenvolvimento)
SEND_EMAILS=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@untile.pt
SMTP_PASS=sua_senha_aqui
```

### 5. Build do Projeto
```bash
# Compilar TypeScript
yarn build

# Verificar se o build foi bem-sucedido
ls dist/
```

### 6. Testar Instalação
```bash
# Executar testes básicos
yarn test

# Testar auditoria WCAG
yarn audit:wcag

# Testar sistema de emergência
yarn emergency --test
```

## Configuração Avançada

### Configuração de Email (Produção)
Para ativar notificações por email em produção:

```bash
# Habilitar envio de emails
SEND_EMAILS=true

# Configurar SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=accessibility@untile.pt
SMTP_PASS=sua_senha_aqui
SMTP_FROM=accessibility@untile.pt
```

### Configuração de Monitorização
```bash
# Intervalo de monitorização (em milissegundos)
MONITORING_INTERVAL=3600000  # 1 hora

# Sites para monitorizar
MONITORING_SITES=https://untile.pt,https://welligence.pt

# Nível de conformidade WCAG
WCAG_LEVEL=AA
```

### Configuração de Logs
```bash
# Nível de logging
LOG_LEVEL=info  # debug, info, warn, error

# Diretório de logs
LOG_DIR=logs/
```

## Verificação da Instalação

### 1. Testes Automáticos
```bash
# Executar suite completa de testes
yarn test

# Testar auditoria de portfolio
yarn audit:portfolio

# Testar sistema de emergência
yarn emergency --test
```

### 2. Verificação Manual
```bash
# Iniciar servidor de desenvolvimento
yarn dev

# Em outro terminal, testar endpoints
curl http://localhost:3000/health
curl http://localhost:3000/api/portfolio/stats
```

### 3. Verificar Logs
```bash
# Verificar logs de acessibilidade
tail -f logs/accessibility.log

# Verificar logs de emergência
tail -f logs/emergency.log
```

## Troubleshooting

### Problema: "Cannot find module"
**Solução**: Reinstalar dependências
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Problema: "TypeScript compilation failed"
**Solução**: Verificar versão do TypeScript
```bash
yarn add typescript@^5.3.3
yarn build
```

### Problema: "Puppeteer timeout"
**Solução**: Configurar timeouts
```bash
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
```

### Problema: "SMTP connection failed"
**Solução**: Desabilitar emails para desenvolvimento
```bash
export SEND_EMAILS=false
export NODE_ENV=development
```

## Configuração de Produção

### 1. Variáveis de Ambiente de Produção
```bash
NODE_ENV=production
SEND_EMAILS=true
LOG_LEVEL=warn
MONITORING_INTERVAL=1800000  # 30 minutos
```

### 2. Configuração de Segurança
```bash
# Usar secrets para credenciais
SMTP_PASS=${{ secrets.SMTP_PASS }}
EMERGENCY_EMAIL=${{ secrets.EMERGENCY_EMAIL }}
```

### 3. Configuração de Performance
```bash
# Aumentar timeouts para sites lentos
PUPPETEER_TIMEOUT=60000
LIGHTHOUSE_TIMEOUT=120000
```

## Próximos Passos

Após a instalação bem-sucedida:

1. **Configurar Sites**: Adicionar URLs para monitorizar
2. **Configurar Alertas**: Definir emails de emergência
3. **Testar Sistema**: Executar auditoria completa
4. **Configurar CI/CD**: Configurar GitHub Actions
5. **Monitorizar Logs**: Verificar funcionamento contínuo

## Suporte

Para problemas de instalação:
- Verificar logs em `logs/`
- Consultar [Guia de Desenvolvimento](development-guide.md)
- Contactar equipa técnica: mauriciopereita@untile.pt 