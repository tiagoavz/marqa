/* MARQA / LAB 19.7 — Mobile Drive playback, mantendo catalogo e players desktop. */
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
 const idOK=id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{20,}$/.test(id);
 const link=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
 const preview=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
 const thumbnail=id=>`https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
 const onMobile=()=>window.matchMedia('(max-width: 760px)').matches;
 const videos=[],ids=new Set();
 for(const film of [cfg.hero,...(cfg.videos||[])]){
   if(idOK(film?.id)&&!ids.has(film.id)){ids.add(film.id);videos.push(film);}
 }
 if(!videos.length){playButton.disabled=true;return;}
 let selected=videos[0],timeout;
 const hint=document.createElement('div');hint.className='drive-embed-hint';hint.setAttribute('role','status');hint.setAttribute('aria-live','polite');
 hint.innerHTML='<span>Se o vídeo não abrir aqui, use o Google Drive.</span><a rel="noopener noreferrer" target="_blank">ABRIR NO DRIVE ↗</a>';
 panel.append(hint);
 const direct=hint.querySelector('a');
 const badge=document.createElement('span');badge.className='drive-embed-loading';badge.textContent='Carregando o reprodutor…';panel.append(badge);
 // Mobile can opt into the embedded player, but its native Drive controls are
 // owned by Google and cannot be customized or guaranteed to render well.
 const inlineButton=document.createElement('button');
 inlineButton.type='button';inlineButton.className='detail-embed-choice';
 inlineButton.innerHTML='<span aria-hidden="true">▣</span> Tentar reproduzir nesta página';
 meta?.append(inlineButton);
 const mobileNote=document.createElement('p');
 mobileNote.className='detail-mobile-note';mobileNote.textContent='No celular, o Google Drive oferece uma reprodução mais confortável na própria plataforma.';
 meta?.append(mobileNote);
 const stop=()=>{
   clearTimeout(timeout);iframe.removeAttribute('src');panel.classList.remove('is-playing','is-waiting','has-hint');
   panel.classList.remove('is-inline');
 };
 const updateUI=()=>{
   const mobile=onMobile();panel.classList.toggle('is-mobile',mobile);
   if(mobile){
     playButton.innerHTML='<span aria-hidden="true">▶</span> Assistir no Drive ↗';
     playButton.setAttribute('aria-label',`Abrir ${selected.title||'o filme'} no Google Drive`);
   }else{
     playButton.innerHTML='<span aria-hidden="true">▶</span> Reproduzir filme';
     playButton.setAttribute('aria-label',`Reproduzir ${selected.title||'o filme'}`);
   }
 };
 const start=()=>{
   if(!idOK(selected?.id))return;
   iframe.loading='eager';iframe.referrerPolicy='strict-origin-when-cross-origin';
   iframe.setAttribute('allow','autoplay; fullscreen; encrypted-media; picture-in-picture');
   panel.classList.add('is-playing','is-waiting','is-inline');
   iframe.src=preview(selected.id);
   timeout=setTimeout(()=>{panel.classList.add('has-hint');panel.classList.remove('is-waiting');},7500);
 };
 const select=(film,index,startDesktop=false)=>{
   stop();selected=film;
   label.textContent=film.title||'Produção audiovisual';
   openLink.href=link(film.id);direct.href=link(film.id);
   poster.src=index===0&&cfg.poster?cfg.poster:thumbnail(film.id);
   poster.hidden=false;
   poster.onerror=()=>{poster.hidden=true;};
   rail?.querySelectorAll('.detail-video-card').forEach((node,i)=>node.classList.toggle('is-selected',i===index));
   updateUI();
   if(startDesktop&&!onMobile())start();
 };
 iframe.addEventListener('load',()=>{if(!panel.classList.contains('is-playing'))return;panel.classList.remove('is-waiting');panel.classList.add('has-hint');});
 playButton.addEventListener('click',()=>{
   if(!idOK(selected?.id))return;
   if(onMobile()){
     // A real user click initiates new-tab navigation to native Drive viewer.
     // Keeping the selected cover here prevents the oversized iframe controls.
     const source=link(selected.id);
     const opened=window.open(source,'_blank','noopener,noreferrer');
     if(!opened){openLink.focus();}
   }else start();
 });
 inlineButton.addEventListener('click',start);
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
 const mobileMedia=window.matchMedia('(max-width: 760px)');
 mobileMedia.addEventListener?.('change',()=>{stop();updateUI();});
 select(videos[0],0,false);
 window.addEventListener('pagehide',stop);
})();