import { expect, test, type Page } from '@playwright/test';

// Skip the Intro so every test starts on the settled Hero.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));
});

// Scroll down the whole page a screen at a time, so every Section has been in view.
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const step = page.viewportSize()!.height * 0.6;
  for (let y = 0; y <= height; y += step) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1200);
}

// How opaque an element looks, including every ancestor's opacity.
const seenOpacity = (page: Page, selector: Parameters<Page['getByRole']>) =>
  page.getByRole(...selector).evaluate((el) => {
    let o = 1;
    for (let e: Element | null = el; e; e = e.parentElement) o *= Number(getComputedStyle(e).opacity);
    return o;
  });

const belowFold: Parameters<Page['getByRole']>[] = [
  ['heading', { name: 'About', exact: true }],
  ['link', { name: /linkedin/i }],
];

test.describe('Section reveals', () => {
  test('content further down is held back, then rises into view as the visitor scrolls to it', async ({ page }) => {
    await page.goto('/');
    for (const target of belowFold) expect(await seenOpacity(page, target)).toBeLessThan(0.5);

    await scrollThrough(page);
    for (const target of belowFold) expect(await seenOpacity(page, target)).toBe(1);
  });

  test('what is on screen at load never blinks out', async ({ page }) => {
    await page.goto('/');
    expect(await seenOpacity(page, ['heading', { name: 'HEY!' }])).toBe(1);
  });

  test('a reveal hands back hover and press: a revealed link still lifts under the pointer', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover needs a pointer');
    await page.goto('/');
    await scrollThrough(page);
    const email = page.getByRole('link', { name: /temporaray/ });
    const top = async () => (await email.boundingBox())!.y;
    await email.scrollIntoViewIfNeeded();
    await page.mouse.move(2, 2);
    await page.waitForTimeout(300);
    const resting = await top();
    await email.hover();
    await page.waitForTimeout(300);
    expect(await top()).toBeLessThan(resting);
  });
});

test.describe('under reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('nothing is held back: content further down is fully shown before scrolling', async ({ page }) => {
    await page.goto('/');
    for (const target of belowFold) expect(await seenOpacity(page, target)).toBe(1);
  });

  test('no idle loop, parallax or scroll-linked animation runs anywhere on the page', async ({ page }) => {
    await page.goto('/');
    await scrollThrough(page);
    await page.mouse.move(200, 200);
    await page.mouse.move(900, 600);
    const running = await page.evaluate(() =>
      document
        .getAnimations()
        .filter((a) => a.playState === 'running')
        .map((a) => {
          const target = (a.effect as KeyframeEffect | null)?.target as Element | null;
          return `${(a as CSSAnimation).animationName ?? 'script'} on ${target?.getAttribute('class') ?? target?.tagName}`;
        }),
    );
    expect(running).toEqual([]);

    // Nothing drifts on its own either: two screenshots a second apart match.
    for (const name of ['Introduction', 'Work', 'About', 'Contact']) {
      const section = page.getByRole('region', { name, exact: true });
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const before = await page.screenshot();
      await page.waitForTimeout(1000);
      expect((await page.screenshot()).equals(before), `${name} is still`).toBe(true);
    }
  });
});

test.describe('hover and press feedback', () => {
  // Everything a visitor can point at or press, except the skip link (keyboard only).
  const controls = (page: Page) =>
    page.locator('a[href]:visible, button:visible').filter({ hasNotText: /skip to content/i });

  // A fingerprint of how an element and its contents look.
  const look = (page: Page, i: number) =>
    controls(page)
      .nth(i)
      .evaluate((el) =>
        [el, ...el.querySelectorAll('*')]
          .map((e) => {
            const s = getComputedStyle(e);
            return [s.transform, s.translate, s.scale, s.backgroundColor, s.color, s.boxShadow, s.opacity].join('|');
          })
          .join(';'),
      );

  test('every link and button changes when pointed at and when pressed', async ({ page, isMobile }) => {
    test.skip(isMobile, 'hover needs a pointer; press is checked on desktop where both apply');
    await page.goto('/');
    await scrollThrough(page);
    const count = await controls(page).count();
    expect(count).toBeGreaterThan(8);

    for (let i = 0; i < count; i++) {
      const control = controls(page).nth(i);
      const name = (await control.getAttribute('aria-label')) ?? (await control.innerText()).trim();
      await control.scrollIntoViewIfNeeded();
      await page.mouse.move(2, 2);
      await page.waitForTimeout(250);
      const rest = await look(page, i);

      const box = (await control.boundingBox())!;
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.waitForTimeout(250);
      const hovered = await look(page, i);
      expect(hovered, `${name} answers hover`).not.toBe(rest);

      await page.mouse.down();
      await page.waitForTimeout(250);
      const pressed = await look(page, i);
      await page.mouse.move(2, 2);
      await page.mouse.up();
      expect(pressed, `${name} answers press`).not.toBe(hovered);
    }
  });
});
