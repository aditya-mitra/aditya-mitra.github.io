# aditya-mitra.github.io

Personal portfolio of Aditya Mitra, version 3.

Live at [aditya-mitra.github.io](https://aditya-mitra.github.io) and [aditya-mitra.netlify.app](https://aditya-mitra.netlify.app).

## Previous versions

| Version | Site | Source |
| --- | --- | --- |
| v2 (Next.js) | [aditya-mitra-v2.netlify.app](https://aditya-mitra-v2.netlify.app/) | [`v2` branch](https://github.com/aditya-mitra/aditya-mitra.github.io/tree/v2) |
| v1 | | [`v1` branch](https://github.com/aditya-mitra/aditya-mitra.github.io/tree/v1) |

## Development

An [Astro](https://astro.build) static site, built with [bun](https://bun.sh).

```sh
bun install
bun run dev     # local dev server
bun run build   # writes dist/
bun run test    # builds, then runs the Playwright tests
```

Every push to `main` builds the site and deploys it to GitHub Pages (via the `gh-pages` branch) and to Netlify. See `.github/workflows/deploy.yml`.
