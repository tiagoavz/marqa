/* MARQA LAB25 — Infinite Marquee, inspirado no AnimatedMarqueeHero.
   Mantém HTML/CSS/JS originais: nenhuma dependência de React/Framer Motion.
   Duas sequências idênticas deslizam pela metade da largura da faixa.
*/
(() => {
  'use strict';
  const section = document.querySelector('.stream-home');
  if (!section) return;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const instances = new Map();
  const selected = '.stream-rail[id]';
  const now = () => performance.now();

  class InfiniteMarquee {
    constructor(viewport, index) {
      this.viewport = viewport;
      this.originals = Array.from(viewport.children).filter(el => el.classList.contains('stream-card'));
      this.index = index;
      this.isFeature = viewport.classList.contains('stream-rail--feature');
      this.speed = this.isFeature ? 49 : 37; // pixels/segundo, movimento editorial discreto
      this.reverse = index % 2 === 1;
      this.drag = null;
      this.hovering = false;
      this.resumeTimer = null;
      this.resizeTimer = null;
      this.animation = null;
      this.track = null;
      this.period = 0;
      this.enabled = false;
      this.draggedClickUntil = 0;
      this.listen();
      this.rebuild();
    }
    clone(card) {
      const copy = card.cloneNode(true);
      copy.dataset.marqaDuplicate = 'true';
      copy.setAttribute('aria-hidden','true');
      if (copy.matches('a,button,[tabindex]')) copy.tabIndex = -1;
      copy.querySelectorAll('a,button,[tabindex]').forEach(el => { el.tabIndex = -1; });
      return copy;
    }
    reset() {
      clearTimeout(this.resumeTimer);
      this.animation?.cancel();
      this.animation = null;
      if (this.track) {
        this.originals.forEach(card => this.viewport.appendChild(card));
        this.track.remove();
        this.track = null;
      }
      this.viewport.classList.remove('stream-rail--marquee', 'marqa-marquee--held');
      this.viewport.style.removeProperty('--marqa-card-width');
      this.viewport.removeAttribute('data-marqa-marquee');
      this.period = 0;
      this.enabled = false;
    }
    cardWidth() {
      const width = this.viewport.clientWidth;
      const gap = parseFloat(getComputedStyle(this.viewport).columnGap) || 14;
      const ww = innerWidth;
      if (this.isFeature) {
        if (ww >= 1200) return Math.max(100,(width - 4*gap)/5);
        if (ww >= 761) return Math.max(170,(width - 2*gap)/3);
        return Math.max(215,Math.min(330,ww*.67));
      }
      return ww <= 760 ? Math.max(165,Math.min(245,ww*.44)) : Math.max(180,Math.min(338,ww*.15));
    }
    rebuild() {
      if (this.drag) return;
      const fraction = this.animation && this.animation.effect ?
        ((Number(this.animation.currentTime)||0) / (this.period/this.speed*1000)) % 1 : 0;
      this.reset();
      if (reduced.matches || this.originals.length < 2) return;
      const viewport = this.viewport;
      viewport.style.setProperty('--marqa-card-width',this.cardWidth()+'px');
      viewport.classList.add('stream-rail--marquee');

      const track = document.createElement('div');
      track.className = 'stream-marquee-track';
      const first = document.createElement('div');
      first.className = 'stream-marquee-set';
      first.dataset.marqaOriginalSet = 'true';
      this.originals.forEach(el => first.appendChild(el));
      track.appendChild(first);
      viewport.appendChild(track);
      this.track = track;

      // Mantém ao menos uma largura de tela + um card de conteúdo real,
      // inclusive na seção de Serviços que tem somente três marcas.
      const minimum = viewport.clientWidth + this.originals[0].getBoundingClientRect().width;
      let fills = 0;
      while (first.getBoundingClientRect().width < minimum && fills < 16) {
        this.originals.forEach(card => first.appendChild(this.clone(card)));
        fills++;
      }
      const second = first.cloneNode(true);
      second.dataset.marqaSecondSet = 'true';
      second.removeAttribute('data-marqa-original-set');
      second.setAttribute('aria-hidden','true');
      second.querySelectorAll('a,button,[tabindex]').forEach(x => { x.tabIndex = -1; });
      track.appendChild(second);

      this.period = first.getBoundingClientRect().width;
      if (!(this.period > 80)) { this.reset(); return; }
      // Exatamente duas cópias idênticas, lado a lado, sem gap entre os conjuntos.
      // A animação percorre exatamente uma cópia — 50% do trilho total.
      const ms = this.period / this.speed * 1000;
      this.animation = track.animate([
        { transform: 'translate3d(0, 0, 0)' },
        { transform: 'translate3d(-50%, 0, 0)' }
      ], {
        duration:ms, iterations:Infinity, easing:'linear', direction:this.reverse?'reverse':'normal'
      });
      if (fraction) this.animation.currentTime = fraction*ms;
      this.enabled = true;
      viewport.dataset.marqaMarquee = 'ativo';
      viewport.style.scrollBehavior = 'auto';
      // Inicialmente a animação acontece sozinha; pausa somente por interação
      // ou preferência do dispositivo.
      this.updatePause();
    }
    updatePause() {
      if (!this.animation) return;
      const shouldPause = this.drag !== null || this.hovering || this.viewport.matches(':hover') ||
        this.viewport.contains(document.activeElement) || this.viewport.classList.contains('marqa-marquee--held') || document.hidden;
      if (shouldPause) this.animation.pause();
      else this.animation.play();
    }
    resumeAfter(ms) {
      clearTimeout(this.resumeTimer);
      this.viewport.classList.add('marqa-marquee--held');
      this.updatePause();
      this.resumeTimer = setTimeout(() => {
        this.viewport.classList.remove('marqa-marquee--held');
        this.updatePause();
      },ms);
    }
    moveByCard(step) {
      if (!this.enabled || !this.animation) {
        this.viewport.scrollBy({left: step * (this.originals[0]?.clientWidth || 220),behavior:reduced.matches?'auto':'smooth'});
        return;
      }
      const gap = parseFloat(getComputedStyle(this.viewport).columnGap)||14;
      const dx = step*(this.originals[0].getBoundingClientRect().width+gap);
      const factor = this.reverse ? -1 : 1;
      this.animation.currentTime = ((Number(this.animation.currentTime)||0) + factor*dx/this.speed*1000 + this.animation.effect.getTiming().duration*10) % this.animation.effect.getTiming().duration;
      this.resumeAfter(3400);
    }
    listen() {
      const v = this.viewport;
      const onEnter = e => { if (e.pointerType && e.pointerType !== 'mouse') return; this.hovering=true; this.updatePause(); };
      const onLeave = e => { if (e.pointerType && e.pointerType !== 'mouse') return; this.hovering=false; this.updatePause(); };
      v.addEventListener('pointerenter',onEnter);
      v.addEventListener('pointerleave',onLeave);
      v.addEventListener('mouseenter',onEnter);
      v.addEventListener('mouseleave',onLeave);
      v.addEventListener('focusin',()=>this.updatePause());
      v.addEventListener('focusout',()=>{setTimeout(()=>this.updatePause(),0);});
      v.addEventListener('pointerdown',event=>{
        if (!this.enabled || (event.pointerType==='mouse' && event.button!==0)) return;
        clearTimeout(this.resumeTimer);
        v.classList.add('marqa-marquee--held');
        this.drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,startTime:Number(this.animation?.currentTime)||0,moved:false,ignore:false};
        this.updatePause();
      });
      v.addEventListener('pointermove',event=>{
        const d=this.drag;
        if (!d || d.id!==event.pointerId || !this.animation) return;
        const deltaX=event.clientX-d.startX, deltaY=event.clientY-d.startY;
        if (!d.moved) {
          if (Math.abs(deltaY)>Math.abs(deltaX)+8 && Math.abs(deltaY)>10) { d.ignore=true; return; }
          if (d.ignore || Math.abs(deltaX)<8) return;
          d.moved=true;
          try{v.setPointerCapture(event.pointerId);}catch(e){}
        }
        const total=Number(this.animation.effect.getTiming().duration)||1;
        const progressDelta=deltaX/this.speed*1000*(this.reverse?1:-1);
        this.animation.currentTime=((d.startTime+progressDelta)%total+total)%total;
      });
      const finish=event=>{
        if (!this.drag || this.drag.id!==event.pointerId) return;
        if (this.drag.moved) this.draggedClickUntil=now()+400;
        this.drag=null;
        this.resumeAfter(event.pointerType==='touch'?2800:1100);
      };
      v.addEventListener('pointerup',finish);
      v.addEventListener('pointercancel',finish);
      v.addEventListener('click',event=>{
        if (now()<this.draggedClickUntil){event.preventDefault();event.stopPropagation();}
      },true);
      v.addEventListener('wheel',()=>this.resumeAfter(1800),{passive:true});
    }
  }

  section.querySelectorAll(selected).forEach((rail,i)=>instances.set(rail.id,new InfiniteMarquee(rail,i)));
  section.querySelectorAll('button[data-stream-rail][data-step]').forEach(button=>{
    button.addEventListener('click',()=>instances.get(button.dataset.streamRail)?.moveByCard(Number(button.dataset.step)||1));
  });
  document.addEventListener('visibilitychange',()=>instances.forEach(instance=>instance.updatePause()));
  let timer;
  window.addEventListener('resize',()=>{
    clearTimeout(timer);
    timer=setTimeout(()=>instances.forEach(instance=>instance.rebuild()),180);
  },{passive:true});
  const onMotion=()=>instances.forEach(instance=>instance.rebuild());
  if (reduced.addEventListener) reduced.addEventListener('change',onMotion);
  else reduced.addListener?.(onMotion);
  document.fonts?.ready?.then(onMotion);
  window.__MARQA_MARQUEE_STATUS__=()=>Array.from(instances).map(([id,c])=>({id,ativo:c.enabled,velocidade:c.speed,periodo:Math.round(c.period),tempo:Math.round(Number(c.animation?.currentTime)||0),pausado:c.animation?.playState==='paused',capas:c.originals.length}));
})();
