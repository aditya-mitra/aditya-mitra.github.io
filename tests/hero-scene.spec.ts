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
    expect(await character(page).evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  });
});
