# LAB 09 — comparação de qualidade no Hero

O arquivo original enviado pelo usuário tem **910×512 px, 30 fps, 7,9 s e ~3,4 MB** (vídeo). A versão LAB08 foi reduzida para ~0,52 MB e 960×540, o que exacerbou a pixelização quando exibida em tela cheia.

No LAB09 foram geradas duas novas exportações, ambas H.264 sem áudio, 910×512, com faststart:

- **Alta web**: CRF 17, preset slow, ~1,4 MB
- **Equilibrada**: CRF 19, preset slow, ~1,1 MB

O material original sem recompressão permanece disponível no pacote de revisão (~3,4 MB). O protótipo usa a opção alta web por padrão e permite alternar para a equilibrada. Foram removidos 13% de zoom adicional sobre a imagem.

A maior melhoria possível exige um **master original em 1920×1080 (Full HD) ou 4K**, antes de qualquer compressão. Upscaling artificial de 910×512 para Full HD não cria detalhe real.

Status: experimento; loader LAB04 e Header LAB05 continuam preservados.
