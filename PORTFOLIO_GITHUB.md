# Portfólio MARQA — fonte oficial

## Estado
A pasta `site/` contém o LAB 25.24 em código editável: HTML, CSS, JavaScript, fotos e organização dos 36 projetos. Os laboratórios históricos continuam preservados em `labs/`.

## Publicação
O arquivo `netlify.toml` instrui o Netlify a executar `python3 tools/build_portfolio.py` e publicar `dist/site`.

O script copia `site/` e recupera o arquivo pesado `assets/marqa-hero-1080p.mp4` do pacote histórico `dist/MARQA_LAB22_NETLIFY_COMPLETO.zip` já versionado no repositório. Isso preserva a qualidade e evita duplicação do vídeo no Git.

## Fluxo de atualização
1. Editar os arquivos dentro de `site/` em uma branch.
2. Revisar e aprovar as alterações.
3. Fazer merge em `main`.
4. GitHub Actions valida o site e disponibiliza um artifact para auditoria.
5. Quando a conta Netlify estiver conectada ao repositório `tiagoavz/marqa`, branch `main`, o Netlify deverá iniciar um deploy automaticamente em cada push.

**Importante:** adicionar `netlify.toml` ao repositório não conecta por si só um site existente ao GitHub. Conferir a ligação na configuração do próprio Netlify e verificar o primeiro deploy publicado antes de declarar o fluxo automático funcionando.

## Administração visual
A eventual central administrativa é um projeto futuro independente; não foi implementada.
