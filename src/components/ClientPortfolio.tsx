import { portfolioCategories, projects } from '../data/projects';

export function ClientPortfolio() {
  return (
    <section className="section" id="clientes" aria-labelledby="clients-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">04 / MARCAS</span>
          <h2 id="clients-title">Histórias que ajudamos a contar.</h2>
        </div>
        {portfolioCategories.map((category) => {
          const entries = projects.filter((item) => item.category === category);
          return (
            <div className="client-category" key={category}>
              <h3>{category}</h3>
              {entries.length ? (
                <div className="client-rail">
                  {entries.map((project) => (
                    <article className="client-tile" key={project.slug}>
                      <img src={project.cover} alt={project.alt} loading="lazy" />
                      <h4>{project.name}</h4>
                    </article>
                  ))}
                </div>
              ) : <p className="quiet-note">Seleção de marcas em organização.</p>}
            </div>
          );
        })}
      </div>
    </section>
  );
}
