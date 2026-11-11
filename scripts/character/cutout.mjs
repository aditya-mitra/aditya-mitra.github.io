// Turns Character drawings on a flat magenta backdrop into transparent cutouts.
// Usage: node scripts/character/cutout.mjs <outDir> <name>=<in.png> [<name>=<in.png> ...]
// Alpha is how far a pixel is from the backdrop's magenta; the magenta is then
// subtracted from the colour so edges carry no pink fringe. Every image given is
// cropped to the same box (the union of the figures), so expressions drawn over the
// same body stay pixel-aligned and can be swapped without a jump.
import sharp from 'sharp';

const [outDir, ...pairs] = process.argv.slice(2);
const spill = (r, g, b) => Math.min(r, b) - g; // high for magenta, low or negative for anything drawn
const floor = 0.12; // below this share of the backdrop's spill a pixel is fully drawn
const ceil = 0.8; // above this it is fully backdrop (the model's backdrop is not perfectly even)

const cut = [];
const box = { left: Infinity, top: Infinity, right: 0, bottom: 0 };
for (const pair of pairs) {
  const [name, input] = pair.split('=');
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const [bgR, bgG, bgB] = data; // the backdrop colour is sampled from the top-left corner, not assumed
  const full = spill(bgR, bgG, bgB);
  for (let i = 0; i < data.length; i += 4) {
    const t = Math.min(1, Math.max(0, (spill(data[i], data[i + 1], data[i + 2]) / full - floor) / (ceil - floor)));
    const a = 1 - t;
    if (a < 0.06) {
      // backdrop, or a speck too faint to see
      data[i] = data[i + 1] = data[i + 2] = data[i + 3] = 0;
      continue;
    }
    // observed = a * drawn + (1 - a) * backdrop, solved for drawn
    data[i] = Math.max(0, Math.min(255, (data[i] - t * bgR) / a));
    data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - t * bgG) / a));
    data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - t * bgB) / a));
    data[i + 3] = Math.round(a * 255);
  }

  // Keep only the figure: the largest connected patch of drawn pixels. The model leaves
  // a few stray specks in the corners of its backdrop, and they would widen the crop.
  const { width, height } = info;
  const label = new Int32Array(width * height);
  let best = 0;
  let bestSize = 0;
  for (let start = 0, next = 1; start < label.length; start++) {
    if (label[start] || !data[start * 4 + 3]) continue;
    const stack = [start];
    label[start] = next;
    let size = 0;
    while (stack.length) {
      const p = stack.pop();
      size++;
      const x = p % width;
      for (const q of [p - width, p + width, x > 0 ? p - 1 : -1, x < width - 1 ? p + 1 : -1]) {
        if (q >= 0 && q < label.length && !label[q] && data[q * 4 + 3]) {
          label[q] = next;
          stack.push(q);
        }
      }
    }
    if (size > bestSize) [best, bestSize] = [next, size];
    next++;
  }
  for (let p = 0; p < label.length; p++) {
    if (label[p] !== best) {
      data[p * 4] = data[p * 4 + 1] = data[p * 4 + 2] = data[p * 4 + 3] = 0;
      continue;
    }
    const x = p % width;
    const y = Math.floor(p / width);
    if (x < box.left) box.left = x;
    if (x > box.right) box.right = x;
    if (y < box.top) box.top = y;
    if (y > box.bottom) box.bottom = y;
  }
  cut.push({ name, data, info });
}

const region = { left: box.left, top: box.top, width: box.right - box.left + 1, height: box.bottom - box.top + 1 };
for (const { name, data, info } of cut) {
  await sharp(data, { raw: info }).extract(region).png({ compressionLevel: 9 }).toFile(`${outDir}/${name}.png`);
  console.log(`wrote ${outDir}/${name}.png ${region.width}x${region.height}`);
}
