import { site } from '../data/site';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-row">
        <a className="brand" href="#inicio" aria-label="MARQA, voltar ao início">MARQA<span className="brand-dot">.</span></a>
        <span>{site.positioning}</span>
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>
        <small>© {new Date().getFullYear()} MARQA</small>
      </div>
    </footer>
  );
}
