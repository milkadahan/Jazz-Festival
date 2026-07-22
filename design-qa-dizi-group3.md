# Design QA — Article Template (Group 3)

**Pages audited:** `article.html`, `article-hava.html`, `article-port.html`
**Widths tested:** 1440px (desktop), 768px (tablet), 390px (mobile) — headless Chrome
**Scope:** design/aesthetic/accessibility QA only. No files edited.
**Date:** 2026-07-20

---

## TL;DR

The three pages are a genuinely clean, well-built article template. The `<style>` block is **byte-for-byte identical** across all three files (verified by md5), so there is **zero unintended CSS drift** — every difference between the pages is legitimate editorial content. Layout is solid at all three widths with **no clipping, overlap, or breakage** found.

The one real, repeated problem is **color contrast**: the main body reading text, the image caption, the byline author, and the "back" link all fall **below WCAG 2.1 AA**. Because the CSS is shared, every finding below applies equally to all three pages unless stated otherwise.

---

## Shared findings (apply to all 3 pages — identical CSS)

### Critical
*None.*

### Major

**1. Body paragraph text fails AA contrast — 4.15:1**
`.article-content p` uses `color: var(--muted)` = `#8A7256` on `--bg` `#FAF4E9`.
Measured contrast **4.15:1**; size is 1.125rem/18px, weight 400 (normal text), which requires **4.5:1**. This is the bulk of the article's reading content, so it's the highest-impact issue. Darkening `--muted` to roughly `#7A6248` (≈4.6:1) or applying `--text` to body paragraphs would resolve it.

**2. "חזרה לחדשות" back link fails AA contrast — 3.60:1**
`.article-back` uses `color: var(--teal)` = `#0A8F8E` on cream. Measured **3.60:1**; 0.875rem/14px weight 500 needs 4.5:1. A darker teal (≈`#0B7D7C` or lower) fixes it.

**3. Image caption fails AA contrast — 4.15:1**
`.article-caption` = `#8A7256` on cream at 0.8125rem/13px. Same 4.15:1 as body text; being smaller makes it the more fragile of the two. Needs 4.5:1.

### Minor

**4. Byline author / separator low contrast — 4.15:1**
`.article-meta-author` and `.article-meta-sep` also use `--muted` (#8A7256) at 14px. Same 4.15:1 shortfall. (The date, `.article-meta-date`, uses `--text` and is fine at ~12.5:1.)

**5. No custom focus-visible styling**
There are zero `:focus` / `:focus-visible` rules in the stylesheet. Links (`.article-back`, `.article-tag`) and nav controls therefore rely on the browser's default focus ring. This technically passes (outlines are not suppressed), but a designed focus state that matches the warm palette would be more polished and more reliable across browsers.

**6. Invalid ARIA role on ticker**
`<div class="ticker-bar" role="marquee">` — `marquee` is not a valid ARIA role and will be reported by validators. Prefer removing it (or `role="status"` / `aria-live` if the ticker should be announced). Site-wide element, not specific to these pages.

### Polish

**7. Reading line-length slightly wide at desktop**
`.article-column` is `width: 820px`. Full-width body lines run ≈85–90 characters at 1440px — above the comfortable 60–75 target. It stays readable (and Hebrew is a touch more forgiving), but tightening the column to ~680–720px, or dropping body text to ~17px, would improve reading rhythm. Purely optional.

**8. Large hero image files (performance)**
`niva-amali-maoz.png` is 5.1 MB and `gallery/port-aerial.jpg` is 4.5 MB for a 440px-tall hero. (`chava-alberstein.jpg` is a healthy 480 KB.) Compressing/resizing the two heavy ones would noticeably speed up first paint. Not a visual defect.

---

## Cross-page consistency

The template itself is impressively consistent (identical CSS). The only drift is in per-page content, and it's mostly intentional. Two items look like unintended inconsistency:

### Minor

**A. Date format is inconsistent between the three pages**
- `article.html`: **"15 מאי 2026"** (day + month + year)
- `article-hava.html`: **"יוני 2026"** (month + year only)
- `article-port.html`: **"אפריל 2026"** (month + year only)

All three `<time>` elements carry a full `datetime` (e.g. `2026-06-10`), but two display only month+year while one shows the exact day. Pick one presentation format and apply it consistently.

**B. Hero `object-position` set on one page only**
`article.html`'s hero `<img>` has inline `object-position:center 20%`; `hava` and `port` have no `object-position` (default `center`). This is plausibly a deliberate per-photo crop adjustment (the Niva portrait needs the face higher), so it may be fine — just flagging that it's the one styling attribute that differs between the otherwise-identical hero markup.

### Polish

**C. Alt-text richness varies**
- `article.html`: `"ניבה עמלי מעוז — המנהלת האמנותית..."` — excellent, descriptive.
- `article-port.html`: `"נמל אילת — פסטיבל הג'אז"` — good.
- `article-hava.html`: `"חוה אלברשטיין"` — just the name; acceptable (identifies the subject) but thinner than its siblings. Consider matching the richer style, e.g. "חוה אלברשטיין מנגנת גיטרה על במה".

---

## Per-page notes

- **article.html** — Renders perfectly at 1440/768/390. Single-line title at desktop, clean hierarchy (h1 → 2× h2). Hero crop (`center 20%`) frames the portrait well. Heaviest hero asset (5.1 MB, see #8).
- **article-hava.html** — Identical template behavior; title wraps to two balanced lines. Hero photo loads and crops fine. Date shows month+year only (item A). Lightest, best-optimized image.
- **article-port.html** — Identical template behavior; longest title wraps to two lines cleanly. Landscape aerial hero looks great. Date shows month+year only (item A); hero is 4.5 MB (#8).

No visual clipping, overlap, z-index, or misalignment issues were observed on any page at any width. The mobile pass clearly held up: hero drops to 240px, tags wrap, and back-link/tag touch targets are padded to ~44px.

---

## Accessibility checklist summary

| Check | Result |
|---|---|
| Body text contrast | **Fail** — 4.15:1 (needs 4.5) |
| Caption contrast | **Fail** — 4.15:1 |
| Byline author contrast | **Fail** — 4.15:1 |
| Back-link contrast | **Fail** — 3.60:1 |
| Lead / title / h2 contrast | Pass — ~12.5:1 |
| Tag contrast | Pass — ~13.5:1 |
| Hero `alt` present & meaningful | Pass (hava slightly thin) |
| Heading hierarchy (h1 → h2) | Pass — logical, single h1 |
| Icon-control `aria-label` (hamburger) | Pass — `aria-label="תפריט ניווט"` + `aria-expanded` |
| Nav dropdown ARIA | Pass — `aria-haspopup` + `aria-expanded` |
| Touch targets ~44px | Pass — back link & tags padded on mobile |
| Visible focus state | Pass (default outline only; no custom style) |
| `role="marquee"` | **Invalid role** (minor) |
| Reading line length | ~85–90 chars desktop (slightly wide) |

---

## Verdict

**Good shape overall — ship-worthy after a small contrast fix.** The template is well-engineered, pixel-consistent across all three articles, responsive-solid, and aesthetically clean with a natural hero → title → byline → body flow. There are no breakages and no meaningful visual drift. The one thing worth fixing before calling it done is contrast: the muted brown used for body text/caption/byline (4.15:1) and the teal back link (3.60:1) don't meet WCAG AA, and since that CSS is shared, one small palette adjustment fixes all three pages at once. Everything else is minor consistency tidy-up (date format) or optional polish (line-length, image weight, focus styling).
