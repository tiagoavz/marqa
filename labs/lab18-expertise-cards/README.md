# LAB 18 — MARQA / Expertise em Cards

**Status:** Seção 03 em avaliação. A Seção 01 (hero com autoplay e loader original) e a Seção 02 (Essência compacta, LAB 17.2) permanecem inalteradas.

## Objetivo

Apresentar os pilares **Estratégia · Audiovisual · Performance** com três cards de linguagem editorial cinematográfica, lado a lado no desktop e empilhados no celular.

## Estrutura

- `index.html` — site completo para homologação no Netlify.
- `sections/expertise.html` — somente markup da Seção 03.
- `sections/expertise.css` — CSS isolado (namespace `marqa-expertise`).
- `sections/expertise.js` — observação de que não há dependência JS.
- `componentes-react/ExpertiseMARQA.tsx` — componente React isolado, ainda não importado na aplicação principal.
- `assets/*`, `sections/essencia.*` — preservados literalmente do pacote LAB 17.2.

## Diretrizes de comportamento

- Cards são conteúdo, não botões: hover discreto de elevação e detalhe gráfico; nenhuma ação falsa ou rota inexistente.
- Textos importantes ficam visíveis sem hover, inclusive no mobile.
- Layout responsivo em uma coluna até 800px; em três colunas acima disso.
- Suporte a `prefers-reduced-motion`.
- Sem imagens inventadas de clientes. Os diagramas SVG de cada card são composições gráficas abstratas autorais, não resultados ou cases.

## Próximo passo

Validar a Seção 03 antes de desenvolver a Seção 04 / Projetos selecionados. O repositório React/Vite principal não é modificado neste laboratório.