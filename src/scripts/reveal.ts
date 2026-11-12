// Section reveals: as the visitor scrolls, each Section's content rises into
// place the first time it comes into view, one piece after another. Marked in
// the Sections with `data-reveal`. Only content still below the fold when the
// page loads is hidden first, so nothing already on screen blinks out, and
// nothing is hidden at all without JavaScript or under reduced motion.
import { animate, inView } from 'motion';
import { reduceMotion } from './shared';

const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

if (!reduceMotion.matches) {
  const pending = items.filter((el) => el.getBoundingClientRect().top > innerHeight);
  for (const el of pending) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(3rem)';
  }

  // Pieces that enter view together go in reading order, a beat apart.
  let batch: HTMLElement[] = [];
  const flush = () => {
    batch.forEach((el, i) => {
      animate(
        el,
        { opacity: 1, transform: 'translateY(0rem)' },
        { type: 'spring', bounce: 0.3, visualDuration: 0.6, delay: i * 0.09 },
      ).then(() =>
        // Hand transform back to the stylesheet so hover and press work. Motion
        // writes its final values inline just after this resolves, so wait a frame.
        requestAnimationFrame(() => {
          el.style.removeProperty('opacity');
          el.style.removeProperty('transform');
        }),
      );
    });
    batch = [];
  };

  for (const el of pending) {
    inView(
      el,
      () => {
        if (el.dataset.revealed) return;
        el.dataset.revealed = '';
        if (!batch.length) requestAnimationFrame(flush);
        batch.push(el);
      },
      { margin: '0px 0px -12% 0px' },
    );
  }
}
