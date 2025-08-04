# UNTILE Accessibility Monitoring System

Sistema de monitorização contínua de acessibilidade digital para conformidade com WCAG 2.1 AA e EAA 2025.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Instalação e Configuração](#instalação-e-configuração)
3. [Configuração de Secrets](#configuração-de-secrets)
4. [Execução e Uso](#execução-e-uso)
5. [Sistema de Emergência](#sistema-de-emergência)
6. [Workflows CI/CD](#workflows-cicd)
7. [Troubleshooting](#troubleshooting)
8. [Suporte](#suporte)

---

## 🎯 Visão Geral

### Objetivo
Implementar um sistema completo de monitorização de acessibilidade que garante conformidade com WCAG 2.1 AA e prepara a empresa para a EAA 2025.

### Funcionalidades Principais

#### 🔍 Monitorização Automática
- **Auditoria Portfolio**: Análise automática de todos os sites UNTILE
- **Validação WCAG**: Verificação dos 15 critérios prioritários
- **Alertas Tempo Real**: Notificações de violações críticas
- **Relatórios Automáticos**: Geração de relatórios de conformidade

#### 🚨 Sistema de Emergência
- **Classificação P0/P1/P2**: Sistema de priorização de incidentes
- **SLA Management**: 2h/8h/24h para diferentes severidades
- **Notificações Automáticas**: Email e Slack para equipas
- **Comunicação com Autoridades**: Templates automáticos

#### 🔧 Actions de Controlo (GitHub Actions)
- **Test Suite**: Validação automatizada em cada commit
- **Release Management**: Gestão de releases com conformidade
- **Sync Distribution**: Sincronização com ambientes de produção

---

## 🚀 Instalação e Configuração

### Pré-requisitos

```bash
# Node.js 18+ e Yarn
node --version  # >= 18.0.0
yarn --version  # >= 1.22.0

# Chromium para Puppeteer
# Instalado automaticamente via GitHub Actions
```

### Passo 1: Clonar Repositório

```bash
# Clonar o repositório
git clone https://github.com/moixocreative/accessibility-monitoring.git
cd accessibility-monitoring

# Instalar dependências
yarn install
```

### Passo 2: Configurar Ambiente

```bash
# Copiar ficheiro de exemplo
cp env.example .env

# Editar configurações
nano .env  # ou vim .env
```

### Passo 3: Configurar Variáveis de Ambiente

```bash
# Configurações Gerais
NODE_ENV=production
PORT=3000

# Monitorização
MONITORING_INTERVAL=3600000  # 1 hora
ALERT_EMAIL=mauriciopereita@untile.pt

# WCAG Validation
WCAG_LEVEL=AA
PRIORITY_CRITERIA=15

# Emergency Contacts
EMERGENCY_EMAIL=mauriciopereita@untile.pt
EMERGENCY_PHONE=+351-XXX-XXX-XXX
AUTHORITY_EMAIL=mauriciopereita@untile.pt

# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mauriciopereita@untile.pt
SMTP_PASS=your_smtp_password_here
SMTP_FROM=mauriciopereita@untile.pt

# Slack Integration (opcional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Database (para futuras implementações)
DATABASE_URL=postgresql://user:pass@localhost:5432/accessibility

# Logging
LOG_LEVEL=info
```

### Passo 4: Build do Projeto

```bash
# Build do projeto
yarn build

# Verificar se tudo está funcionando
yarn test
```

---

## 🔐 Configuração de Secrets

### GitHub Secrets Obrigatórias

Aceder a: `Settings` → `Secrets and variables` → `Actions`

#### 1. Configurações SMTP
| Secret | Valor | Descrição |
|--------|-------|-----------|
| `SMTP_HOST` | `smtp.gmail.com` | Servidor SMTP |
| `SMTP_PORT` | `587` | Porta SMTP |
| `SMTP_USER` | `mauriciopereita@untile.pt` | Email para autenticação |
| `SMTP_PASS` | `Moixo#1974*20Untile` | Senha do email |
| `SMTP_FROM` | `mauriciopereita@untile.pt` | Email remetente |

#### 2. Configurações de Email
| Secret | Valor | Descrição |
|--------|-------|-----------|
| `ALERT_EMAIL` | `mauriciopereita@untile.pt` | Email para alertas gerais |
| `EMERGENCY_EMAIL` | `mauriciopereita@untile.pt` | Email para emergências |
| `AUTHORITY_EMAIL` | `mauriciopereita@untile.pt` | Email para autoridades |

### Como Configurar

1. **Aceder ao Repositório**: https://github.com/moixocreative/accessibility-monitoring
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** para cada secret
4. **Verificar**: Todos os workflows têm acesso às secrets

---

## 🎮 Execução e Uso

### Scripts Disponíveis

#### Monitorização
```bash
# Monitorização contínua
yarn monitor

# Auditoria completa
yarn audit

# Auditoria específica do portfolio
yarn audit:portfolio

# Validação WCAG 2.1 AA
yarn audit:wcag
```

#### Emergência
```bash
# Testar sistema de emergência
yarn emergency --test

# Validar configurações
yarn emergency --validate

# Gerar relatório de emergência
yarn emergency --report
```

#### Relatórios
```bash
# Relatório de testes
yarn report --test

# Relatório de release
yarn report --release

# Relatório de deploy
yarn report --deploy
```

#### Desenvolvimento
```bash
# Modo desenvolvimento
yarn dev

# Build do projeto
yarn build

# Executar testes
yarn test

# Linting
yarn lint
```

### Exemplos de Uso

#### 1. Auditoria WCAG de um Site

```bash
# Executar auditoria WCAG
yarn audit:wcag

# Output esperado:
# ✅ Score WCAG: 85%
# ✅ Violações críticas: 0
# ✅ Conformidade WCAG 2.1 AA: CONFORME
```

#### 2. Monitorização Contínua

```bash
# Iniciar monitorização
yarn monitor

# O sistema irá:
# - Verificar sites a cada hora
# - Enviar alertas por email
# - Gerar relatórios automáticos
# - Notificar em caso de violações
```

#### 3. Teste de Emergência

```bash
# Testar sistema de emergência
yarn emergency --test

# Output esperado:
# ✅ Sistema de emergência funcionando
# ✅ Notificações configuradas
# ✅ Templates de email prontos
```

---

## 🚨 Sistema de Emergência

### Classificação de Incidentes

| Nível | SLA | Descrição | Ação |
|-------|-----|-----------|------|
| **P0** | 2h | Violação crítica que impede acesso | Notificação imediata + Autoridade |
| **P1** | 8h | Violação alta que afeta usabilidade | Notificação equipa + Correção urgente |
| **P2** | 24h | Violação média que pode ser melhorada | Notificação manutenção + Planeamento |

### Fluxo de Emergência

1. **Deteção Automática**: Sistema identifica violação
2. **Classificação**: P0/P1/P2 baseado na severidade
3. **Notificação**: Email automático para equipa
4. **Tracking**: Acompanhamento até resolução
5. **Relatório**: Documentação da correção

### Templates de Comunicação

#### Email de Emergência P0
```
🚨 ALERTA DE EMERGÊNCIA - CRÍTICO

Violação WCAG 2.1 AA detectada:
- Site: [URL]
- Critério: [WCAG_ID]
- Descrição: [DETAILS]
- SLA: 2 horas

Ação imediata necessária!
```

#### Comunicação com Autoridade
```
[URGENTE] Violação Acessibilidade Digital

Detalhes do incidente:
- ID: [INCIDENT_ID]
- Severidade: P0
- SLA: 2 horas
- Medidas tomadas: [ACTIONS]

Contacto técnico: [TECH_CONTACT]
```

---

## 🔧 Workflows CI/CD

### Test Suite (`test.yml`)

**Trigger**: Pull requests e pushes para `development`/`master`

**Steps**:
1. ✅ Setup Node.js e dependências
2. ✅ Install Chromium
3. ✅ Lint code
4. ✅ Lint commits (conventional commits)
5. ✅ Accessibility Tests
6. ✅ Portfolio Audit
7. ✅ Emergency Response Test
8. ✅ Generate Test Report
9. ✅ Upload Test Results

### Release Management (`release.yml`)

**Trigger**: Tags `v*`

**Steps**:
1. ✅ Get version from tag
2. ✅ Accessibility Pre-release Check
3. ✅ Create release
4. ✅ Generate Release Report
5. ✅ Upload Release Artifacts

### Sync Distribution (`sync-dist.yml`)

**Trigger**: Push para `master`/`development`

**Steps**:
1. ✅ Build project
2. ✅ Configure rclone
3. ✅ Sync to DigitalOcean Spaces
4. ✅ Accessibility Post-deploy Check
5. ✅ Generate Deploy Report

### Configuração de Secrets nos Workflows

```yaml
env:
  # SMTP Configuration via Secrets
  SMTP_HOST: ${{ secrets.SMTP_HOST }}
  SMTP_PORT: ${{ secrets.SMTP_PORT }}
  SMTP_USER: ${{ secrets.SMTP_USER }}
  SMTP_PASS: ${{ secrets.SMTP_PASS }}
  SMTP_FROM: ${{ secrets.SMTP_FROM }}
  
  # Email Configuration via Secrets
  ALERT_EMAIL: ${{ secrets.ALERT_EMAIL }}
  EMERGENCY_EMAIL: ${{ secrets.EMERGENCY_EMAIL }}
  AUTHORITY_EMAIL: ${{ secrets.AUTHORITY_EMAIL }}
```

---

## 🛠️ Troubleshooting

### Problemas Comuns

#### 1. "SMTP_PASS not found"
```bash
# Solução: Verificar se o secret está configurado
# Settings → Secrets → Actions → SMTP_PASS
```

#### 2. "Authentication failed"
```bash
# Solução: 
# 1. Verificar senha do Gmail
# 2. Ativar "Less secure app access"
# 3. Ou usar App Password do Gmail
```

#### 3. "Puppeteer timeout"
```bash
# Solução: Aumentar timeout
export PUPPETEER_TIMEOUT=30000
yarn audit:wcag
```

#### 4. "Commitlint errors"
```bash
# Solução: Usar conventional commits
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue"
git commit -m "docs: update documentation"
```

### Logs e Debug

#### Verificar Logs
```bash
# Logs de acessibilidade
tail -f logs/accessibility.log

# Logs de emergência
tail -f logs/emergency.log

# Logs de erro
tail -f logs/error.log
```

#### Debug Mode
```bash
# Ativar debug
export LOG_LEVEL=debug
yarn audit:wcag
```

### Verificação de Configuração

#### Testar Configuração Completa
```bash
# Testar todas as funcionalidades
yarn emergency --validate
yarn audit:wcag
yarn report --test
```

#### Verificar Secrets
```bash
# Verificar se secrets estão acessíveis
yarn emergency --test
# Deve enviar email de teste se configurado corretamente
```

---

## 📞 Suporte

### Contactos Técnicos

- **Email**: mauriciopereita@untile.pt
- **Slack**: #accessibility-emergency
- **Telefone**: +351-XXX-XXX-XXX (24/7 para emergências)

### Recursos Adicionais

- **Documentação WCAG**: https://www.w3.org/WAI/WCAG21/quickref/
- **EAA 2025**: https://digital-strategy.ec.europa.eu/en/policies/european-accessibility-act
- **GitHub Issues**: https://github.com/moixocreative/accessibility-monitoring/issues

### Checklist de Configuração

#### ✅ Secrets Configuradas
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASS`
- [ ] `SMTP_FROM`
- [ ] `ALERT_EMAIL`
- [ ] `EMERGENCY_EMAIL`
- [ ] `AUTHORITY_EMAIL`

#### ✅ Testes Funcionando
- [ ] `yarn test` - Todos os testes passam
- [ ] `yarn audit:wcag` - Validação WCAG funciona
- [ ] `yarn emergency --test` - Sistema de emergência OK
- [ ] Workflows GitHub Actions - Todos passam

#### ✅ Sistema Pronto
- [ ] Monitorização automática configurada
- [ ] Alertas por email funcionando
- [ ] Relatórios sendo gerados
- [ ] Documentação atualizada

---

## 📄 Licença

Este projeto é propriedade da UNTILE e está sujeito aos termos de uso internos.

---

**Desenvolvido com ❤️ pela equipa UNTILE**

*Última atualização: Agosto 2025* 