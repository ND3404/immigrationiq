# ScraperAPI setup — one-time, ~5 minutes

The visa-bulletin fetcher can't reach `travel.state.gov` directly from GitHub
Actions: the site is behind Cloudflare, which serves a 403 "Attention
Required!" challenge to GitHub's cloud IP ranges. ScraperAPI routes the request
through a residential/clean IP that Cloudflare lets through. This guide gets you
an API key and wires it into GitHub so the workflow can use it.

You only do this once. When you're done, come back and tell me **"key is
added"** and I'll implement the fetch code.

---

## 1. Create a free ScraperAPI account

1. Go to **https://www.scraperapi.com/**
2. Click **Start Free Trial** (or **Sign Up**) in the top-right.
3. Sign up with your email (or Google). No credit card is required for the
   free tier.
4. Confirm your email if they send a verification link.

## 2. Find your API key

1. After signing in you land on the **Dashboard** (https://dashboard.scraperapi.com/).
2. Near the top of the dashboard there's a box labelled **API Key** (sometimes
   under a "Get started" / "Your API Key" heading).
3. It's a ~32-character string of letters and numbers. Click the **copy**
   icon next to it.

   > Treat this like a password. Anyone with it can spend your request quota.
   > Don't paste it into chat, commit it, or put it in a file — it goes only
   > into GitHub Secrets (next step).

## 3. Add it to GitHub Secrets as `SCRAPER_API_KEY`

1. Go to the repo on GitHub:
   **https://github.com/ND3404/immigrationiq**
2. **Settings** (top nav) → in the left sidebar, **Secrets and variables** →
   **Actions**.
   Direct link: https://github.com/ND3404/immigrationiq/settings/secrets/actions
3. Click **New repository secret**.
4. Fill in:
   - **Name:** `SCRAPER_API_KEY`  ← must match exactly, case-sensitive
   - **Secret:** paste the key from step 2
5. Click **Add secret**.

You should now see `SCRAPER_API_KEY` listed under "Repository secrets" (the
value is hidden — that's expected; GitHub never shows it again). If you ever
need to change it, use **Update**, not delete-and-recreate.

## 4. Free-tier limits — and when you'd need to upgrade

| | Free tier |
|---|---|
| Requests / month | **1,000** |
| Concurrent requests | 5 |
| JS rendering / premium proxies | limited, not needed here |
| Credit-card required | No |

**Our expected usage: ~30 requests/month.** The workflow runs once a day only
on days 9–16 of each month (8 scheduled runs), plus the occasional manual
trigger. Each run makes **one** ScraperAPI request. So we use roughly 8–30 of
the 1,000 — about 1–3% of the free tier. There is a wide margin.

**When you'd need to upgrade:** essentially never for this use. You'd only hit
the ceiling if the workflow got changed to run far more often, or the key got
reused by another project. If you ever see the dashboard's usage bar climbing
toward 1,000, that's the signal to investigate — not to reflexively upgrade.

**Monitoring usage:** the ScraperAPI dashboard shows a "Requests used this
month" figure. Glancing at it every so often is enough.

> Note on the endpoint: ScraperAPI's documented API endpoint is plain `http://`
> (`http://api.scraperapi.com/`). That's fine — TLS still protects the
> *upstream* leg to travel.state.gov, and the API key travels over GitHub's
> network to ScraperAPI, not over the public internet in a URL a third party
> sees. We pass the key from the `SCRAPER_API_KEY` secret, never hardcoded.

---

## When the key is in

Reply **"key is added"** and I'll build the fetch chain:
**ScraperAPI (primary) → Wayback Machine (fallback) → hard fail**, plus the
staleness tagging and docs. I won't touch the fetch code before then.
