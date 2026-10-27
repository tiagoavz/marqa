/* MARQA / LAB 19.5 — Google Drive video player. Source: verified Drive IDs in client data. */
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
 const idOK=id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{20,}$/.test(id);
 const link=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/view`;
 const preview=id=>`https://drive.google.com/file/d/${encodeURIComponent(id)}/preview`;
 const thumbnail=id=>`https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
 const videos=[];const ids=new Set();
 for(const film of [cfg.hero,...(cfg.videos||[])]){
   if(idOK(film?.id)&&!ids.has(film.id)){ids.add(film.id);videos.push(film);}
 }
 if(!videos.length){playButton.disabled=true;return;}
 let selected=videos[0],timeout;
 // Native Drive iframe is cross-origin. 'load' does not prove playback and
 // browsers may ask for consent/sign-in; provide a direct link at all times.
 const hint=document.createElement('div');hint.className='drive-embed-hint';hint.setAttribute('role','status');hint.setAttribute('aria-live','polite');
 hint.innerHTML='<span>Se o vídeo não aparecer, abra o arquivo diretamente no Drive.</span><a rel="noopener noreferrer" target="_blank">ABRIR NO DRIVE ↗</a>';
 panel.append(hint);
 const direct=hint.querySelector('a');
 const badge=document.createElement('span');badge.className='drive-embed-loading';badge.textContent='Carregando o reprodutor do Drive…';panel.append(badge);
 const stop=()=>{clearTimeout(timeout);iframe.removeAttribute('src');panel.classList.remove('is-playing','is-waiting','has-hint');};
 const select=(film,index,autoplay=false)=>{
   stop();selected=film;
   label.textContent=film.title||'Produção audiovisual';
   openLink.href=link(film.id);direct.href=link(film.id);
   poster.src=index===0&&cfg.poster?cfg.poster:thumbnail(film.id);
   poster.hidden=false;
   poster.onerror=()=>{poster.hidden=true;};
   playButton.setAttribute('aria-label',`Assistir ${film.title||'ao filme'} no Drive`);
   rail?.querySelectorAll('.detail-video-card').forEach((node,i)=>node.classList.toggle('is-selected',i===index));
   if(autoplay)start();
 };
 const start=()=>{
   if(!idOK(selected?.id))return;
   iframe.loading='eager';iframe.referrerPolicy='strict-origin-when-cross-origin';
   iframe.setAttribute('allow','autoplay; fullscreen; encrypted-media; picture-in-picture');
   panel.classList.add('is-playing','is-waiting');
   iframe.src=preview(selected.id);
   timeout=setTimeout(()=>{panel.classList.add('has-hint');panel.classList.remove('is-waiting');},7500);
 };
 iframe.addEventListener('load',()=>{panel.classList.remove('is-waiting');panel.classList.add('has-hint');});
 playButton.addEventListener('click',start);
 for(const [i,film] of videos.entries()){
   const card=document.createElement('button');card.type='button';card.className='detail-video-card';
   const cover=document.createElement('img');cover.loading='lazy';cover.src=i===0&&cfg.poster?cfg.poster:thumbnail(film.id);cover.alt=`Capa de ${film.title||'produção'}`;
   cover.onerror=()=>{cover.hidden=true;};
   const caption=document.createElement('b');caption.textContent=film.title||`Filme ${i+1}`;
   const meta=document.createElement('small');meta.textContent=`${String(i+1).padStart(2,'0')} / FILME`;
   const icon=document.createElement('span');icon.className='play';icon.textContent='▶';icon.setAttribute('aria-hidden','true');
   card.append(cover,meta,icon,caption);
   card.addEventListener('click',()=>{select(film,i,true);window.scrollTo({top:filmArea.getBoundingClientRect().top+window.scrollY-85,behavior:'smooth'});});
   rail.append(card);
 }
 select(videos[0],0,false);
 window.addEventListener('pagehide',stop);
})();