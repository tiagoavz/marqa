# Laboratórios / PORTFÓLIO MARQA

Os experimentos do portfólio são preservados separadamente para não sobrescrever a arquitetura de produção React + Vite. Cada versão identificada como LAB serve para avaliação; aprovação e incorporação no site principal são etapas distintas.

## Arquivos nesta pasta

- `lab15-autoplay-nativo/index.html`: video com `src`, `autoplay`, `muted` e `playsinline` declarados diretamente no HTML, sem gate de `prefers-reduced-motion`; diagnóstico de mídia incluído. Versão de teste estável em 1080p no ZIP correspondente.\n- `lab14-hero-site-assets/index.html`: versão para site com MP4 **separado**, autoplay silencioso após loader, fallback automático 1080p e controle manual acessível mesmo quando movimento reduzido está ativo. Os arquivos de mídia ficam no ZIP completo e no Drive.
- `lab04-loader/index.html`: versão original da abertura MARQA (base aprovada).
- `lab05-header/index.html`: refinamento de header e navegação.
- `lab06-hero-texto/index.html`: texto e composição editorial do hero.
- `lab11-hero-4k/index.html`: registro histórico da versão 4K anterior, cujo autoplay poderia iniciar atrás do loader.
- `lab12-hero-autoplay/index.html`: correção de timing. Abertura MARQA (~1,85–1,92 s) primeiro; então reprodução de fundo a partir de 0s, sem áudio e em loop; botão apenas pausa/retoma. Rever abertura pausa e reinicia a sequência.
- `lab13-hero-autoplay-nativo/index.html`: correção validada em Chromium: `<video autoplay muted playsinline loop>` começa já durante o loader, sem pausá-lo; ao concluir a animação, reinicia do quadro zero. O controle é oculto durante o loader e indica carregamento até o vídeo realmente iniciar. A prévia HTML em sandbox/iframe pode impedir autoplay por política do host, portanto validar o comportamento final na hospedagem HTTPS.
- `assets/marqa-hero-4k.mp4` e `assets/marqa-hero-poster.jpg` são necessários ao lado do HTML, mas **não estão incluídos no GitHub**, por tamanho. O arquivo 4K original foi preservado no Drive (abaixo); os pacotes ZIP completos são entregues no projeto ChatGPT.

## Fonte audiovisual (versão original)

- Arquivo: `2Shoot-D2516CF5-E53D-4AF4-924D-CFD276125AD6.MOV`
- Fonte: https://drive.google.com/file/d/1Jr2loUttO3ZacHw3pAGXcJ0SdVSu1ccu/view
- Vídeo: 3840 × 2160, ~19,7 segundos, 30 fps aproximados; o MP4 usado no pacote é remux de H.264, sem recompressão.
- Caminho esperado no laboratório: `assets/marqa-hero-4k.mp4`

## Diretrizes estabelecidas

1. Preservar loader aprovado do LAB 04, header refinado, identidade premium, responsividade e acessibilidade.
2. Evitar substituir o trabalho previamente aprovado enquanto cada seção estiver em avaliação.
3. Vídeo mudo pode tocar automaticamente **somente depois** do loader. Em aparelhos configurados para movimento reduzido ou quando o navegador bloquear autoplay, manter botão manual de reprodução.
4. Casos reais e métricas não devem ser inventados.
5. Produção React/Vite existente continua independente destes laboratórios até integração explicitamente aprovada.

## Próximo controle de versões

Antes de entregar novas versões, verificar o commit no GitHub e registrar o LAB correspondente. A versão **HTML sozinha não reproduz vídeo até receber o MP4 junto à pasta `assets`**. Para testar e publicar a demonstração completa, usar o ZIP correspondente do projeto.

## Diagnóstico de autoplay (LAB 15)

O LAB 14 desabilitava o autoplay via JavaScript em dispositivos com preferência de movimento reduzido e definia o `src` só após o parse da página. Isso explicava uma das condições em que o controle manual funcionava e o autoplay não. O LAB 15 remove essas dependências e registra `NotAllowedError`, `readyState`, `muted`, preferência de movimento e estado `paused` em uma seção de diagnóstico. Testado com navegador Chromium nos cenários de movimento normal e reduzido, incluindo pausar/retomar. A publicação no Netlify do usuário ainda precisa de validação. O fallback 1080p é uma versão da filmagem 4K do Drive e não implica perda do original.

- `lab16-logo-original/index.html`: loader corrigido com símbolo oficial MARQA (o mesmo da abertura LAB04), sem alterações de vídeo/autoplay; `assets/marqa-symbol-white.png` contém o PNG original.

- `lab17-essencia/`: módulo **Essência MARQA**, logo após o hero; veja README da pasta. Autoplay, logo e vídeo da LAB16 preservados; publicações devem usar o pacote completo com assets.

- `lab17-1-essencia/`: refinamento editorial da **Seção 02 — Essência** em avaliação, com HTML/CSS/JS isolados e componente React preparado; sem alterar Hero/Loader ou produção. ZIP completo com mídias é entregue à parte.

- `lab17-2-essencia/`: Seção 02 **compacta** — substitui os três capítulos de manifesto do LAB17.1 por uma composição editorial única. Assets originais preservados no ZIP da conversa; componente React preparado e isolado.

- `lab18-expertise-cards/`: Seção 03 / Expertise MARQA em três cards premium. Estrutura HTML/CSS/React isolada, preserva Hero LAB16 e Essência LAB17.2; MP4 completo está no ZIP de homologação.

- `lab18-1-expertise-compacta/`: versão compacta da Seção 03, cards 30–40% menores, descrições curtas e CTA para projetos. LAB18 preservado; assets de vídeo ficam no pacote completo para Netlify.

- `lab18-2-alinhamento/`: revisão de transição — remove os antigos placeholders Estratégia/Imagem/Performance da Seção 04 e alinha largura com a Expertise. Seção 04 ainda provisória, sem cases reais; vídeo/assets no ZIP completo de avaliação.

- `lab18-3-icones-ampliados/`: amplia os gráficos SVG da Seção 03, mantém a versão compacta e corrige sobreposições no mobile. Hero, Essência e transição provisória para Projetos são preservados. Vídeo disponível no ZIP de homologação, não no GitHub.
