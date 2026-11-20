// Scroll motion (GSAP + ScrollTrigger). Everything here is progressive enhancement:
// pages are fully readable without it, and nothing runs when the user prefers reduced motion.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
// If frames stall (background tab, slow device), finish tweens on time instead of slowing them down,
// so revealed content never stays hidden longer than the tween's duration.
gsap.ticker.lagSmoothing(0);

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fade-and-rise for blocks marked data-reveal, batched so siblings stagger. */
function reveals() {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (!els.length) return;
  gsap.set(els, { autoAlpha: 0, y: 28 });
  ScrollTrigger.batch(els, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
  });
}

/** Apple-style statement: words light up one by one as you scroll. */
function scrubWords() {
  document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
    const isZh = document.documentElement.lang.startsWith('zh');
    const wrap = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent ?? '';
        const parts = isZh ? Array.from(text) : text.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p.trim()) {
            frag.append(p);
            return;
          }
          const s = document.createElement('span');
          s.className = 'w';
          s.textContent = p;
          frag.append(s);
        });
        node.parentNode?.replaceChild(frag, node);
      } else {
        Array.from(node.childNodes).forEach(wrap);
      }
    };
    Array.from(el.childNodes).forEach(wrap);
    const words = el.querySelectorAll('.w');
    gsap.fromTo(
      words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
      },
    );
  });
}

/** Count numbers up when they enter, e.g. "77.7%" or "5". Non-numeric values are left alone. */
function countUps() {
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const final = el.textContent?.trim() ?? '';
    const m = final.match(/^(\d+(?:\.\d+)?)(%?)$/);
    if (!m) return;
    const target = parseFloat(m[1]);
    const decimals = m[1].includes('.') ? m[1].split('.')[1].length : 0;
    const obj = { v: 0 };
    el.textContent = `${(0).toFixed(decimals)}${m[2]}`;
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = `${obj.v.toFixed(decimals)}${m[2]}`;
      },
      onComplete: () => {
        el.textContent = final;
      },
    });
  });
}

/** Project pages: the sticky visual follows whichever chapter is in the middle of the screen. */
function chapters() {
  const stage = document.querySelector<HTMLElement>('[data-chapter-stage]');
  if (!stage) return;
  const visual = stage.querySelector<HTMLElement>('.pv');
  const counter = stage.querySelector<HTMLElement>('[data-chapter-counter]');
  const title = stage.querySelector<HTMLElement>('[data-chapter-title]');
  const items = gsap.utils.toArray<HTMLElement>('[data-chapter]');
  const activate = (i: number) => {
    items.forEach((el, j) => el.classList.toggle('is-active', j === i));
    visual?.setAttribute('data-step', String(i));
    if (counter) counter.textContent = String(i + 1).padStart(2, '0');
    if (title) title.textContent = items[i].dataset.chapterKicker ?? '';
  };
  items.forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && activate(i),
    });
  });
}

export function initMotion() {
  if (reduced()) {
    document.querySelectorAll('[data-chapter]').forEach((el) => el.classList.add('is-active'));
    return;
  }
  reveals();
  scrubWords();
  countUps();
  chapters();
  // Fonts and the 3D canvas can shift layout after first paint.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}
