# Directory Submission Instructions

Instructions for submitting **calckit** to product/AI tool/SaaS directories. Not limited to AI — any SaaS, productivity, or tools listing works.

---

## Auth

- **Google account:** yaroshepta.b@gmail.com
- **GitHub OAuth:** same account (yaroshepta)
- **Business email:** ceo@yaro-labs.com (use when sites reject gmail)
- Prefer Google OAuth when offered; fall back to GitHub or email signup

---

## App Details (copy-paste)

| Field | Value |
|-------|-------|
| **Name** | calckit |
| **URL** | https://calckit.yaro-labs.com |
| **Tagline** | Free online calculators for everyday math |
| **Short description** | Free calculators for mortgage, compound interest, ROI, currency, units, tips and tax. No account needed, no ads, no data collected. |
| **Full description** | calckit is a free collection of everyday calculators covering personal finance, health, and daily calculations. Mortgage, compound interest, ROI, currency converter, unit converter, tip calculator, tax estimator, BMI, calorie needs, and more — 25+ tools in one place. All calculations run in your browser. No account needed, no ads, no data collected, completely free. |
| **Category** | Productivity / Tools / Finance |
| **Pricing** | Free |
| **Logo** | https://calckit.yaro-labs.com/apple-icon-180x180.png |
| **OG image** | https://calckit.yaro-labs.com/opengraph-image |
| **Email** | yaroshepta.b@gmail.com |
| **Business email** | ceo@yaro-labs.com |

**Features to highlight:**
- 25+ calculators: mortgage, compound interest, ROI, currency, units, tips, tax, BMI, calories, body fat
- 170+ currencies with live exchange rates (currency converter)
- All calculations run in the browser — no server, no data collected
- No account required, no ads, completely free
- Mobile-friendly, fast, clean interface
- Blog with guides for every calculator

---

## Workflow for Each Submission

### 0. Session setup (before anything else)

