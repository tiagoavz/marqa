import { site } from '../data/site';

export function Header() {
  return (
    <header className="site-header">
      <nav className="container navigation" aria-label="Navegação principal">
        <a className="brand" href="#inicio" aria-label="MARQA, voltar ao início">MARQA<span className="brand-dot">.</span></a>
        <div className="nav-links">
          <a href="#trabalhos">Trabalhos</a>
          <a href="#o-que-fazemos">O que fazemos</a>
          <a href="#contato">Contato</a>
        </div>
        <a className="nav-action" href={site.contactHref || '#contato'}>Vamos conversar <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
