# Configuração de Email - Sistema de Emergência UNTILE

## Visão Geral

O sistema de notificações por email do UNTILE Accessibility Monitoring System foi configurado para funcionar tanto em ambiente de produção como em testes, garantindo que os testes passem sem depender de configurações SMTP reais.

## Variáveis de Ambiente

### Configuração Principal

```bash
# Controlo de envio de emails
SEND_EMAILS=false  # Padrão: false (simula emails em testes)

# Ambiente de execução
NODE_ENV=test      # Para testes
CI=true            # Para CI/CD
```

### Configuração SMTP (Produção)

```bash
# Configurações SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@untile.pt
SMTP_PASS=your_smtp_password
SMTP_FROM=your_email@untile.pt

# Emails de destino
ALERT_EMAIL=mauriciopereita@untile.pt
EMERGENCY_EMAIL=mauriciopereita@untile.pt
AUTHORITY_EMAIL=mauriciopereita@untile.pt
```

## Modos de Operação

### 1. Modo Teste (Padrão)
- **Detecção**: `NODE_ENV=test` ou `CI=true`
- **Comportamento**: Simula envio de emails
- **Logs**: Mostra "📧 EMAIL SIMULADO (Test Mode)"
- **Erros**: Não falha os testes por problemas SMTP

### 2. Modo Produção
- **Detecção**: `SEND_EMAILS=true` e não está em modo teste
- **Comportamento**: Envia emails reais via SMTP
- **Logs**: Envio real de emails
- **Erros**: Falha se houver problemas SMTP

### 3. Modo Desabilitado
- **Detecção**: `SEND_EMAILS=false`
- **Comportamento**: Simula emails (mesmo comportamento do teste)
- **Logs**: Mostra "📧 EMAIL SIMULADO (Test Mode)"
- **Erros**: Não falha

## Tipos de Notificação

### 1. Alertas de Emergência
```typescript
await notificationService.sendEmergencyAlert({
  title: "Violação Crítica WCAG",
  description: "Contraste insuficiente detectado",
  severity: "P0",
  url: "https://example.com",
  violations: ["1.4.3"]
});
```

### 2. Alertas de Manutenção
```typescript
await notificationService.sendMaintenanceAlert({
  title: "Manutenção Programada",
  description: "Atualização de segurança",
  action: "Reiniciar servidor",
  url: "https://example.com"
});
```

### 3. Notificações para Autoridades
```typescript
await notificationService.sendAuthorityNotification({
  id: "incident_123",
  title: "Violação Grave de Acessibilidade",
  type: "P0"
});
```

## Configuração no GitHub Actions

O workflow `.github/workflows/test.yml` está configurado para:

```yaml
env:
  NODE_ENV: test
  CI: true
  SEND_EMAILS: false
```

Isso garante que:
- Os testes passem sem depender de SMTP real
- Os emails sejam simulados durante CI/CD
- Não haja falhas por problemas de autenticação

## Troubleshooting

### Problema: "Invalid login: 535-5.7.8 Username and Password not accepted"
**Solução**: Verificar se `SEND_EMAILS=false` está definido para testes

### Problema: Emails não são enviados em produção
**Solução**: Verificar se `SEND_EMAILS=true` e as credenciais SMTP estão corretas

### Problema: Testes falham por timeout de email
**Solução**: Verificar se `NODE_ENV=test` ou `CI=true` estão definidos

## Exemplo de Configuração Completa

### Para Desenvolvimento (.env)
```bash
NODE_ENV=development
SEND_EMAILS=false
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=dev@untile.pt
SMTP_PASS=dev_password
```

### Para Produção (.env)
```bash
NODE_ENV=production
SEND_EMAILS=true
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=prod@untile.pt
SMTP_PASS=prod_password
```

### Para Testes (.env.test)
```bash
NODE_ENV=test
SEND_EMAILS=false
# Não precisa de configuração SMTP
```

## Segurança

- As credenciais SMTP devem ser armazenadas como secrets no GitHub
- Nunca commitar credenciais reais no código
- Usar variáveis de ambiente para todas as configurações sensíveis
- Em testes, sempre simular emails para evitar exposição de credenciais 