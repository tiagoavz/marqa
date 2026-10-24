import { projects } from '../data/projects';

export function SelectedWork() {
  const featured = projects.filter((project) => project.featured);
  return (
    <section className="section section-muted" id="trabalhos" aria-labelledby="work-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">03 / SELECTED WORK</span>
          <h2 id="work-title">O trabalho fala.</h2>
        </div>
        {featured.length ? (
          <div className="work-grid">
            {featured.map((project) => (
              <article className="work-card" key={project.slug}>
                <img src={project.cover} alt={project.alt} loading="lazy" />
                <div className="work-meta"><h3>{project.name}</h3><p>{project.tagline}</p></div>
              </article>
            ))}
          </div>
        ) : (
          <div className="editorial-placeholder">
            <span className="eyebrow">CURADORIA EM ANDAMENTO</span>
            <p>Projetos em destaque serão apresentados com imagens, narrativa, escopo e resultados verificáveis.</p>
          </div>
        )}
      </div>
    </section>
  );
}
