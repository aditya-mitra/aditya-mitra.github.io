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

test('on desktop the Frame carries Work, About and Contact links beside "Let\'s talk", each jumping to its Section', async ({ page }, info) => {
  const nav = page.getByRole('banner').getByRole('navigation', { name: 'Sections' });
  if (info.project.name === 'mobile') {
    await expect(nav).toBeHidden();
    return;
  }
  const letsTalk = page.getByRole('banner').getByRole('link', { name: "Let's talk" });
  const links = ['Work', 'About', 'Contact'].map((name) => nav.getByRole('link', { name, exact: true }));
  const boxes = [];
  for (const link of [...links, letsTalk]) {
    await expect(link).toBeVisible();
    boxes.push((await link.boundingBox())!);
  }
  for (let i = 1; i < boxes.length; i++) {
    expect(boxes[i].x).toBeGreaterThan(boxes[i - 1].x); // left to right, ending with "Let's talk"
    expect(Math.abs(boxes[i].y - boxes[0].y)).toBeLessThan(2);
  }

  for (const [i, name] of ['Work', 'About', 'Contact'].entries()) {
    await links[i].click();
    await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
    await expect(page.getByRole('region', { name })).toBeInViewport();
  }
});

test('the Frame carries no Services or Lab links', async ({ page }) => {
  const banner = page.getByRole('banner');
  for (const name of ['Services', 'Lab']) {
    await expect(banner.getByRole('link', { name, exact: true })).toHaveCount(0);
  }
});

test('in-page links glide to their target rather than jump', async ({ page }) => {
  await page.getByRole('region', { name: 'Contact' }).scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
  const start = await page.evaluate(() => window.scrollY);

  // Record scrollY every frame from the click until the page reaches the top.
  const path = page.evaluate(
    () =>
      new Promise<number[]>((resolve) => {
        const seen: number[] = [];
        const tick = () => {
          seen.push(window.scrollY);
          if (window.scrollY === 0 || seen.length > 300) resolve(seen);
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
  );
  await page.getByRole('banner').getByRole('link', { name: /Aditya Mitra/ }).click();
  const seen = await path;
  expect(seen.at(-1)).toBe(0);
  expect(seen.filter((y) => y > 0 && y < start).length).toBeGreaterThan(2); // passed through the page on the way
});

test.describe('when the visitor prefers reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('in-page links jump straight to their target', async ({ page }) => {
    await page.getByRole('region', { name: 'Contact' }).scrollIntoViewIfNeeded();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);

    await page.getByRole('banner').getByRole('link', { name: /Aditya Mitra/ }).click();
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });
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
