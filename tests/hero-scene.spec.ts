import { expect, test, type Page } from '@playwright/test';
import { capture, changedPixels, colourShift } from './support/pixels';

// The Hero Scene: the Character in front of layered clouds, idle motion and cursor parallax.

const hero = (page: Page) => page.getByRole('region', { name: 'Introduction' });
const character = (page: Page) => hero(page).locator('img[src*="character"]:visible').first();

test.describe('the Character', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('stands in the Hero, served as a modern image format with explicit dimensions', async ({ page }) => {
    const img = character(page);
    await expect(img).toBeVisible();
    expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    expect(await img.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/\.(avif|webp)(\?|$)/);
    expect(Number(await img.getAttribute('width'))).toBeGreaterThan(0);
    expect(Number(await img.getAttribute('height'))).toBeGreaterThan(0);
    const sources = await hero(page).locator('picture source').evaluateAll((els) => els.map((s) => s.getAttribute('type')));
    expect(sources).toEqual(expect.arrayContaining(['image/avif', 'image/webp']));
  });

  test('is decoration, hidden from assistive technology', async ({ page }) => {
    const tree = await hero(page).ariaSnapshot();
    expect(tree).not.toMatch(/img|graphics/i);
    expect(tree).toContain('HEY!');
  });

  test('loading the Hero shifts no layout', async ({ page }) => {
    const shift = await page.evaluate(
      () =>
        new Promise<number>((resolve) => {
          let total = 0;
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
              if (!entry.hadRecentInput) total += entry.value;
            }
          }).observe({ type: 'layout-shift', buffered: true });
          setTimeout(() => resolve(total), 1000);
        }),
    );
    expect(shift).toBeLessThan(0.01);
  });

  test('changes expression in Green Mode', async ({ page }) => {
    const before = await character(page).evaluate((el: HTMLImageElement) => el.currentSrc);
    await page.evaluate(() => document.documentElement.setAttribute('data-mode', 'green'));
    await expect.poll(() => character(page).evaluate((el: HTMLImageElement) => el.currentSrc)).not.toBe(before);
    await expect(character(page)).toBeVisible();
    // The Green Mode expression is lazy: it is fetched when first shown.
    await expect.poll(() => character(page).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  });
});

// The Scene as the visitor sees it: the Character picture, the far clouds
// (the darker shade, --field-lo) and the near clouds (the lighter, --field-hi).
const skipIntro = (page: Page) => page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));
const heroShot = async (page: Page) => capture(page, (await hero(page).boundingBox())!);
const characterBox = async (page: Page) => (await character(page).boundingBox())!;
const around = (b: { x: number; y: number; width: number; height: number }, pad = 24) => ({
  x: b.x - pad,
  y: b.y - pad,
  width: b.width + pad * 2,
  height: b.height + pad * 2,
});

/** How far the Character and the far and near clouds move, in pixels rightwards, while `act` runs. */
const movement = async (page: Page, act: () => Promise<unknown>) => {
  const [c0, a] = [await characterBox(page), await heroShot(page)];
  await act();
  const [c1, b] = [await characterBox(page), await heroShot(page)];
  const ignore = [around(c0), around(c1)]; // the Character moves on its own
  return {
    character: { x: Math.round(c1.x - c0.x), y: Math.round(c1.y - c0.y) },
    far: await colourShift(page, a, b, 'var(--field-lo)', ignore),
    near: await colourShift(page, a, b, 'var(--field-hi)', ignore),
  };
};

/** Keyframed properties of the animations running in the Hero. */
const heroAnimations = (page: Page) =>
  hero(page).evaluate((root) =>
    document
      .getAnimations()
      .filter((a) => a.playState === 'running' && root.contains((a.effect as KeyframeEffect).target))
      .map((a) => (a.effect as KeyframeEffect).getKeyframes().flatMap((k) => Object.keys(k))),
  );
const freezeIdle = (page: Page) =>
  page.evaluate(() => document.getAnimations().forEach((a) => a instanceof CSSAnimation && a.pause()));

test.describe('idle motion', () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test('the clouds drift and the Character bobs, animating only transform and opacity', async ({ page }) => {
    await page.goto('/');
    await expect(character(page)).toBeVisible();
    const moved = await movement(page, () => page.waitForTimeout(1200));
    expect(moved.character.y).not.toBe(0); // bob
    expect(moved.far).toBeLessThan(0); // far clouds drift left
    expect(moved.near).toBeLessThan(0); // near clouds drift left

    const props = new Set((await heroAnimations(page)).flat());
    for (const p of ['offset', 'easing', 'composite', 'computedOffset']) props.delete(p);
    expect(props.size).toBeGreaterThan(0);
    expect([...props].filter((p) => p !== 'transform' && p !== 'opacity')).toEqual([]);
  });

  test('is off when the visitor prefers reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(character(page)).toBeVisible();
    expect(await heroAnimations(page)).toEqual([]);
    const before = await heroShot(page);
    await page.waitForTimeout(800);
    expect(await changedPixels(page, before, await heroShot(page))).toBe(0);
  });
});

test.describe('cursor parallax', () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  const sweep = async (page: Page) => {
    const { width, height } = page.viewportSize()!;
    await page.mouse.move(width * 0.05, height * 0.5);
    await page.waitForTimeout(900);
    const moved = await movement(page, async () => {
      await page.mouse.move(width * 0.95, height * 0.5, { steps: 4 });
      await page.waitForTimeout(900);
    });
    return [moved.character.x, moved.far, moved.near];
  };

  test('shifts the Character and the cloud layers by different amounts on pointer devices', async ({ page, isMobile }) => {
    test.skip(isMobile, 'touch devices have no cursor');
    await page.goto('/');
    await freezeIdle(page);
    const [char, far, near] = await sweep(page);
    expect(Math.abs(char)).toBeGreaterThan(10);
    expect(Math.abs(near!)).toBeGreaterThan(Math.abs(far!) + 10); // nearer layers move further
    expect(Math.sign(char)).not.toBe(Math.sign(near!)); // the Character and the clouds part
  });

  test('stays still on touch devices', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'desktop has a cursor');
    await page.goto('/');
    await freezeIdle(page);
    expect(await sweep(page)).toEqual([0, 0, 0]);
  });

  test('stays still under reduced motion', async ({ page, isMobile }) => {
    test.skip(isMobile, 'touch devices have no cursor');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(await sweep(page)).toEqual([0, 0, 0]);
  });
});

test.describe('layout', () => {
  test('on mobile the Character stands above the greeting; on desktop beside it', async ({ page, isMobile }) => {
    await page.goto('/');
    await freezeIdle(page);
    const img = (await character(page).boundingBox())!;
    const greeting = (await page.getByRole('heading', { level: 1 }).boundingBox())!;
    const { width } = page.viewportSize()!;
    if (isMobile) {
      expect(img.y + img.height * 0.6).toBeLessThan(greeting.y);
      expect(Math.abs(img.x + img.width / 2 - width / 2)).toBeLessThan(width * 0.1);
    } else {
      expect(img.x).toBeGreaterThan(greeting.x + greeting.width);
      expect(img.y).toBeLessThan(greeting.y);
    }
  });
});
