// Runs Lighthouse (mobile preset, its default) against the served production
// build and prints the four category scores. Exits non-zero if any score is
// below the bar (95; override with LH_MIN). Build first: `bun run lighthouse` does.
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import { writeFile, mkdir } from 'node:fs/promises';
import { serve } from './serve.mjs';
import { origin } from './port.mjs';

const min = Number(process.env.LH_MIN ?? 95);
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];

const server = await serve();
const chrome = await launch({
  chromePath: process.env.CHROME_PATH ?? chromium.executablePath(),
  chromeFlags: ['--headless=new', '--no-sandbox'],
});

let failed = false;
try {
  const result = await lighthouse(origin, { port: chrome.port, onlyCategories: categories, output: 'html', logLevel: 'error' });
  await mkdir('test-results', { recursive: true });
  await writeFile('test-results/lighthouse.html', result.report);

  console.log(`Lighthouse (mobile) for ${origin}`);
  for (const id of categories) {
    const { title, score } = result.lhr.categories[id];
    const value = Math.round((score ?? 0) * 100);
    if (value < min) failed = true;
    console.log(`  ${title.padEnd(16)} ${String(value).padStart(3)}${value < min ? `  (below ${min})` : ''}`);
  }
  const failing = Object.values(result.lhr.audits).filter((a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode !== 'informative');
  for (const audit of failing) console.log(`  - ${audit.id}: ${audit.displayValue ?? audit.title}`);
  console.log('  Full report: test-results/lighthouse.html');
} finally {
  await chrome.kill();
  server.close();
}
process.exit(failed ? 1 : 0);
