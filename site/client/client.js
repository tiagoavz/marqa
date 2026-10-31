/* MARQA LAB 19.9 — Player Drive consolidado.
   Mobile: reenquadramento 2,4x, aprovado no LAB19.8.
   Desktop: iframe nativo sem escala.
   O Drive é cross-origin: não é possível ocultar seus controles internos
   nem determinar por JavaScript se o vídeo realmente começou.
*/
(()=>{
 'use strict';
 const cfg=window.MARQA_CLIENT;
 const panel=document.getElementById('detailPlayer');
 if(!cfg||!panel)return;
 const poster=document.getElementById('detailPoster');
 const iframe=document.getElementById('detailIframe');
 const playButton=document.getElementById('detailPlay');
 const label=document.getElementById('detailVideoName');
 const openLink=document.getElementById('detailSource');
 const rail=document.getElementById('detailOtherRail');
 const filmArea=document.getElementById('filmArea');
 if(!poster||!iframe||!playButton||!label||!openLink||!rail||!filmArea)return;
 const validId=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{20,}$/.test(id);
 const view=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
 const embed=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
 const thumb=id=>`https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
 const isMobile=()=>window.matchMedia('(max-width:760px)').matches;
 const films=[],seen=new Set();
 for(const film of [cfg.hero,...(cfg.videos||[])]){
   if(validId(film?.id)&&!seen.has(film.id)){
     seen.add(film.id);films.push(film);
   }
 }
 if(!films.length){playButton.disabled=true;return;}
 let selected=films[0];
 let pendingMessage=null;
 const status=document.createElement('span');
 status.className='drive-playback-status';
 status.setAttribute('role','status');
 status.setAttribute('aria-live','polite');
 panel.append(status);
 function stop(){
   window.clearTimeout(pendingMessage);
   iframe.removeAttribute('src');
   panel.classList.remove('is-playing','is-waiting');
   status.textContent='';
 }
 function syncUI(){
   panel.classList.toggle('is-reframed-mobile',isMobile());
   playButton.innerHTML='<span aria-hidden="true">▶</span> Reproduzir filme';
   playButton.setAttribute('aria-label',`Reproduzir ${selected.title||'o filme'} dentro do portfólio MARQA`);
 }
 function play(){
   if(!validId(selected?.id))return;
   window.clearTimeout(pendingMessage);
   iframe.loading='eager';
   iframe.referrerPolicy='strict-origin-when-cross-origin';
   iframe.setAttribute('allow','autoplay; fullscreen; encrypted-media; picture-in-picture');
   iframe.src=embed(selected.id);
   panel.classList.add('is-playing');
   status.textContent='Reprodutor do Google Drive aberto. A reprodução pode exigir um toque no controle interno.';
   pendingMessage=window.setTimeout(()=>{
     if(panel.classList.contains('is-playing'))status.textContent='Se não for possível assistir aqui, use o link de acesso ao vídeo no Drive.';
   },8500);
 }
 function choose(film,index,autoplayOnDesktop=false){
   stop();selected=film;
   label.textContent=film.title||'Produção audiovisual';
   openLink.href=view(film.id);
   openLink.textContent='Abrir vídeo no Google Drive ↗';
   poster.hidden=false;
   poster.src=index===0&&cfg.poster?cfg.poster:thumb(film.id);
   poster.onerror=()=>{poster.hidden=true;};
   rail.querySelectorAll('.detail-video-card').forEach((item,i)=>item.classList.toggle('is-selected',i===index));
   syncUI();
   if(autoplayOnDesktop&&!isMobile())play();
 }
 iframe.addEventListener('load',()=>{
   if(panel.classList.contains('is-playing')){
     status.textContent='Visualizador incorporado carregado. Início do vídeo não verificável pelo site.';
   }
 });
 playButton.addEventListener('click',play);
 for(const [i,film] of films.entries()){
   const button=document.createElement('button');button.type='button';button.className='detail-video-card';
   const cover=document.createElement('img');cover.loading='lazy';cover.src=i===0&&cfg.poster?cfg.poster:thumb(film.id);cover.alt=`Capa de ${film.title||'produção'}`;cover.onerror=()=>{cover.hidden=true;};
   const tag=document.createElement('small');tag.textContent=`${String(i+1).padStart(2,'0')} / FILME`;
   const icon=document.createElement('span');icon.className='play';icon.textContent='▶';icon.setAttribute('aria-hidden','true');
   const title=document.createElement('b');title.textContent=film.title||`Filme ${i+1}`;
   button.append(cover,tag,icon,title);
   button.addEventListener('click',()=>{
     choose(film,i,true);
     filmArea.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
   });
   rail.append(button);
 }
 const mq=window.matchMedia('(max-width:760px)');
 mq.addEventListener?.('change',()=>{stop();syncUI();});
 window.addEventListener('pagehide',stop);
 choose(films[0],0);
})();
