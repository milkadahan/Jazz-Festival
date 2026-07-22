# Design & Accessibility QA — Group 1

**Pages audited:** `index.html`, `lineup.html`, `past-artists.html`, `show.html`
**Widths tested:** 1440px (desktop), 768px (tablet), 390px (mobile) — via headless Chrome with real device-metrics emulation + CDP measurement.
**Scope:** audit only, no files changed. This is a *design polish* pass, not a responsiveness pass.
**Date:** 2026-07-20

---

## Method notes (so findings are trustworthy)

- **No real horizontal overflow anywhere.** At a true 390px viewport, `scrollWidth == innerWidth == 390` on all four pages (verified via CDP `Emulation.setDeviceMetricsOverride`). The apparent right-edge clipping you get from a plain `--window-size=390` screenshot is the known headless min-viewport (~500px) false positive — the only elements that exceed the viewport are the intentional `.ticker-track` marquees, which are clipped by `overflow:hidden` by design. So: no clipping/overlap bugs at any width.
- Contrast ratios below are computed from the actual CSS hex values (WCAG relative-luminance formula), not eyeballed.

---

## SYSTEMIC ISSUES (affect the whole group)

These recur on every page, so they're stated once here and referenced per-page.

### Critical — `--muted` (#8A7256) body text fails WCAG AA
Confirmed the sibling-audit finding, quantified against every background it lands on:

| Background | Ratio | AA body (4.5:1) |
|---|---|---|
| `--bg` #FAF4E9 | **4.15:1** | ✗ fail |
| `--bg2` #F3E9D6 | **3.77:1** | ✗ fail |
| `--card-bg` #FFFDF8 | **4.47:1** | ✗ fail (marginal) |

`--muted` is used as real body/subtitle/caption text — **index: 22 occurrences, lineup: 13, past-artists: 10, show: 3.** None reach 4.5:1. Fix centrally: darken `--muted` to roughly **#6F5A42** (≈5.9:1 on `--bg`) — one variable change lifts all four pages.

### Major — Brand accent colors used as small text fail AA
Used for stage labels, "מידע נוסף" links, times, badges (all normal-size, not "large"):

| Color | On `--bg` | Verdict |
|---|---|---|
| `--orange` #E0560B | 3.48:1 | ✗ (labels, links, stat numbers) |
| `--teal` #0A8F8E | 3.60:1 | ✗ ("Blue Dome", teal times) |
| `--pink` #E0568F | 3.25:1 | ✗ |
| `--red` #D62246 | 4.59:1 | ✓ passes |

`--red` is the only accent safe as body text on cream. Where these appear as **large bold headings** they're acceptable; where they're small labels/links they fail.

