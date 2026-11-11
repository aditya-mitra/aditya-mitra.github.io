import { expect, test } from '@playwright/test';

// Things that must never be on the site. Keep these green in every ticket.

test('no phone number appears anywhere in the page', async ({ page, request }) => {
  const html = await (await request.get('/')).text();
  expect(html).not.toContain('63710');
  expect(html).not.toMatch(/\(?\+?\d{1,3}\)?[\s-]?\d{5}[\s-]?\d{5}\b/);

  await page.goto('/');
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('63710');
});

test('nothing links to /lab or to a Services section', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('a[href*="/lab"], a[href*="#lab"], a[href*="services" i]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /^(lab|services)$/i })).toHaveCount(0);
  await expect(page.getByRole('region', { name: /services/i })).toHaveCount(0);
});

test('there is no route other than /', async ({ request }) => {
  for (const path of ['/lab', '/lab/', '/services', '/work', '/sitemap']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('private files are not published', async ({ request }) => {
  for (const path of ['/resume.pdf', '/.env', '/pic.webp']) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('the page loads nothing from other origins', async ({ page, baseURL }) => {
  const foreign: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (!url.startsWith(baseURL!) && !url.startsWith('data:')) foreign.push(url);
  });
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(foreign).toEqual([]);
});
