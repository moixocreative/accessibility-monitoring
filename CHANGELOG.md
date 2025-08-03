# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste ficheiro.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2024-12-19

### Adicionado
- Sistema completo de monitorização de acessibilidade UNTILE
- Validação WCAG 2.1 AA com 15 critérios prioritários
- Monitorização automática do portfolio
- Sistema de resposta de emergência com SLA 24h
- API REST para gestão do sistema
- GitHub Actions para CI/CD
- Scripts executáveis para auditoria e relatórios
- Sistema de logging estruturado
- Notificações por email e Slack
- Templates de comunicação para autoridades
- Relatórios automáticos de conformidade

### Funcionalidades Principais
- **Monitorização Portfolio**: Auditoria automática de todos os sites UNTILE
- **Validação WCAG**: Verificação dos 15 critérios prioritários
- **Emergency Response**: Sistema de resposta com classificação P0/P1/P2
- **API REST**: Endpoints para gestão do sistema
- **GitHub Actions**: Test Suite, Release Management, Sync Distribution
- **Relatórios**: Geração automática de relatórios de conformidade

### Tecnologias
- Node.js 18+
- TypeScript
- Puppeteer para automação
- axe-core para validação WCAG
- Lighthouse para auditoria
- Express para API REST
- Winston para logging
- Nodemailer para notificações

### Conformidade
- WCAG 2.1 AA (50 critérios)
- EAA 2025 (European Accessibility Act)
- EN 301 549 (Harmonized Standard)
- Preparação para WCAG 2.2

### Documentação
- README completo com instruções de instalação
- Documentação da API REST
- Guias de configuração
- Templates de comunicação
- Procedimentos de emergência 