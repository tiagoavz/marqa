# MARQA LAB 19 — Nova estrutura pós-Hero

**Seções ativas**
- 01 — Hero + Loader: código e mídia mantidos a partir do LAB 18.4.
- 02 — Essência: editorial compacta + banner horizontal de bastidores reais da MARQA; arquivos `sections/essencia.html` e `.css`.
- 03 — Projetos Selecionados: Le Vive (foto original do Drive), Vanllu (logo original), Espaçolaser (indicador de crescimento do case V7); `sections/projetos.html` e `.css`.
- 04 — Repertório: 3 esteiras de clientes com capas e vídeos originais no Drive, com carregamento dos players **somente após clique**; `sections/repertorio.html`, `.css`, `.js`.

A antiga seção Expertise (LAB 18.4) foi retirada do fluxo principal por decisão editorial, mas permanece arquivada nos laboratórios anteriores. A metodologia e a seção de resultados poderão ser incorporadas futuramente.

**Importante sobre o acervo:** as fotos e marcas dos três destaques são incorporadas localmente. As capas das esteiras usam `drive.google.com/thumbnail`, e os vídeos usam `drive.google.com/file/d/.../preview`; para visitantes públicos, o proprietário precisa garantir acesso de visualização. Se a capa não carregar, um fundo com a inicial do cliente permanece visível. O modal oferece "Abrir no Drive" como alternativa. A reprodução dessas mídias depende do provedor e das permissões. Não estão incorporados vídeos adicionais em autoplay.

**Indicador Espaçolaser:** variação aproximada de +30,7% (3.321 → 4.340 seguidores) no recorte julho–agosto/2026, registrado na versão V7. Métrica histórica, não atribuída exclusivamente à agência e não é promessa de performance. Confirmar autorização/atualização da métrica antes da publicação definitiva.

**Arquitetura:** Seções independentes em HTML/CSS/JS, com a demonstração completa no `index.html`. Para migração final à base React/Vite, cada módulo deverá ser integrado como componente separado; esta versão é LAB experimental, não altera a aplicação principal em produção.

**Entrega:** `index.html` (site inteiro) e `PREVIA_SEM_VIDEO.html` (seções 02–04). `assets/` contém o hero e as imagens locais. `index.html` preserva o mesmo código do loader/autoplay dos LABs anteriores.