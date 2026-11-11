// The giant "WORK" heading's scroll parallax: while the Work Section scrolls
// into view the heading lags behind the Scene, rising out from behind the Work
// Cards, and settles in place once the Section reaches the top of the viewport.
// Off under reduced motion (the heading then simply scrolls with the page).
import { animate, scroll } from 'motion';

const heading = document.querySelector<HTMLElement>('[data-work-heading]');
const section = heading?.closest<HTMLElement>('section');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

if (heading && section) {
  let stop: (() => void) | undefined;
  const update = () => {
    stop?.();
    stop = undefined;
    heading.style.transform = '';
    if (reduceMotion.matches) return;
    stop = scroll(animate(heading, { y: ['70%', '0%'] }, { ease: 'linear' }), {
      target: section,
      offset: ['start end', 'start start'],
    });
  };
  update();
  reduceMotion.addEventListener('change', update);
}
