import './expertise.css';

/**
 * MARQA — Seção 03 / Expertise, LAB 18.1.
 * Componente isolado. Integrar à App somente após aprovação.
 * A versão HTML estática de homologação fica em sections/expertise.html.
 */
export default function ExpertiseMARQA() {
  return (
    <section className="marqa-expertise" id="expertise" aria-labelledby="expertise-heading">
      <div className="marqa-expertise__container">
        <div className="marqa-expertise__topline"><span>03 / EXPERTISE MARQA</span><span>UMA VISÃO. TRÊS DISCIPLINAS.</span></div>
        <div className="marqa-expertise__intro">
          <div><span className="marqa-expertise__eyebrow">NOSSA ATUAÇÃO</span><h2 id="expertise-heading">Três frentes.<br />Uma só <em>direção.</em></h2></div>
          <p>Pensamos, criamos e amplificamos.<br />Uma atuação integrada.</p>
        </div>
        <div className="marqa-expertise__grid">
          <article className="marqa-expertise__card marqa-expertise__card--strategy">
            <div className="marqa-expertise__card-top"><span>01 / THINK</span><span className="marqa-expertise__card-division">DIREÇÃO DE MARCA</span></div>
            <div className="marqa-expertise__visual" aria-hidden="true"><svg viewBox="0 0 360 245" fill="none"><circle cx="180" cy="119" r="100" stroke="currentColor" strokeOpacity=".25"/><circle cx="180" cy="119" r="69" stroke="currentColor" strokeOpacity=".40"/><circle cx="180" cy="119" r="38" stroke="currentColor" strokeOpacity=".68"/><path d="M180 0V245 M0 119H360" stroke="currentColor" strokeOpacity=".15" strokeDasharray="3 7"/><path d="M142 119h76 M180 81v76" stroke="currentColor" strokeWidth="1.6"/><circle cx="180" cy="119" r="5" fill="currentColor"/><path d="M180 19h33M180 219h-33" stroke="currentColor" strokeOpacity=".6"/><circle cx="267" cy="69" r="3" fill="currentColor"/><circle cx="94" cy="168" r="3" fill="currentColor"/></svg></div>
            <div className="marqa-expertise__card-content"><h3>Estratégia<span aria-hidden="true">.</span></h3><p>Definimos a direção.</p><div className="marqa-expertise__tags">Posicionamento <span aria-hidden="true">·</span> Narrativa <span aria-hidden="true">·</span> Campanhas</div></div>
          </article>
          <article className="marqa-expertise__card marqa-expertise__card--film">
            <div className="marqa-expertise__card-top"><span>02 / CREATE</span><span className="marqa-expertise__card-division">LINGUAGEM VISUAL</span></div>
            <div className="marqa-expertise__visual" aria-hidden="true"><svg viewBox="0 0 360 245" fill="none"><path d="M74 88h31l16-20h54l11 20h64c9.941 0 18 8.059 18 18v70c0 9.941-8.059 18-18 18H74c-9.941 0-18-8.059-18-18v-70c0-9.941 8.059-18 18-18Z" stroke="currentColor" strokeOpacity=".78"/><path d="M74 88h31l16-20h54l11 20h64c9.941 0 18 8.059 18 18v70c0 9.941-8.059 18-18 18H74c-9.941 0-18-8.059-18-18v-70c0-9.941 8.059-18 18-18Z" stroke="currentColor" strokeOpacity=".10" strokeWidth="14"/><circle cx="162" cy="141" r="45" stroke="currentColor" strokeOpacity=".34"/><circle cx="162" cy="141" r="27" stroke="currentColor" strokeOpacity=".82"/><circle cx="162" cy="141" r="6" fill="currentColor"/><path d="M91 103h40M223 103h26M91 178h40M223 178h26" stroke="currentColor" strokeOpacity=".62" strokeWidth="2"/><rect x="103" y="75" width="36" height="11" rx="5.5" stroke="currentColor" strokeOpacity=".46"/><path d="M266 111l37-22c6.667-4 15 0.804 15 8.567v86.866c0 7.763-8.333 12.567-15 8.567l-37-22V111Z" stroke="currentColor" strokeOpacity=".70"/><path d="M266 124l24-14M266 158l24 14" stroke="currentColor" strokeOpacity=".25" /></svg></div>
            <div className="marqa-expertise__card-content"><h3>Audiovisual<span aria-hidden="true">.</span></h3><p>Damos forma às ideias.</p><div className="marqa-expertise__tags">Direção <span aria-hidden="true">·</span> Filmes <span aria-hidden="true">·</span> Conteúdo</div></div>
          </article>
          <article className="marqa-expertise__card marqa-expertise__card--growth">
            <div className="marqa-expertise__card-top"><span>03 / AMPLIFY</span><span className="marqa-expertise__card-division">MÍDIA E RESULTADOS</span></div>
            <div className="marqa-expertise__visual" aria-hidden="true"><svg viewBox="0 0 360 245" fill="none"><path d="M51 204H313 M51 35V204" stroke="currentColor" strokeOpacity=".4"/><path d="M51 162H313M51 120H313M51 78H313" stroke="currentColor" strokeOpacity=".16" strokeDasharray="3 7"/><path d="M53 183L111 165L160 171L217 105L267 118L311 52" stroke="currentColor" strokeOpacity=".86" strokeWidth="2"/><path d="M53 183L111 165L160 171L217 105L267 118L311 52" stroke="currentColor" strokeOpacity=".07" strokeWidth="15"/><circle cx="111" cy="165" r="4" fill="currentColor"/><circle cx="217" cy="105" r="4" fill="currentColor"/><circle cx="311" cy="52" r="5" fill="currentColor"/><path d="M295 52h16v16" stroke="currentColor" strokeWidth="1.5"/></svg></div>
            <div className="marqa-expertise__card-content"><h3>Performance<span aria-hidden="true">.</span></h3><p>Ampliamos o alcance com inteligência.</p><div className="marqa-expertise__tags">Mídia <span aria-hidden="true">·</span> Dados <span aria-hidden="true">·</span> Otimização</div></div>
          </article>
        </div>
        <div className="marqa-expertise__footer"><span>TRABALHO INTEGRADO, DO INÍCIO AO FIM.</span><a href="#trabalhos" aria-label="Explorar os projetos da MARQA">Ver projetos <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
}