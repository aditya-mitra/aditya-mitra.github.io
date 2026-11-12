// The About Scene's moving parts, loaded only when the Section nears the viewport:
// the scroll-linked zoom through the grid tunnel, and the draggable Toy.
import { animate, scroll } from 'motion';
import { reduceMotion } from './shared';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function start(scene: HTMLElement) {
  if (!reduceMotion.matches) tunnel(scene);
  toy(scene);
}

// As About scrolls up into view, fly through the portal: the tunnel grows past the edges
// of the screen and fades, and the room behind it comes forward to meet the visitor.
function tunnel(scene: HTMLElement) {
  const section = scene.parentElement!;
  const rings = scene.querySelector<HTMLElement>('.about-scene__tunnel')!;
  const room = scene.querySelector<SVGElement>('.about-scene__room')!;
  const stage = rings.parentElement!;
  scroll(
    (progress: number) => {
      const p = clamp(progress, 0, 1);
      // Keep the portal in the middle of the part of the Section already on screen, until
      // that reaches the stage's centre.
      const vh = innerHeight;
      const centre = stage.offsetTop + stage.offsetHeight / 2;
      const middle = Math.min(centre, (p * vh) / 2);
      const lift = (middle - centre) * (1 - p * p * p);
      const scale = 0.4 * Math.pow(40, p * p);
      rings.style.transform = `translateY(${lift}px) scale(${scale})`;
      rings.style.opacity = String(clamp((0.97 - p) / 0.17, 0, 1));
      room.style.transform = `translateY(${lift}px) scale(${0.6 + 0.4 * p})`;
    },
    { target: section, offset: ['start end', 'start start'] },
  );
}

// The Toy: drag the cube around the room's floor with a mouse or a finger. It shrinks as it
// goes back towards the far wall, and when let go it slides on and settles with a spring.
function toy(scene: HTMLElement) {
  const el = scene.querySelector<HTMLElement>('[data-toy]')!;
  const stage = el.parentElement!;
  let x = 0;
  let y = 0;
  let tilt = 0;
  let grab: { id: number; dx: number; dy: number; t: number; vx: number; vy: number } | null = null;
  let settling: { stop(): void }[] = [];

  const bounds = () => {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    const size = el.offsetWidth;
    return { x: w / 2 - size * 0.9, top: -0.36 * h, bottom: 0.22 * h - size / 2, h };
  };

  const render = () => {
    const b = bounds();
    const depth = 1 + (y / b.h) * 0.9;
    el.style.transform = `translate(${x}px, ${y}px) scale(${depth}) rotate(${tilt}deg)`;
  };

  el.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    settling.forEach((a) => a.stop());
    settling = [];
    el.setPointerCapture(event.pointerId);
    grab = { id: event.pointerId, dx: event.clientX - x, dy: event.clientY - y, t: event.timeStamp, vx: 0, vy: 0 };
  });

  el.addEventListener('pointermove', (event) => {
    if (!grab || event.pointerId !== grab.id) return;
    const b = bounds();
    const nx = clamp(event.clientX - grab.dx, -b.x, b.x);
    const ny = clamp(event.clientY - grab.dy, b.top, b.bottom);
    const dt = Math.max(1, event.timeStamp - grab.t);
    grab.vx = ((nx - x) / dt) * 1000;
    grab.vy = ((ny - y) / dt) * 1000;
    grab.t = event.timeStamp;
    x = nx;
    y = ny;
    tilt = reduceMotion.matches ? 0 : clamp(grab.vx / 60, -18, 18);
    render();
  });

  const release = (event: PointerEvent) => {
    if (!grab || event.pointerId !== grab.id) return;
    const { vx, vy } = grab;
    grab = null;
    const b = bounds();
    if (reduceMotion.matches) {
      tilt = 0;
      render();
      return;
    }
    // Slide on a little in the direction of the throw, staying inside the room.
    const tx = clamp(x + vx * 0.12, -b.x, b.x);
    const ty = clamp(y + vy * 0.12, b.top, b.bottom);
    const spring = { type: 'spring', stiffness: 160, damping: 18 } as const;
    settling = [
      animate(x, tx, { ...spring, velocity: vx, onUpdate: (v) => ((x = v), render()) }),
      animate(y, ty, { ...spring, velocity: vy, onUpdate: (v) => ((y = v), render()) }),
      animate(tilt, 0, { ...spring, onUpdate: (v) => ((tilt = v), render()) }),
    ];
  };
  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);
}
