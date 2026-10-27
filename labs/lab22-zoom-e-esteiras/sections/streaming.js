/* MARQA LAB22 — Esteiras horizontais infinitas. Sem dependências externas. */
(() => {
  'use strict';
  const section = document.querySelector('.stream-home');
  if (!section) return;
  const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqHover = window.matchMedia('(hover:hover) and (pointer:fine)');
  const rails = [];
  let visiblePage = !document.hidden;

  class MovingRail {
    constructor(el, index) {
      this.el = el;
      this.originals = [...el.children].filter(x => x.classList.contains('stream-card'));
      this.index = index;
      this.period = 0;
      this.enabled = false;
      this.hovered = false;
      this.touching = false;
      this.focused = false;
      this.visible = true;
      this.pauseUntil = 0;
      this.scrollUntil = 0;
      this.direction = index % 2 === 0 ? 1 : -1;
      this.speed = el.classList.contains('stream-rail--feature') ? 88 : 58;
      this.pos = 0;
      this.listen();
      this.rebuild();
    }
    copy(card) {
      const el = card.cloneNode(true);
      el.dataset.marqaClone = 'true';
      el.setAttribute('aria-hidden','true');
      if (el.matches('a,button,input,[tabindex]')) el.tabIndex=-1;
      el.querySelectorAll('a,button,input,[tabindex]').forEach(x=>x.tabIndex=-1);
      return el;
    }
    rebuild() {
      const was = this.period ? (((this.el.scrollLeft - this.period) % this.period)+this.period)%this.period : 0;
      this.el.querySelectorAll('[data-marqa-clone]').forEach(n=>n.remove());
      this.el.classList.remove('stream-rail--infinite');
      this.enabled=false;
      this.period=0;
      this.pos=0;
      this.el.scrollLeft=0;
      if (mqReduced.matches || this.originals.length<2) return;
      const before=document.createDocumentFragment();
      let firstCopy=null;
      this.originals.forEach(card=>{
        const clone=this.copy(card);
        firstCopy ||= clone;
        before.appendChild(clone);
      });
      this.el.insertBefore(before,this.originals[0]);
      this.period = this.originals[0].getBoundingClientRect().left-firstCopy.getBoundingClientRect().left;
      if (this.period < 40) return;
      const cycles=Math.max(2, Math.ceil(this.el.clientWidth / this.period)+2);
      const after=document.createDocumentFragment();
      for(let i=0;i<cycles;i++) this.originals.forEach(card=>after.appendChild(this.copy(card)));
      this.el.appendChild(after);
      this.el.classList.add('stream-rail--infinite');
      this.enabled=true;
      this.pos=this.period+was;
      this.el.scrollLeft=this.pos;
    }
    normalize() {
      if (!this.enabled || !this.period || this.touching || performance.now()<this.scrollUntil) return;
      let p=this.el.scrollLeft;
      if (p<this.period || p>=2*this.period) {
        const fraction=((p-this.period)%this.period+this.period)%this.period;
        p=this.period+fraction;
        this.el.scrollLeft=p;
      }
      this.pos=p;
    }
    advance(step) {
      this.pauseUntil=performance.now()+3300;
      const width=this.originals[0]?.getBoundingClientRect().width||250;
      const gap=parseFloat(getComputedStyle(this.el).columnGap)||12;
      this.scrollUntil=performance.now()+550;
      this.el.scrollBy({left:step*(width+gap),behavior:mqReduced.matches?'auto':'smooth'});
      setTimeout(()=>this.normalize(),650);
    }
    listen() {
      const el=this.el;
      el.addEventListener('mouseenter',()=>{if(mqHover.matches)this.hovered=true;});
      el.addEventListener('mouseleave',()=>{this.hovered=false;this.pauseUntil=performance.now()+450;});
      el.addEventListener('touchstart',()=>{this.touching=true;this.pauseUntil=Infinity;},{passive:true});
      const onFinish=()=>{this.touching=false;this.pauseUntil=performance.now()+2900;this.pos=el.scrollLeft;};
      el.addEventListener('touchend',onFinish,{passive:true});
      el.addEventListener('touchcancel',onFinish,{passive:true});
      el.addEventListener('focusin',()=>{this.focused=true;});
      el.addEventListener('focusout',()=>{this.focused=el.contains(document.activeElement);this.pauseUntil=performance.now()+700;});
      el.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')this.pauseUntil=performance.now()+1900;});
      el.addEventListener('wheel',()=>{this.pauseUntil=performance.now()+2200;},{passive:true});
    }
    tick(now,dt) {
      if(!this.enabled || !this.visible || !visiblePage) return;
      if(!this.touching && now>=this.scrollUntil) this.normalize();
      if(this.hovered||this.touching||this.focused||now<this.pauseUntil||now<this.scrollUntil)return;
      const factor=window.innerWidth<761?.63:1;
      this.pos += this.direction*this.speed*factor*Math.min(dt,65)/1000;
      if(this.pos < this.period) this.pos += this.period;
      if(this.pos >= 2*this.period) this.pos -= this.period;
      this.el.scrollLeft=this.pos;
    }
  }
  section.querySelectorAll('.stream-rail[id]').forEach((el,i)=>rails.push(new MovingRail(el,i)));
  section.querySelectorAll('[data-stream-rail][data-step]').forEach(btn=>{
    btn.addEventListener('click',()=>rails.find(x=>x.el.id===btn.dataset.streamRail)?.advance(Number(btn.dataset.step)||1));
  });
  if('IntersectionObserver' in window) {
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{
      const c=rails.find(x=>x.el===e.target);if(c)c.visible=e.isIntersecting;
    }),{rootMargin:'180px'});
    rails.forEach(c=>io.observe(c.el));
  }
  document.addEventListener('visibilitychange',()=>{visiblePage=!document.hidden;});
  let pending=false;
  addEventListener('resize',()=>{
    if(pending)return;
    pending=true;
    requestAnimationFrame(()=>{pending=false;rails.forEach(c=>c.rebuild());});
  },{passive:true});
  const changed=()=>rails.forEach(c=>c.rebuild());
  mqReduced.addEventListener?.('change',changed);
  document.fonts?.ready?.then(changed);
  let prev=performance.now();
  function frame(now) {
    const dt=now-prev;prev=now;
    rails.forEach(c=>c.tick(now,dt));
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
