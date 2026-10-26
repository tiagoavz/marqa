# PORTFÓLIO MARQA — LAB 17.2: Essência compacta

## Escopo de edição
**Somente SEÇÃO 02 — ESSÊNCIA MARQA**. Hero, loader, vídeo/autoplay, header, Expertise, Projetos e Contato permanecem funcionais e com o mesmo conteúdo do LAB 17.1; os ajustes de nomenclatura LAB no HTML não alteram sua lógica.

## Decisão editorial
Redução de três capítulos (abertura, manifesto escuro e quem somos) a **um único momento editorial compacto**, com uma única mensagem principal, apresentação da assessoria, identidade gráfica original e ligação direta com Expertise. Animação sutil na entrada, sem scroll-jacking, sem bloqueio ou seção intermediária escura.

## Arquivos modulares
- `sections/essencia.html`: conteúdo da seção em bloco independente (inserido no index para permitir Netlify estático).
- `sections/essencia.css`: estilos encapsulados em `.essence`.
- `sections/essencia.js`: IntersectionObserver da seção, não toca no vídeo.
- `componentes-react/EssenceMARQA.tsx` + CSS: componente pronto para integração FUTURA no React/Vite, ainda não montado na aplicação principal.
- `assets/marqa-symbol-white.png`: símbolo oficial, preservado.
- `assets/marqa-hero-1080p.mp4`: vídeo original da versão de site anterior, sem recompressão nesta versão.

## Publicação e cautelas
Publique o ZIP completo no Netlify Drop; abrir o HTML separado da pasta `assets` impede a reprodução. O arquivo fonte 4K segue preservado no Drive. Esta é uma versão **em avaliação**, não publicada automaticamente e não integrada à branch principal de produção React/Vite.
