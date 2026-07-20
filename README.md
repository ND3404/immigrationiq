# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Visa Bulletin auto-update

`src/data/visaBulletin.js` is refreshed automatically by
`.github/workflows/update-visa-bulletin.yml` (script:
`scripts/fetch-visa-bulletin.js`). It runs daily on days 9–16 of each month —
the window in which the State Department publishes the next month's bulletin —
and can be triggered manually from the Actions tab.

### The fetch chain: proxy → archive → fail

`travel.state.gov` is behind Cloudflare, which serves a 403 challenge to cloud
egress IPs (GitHub Actions, most datacenters). The block is IP reputation, not
headers or TLS — a real headless browser from a runner is rejected identically.
So the fetcher does **not** hit the origin directly. For each candidate month it
tries, in order:

1. **ScraperAPI (primary).** `http://api.scraperapi.com/?api_key=…&url=…` routes
   the request through a residential IP Cloudflare allows. ScraperAPI passes the
   upstream status through:
   - `200` → parse and save, tagged `fetchSource: 'scraperapi'`.
   - `404` → the month isn't published yet → try the next candidate month.
   - anything else (incl. ScraperAPI's own `401`/`403`/`429`/`500` for a bad key
     or exhausted quota) → fall through to Wayback.
2. **Wayback Machine (fallback).** Queries the CDX API for the newest `200`
   capture of the target URL, then fetches that snapshot's raw bytes
   (`/web/<ts>id_/<url>`, no toolbar, parser works unchanged). Saved tagged
   `fetchSource: 'wayback'` with `waybackCaptureDate`. Wayback lags the State
   Dept by days and only holds months it crawled before Cloudflare began
   blocking its crawler too, so it can legitimately have nothing for the current
   month.
3. **Hard fail.** If both paths fail for every candidate, the script exits
   non-zero and the workflow goes red (and emails). A genuine `404`-only outcome
   exits `0` with a "not yet published" notice.

The run log states which path won (`✓ fetched via ScraperAPI` /
`✓ fetched via Wayback Machine`), so you can see over time whether the proxy is
holding up or Wayback is covering for it.

A separate staleness alarm (`scripts/check-bulletin-freshness.js`) fails the run
if the committed data is more than 40 days old — one publish cycle of slack —
so a fetcher that silently stops working surfaces within ~10 days.

### The `SCRAPER_API_KEY` secret

The proxy key lives in the repo's GitHub Actions secrets as `SCRAPER_API_KEY`
(**Settings → Secrets and variables → Actions**). It is never committed. Full
signup and setup steps are in [`docs/scraperapi-setup.md`](docs/scraperapi-setup.md).
Running the script locally without the key set simply skips the proxy and goes
straight to Wayback — handy for testing the fallback.

### Monitoring free-tier usage

ScraperAPI's free tier is **1,000 requests/month**. This workflow uses **one
request per run** — roughly 8 scheduled runs a month plus the odd manual
trigger, so ~1–3% of the quota. Check "Requests used this month" on the
[ScraperAPI dashboard](https://dashboard.scraperapi.com/) occasionally.

**If usage ever approaches 1,000:** first check nothing else is reusing the key
and the workflow schedule hasn't been widened. The system degrades safely — once
the proxy starts returning errors (a `403` for exhausted credits), the fetcher
automatically falls back to Wayback, so history keeps working even over-quota;
only same-day fetches of a brand-new bulletin are affected. If the higher volume
is legitimate, upgrade the ScraperAPI plan and update the same secret in place
(use **Update**, don't delete-and-recreate).

### "Data as of …" note on the page

When the displayed bulletin was sourced from Wayback **and** its capture is more
than 3 days old, `/visa-bulletin` shows a small muted line above the tables:
_"Bulletin data as of [date]. Verifying with the U.S. State Department. Refresh
for updates."_ Live proxy data, and archive data 3 days old or less, show
nothing. This is driven by the `fetchSource` / `waybackCaptureDate` fields.
