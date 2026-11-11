# 11: Identity and metadata

**What to build:** Someone sharing the link gets a good preview, a search engine learns who Aditya is, and the browser tab shows the Monogram. Covers stories 60, 61 and the Identity and metadata decisions.

**Blocked by:** 01

**Status:** resolved

Spec: `.scratch/portfolio-site/spec.md`. Vocabulary: `GLOSSARY.md`.

- [x] Title, description and canonical URL for https://aditya-mitra.github.io/
- [x] Open Graph and Twitter card tags with a share image derived from the Avatar (the raw Avatar itself stays out of the repository)
- [x] Person structured data (JSON-LD) with name, job title and profile links; no phone number
- [x] Favicon from the Monogram
- [x] Playwright: metadata, structured data and share image resolve on the served build
