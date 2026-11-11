import { expect, test, type Page } from '@playwright/test';

const roster = [
  'Frontman AI',
  'Continue',
  'Napster',
  'Ethereal Engine',
  'Qualcomm',
  'LimeChat',
  'AI4Bharat',
  'Rocket.Chat',
];

const honours = [
  'Meta XROS Fellow 2023 (Top 100 of 10,000+)',
  'Google Summer of Code 2021',
  'Continue core maintainer',
  '20+ model providers integrated',
  'B.Tech Computer Science (KIIT)',
];

const about = (page: Page) => page.getByRole('region', { name: 'About' });
const ticker = (page: Page) => about(page).getByRole('list', { name: 'Honours' });
const firstHonourX = async (page: Page) =>
  (await ticker(page).getByRole('listitem').first().boundingBox())!.x;
// The Ticker itself never settles, so scroll to the still heading beside it.
const scrollToScoreboard = (page: Page) =>
  about(page).getByRole('heading', { level: 3, name: 'Honours' }).scrollIntoViewIfNeeded();

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('the About Section carries a short bio of Aditya', async ({ page }) => {
  await expect(about(page).getByRole('heading', { level: 2, name: 'About' })).toBeVisible();
  const first = about(page).getByText("I'm an engineer who builds agentic AI", { exact: false });
  const second = about(page).getByText('I work end to end, from backend architecture', { exact: false });
  await expect(first).toBeVisible();
  await expect(second).toBeVisible();
  await expect(second).toContainText('Continue, Rocket.Chat and Ethereal Engine');
});

test('the Roster lists the eight companies and ecosystems', async ({ page }) => {
  const list = about(page).getByRole('list', { name: 'Worked with' });
  await expect(list.getByRole('listitem')).toHaveText(roster);
  for (const item of await list.getByRole('listitem').all()) await expect(item).toBeVisible();
});

test('the Ticker reads out each of the five Honours exactly once', async ({ page }) => {
  // Role queries see what assistive technology sees: duplicated ticker content must not show up.
  await expect(ticker(page).getByRole('listitem')).toHaveText(honours);
  await expect(about(page).getByRole('listitem').filter({ hasText: 'Google Summer of Code 2021' })).toHaveCount(1);
  await expect(about(page).getByRole('heading', { level: 3, name: 'Honours' })).toBeVisible();
});

test('the Ticker scrolls on its own', async ({ page }) => {
  await scrollToScoreboard(page);
  const before = await firstHonourX(page);
  await page.waitForTimeout(500);
  expect(await firstHonourX(page)).toBeLessThan(before - 5);
});

test.describe('with reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });

  test('the Ticker is still and every Honour is on screen', async ({ page }) => {
    await scrollToScoreboard(page);
    const before = await firstHonourX(page);
    await page.waitForTimeout(500);
    expect(await firstHonourX(page)).toBe(before);

    const width = page.viewportSize()!.width;
    for (const item of await ticker(page).getByRole('listitem').all()) {
      const box = (await item.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width);
    }
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('the bio, Roster and Honours are all readable', async ({ page }) => {
    await expect(about(page)).toContainText("I'm an engineer who builds agentic AI");
    await expect(about(page).getByRole('list', { name: 'Worked with' }).getByRole('listitem')).toHaveText(roster);
    await expect(ticker(page).getByRole('listitem')).toHaveText(honours);
  });
});
