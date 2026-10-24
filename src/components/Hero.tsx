import { site } from '../data/site';

export function Hero() {
  return (
    <section className="hero section" id="inicio" aria-labelledby="hero-title">
      <div className="container hero-inner">
        <p className="eyebrow">MARQA / BRAND EXPERIENCE / 2026</p>
        <h1 id="hero-title">{site.headline}</h1>
        <div className="hero-bottom">
          <p>{site.introduction}</p>
          <a className="text-link" href="#trabalhos">Explorar trabalhos <span aria-hidden="true">↘</span></a>
        </div>
      </div>
      <div className="hero-rule" aria-hidden="true" />
    </section>
  );
}
