# Guia de Instalação - UNTILE Accessibility Monitoring

## 📋 Pré-requisitos

### Requisitos Mínimos
- **Node.js:** >=18.0.0
- **Yarn:** >=1.22.0
- **Git:** >=2.30.0
- **RAM:** >=4GB
- **Espaço:** >=2GB livre

### Verificação de Pré-requisitos
```bash
# Verificar Node.js
node --version  # Deve ser >=18.0.0

# Verificar Yarn
yarn --version  # Deve ser >=1.22.0

# Verificar Git
git --version   # Deve ser >=2.30.0
```

## 🚀 Instalação Passo a Passo

### 1. Clone do Repositório
```bash
# Clone do repositório
git clone https://github.com/moixocreative/accessibility-monitoring.git

# Entrar no diretório
cd accessibility-monitoring

# Verificar se está no branch correto
git branch
```

### 2. Instalação de Dependências
```bash
# Instalar dependências com Yarn
yarn install

# Verificar instalação
yarn --version
```

### 3. Configuração de Ambiente
```bash
# Copiar ficheiro de exemplo
cp env.example .env

# Editar configurações
nano .env  # ou code .env
```

#### Configurações Básicas (.env)
```env
# Configurações Gerais
NODE_ENV=development
PORT=3000

# Monitorização
MONITORING_INTERVAL=3600000
ALERT_EMAIL=accessibility@untile.pt

# WCAG Validation
WCAG_LEVEL=AA
PRIORITY_CRITERIA=15

# Emergency Contacts
EMERGENCY_PHONE=+351-XXX-XXX-XXX
AUTHORITY_EMAIL=authority@example.pt

# Emails (opcional)
SEND_EMAILS=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=accessibility@untile.pt
SMTP_PASS=sua_senha_aqui
```

### 4. Verificação da Instalação
```bash
# Verificar linting
yarn lint

# Compilar TypeScript
yarn build

# Executar testes
yarn test

# Testar auditoria WCAG
yarn audit:wcag

# Testar sistema de emergência
yarn emergency --test
```

## 🔧 Configuração Avançada

### Configuração de Portfolio
Editar `src/monitoring/portfolio-monitor.ts`:
```typescript
const portfolio = [
  {
    id: 'welligence',
    name: 'Welligence Website',
    url: 'https://welligence.pt',
    technology: 'webflow'
  },
  {
    id: 'untile',
    name: 'UNTILE Corporate',
    url: 'https://untile.pt',
    technology: 'laravel'
  }
];
```

### Configuração de Critérios WCAG
Editar `src/core/wcag-criteria.ts`:
```typescript
export const PRIORITY_CRITERIA = [
  '1.1.1',  // Conteúdo Não-Textual
  '1.4.3',  // Contraste
  '2.1.1',  // Teclado
  // ... outros critérios
];
```

### Configuração de Notificações
```env
# Habilitar emails reais
SEND_EMAILS=true

# Configuração SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_app

# Destinatários
EMERGENCY_EMAIL=emergency@untile.pt
MAINTENANCE_EMAIL=maintenance@untile.pt
```

## 🧪 Testes de Funcionamento

### Teste Básico
```bash
# Teste completo
yarn lint && yarn build && yarn test
```

### Teste de Auditoria
```bash
# Auditoria WCAG
yarn audit:wcag

# Auditoria Portfolio
yarn audit:portfolio

# Sistema de Emergência
yarn emergency --test
```

### Teste de Monitorização
```bash
# Monitorização contínua
yarn monitor

# Relatórios
yarn report
```

## ⚠️ Troubleshooting

### Erro: "Module not found"
```bash
# Reinstalar dependências
rm -rf node_modules yarn.lock
yarn install
```

### Erro: "TypeScript compilation failed"
```bash
# Verificar versão TypeScript
yarn tsc --version

# Limpar cache
yarn cache clean
yarn install
```

### Erro: "Lighthouse timeout"
```bash
# Aumentar timeout
export LIGHTHOUSE_TIMEOUT=60000
yarn audit:wcag
```

### Erro: "SMTP connection failed"
```bash
# Desabilitar emails para testes
export SEND_EMAILS=false
yarn emergency --test
```

## 🔒 Configuração de Segurança

### Variáveis Sensíveis
```bash
# Nunca commitar .env
echo ".env" >> .gitignore

# Usar variáveis de ambiente
export SMTP_PASS="sua_senha_segura"
```

### Configuração de Firewall
```bash
# Permitir porta da aplicação
sudo ufw allow 3000

# Permitir portas SMTP se necessário
sudo ufw allow 587
```

## 📊 Monitorização de Performance

### Verificar Recursos
```bash
# Uso de CPU e RAM
top -p $(pgrep node)

# Espaço em disco
df -h

# Logs da aplicação
tail -f logs/accessibility.log
```

### Otimizações
```bash
# Aumentar heap size
export NODE_OPTIONS="--max-old-space-size=4096"

# Usar cache
yarn cache clean
yarn install --frozen-lockfile
```

## 🚀 Deploy

### Ambiente de Desenvolvimento
```bash
# Iniciar em modo desenvolvimento
yarn dev

# Aceder à aplicação
open http://localhost:3000
```

### Ambiente de Produção
```bash
# Build de produção
yarn build

# Iniciar produção
yarn start

# Usar PM2 para gestão de processos
pm2 start dist/index.js --name "accessibility-monitoring"
```

## 📚 Próximos Passos

1. **Configurar Portfolio:** Adicionar sites para monitorizar
2. **Configurar Notificações:** Configurar emails/Slack
3. **Configurar CI/CD:** GitHub Actions
4. **Configurar Monitorização:** Logs e alertas
5. **Testar Funcionalidades:** Todas as features

## 🆘 Suporte

- **Documentação:** [README.md](../README.md)
- **Issues:** GitHub Issues
- **Email:** accessibility@untile.pt
- **Slack:** #accessibility-emergency 