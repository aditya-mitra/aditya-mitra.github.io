import { expect, test, type Page } from '@playwright/test';

// Green Mode and the Mode Toggle: one press turns the whole page monochrome
// green and swaps the Character's expression; another press restores it.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));
  await page.goto('/');
});

const toggle = (page: Page) => page.getByRole('button', { name: 'Green Mode' });

test('the Mode Toggle is a toggle button that turns Green Mode on and off and reports its state', async ({ page }) => {
  await expect(toggle(page)).toBeVisible();
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');

  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'green');

  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('html')).not.toHaveAttribute('data-mode', 'green');
});

test('the Mode Toggle sits at the bottom centre on desktop and in the top bar on mobile', async ({ page, isMobile }) => {
  const box = (await toggle(page).boundingBox())!;
  const viewport = page.viewportSize()!;
  if (isMobile) {
    const bar = (await page.getByRole('banner').boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(bar.y - 1);
    expect(box.y + box.height).toBeLessThanOrEqual(bar.y + bar.height + 1);
  } else {
    expect(Math.abs(box.x + box.width / 2 - viewport.width / 2)).toBeLessThan(2);
    expect(viewport.height - (box.y + box.height)).toBeLessThan(20);
  }
  // It stays put while the page scrolls.
  await page.getByRole('region', { name: 'Contact' }).scrollIntoViewIfNeeded();
  await expect(toggle(page)).toBeInViewport();
});

test('the Mode Toggle works from the keyboard', async ({ page }) => {
  await toggle(page).focus();
  await page.keyboard.press('Space');
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Enter');
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
});

// Hue (0-360) and saturation (0-1) of each pixel of a screenshot shrunk 6x,
// which averages away the coloured fringes of subpixel-antialiased text.
const colours = async (page: Page) => {
  const shot = await page.screenshot({ scale: 'css' });
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width / 6);
    canvas.height = Math.round(img.height / 6);
    const ctx = canvas.getContext('2d')!;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const out: [number, number][] = [];
    for (let i = 0; i < data.length; i += 4) {
      const [r, g, b] = [data[i] / 255, data[i + 1] / 255, data[i + 2] / 255];
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      const l = (max + min) / 2;
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      let h = 0;
      if (d) h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
      out.push([(h * 60 + 360) % 360, s]);
    }
    return out;
  }, shot.toString('base64'));
};
// Share of pixels with a clear colour (not near-grey) whose hue is outside the
// green band. Text fringes leave a trace well under 1%; anything left in the
// base blue-violet (a background, a card, a Scene shape) is far more.
const offGreen = (pixels: [number, number][]) => pixels.filter(([h, s]) => s > 0.25 && (h < 90 || h > 170)).length / pixels.length;

test('Green Mode turns every Section, the Frame and the footer monochrome green', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  // The base look is blue-violet, which this check would flag.
  expect(offGreen(await colours(page))).toBeGreaterThan(0.5);

  await toggle(page).click();
  for (const name of ['Introduction', 'Work', 'About', 'Contact']) {
    await page.getByRole('region', { name }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    expect(offGreen(await colours(page)), name).toBeLessThan(0.01);
  }
  await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
  expect(offGreen(await colours(page)), 'footer').toBeLessThan(0.01);
});

test('the Character changes expression in Green Mode and back', async ({ page }) => {
  const character = page.getByRole('region', { name: 'Introduction' }).locator('img[src*="character"]:visible').first();
  const base = await character.evaluate((el: HTMLImageElement) => el.currentSrc);
  await toggle(page).click();
  await expect.poll(() => character.evaluate((el: HTMLImageElement) => el.currentSrc)).not.toBe(base);
  await expect.poll(() => character.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  await toggle(page).click();
  await expect.poll(() => character.evaluate((el: HTMLImageElement) => el.currentSrc)).toBe(base);
});
