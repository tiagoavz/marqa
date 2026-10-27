/* MARQA LAB 21 — esteiras com movimento lateral contínuo e interação humana. */
(() => {
  'use strict';
  const root = document.querySelector('.stream-home');
  if (!root) return;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const hoverDevice = matchMedia('(hover: hover) and (pointer: fine)');
  const controllers = new Map();
  let pageVisible = !document.hidden;

  class Rail {
    constructor(element, index) {
      this.el = element;
      this.index = index;
      this.originals = Array.from(element.children).filter(child => child.classList.contains('stream-card'));
      this.period = 0;
      this.enabled = false;
      this.visible = true;
      this.hover = false;
      this.touch = false;
      this.focus = false;
      this.holdUntil = 0;
      this.arrowUntil = 0;
      this.direction = index % 2 ? -1 : 1;
      this.speed = element.classList.contains('stream-rail--feature') ? 26 : 20;
      this.events();
      this.rebuild();
    }
    clone(node) {
      const copy = node.cloneNode(true);
      copy.dataset.marqaClone = '';
      copy.setAttribute('aria-hidden', 'true');
      if (copy.matches('a,button,[tabindex]')) copy.tabIndex = -1;
      copy.querySelectorAll('a,button,[tabindex]').forEach(child => { child.tabIndex = -1; });
      return copy;
    }
    rebuild() {
      const old = this.period;
      const fraction = old ? ((((this.el.scrollLeft - old) / old) % 1) + 1) % 1 : 0;
      this.el.querySelectorAll('[data-marqa-clone]').forEach(node => node.remove());
      this.el.classList.remove('stream-rail--infinite');
      this.enabled = false;
      this.period = 0;
      this.el.scrollLeft = 0;
      if (reduceMotion.matches || this.originals.length < 2) return;
      const preceding = document.createDocumentFragment();
      let firstCopy = null;
      this.originals.forEach(card => {
        const copy = this.clone(card);
        firstCopy ??= copy;
        preceding.appendChild(copy);
      });
      this.el.insertBefore(preceding, this.originals[0]);
      this.period = this.originals[0].getBoundingClientRect().left - firstCopy.getBoundingClientRect().left;
      if (this.period <= 0) return;
      const setsAfter = Math.max(2, Math.ceil(this.el.clientWidth / this.period) + 2);
      const following = document.createDocumentFragment();
      for (let n = 0; n < setsAfter; n++) {
        this.originals.forEach(card => following.appendChild(this.clone(card)));
      }
      this.el.appendChild(following);
      this.el.classList.add('stream-rail--infinite');
      this.el.scrollLeft = this.period * (1 + fraction);
      this.enabled = true;
    }
    recenter() {
      if (!this.enabled || !this.period || this.touch || performance.now() < this.arrowUntil) return;
      const x = this.el.scrollLeft;
      if (x < this.period || x >= 2 * this.period) {
        const phase = ((x - this.period) % this.period + this.period) % this.period;
        this.el.scrollLeft = this.period + phase;
      }
    }
    moveByCard(dir) {
      this.holdUntil = performance.now() + 3500;
      this.arrowUntil = performance.now() + 700;
      const card = this.originals[0];
      const gap = parseFloat(getComputedStyle(this.el).columnGap) || 0;
      const amount = card ? card.getBoundingClientRect().width + gap : 230;
      this.el.scrollBy({ left: dir * amount, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      setTimeout(() => this.recenter(), 780);
    }
    events() {
      this.el.addEventListener('mouseenter', () => { if (hoverDevice.matches) this.hover = true; });
      this.el.addEventListener('mouseleave', () => {
        this.hover = false;
        this.holdUntil = performance.now() + 450;
      });
      this.el.addEventListener('touchstart', () => {
        this.touch = true;
        this.holdUntil = Infinity;
      }, { passive: true });
      const finishTouch = () => {
        this.touch = false;
        this.holdUntil = performance.now() + 2800;
      };
      this.el.addEventListener('touchend', finishTouch, { passive: true });
      this.el.addEventListener('touchcancel', finishTouch, { passive: true });
      this.el.addEventListener('pointerdown', e => {
        if (e.pointerType === 'mouse') this.holdUntil = performance.now() + 2000;
      });
      this.el.addEventListener('focusin', () => { this.focus = true; });
      this.el.addEventListener('focusout', () => {
        this.focus = this.el.contains(document.activeElement);
        this.holdUntil = performance.now() + 450;
      });
      this.el.addEventListener('wheel', () => {
        this.holdUntil = performance.now() + 2600;
      }, { passive: true });
    }
    tick(now, dt) {
      if (!this.enabled || !this.visible || !pageVisible) return;
      this.recenter();
      if (this.hover || this.touch || this.focus || now < this.holdUntil || now < this.arrowUntil) return;
      const speed = this.speed * (innerWidth <= 760 ? .7 : 1);
      this.el.scrollLeft += this.direction * speed * Math.min(dt, 50) / 1000;
      this.recenter();
    }
  }

  [...root.querySelectorAll('.stream-rail')].forEach((element, i) => {
    if (element.id) controllers.set(element.id, new Rail(element, i));
  });
  root.querySelectorAll('button[data-stream-rail][data-step]').forEach(button => {
    button.addEventListener('click', () => controllers.get(button.dataset.streamRail)?.moveByCard(Number(button.dataset.step) || 1));
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const rail = controllers.get(entry.target.id);
        if (rail) rail.visible = entry.isIntersecting;
      });
    }, { rootMargin: '160px' });
    controllers.forEach(rail => observer.observe(rail.el));
  }
  document.addEventListener('visibilitychange', () => { pageVisible = !document.hidden; });
  let pendingResize = false;
  addEventListener('resize', () => {
    if (pendingResize) return;
    pendingResize = true;
    requestAnimationFrame(() => {
      pendingResize = false;
      controllers.forEach(rail => rail.rebuild());
    });
  }, { passive: true });
  const settingsChanged = () => controllers.forEach(rail => rail.rebuild());
  if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', settingsChanged);
  else reduceMotion.addListener?.(settingsChanged);
  document.fonts?.ready?.then(settingsChanged);

  let previous = performance.now();
  function animate(now) {
    const delta = now - previous;
    previous = now;
    controllers.forEach(rail => rail.tick(now, delta));
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
})();