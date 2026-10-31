/* LAB 25.12 — três thumbnails cinematográficas; painel expandido; navegação por miniaturas. */
(()=>{'use strict';
 const root=document.querySelector('[data-proof-workspace]');if(!root)return;
 const cards=[...root.querySelectorAll('[data-proof-open]')];
 const overview=root.querySelector('[data-proof-overview]');
 const detail=root.querySelector('[data-proof-detail]');
 const poster=root.querySelector('[data-proof-poster]');
 const player=root.querySelector('[data-proof-player]');
 const frame=player.querySelector('iframe');
 const play=root.querySelector('[data-proof-play]');
 const close=root.querySelector('[data-proof-close]');
 const drive=root.querySelector('[data-proof-drive]');
 const back=root.querySelector('[data-proof-back]');
 const stack=root.querySelector('[data-proof-next-stack]');
 const fields={system:'[data-proof-system]',index:'[data-proof-index]',client:'[data-proof-client]',title:'[data-proof-title]',description:'[data-proof-description]',a:'[data-proof-work-a]',b:'[data-proof-work-b]',resultLabel:'[data-proof-result-label]',result:'[data-proof-result]',resultDetail:'[data-proof-result-detail]',note:'[data-proof-media-note]',group:'[data-proof-media-label]',order:'[data-proof-film]'};
 const content=[{"id":"case-leticia","order":"01","system":"BRAND / POSICIONAMENTO","group":"MARCA PESSOAL","client":"Dra. Letícia Leão","title":"Uma imagem à altura do trabalho.","description":"A comunicação precisava representar a experiência e o posicionamento profissional. Trabalhamos direção de imagem, narrativa e consistência para tornar a presença digital mais alinhada ao valor do atendimento.","resultLabel":"TRANSFORMAÇÃO DE MARCA","result":"Posicionamento","resultDetail":"Um relato sobre percepção de valor e presença profissional.","a":"Direção de imagem e linguagem","b":"Narrativa para a marca pessoal","poster":"assets/leticia-frame-vertical.jpg","video":"1FQ5zIqY0t388F2xJOLfTuNKYyM-FBQhn","note":"VÍDEO DA DRA. LETÍCIA · DEPOIMENTO ESPECÍFICO A CONFERIR","link":"projetos/leticia/index.html","color":"#a28c7f","extra":"Vídeo atual de referência; o depoimento específico ainda não foi identificado.","keyword":"Posicionamento"},{"id":"case-espacolaser","order":"02","system":"VISION / ACELERAÇÃO","group":"ESTÉTICA & SERVIÇOS","client":"EspaçoLaser Canaã","title":"90 dias. Uma marca mais relevante.","description":"Integramos criação audiovisual, campanhas e acompanhamento de indicadores para ampliar presença e atrair mais atenção para a unidade em Canaã dos Carajás.","resultLabel":"EVOLUÇÃO DE AUDIÊNCIA · 90 DIAS","result":"+69,1%","resultDetail":"3.321 → 5.616 seguidores · 250.817 visualizações no ciclo","a":"Conteúdo e campanha com direção","b":"Distribuição e otimização contínua","poster":"assets/espacolaser-case-referencia.jpg","video":"1tbL7pxZKav8gj8JcwWC0gvNu1AnW3Srb","note":"VÍDEO DE CAMPANHA · RESULTADOS DOCUMENTADOS","link":"projetos/espacolaser/index.html","color":"#ad998d","extra":"Indicadores documentados no fechamento dos 90 dias; faturamento não quantificado.","keyword":"Crescimento"},{"id":"case-rihappy","order":"03","system":"PERFORMANCE / VAREJO","group":"VAREJO & EXPERIÊNCIAS","client":"Ri Happy Canaã","title":"A comunidade cresce com a marca.","description":"Campanhas para o público familiar, conteúdos de loja e ativações locais ajudaram a ampliar a audiência e fortalecer a presença da Ri Happy na cidade.","resultLabel":"EVOLUÇÃO DE SEGUIDORES","result":"11,8 mil+","resultDetail":"Base anterior: pouco mais de 9 mil seguidores","a":"Conteúdo conectado ao varejo local","b":"Campanhas e ações de audiência","poster":"assets/rihappy-frame-vertical.jpg","video":"1lbfwFtmnySJ6zwnJMLbLBpiuxdVNF9zd","note":"VÍDEO DE CAMPANHA · MARCOS APROXIMADOS","link":"projetos/rihappy/index.html","color":"#7e746f","extra":"Patamares aproximados informados para o período.","keyword":"Aceleração"}];
 let active=-1;
 function stop(){frame.removeAttribute('src');player.hidden=true;}
 function fill(index){
  const c=content[index];
  poster.src=c.poster;poster.alt='Cena de produção para '+c.client;
  for(const [key,selector] of Object.entries(fields)){const el=root.querySelector(selector);if(el)el.textContent=(key==='index'?c.order+' / 03':key==='order'?c.order:c[key])||'';}
  root.querySelector('[data-proof-link]').href=c.link;
  play.setAttribute('aria-label','Reproduzir vídeo de '+c.client);
  const label=play.querySelector('span:last-child');if(label)label.textContent=index===0?'ASSISTIR VÍDEO':'ASSISTIR FILME';
  frame.title='Vídeo de '+c.client;
  drive.href='https://drive.google.com/file/d/'+c.video+'/view';
  stack.replaceChildren(...content.filter((item,i)=>i!==index).map(item=>{
    const i=content.indexOf(item);
    const button=document.createElement('button');button.type='button';button.className='marqa-proof__mini';button.dataset.proofNext=String(i);
    button.setAttribute('aria-label','Conhecer o projeto de '+item.client);
    const image=document.createElement('img');image.src=item.poster;image.alt='';image.loading='lazy';
    const cap=document.createElement('span');cap.className='marqa-proof__mini-cap';cap.textContent='MARQA® / '+item.order;
    const name=document.createElement('strong');name.textContent=item.client;
    const word=document.createElement('small');word.textContent=item.keyword;
    const arrow=document.createElement('span');arrow.className='marqa-proof__mini-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';
    button.append(image,cap,name,word,arrow);button.addEventListener('click',()=>open(i,true));return button;
  }));
 }
 function open(index,fromStack=false){
  if(index<0||index>=content.length)return;
  stop();active=index;fill(index);
  overview.hidden=true;detail.hidden=false;root.dataset.state='detail';
  cards.forEach((card,i)=>card.setAttribute('aria-expanded',String(i===index)));
  if(fromStack){back.focus({preventScroll:true});}else{back.focus({preventScroll:true});}
  if(location.hash!== '#'+content[index].id){history.replaceState(null,'','#'+content[index].id);}
  if(fromStack){detail.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}
 }
 function reset(restoreFocus=true){
  const previous=active;stop();active=-1;detail.hidden=true;overview.hidden=false;root.dataset.state='overview';
  cards.forEach(card=>card.setAttribute('aria-expanded','false'));
  if(location.hash.startsWith('#case-'))history.replaceState(null,'','#resultados');
  if(restoreFocus&&previous>=0)cards[previous].focus({preventScroll:true});
 }
 cards.forEach((card,i)=>card.addEventListener('click',()=>open(i)));
 const explore=root.querySelector('[data-proof-scroll]');
 if(explore)explore.addEventListener('click',()=>{
  const target=cards[0];if(!target)return;
  target.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'nearest',inline:'nearest'});
  target.focus({preventScroll:true});
 });

 back.addEventListener('click',()=>reset());
 play.addEventListener('click',()=>{frame.src='https://drive.google.com/file/d/'+content[active].video+'/preview';player.hidden=false;close.focus({preventScroll:true});});
 close.addEventListener('click',()=>{stop();play.focus({preventScroll:true});});
 document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;if(!player.hidden){stop();play.focus({preventScroll:true});}else if(active>=0){reset();}});
 function openHash(){const i=content.findIndex(c=>'#'+c.id===decodeURIComponent(location.hash));if(i>=0)open(i);else if(active>=0&&location.hash==='#resultados')reset(false);}
 window.addEventListener('hashchange',openHash);
 openHash();
})();
