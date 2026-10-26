# MARQA — LAB 18.2 | Consistência entre Expertise e Projetos

## Alteração pontual

A seção 03 (Expertise) foi mantida exatamente como no LAB 18.1. Corrigimos somente a **área provisória 04 — Projetos Selecionados**: removemos os três cards genéricos "Estratégia / Imagem / Performance" que repetiam os pilares da seção anterior. Eles eram placeholders das primeiras versões do Hero, não trabalhos de clientes.

A nova área de passagem usa um `max-width: 1880px` e o mesmo gutter da Expertise, evitando a divergência de largura entre as seções em zoom reduzido. É uma **transição editorial provisória**, não o LAB 19 final. Os três projetos reais serão escolhidos e implementados na próxima etapa, com mídias da MARQA.

## Arquivos

- `index.html`: página integrada com as seções 01/02/03 preservadas e a Seção 04 provisória revisada.
- `sections/selected-work-preview.css`: estilos isolados, fáceis de substituir na construção do LAB 19.
- `sections/expertise.html`, `sections/expertise.css`, `sections/expertise.js`: iguais aos do LAB 18.1.
- `assets/`: vídeo, poster e símbolo preservados.
- `componentes-react/`: componente Expertise independente preservado.

Status: Seções 01 e 02 aprovadas; Seção 03 (LAB 18.1) em avaliação; Seção 04 provisória apenas, aguardando curadoria de projetos reais. Publicação desta versão é para homologação; não substitui o site principal React/Vite.