import { expect, test, type Locator, type Page } from '@playwright/test';

// Expected values come from the spec's Work table and the looked-up public sites,
// not from the content source.
const cards = [
  { code: 'FRM', company: 'Frontman AI', role: 'Founding Engineer', dates: 'June 2026 – Present', url: 'https://frontman.sh/' },
  { code: 'CTN', company: 'Continue', role: 'Software Engineer', dates: 'July 2025 – May 2026', url: 'https://continue.dev/' },
  { code: 'NAP', company: 'Napster / Ethereal Engine', role: 'Software Engineer', dates: 'July 2023 – June 2025', url: 'https://www.napster.com/' },
  { code: 'QCM', company: 'Qualcomm', role: 'Engineering Intern', dates: 'January 2023 – June 2023', url: 'https://www.qualcomm.com/' },
  { code: 'LMC', company: 'LimeChat', role: 'Software Engineer', dates: 'June 2022 – December 2022', url: 'https://www.limechat.ai/' },
  { code: 'A4B', company: 'AI4Bharat', role: 'Research Fellow', dates: 'May 2022 – August 2022', url: 'https://ai4bharat.iitm.ac.in/' },
];

const work = (page: Page) => page.getByRole('region', { name: 'Work' });
const carousel = (page: Page) => work(page).getByRole('group', { name: 'Work Cards' });
const next = (page: Page) => carousel(page).getByRole('button', { name: 'Next Work Card' });
const previous = (page: Page) => carousel(page).getByRole('button', { name: 'Previous Work Card' });

/** Asserts that exactly one Work Card is showing and that it is the nth (1-based). */
async function expectShowing(page: Page, n: number) {
  const card = cards[n - 1];
  await expect(carousel(page).getByRole('heading', { level: 3 })).toHaveText([card.company]);
  await expect(carousel(page).getByText(card.code, { exact: true })).toBeVisible();
  await expect(carousel(page).getByText(`${n}/6`, { exact: true })).toBeVisible();
}

async function expectCardContent(scope: Locator, card: (typeof cards)[number]) {
  await expect(scope.getByText(card.code, { exact: true })).toBeVisible();
  await expect(scope.getByRole('heading', { level: 3, name: card.company, exact: true })).toBeVisible();
  await expect(scope.getByText(card.role, { exact: true })).toBeVisible();
  await expect(scope.getByText(card.dates, { exact: true })).toBeVisible();
}

test.describe('Work Cards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await carousel(page).scrollIntoViewIfNeeded();
  });

  test('six Work Cards, newest first, each with Code, company, role, dates, highlight and Tags', async ({ page }) => {
    for (const [i, card] of cards.entries()) {
      await expectShowing(page, i + 1);
      const item = carousel(page).getByRole('listitem').filter({ hasText: card.code });
      await expectCardContent(item, card);
      await expect(item.getByRole('paragraph').filter({ hasText: /.{60,}/ })).toBeVisible(); // a highlight sentence
      expect(await item.getByRole('list', { name: 'Tags' }).getByRole('listitem').count()).toBeGreaterThanOrEqual(3);
      await next(page).click();
    }
    await expectShowing(page, 1); // after the sixth the carousel comes round again
  });

  test('highlights and Tags come from the resume', async ({ page }) => {
    await expect(carousel(page).getByText(/open-source, browser-based AI agent/)).toBeVisible();
    await expect(carousel(page).getByRole('list', { name: 'Tags' }).getByText('Browser Automation')).toBeVisible();
    await next(page).click();
    await expect(carousel(page).getByText(/multi-agent subagent framework/)).toBeVisible();
    await expect(carousel(page).getByRole('list', { name: 'Tags' }).getByText('Multi-Agent Systems')).toBeVisible();
  });

  test('the next and previous buttons move through the cards and the counter follows', async ({ page }) => {
    await expectShowing(page, 1);
    await next(page).click();
    await expectShowing(page, 2);
    await next(page).click();
    await expectShowing(page, 3);
    await previous(page).click();
    await expectShowing(page, 2);
    await previous(page).click();
    await previous(page).click();
    await expectShowing(page, 6); // back from the first goes to the last
  });

  test('the keyboard moves through the cards and the counter follows', async ({ page }) => {
    await next(page).focus();
    await page.keyboard.press('Enter');
    await expectShowing(page, 2);
    await page.keyboard.press('ArrowRight');
    await expectShowing(page, 3);
    await page.keyboard.press('ArrowLeft');
    await expectShowing(page, 2);
    await page.keyboard.press('ArrowLeft');
    await expectShowing(page, 1);

    // The card on show is reachable by Tab; the hidden ones are not.
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(carousel(page).getByRole('link', { name: /View work/ })).toBeFocused();
    await expect(carousel(page).getByRole('link', { name: /View work/ })).toHaveAttribute('href', cards[0].url);
  });

  test('a swipe moves to the next card and a swipe back returns', async ({ page }) => {
    const box = (await carousel(page).getByRole('heading', { level: 3 }).boundingBox())!;
    const y = box.y + box.height / 2;
    const swipe = async (from: number, to: number) => {
      await page.mouse.move(from, y);
      await page.mouse.down();
      await page.mouse.move((from + to) / 2, y, { steps: 4 });
      await page.mouse.move(to, y, { steps: 4 });
      await page.mouse.up();
    };
    const right = box.x + Math.min(box.width, 260);
    await swipe(right, box.x + 10);
    await expectShowing(page, 2);
    await swipe(box.x + 10, right);
    await expectShowing(page, 1);
  });

  test('"View work" opens the right public site in a new tab for every card', async ({ page }) => {
    for (const card of cards) {
      const link = carousel(page).getByRole('link', { name: /View work/ });
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAccessibleName(new RegExp(card.company));
      await expect(link).toHaveAttribute('href', card.url);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', /noopener/);
      await next(page).click();
    }
  });

  test('a card fits inside the viewport width', async ({ page }) => {
    const box = (await carousel(page).getByRole('listitem').filter({ hasText: 'FRM' }).boundingBox())!;
    const width = page.viewportSize()!.width;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
  });
});

test.describe('Work Cards without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('all six Work Cards are readable as a list, with no dead controls', async ({ page }) => {
    await page.goto('/');
    const items = work(page).getByRole('group', { name: 'Work Cards' }).getByRole('listitem').filter({ has: page.getByRole('heading', { level: 3 }) });
    await expect(items).toHaveCount(6);
    for (const [i, card] of cards.entries()) {
      const item = items.nth(i); // newest first
      await expectCardContent(item, card);
      await expect(item.getByRole('link', { name: /View work/ })).toHaveAttribute('href', card.url);
    }
    // Stacked one under another, not on top of each other.
    const tops = await items.evaluateAll((els) => els.map((el) => el.getBoundingClientRect().top));
    for (let i = 1; i < tops.length; i++) expect(tops[i]).toBeGreaterThan(tops[i - 1] + 50);

    await expect(work(page).getByRole('button')).toHaveCount(0);
  });
});
