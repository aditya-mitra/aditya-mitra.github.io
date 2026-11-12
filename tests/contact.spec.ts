import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the Contact Section signs off with a "Ready to ship!" heading', async ({ page }) => {
  const contact = page.getByRole('region', { name: 'Contact' });
  const heading = contact.getByRole('heading', { level: 2 });
  await expect(heading).toHaveCount(1);
  await expect(heading).toHaveAccessibleName(/^ready to ship!$/i);

  // The headline a sighted visitor sees is on screen and inside the page width.
  await heading.scrollIntoViewIfNeeded();
  const box = await contact.getByTestId('contact-headline').boundingBox();
  const width = page.viewportSize()!.width;
  expect(box!.height).toBeGreaterThan(40);
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(width);
});

const profiles = [
  { name: /linkedin/i, href: 'https://www.linkedin.com/in/aditya--mitra/' },
  { name: /github/i, href: 'https://github.com/aditya-mitra' },
  { name: /^x\b/i, href: 'https://x.com/adityamitrax' },
  { name: /bluesky/i, href: 'https://bsky.app/profile/adityamitra.bsky.social' },
];

test('the Contact Section offers the email and four profile links with the right destinations', async ({ page }) => {
  const contact = page.getByRole('region', { name: 'Contact' });
  await expect(contact.getByRole('link')).toHaveCount(5);

  const email = contact.getByRole('link', { name: /temporaray\.ot831@aleeas\.com/ });
  await expect(email).toBeVisible();
  await expect(email).toHaveAttribute('href', 'mailto:temporaray.ot831@aleeas.com');
  await expect(email).not.toHaveAttribute('target', '_blank');

  for (const { name, href } of profiles) {
    const link = contact.getByRole('link', { name });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', href);
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', /noopener/);
  }
});

test('the email card looks like the other contact cards and fits the viewport', async ({ page }) => {
  const contact = page.getByRole('region', { name: 'Contact' });
  const email = contact.getByRole('link', { name: /temporaray/ });
  const linkedin = contact.getByRole('link', { name: /linkedin/i });
  await email.scrollIntoViewIfNeeded();

  const look = (el: Element) => {
    const s = getComputedStyle(el);
    return [s.backgroundColor, s.color, s.borderTopWidth, s.fontSize, s.boxShadow];
  };
  expect(await email.evaluate(look)).toEqual(await linkedin.evaluate(look));
  const emailBox = (await email.boundingBox())!;
  expect(emailBox.height).toBeCloseTo((await linkedin.boundingBox())!.height, -1);
  expect(emailBox.x).toBeGreaterThanOrEqual(0);
  expect(emailBox.x + emailBox.width).toBeLessThanOrEqual(page.viewportSize()!.width);
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
