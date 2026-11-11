import { expect, test, type Page } from '@playwright/test';

// Green Mode and the Mode Toggle: one press turns the whole page monochrome
// green and swaps the Character's expression; another press restores it.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));
  await page.goto('/');
});

const toggle = (page: Page) => page.getByRole('button', { name: 'Green Mode' });

test('the Mode Toggle is a toggle button that turns Green Mode on and off and reports its state', async ({ page }) => {
  await expect(toggle(page)).toBeVisible();
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');

  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveAttribute('data-mode', 'green');

  await toggle(page).click();
  await expect(toggle(page)).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('html')).not.toHaveAttribute('data-mode', 'green');
});
