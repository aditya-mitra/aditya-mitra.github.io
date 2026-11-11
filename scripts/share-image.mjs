// Composes the share image (public/share.png, 1200x630) from the Avatar, the
// Monogram, the site's fonts and its colour tokens. The Avatar is private and
// git-ignored, so this runs by hand, not in the build; commit the result.
// Usage: bun run share-image [path/to/pic.webp]   (default: ./pic.webp)
import { chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { site } from '../src/data/site.ts';

const root = new URL('../', import.meta.url);
const read = (path) => readFile(new URL(path, root));
const dataUrl = async (path, type) => `data:${type};base64,${(await readFile(path)).toString('base64')}`;
const fontUrl = (file) => dataUrl(new URL(`public/fonts/${file}`, root), 'font/woff2');

const avatar = await dataUrl(process.argv[2] ?? 'pic.webp', 'image/webp');
const tokens = await read('src/styles/tokens.css');
// The Monogram outline, taken from the component so the two cannot drift apart.
const monogram = String(await read('src/components/Monogram.astro')).match(/<svg[\s\S]*<\/svg>/)[0]
  .replace(/class:list=\{[^}]*\}/, '');
const { shareImage } = site.meta;
const [first, last] = site.person.name.split(' ');

const html = `<!doctype html>
<style>
  ${tokens}
  @font-face { font-family: 'Gasoek One'; src: url(${await fontUrl('gasoek-one-latin-400-normal.woff2')}); }
  @font-face { font-family: 'Alumni Sans'; font-weight: 100 900; src: url(${await fontUrl('alumni-sans-latin-wght-normal.woff2')}); }
  * { box-sizing: border-box; margin: 0; }
  body { width: ${shareImage.width}px; height: ${shareImage.height}px; background: var(--field); color: var(--ink);
    border: 14px solid var(--ink); position: relative; overflow: hidden; font-family: var(--font-heading); }
  .bar { height: 76px; border-bottom: 6px solid var(--ink); display: flex; justify-content: space-between; align-items: stretch; }
  .bar svg { height: 34px; margin: 18px 28px; }
  .bar span { border-left: 6px solid var(--ink); padding: 0 34px; font-size: 38px; font-weight: 800;
    text-transform: uppercase; letter-spacing: 0.02em; line-height: 70px; }
  .sun { position: absolute; right: -150px; bottom: -230px; width: 760px; height: 760px; border-radius: 50%; background: var(--field-hi); }
  .ground { position: absolute; left: 0; right: 0; bottom: 0; height: 74px; background: var(--field-lo); border-top: 6px solid var(--ink); }
  h1 { position: absolute; left: 52px; top: 132px; font: 400 128px/0.98 var(--font-display); letter-spacing: -0.01em; text-transform: uppercase; }
  p { position: absolute; left: 56px; top: 410px; width: 560px; text-wrap: balance; font-size: 50px; font-weight: 700; line-height: 1; text-transform: uppercase; }
  .tile { position: absolute; right: 78px; top: 114px; width: 380px; height: 380px; transform: rotate(4deg);
    border: 8px solid var(--ink); border-radius: 24px; box-shadow: 16px 16px 0 var(--ink); overflow: hidden; background: var(--paper); }
  .tile img { width: 100%; height: 100%; object-fit: cover; display: block; }
</style>
<div class="sun"></div><div class="ground"></div>
<div class="bar">${monogram}<span>${shareImage.host}</span></div>
<h1>${first}<br>${last}</h1>
<p>${shareImage.tagline}</p>
<div class="tile"><img src="${avatar}" alt=""></div>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: shareImage.width, height: shareImage.height } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
const out = new URL(`public${shareImage.path}`, root);
await page.screenshot({ path: out.pathname });
await browser.close();
console.log(`Wrote ${out.pathname}`);
