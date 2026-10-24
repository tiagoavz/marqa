import { site } from '../data/site';

export function Contact() {
  return (
    <section className="section contact-section" id="contato" aria-labelledby="contact-title">
      <div className="container">
        <span className="eyebrow">06 / START A PROJECT</span>
        <h2 id="contact-title">Sua marca pode ocupar mais espaço.</h2>
        <div className="contact-row">
          <p>Vamos entender o momento da sua marca e encontrar o caminho certo.</p>
          {site.contactHref ? (
            <a className="button" href={site.contactHref} target="_blank" rel="noopener noreferrer">Falar com a MARQA ↗</a>
          ) : (
            <a className="button" href={site.instagram} target="_blank" rel="noopener noreferrer">Conheça a MARQA ↗</a>
          )}
        </div>
      </div>
    </section>
  );
}
