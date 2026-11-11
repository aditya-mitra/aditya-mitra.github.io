import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the Contact Section signs off with a "Ready to ship?" heading', async ({ page }) => {
  const contact = page.getByRole('region', { name: 'Contact' });
  const heading = contact.getByRole('heading', { level: 2 });
  await expect(heading).toHaveCount(1);
  await expect(heading).toHaveAccessibleName(/^ready to ship\?$/i);

  // The headline a sighted visitor sees is on screen and inside the page width.
  await heading.scrollIntoViewIfNeeded();
  const box = await contact.getByTestId('contact-headline').boundingBox();
  const width = page.viewportSize()!.width;
  expect(box!.height).toBeGreaterThan(40);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width);
});

test('the Contact Section offers exactly three contact links with the right destinations', async ({ page }) => {
  const contact = page.getByRole('region', { name: 'Contact' });
  await expect(contact.getByRole('link')).toHaveCount(3);

  const email = contact.getByRole('link', { name: /temporaray\.ot831@aleeas\.com/ });
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute('href', 'mailto:temporaray.ot831@aleeas.com');
  await expect(email).not.toHaveAttribute('target', '_blank');

  const linkedin = contact.getByRole('link', { name: /linkedin/i });
  await expect(linkedin).toBeVisible();
  await expect(linkedin).toHaveAttribute('href', 'https://www.linkedin.com/in/aditya--mitra/');

  const github = contact.getByRole('link', { name: /github/i });
  await expect(github).toBeVisible();
  await expect(github).toHaveAttribute('href', 'https://github.com/aditya-mitra');

  for (const external of [linkedin, github]) {
    await expect(external).toHaveAttribute('target', '_blank');
    await expect(external).toHaveAttribute('rel', /noopener/);
  }
});

test('the email address is the largest of the contact links and fits the viewport', async ({ page }) => {
  const contact = page.getByRole('region', { name: 'Contact' });
  const email = contact.getByRole('link', { name: /temporaray/ });
  await email.scrollIntoViewIfNeeded();
  const area = async (name: RegExp) => {
    const b = (await contact.getByRole('link', { name }).boundingBox())!;
    return b.width * b.height;
  };
  expect(await area(/temporaray/)).toBeGreaterThan(await area(/linkedin/i));
  expect(await area(/temporaray/)).toBeGreaterThan(await area(/github/i));

  const box = (await email.boundingBox())!;
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  // One line: the address is never broken across lines.
  const lines = await email.evaluate((el) => {
    const range = document.createRange();
    range.selectNodeContents(el.querySelector('[data-address]') ?? el);
    return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
  });
  expect(lines).toBe(1);
});

test('there is no "Book a video call" link while the booking URL is unset', async ({ page }) => {
  await expect(page.getByText(/book a video call/i)).toHaveCount(0);
  await expect(page.getByRole('link', { name: /book|video call/i })).toHaveCount(0);
});

test('the footer sits on black with the Monogram and a copyright line', async ({ page }) => {
  const footer = page.getByRole('contentinfo');
  await footer.scrollIntoViewIfNeeded();
  await expect(footer).toContainText(`© ${new Date().getFullYear()} Aditya Mitra`);
  await expect(footer.locator('svg').first()).toBeVisible();
  expect(await footer.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(0, 0, 0)');
  expect(await footer.evaluate((el) => getComputedStyle(el).color)).toBe('rgb(255, 255, 255)');
});

test('no phone number appears in the Contact Section or the footer', async ({ page }) => {
  await expect(page.locator('a[href^="tel:"]')).toHaveCount(0);
  for (const part of [page.getByRole('region', { name: 'Contact' }), page.getByRole('contentinfo')]) {
    await expect(part).not.toContainText(/phone|\+?\d[\d\s-]{8,}\d/i);
  }
});
