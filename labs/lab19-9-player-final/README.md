# MARQA — LAB 19.9 | Player Drive consolidado

## Status
Seção 03 / Portfólio Streaming: **reenquadramento mobile aprovado visualmente pelo usuário**, consolidado em edição reversível. O comportamento da reprodução pública deve ser verificado no Netlify.

## Mudanças apenas no player compartilhado
- `client/client.js`: sem botões 01/02 de comparação, máscara removida, player incorporado é a ação principal também no celular.
- `client/client.css`: reenquadramento mobile 2,4x e escala 0,416666667 até 760 px; desktop usa o iframe em 100% sem escala.
- Seleção de vídeo: no celular muda o filme, a capa e o link sem iniciar sem clique; no desktop mantém mudança direta de reprodução.
- Link `Abrir vídeo no Google Drive` disponível como alternativa. Não foi removido o vídeo da página.
- Mantidos Hero, Loader, Essência LAB19.2, catálogo de 24 clientes, rotas para `index.html` e IDs já auditados do Drive.

## Limites verificáveis
- Não é possível comandar os controles ou constatar o início de reprodução dentro de iframe do Drive de domínio externo.
- Escala reduz controles sem removê-los. Reproduzir no Netlify em dispositivo real e janela anônima antes da homologação final.
- Nenhuma permissão de arquivo do Drive foi alterada.

## Teste recomendado
1. Extrair ZIP inteiro ou subir o ZIP completo no Netlify.
2. Abrir `projetos/agra/index.html` no mobile, tocar `Reproduzir filme`.
3. Alternar para outra produção do mesmo cliente. Verificar quadro vertical e controles.
4. Repetir em desktop e em celulares diferentes. Testar acesso anônimo.
5. Caso reprodução falhe, abrir link alternativo e conferir permissão do Drive.

**Versão histórica para comparação:** LAB 19.8 permanece preservada no GitHub.