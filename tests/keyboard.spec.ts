import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

const focused = (page: import('@playwright/test').Page) =>
  page.evaluate(() => {
    const el = document.activeElement as HTMLElement;
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    return {
      name: el.getAttribute('aria-label') ?? el.textContent?.trim(),
      outline: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2,
      onScreen: rect.top >= 0 && rect.left >= 0 && rect.bottom <= innerHeight && rect.right <= innerWidth,
    };
  });

test('tabbing starts with the skip link, then the Monogram, then "Let\'s talk", each with a visible focus indicator', async ({ page }) => {
  const expected = ['Skip to content', 'Aditya Mitra – back to top', "Let's talk"];
  for (const name of expected) {
    await page.keyboard.press('Tab');
    expect(await focused(page)).toEqual({ name, outline: true, onScreen: true });
  }
});

test('the skip link moves the visitor to the content', async ({ page }) => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#content$/);
});
