# PORTFÓLIO MARQA — MARCO DE RETOMADA

**Data:** 27/10/2026  
**Base atual para avaliação:** LAB 20 — Curadoria expandida do Google Drive  
**GitHub:** https://github.com/tiagoavz/marqa/tree/main/labs/lab20-curadoria-drive

## Padrões preservados
- Hero e Loader originais, com vídeo original e autoplay sujeito a permissões do navegador.
- Essência compacta LAB 19.2 aprovada.
- Experiência streaming do V7: capas verticais, esteiras por segmento e página individual por cliente, com filme principal + outras produções.
- Player Drive reenquadrado automaticamente em dispositivos móveis (2,4×), aprovado no LAB 19.9. Não substituir o player por link externo como fluxo principal.

## LAB 20 — Expansão em avaliação
- **36 marcas** no catálogo (24 existentes + 12 novas).
- **12 pôsteres locais** extraídos de filmes editados, que carregam sem depender de miniatura remota do Drive.
- 12 páginas de projeto novas, com IDs de arquivos de vídeo principal e trabalhos complementares no Google Drive.
- Novos clientes: Ri Happy Canaã, Divino Amor, Paniago Diagnósticos, Chilli Beans Canaã, Splash Piscinas, Crepe Cone, Cheirin Bão, Alpha Suplementos, Senna Imóveis, Clínica Dr. Sorriso, Sitra e Bela King.
- Filtros: Saúde & Estética, Marcas & Experiências, **Serviços & Institucional** (novo). Uma terceira esteira organiza serviços e institucionais na homepage. Os cinco destaques originais foram preservados.
- Pastas consultadas na raiz do Drive autorizada: Clientes Ativos, Clientes Teste, Finalizados e Freelas. Clientes de teste e materiais de autorização ambígua não foram inseridos como trabalhos publicados; veja `data/candidatos_pendentes_lab20.json`.
- Materiais, status, IDs de vídeo e classificação em `data/curadoria_lab20.json`.

## Arquivos e publicação
- `labs/lab20-curadoria-drive/index.html`: homepage.
- `labs/lab20-curadoria-drive/projetos/index.html`: central filtrável.
- `labs/lab20-curadoria-drive/projetos/<slug>/index.html`: 36 páginas individuais.
- `labs/lab20-curadoria-drive/client/client.css` e `.js`: player mobile consolidado.
- `/PORTFOLIO MARQA/LAB20/MARQA_LAB20_NETLIFY.zip` na Library: site publicável com MP4 do Hero e imagens.
- `/PORTFOLIO MARQA/LAB20/LAB20_PREVIA_CATALOGO.html`: prévia standalone.

## Validação e pendências
- ZIP íntegro; 36 páginas verificadas; nenhum caminho interno quebrado.
- Prévia responsiva testada em 320, 390 e 1440 px; filtros novos funcionam; navegação e troca de vídeo avaliadas localmente.
- A integração de vídeos públicos no Google Drive deve ser testada no Netlify; não interpretar o acesso autenticado pelo conector como autorização de exibição pública.
- Confirmar direitos de uso dos vídeos e pessoas filmadas antes de publicar a curadoria em produção.
- **Não declarar LAB20 aprovado** até o usuário validar capa, organização e exibição no site publicado.

## Procedimento para retomar
1. Começar pelo LAB20, não pelo LAB19.3 ou por seções genéricas de Expertise.
2. Identificar qual seção será alterada e preservar as demais.
3. Para novos casos, avaliar primeiro os vídeos finalizados e seus contextos, não publicar material de teste automaticamente.
4. Versionar novos laboratórios isoladamente no GitHub e disponibilizar ZIP Netlify da versão completa.


## LAB 21 — Esteiras em movimento
- Base: LAB20, 36 clientes; Hero, Essência, páginas e player mobile LAB19.9 preservados.
- Quatro esteiras com movimento horizontal contínuo e infinito, velocidades moderadas e sentidos alternados.
- Mouse hover pausa; toque e arrasto pausam e retomam 2,8 s depois; setas continuam navegando um card por vez.
- Funciona com zoom/larguras variáveis por reconstrução de cópias; movimento reduzido desativa a animação.
- GitHub: https://github.com/tiagoavz/marqa/tree/main/labs/lab21-esteiras-infinitas
- Patch ZIP: https://github.com/tiagoavz/marqa/raw/refs/heads/main/labs/lab21-esteiras-infinitas/LAB21_PATCH_APLICAR_SOBRE_LAB20.zip
- Situação: código salvo; **teste visual no Netlify ainda pendente**. Não declarar aprovado até conferir com o usuário.
- A homepage antiga já importava `sections/streaming.js`, mas esse arquivo estava faltando no LAB20 no GitHub; o LAB21 o adiciona.
