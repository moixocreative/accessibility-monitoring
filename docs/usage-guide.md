# Guia de Uso - UNTILE Accessibility Monitoring System

## Visão Geral

O UNTILE Accessibility Monitoring System é uma ferramenta completa para monitorização contínua de acessibilidade digital, garantindo conformidade com WCAG 2.1 AA e preparação para EAA 2025.

## Scripts Principais

### 1. Monitorização Contínua
```bash
# Iniciar monitorização contínua
yarn monitor

# Monitorização com logs detalhados
yarn monitor --verbose
```

**Funcionalidades:**
- Monitorização automática de todos os sites do portfolio
- Deteção de violações WCAG em tempo real
- Alertas automáticos por email
- Relatórios periódicos

### 2. Auditoria WCAG
```bash
# Auditoria única de um site
yarn audit:wcag

# Auditoria com URL específica
yarn audit:wcag --url https://example.com

# Auditoria completa do portfolio
yarn audit:portfolio
```

**Critérios Verificados:**
- **1.1.1** - Conteúdo não textual
- **1.4.3** - Contraste (mínimo)
- **1.4.4** - Redimensionar texto
- **2.1.1** - Teclado
- **2.4.1** - Bypass blocks
- **2.4.7** - Foco visível
- E mais 9 critérios prioritários

### 3. Sistema de Emergência
```bash
# Testar sistema de emergência
yarn emergency --test

# Validar configurações
yarn emergency --validate

# Gerar relatório de emergência
yarn emergency --report
```

**Classificação de Incidentes:**
- **P0 (Crítico)**: SLA 2 horas
- **P1 (Alto)**: SLA 8 horas
- **P2 (Médio)**: SLA 24 horas

### 4. Geração de Relatórios
```bash
# Relatório de testes
yarn report --test

# Relatório de release
yarn report --release

# Relatório de deploy
yarn report --deploy
```

## Configuração do Portfolio

### Adicionar Sites para Monitorizar
Editar `src/monitoring/portfolio-monitor.ts`:

```typescript
private loadPortfolioSites(): void {
  this.sites = [
    {
      id: 'site_1',
      name: 'Welligence Website',
      url: 'https://welligence.pt',
      technology: 'webflow',
      client: 'Welligence',
      lastAudit: new Date(),
      wcagScore: 85,
      violations: [],
      status: 'active'
    },
    // Adicionar mais sites aqui
  ];
}
```

### Configurar Critérios Prioritários
Editar `src/core/wcag-criteria.ts`:

```typescript
export const PRIORITY_WCAG_CRITERIA: WCAGCriteria[] = [
  // Critérios já configurados
  // Adicionar critérios específicos se necessário
];
```

## Configuração de Notificações

### 1. Configuração de Email
```bash
# Habilitar envio de emails
SEND_EMAILS=true

# Configurar SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=accessibility@untile.pt
SMTP_PASS=sua_senha_aqui
```

### 2. Configuração de Alertas
```bash
# Emails de emergência
EMERGENCY_EMAIL=emergency@untile.pt
AUTHORITY_EMAIL=authority@untile.pt

# Configuração de SLA
P0_SLA_HOURS=2
P1_SLA_HOURS=8
P2_SLA_HOURS=24
```

## Interpretação de Resultados

### Scores WCAG
- **90-100%**: Excelente conformidade
- **80-89%**: Boa conformidade
- **70-79%**: Conformidade aceitável
- **<70%**: Requer atenção imediata

### Tipos de Violação
- **Critical**: Bloqueia completamente o acesso
- **Serious**: Dificulta significativamente o acesso
- **Moderate**: Dificulta parcialmente o acesso
- **Minor**: Pequena dificuldade no acesso

### Exemplo de Relatório
```
🎯 AUDITORIA WCAG - https://example.com
========================================
Score WCAG: 85%
Total de violações: 3
Violações críticas: 0
Violações sérias: 2
Violações moderadas: 1

🚨 VIOLAÇÕES DETETADAS:
- 1.4.3: Contraste insuficiente no texto
- 2.4.7: Foco não visível em elementos interativos
- 1.1.1: Imagem sem texto alternativo

✅ RECOMENDAÇÕES:
1. Aumentar contraste do texto para 4.5:1
2. Adicionar outline visível ao foco
3. Incluir alt text em todas as imagens
```

## Monitorização Contínua

### Configuração de Intervalos
```bash
# Intervalo de monitorização (em milissegundos)
MONITORING_INTERVAL=3600000  # 1 hora

# Intervalo de relatórios
REPORT_INTERVAL=86400000      # 24 horas

# Intervalo de verificação de SLA
SLA_CHECK_INTERVAL=300000     # 5 minutos
```

### Logs e Monitorização
```bash
# Ver logs em tempo real
tail -f logs/accessibility.log

# Ver logs de emergência
tail -f logs/emergency.log

# Ver logs de erro
tail -f logs/error.log
```

## API REST

### Endpoints Disponíveis

#### Health Check
```bash
GET /health
```
**Resposta:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "service": "UNTILE Accessibility Monitoring System"
}
```

#### Portfolio Stats
```bash
GET /api/portfolio/stats
```
**Resposta:**
```json
{
  "totalSites": 3,
  "auditedSites": 3,
  "averageScore": 85.3,
  "complianceTrend": 2.1,
  "lastAudit": "2024-01-15T10:30:00Z"
}
```

#### Emergency Incidents
```bash
GET /api/emergency/incidents
```
**Resposta:**
```json
{
  "incidents": [
    {
      "id": "incident_123",
      "type": "P0",
      "title": "Violação Crítica WCAG",
      "status": "detected",
      "detectedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Troubleshooting

### Problema: Monitorização não inicia
**Solução:**
```bash
# Verificar configuração
yarn emergency --validate

# Verificar logs
tail -f logs/error.log
```

### Problema: Testes falham
**Solução:**
```bash
# Limpar cache
rm -rf node_modules/.cache

# Reinstalar dependências
yarn install

# Executar testes
yarn test
```

### Problema: Emails não são enviados
**Solução:**
```bash
# Verificar configuração SMTP
yarn emergency --test

# Verificar logs
tail -f logs/emergency.log
```

## Próximos Passos

1. **Configurar Sites**: Adicionar URLs do portfolio
2. **Configurar Alertas**: Definir emails de emergência
3. **Testar Sistema**: Executar auditoria completa
4. **Monitorizar Logs**: Verificar funcionamento
5. **Configurar CI/CD**: Integrar com GitHub Actions

## Suporte

Para questões de uso:
- **Email**: mauriciopereita@untile.pt
- **Documentação**: [Guia de Desenvolvimento](development-guide.md)
- **Logs**: Verificar ficheiros em `logs/` 