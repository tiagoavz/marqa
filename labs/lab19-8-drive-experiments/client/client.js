/* MARQA LAB 19.8 — Experimentos de máscara visual e reenquadramento Drive.
   Não acessa, inspeciona nem controla a interface cross-origin do iframe.
   A máscara só cobre bordas e não pode sumir com botões centrais do Google.
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
 const meta=document.querySelector('.detail-meta');
 if(!poster||!iframe||!playButton||!label||!openLink||!rail||!meta)return;
 const idOK=id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{20,}$/.test(id);
 const link=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
 const preview=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
 const thumbnail=id=>`https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
 const onMobile=()=>window.matchMedia('(max-width:760px)').matches;
 const videos=[],ids=new Set();
 for(const film of [cfg.hero,...(cfg.videos||[])]){
   if(idOK(film?.id)&&!ids.has(film.id)){ids.add(film.id);videos.push(film);}
 }
 if(!videos.length){playButton.disabled=true;return;}
 let selected=videos[0];
 let mode='mask';
 let maskArmed=false;
 let pendingHint=null, pendingMask=null;
 const status=document.createElement('p');status.className='drive-lab-status';status.setAttribute('role','status');
 status.textContent='Escolha a experiência e toque em reproduzir para testar.';
 const controlGroup=document.createElement('div');controlGroup.className='drive-lab-choices';
 controlGroup.setAttribute('role','group');controlGroup.setAttribute('aria-label','Experimentos de visualização no celular');
 const marker=document.createElement('span');marker.className='drive-lab-label';marker.textContent='LAB 19.8 / TESTE MOBILE';
 const maskBtn=document.createElement('button');maskBtn.type='button';maskBtn.className='drive-lab-mode';maskBtn.dataset.mode='mask';maskBtn.textContent='01 / Mascarar barras';
 const frameBtn=document.createElement('button');frameBtn.type='button';frameBtn.className='drive-lab-mode';frameBtn.dataset.mode='reframe';frameBtn.textContent='02 / Reenquadrar';
 const revealBtn=document.createElement('button');revealBtn.type='button';revealBtn.className='drive-lab-reveal';revealBtn.textContent='Mostrar controles do Drive';
 revealBtn.setAttribute('aria-pressed','false');
 controlGroup.append(marker,maskBtn,frameBtn,revealBtn);
 const explanation=document.createElement('p');explanation.className='drive-lab-explanation';
 const maskOverlay=document.createElement('div');maskOverlay.className='drive-lab-mask';maskOverlay.setAttribute('aria-hidden','true');
 panel.append(maskOverlay);
 const refLink=openLink;
 refLink.textContent='Abrir o filme no Drive (alternativa) ↗';
 filmArea.insertBefore(controlGroup,panel);
 meta.insertBefore(explanation,refLink);
 meta.insertBefore(status,refLink);
 const stop=()=>{
   maskArmed=false;
   clearTimeout(pendingHint);clearTimeout(pendingMask);
   iframe.removeAttribute('src');
   panel.classList.remove('is-playing','is-waiting','has-hint','is-inline','is-mask-visible');
   status.textContent='Pronto para reproduzir. A fonte do vídeo é o Google Drive.';
 };
 const syncMode=()=>{
   panel.classList.toggle('is-mode-mask',mode==='mask');
   panel.classList.toggle('is-mode-reframe',mode==='reframe');
   maskBtn.setAttribute('aria-pressed',String(mode==='mask'));
   frameBtn.setAttribute('aria-pressed',String(mode==='reframe'));
   const masked=mode==='mask'&&!panel.classList.contains('is-mask-revealed')&&panel.classList.contains('is-playing')&&maskArmed;
   panel.classList.toggle('is-mask-visible',masked);
   revealBtn.hidden=mode!=='mask'||!maskArmed||!panel.classList.contains('is-playing');
   explanation.textContent=mode==='mask'
     ? 'Máscara experimental: cobre apenas as faixas superiores e inferiores do iframe. O Google controla os botões internos e a máscara pode ocultar parte da imagem.'
     : 'Reenquadramento: mantém o vídeo incorporado, com um iframe virtualmente maior para diminuir a escala dos controles. A interface do Drive continua presente.';
 };
 const updateUI=()=>{
   playButton.innerHTML='<span aria-hidden="true">▶</span> Reproduzir aqui';
   playButton.setAttribute('aria-label',`Reproduzir ${selected.title||'o filme'} nesta página`);
   panel.classList.toggle('is-mobile',onMobile());
   syncMode();
 };
 const start=()=>{
   if(!idOK(selected?.id))return;
   clearTimeout(pendingHint);clearTimeout(pendingMask);
   iframe.loading='eager';iframe.referrerPolicy='strict-origin-when-cross-origin';
   iframe.setAttribute('allow','autoplay; fullscreen; encrypted-media; picture-in-picture');
   iframe.src=preview(selected.id);
   maskArmed=false;
   panel.classList.remove('is-mask-revealed');
   panel.classList.add('is-playing','is-waiting','is-inline');
   status.textContent='Reprodutor do Drive solicitado. Toque no play interno se ele aparecer.';
   // Esse temporizador parte do clique, não da confirmação de reprodução.
   pendingMask=setTimeout(()=>{if(panel.classList.contains('is-playing')){maskArmed=true;syncMode();}},1800);
   pendingHint=setTimeout(()=>{
     if(panel.classList.contains('is-playing')){
       status.textContent='Se a imagem não carregar ou ficar bloqueada, use o link alternativo para abrir no Google Drive.';
       panel.classList.remove('is-waiting');
     }
   },7000);
   syncMode();
 };
 const select=(film,index,startDesktop=false)=>{
   stop(); selected=film;
   label.textContent=film.title||'Produção audiovisual';
   refLink.href=link(film.id);
   poster.src=index===0&&cfg.poster?cfg.poster:thumbnail(film.id);
   poster.hidden=false;poster.onerror=()=>{poster.hidden=true;};
   rail.querySelectorAll('.detail-video-card').forEach((node,i)=>node.classList.toggle('is-selected',i===index));
   updateUI();
   if(startDesktop&&!onMobile())start();
 };
 maskBtn.addEventListener('click',()=>{mode='mask';panel.classList.remove('is-mask-revealed');revealBtn.textContent='Mostrar controles do Drive';revealBtn.setAttribute('aria-pressed','false');syncMode();});
 frameBtn.addEventListener('click',()=>{mode='reframe';syncMode();});
 revealBtn.addEventListener('click',()=>{
   const show=!panel.classList.contains('is-mask-revealed');
   panel.classList.toggle('is-mask-revealed',show);
   revealBtn.textContent=show?'Reaplicar máscara':'Mostrar controles do Drive';
   revealBtn.setAttribute('aria-pressed',String(show));
   syncMode();
 });
 iframe.addEventListener('load',()=>{
   if(!panel.classList.contains('is-playing'))return;
   panel.classList.remove('is-waiting');
   status.textContent='O quadro do Drive carregou. A reprodução real depende do Google Drive e não pode ser detectada pelo site.';
 });
 playButton.addEventListener('click',start);
 for(const [i,film] of videos.entries()){
   const card=document.createElement('button');card.type='button';card.className='detail-video-card';
   const cover=document.createElement('img');cover.loading='lazy';cover.src=i===0&&cfg.poster?cfg.poster:thumbnail(film.id);cover.alt=`Capa de ${film.title||'produção'}`;
   cover.onerror=()=>{cover.hidden=true;};
   const caption=document.createElement('b');caption.textContent=film.title||`Filme ${i+1}`;
   const tag=document.createElement('small');tag.textContent=`${String(i+1).padStart(2,'0')} / FILME`;
   const icon=document.createElement('span');icon.className='play';icon.textContent='▶';icon.setAttribute('aria-hidden','true');
   card.append(cover,tag,icon,caption);
   card.addEventListener('click',()=>{
     select(film,i,true);
     window.scrollTo({top:filmArea.getBoundingClientRect().top+window.scrollY-85,behavior:'smooth'});
   });
   rail.append(card);
 }
 const mobileMedia=window.matchMedia('(max-width:760px)');
 mobileMedia.addEventListener?.('change',()=>{stop();updateUI();});
 select(videos[0],0,false);
 window.addEventListener('pagehide',stop);
})();