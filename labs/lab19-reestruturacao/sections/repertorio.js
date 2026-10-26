/* LAB19 — Repertório. As mídias só são carregadas ao clicar. */
(()=>{
 const modal=document.getElementById('workPlayer');const frame=document.getElementById('workPlayerFrame');
 const name=document.getElementById('workPlayerName');const link=document.getElementById('workPlayerExternal');
 if(!modal||!frame)return;
 document.querySelectorAll('[data-rail-move]').forEach(button=>button.addEventListener('click',()=>{
  const rail=document.getElementById(button.dataset.for);if(!rail)return;
  const first=rail.querySelector('.m-rail-card');const step=(first?.getBoundingClientRect().width||245)+13;
  rail.scrollBy({left:step*Number(button.dataset.railMove),behavior:'smooth'});
 }));
 document.querySelectorAll('[data-video-id]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.videoId;const title=button.dataset.videoName;
  if(!/^[A-Za-z0-9_-]+$/.test(id))return;
  const original=`https://drive.google.com/file/d/${id}/view`;
  name.textContent=title;link.href=original;
  frame.src=`https://drive.google.com/file/d/${id}/preview`;
  if(typeof modal.showModal==='function')modal.showModal();else window.open(original,'_blank','noopener,noreferrer');
 }));
 const close=()=>{frame.src='about:blank';if(modal.open)modal.close()};
 document.getElementById('workPlayerClose')?.addEventListener('click',close);
 modal.addEventListener('click',e=>{if(e.target===modal)close()});
 modal.addEventListener('close',()=>{frame.src='about:blank'});
})();