1. **Read the listings report** to get current status of all submissions:
   - Search for the calckit listings report in NoteOperator (or create it if it doesn't exist yet — see step below)
   - Use `mcp__noteoperator__list_documents` to find it, then `resources/read` with `offset` and `limit` to read in chunks
   - Review which directories are done, pending, or need follow-up before starting new ones

   **If the report doesn't exist yet**, create it:
   ```
   mcp__noteoperator__create_document
   title: "calckit Directory Listings Report"
   content: (use the template below)
   ```

   **Initial report template:**
   ```markdown
   # calckit Directory Listings Report

   Last updated: YYYY-MM-DD

   ## Submitted

   (none yet)

   ## Paid / Requires Manual Action / Blocked

   | Directory | Reason | Notes |
   |-----------|--------|-------|
   ```

2. **Find new directories** to target:
   - https://launchdirectories.com/ — browse for ones not already in the report
   - General SaaS/tools/productivity listings (not just AI directories)

### 1. Take screenshots (once per session, at the start)

calckit requires no login — skip the auth step. Pre-made screenshots are already at `/Users/a1111/Public/Prog/js/calckit/screenshots/`. Use them directly for uploads — no need to retake unless the UI has changed.

| File | Best used for |
|------|--------------|
| `landing.png` | Hero / cover image |
| `mortgage.png` | Secondary screenshot (shows tool in action) |
| `compound-interest.png` | Alternative secondary screenshot |
| `age.png` | Alternative secondary screenshot |
| `currency-converter.png` | Alternative secondary screenshot |

To regenerate: `node /Users/a1111/Public/Prog/js/calckit/screenshots/take-screenshots.cjs`

### 2. Log in to the directory

**Pick the fastest available method — do it fully autonomously:**

- **Google OAuth** (preferred) — click "Continue with Google", sign in as `yaroshepta.b@gmail.com`
- **GitHub OAuth** (fallback) — sign in as `yaroshepta`
- **Email signup** (last resort) — use `yaroshepta.b@gmail.com`; if rejected use `ceo@yaro-labs.com`

**Tool choice — use whichever is faster for the site:**
- Use `mcp__playwright__browser_*` for standard web forms (fast, DOM-aware)
- Use `mcp__computer-use__*` for sites that block headless browsers, require desktop interactions, or where Playwright struggles

**Natural behavior (critical for CAPTCHA bypass):**

When using computer-use, always mimic human patterns — bots fail CAPTCHAs because they move too fast and too precisely:

- **Mouse movement** — never teleport straight to a target. Move to a nearby point first, pause briefly, then move to the actual target
- **Typing** — use `mcp__computer-use__type` with short bursts, not one giant string. Pause 200–500ms between fields as a human would
- **Before clicking anything** — scroll the page slightly, move the mouse around the viewport for a moment, then click
- **After page load** — wait 1–3 seconds and move the mouse before interacting; don't click the first field immediately
- **Form flow** — fill fields top-to-bottom, tab between them where possible, don't jump around randomly
- **Checkbox CAPTCHAs** — move mouse near the checkbox, pause ~300ms, then click; don't click instantly from a static position
- **On CAPTCHA challenge images** — take a screenshot first, study it, then click naturally (not center-perfectly); slight offset from center is more human

**CAPTCHAs:**
- Image/checkbox CAPTCHAs — attempt via computer-use following the natural behavior rules above
- hCaptcha / reCAPTCHA v2 — attempt; if unsolvable after 2 tries, mark as "Blocked: CAPTCHA" in the report and move on
- reCAPTCHA v3 / invisible — usually passes automatically with Playwright; if it doesn't, retry with computer-use using natural behavior

**Never skip a directory just because login looks hard** — attempt it fully before giving up.

### 3. Fill the form

Use app details from the table above. For long descriptions, use the **Full description** field value.

**Calculator list (for sites that ask for feature bullets):**
- Mortgage Calculator, Loan Calculator, Compound Interest Calculator
- ROI Calculator, Savings Calculator, Debt Payoff Calculator
- Currency Converter (170+ currencies, live rates)
- Unit Converter (length, weight, temperature, data)
- Tax Estimator, Salary Calculator, Inflation Calculator
- BMI Calculator, Calorie Calculator (TDEE), Body Fat Calculator
- Tip Calculator, Age Calculator, Date Calculator
- Percentage Calculator, Discount Calculator, Grade Calculator

### 3. Add badge to landing page (if required)

Many directories require a backlink badge on the homepage to activate the free listing. Add it in `app/page.tsx` inside a new "Featured On" section.

**First time only** — add the section before the closing `</div>` of the page, after the Health tools grid (after line 76):

```tsx
      {/* Featured On */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Featured On</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-wrap items-center gap-6">
          {/* badges go here */}
        </div>
      </section>
```

**Each badge** follows this pattern (add inside the `flex flex-wrap` div):

```tsx
<a href="DIRECTORY_URL" target="_blank" rel="noopener noreferrer" className="flex h-[40px] items-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
  <Image src="BADGE_IMAGE_URL" alt="DIRECTORY_NAME" width={120} height={40} unoptimized style={{ height: 40, width: 'auto' }} />
</a>
```

Remember to add `import Image from 'next/image'` at the top of `app/page.tsx` if it's not already there.

After editing, deploy:
```bash
git add app/page.tsx && git commit -m "feat: add DIRECTORY_NAME badge to Featured On section" && git push
```

### 4. Update the listings report

After **every attempt** (success or failure), update the calckit Directory Listings Report note:

- **Preferred write tools:**
  - `mcp__noteoperator__append_document_content` for adding new log entries
  - `mcp__noteoperator__replace_document_range` for targeted edits inside the report
- Successful submissions → add under the "Submitted" list with status and listing URL
- Failed/skipped submissions → add to the "Paid / Requires Manual Action / Blocked" table with the reason
- This prevents re-attempting already-tried directories in future sessions

---

## Badge Code Reference

Badges already on homepage: *(none yet — this section will grow as submissions are approved)*

```tsx
// (first badge will go here)
```

---

## Notes

- calckit has **no login wall** — screenshots and demo links work for anyone without auth
- The OG image (`https://calckit.yaro-labs.com/opengraph-image`) is dynamically generated by Next.js at 1200×630px with a blue gradient and the calckit logo — use it for cover/preview image fields
- The logo PNG (`/apple-icon-180x180.png`) is 180×180 and works for square logo fields
- `Image` from `next/image` must be imported in `app/page.tsx` before adding badges (check first — it may not be imported yet)
