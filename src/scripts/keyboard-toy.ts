// The keyboard Toy in the Contact Scene. Loaded lazily by ContactScene.astro
// when the Section nears the viewport. Keys press under the pointer, and under
// the visitor's own keyboard while the Contact Section is on screen; what they
// type lands in the readout. It never prevents default behaviour, never takes
// focus, and ignores typing in form fields or with Ctrl, Alt or Meta held.

import { reduceMotion } from './shared';

const board = document.querySelector<SVGSVGElement>('[data-keyboard]');
const readout = document.querySelector<HTMLElement>('[data-keyboard-readout]');
const section = board?.closest('section');

if (board && readout && section) {
  const text = readout.querySelector<HTMLElement>('[data-testid="keyboard-readout"]')!;
  const line = text.parentElement!;
  const keyFor = (code: string) => board.querySelector<SVGGElement>(`[data-code="${code}"]`);
  let typed = '';
  let shift = false; // one-shot Shift from a clicked Shift key
  let caps = false;
  let inView = false;
  let autoTyping: number | undefined;

  const render = () => {
    text.textContent = typed;
    // Keep the newest characters in view: drop the oldest until the line fits.
    while (typed && line.scrollWidth > line.clientWidth) {
      typed = typed.slice(1);
      text.textContent = typed;
    }
  };

  const write = (input: string) => {
    if (input === 'Backspace') typed = typed.slice(0, -1);
    else if (input === 'Enter' || input === 'Escape') typed = '';
    else typed += input;
    render();
  };

  const down = (key: SVGGElement | null) => key?.setAttribute('data-down', '');
  const up = (key: SVGGElement | null) => key?.removeAttribute('data-down');
  const tap = (key: SVGGElement | null, ms = 110) => {
    down(key);
    setTimeout(() => up(key), ms);
  };

  const stopAutoTyping = () => clearTimeout(autoTyping);

  // A clicked or tapped key: work out its character from the latched modifiers.
  const press = (key: SVGGElement) => {
    const code = key.dataset.code!;
    if (code.startsWith('Shift')) return void (shift = !shift);
    if (code === 'CapsLock') return void (caps = !caps);
    if (code === 'Backspace' || code === 'Enter' || code === 'Escape') return write(code);
    const { char, shift: shifted } = key.dataset;
    if (char === undefined) return;
    const upper = shift !== (caps && /^[a-z]$/.test(char));
    write(upper ? shifted! : char);
    shift = false;
  };

  board.addEventListener('pointerdown', (event) => {
    const key = (event.target as Element).closest<SVGGElement>('[data-code]');
    if (!key) return;
    stopAutoTyping();
    down(key);
    press(key);
    const release = () => {
      up(key);
      removeEventListener('pointerup', release);
      removeEventListener('pointercancel', release);
    };
    addEventListener('pointerup', release);
    addEventListener('pointercancel', release);
  });

  const isField = (target: EventTarget | null) =>
    target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));

  addEventListener('keydown', (event) => {
    if (!inView || event.ctrlKey || event.metaKey || event.altKey || isField(event.target)) return;
    stopAutoTyping();
    down(keyFor(event.code));
    if (event.key.length === 1 || ['Backspace', 'Enter', 'Escape'].includes(event.key)) write(event.key);
  });
  addEventListener('keyup', (event) => up(keyFor(event.code)));
  addEventListener('blur', () => board.querySelectorAll('[data-down]').forEach((k) => k.removeAttribute('data-down')));

  new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0.25 }).observe(section);

  readout.setAttribute('data-ready', '');

  // On first view the keyboard types its message by itself, unless the visitor
  // starts typing first. Under reduced motion the message simply appears.
  const message = readout.dataset.message ?? '';
  const codeOf = (c: string) =>
    [...board.querySelectorAll<SVGGElement>('[data-code]')].find(
      (k) => k.dataset.char === c.toLowerCase() || k.dataset.shift === c,
    ) ?? null;
  if (reduceMotion.matches) write(message);
  else {
    let i = 0;
    const next = () => {
      if (i >= message.length) return;
      const c = message[i++];
      tap(codeOf(c));
      write(c);
      autoTyping = window.setTimeout(next, 90 + Math.random() * 110);
    };
    autoTyping = window.setTimeout(next, 500);
  }
}
