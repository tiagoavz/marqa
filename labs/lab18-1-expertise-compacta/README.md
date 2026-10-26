# MARQA — LAB 18.1 | Expertise Compacta

**Seção alterada:** 03 / Expertise. Estado: em avaliação. LAB 18 preservado no histórico.

**Direção aprovada para prototipagem:** três cards editoriais lado a lado no desktop, empilhados no mobile; não repetir o manifesto da Essência e não ocupar espaço excessivo antes dos projetos selecionados.

## O que mudou

- Cards reduzidos de 440–555 px para cerca de 305–365 px no desktop; no mobile, ~230 px cada (dependendo da fonte e largura).
- Texto central resumido a uma frase prática por competência; termos complementares em linha curta.
- Diagramas gráficos originais preservados e menores; detalhes de apoio redundantes retirados.
- Apresentação mais breve e transição com link real `#trabalhos` para a Seção 04.
- Nenhuma métrica ou resultado inventado.

## Estrutura modular

`sections/expertise.html` — HTML exclusivo da seção.
`sections/expertise.css` — CSS com namespace `.marqa-expertise`.
`sections/expertise.js` — sem JavaScript necessário.
`componentes-react/ExpertiseMARQA.tsx` e `componentes-react/expertise.css` — versão React independente, ainda não integrada à aplicação principal.
`index.html` — prévia integrada ao restante do site.

Os arquivos de mídia, HTML da Essência, CSS e comportamento de autoplay do LAB 18 são preservados. O site de produção React/Vite não é modificado.

**Para publicar no Netlify:** usar o ZIP completo. A prévia isolada em HTML é útil para avaliação visual; a reprodução do vídeo exige os assets dentro do pacote.