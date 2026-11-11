import { expect, test } from '@playwright/test';

// What a link preview, a search engine and a browser tab learn about the page.

const SITE = 'https://aditya-mitra.github.io/';

const meta = (page: import('@playwright/test').Page, key: string) =>
  page.locator(`meta[property="${key}"], meta[name="${key}"]`).getAttribute('content');

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the page has a title, a description and the canonical URL', async ({ page }) => {
  await expect(page).toHaveTitle(/Aditya Mitra/);
  const description = await meta(page, 'description');
  expect(description).toContain('Aditya Mitra');
  expect(description!.length).toBeGreaterThanOrEqual(50);
  expect(description!.length).toBeLessThanOrEqual(160);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', SITE);
});

test('a shared link previews with a title, description and large image', async ({ page }) => {
  const title = await page.title();
  const description = await meta(page, 'description');

  expect(await meta(page, 'og:type')).toBe('profile');
  expect(await meta(page, 'og:url')).toBe(SITE);
  expect(await meta(page, 'og:site_name')).toBe('Aditya Mitra');
  expect(await meta(page, 'og:title')).toBe(title);
  expect(await meta(page, 'og:description')).toBe(description);
  expect(await meta(page, 'og:image:alt')).toContain('Aditya Mitra');

  expect(await meta(page, 'twitter:card')).toBe('summary_large_image');
  expect(await meta(page, 'twitter:title')).toBe(title);
  expect(await meta(page, 'twitter:description')).toBe(description);
  expect(await meta(page, 'twitter:image')).toBe(await meta(page, 'og:image'));
});

test('the share image is a 1200x630 card on the public site, not the raw Avatar', async ({ page, request }) => {
  const url = await meta(page, 'og:image');
  // Previews need an absolute URL on the published origin.
  expect(url).toMatch(/^https:\/\/aditya-mitra\.github\.io\/.+\.png$/);
  expect(url).not.toContain('pic.webp');

  const response = await request.get(new URL(url!).pathname);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('image/png');

  // A PNG states its size in the IHDR chunk: width at byte 16, height at byte 20.
  const png = await response.body();
  expect(png.subarray(1, 4).toString('latin1')).toBe('PNG');
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
  expect(await meta(page, 'og:image:width')).toBe('1200');
  expect(await meta(page, 'og:image:height')).toBe('630');
  expect(await meta(page, 'og:image:type')).toBe('image/png');
});

test('structured data describes Aditya as a Person, without a phone number', async ({ page }) => {
  const blocks = page.locator('script[type="application/ld+json"]');
  await expect(blocks).toHaveCount(1);
  const raw = (await blocks.textContent())!;
  const data = JSON.parse(raw);

  expect(data['@context']).toBe('https://schema.org');
  expect(data['@type']).toBe('Person');
  expect(data.name).toBe('Aditya Mitra');
  expect(data.jobTitle).toBe('Founding Engineer');
  expect(data.url).toBe(SITE);
  expect(data.image).toBe(await meta(page, 'og:image'));
  expect(data.sameAs).toEqual(['https://www.linkedin.com/in/aditya--mitra/', 'https://github.com/aditya-mitra']);

  expect(data).not.toHaveProperty('telephone');
  expect(raw).not.toMatch(/telephone|tel:/i);
});

test('the browser tab shows the Monogram', async ({ page, request }) => {
  const icon = page.locator('link[rel="icon"][type="image/svg+xml"]');
  await expect(icon).toHaveCount(1);
  const response = await request.get((await icon.getAttribute('href'))!);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toBe('image/svg+xml');

  // The favicon draws the same outline as the Monogram in the Frame.
  const framePath = await page.getByRole('banner').locator('svg path').first().getAttribute('d');
  expect(framePath).toBeTruthy();
  expect(await response.text()).toContain(framePath!);
});
