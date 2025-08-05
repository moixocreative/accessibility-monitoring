# UNTILE Accessibility Monitoring System

## 📋 Resumo Executivo

O **UNTILE Accessibility Monitoring System** é uma ferramenta completa de monitorização de acessibilidade digital que garante conformidade com **WCAG 2.1 AA** e prepara a empresa para a **EAA 2025** (European Accessibility Act).

### 🎯 Funcionalidades Principais

#### 🔍 **Monitorização Automática**
- **Auditoria Portfolio:** Análise automática de todos os sites UNTILE
- **Validação WCAG:** Verificação dos 15 critérios prioritários
- **Alertas Tempo Real:** Notificações de violações críticas
- **Relatórios Automáticos:** Geração de relatórios de conformidade

#### 🚨 **Sistema de Emergência**
- **SLA 24h:** Resposta automática a violações críticas
- **Classificação P0/P1/P2:** Sistema de priorização de incidentes
- **Comunicação Automática:** Templates para autoridades e clientes
- **Notificações Flexíveis:** Email configurável (simulado por padrão)

#### 🛠️ **Actions de Controlo**
- **Test Suite:** Validação automatizada em cada commit
- **Release Management:** Gestão de releases com conformidade
- **Sync Distribution:** Sincronização com ambientes de produção

## 🚀 Instalação Rápida

### Pré-requisitos
- **Node.js:** >=18.0.0
- **Yarn:** >=1.22.0
- **Git:** >=2.30.0

### Passos de Instalação

```bash
# 1. Clone do repositório
git clone https://github.com/moixocreative/accessibility-monitoring.git
cd accessibility-monitoring

# 2. Instalação de dependências
yarn install

# 3. Configuração de ambiente
cp env.example .env
# Editar .env com suas configurações

# 4. Verificação da instalação
yarn lint      # Verificar linting
yarn build     # Compilar TypeScript
yarn test      # Executar testes
```

## 📋 Scripts Disponíveis

### Desenvolvimento
```bash
yarn dev          # Modo desenvolvimento
yarn build        # Build do projeto
yarn test         # Executar testes
yarn lint         # Linting
```

### Monitorização
```bash
yarn monitor          # Monitorização contínua
yarn audit           # Auditoria completa
yarn audit:portfolio # Auditoria específica do portfolio
yarn audit:wcag      # Validação WCAG 2.1 AA
```

### Emergência
```bash
yarn emergency       # Procedimentos de emergência
yarn emergency --test # Teste do sistema de emergência
yarn emergency --validate # Validar configurações
yarn emergency --report   # Gerar relatório de emergência
```

### Relatórios
```bash
yarn report          # Geração de relatórios
yarn report --test   # Teste de geração de relatórios
yarn report --release # Relatório de release
yarn report --deploy  # Relatório de deploy
```

## 🏗️ Arquitetura

```
src/
├── core/           # Lógica principal
├── monitoring/     # Sistema de monitorização
├── validation/     # Validação WCAG
├── emergency/      # Sistema de emergência
├── reporting/      # Geração de relatórios
├── api/           # API REST
├── utils/         # Utilitários
└── scripts/       # Scripts executáveis
```

## 🎯 Critérios WCAG 2.1 AA Prioritários

### 15 Critérios Prioritários UNTILE
1. **1.1.1** Conteúdo Não-Textual (A) - P0
2. **1.4.3** Contraste (Mínimo) (AA) - P0
3. **1.4.4** Redimensionar Texto (AA) - P1
4. **1.2.2** Legendas (Pré-gravado) (A) - P1
5. **1.3.1** Info e Relações (A) - P1
6. **1.4.10** Reflow (AA) - P2
7. **2.1.1** Teclado (A) - P0
8. **2.4.1** Saltar Blocos (A) - P1
9. **2.4.2** Título da Página (A) - P2
10. **2.4.7** Foco Visível (AA) - P1
11. **2.2.1** Tempo Ajustável (A) - P2
12. **3.3.1** Identificação de Erro (A) - P1
13. **3.3.2** Rótulos ou Instruções (A) - P0
14. **3.1.1** Idioma da Página (A) - P2
15. **4.1.2** Nome, Função, Valor (A) - P0

