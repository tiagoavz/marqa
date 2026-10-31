/* LAB 25.16 — reproduz no mobile a técnica de reenquadramento 2,4× do LAB 19.9.
   O visualizador do Drive permanece incorporado ao site no celular e no desktop.
   Controles nativos de terceiros não são alteráveis diretamente por CSS/JS. */
(()=>{"use strict";
const roots=[...document.querySelectorAll('[data-ms-video-root]')];
const breakpoint=window.matchMedia('(max-width:760px)');
function stop(root){
 const holder=root.querySelector('[data-ms-player-holder]');
 const iframe=root.querySelector('[data-ms-iframe]');
 if(!holder||!iframe)return;
 iframe.removeAttribute('src');holder.hidden=true;
 root.classList.remove('ms-case--playing');
}
function stopAll(){roots.forEach(stop)}
for(const root of roots){
 const play=root.querySelector('[data-ms-play]');
 const close=root.querySelector('[data-ms-stop]');
 const holder=root.querySelector('[data-ms-player-holder]');
 const frame=root.querySelector('[data-ms-iframe]');
 if(!play||!close||!holder||!frame)continue;
 const playLabel=play.querySelector('span:last-child');
 const closeText='FECHAR VÍDEO ×';
 function syncMode(){
   const mobile=breakpoint.matches;
   root.classList.toggle('is-reframed-mobile',mobile);
   play.dataset.mode=mobile?'embed-2-4':'embed';
   play.setAttribute('aria-label','Reproduzir filme dentro do portfólio MARQA');
   if(playLabel)playLabel.textContent='ASSISTIR FILME';
   close.textContent=mobile?'×':closeText;
   close.setAttribute('aria-label','Fechar vídeo e retornar à capa');
 }
 syncMode();
 breakpoint.addEventListener?.('change',()=>{stop(root);syncMode()});
 play.addEventListener('click',e=>{
   e.preventDefault();e.stopPropagation();
   stopAll();
   frame.loading='eager';
   frame.setAttribute('allow','autoplay; fullscreen; picture-in-picture');
   frame.src='https://drive.google.com/file/d/'+encodeURIComponent(play.dataset.msPlay)+'/preview';
   holder.hidden=false;
   root.classList.add('ms-case--playing');
   close.focus({preventScroll:true});
 });
 close.addEventListener('click',()=>{stop(root);play.focus({preventScroll:true})});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')stopAll()});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAll()});
})();
