import { expect, test, type Page } from '@playwright/test';

// The About Scene and its Toy. How the tunnel and the room look is judged by eye;
// these tests cover what a visitor (or a slow phone) can observe from outside.

const about = (page: Page) => page.getByRole('region', { name: 'About' });

const scripts = (page: Page) => {
  const urls: string[] = [];
  page.on('request', (request) => {
    if (request.resourceType() === 'script') urls.push(request.url());
  });
  return urls;
};

test('the Toy loads only when the visitor scrolls near the About Section', async ({ page }) => {
  const requested = scripts(page);
  await page.goto('/', { waitUntil: 'networkidle' });
  const atLoad = requested.length;

  await about(page).scrollIntoViewIfNeeded();
  await expect.poll(() => requested.length).toBeGreaterThan(atLoad);
});

// The Toy is decoration and hidden from assistive technology, so it has no role to query;
// `data-toy` marks the thing a visitor grabs.
test('the Toy can be dragged around the room with a mouse or a finger', async ({ page, isMobile }) => {
  await page.goto('/');
  await about(page).scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollTo({ top: document.getElementById('about')!.offsetTop, behavior: 'instant' }));
  const toy = page.locator('[data-toy]');
  await expect(toy).toBeVisible();
  const centre = async () => {
    const box = (await toy.boundingBox())!;
    return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
  };
  const from = await centre();
  const to = { x: from.x - 80, y: from.y - 40 };

  // Retried, because the Toy's code arrives lazily just after the Section comes into view.
  await expect(async () => {
    if (isMobile) {
      const cdp = await page.context().newCDPSession(page);
      const touch = (type: string, points: { x: number; y: number }[]) =>
        cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points });
      await touch('touchStart', [from]);
      for (let i = 1; i <= 8; i++)
        await touch('touchMove', [{ x: from.x + ((to.x - from.x) * i) / 8, y: from.y + ((to.y - from.y) * i) / 8 }]);
      await touch('touchEnd', []);
    } else {
      await page.mouse.move(from.x, from.y);
      await page.mouse.down();
      await page.mouse.move(to.x, to.y, { steps: 8 });
      await page.mouse.up();
    }
    const now = await centre();
    expect(Math.hypot(now.x - from.x, now.y - from.y)).toBeGreaterThan(40);
  }).toPass();
  // Dragging the Toy does not scroll the page.
  expect(await page.evaluate(() => window.scrollY)).toBe(
    await page.evaluate(() => document.getElementById('about')!.offsetTop),
  );
});