### Tecnologias
- **Node.js:** Runtime principal
- **TypeScript:** Linguagem de desenvolvimento
- **Puppeteer:** Automação de navegador
- **axe-core:** Validação de acessibilidade
- **Lighthouse:** Auditoria de performance e acessibilidade
- **Express:** API REST
- **Winston:** Logging estruturado
- **3.2.1** - Foco
- **3.2.2** - Input

### 4. Robusto (R)
- **4.1.1** - Parsing
- **4.1.2** - Nome, função, valor

## 🚨 Sistema de Emergência

### Classificação de Incidentes
- **P0 - CRÍTICO:** 2h de resposta (autoridade reguladora)
- **P1 - ALTO:** 8h de resposta (queixa de utilizador)
- **P2 - MÉDIO:** 24h de resposta (alerta automático)

### Workflow de Emergência
1. **Deteção:** Sistema automático ou manual
2. **Classificação:** P0/P1/P2 baseado no impacto
3. **Resposta:** Equipa técnica mobilizada
4. **Correção:** Implementação de soluções
5. **Validação:** Testes automatizados e manuais
6. **Comunicação:** Templates para stakeholders

## 📊 Monitorização

### Métricas Principais
- **Conformidade WCAG:** Percentagem de critérios cumpridos
- **Violações Críticas:** Número de violações P0/P1
- **Tempo de Resposta:** SLA para correções
- **Cobertura Portfolio:** Sites monitorizados

### Sites Monitorizados
- Website principal
- Área de cliente
- Portal de serviços
- Documentação técnica

## 🔧 Configuração

### Variáveis de Ambiente
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

## 📚 Documentação

### Guias Principais
- [Guia de Instalação](./docs/installation-guide.md) - Instruções detalhadas de instalação e configuração
- [Guia de Utilização](./docs/usage-guide.md) - Como usar todas as funcionalidades do sistema
- [Guia de Desenvolvimento](./docs/development-guide.md) - Instruções para desenvolvedores

### Documentação Técnica
- [Configuração de Emails](./docs/email-configuration.md) - Configuração do sistema de notificações
- [Anexo A - Critérios WCAG 2.1 AA](./docs/anexo_a_wcag_criteria_revised.md)
- [Anexo B - Conformidade Legal EAA 2025](./docs/anexo_b_legal_compliance_revised.md)
- [Anexo I - Monitorização Automática](./docs/anexo_i_automated_monitoring_revised.md)

## 🤝 Contribuição

1. Fork do projeto
2. Criação de branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit das alterações (`git commit -m 'feat: add some AmazingFeature'`)
4. Push para o branch (`git push origin feature/AmazingFeature`)
5. Abertura de Pull Request

### Regras de Commit
- **Formato:** `type: subject` (lowercase, max 72 chars)
- **Tipos:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- **Exemplo:** `feat: add emergency notification system`

## 📄 Licença

Este projeto é propriedade da UNTILE e está sujeito aos termos de uso internos.

## 📞 Suporte

Para questões técnicas ou de conformidade:
- **Email:** accessibility@untile.pt
- **Slack:** #accessibility-emergency
- **Telefone:** +351-XXX-XXX-XXX (24/7 para emergências)

## 🎯 Roadmap

### Versão 1.1.0
- [ ] Integração com Slack
- [ ] Dashboard web
- [ ] Relatórios PDF
- [ ] API REST completa

### Versão 1.2.0
- [ ] Suporte WCAG 2.2
- [ ] Monitorização mobile
- [ ] Integração com CMS
- [ ] Analytics avançados

**Desenvolvido com ❤️ pela equipa UNTILE**
