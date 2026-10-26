/* Módulo Essência: aprimoramento progressivo, sem alterar autoplay/loader do LAB 16. */
(()=>{
 const section=document.getElementById('essencia');
 if(!section || !('IntersectionObserver' in window))return;
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const observer=new IntersectionObserver(entries=>{
   for(const entry of entries){
     if(entry.isIntersecting){section.classList.add('essence-visible');observer.disconnect();break;}
   }
 },{rootMargin:'0px 0px -8% 0px',threshold:.08});
 section.classList.add('essence-ready');
 observer.observe(section);
})();