### Major — `--yellow` (#E0A800) as text is unreadable
**1.96:1 on `--bg`, 2.11:1 on `--card-bg`** — fails even the 3:1 large-text bar. Used for text in `.show-block.yellow .show-time` (index) and `.lineup-stage.stage-4` label (lineup). This yellow should never be a text color on a light surface; reserve it for fills/graphics only, or darken drastically (e.g. #9A7400 ≈ 4.6:1) for the label use.

### Minor — white-on-orange button label is borderline
`--on-accent` (#FFFDF8) on solid `--orange` = **3.75:1**. Buttons use `--btn-gradient` (orange→red); the red end is 4.95:1 so the mid/leading edge is ~4.3:1 — under 4.5 for the normal-weight portions of "כרטיסים". Nudging the gradient start slightly darker (e.g. #C94A08) clears it.

### Positives (whole group)
- Global `:focus-visible` outline rule present (index L129), plus a skip-link (`.skip-link:focus`, L126). Keyboard focus is handled.
- Hamburger is a real `<button>` with `aria-label="תפריט ניווט"` **and** `aria-expanded` that is toggled in JS (L3642/3694/3701). The "מידע חשוב" dropdown has `aria-haspopup`/`aria-expanded` too. Icon-only-control a11y is done correctly.
- Every `<img>` on all four pages has an `alt` attribute — **zero missing alt.**

---

## index.html

**Overall: strong.** Hero is striking, sections read cleanly, hierarchy is correct, nothing breaks at any width.

### Critical
- Heaviest `--muted` user (22 instances: hero subtitle L787, filter labels, stat labels, ticker) — see systemic. Highest-impact page for the `--muted` fix.

### Major
- `--yellow` show-time text in `.show-block.yellow .show-time` (L1225) — 2.1:1, effectively invisible-grade contrast (systemic yellow issue).

### Minor
- **Typography-scale outlier:** `.section-title` here is `clamp(2rem, 5vw, 3.5rem)` (up to 56px) — the largest `.section-title` in the group (past-artists uses the *same class name* at up to 38px). Same class, different visual weight across pages — see cross-page note.
- **Empty `alt=""` on content-ish images:** `hero-poster.jpg` and `banner2.png` (the hotel/promo banner) carry `alt=""`. `corner-subtract.svg` empty-alt is correct (decorative), but verify the promo banner isn't conveying text-only info that's now lost to screen readers. If it has baked-in text, give it a real alt.

### Polish
- The large `01/02/03`-style ordinal numerals compute to a transparent/near-transparent fill (gradient-clipped) and read as very low-contrast light warm-gray. They're decorative and redundant with position, so it's acceptable, but they're the one spot that looks faint rather than intentional.

---

## lineup.html

**Overall: very polished.** The best-structured page — day-tab filter, stage grouping, and the numbered event cards are clean and scan well. Day tabs wrap gracefully into rows at 390px; cards stack correctly. No breakage.

### Major
- Stage section labels: "Main Stage" (`--orange` 3.48:1), "Blue Dome" (`--teal` 3.60:1), and especially `.lineup-stage.stage-4` (`--yellow` ~2:1) fail contrast — systemic accent/yellow issue. "Red Tent" (`--red`) passes.
- `--muted` on event descriptions/meta (13 instances) — systemic.

### Minor
- **Hero-title scale outlier:** `.page-hero-title` = `clamp(3rem, 7vw, 6rem)` (up to **96px**) — the largest interior-page hero in the group, vs past-artists' 72px for the same structural role. See cross-page note.
- Ticket pill (`.nav-btn-tickets`) measures **40px** tall on mobile — just under the ~44px touch-target guideline. Minor; bump to 44px.

### Positive
- Section rhythm, card padding, and the `01/02` numbering are consistent within the page.

---

## past-artists.html

**Overall: polished and characterful.** The dark hero → timeline → artist-name chips → dark footer flow is cohesive and reads as intentional. Chips wrap nicely at 390px; timeline arrows are present. No breakage at any width.

### Major
- `.section-title` subtitle uses `--muted` (L400) and the artist-era/meta text relies on `--muted` (10 instances) — systemic.

### Minor
- **Hero-title scale outlier (other direction):** `.page-hero-title` = `clamp(2.4rem, 6vw, 4.5rem)` (up to **72px**) vs lineup's 96px. Two interior pages with the same "big page title" role at meaningfully different max sizes.
- `.section-title` = `clamp(1.6rem, 3vw, 2.4rem)` (up to 38px) vs index's 56px for the identically-named class.

### Positive
- Fewest contrast liabilities of the light pages. Timeline node + year-label alignment holds across widths. The dark hero gives white text 12:1+ — very readable.

---

## show.html (event detail)

**Overall: clean and well-composed** (B&W artist hero with name overlay, description, colored-border show cards, dark footer). Layout is solid at all three widths and there's no overflow (scrollWidth 1425 < 1440 at desktop). Note it correctly redirects to `lineup.html` when opened without a valid `?artist=`/`?show=` param — that's intended, not a bug.

### Major — page has NO heading structure
The page renders **zero `<h1>`–`<h6>` elements.** The main title "SHALOSH" is a `<div class="show-artist-name-hero" id="showArtistNameHero">` (L327), the subtitle is a `<div>`, and the stage labels ("MAIN STAGE", "RED TENT") are also non-heading elements. Consequences:
- No `<h1>` → the page's primary subject is absent from the accessibility/heading tree (WCAG 1.3.1 Info & Relationships; 2.4.6 Headings & Labels; and a landmark/SEO best practice).
- Screen-reader users navigating by heading get nothing on this page.
- **Fix:** make `#showArtistNameHero` an `<h1>` (keep the class/styling), and promote the per-show stage labels to `<h2>`/`<h3>`. This is the single most important item in this group.

### Major
- "MAIN STAGE" label uses `--orange` (3.48:1) — systemic accent-as-text fail. "RED TENT" (`--red`) passes.
- Description/meta text via `--muted` (3 instances) — systemic.

### Minor
- Hero title `.show-artist-name-hero` = `clamp(1.5rem, 4.5vw, 2.7rem)` (max ~43px). It's overlaid on the photo (different context), so it needn't match the other heroes exactly, but it's the smallest "page title" in the group — worth a deliberate check that it feels like a peer of the lineup/past-artists heroes.

### Positive
- The colored left-border show cards, date/time formatting, and "כרטיסים" CTAs are consistent and attractive. Mobile stacks cleanly.

---

## Cross-page consistency (sizing)

The one place cohesion slips is **the type scale for equivalent roles**:

| Role | index | lineup | past-artists | show |
|---|---|---|---|---|
| Big page/hero title | custom (largest) | `.page-hero-title` **≤96px** | `.page-hero-title` **≤72px** | `.show-artist-name-hero` **≤43px** |
| `.section-title` | **≤56px** | (n/a same use) | **≤38px** | (uses own classes) |

Same structural roles resolve to noticeably different maximum sizes, and `.section-title` is one shared class name defined at different sizes per page. It's not broken, but it makes the set feel slightly less like one system. Recommend consolidating hero-title and section-title into shared tokens/clamps so a page title carries the same visual weight everywhere.

Footer (injected by `footer.js`, dark `#2d2726`): most footer text passes (body links `rgba(230,216,214,0.65)` = 5.37:1), but the lower-opacity secondary text (`0.5` = 3.83:1, `0.45` copyright = 3.37:1) and the teal policy links (`--teal` on dark = 3.73:1) fall under 4.5:1. Same accent/muted theme, dark variant.

---

## Overall verdict — Group 1

This group is **in genuinely good shape design-wise** — polished heroes, coherent layout, correct heading hierarchy (except show.html), clean responsive behavior with no real clipping or overflow at any width, and above-average keyboard/ARIA hygiene (skip-link, focus-visible, proper hamburger + dropdown states, full alt coverage). The work reads as professional.

Two things hold it back from "ship-clean":
1. **Color contrast is the pervasive weakness** — `--muted` body text, brand accents used as small text, and especially `--yellow`-as-text all fail AA. Most of it is fixable by darkening 2–3 CSS variables centrally.
2. **show.html has no headings at all** — a real accessibility gap that needs an `<h1>` (and `<h2>`s), independent of the color work.

Fix those (plus optionally unifying the hero/section type scale and bumping the 40px ticket pill to 44px) and all four pages clear AA and feel like one intentional system.
