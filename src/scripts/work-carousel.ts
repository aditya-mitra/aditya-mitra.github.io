// The Work carousel: shows one Work Card at a time and moves between them by
// button, arrow key or swipe. Without this script the cards are a plain list
// (see the <noscript> styles in WorkCards.astro).
import { animate } from 'motion/mini';

const root = document.querySelector<HTMLElement>('[data-work-cards]');
if (root) {
  const cards = [...root.querySelectorAll<HTMLElement>('[data-card]')];
  const counter = root.querySelector<HTMLElement>('[data-counter]')!;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ease = [0.22, 1, 0.36, 1] as const;
  let index = 0;
  let turn = 0;
  let running: { cancel(): void }[] = [];

  const go = (dir: 1 | -1) => {
    const from = cards[index];
    index = (index + dir + cards.length) % cards.length;
    const to = cards[index];
    const slide = !reduceMotion.matches;
    const thisTurn = ++turn;

    running.forEach((animation) => animation.cancel());
    for (const card of cards) {
      card.toggleAttribute('data-active', card === to);
      card.toggleAttribute('data-leaving', slide && card === from);
    }
    counter.textContent = `${index + 1}/${cards.length}`;
    if (!slide) return;

    const options = { duration: 0.5, ease };
    const enter = animate(to, { transform: [`translateX(${dir * 100}%)`, 'translateX(0%)'], opacity: [0, 1] }, options);
    const leave = animate(from, { transform: ['translateX(0%)', `translateX(${dir * -100}%)`], opacity: [1, 0] }, options);
    running = [enter, leave];
    leave.then(() => {
      if (thisTurn === turn) from.removeAttribute('data-leaving');
    });
  };

  root.querySelector('[data-previous]')!.addEventListener('click', () => go(-1));
  root.querySelector('[data-next]')!.addEventListener('click', () => go(1));

  root.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    go(event.key === 'ArrowRight' ? 1 : -1);
  });

  // Swipe: a mostly horizontal drag of 40px or more. Vertical drags stay with the page.
  let start: { x: number; y: number } | undefined;
  root.addEventListener('pointerdown', (event) => {
    start = event.isPrimary ? { x: event.clientX, y: event.clientY } : undefined;
  });
  root.addEventListener('pointercancel', () => (start = undefined));
  root.addEventListener('pointerup', (event) => {
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = undefined;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  });
}
