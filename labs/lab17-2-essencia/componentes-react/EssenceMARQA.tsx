/** MARQA LAB 17.2 — Seção 02 em formato React, ainda NÃO integrada à aplicação de produção. */
import {useEffect,useRef} from 'react';
import './essencia.css';
export default function EssenceMARQA(){
 const section=useRef<HTMLElement>(null);
 useEffect(()=>{
  const el=section.current;
  if(!el || !('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){el.classList.add('ess-visible');io.disconnect()}},{rootMargin:'0px 0px -12% 0px',threshold:.04});
  el.classList.add('ess-motion-ready');io.observe(el);
  return ()=>io.disconnect();
 },[]);
 return (
 <section className="essence" id="essencia" aria-labelledby="essenceTitle" ref={section}>
  <div className="essence-border" aria-hidden="true"><span>02 / ESSÊNCIA MARQA</span><i/><span>PENSAMENTO ANTES DA FORMA</span></div>
  <div className="essence-stage">
   <div className="essence-art" aria-hidden="true"><img src="/media/marqa-symbol-white.png" width={842} height={570} alt=""/></div>
   <div className="essence-meta"><span>O NOSSO PONTO DE VISTA</span><span>MARQA® / 2026</span></div>
   <div className="essence-intro"><span className="essence-counter" aria-hidden="true">[ 02 — 07 ]</span>
    <h2 className="essence-headline" id="essenceTitle"><span>O que se vê</span><span>é só o <em>começo.</em></span></h2>
    <p className="essence-subline">Por trás de uma marca que se destaca, existe uma direção.</p>
   </div>
   <div className="essence-bottom">
    <div className="essence-belief"><span className="essence-label">NO QUE ACREDITAMOS</span><p>Antes de pensar no que uma marca vai publicar, pensamos no que ela precisa <strong>significar.</strong></p></div>
    <div className="essence-about"><span className="essence-label">QUEM SOMOS</span><p>Somos a MARQA. Uma assessoria de marketing e publicidade que conecta estratégia, direção criativa, audiovisual e performance para aproximar o valor de uma marca da forma como o mercado a percebe.</p><a className="essence-link" href="#expertise"><span>Conheça nossa expertise</span><span aria-hidden="true">↗</span></a></div>
   </div>
   <div className="essence-signature" aria-hidden="true"><span>ESTRATÉGIA COM INTENÇÃO</span><span>CRIAÇÃO COM IDENTIDADE</span><span>PERFORMANCE COM DIREÇÃO</span></div>
  </div>
 </section>);
}
