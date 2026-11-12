// Small pieces several features share.

/** Matches while the visitor prefers reduced motion; read `.matches` when it matters. */
export const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

/** Runs `load` once, when `element` comes within `margin` of the viewport. */
export function loadWhenNear(element: Element, load: () => unknown, margin = '50% 0px') {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      load();
    },
    { rootMargin: margin },
  );
  observer.observe(element);
}
