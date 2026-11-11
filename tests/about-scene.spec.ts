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
