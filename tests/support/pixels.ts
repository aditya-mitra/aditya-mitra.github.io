import type { Page } from '@playwright/test';

// What the visitor sees, read from screenshots: helpers to tell whether and how
// far parts of the page moved, without looking at the markup behind them.

type Box = { x: number; y: number; width: number; height: number };

/** A screenshot of the visible part of `box`, kept with where it was taken. */
export async function capture(page: Page, box: Box) {
  const { width, height } = page.viewportSize()!;
  const x = Math.max(0, Math.floor(box.x));
  const y = Math.max(0, Math.floor(box.y));
  const clip = { x, y, width: Math.min(width, Math.ceil(box.x + box.width)) - x, height: Math.min(height, Math.ceil(box.y + box.height)) - y };
  return { clip, png: (await page.screenshot({ clip })).toString('base64') };
}
type Capture = Awaited<ReturnType<typeof capture>>;

/** Number of pixels that differ between two captures of the same region. */
export const changedPixels = (page: Page, a: Capture, b: Capture) =>
  page.evaluate(
    async ([a, b]) => {
      const read = async (png: string) => {
        const img = new Image();
        img.src = `data:image/png;base64,${png}`;
        await img.decode();
        const ctx = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height }).getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        return ctx.getImageData(0, 0, img.width, img.height).data;
      };
      const [pa, pb] = [await read(a), await read(b)];
      let changed = 0;
      for (let i = 0; i < pa.length; i += 4) {
        if (Math.abs(pa[i] - pb[i]) + Math.abs(pa[i + 1] - pb[i + 1]) + Math.abs(pa[i + 2] - pb[i + 2]) > 24) changed++;
      }
      return changed;
    },
    [a.png, b.png],
  );

/**
 * How far, in pixels to the right, the shapes painted in `colour` (a CSS
 * colour) moved between two captures of the same region. Pixels inside
 * `ignore` (page coordinates) are left out, for things that move on their own.
 * Returns the median edge displacement, or null when there is too little of
 * that colour to tell.
 */
export const colourShift = (page: Page, a: Capture, b: Capture, colour: string, ignore: Box[] = [], range = 120) =>
  page.evaluate(
    async ({ a, b, clip, colour, ignore, range }) => {
      const probe = document.createElement('i');
      probe.style.color = colour;
      document.body.append(probe);
      const rgb = getComputedStyle(probe).color.match(/\d+/g)!.slice(0, 3).map(Number);
      probe.remove();

      const read = async (png: string) => {
        const img = new Image();
        img.src = `data:image/png;base64,${png}`;
        await img.decode();
        const ctx = Object.assign(document.createElement('canvas'), { width: img.width, height: img.height }).getContext('2d')!;
        ctx.drawImage(img, 0, 0);
        const data = ctx.getImageData(0, 0, img.width, img.height).data;
        const mask = new Uint8Array(img.width * img.height);
        for (let i = 0; i < mask.length; i++) {
          const d = Math.abs(data[i * 4] - rgb[0]) + Math.abs(data[i * 4 + 1] - rgb[1]) + Math.abs(data[i * 4 + 2] - rgb[2]);
          mask[i] = d < 12 ? 1 : 0;
        }
        return { mask, w: img.width, h: img.height };
      };
      const [ma, mb] = [await read(a), await read(b)];
      const { w, h } = ma;
      const skip = (x: number, y: number) =>
        ignore.some((r) => x + clip.x >= r.x && x + clip.x < r.x + r.width && y + clip.y >= r.y && y + clip.y < r.y + r.height);

      // Along each row, the edges of the colour: where it starts (+1) and stops (-1).
      // Edges that stay put belong to whatever covers the shapes; the rest moved.
      const edges = (m: Uint8Array, y: number) => {
        const out: { x: number; dir: number }[] = [];
        for (let x = 1; x < w; x++) {
          const d = m[y * w + x] - m[y * w + x - 1];
          if (d && !skip(x, y)) out.push({ x, dir: d });
        }
        return out;
      };
      let total = 0;
      const moves: number[] = [];
      for (let y = 0; y < h; y++) {
        const ea = edges(ma.mask, y);
        let eb = edges(mb.mask, y);
        total += ea.length;
        const moved = ea.filter((e) => {
          const still = eb.findIndex((f) => f.dir === e.dir && Math.abs(f.x - e.x) <= 1);
          if (still < 0) return true;
          eb = eb.filter((_, i) => i !== still);
          return false;
        });
        for (const e of moved) {
          let nearest: number | undefined;
          for (const f of eb) {
            const d = f.x - e.x;
            if (f.dir === e.dir && Math.abs(d) <= range && (nearest === undefined || Math.abs(d) < Math.abs(nearest))) nearest = d;
          }
          if (nearest !== undefined) moves.push(nearest);
        }
      }
      if (total < 40) return null;
      if (moves.length < total * 0.05) return 0; // next to nothing moved
      moves.sort((p, q) => p - q);
      return moves[moves.length >> 1];
    },
    { a: a.png, b: b.png, clip: a.clip, colour, ignore, range },
  );
