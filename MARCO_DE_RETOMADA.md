# PORTFÓLIO MARQA — MARCO DE RETOMADA

**Data:** 26/10/2026
**Marco:** LAB 19.4 — Portfólio Streaming
**Referência:** portfólio V7 do link na bio (`marqa_portfolio_completo_v7_cta_whatsapp.html`). Não retomar o LAB 19.3 como base visual.

## Direção estabelecida
- Hero com loader da logomarca MARQA original e vídeo autoplay mudo, sujeito a restrições do navegador.
- Essência compacta LAB 19.2 aprovada: título “O que se vê é só o começo.” em duas linhas, texto à direita alinhado, banner horizontal de bastidores sem cortes.
- Portfólio estilo streaming como base atual: capas verticais grandes, esteiras por segmento, escala fluida e navegação entre clientes.
- Clique numa capa abre página própria de cliente, com filme principal no topo e outras produções do mesmo cliente em esteira; escolher outro trabalho troca o player.
- Central de portfólio separada com 24 clientes e filtros.
- Antiga Expertise LAB18.x arquivada; não repetir cards genéricos Estratégia/Imagem/Performance nem os 3 cases horizontais rejeitados do LAB19.3.
- Metodologia, Resultados e Conversão final ficam para etapas futuras.

## Arquivos e versionamento
- [LAB 19.4 no GitHub](https://github.com/tiagoavz/marqa/tree/main/labs/lab19-4-streaming) — versão vigente em avaliação final.
- `labs/lab19-4-streaming/index.html`: homepage.
- `labs/lab19-4-streaming/sections/streaming.html`, `.css`, `.js`: vitrine de streaming.
- `labs/lab19-4-streaming/sections/essencia.css`: Essência preservada.
- `labs/lab19-4-streaming/data/clients.json`: catálogo de 24 clientes e Drive IDs, recuperados do V7.
- `labs/lab19-4-streaming/projetos/index.html`: central com filtros.
- `labs/lab19-4-streaming/projetos/<cliente>/index.html`: 24 páginas de cliente.
- `labs/lab19-4-streaming/client/client.css`, `.js`: player e esteiras da página individual.
- Pasta Library: `/PORTFOLIO MARQA/LAB19_4/`, contendo o ZIP Netlify e a prévia autônoma.
- Vídeos completos dos clientes ficam no Drive, e não dentro do ZIP/GitHub. ZIP inclui MP4 1080p do Hero; original 4K preservado no Drive.
- O LAB em `labs/` não está comprovadamente integrado à aplicação principal React/Vite.

## Validação técnica
- ZIP de 47 entradas verificado em 26/10/2026: homepage, 24 páginas de clientes, central, recursos e vídeo do Hero; teste de integridade passou.
- Testada troca do player, navegação prévia, grades em 320, 390, 1440, 1920 px e escala equivalente a 40% de zoom.
- **Pendentes de homologação no Netlify:** páginas/rotas publicadas, permissão dos MP4 do Drive para visitantes externos, player incorporado, autoplay do Hero, zoom real e desempenho mobile.

## Como retomar
1. Começar pelo LAB 19.4 e pela V7, não reconstruir o projeto nem usar LAB19.3 de referência.
2. Preservar Hero e Essência aprovados.
3. Ajustar apenas a seção necessária; criar LAB 19.5 ou superior após refinamento.
4. Dizer sempre ao usuário qual seção está sendo alterada e o status das outras.
5. Versionar no GitHub, testar e disponibilizar pacote Netlify antes de declarar homologação.

**Meta:** a homepage apresenta a MARQA e dá entrada numa experiência de streaming: capas reais, central completa e páginas com vídeo principal + outros trabalhos da mesma marca.
