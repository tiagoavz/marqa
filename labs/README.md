# Laboratórios / PORTFÓLIO MARQA

Os experimentos do portfólio são preservados separadamente para não sobrescrever a arquitetura de produção React + Vite. Cada versão identificada como LAB serve para avaliação; aprovação e incorporação no site principal são etapas distintas.

## Arquivos nesta pasta

- `lab11-hero-4k/index.html`: registro histórico da versão 4K anterior, cujo autoplay poderia iniciar atrás do loader.
- `lab12-hero-autoplay/index.html`: correção de timing. Abertura MARQA (~1,85–1,92 s) primeiro; então reprodução de fundo a partir de 0s, sem áudio e em loop; botão apenas pausa/retoma. Rever abertura pausa e reinicia a sequência.
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
