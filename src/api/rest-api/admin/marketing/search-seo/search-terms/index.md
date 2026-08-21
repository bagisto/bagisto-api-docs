---
outline: false
---

# Search Terms

A **search term** is a phrase a shopper typed into the storefront search box, recorded automatically each time it is used. Each row tracks how many times the term was searched and how many products that search returned, so you can see what shoppers are looking for. It mirrors the admin **Marketing → Search & SEO → Search Terms** screen.

## How search terms work

Search terms are **storefront-originated** — there is no create endpoint. Every storefront search adds or updates a row, so the list reflects real shopper demand.

- **`term`** — the text that was searched.
- **`results`** — how many products that search returned. Storefront-recorded and read-only — a low number on a high-`uses` term flags demand the catalog isn't meeting.
- **`uses`** — how many times the term was searched. Storefront-recorded and read-only. Sort by `uses` descending to surface the most popular searches.
- **`redirectUrl`** — an optional URL the storefront sends this query to instead of running a normal search (e.g. point "sale" straight at a landing page). This is the one targeting field admins set; `term` text can also be corrected.
- **`channel` / `locale`** — the channel and locale the term was recorded on. `channel` is a detail-only object (`{ id, code, name }`); it is `null` on list rows.

**What admins can change.** Only `term` and `redirect_url` are editable. The counts are owned by the storefront and never accepted on update. Terms can also be deleted individually or in bulk to clean up noise.

**Relation to other menus.** Search terms reveal the words shoppers use and where the catalog falls short. [Search Synonyms](/api/rest-api/admin/marketing/search-seo/search-synonyms/) act on that signal — grouping interchangeable words so a term with poor results still matches the right products.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/search-seo/search-terms-list) | `GET /api/admin/marketing/search-terms` |
| [Detail](/api/rest-api/admin/marketing/search-seo/search-terms-detail) | `GET /api/admin/marketing/search-terms/{id}` |
| [Update](/api/rest-api/admin/marketing/search-seo/search-terms-update) | `PUT /api/admin/marketing/search-terms/{id}` |
| [Delete](/api/rest-api/admin/marketing/search-seo/search-terms-delete) | `DELETE /api/admin/marketing/search-terms/{id}` |
| [Mass Delete](/api/rest-api/admin/marketing/search-seo/search-terms-mass-delete) | `POST /api/admin/marketing/search-terms/mass-delete` |

There is no create endpoint — search terms are recorded automatically by storefront searches.
