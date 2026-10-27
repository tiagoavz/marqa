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
