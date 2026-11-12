// Cursor parallax for the Hero Scene: feeds the pointer position, -1 to 1 from the
// centre of the viewport, to the Scene as --mx/--my. The layers' CSS turns that into
// movement. Pointer devices only, and never under reduced motion.
const scene = document.querySelector<HTMLElement>('[data-hero-scene]');
import { reduceMotion } from './shared';

const finePointer = matchMedia('(hover: hover) and (pointer: fine)');

if (scene) {
  let frame = 0;
  let x = 0;
  let y = 0;
  addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || !finePointer.matches || reduceMotion.matches) return;
      x = (event.clientX / innerWidth) * 2 - 1;
      y = (event.clientY / innerHeight) * 2 - 1;
      frame ||= requestAnimationFrame(() => {
        frame = 0;
        scene.style.setProperty('--mx', x.toFixed(3));
        scene.style.setProperty('--my', y.toFixed(3));
      });
    },
    { passive: true },
  );
}
