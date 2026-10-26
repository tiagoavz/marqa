# PORTFÓLIO MARQA — LAB 17.1 / Essência refinada

## Seção trabalhada
**02 — Essência MARQA (em avaliação)**. Os componentes de Hero/Loader, Expertise, Projetos e Contato não foram modificados além do identificador de versão na página.

## Arquitetura de edição
- `sections/essencia.html`: conteúdo isolado para revisão e posterior migração para componente React. A versão deste HTML está inserida no `index.html` por compatibilidade com deploy estático.
- `sections/essencia.css`: estilos isolados pela classe `.essence`.
- `sections/essencia.js`: efeitos de entrada progressivos com `IntersectionObserver`, e progresso de leitura baseado em rolagem, respeitando preferência por movimento reduzido.
- `assets/`: vídeo 1080p da LAB16/17, poster e logomarca original. O vídeo 4K original segue no Google Drive.

## Sequência narrativa
1. Hero MARQA com loader e autoplay nativo preservados.
2. Essência: frase tipográfica + marca real sutil ao fundo.
3. Contraponto escuro: imagem chama atenção / direção faz marca ser escolhida.
4. Apresentação sucinta da assessoria + acesso à Expertise.
5. Seções 03/04/07 provisórias, não aprovadas.

## Teste/publicação
Descompacte ou arraste o ZIP completo no Netlify Drop. Não envie apenas `index.html`, pois o vídeo e os estilos são arquivos separados.

## Diretrizes
Sem mídias externas, números inventados, links comerciais fictícios ou grandes animações que interrompem a navegação. Arquitetura principal React/Vite permanece separada até validação do LAB17.1.

### Componente React preparado (não integrado)
`componentes-react/EssenceMARQA.tsx` e `componentes-react/essencia.css` permitem futura integração independente no site React/Vite, sem substituir o LAB de avaliação. O `public/media/marqa-symbol-white.png` precisará receber a mesma imagem de `assets/` na integração.
