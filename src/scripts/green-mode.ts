// The Mode Toggle: switches Green Mode, which is data-mode="green" on <html>.
// The switch cross-fades the whole page through a view transition (opacity
// only), or happens at once where that is unsupported or motion is reduced.

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');

// Images that only appear in Green Mode (the Character's second expression)
// are lazy; give those now on screen a moment to arrive so the cross-fade
// lands on them rather than on a gap.
const settle = () => {
  const pending = [...document.images].filter((img) => {
    if (img.complete || !img.checkVisibility()) return false;
    const r = img.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  });
  if (!pending.length) return;
  const wait = new Promise((resolve) => setTimeout(resolve, 400));
  return Promise.race([wait, Promise.all(pending.map((img) => img.decode().catch(() => {})))]);
};

for (const button of document.querySelectorAll<HTMLButtonElement>('[data-mode-toggle]')) {
  button.addEventListener('click', () => {
    const on = button.getAttribute('aria-pressed') !== 'true';
    const apply = () => {
      if (on) root.dataset.mode = 'green';
      else delete root.dataset.mode;
      button.setAttribute('aria-pressed', String(on));
      return settle();
    };
    if (document.startViewTransition && !reduced.matches) document.startViewTransition(apply);
    else apply();
  });
}
