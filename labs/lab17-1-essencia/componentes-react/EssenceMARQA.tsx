/**
 * MARQA / LAB 17.1 — Seção 02: Essência
 * Componente React isolado, NÃO montado ainda no App principal.
 * Após a aprovação, mover para src/components/EssenceMARQA.tsx e garantir
 * o ativo gráfico oficial em public/media/marqa-symbol-white.png.
 */
import { useEffect, useRef } from 'react';
import './essencia.css';

export default function EssenceMARQA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    const chunks = Array.from(section.querySelectorAll<HTMLElement>('[data-ess-reveal]'));
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      section.classList.add('motion-ready');
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('ess-in');
            observer?.unobserve(entry.target);
          }
        }
      }, { threshold: 0.06, rootMargin: '0px 0px -3% 0px' });
      chunks.forEach((element) => observer?.observe(element));
      if (chunks[0]?.getBoundingClientRect().top < window.innerHeight * 0.82) chunks[0].classList.add('ess-in');
    }
    const darkChapter = section.querySelector<HTMLElement>('[data-ess-progress]');
    const fill = darkChapter?.querySelector<HTMLElement>('.essence-progress-fill');
    let raf = 0;
    function update() {
      raf = 0;
      if (!darkChapter || !fill) return;
      const b = darkChapter.getBoundingClientRect();
      const p = Math.max(.05, Math.min(1, (window.innerHeight - b.top) / (window.innerHeight + b.height)));
      fill.style.transform = `scaleX(${p.toFixed(3)})`;
    }
    function onMove() { if (!raf) raf = window.requestAnimationFrame(update); }
    if (fill) {
      window.addEventListener('scroll', onMove, { passive: true });
      window.addEventListener('resize', onMove, { passive: true });
      onMove();
    }
    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onMove);
      window.removeEventListener('resize', onMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="essence" id="essencia" aria-labelledby="essenceTitle">
      <div className="essence-threshold" aria-hidden="true"><span>02 / ESSÊNCIA MARQA</span><i /><span>O QUE MOVE UMA MARCA</span></div>
      <div className="essence-opening" data-ess-reveal="">
        <div className="essence-wrap">
          <div className="essence-meta"><span>UM PONTO DE VISTA</span><span>MARQA® / 02—07</span></div>
          <div className="essence-head-stage">
            <div className="essence-ghost-mark" aria-hidden="true"><img src="/media/marqa-symbol-white.png" alt="" /></div>
            <h2 className="essence-title" id="essenceTitle">
              <span className="essence-title-line"><span>O que se vê</span></span>
              <span className="essence-title-line"><span>é só o <em>começo.</em></span></span>
            </h2>
          </div>
          <div className="essence-opening-foot">
            <span className="essence-index">01 / A PERCEPÇÃO</span>
            <p>Existe uma intenção por trás de toda marca que vale a pena lembrar.</p>
            <span className="essence-scroll" aria-hidden="true">CONTINUE EXPLORANDO ↓</span>
          </div>
        </div>
      </div>
      <div className="essence-statement" data-ess-progress="" data-ess-reveal="">
        <div className="essence-wrap essence-statement-wrap">
          <div className="essence-statement-meta"><span>O QUE ACREDITAMOS</span><span>DA APARÊNCIA AO SIGNIFICADO</span></div>
          <div className="essence-statement-content">
            <span className="essence-statement-number" aria-hidden="true">[ 01 / 02 ]</span>
            <p className="essence-statement-first">Uma imagem pode<br />chamar atenção.</p>
            <p className="essence-statement-second">Uma direção faz<br />uma marca ser <em>escolhida.</em></p>
          </div>
          <div className="essence-statement-bottom">
            <span className="essence-progress-track" aria-hidden="true"><span className="essence-progress-fill" /></span>
            <span>NÃO É SOBRE FAZER MAIS. É SOBRE SIGNIFICAR MAIS.</span>
          </div>
        </div>
      </div>
      <div className="essence-about" data-ess-reveal="">
        <div className="essence-wrap">
          <div className="essence-about-heading">
            <span className="essence-eyebrow">02 / NOSSA ESSÊNCIA</span>
            <h3>Antes da criação,<br /><em>vem a direção.</em></h3>
          </div>
          <div className="essence-about-grid">
            <div className="essence-about-identity">
              <span className="essence-eyebrow">QUEM SOMOS</span>
              <p>Somos a MARQA. Uma assessoria de marketing e publicidade que pensa além da próxima publicação.</p>
            </div>
            <div className="essence-about-description">
              <span className="essence-eyebrow">O QUE NOS MOVE</span>
              <p>Conectamos estratégia, direção criativa, audiovisual e performance para aproximar o valor real de uma marca da maneira como ela é percebida.</p>
              <a href="#expertise" className="essence-cta"><span>Conheça nossa atuação</span><span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="essence-signature" aria-label="Estratégia, criação e performance">
            <span>ESTRATÉGIA COM INTENÇÃO.</span><span>CRIAÇÃO COM IDENTIDADE.</span><span>PERFORMANCE COM DIREÇÃO.</span>
            <strong>MARQA<sup>®</sup></strong>
          </div>
        </div>
      </div>
    </section>
  );
}
