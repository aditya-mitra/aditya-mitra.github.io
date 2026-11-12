import { expect, test, type Page } from '@playwright/test';
import { capture, changedPixels } from './support/pixels';

// The Work Scene (the Character at a desk, agent-bots carrying tasks) and the
// giant "WORK" heading with scroll parallax.

const work = (page: Page) => page.getByRole('region', { name: 'Work' });
const heading = (page: Page) => work(page).getByRole('heading', { level: 2, name: 'Work' });
// The Scene is the Section's backdrop; its Character is the picture in the Section.
const character = (page: Page) => work(page).locator('img[src*="character"]:visible');

const skipIntro = (page: Page) => page.addInitScript(() => sessionStorage.setItem('intro', 'seen'));

/** Keyframed properties of the animations running in the Work Section. */
const workAnimations = (page: Page) =>
  work(page).evaluate((root) =>
    document
      .getAnimations()
      .filter((a) => a.playState === 'running' && root.contains((a.effect as KeyframeEffect).target))
      .map((a) => (a.effect as KeyframeEffect).getKeyframes().flatMap((k) => Object.keys(k))),
  );

/** What the visitor sees of the Work Section. */
const workShot = async (page: Page) => capture(page, (await work(page).boundingBox())!);

/** Scrolls the Work Section into view and lets its content finish rising into place. */
const showWork = async (page: Page) => {
  await work(page).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
};

/** Scrolls so the top of the Work Section sits `fraction` of a viewport below the top of the viewport. */
const scrollWorkTo = async (page: Page, fraction: number) => {
  await page.evaluate((f) => {
    const top = document.querySelector<HTMLElement>('[aria-label="Work"]')!.getBoundingClientRect().top + scrollY;
    window.scrollTo({ top: top - f * innerHeight, behavior: 'instant' });
  }, fraction);
  await page.waitForTimeout(400);
};

/** How far the heading sits below the top edge of its Section, and so of the Scene behind it. */
const headingOffset = async (page: Page) => {
  const h = (await heading(page).boundingBox())!;
  const s = (await work(page).boundingBox())!;
  return h.y - s.y;
};

test.describe('the Work Scene', () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test('is a drawn backdrop with the Character, hidden from assistive technology', async ({ page }) => {
    await page.goto('/');
    await work(page).scrollIntoViewIfNeeded();
    await expect(character(page)).toHaveCount(1);
    const tree = await work(page).ariaSnapshot();
    expect(tree).not.toMatch(/\bimg\b|graphics/i);
    // The Scene sits in the Section, visible beside or below the Work Cards.
    const box = (await character(page).boundingBox())!;
    expect(box.height).toBeGreaterThan(100);
  });

  test('keeps moving on an idle loop, animating only transform and opacity', async ({ page }) => {
    await page.goto('/');
    await showWork(page);
    const before = await workShot(page);
    await page.waitForTimeout(1000);
    expect(await changedPixels(page, before, await workShot(page))).toBeGreaterThan(500);

    const props = new Set((await workAnimations(page)).flat());
    for (const p of ['offset', 'easing', 'composite', 'computedOffset']) props.delete(p);
    expect(props.size).toBeGreaterThan(0);
    expect([...props].filter((p) => p !== 'transform' && p !== 'opacity')).toEqual([]);
  });

  test('is still when the visitor prefers reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await showWork(page);
    expect(await workAnimations(page)).toEqual([]);
    const before = await workShot(page);
    await page.waitForTimeout(800);
    expect(await changedPixels(page, before, await workShot(page))).toBe(0);
  });
});

test.describe('the giant WORK heading', () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test('is the Section heading, before the Work Cards in reading order', async ({ page }) => {
    await page.goto('/');
    const headings = await work(page).getByRole('heading').evaluateAll((els) => els.map((el) => el.tagName));
    expect(headings[0]).toBe('H2');
    expect(headings.slice(1).every((t) => t === 'H3')).toBe(true);
    // Giant: far larger than the Work Card company names.
    const h2 = (await heading(page).boundingBox())!;
    const h3 = (await work(page).getByRole('heading', { level: 3 }).first().boundingBox())!;
    expect(h2.height).toBeGreaterThan(h3.height * 2.5);
  });

  test('moves at a different rate from the Scene as the page scrolls', async ({ page }) => {
    await page.goto('/');
    await scrollWorkTo(page, 0.6);
    const entering = await headingOffset(page);
    await scrollWorkTo(page, 0);
    const settled = await headingOffset(page);
    expect(Math.abs(entering - settled)).toBeGreaterThan(20);
  });

  test('moves with the Scene under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await scrollWorkTo(page, 0.6);
    const entering = await headingOffset(page);
    await scrollWorkTo(page, 0);
    expect(Math.abs((await headingOffset(page)) - entering)).toBeLessThan(1);
  });
});
