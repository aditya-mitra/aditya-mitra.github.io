import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the four Sections render in order as labelled landmarks inside main', async ({ page }) => {
  const sections = page.getByRole('main').getByRole('region');
  await expect(sections).toHaveCount(4);
  const names = await sections.evaluateAll((els) => els.map((el) => el.getAttribute('aria-label')));
  expect(names).toEqual(['Introduction', 'Work', 'About', 'Contact']);

  const tops = await sections.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top));
  expect(tops).toEqual([...tops].sort((a, b) => a - b));
});

test('the page ends with a footer landmark after the Sections', async ({ page }) => {
  const footer = page.getByRole('contentinfo');
  await expect(footer).toHaveCount(1);
  const contactBottom = await page.getByRole('region', { name: 'Contact' }).evaluate((el) => el.getBoundingClientRect().bottom);
  const footerTop = await footer.evaluate((el) => el.getBoundingClientRect().top);
  expect(footerTop).toBeGreaterThanOrEqual(contactBottom - 1);
});

test('the page never scrolls sideways', async ({ page }) => {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
