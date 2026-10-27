# MARQA LAB 19.5 — Player Drive restaurado (em avaliação)

Base: LAB 19.4 streaming (não modifica o Hero ou a Essência aprovados).

## O que foi corrigido
- 24 clientes com páginas de streaming e filme principal no topo.
- 22 filmes principais do LAB 19.4 encontrados no Google Drive, mais 24 filmes complementares (um por cliente) verificados via Drive conectado.
- Dois IDs antigos ausentes no Drive foram substituídos: Game Burguer (`GB 1808 3.mp4`, ID `179IbjTk5CEoHJgAQnSkKEfOevjsJ2nId`) e Tetra+ Vale (`VALE BORRACHAS F.mp4`, ID `1lTXTp65XKA3ECACW6vxkc5lswLvs61aV`). Para Tetra+, confirmar se esta produção atende à curadoria desejada.
- Removido da lista de Vale um arquivo indisponível com nome Vale Passeio.
- Player usa o endpoint original do Google Drive `/file/d/<id>/preview`, sem download público direto.
- Clique num segundo filme atualiza iframe e títulos, para reprodução na página; botão **Abrir no Drive** permanece visível como alternativa.
- Removida carga preguiçosa do iframe, adicionado aviso de carregamento sem afirmar que o vídeo iniciou.

## Limitações e segurança
- A verificação da existência do arquivo foi feita usando a conta Drive conectada. Ela **não equivale a um teste público anônimo de reprodução**, que depende das permissões do Drive, cookies e configurações do navegador.
- Vídeos complementares além do primeiro em cada cliente continuam não auditados individualmente; podem conter referências antigas e serão verificados progressivamente.
- Metadados de alguns filmes retornaram permissão `anyone: writer` (qualquer pessoa com link / editor). Isto exige revisão de segurança com o proprietário: idealmente, vídeos destinados à vitrine pública devem ter permissão **visualizador**, nunca editor. **Permissões não foram alteradas neste LAB**.
- A reprodução nativa e previsível em todos os navegadores pode exigir hospedagem dos MP4 otimizados em um serviço de vídeo ou storage com streaming/HTTP Range, usando o Drive apenas como acervo-mestre.
- Para homologar: publicar o ZIP no Netlify e testar numa janela anônima os clientes Agra, Game Burger, Vale, Vanllu e a troca entre filmes.

## Estrutura
- `client/client.js` — módulo único do player, com feedback e fallback.
- `client/client.css` — refinamento do player, sem alterar outros módulos.
- `data/clients.json` — IDs do Drive por cliente.
- `data/video_sources_verified.json` — auditoria dos filmes principais e um filme complementar por cliente.
- `projetos/<slug>/index.html` — páginas de clientes.
- `projetos/index.html` — central de portfólio.
- `sections/essencia.css` — Essência LAB 19.2 preservada.

O original LAB 19.4 permanece disponível para recuperação.


## LAB19.6 — correção de navegação local/WinRAR
Foram substituídos links relativos para diretórios (`projetos/uerle/`) por referências explícitas de arquivos (`projetos/uerle/index.html`) em homepage, central e páginas dos clientes. Vídeos/estilo/Essência/Hero não foram modificados. Leia `LEIA_PRIMEIRO_COMO_ABRIR.txt`.


## LAB 19.7 — Visualização mobile do Google Drive
- Correção dirigida à **Seção 03 / página individual do cliente**. Hero e Essência sem alteração.
- No celular (até 760 px), o botão central abre o arquivo no **visualizador nativo do Google Drive** em outra aba. É a opção confiável para controles legíveis e vídeos verticalizados; o portfólio continua disponível para retornar.
- Adicionada opção **"Tentar reproduzir nesta página"** para assistir incorporado; o iframe do Drive é renderizado em escala virtual 2x e reduzido pela metade para amenizar controles gigantes.
- O site não controla os controles internos do Google Drive, nem seu buffering ou permissões. A reprodução e a apresentação do iframe dependem do próprio Google. Não declarar autoplay no celular.
- Troca de filmes na esteira no mobile apenas seleciona o filme: não dispara abas inesperadas. No desktop continua trocando o vídeo incorporado.
- Não foram alterados IDs, permissões ou arquivos de vídeo no Drive. Validar os links públicos em aba anônima após publicação no Netlify.


## LAB 19.8 — Máscara x reenquadramento experimental (mobile)
- Refino limitado a `client/client.js` e `client/client.css`. Os 24 clientes, seus vídeos, a capa e o catálogo permanecem idênticos ao LAB19.7.
- **01 / Mascarar barras:** carrega o iframe no tamanho do celular e aplica faixas visuais superior e inferior (sem capturar cliques). Botões centrais nativos do Drive **não são removidos**. Botão de revelar/restaurar a visualização completa.
- **02 / Reenquadrar:** renderiza o iframe com viewport virtual 2,4 vezes maior e transforma em escala 0,4167, para reduzir controles do Google e manter o enquadramento dentro da página.
- Os tratamentos usam iframe cross-origin: **não há como ler estados de reprodução nem ocultar controles nativos internos de modo confiável**. As alterações de classe ocorrem depois do clique do visitante, não depois de confirmação de playback.
- Botão Reproduzir aqui permanece dentro do portfólio; link alternativo Abrir no Drive permanece disponível.
- Se os experimentos não alcançarem o nível de acabamento da MARQA, usar streaming dedicado para controle real sobre a interface.
- Não altera permissões no Google Drive; publicação e playback anônimo precisam de teste externo.