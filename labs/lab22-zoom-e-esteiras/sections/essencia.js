/* LAB 17.2 — apenas animações da Seção 02; não interfere no Hero/autoplay. */
(() => {
 'use strict';
 const el=document.querySelector('#essencia');
 if(!el || !('IntersectionObserver' in window))return;
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const io=new IntersectionObserver(entries=>{
  if(entries.some(e=>e.isIntersecting)){
   el.classList.add('ess-visible');io.disconnect();
  }
 },{rootMargin:'0px 0px -12% 0px',threshold:0.04});
 el.classList.add('ess-motion-ready');
 io.observe(el);
})();
