# UNTILE Accessibility Monitoring System

Sistema de monitorização de acessibilidade para conformidade WCAG 2.1 AA - UNTILE

## 🎯 Objetivo

Implementar um sistema completo de monitorização de acessibilidade que garante conformidade com WCAG 2.1 AA e prepara a empresa para a EAA 2025.

## 📋 Funcionalidades

### Monitorização Automática
- **Auditoria Portfolio**: Análise automática de todos os sites UNTILE
- **Validação WCAG**: Verificação dos 15 critérios prioritários
- **Alertas Tempo Real**: Notificações de violações críticas
- **Relatórios Automáticos**: Geração de relatórios de conformidade

### Actions de Controlo (GitHub Actions)
- **Test Suite**: Validação automatizada em cada commit
- **Release Management**: Gestão de releases com conformidade
- **Sync Distribution**: Sincronização com ambientes de produção

### Procedimentos de Emergência
- **SLA 24h**: Resposta automática a violações críticas
- **Classificação P0/P1/P2**: Sistema de priorização de incidentes
- **Comunicação Automática**: Templates para autoridades e clientes

## 🚀 Instalação

```bash
# Clone do repositório
git clone [repository-url]
cd untile-accessibility-monitoring

# Instalação de dependências
yarn install

# Configuração de ambiente
cp env.example .env
# Editar .env com configurações específicas

# Execução
yarn start
```

## 📊 Scripts Disponíveis

```bash
# Monitorização
yarn monitor          # Monitorização contínua
yarn audit           # Auditoria completa
yarn audit:portfolio # Auditoria específica do portfolio
yarn audit:wcag      # Validação WCAG 2.1 AA

# Emergência
yarn emergency       # Procedimentos de emergência

# Relatórios
yarn report          # Geração de relatórios
```

## 🏗️ Arquitetura

### Estrutura do Projeto
```
src/
├── core/           # Lógica principal
├── monitoring/     # Sistema de monitorização
├── validation/     # Validação WCAG
├── emergency/      # Procedimentos de emergência
├── reporting/      # Geração de relatórios
├── api/           # API REST
└── scripts/       # Scripts executáveis
```

### Tecnologias
- **Node.js**: Runtime principal
- **TypeScript**: Linguagem de desenvolvimento
- **Puppeteer**: Automação de navegador
- **axe-core**: Validação de acessibilidade
- **Lighthouse**: Auditoria de performance e acessibilidade
- **Express**: API REST
- **Winston**: Logging estruturado

## 📈 Critérios WCAG 2.1 AA Prioritários

### 15 Critérios Prioritários UNTILE
1. **1.1.1** Conteúdo Não-Textual (A)
2. **1.4.3** Contraste (Mínimo) (AA)
3. **1.4.4** Redimensionar Texto (AA)
4. **1.2.2** Legendas (Pré-gravado) (A)
5. **1.3.1** Info e Relações (A)
6. **1.4.10** Reflow (AA)
7. **2.1.1** Teclado (A)
8. **2.4.1** Saltar Blocos (A)
9. **2.4.2** Título da Página (A)
10. **2.4.7** Foco Visível (AA)
11. **2.2.1** Tempo Ajustável (A)
12. **3.3.1** Identificação de Erro (A)
13. **3.3.2** Rótulos ou Instruções (A)
14. **3.1.1** Idioma da Página (A)
15. **4.1.2** Nome, Função, Valor (A)

## 🚨 Procedimentos de Emergência

### Classificação de Incidentes
- **P0 - CRÍTICO**: 2h de resposta (autoridade reguladora)
- **P1 - ALTO**: 8h de resposta (queixa de utilizador)
- **P2 - MÉDIO**: 24h de resposta (alerta automático)

### Workflow de Emergência
1. **Deteção**: Sistema automático ou manual
2. **Classificação**: P0/P1/P2 baseado no impacto
3. **Resposta**: Equipa técnica mobilizada
4. **Correção**: Implementação de soluções
5. **Validação**: Testes automatizados e manuais
6. **Comunicação**: Templates para stakeholders

## 📊 Monitorização

### Métricas Principais
- **Conformidade WCAG**: Percentagem de critérios cumpridos
- **Violações Críticas**: Número de violações P0/P1
- **Tempo de Resposta**: SLA para correções
- **Cobertura Portfolio**: Sites monitorizados

### Alertas Automáticos
- Violações de critérios prioritários
- Degradação de conformidade
- Falhas de monitorização
- Alertas de emergência

## 🔧 Configuração

### Variáveis de Ambiente
```env
# Configurações Gerais
NODE_ENV=production
PORT=3000

# Monitorização
MONITORING_INTERVAL=3600000  # 1 hora
ALERT_EMAIL=accessibility@untile.pt

# WCAG Validation
WCAG_LEVEL=AA
PRIORITY_CRITERIA=15

# Emergency Contacts
EMERGENCY_PHONE=+351-XXX-XXX-XXX
AUTHORITY_EMAIL=authority@example.pt

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/accessibility
```

## 📚 Documentação

- [Anexo A - Critérios WCAG 2.1 AA](./docs/anexo_a_wcag_criteria_revised.md)
- [Anexo B - Conformidade Legal EAA 2025](./docs/anexo_b_legal_compliance_revised.md)
- [Anexo I - Monitorização Automática](./docs/anexo_i_automated_monitoring_revised.md)

## 🤝 Contribuição

1. Fork do projeto
2. Criação de branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit das alterações (`git commit -m 'Add some AmazingFeature'`)
4. Push para o branch (`git push origin feature/AmazingFeature`)
5. Abertura de Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - ver o ficheiro [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para questões técnicas ou de conformidade:
- **Email**: accessibility@untile.pt
- **Slack**: #accessibility-emergency
- **Telefone**: +351-XXX-XXX-XXX (24/7 para emergências) # Test
