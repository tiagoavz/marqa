# LAB 07.1 — Correção de reprodução

Problema da versão anterior: vídeo embutido na página precisava ser decodificado via JavaScript em tempo de execução para gerar uma URL `blob:`. O player ainda dependia de um evento `loadeddata` para ficar visível. Em ambientes que bloqueiam scripts ou URLs blob, a página permanecia no poster estático. O autoplay pode também ser bloqueado por política do navegador.

Correções:
- MP4 H.264 (960 × 540, ~7,9 segundos) armazenado como arquivo binário em `public/media/marqa-hero-07.mp4`.
- `<video autoplay muted loop playsinline><source src="..." type="video/mp4"></video>` nativo, sem conversão base64/Blob JS.
- Vídeo não depende de JS para ficar visível.
- Botão de reprodução manual, indicação de estado e link direto para abrir o MP4.
- Preferência de movimento reduzido respeitada.

O conteúdo do Hero e o Header permanecem iguais ao LAB 07. O loader LAB 04 não foi alterado.

**Status:** Correção em laboratório; validar em navegador do usuário antes de incorporar à produção.
