# MARQA — LAB 25.7 | Três pastas que se expandem

Este pacote dá continuidade ao **portfólio modular MARQA** da série LAB 25. Não foi reconstruído a partir do portfólio antigo do link da bio.

## O que mudou

Somente o módulo de cases da Seção 04 foi redesenhado. A tela inicial apresenta três cards com estética de pastas: **Dra. Letícia Leão (Posicionamento)**, **EspaçoLaser Canaã (Crescimento)** e **Ri Happy Canaã (Aceleração)**.

Ao clicar em um card, uma única história se expande no mesmo espaço: vídeo 16:9 à esquerda, estratégia e resultados à direita. Os outros dois cases permanecem como mini-pastas sobrepostas no rodapé direito, com navegação direta e um botão para retornar aos três cards. No celular os três cards são exibidos de forma vertical, e o detalhe fica com vídeo acima do texto. O player anterior é interrompido ao trocar de case.

## Estado dos materiais

- **Letícia:** ainda é utilizado um filme de referência do catálogo, NÃO o depoimento definitivo solicitado. Não apresentar o vídeo como depoimento verificado.
- **EspaçoLaser:** dados do relatório de 90 dias: 3.321 para 5.616 seguidores (+69,1%) e 250.817 visualizações acumuladas.
- **Ri Happy:** patamares de seguidores aproximados informados pelo cliente, pouco mais de 9 mil para mais de 11.800.
- Não há indicador de faturamento verificado no material apresentado.

## Escopo preservado

Hero com vídeo, Essência, vitrine de projetos, metodologia Brand/Vision/Performance, catálogo de 36 clientes e páginas individuais continuam presentes. Alterações de interface restritas a `sections/metodologia.html`, `sections/metodologia.css`, `sections/cases.js` e à cópia correspondente da seção em `index.html`.

## Publicação e teste

O arquivo `index.html` fica na raiz do ZIP e pode ser enviado a um **site de teste separado no Netlify**. Não substituir o domínio atual sem aprovação. O Google Drive precisa conceder acesso público à mídia para que os vídeos incorporados funcionem para todos.

Versão HTML isolada: `MARQA_LAB25_7_PREVIA_INTERATIVA.html`, fornecida separadamente para revisão.
