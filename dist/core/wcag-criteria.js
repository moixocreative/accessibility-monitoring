"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRIORITY_WCAG_CRITERIA = void 0;
exports.getCriteriaById = getCriteriaById;
exports.getCriteriaByPriority = getCriteriaByPriority;
exports.getCriteriaByPrinciple = getCriteriaByPrinciple;
exports.getCriticalCriteria = getCriticalCriteria;
exports.isPriorityCriteria = isPriorityCriteria;
exports.PRIORITY_WCAG_CRITERIA = [
    {
        id: '1.1.1',
        name: 'Conteúdo Não-Textual',
        level: 'A',
        principle: 'PERCEIVABLE',
        priority: 'P0',
        description: 'Fornecer alternativas de texto para conteúdo não-textual',
        technology: {
            webflow: 'Campos CMS para alt text obrigatórios',
            laravel: 'Componentes Blade com validação automática',
            wordpress: 'Plugin de validação automática'
        }
    },
    {
        id: '1.4.3',
        name: 'Contraste (Mínimo)',
        level: 'AA',
        principle: 'PERCEIVABLE',
        priority: 'P0',
        description: 'Contraste de cor mínimo 4.5:1 para texto normal, 3:1 para texto grande',
        technology: {
            webflow: 'Verificação manual obrigatória',
            laravel: 'Variáveis CSS com valores conformes',
            wordpress: 'Auditoria tema + CSS personalizado'
        }
    },
    {
        id: '1.4.4',
        name: 'Redimensionar Texto',
        level: 'AA',
        principle: 'PERCEIVABLE',
        priority: 'P1',
        description: 'Texto pode ser redimensionado até 200% sem scroll horizontal',
        technology: {
            webflow: 'Responsive breakpoints + unidades relativas',
            laravel: 'CSS Grid/Flexbox + unidades rem',
            wordpress: 'Auditoria responsiveness tema'
        }
    },
    {
        id: '1.2.2',
        name: 'Legendas (Pré-gravado)',
        level: 'A',
        principle: 'PERCEIVABLE',
        priority: 'P1',
        description: 'Legendas sincronizadas para conteúdo de vídeo',
        technology: {
            webflow: 'Vimeo/YouTube com legendas',
            laravel: 'Video.js com ficheiros VTT',
            wordpress: 'Plugin legendas automáticas'
        }
    },
    {
        id: '1.3.1',
        name: 'Info e Relações',
        level: 'A',
        principle: 'PERCEIVABLE',
        priority: 'P1',
        description: 'Informação e relações podem ser determinadas programaticamente',
        technology: {
            webflow: 'Código personalizado para HTML semântico',
            laravel: 'Templates Blade semânticos',
            wordpress: 'Auditoria estrutura semântica tema'
        }
    },
    {
        id: '1.4.10',
        name: 'Reflow',
        level: 'AA',
        principle: 'PERCEIVABLE',
        priority: 'P2',
        description: 'Sem scroll 2D em viewport de 320px de largura',
        technology: {
            webflow: 'Responsive nativo + testes 320px',
            laravel: 'CSS Grid + design mobile-first',
            wordpress: 'Otimização mobile tema'
        }
    },
    {
        id: '2.1.1',
        name: 'Teclado',
        level: 'A',
        principle: 'OPERABLE',
        priority: 'P0',
        description: 'Toda funcionalidade acessível via teclado',
        technology: {
            webflow: 'JavaScript personalizado para dropdowns/modais',
            laravel: 'Gestão foco nativo',
            wordpress: 'Auditoria navegação teclado tema'
        }
    },
    {
        id: '2.4.1',
        name: 'Saltar Blocos',
        level: 'A',
        principle: 'OPERABLE',
        priority: 'P1',
        description: 'Skip links para navegação principal',
        technology: {
            webflow: 'Implementação código personalizado obrigatório',
            laravel: 'Componente Blade automático',
            wordpress: 'Modificação tema necessária'
        }
    },
    {
        id: '2.4.2',
        name: 'Título da Página',
        level: 'A',
        principle: 'OPERABLE',
        priority: 'P2',
        description: 'Títulos únicos e descritivos para cada página',
        technology: {
            webflow: 'Campos CMS + configurações SEO',
            laravel: 'Títulos dinâmicos + helpers meta',
            wordpress: 'Plugin SEO + estrutura template'
        }
    },
    {
        id: '2.4.7',
        name: 'Foco Visível',
        level: 'AA',
        principle: 'OPERABLE',
        priority: 'P1',
        description: 'Indicadores de foco sempre visíveis',
        technology: {
            webflow: 'Estados foco CSS personalizados',
            laravel: 'Framework CSS com utilidades foco',
            wordpress: 'Auditoria indicadores foco tema'
        }
    },
    {
        id: '2.2.1',
        name: 'Tempo Ajustável',
        level: 'A',
        principle: 'OPERABLE',
        priority: 'P2',
        description: 'Timeouts ajustáveis pelo utilizador',
        technology: {
            webflow: 'Gestão sessão JavaScript',
            laravel: 'Configuração sessão + preferências utilizador',
            wordpress: 'Plugin gestão timeout'
        }
    },
    {
        id: '3.3.1',
        name: 'Identificação de Erro',
        level: 'A',
        principle: 'UNDERSTANDABLE',
        priority: 'P1',
        description: 'Erros identificados e descritos claramente',
        technology: {
            webflow: 'Validação JavaScript personalizada',
            laravel: 'Mensagens validação + ARIA',
            wordpress: 'Plugins formulário com error handling'
        }
    },
    {
        id: '3.3.2',
        name: 'Rótulos ou Instruções',
        level: 'A',
        principle: 'UNDERSTANDABLE',
        priority: 'P0',
        description: 'Labels programáticos em todos os campos',
        technology: {
            webflow: 'Associação label manual',
            laravel: 'Componentes formulário com labels automáticos',
            wordpress: 'Auditoria acessibilidade form builder'
        }
    },
    {
        id: '3.1.1',
        name: 'Idioma da Página',
        level: 'A',
        principle: 'UNDERSTANDABLE',
        priority: 'P2',
        description: 'Atributo lang em HTML',
        technology: {
            webflow: 'Configuração lang definições site',
            laravel: 'Atributo lang layout Blade',
            wordpress: 'Configuração lang tema'
        }
    },
    {
        id: '4.1.2',
        name: 'Nome, Função, Valor',
        level: 'A',
        principle: 'ROBUST',
        priority: 'P0',
        description: 'Componentes com ARIA adequado',
        technology: {
            webflow: 'Implementação ARIA manual',
            laravel: 'Biblioteca componentes com ARIA nativo',
            wordpress: 'Auditoria ARIA tema + correções'
        }
    }
];
function getCriteriaById(id) {
    return exports.PRIORITY_WCAG_CRITERIA.find(criteria => criteria.id === id);
}
function getCriteriaByPriority(priority) {
    return exports.PRIORITY_WCAG_CRITERIA.filter(criteria => criteria.priority === priority);
}
function getCriteriaByPrinciple(principle) {
    return exports.PRIORITY_WCAG_CRITERIA.filter(criteria => criteria.principle === principle);
}
function getCriticalCriteria() {
    return getCriteriaByPriority('P0');
}
function isPriorityCriteria(id) {
    return exports.PRIORITY_WCAG_CRITERIA.some(criteria => criteria.id === id);
}
//# sourceMappingURL=wcag-criteria.js.map