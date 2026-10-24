# PORTFÓLIO MARQA

Site institucional e link da bio, construído em React + Vite + TypeScript.

## Executar localmente

```bash
npm install
npm run dev
npm run build
```

## Arquitetura

- `src/components/Header.tsx`: navegação, independente da animação
- `src/components/Hero.tsx`: encaixe para o Hero
- `src/components/ui/perspective-tunnel-hero.tsx`: túnel tridimensional modular
- `src/data/tunnel-assets.ts`: acervo inicial de cartões da abertura
- `src/styles/tunnel.css`: estilos isolados da animação
- `src/styles/tokens.css`: identidade e constantes visuais
- `src/data/projects.ts`: portfólio e métricas verificadas
- `public/media/`: mídia local aprovada

## shadcn / Tailwind

O projeto possui Tailwind CSS v4, TypeScript, alias `@/` e `components.json` no padrão shadcn. Componentes visuais reusáveis pertencem a `src/components/ui/` (a raiz de código neste projeto é `src`).

Para adicionar componentes oficiais do shadcn:

```bash
npx shadcn@latest add button
```

## Introdução 3D (experimento)

O túnel foi adaptado da referência enviada para uma experiência MARQA em preto, cinza e branco. Seu progresso é conduzido pela **rolagem nativa** da página: não há `preventDefault` para prender o visitante. Em telas móveis utiliza a rolagem por toque, e em preferência de movimento reduzido mostra uma abertura estática.

As imagens do túnel são referências provenientes do HTML V7, ainda dependentes de URLs do Google Drive. Antes de publicar, conferir direitos, disponibilidade dos arquivos e migrar mídia aprovada para hospedagem apropriada.

Esta branch é um **protótipo técnico para avaliação**, não um layout criativo aprovado ou site publicado.
