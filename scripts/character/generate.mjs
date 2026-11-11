// Generates a Character image with an image model through OpenRouter.
// Usage: node --env-file=<main checkout>/.env scripts/character/generate.mjs <out.png> <prompt.txt> <reference image>...
// The key is read from OPENROUTER_KEY and never written anywhere. The model is asked for a flat
// magenta backdrop; scripts/character/cutout.mjs then turns that into real transparency.
import { readFile, writeFile } from 'node:fs/promises';
import { extname } from 'node:path';

const [out, promptFile, ...refs] = process.argv.slice(2);
const key = process.env.OPENROUTER_KEY;
if (!out || !promptFile || !key) {
  console.error('usage: OPENROUTER_KEY=… generate.mjs <out.png> <prompt.txt> [reference images]');
  process.exit(1);
}
const model = process.env.CHARACTER_MODEL ?? 'google/gemini-3-pro-image';
const mime = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg' };
const images = await Promise.all(
  refs.map(async (file) => ({
    type: 'image_url',
    image_url: { url: `data:${mime[extname(file)]};base64,${(await readFile(file)).toString('base64')}` },
  })),
);

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model,
    modalities: ['image', 'text'],
    image_config: { aspect_ratio: process.env.CHARACTER_ASPECT ?? '3:4' },
    messages: [{ role: 'user', content: [{ type: 'text', text: await readFile(promptFile, 'utf8') }, ...images] }],
  }),
});
const body = await res.json();
const url = body.choices?.[0]?.message?.images?.[0]?.image_url?.url;
if (!url) {
  console.error('no image returned:', JSON.stringify(body).slice(0, 600));
  process.exit(1);
}
await writeFile(out, Buffer.from(url.split(',')[1], 'base64'));
console.log(`wrote ${out} (${model})`);
