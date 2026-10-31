/* MARQA LAB24 — controle local da Seção 04; nenhuma dependência do player. */
(() => {
  'use strict';
  const root=document.querySelector('[data-marqa-method]');
  if(!root)return;
  const steps=[...root.querySelectorAll('[data-method-step]')];
  const img=root.querySelector('[data-method-image]');
  const current=root.querySelector('[data-method-current]');
  const system=root.querySelector('[data-method-system]');
  const title=root.querySelector('[data-method-title]');
  const description=root.querySelector('[data-method-description]');
  const list=root.querySelector('[data-method-list]');
  const output=root.querySelector('[data-method-output]');
  const panel=root.querySelector('[data-method-panel]');
  const progress=root.querySelector('[data-method-progress]');
  const frame=root.querySelector('[data-method-frame]');
  const prev=root.querySelector('[data-method-prev]');
  const next=root.querySelector('[data-method-next]');
  const caseLink=root.querySelector('[data-method-case]');
  const caseTitle=root.querySelector('[data-method-case-title]');
  const visual=root.querySelector('.marqa-method__visual');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  const content=[
    { system:'01 / BRAND SYSTEM', title:'Primeiro, uma direção que faça sentido.', description:'Antes de produzir qualquer peça, entendemos a marca, o mercado e o que precisa mudar na percepção das pessoas.', list:['Diagnóstico do negócio','Público, oferta e posicionamento','Estratégia e narrativa'], output:'Uma direção clara para comunicar com intenção.', image:'assets/marqa-bastidores.jpg', alt:'Bastidores reais de captação audiovisual da MARQA', caseHref:'#case-leticia', caseName:'Dra. Letícia Leão' },
    { system:'02 / VISION SYSTEM', title:'Depois, uma presença que se reconhece.', description:'Transformamos essa direção em conceito, roteiro, imagem e ritmo. Cada produção precisa parecer parte da mesma marca.', list:['Conceito e direção criativa','Captação e pós-produção','Conteúdo adequado a cada canal'], output:'Uma linguagem que a marca pode chamar de sua.', image:'assets/agra-filme.jpg', alt:'Cena de uma produção audiovisual para Dr. Rafael Agra', caseHref:'#case-espacolaser', caseName:'EspaçoLaser Canaã' },
    { system:'03 / PERFORMANCE SYSTEM', title:'Por fim, conteúdo que encontra pessoas.', description:'Distribuímos com inteligência, testamos criativos e interpretamos os sinais das campanhas para evoluir as próximas decisões.', list:['Campanhas e distribuição','Testes de formatos e mensagens','Análise e otimização contínuas'], output:'Mais clareza sobre o que gera resposta.', image:'assets/rihappy-filme.jpg', alt:'Cena de campanha audiovisual da Ri Happy Canaã', caseHref:'#case-rihappy', caseName:'Ri Happy Canaã' }
  ];
  let active=0;
  let swapTimer=0;
  const total=steps.length;
  function change(index,focus=false) {
    if(index<0||index>=steps.length||!content[index])return;
    active=index;
    const data=content[index];
    const currentNumber=String(index+1).padStart(2,'0');
    const totalNumber=String(total).padStart(2,'0');
    steps.forEach((button,i)=>{
      const selected=i===index;
      button.classList.toggle('is-current',selected);
      button.setAttribute('aria-selected',String(selected));
      button.tabIndex=selected?0:-1;
    });
    current.textContent=currentNumber;
    if(progress) progress.textContent=`${currentNumber} — ${totalNumber}`;
    if(frame) frame.textContent=`FRAME ${currentNumber}—${totalNumber}`;
    system.textContent=data.system;
    title.textContent=data.title;
    description.textContent=data.description;
    list.replaceChildren(...data.list.map(label=>{const li=document.createElement('li');li.textContent=label;return li;}));
    output.textContent=data.output;
    if(caseLink && caseTitle){caseLink.href=data.caseHref;caseTitle.replaceChildren(document.createTextNode(data.caseName+' '));const arrow=document.createElement('span');arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';caseTitle.append(arrow);}
    if(prev) prev.disabled=index===0;
    if(next) next.disabled=index===total-1;
    panel.setAttribute('aria-labelledby',steps[index].id);
    const imageSwap=()=>{img.src=data.image;img.alt=data.alt;visual.classList.remove('is-changing');};
    window.clearTimeout(swapTimer);
    if(reduce.matches||index===0&&img.getAttribute('src')===data.image)imageSwap();
    else{visual.classList.add('is-changing');swapTimer=window.setTimeout(imageSwap,155);}
    if(focus) steps[index].focus();
  }
  steps.forEach((step,i)=>{
    step.addEventListener('click',()=>change(i));
    step.addEventListener('keydown',event=>{
      let nextIndex;
      if(event.key==='ArrowRight')nextIndex=Math.min(active+1,steps.length-1);
      if(event.key==='ArrowLeft')nextIndex=Math.max(active-1,0);
      if(event.key==='Home')nextIndex=0;
      if(event.key==='End')nextIndex=steps.length-1;
      if(nextIndex!==undefined){event.preventDefault();change(nextIndex,true);}
    });
  });
  if(prev) prev.addEventListener('click',()=>change(Math.max(active-1,0), true));
  if(next) next.addEventListener('click',()=>change(Math.min(active+1,total-1), true));
  change(0);
})();
