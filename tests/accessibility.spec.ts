import { expect, test, type Page } from '@playwright/test';

// Skip the Intro so every test starts on the settled Hero.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));
});

test('one h1, and heading levels never skip on the way down', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(['HEY!']);
  const levels = await page
    .getByRole('heading')
    .evaluateAll((els) => els.map((el) => Number(el.getAttribute('aria-level') ?? el.tagName.slice(1))));
  expect(levels[0]).toBe(1);
  levels.forEach((level, i) => {
    if (i > 0) expect(level, `heading ${i + 1}`).toBeLessThanOrEqual(levels[i - 1] + 1);
  });
});

test('landmarks: a banner, a main with four labelled Sections, and a footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  const regions = page.getByRole('region');
  await expect(regions).toHaveCount(4);
  for (const name of await regions.evaluateAll((els) => els.map((el) => el.getAttribute('aria-label')))) {
    expect(name).toBeTruthy();
  }
});

test('assistive technology hears content only: no Scene, picture or Toy is in the accessibility tree', async ({ page }) => {
  await page.goto('/');
  // Load every Scene and Toy first.
  for (const name of ['Work', 'About', 'Contact']) {
    await page.getByRole('region', { name, exact: true }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  const tree = await page.locator('body').ariaSnapshot();
  expect(tree).not.toMatch(/^\s*- (img|graphics-|figure|application|slider)/m);
  // The keyboard Toy's keys stay out of the tree too.
  expect(tree).not.toMatch(/- \w+ "(Esc|Tab|Caps|Shift|Enter|Q|W)"/);
});

// Where focus is, and whether a visitor can see it.
const focusStop = (page: Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const cx = Math.min(Math.max(rect.left + rect.width / 2, 1), innerWidth - 1);
    const cy = Math.min(Math.max(rect.top + Math.min(rect.height / 2, 20), 1), innerHeight - 1);
    const hit = document.elementFromPoint(cx, cy);
    return {
      name: (el.getAttribute('aria-label') ?? el.textContent ?? '').trim().replace(/\s+/g, ' ').slice(0, 40),
      fixed: !!el.closest('header') || style.position === 'fixed',
      // Layout position on the page, unaffected by any animation in flight.
      pageY: (() => {
        let y = 0;
        for (let e: HTMLElement | null = el; e; e = e.offsetParent as HTMLElement | null) y += e.offsetTop;
        return Math.round(y);
      })(),
      outline: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
      onScreen: rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
      uncovered: !!hit && (el === hit || el.contains(hit)),
      isBody: el === document.body,
    };
  });

test('tabbing visits every control from top to bottom, each with a visible, uncovered focus indicator', async ({ page }) => {
  await page.goto('/');
  const stops: Awaited<ReturnType<typeof focusStop>>[] = [];
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab');
    await page.waitForTimeout(700); // let the Section reveal it scrolls into finish
    const stop = await focusStop(page);
    if (stop.isBody || (i > 0 && stop.name === stops[0].name)) break;
    stops.push(stop);
  }
  const names = stops.map((s) => s.name);
  // Frame, then a Work Card's link and the carousel buttons, then the five contact links.
  expect(names.length, names.join(' | ')).toBeGreaterThanOrEqual(10);
  expect(names.at(-1), names.join(' | ')).toMatch(/bluesky/i);

  for (const stop of stops) {
    expect(stop, `${stop.name} shows focus`).toMatchObject({ outline: true, onScreen: true, uncovered: true });
  }
  const inFlow = stops.filter((s) => !s.fixed).map((s) => s.pageY);
  expect(inFlow, names.join(' | ')).toEqual([...inFlow].sort((a, b) => a - b));
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('all content is readable and nothing covers it', async ({ page }) => {
    await page.goto('/');
    const problems = await page.evaluate(() => {
      const out: string[] = [];
      const texts = [...document.querySelectorAll('main *, footer *')].filter(
        (el) =>
          !el.closest('[aria-hidden="true"], noscript, script, style') &&
          // Screen-reader-only text is clipped to nothing on purpose.
          getComputedStyle(el).clipPath === 'none' &&
          // Left out of the page altogether (the carousel controls without JavaScript).
          el.getClientRects().length > 0 &&
          [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && n.textContent!.trim()),
      ) as HTMLElement[];
      for (const el of texts) {
        el.scrollIntoView({ block: 'center', behavior: 'instant' });
        const r = el.getBoundingClientRect();
        let opacity = 1;
        for (let e: Element | null = el; e; e = e.parentElement) opacity *= Number(getComputedStyle(e).opacity);
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        const label = el.textContent!.trim().slice(0, 30);
        if (r.width < 2 || r.height < 2) out.push(`${label}: collapsed`);
        else if (opacity < 1 || getComputedStyle(el).visibility !== 'visible') out.push(`${label}: not shown`);
        else if (!hit || !(el.contains(hit) || hit.contains(el))) out.push(`${label}: covered by ${hit?.outerHTML.slice(0, 60)}`);
      }
      return { checked: texts.length, out };
    });
    expect(problems.checked).toBeGreaterThan(40);
    expect(problems.out).toEqual([]);
  });
});
