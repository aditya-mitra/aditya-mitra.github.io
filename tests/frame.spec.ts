import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the Frame shows the Monogram, which takes the visitor back to the top', async ({ page }) => {
  const monogram = page.getByRole('banner').getByRole('link', { name: /Aditya Mitra/ });
  await expect(monogram).toBeVisible();

  await page.getByRole('region', { name: 'Contact' }).scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  await expect(monogram).toBeInViewport(); // the top bar is fixed

  await monogram.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});

test('the Frame carries a "Let\'s talk" cell that starts an email', async ({ page }) => {
  const cell = page.getByRole('banner').getByRole('link', { name: "Let's talk" });
  await expect(cell).toBeVisible();
  await expect(cell).toHaveAttribute('href', 'mailto:temporaray.ot831@aleeas.com');

  await page.getByRole('region', { name: 'Contact' }).scrollIntoViewIfNeeded();
  await expect(cell).toBeInViewport();
});

test('the Frame carries no section links', async ({ page }) => {
  const banner = page.getByRole('banner');
  await expect(banner.getByRole('link')).toHaveCount(2); // Monogram and "Let's talk" only
  await expect(banner.getByRole('navigation')).toHaveCount(0);
  for (const name of ['Work', 'About', 'Contact', 'Services', 'Lab']) {
    await expect(banner.getByRole('link', { name, exact: true })).toHaveCount(0);
  }
});

test('the Frame draws a black border around the viewport', async ({ page }) => {
  const viewport = page.viewportSize()!;
  const edges = [
    [1, viewport.height / 2],
    [viewport.width - 2, viewport.height / 2],
    [viewport.width / 2, 1],
    [viewport.width / 2, viewport.height - 2],
  ];
  const shot = await page.screenshot();
  const pixels = await page.evaluate(
    async ([b64, points]) => {
      const img = new Image();
      img.src = `data:image/png;base64,${b64}`;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const scale = img.width / window.innerWidth;
      return (points as number[][]).map(([x, y]) => Array.from(ctx.getImageData(x * scale, y * scale, 1, 1).data.slice(0, 3)));
    },
    [shot.toString('base64'), edges] as const,
  );
  expect(pixels).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
});
