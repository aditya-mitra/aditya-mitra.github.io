import { expect, test, type Page } from '@playwright/test';

// The Intro is the terminal-style overlay a visitor sees on first arrival.
const command = (page: Page) => page.getByText('> aditya --mitra');
const greeting = (page: Page) => page.getByRole('heading', { level: 1 });

/** Colour of the pixel in the middle of the viewport, as the visitor sees it. */
async function centrePixel(page: Page) {
  const shot = await page.screenshot();
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    return Array.from(ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data.slice(0, 3));
  }, shot.toString('base64'));
}

test('on first arrival the Intro covers the page, with the Hero already in it, then clears', async ({ page }) => {
  await page.goto('/');
  await expect(command(page)).toBeVisible();
  await expect(greeting(page)).toHaveText('HEY!'); // the Hero is beneath the overlay from the start

  await expect(command(page)).toBeHidden({ timeout: 6000 });
  await expect(greeting(page)).toBeVisible();
  expect(await centrePixel(page)).not.toEqual([0, 0, 0]);
});

test('the Intro is on screen before anything else: no flash of uncovered Hero', async ({ page }) => {
  // Hold back the script that plays the Intro; the overlay must be up without it.
  await page.route(/\.js(\?|$)/, () => {});
  await page.goto('/', { waitUntil: 'commit' });
  await expect(command(page)).toBeVisible();
  const viewport = page.viewportSize()!;
  const box = (await command(page).boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
  expect(await centrePixel(page)).toEqual([0, 0, 0]);
});

test('the Intro lasts about two seconds', async ({ page }) => {
  await page.goto('/');
  const start = Date.now();
  await expect(command(page)).toBeVisible();
  await expect(command(page)).toBeHidden({ timeout: 6000 });
  const elapsed = Date.now() - start;
  expect(elapsed).toBeGreaterThan(1200);
  expect(elapsed).toBeLessThan(4000);
});

test('the Intro is skipped on a second load in the same session', async ({ page }) => {
  await page.goto('/');
  await expect(command(page)).toBeVisible();

  await page.reload();
  await expect(greeting(page)).toBeVisible();
  await expect(command(page)).toBeHidden();
  expect(await centrePixel(page)).not.toEqual([0, 0, 0]);
});

test('the Intro never blocks the visitor: any input ends it at once', async ({ page }) => {
  await page.goto('/');
  await expect(command(page)).toBeVisible();
  await page.getByRole('banner').getByRole('link', { name: "Let's talk" }).focus();
  await page.keyboard.press('Shift+Tab');
  await expect(command(page)).toBeHidden({ timeout: 500 });
});

test('the page can be clicked while the Intro plays', async ({ page }) => {
  await page.goto('/');
  await expect(command(page)).toBeVisible();
  await page.getByRole('region', { name: 'Contact' }).scrollIntoViewIfNeeded();
  await page.getByRole('banner').getByRole('link', { name: /Aditya Mitra/ }).click({ timeout: 1000 });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(command(page)).toBeHidden({ timeout: 500 });
});

test.describe('when the visitor prefers reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('the Intro is skipped and the page shows immediately', async ({ page }) => {
    await page.goto('/');
    await expect(greeting(page)).toBeVisible();
    await expect(command(page)).toBeHidden();
    expect(await centrePixel(page)).not.toEqual([0, 0, 0]);
  });
});

test.describe('with JavaScript disabled', () => {
  test.use({ javaScriptEnabled: false });

  test('no Intro covers the page', async ({ page }) => {
    await page.goto('/');
    await expect(greeting(page)).toBeVisible();
    await expect(command(page)).toBeHidden();
    const shot = await page.screenshot();
    // Without scripts we cannot decode in the page; the overlay is all black, the page is not.
    const blank = await page.context().browser()!.newPage();
    const colours = await blank.evaluate(async (b64) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      return Array.from(ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data.slice(0, 3));
    }, shot.toString('base64'));
    await blank.close();
    expect(colours).not.toEqual([0, 0, 0]);
  });
});
