import { useEffect, useState } from 'react';
import { site } from '../data/site';

/**
 * Header MARQA — LAB 05 (em avaliação).
 * O loader aprovado LAB 04 é um componente separado.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const contactHref = site.contactHref || '#contato';
  const externalContact = Boolean(site.contactHref);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1040) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      document.body.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  const contactAttrs = externalContact
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <>
      <header className="header" id="header">
        <a href="#inicio" className="brand" aria-label="MARQA — voltar ao início" onClick={() => setMenuOpen(false)}>
          MARQA<sup>®</sup>
        </a>
        <nav className="nav" aria-label="Navegação principal">
          <a href="#trabalhos">Projetos</a>
          <a href="#o-que-fazemos">Expertise</a>
        </nav>
        <div className="header-controls">
          <a className="header-cta" href={contactHref} {...contactAttrs}>
            Inicie seu projeto com a MARQA
            <span className="cta-arrow" aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="menu-trigger"
            aria-expanded={menuOpen}
            aria-controls="mobileNav"
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            onClick={() => setMenuOpen(value => !value)}
          >
            <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
            <span className="menu-glyph" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>
      <div className="menu-scrim" aria-hidden="true" onClick={() => setMenuOpen(false)} />
      <nav className="mobile-nav-panel" id="mobileNav" aria-label="Navegação em celular" aria-hidden={!menuOpen} inert={!menuOpen}>
        <span className="menu-label">Navegar / MARQA</span>
        <a href="#trabalhos" onClick={() => setMenuOpen(false)}>Projetos <span aria-hidden="true">↗</span></a>
        <a href="#o-que-fazemos" onClick={() => setMenuOpen(false)}>Expertise <span aria-hidden="true">↗</span></a>
        <a href={contactHref} {...contactAttrs} className="mobile-cta" onClick={() => setMenuOpen(false)}>
          Inicie seu projeto com a MARQA <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </>
  );
}
