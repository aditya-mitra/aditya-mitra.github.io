import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
});

test('the greeting is set in self-hosted Gasoek One and labels in Alumni Sans', async ({ page }) => {
  const loaded = await page.evaluate(() =>
    [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, '')),
  );
  expect(loaded).toEqual(expect.arrayContaining(['Gasoek One', 'Alumni Sans']));

  const family = (name: string | RegExp, role: 'heading' | 'link') =>
    page.getByRole(role, { name }).first().evaluate((el) => getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, ''));
  expect(await family('HEY!', 'heading')).toBe('Gasoek One');
  expect(await family("Let's talk", 'link')).toBe('Alumni Sans');
});

test('web fonts swap in rather than block text, and the Hero fonts are preloaded', async ({ page, request }) => {
  const displays = await page.evaluate(() => [...document.fonts].map((f) => f.display));
  expect(displays.length).toBeGreaterThan(0);
  expect(new Set(displays)).toEqual(new Set(['swap']));

  const preloads = await page.locator('link[rel="preload"][as="font"]').evaluateAll((links) => links.map((l) => (l as HTMLLinkElement).href));
  expect(preloads.some((href) => /gasoek/i.test(href))).toBe(true);
  for (const href of preloads) {
    expect(new URL(href).origin).toBe(new URL(page.url()).origin);
    expect((await request.get(href)).status(), href).toBe(200);
  }
});

test('type scales fluidly with the viewport', async ({ page }) => {
  const size = () => page.getByRole('heading', { level: 1 }).evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
  const before = await size();
  const viewport = page.viewportSize()!;
  await page.setViewportSize({ width: Math.round(viewport.width * 0.8), height: viewport.height });
  expect(await size()).toBeLessThan(before);
});

test('the greeting fits inside the viewport width', async ({ page }) => {
  const box = (await page.getByRole('heading', { level: 1 }).boundingBox())!;
  const textWidth = await page.getByRole('heading', { level: 1 }).evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    return range.getBoundingClientRect().right;
  });
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(textWidth).toBeLessThanOrEqual(page.viewportSize()!.width);
});
