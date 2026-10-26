# MARQA LAB 19.3 — Curadoria de filmes editados

**Escopo alterado:** Seção 03 / Projetos Selecionados. Hero/Loader, Essência LAB19.2, Repertório e contato foram preservados.

## Escolhas após revisão de filmes nativos/editados do Drive
- Dr. Rafael Agra — `RA 1107 2-.mp4` — 58,99 s — arquivo Drive `1TiguJ0Ga41eEA-hr7PublpB0S9Nir7iv`. Saúde e autoridade profissional. Poster extraído aos 20,65 s, sem imagens sensíveis explícitas.
- Vanllu — `V 2905 1-.mp4` — 34,57 s — arquivo Drive `1DgKFusbBzmmcssDuDm9IaYreEpVtHVdc`. Linguagem lifestyle e movimento. Poster extraído aos 20,05 s.
- Sky Fit — `02.mp4` — 20,42 s — arquivo Drive `1G_UjPnUhxqf5mxJKEGW3VtMQlfteLr2_`. Criatividade e energia em campanha fitness. Poster extraído aos 11,84 s.

## Outros filmes comparados
Le Vive (dois vídeos), Dr. Uerle Oliveira, Sapatinho de Luxo, Tropical e Kings Sneakers. O recorte busca três linguagens distintas; não afirma que os filmes sejam os mais eficientes comercialmente. Nenhum resultado de campanha foi atribuído sem comprovação.

## Comportamento
Cards agora são botões com `data-video-id` e usam o player existente da esteira (iframe Google Drive), carregado somente quando o usuário clica. O modal oferece também o link direto para o Drive. O acesso dos visitantes depende da permissão do arquivo original. Os vídeos inteiros não são copiados para o Netlify.

`index.html` e `PREVIA_SEM_VIDEO.html` trazem a Seção 03 integrada para homologação; o módulo fonte isolado é `sections/projetos.html` + `sections/projetos.css`. Arquivos `assets/*.jpg` são quadros reais extraídos dos vídeos nativos/editados.

## Publicação
Use o ZIP completo para publicar no Netlify. O vídeo do Hero permanece 1080p compatível e separado do HTML. Os três arquivos MP4 de case continuam no Drive. A integração definitiva no React/Vite principal está pendente de aprovação.