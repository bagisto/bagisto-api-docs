---
outline: false
---

# Marketing (Admin)

The Marketing menu spans three groups — **Promotions** (discount rules + coupons), **Communications** (email templates, events, campaigns, newsletter subscribers), and **Search & SEO** (sitemaps, URL rewrites, search terms, search synonyms). Most are straight CRUD; this page covers the parts with real gotchas — the discount-rule reindex, the campaign send, coupon generation, and sitemap generation.

## Agent-ask inputs

- **Integration token** — ask the user; send as `Authorization: Bearer <id>|<token>`. Each action is permission-gated (else `403`).
- **Server URL** — ask the user for their Bagisto server's base URL (e.g. `https://store.example.com`) and prefix every endpoint path with it. Never assume localhost or a demo domain.

## Promotions

Two discount-rule types plus coupons:

- **[Catalog Rules](/api/rest-api/admin/marketing/promotions/catalog-rules-create)** — apply a discount to matching products in the catalog (price shown pre-cart). CRUD + mass-delete; `channels` + `customer_groups` + `conditions` JSON.
- **[Cart Rules](/api/rest-api/admin/marketing/promotions/cart-rules-create)** — discount applied in the cart; CRUD + copy + mass-delete. `coupon_type` 0 (no coupon) / 1 (specific coupon).
- **Cart Rule Coupons** (sub-resource of a cart rule) — [single create](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-create), [bulk generate](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-generate), [mass-delete](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-mass-delete).

### Gotcha: catalog-rule create/update triggers a full price reindex

Creating or updating a catalog rule fires a **price-index recalculation across every affected product**. That job is designed to run **out-of-band on a queue worker** — but on a store running `QUEUE_CONNECTION=sync` it runs **inline inside the request** and can take tens of seconds on a large catalog, blowing past the HTTP timeout and returning a generic 500 **even though the rule was already saved** (query it back and it's there). This is not an API bug — it's the store's queue configuration.

**Handle it:** the store should run `QUEUE_CONNECTION=redis` (or `database`) with a persistent `queue:work` worker, so create returns `201` instantly and the reindex runs in the background. If the client sees a timeout, re-query the rule ([detail](/api/rest-api/admin/marketing/promotions/catalog-rules-detail)) before retrying — a retry would create a duplicate.

### Coupon bulk-generate

`cart-rule-coupons/generate` takes `{ length (4–30), format (alphabetic|alphanumeric|numeric), prefix?, suffix?, coupon_qty (1–100) }` and returns the generated codes. Use it to hand out unique codes for a specific-coupon cart rule.

## Communications

- **[Email Templates](/api/rest-api/admin/marketing/communications/templates-create)** — reusable HTML bodies (`status` active/inactive/draft). CRUD.
- **[Events](/api/rest-api/admin/marketing/communications/events-create)** — scheduled marketing events (a date-triggered anchor for campaigns). CRUD.
- **[Campaigns](/api/rest-api/admin/marketing/communications/campaigns-create)** — an email blast to a customer group. CRUD + **[send](/api/rest-api/admin/marketing/communications/campaigns-send)**.
- **[Newsletter Subscribers](/api/rest-api/admin/marketing/communications/subscribers-list)** — read + toggle subscription + delete (subscriptions originate on the storefront; no admin create).

### Gotcha: campaign send

`POST /api/admin/marketing/campaigns/{id}/send` triggers the blast **now** — it mirrors the scheduled `campaign:process` for a single campaign but **skips the event date gate** (manual send = send now). Recipients resolve from the campaign's customer group: subscribed customers, or the guest subscribers list when the group is `guest`; the list is de-duped and each email is **queued**. An **inactive campaign (`status=0`) is refused with `422`**. Zero recipients is success, not an error. Returns `{ campaignId, queued, message }`.

## Search & SEO

- **[Sitemaps](/api/rest-api/admin/marketing/search-seo/sitemaps-create)** — CRUD + **[generate](/api/rest-api/admin/marketing/search-seo/sitemaps-generate)**.
- **[URL Rewrites](/api/rest-api/admin/marketing/search-seo/url-rewrites-create)** — 301/302 redirects; CRUD + mass-delete.
- **[Search Terms](/api/rest-api/admin/marketing/search-seo/search-terms-list)** — storefront search analytics (read + edit redirect + delete; no create).
- **[Search Synonyms](/api/rest-api/admin/marketing/search-seo/search-synonyms-create)** — widen search matches; CRUD + mass-delete.

### Gotcha: sitemap generate is synchronous

`POST /api/admin/marketing/sitemaps/{id}/generate` runs the generation **synchronously** (the admin panel queues it) so the response carries the generated file paths + `generatedAt` immediately. For a very large catalog this can take a while. If `general.sitemap.settings.enabled` is off the job returns early — the response still succeeds but `indexFile` / `generatedSitemaps` stay empty (that usually means the config flag, not a failure).

## GraphQL notes

Standard admin GraphQL: list queries use cursor pagination + explicit filter args; **mass-actions and action mutations** (campaign send, coupon generate, sitemap generate, mass-delete) return result objects — select the documented result fields, not a generic `id` (see the [result-field rule](/api/workflows/admin/#graphql-the-must-know-rules)).

## Status codes to handle

`200/201` success · `401` unauthenticated · `403` permission · `404` not found · `422` validation (duplicate coupon code, percent > 100, incoherent dates, inactive campaign, bad sitemap name/path) · `500` catalog-rule reindex timeout on a `sync` queue (rule is saved — re-query, don't retry).
