import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the Hero greets the visitor with "HEY!" as the only h1', async ({ page }) => {
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('HEY!');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('the Hero introduces Aditya with the agreed intro text', async ({ page }) => {
  const hero = page.getByRole('region', { name: 'Introduction' });
  await expect(hero).toContainText(
    "You've arrived at the portfolio of Aditya Mitra – a founding engineer building AI agents, multi-agent systems and developer tools in the open. Have a look at where I've worked and a few things I've built.",
  );
  await expect(hero.locator('strong')).toHaveText('Aditya Mitra');
});
