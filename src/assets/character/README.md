# The Character

Transparent cutouts of the Character, generated from the Avatar (see `scripts/character/`).

| File | What |
| --- | --- |
| `character.png` | The Character: smiling, open-palm wave. |
| `character-green.png` | The Green Mode expression: wink, laughing grin, peace sign. |

Both are 741 × 1173, RGBA, cropped to the same box. The body is pixel-identical in the two,
so one can replace the other in place with no jump. The figure is cut straight across at
mid-thigh and sits flush on the bottom edge: stand it on a line or hide the bottom edge
behind something (a desk, the edge of a Scene).

Use them through `astro:assets` so they ship as AVIF/WebP with explicit dimensions, never
from `public/`:

```astro
---
import { Picture } from 'astro:assets';
import character from '../../assets/character/character.png';
---
<Picture src={character} formats={['avif', 'webp']} widths={[240, 480, character.width]} sizes="…" alt="" />
```

To regenerate (needs `OPENROUTER_KEY`, which lives only in the main checkout's `.env`):

```sh
node --env-file=<main checkout>/.env scripts/character/generate.mjs raw/base.png scripts/character/prompt-base.txt <main checkout>/pic.webp
node --env-file=… scripts/character/generate.mjs raw/refined.png scripts/character/prompt-refine.txt <main checkout>/pic.webp raw/base.png
node --env-file=… scripts/character/generate.mjs raw/green.png scripts/character/prompt-green.txt raw/refined.png
node scripts/character/cutout.mjs src/assets/character character=raw/refined.png character-green=raw/green.png
```

Look at every image before accepting it; the model does not always keep to the brief.
