import { expect, test, type Page } from '@playwright/test';

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

// The Scene is the Hero's aria-hidden backdrop; its clouds are the SVGs inside it.
const scene = (page: Page) => hero(page).locator('[aria-hidden="true"]').first();
const box = async (page: Page, which: 'character' | number) => {
  const el = which === 'character' ? character(page) : scene(page).locator('svg').nth(which);
  const b = (await el.boundingBox())!;
  return { x: Math.round(b.x * 10) / 10, y: Math.round(b.y * 10) / 10 };
};
const sceneAnimations = (page: Page) =>
  scene(page).evaluate((root) =>
    document
      .getAnimations()
      .filter((a) => a.playState === 'running' && root.contains((a.effect as KeyframeEffect).target))
      .map((a) => (a.effect as KeyframeEffect).getKeyframes().flatMap((k) => Object.keys(k))),
  );
const freezeIdle = (page: Page) =>
  page.evaluate(() => document.getAnimations().forEach((a) => a instanceof CSSAnimation && a.pause()));

test.describe('idle motion', () => {
  test('the clouds drift and the Character bobs, animating only transform and opacity', async ({ page }) => {
    await page.goto('/');
    const before = [await box(page, 'character'), await box(page, 0), await box(page, 2)];
    await page.waitForTimeout(1200);
    const after = [await box(page, 'character'), await box(page, 0), await box(page, 2)];
    expect(after[0].y).not.toBe(before[0].y); // bob
    expect(after[1].x).toBeLessThan(before[1].x); // back clouds drift left
    expect(after[2].x).toBeLessThan(before[2].x); // front clouds drift left

    const props = new Set((await sceneAnimations(page)).flat());
    for (const p of ['offset', 'easing', 'composite', 'computedOffset']) props.delete(p);
    expect(props.size).toBeGreaterThan(0);
    expect([...props].filter((p) => p !== 'transform' && p !== 'opacity')).toEqual([]);
  });

  test('is off when the visitor prefers reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(await sceneAnimations(page)).toEqual([]);
    const before = await box(page, 'character');
    await page.waitForTimeout(800);
    expect(await box(page, 'character')).toEqual(before);
  });
});

test.describe('cursor parallax', () => {
  const sweep = async (page: Page) => {
    const { width, height } = page.viewportSize()!;
    await page.mouse.move(width * 0.05, height * 0.5);
    await page.waitForTimeout(900);
    const left = [await box(page, 'character'), await box(page, 0), await box(page, 2)];
    await page.mouse.move(width * 0.95, height * 0.5, { steps: 4 });
    await page.waitForTimeout(900);
    const right = [await box(page, 'character'), await box(page, 0), await box(page, 2)];
    return left.map((l, i) => right[i].x - l.x);
  };

  test('shifts the Character and the cloud layers by different amounts on pointer devices', async ({ page, isMobile }) => {
    test.skip(isMobile, 'touch devices have no cursor');
    await page.goto('/');
    await freezeIdle(page);
    const [char, back, front] = await sweep(page);
    expect(Math.abs(char)).toBeGreaterThan(10);
    expect(Math.abs(front)).toBeGreaterThan(Math.abs(back) + 10); // nearer layers move further
    expect(Math.sign(char)).not.toBe(Math.sign(front)); // the Character and the clouds part
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
