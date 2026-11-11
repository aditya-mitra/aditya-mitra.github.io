// Plays the Intro (see src/components/Intro.astro), about 2.2 seconds:
// the command is typed, its glyphs collapse into the Monogram, the Monogram
// flashes blue-violet, green, white, the black clears in bands from the top,
// and the Hero greeting box lands last.
//
// Only runs when the inline script in Intro.astro has set `data-intro` on
// <html>. Any input from the visitor ends it at once.
import { animate, stagger, steps } from 'motion';

const root = document.documentElement;
const overlay = document.querySelector<HTMLElement>('.intro');

if (overlay && root.dataset.intro) {
  const $ = <T extends Element = HTMLElement>(selector: string) => [...overlay.querySelectorAll<T>(selector)];
  const chars = $('.intro__char');
  const [cursor] = $('.intro__cursor');
  const [mark] = $('.intro__mark');
  const [green] = $<SVGElement>('.intro__flash--green');
  const [paper] = $<SVGElement>('.intro__flash--paper');
  const bands = $('.intro__band');
  // The Hero's greeting box: the part of the page that lands last.
  const greeting = document.querySelector<HTMLElement>('#hero h1')?.parentElement;
  const wide = matchMedia('(min-width: 48rem)').matches;

  const ch = chars[0].getBoundingClientRect().width;
  const key = 0.045; // seconds per typed glyph
  const typed = 0.18;
  const collapse = typed + (chars.length - 1) * key + 0.06;
  const flash = collapse + 0.32;
  const clear = flash + 0.36;
  const instant = { duration: 0.01 };
  const punch = [0.34, 1.56, 0.64, 1] as const;

  cursor.style.animation = 'none';

  const sequence = animate([
    // Type the command; the block cursor steps along with it.
    [chars, { opacity: [0, 1] }, { ...instant, at: typed, delay: stagger(key) }],
    [cursor, { x: [ch, ch * chars.length] }, { at: typed, duration: (chars.length - 1) * key, ease: steps(chars.length - 1) }],

    // The glyphs collapse into the Monogram.
    [cursor, { opacity: 0 }, { ...instant, at: collapse }],
    ...chars.map(
      (char, i) =>
        [
          char,
          { x: (chars.length / 2 - i - 0.5) * ch, scale: 0.2, opacity: 0 },
          { at: collapse, duration: 0.26, ease: [0.6, 0, 0.9, 0.4] },
        ] as const,
    ),
    [mark, { opacity: [0, 1], scale: [0.3, 1] }, { at: collapse + 0.16, duration: 0.24, ease: punch }],

    // Flash: blue-violet (already showing), green, white.
    [green, { opacity: [0, 1] }, { ...instant, at: flash + 0.1 }],
    [mark, { scale: [1.12, 1] }, { at: flash + 0.1, duration: 0.11 }],
    [paper, { opacity: [0, 1] }, { ...instant, at: flash + 0.22 }],
    [mark, { scale: [1.12, 1] }, { at: flash + 0.22, duration: 0.11 }],

    // The black clears in horizontal bands, top to bottom.
    [mark, { opacity: 0, scale: 1.6 }, { at: clear, duration: 0.22, ease: 'easeIn' }],
    [bands, { scaleX: [1, 0] }, { at: clear + 0.04, duration: 0.3, delay: stagger(0.05), ease: [0.7, 0, 0.2, 1] }],
  ]);

  // The Hero greeting box lands last. It is animated on its own, started only
  // once the black clears, so until then it sits untouched in its final place
  // (Motion would otherwise hold its first keyframe from time 0). Transform
  // only: it stays painted, so the largest contentful paint never waits.
  let landing: ReturnType<typeof animate> | undefined;
  let cancelLanding = () => {};
  const land = new Promise<void>((resolve) => {
    if (!greeting) return resolve();
    const timer = setTimeout(() => {
      landing = animate(greeting, { y: [-72, 0], rotate: [wide ? -5 : 0, 0] }, { duration: 0.5, ease: punch });
      landing.finished.then(() => resolve(), () => resolve());
    }, (clear + 0.2) * 1000);
    cancelLanding = () => (clearTimeout(timer), resolve());
  });

  const inputs = ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'] as const;
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    for (const type of inputs) removeEventListener(type, finish, true);
    sequence.cancel();
    cancelLanding();
    landing?.cancel();
    greeting?.style.removeProperty('transform');
    delete root.dataset.intro;
  };

  for (const type of inputs) addEventListener(type, finish, { capture: true, passive: true });
  Promise.all([sequence.finished, land]).then(finish, finish);
}
