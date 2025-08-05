# Configuração de Emails - Sistema de Emergência

## 📧 Configuração de Envio de Emails

O sistema de emergência UNTILE pode enviar notificações por email para alertas de acessibilidade. Por padrão, os emails estão **desabilitados** para facilitar testes e desenvolvimento.

### 🔧 Variáveis de Ambiente

#### Controle de Envio
```bash
# Habilitar envio de emails (padrão: false)
SEND_EMAILS=true

# Desabilitar envio de emails (padrão)
SEND_EMAILS=false
```

#### Configuração SMTP
```bash
# Servidor SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Credenciais
SMTP_USER=accessibility@untile.pt
SMTP_PASS=sua_senha_aqui

# Remetente
SMTP_FROM=accessibility@untile.pt

# Destinatários
EMERGENCY_EMAIL=emergency@untile.pt
MAINTENANCE_EMAIL=maintenance@untile.pt
```

### 🧪 Modos de Operação

#### 1. Modo de Teste (Padrão)
- **Detecção automática:** `NODE_ENV=test`, `CI=true`, `GITHUB_ACTIONS=true`
- **Comportamento:** Simula envio de emails sem tentar conectar ao SMTP
- **Logs:** "SIMULAÇÃO: Email simulado enviado"

#### 2. Modo de Desenvolvimento
- **Configuração:** `SEND_EMAILS=false` (padrão)
- **Comportamento:** Simula envio de emails
- **Uso:** Para desenvolvimento sem configurar SMTP

#### 3. Modo de Produção
- **Configuração:** `SEND_EMAILS=true` + configuração SMTP completa
- **Comportamento:** Envia emails reais
- **Uso:** Para produção com notificações reais

### 📋 Tipos de Notificação

#### 1. Alertas de Emergência (P0, P1, P2)
- **Destinatário:** `EMERGENCY_EMAIL`
- **Template:** HTML com cores baseadas na prioridade
- **SLA:** 2h (P0), 8h (P1), 24h (P2)

#### 2. Alertas de Manutenção
- **Destinatário:** `MAINTENANCE_EMAIL`
- **Template:** HTML com foco em manutenção
- **SLA:** 24h

#### 3. Notificações para Autoridade
- **Destinatário:** Configurável por incidente
- **Template:** Formal, para autoridades reguladoras
- **Uso:** Conformidade legal

### 🚀 Como Configurar

#### Para Desenvolvimento/Teste
```bash
# Não configurar nada - emails desabilitados por padrão
yarn emergency --test
```

#### Para Produção
```bash
# 1. Configurar variáveis de ambiente
export SEND_EMAILS=true
export SMTP_HOST=smtp.gmail.com
export SMTP_USER=accessibility@untile.pt
export SMTP_PASS=sua_senha_aqui

# 2. Testar configuração
yarn emergency --test

# 3. Executar em produção
yarn emergency
```

### 🔍 Logs e Debugging

#### Logs de Simulação
```
[info]: SIMULAÇÃO: Alerta de emergência simulado (SEND_EMAILS=false ou modo de teste)
```

#### Logs de Produção
```
[info]: Alerta de emergência enviado
[error]: Erro ao enviar alerta de emergência: Invalid login
```

### ⚠️ Troubleshooting

#### Erro: "Invalid login"
- **Causa:** Credenciais SMTP incorretas
- **Solução:** Verificar `SMTP_USER` e `SMTP_PASS`

#### Erro: "Connection timeout"
- **Causa:** Servidor SMTP inacessível
- **Solução:** Verificar `SMTP_HOST` e `SMTP_PORT`

#### Emails não são enviados
- **Causa:** `SEND_EMAILS=false` ou modo de teste
- **Solução:** Configurar `SEND_EMAILS=true` e SMTP

### 📝 Exemplo de .env
```bash
# Controle de emails
SEND_EMAILS=false

# Configuração SMTP (opcional se SEND_EMAILS=false)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=accessibility@untile.pt
SMTP_PASS=sua_senha_aqui
SMTP_FROM=accessibility@untile.pt

# Destinatários
EMERGENCY_EMAIL=emergency@untile.pt
MAINTENANCE_EMAIL=maintenance@untile.pt
```

### 🎯 Resumo

- **Padrão:** Emails desabilitados (`SEND_EMAILS=false`)
- **Testes:** Funcionam sem configuração SMTP
- **Produção:** Configurar `SEND_EMAILS=true` + SMTP
- **Logs:** Sempre informativos sobre o estado 