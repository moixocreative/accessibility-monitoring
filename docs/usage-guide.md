# Guia de Utilização - UNTILE Accessibility Monitoring

## 🎯 Visão Geral

Este guia explica como utilizar o sistema de monitorização de acessibilidade UNTILE para garantir conformidade WCAG 2.1 AA.

## 📊 Scripts Principais

### 🔍 Monitorização

#### Auditoria WCAG
```bash
# Auditoria completa WCAG 2.1 AA
yarn audit:wcag

# Saída esperada:
# 🎯 CRITÉRIOS WCAG 2.1 AA PRIORITÁRIOS UNTILE
# 📊 RESULTADOS DA AUDITORIA
# Score WCAG: 84%
# ✅ NENHUMA VIOLAÇÃO DETETADA
```

#### Auditoria Portfolio
```bash
# Auditoria de todos os sites do portfolio
yarn audit:portfolio

# Saída esperada:
# 📊 ESTATÍSTICAS DO PORTFOLIO
# Total de sites: 3
# Score médio WCAG: 84%
# 🌐 SITES DO PORTFOLIO
```

#### Monitorização Contínua
```bash
# Monitorização em tempo real
yarn monitor

# Monitoriza continuamente e gera alertas
```

### 🚨 Sistema de Emergência

#### Teste do Sistema
```bash
# Teste completo do sistema de emergência
yarn emergency --test

# Saída esperada:
# 🧪 TESTES DO SISTEMA DE EMERGÊNCIA
# ✅ Incidente P0 criado
# ✅ Incidente P1 criado
# ✅ Todos os testes passaram
```

#### Execução Real
```bash
# Executar sistema de emergência
yarn emergency

# Processa incidentes reais e envia notificações
```

### 📋 Relatórios

#### Geração de Relatórios
```bash
# Gerar relatório completo
yarn report

# Saída esperada:
# 📊 RELATÓRIO DE CONFORMIDADE WCAG
# 📈 ESTATÍSTICAS GERAIS
# 🎯 RECOMENDAÇÕES
```

#### Teste de Relatórios
```bash
# Testar geração de relatórios
yarn report --test

# Gera relatório de teste sem dados reais
```

## 🔧 Configuração de Portfolio

### Adicionar Novo Site
Editar `src/monitoring/portfolio-monitor.ts`:

```typescript
const portfolio = [
  // Sites existentes...
  {
    id: 'novo-site',
    name: 'Novo Site',
    url: 'https://novo-site.pt',
    technology: 'wordpress'
  }
];
```

### Configurar Critérios WCAG
Editar `src/core/wcag-criteria.ts`:

```typescript
export const PRIORITY_CRITERIA = [
  '1.1.1',  // Conteúdo Não-Textual
  '1.4.3',  // Contraste
  '2.1.1',  // Teclado
  // Adicionar/remover critérios conforme necessário
];
```

## 📧 Configuração de Notificações

### Habilitar Emails Reais
```bash
# Configurar variáveis de ambiente
export SEND_EMAILS=true
export SMTP_HOST=smtp.gmail.com
export SMTP_USER=accessibility@untile.pt
export SMTP_PASS=sua_senha_app

# Testar configuração
yarn emergency --test
```

### Configurar Destinatários
```bash
# Emails de emergência
export EMERGENCY_EMAIL=emergency@untile.pt
export MAINTENANCE_EMAIL=maintenance@untile.pt

# Telefone de emergência
export EMERGENCY_PHONE=+351-XXX-XXX-XXX
```

## 📊 Interpretação de Resultados

### Scores WCAG
- **90-100%:** Excelente conformidade
- **80-89%:** Boa conformidade
- **70-79%:** Conformidade aceitável
- **<70%:** Não conforme

### Classificação de Incidentes
- **P0 (Crítico):** SLA 2h - Autoridade reguladora
- **P1 (Alto):** SLA 8h - Queixa de utilizador
- **P2 (Médio):** SLA 24h - Alerta automático

### Violações por Critério
```bash
# Exemplo de saída
1.1.1 - Conteúdo Não-Textual: ❌ 3 violações
1.4.3 - Contraste: ✅ Conforme
2.1.1 - Teclado: ⚠️ 1 violação
```

## 🔍 Troubleshooting

### Problema: "Browser não disponível"
```bash
# Solução: Sistema funciona em modo simulação
# Logs mostram: "SIMULAÇÃO: Email simulado enviado"
# Comportamento normal em ambiente de teste
```

### Problema: "Lighthouse timeout"
```bash
# Solução: Aumentar timeout
export LIGHTHOUSE_TIMEOUT=60000
yarn audit:wcag
```

### Problema: "SMTP connection failed"
```bash
# Solução: Desabilitar emails para testes
export SEND_EMAILS=false
yarn emergency --test
```

### Problema: "No tests found"
```bash
# Solução: Comportamento normal
# Sistema não tem testes unitários ainda
# Funcionalidades testadas via scripts
```

## 📈 Monitorização Contínua

### Configurar Cron Job
```bash
# Adicionar ao crontab
0 */6 * * * cd /path/to/accessibility-monitoring && yarn audit:portfolio >> logs/cron.log 2>&1
```

### Monitorizar Logs
```bash
# Ver logs em tempo real
tail -f logs/accessibility.log

# Ver logs de emergência
tail -f logs/emergency.log

# Ver logs de auditoria
tail -f logs/audit.log
```

## 🚀 Integração com CI/CD

### GitHub Actions
O sistema inclui workflows automáticos:
- **Test Suite:** Executa em cada PR
- **Release Management:** Gestão de releases
- **Sync Distribution:** Sincronização com produção

### Configuração Local
```bash
# Executar testes localmente
yarn lint && yarn build && yarn test

# Verificar se tudo passa antes do push
```

## 📋 Checklist de Utilização

### ✅ Configuração Inicial
- [ ] Instalação concluída
- [ ] Variáveis de ambiente configuradas
- [ ] Portfolio configurado
- [ ] Testes passando

### ✅ Monitorização Diária
- [ ] Auditoria WCAG executada
- [ ] Portfolio auditado
- [ ] Relatórios gerados
- [ ] Logs verificados

### ✅ Emergência
- [ ] Sistema de emergência testado
- [ ] Notificações configuradas
- [ ] Templates verificados
- [ ] SLA monitorizado

### ✅ Manutenção
- [ ] Logs limpos
- [ ] Dependências atualizadas
- [ ] Backup realizado
- [ ] Performance verificada

## 🎯 Melhores Práticas

### 1. Monitorização Regular
- Executar auditoria WCAG diariamente
- Verificar portfolio semanalmente
- Gerar relatórios mensalmente

### 2. Gestão de Incidentes
- Responder a P0 em 2h
- Responder a P1 em 8h
- Documentar todas as ações

### 3. Configuração Segura
- Nunca commitar credenciais
- Usar variáveis de ambiente
- Manter logs organizados

### 4. Performance
- Monitorizar uso de recursos
- Limpar logs antigos
- Otimizar configurações

## 🆘 Suporte

### Comandos de Ajuda
```bash
# Ver scripts disponíveis
yarn run

# Ver logs detalhados
yarn audit:wcag --verbose

# Testar configuração
yarn emergency --test
```

### Contactos
- **Email:** accessibility@untile.pt
- **Slack:** #accessibility-emergency
- **Telefone:** +351-XXX-XXX-XXX (24/7)

### Documentação
- [Guia de Instalação](./installation-guide.md)
- [Configuração de Emails](./email-configuration.md)
- [README Principal](../README.md) 