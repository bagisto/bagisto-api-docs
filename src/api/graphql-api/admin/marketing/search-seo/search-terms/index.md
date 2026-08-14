---
outline: false
---

# Search Terms

A **search term** is a phrase a shopper typed into storefront search, recorded
automatically every time it is used. It mirrors the admin **Marketing → Search &
SEO → Search Terms** screen, where you can review what people are looking for and
optionally redirect a query to a fixed URL.

## How a search term works

Search terms are not created by hand — the storefront records each search and
tracks how it performed.

- **`term`** — the exact phrase the shopper searched for.
- **`results`** — how many products the search returned. Recorded automatically;
  read-only.
- **`uses`** — how many times the term has been searched. Recorded automatically;
  read-only. Sort by `uses` descending to surface the most-searched phrases.
- **`redirectUrl`** — an optional URL the search redirects to. Set this to send a
  popular query straight to a chosen page (for example, a curated landing page).
- **`channel` / `locale`** — the storefront context the search was recorded in.
  `channel` is a detail-only object (`{ id, _id, code, name }`); it is `null` on
  list rows.

**What you can edit.** Only `term` and `redirectUrl` are editable. The recorded
metrics (`results`, `uses`) reflect real shopper behaviour and cannot be changed.
There is **no create** operation — terms originate from the storefront.

**Relation to other menus.** Search terms reveal what shoppers want and where
search falls short. Phrases that return few or no results are good candidates for
**Search Synonyms**, which widen storefront search recall so those queries match
more products.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/search-seo/search-terms-list) | `adminMarketingSearchTerms` query |
| [Detail](/api/graphql-api/admin/marketing/search-seo/search-terms-detail) | `adminMarketingSearchTerm` query |
| [Update](/api/graphql-api/admin/marketing/search-seo/search-terms-update) | `updateAdminMarketingSearchTerm` mutation |
| [Delete](/api/graphql-api/admin/marketing/search-seo/search-terms-delete) | `deleteAdminMarketingSearchTerm` mutation |
| [Mass Delete](/api/graphql-api/admin/marketing/search-seo/search-terms-mass-delete) | `createAdminMarketingSearchTermMassDelete` mutation |
