/* MARQA / LAB 17.1 — Movimento restrito à seção Essência */
(() => {
  'use strict';
  const section=document.getElementById('essencia');
  if(!section)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;
  const chunks=[...section.querySelectorAll('[data-ess-reveal]')];
  if('IntersectionObserver' in window){
    section.classList.add('motion-ready');
    const observer=new IntersectionObserver(entries => {
      for(const e of entries){
        if(e.isIntersecting){e.target.classList.add('ess-in');observer.unobserve(e.target)}
      }
    },{threshold:0.06,rootMargin:'0px 0px -3% 0px'});
    chunks.forEach(el=>observer.observe(el));
    // A abertura é imediatamente visível quando o visitante desce do hero.
    if(chunks[0]?.getBoundingClientRect().top < window.innerHeight*.82){chunks[0].classList.add('ess-in')}
  }
  const chapter=section.querySelector('[data-ess-progress]');
  const line=chapter?.querySelector('.essence-progress-fill');
  if(!chapter||!line)return;
  let raf=0;
  function update(){
    raf=0;
    const box=chapter.getBoundingClientRect();
    const progress=Math.max(.05,Math.min(1,(window.innerHeight-box.top)/(window.innerHeight+box.height)));
    line.style.transform=`scaleX(${progress.toFixed(3)})`;
  }
  function queue(){if(!raf)raf=requestAnimationFrame(update)}
  window.addEventListener('scroll',queue,{passive:true});
  window.addEventListener('resize',queue,{passive:true});
  queue();
  reduced.addEventListener?.('change',()=>{
    if(reduced.matches){section.classList.remove('motion-ready');line.style.transform='scaleX(1)'}
    else {queue()}
  });
})();
