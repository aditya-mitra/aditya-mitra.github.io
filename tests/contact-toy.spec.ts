import { expect, test, type Page } from '@playwright/test';

// The Contact Scene's Toy: a mechanical keyboard whose keys type on screen.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));
});

const contact = (page: Page) => page.getByRole('region', { name: 'Contact' });
const keyboard = (page: Page) => page.getByTestId('keyboard');
const readout = (page: Page) => page.getByTestId('keyboard-readout');
const key = (page: Page, label: string) => keyboard(page).getByText(label, { exact: true });

async function goToContact(page: Page) {
  await page.goto('/');
  await keyboard(page).scrollIntoViewIfNeeded();
}

test('the Contact Scene is a large keyboard that assistive technology does not hear', async ({ page }) => {
  await page.goto('/');
  const board = keyboard(page);
  await board.scrollIntoViewIfNeeded();
  await expect(board).toBeVisible();
  const box = (await board.boundingBox())!;
  expect(box.width).toBeGreaterThan(page.viewportSize()!.width * 0.9);
  await expect(key(page, 'Q')).toBeVisible();

  // Nothing from the keyboard reaches the accessibility tree, and nothing in it takes focus.
  await expect(contact(page).getByRole('button')).toHaveCount(0);
  expect(await board.evaluate((el) => !!el.closest('[aria-hidden="true"]'))).toBe(true);
  const focusable = await board.evaluate(
    (el) => el.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])').length,
  );
  expect(focusable).toBe(0);
});

test('clicking or tapping keys types the letters on screen and the key visibly goes down', async ({ page }) => {
  await goToContact(page);
  const h = key(page, 'H');
  await expect(h).toBeVisible();
  // Interrupt the keyboard typing its own message, and let any key it holds come up.
  await expect(readout(page)).toBeVisible();
  await page.keyboard.press('Shift');
  await page.waitForTimeout(250);

  const box = (await h.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  const before = (await h.boundingBox())!.y;
  await page.mouse.down();
  await expect.poll(async () => (await h.boundingBox())!.y).toBeGreaterThan(before + 1);
  await page.mouse.up();
  await expect.poll(async () => (await h.boundingBox())!.y).toBeLessThan(before + 1);

  await key(page, 'I').click();
  await expect(readout(page)).toBeVisible();
  await expect(readout(page)).toContainText(/hi$/);
});

test("the visitor's own keyboard types on screen while the Contact Section is in view", async ({ page }) => {
  await goToContact(page);
  await expect(readout(page)).toBeVisible();
  await page.keyboard.type('yo');
  await expect(readout(page)).toContainText(/yo$/);
  await page.keyboard.press('Backspace');
  await expect(readout(page)).toContainText(/y$/);
});

test('the Toy loads only when the Contact Section nears, and typing elsewhere is left alone', async ({ page }) => {
  const scripts: string[] = [];
  page.on('request', (r) => r.resourceType() === 'script' && scripts.push(r.url()));
  await page.goto('/', { waitUntil: 'networkidle' });
  const early = scripts.length;

  // Typing at the top of the page does not feed the Toy.
  await page.keyboard.type('zz');

  await keyboard(page).scrollIntoViewIfNeeded();
  await expect.poll(() => scripts.length).toBeGreaterThan(early);
  await expect(readout(page)).toBeVisible();
  await expect(readout(page)).not.toContainText('zz');

  // Tab still moves focus through the page's links, never into the keyboard.
  await contact(page).getByRole('link').last().focus();
  await page.keyboard.press('Shift+Tab');
  expect(await page.evaluate(() => document.activeElement?.tagName)).toBe('A');
});
