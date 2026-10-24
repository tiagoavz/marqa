import { projects } from '../data/projects';

export function Results() {
  const verifiedMetrics = projects.flatMap((project) =>
    (project.metrics || []).filter((metric) => Boolean(metric.source && metric.period))
  );
  return (
    <section className="section section-dark" id="resultados" aria-labelledby="results-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">05 / IMPACTO</span>
          <h2 id="results-title">Resultado também tem contexto.</h2>
        </div>
        {verifiedMetrics.length ? (
          <div className="results-grid">
            {verifiedMetrics.slice(0, 4).map((metric, index) => (
              <div className="result-item" key={index}>
                <strong>{metric.value}</strong><p>{metric.label}</p><small>{metric.period} · {metric.source}</small>
              </div>
            ))}
          </div>
        ) : (
          <p className="section-description">Esta área receberá métricas reais, com período e fonte identificados. Não utilizamos projeções como se fossem resultados obtidos.</p>
        )}
      </div>
    </section>
  );
}
