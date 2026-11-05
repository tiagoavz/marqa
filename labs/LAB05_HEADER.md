# MARQA — LAB 05 | Header de navegação

**Status: protótipo aguardando avaliação visual.**

O loader LAB 04 foi preservado como referência aprovada (arquivo `labs/lab04-intro-fluida-aprovada.html`).

## Decisões propostas
- Wordmark **MARQA®** à esquerda (mesmo destino final da animação LAB 04)
- Links centrais **Projetos** e **Expertise**
- CTA à direita: **Inicie seu projeto com a MARQA ↗**
- Em telas até 1040px: botão Menu, gaveta de navegação e CTA com texto completo
- Fonte experimental: Inter do LAB 04; tipografia final ainda sujeita a validação
- Botão comercial aponta temporariamente para seção de contato, até ser configurado o link WhatsApp verdadeiro

## Arquivos
- `labs/lab05-header-preview.html`: prévia HTML autocontida, abre offline
- `src/components/Header.tsx`: Header modular em React
- `src/styles/header.css`: estilo do Header separado, sem editar os keyframes do loader
- `src/main.tsx`: importa o novo CSS

**Não mesclar sem aprovação.** As seções de trabalho/expertise/contato da prévia são somente estrutura para testar a navegação.
