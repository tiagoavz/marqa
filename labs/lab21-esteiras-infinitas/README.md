# MARQA LAB 21 — ESTEIRAS EM MOVIMENTO

## Referência
Base imutável: LAB20 (36 marcas, quatro esteiras, player mobile LAB19.9, Hero e Essência preservados).
Esta é uma versão **experimental em avaliação**, não uma substituição retroativa.

## Funcionamento
- Movimento automático constante, lateral, em sentidos alternados; velocidades moderadas.
- Repetição contínua por cópias de cards à esquerda e à direita, com reposicionamento na mesma fase visual.
- Pausa automática por mouse hover, toque, arrasto, rolagem com roda e foco do teclado.
- No touch, retomada 2,8 segundos após soltar o dedo para permitir seleção precisa.
- Setas continuam operacionais, movendo um card por vez.
- Cópias não entram na ordem de tabulação; os links mantêm a página individual original.
- A quantidade de cópias acompanha o tamanho da janela, incluindo zoom e telas largas.
- Prefers-reduced-motion desativa movimento e duplicação, mantendo navegação manual.
- Se o JavaScript falhar, as esteiras são roláveis como no LAB20.

## Arquivos alterados
- \`sections/streaming.js\`: criado, pois a homepage já importava esse script, mas ele faltava na versão LAB20 do GitHub.
- \`sections/streaming.css\`: regras pontuais que só são ativadas quando o JS inicia.
- Nenhuma alteração na estrutura do catálogo, nas páginas de clientes ou no player.

## Testes ainda necessários
- Visualizar em Netlify com zoom 40%, 100% e 150%, desktop e celular.
- Passar mouse e tocar para conferir a pausa.
- Testar retorno quando o último cartão passa pelo primeiro.
- Verificar a preferência de redução de movimento.
- O vídeo Hero MP4 continua no pacote Netlify anterior e não consta no repositório GitHub.
