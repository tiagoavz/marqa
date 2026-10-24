# LAB 02 — Introdução de identidade MARQA

Objetivo: substituir a experiência de túnel controlado por scroll por uma intro cinematográfica automática, curta e opcional, que termina com o wordmark MARQA no topo.

## Storyboard
1. **0,00–0,30 s — Suspense/ambientação:** fundo preto, área central preparada; identidade oculta
2. **0,30–0,90 s — Identidade:** entra o símbolo gráfico real da MARQA com escala e ligeira perspectiva
3. **0,90–1,55 s — Passagem:** símbolo avança em profundidade e atravessa a tela, sem rotação exagerada
4. **1,55–1,95 s — Assinatura:** camada inicial libera a interface e o nome MARQA aparece no header
5. **1,95–2,25 s — Hero pronto:** conteúdo da página termina o reveal; links ficam acessíveis

## Regras de comportamento
- A intro roda uma vez por sessão; botão «Rever abertura» permite replay
- Botão «Pular intro» e tecla Escape permitem acesso imediato
- Preferência do sistema por movimento reduzido elimina a animação
- Header e a intro são entidades distintas; não há bloqueio do scroll após o reveal
- Marca é um asset gráfico real do portfólio V7, embutido no protótipo offline
- Os cartões de trabalhos na página são placeholders de layout, não resultados finais
- Não confundir intro de marca com loading real: nenhuma barra de carregamento falsa

## Arquivos
- `lab02-intro-loader.html`: prévia 100% standalone, funcionando offline (sem npm, sem dependências)

**Status:** experimento visual para avaliação; não foi mesclado na branch `main` ou publicado em produção.
