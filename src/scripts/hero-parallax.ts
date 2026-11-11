// Cursor parallax for the Hero Scene: feeds the pointer position, -1 to 1 from the
// centre of the viewport, to the Scene as --mx/--my. The layers' CSS turns that into
// movement. Pointer devices only, and never under reduced motion.
const scene = document.querySelector<HTMLElement>('[data-hero-scene]');
const fine = matchMedia('(hover: hover) and (pointer: fine)');
const still = matchMedia('(prefers-reduced-motion: reduce)');

if (scene) {
  let frame = 0;
  let x = 0;
  let y = 0;
  addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse' || !fine.matches || still.matches) return;
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
