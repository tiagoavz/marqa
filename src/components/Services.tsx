import { services } from '../data/site';

export function Services() {
  return (
    <section className="section" id="o-que-fazemos" aria-labelledby="services-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">02 / CAPACIDADES</span>
          <h2 id="services-title">Estratégia e execução. No mesmo ritmo.</h2>
        </div>
        <div className="service-grid">
          {services.map((item) => (
            <article className="service" key={item.number}>
              <span className="eyebrow">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
