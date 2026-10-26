# LAB 19.4 — Restauração da experiência streaming

**Referência central:** arquivo original `marqa_portfolio_completo_v7_cta_whatsapp.html`, do site de link na bio MARQA. A implantação anterior LAB19.3 não era consistente com a experiência aprovada.

## O que mudou

- Preservados o loader, hero com autoplay e a seção Essência aprovada do LAB19.2, sem editar os arquivos de vídeo e logomarca.
- Removida a organização de 3 cases horizontais + carrosséis minúsculos.
- Voltam cinco capas editoriais verticais em destaque e duas esteiras setoriais, com largura fluida e rolagem horizontal.
- **Clicar em uma capa abre uma página independente:** `projetos/<cliente>/index.html`. Possui filme em destaque, descrição do cliente e relação de outros filmes da mesma marca (clicar muda o player principal).
- Criada a central `projetos/index.html` para explorar os 24 clientes existentes no V7, com filtros.
- Cadastro recuperado do site original: `data/clients.json` com todos os 24 clientes e respectivos Drive file IDs, sem inventar filmes adicionais.
- Cinco fotogramas extraídos de MP4s finalizados para as capas locais: Agra, Diego/Le Vive, Vanllu, SkyFit e Sapatinho de Luxo. Outras capas consultam as thumbnails que o V7 já usava.
- Não inclui todos os MP4s dos 24 clientes no ZIP: eles permanecem no Drive. O player utiliza `drive.google.com/file/d/<id>/preview` sob clique, com link alternativo para abrir o vídeo no Drive. Se o Drive exigir acesso, o visitante não conseguirá assistir até as permissões serem corrigidas.
- Sem reprodução automática múltipla de vídeos na homepage.

## Estrutura modular

- `sections/essencia.css`: Essência aprovada (sem alteração)
- `sections/streaming.html`, `sections/streaming.css`, `sections/streaming.js`: home do portfólio streaming
- `data/clients.json`: catálogo de clientes e IDs extraído da V7
- `projetos/index.html`: central completa
- `projetos/<cliente>/index.html`: 24 páginas individuais
- `client/client.css` e `client/client.js`: layout e comportamento da página do cliente

## Testes pendentes

- Validar permissão de compartilhamento das URLs de todos os vídeos no Drive.
- Homologar reprodução do player em publicação externa do Netlify (não afirmar sucesso com base apenas em HTML local).
- Editar curadoria e ordenar capas depois da avaliação.
