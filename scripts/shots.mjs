// Screenshots of the served production build, for judging look and feel by eye.
// Usage: bun run shots [outDir]   (build first; writes desktop.png, mobile.png and full-page versions)
import { chromium, devices } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';
import { origin } from './port.mjs';

const out = process.argv[2] ?? 'test-results/shots';
await mkdir(out, { recursive: true });
const server = await serve();
const browser = await chromium.launch();
const views = {
  desktop: { viewport: { width: 1440, height: 900 } },
  mobile: devices['Pixel 7'],
};
for (const [name, options] of Object.entries(views)) {
  const page = await (await browser.newContext(options)).newPage();
  await page.goto(origin, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${name}.png` });
  await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
}
await browser.close();
server.close();
console.log(`Screenshots written to ${out}/`);
