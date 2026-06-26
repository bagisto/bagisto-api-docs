---
outline: false
---

# URL Rewrites

A **URL rewrite** sends a shopper who requests one path to a different target path — a manual redirect you control. It mirrors the admin **Marketing → Search & SEO → URL Rewrites** screen.

## How a URL rewrite works

A rewrite maps a **source path** to a **target path** for a given storefront entity and locale.

- **What it points at** — `entityType` ties the rewrite to a `product`, `category`, or `cms_page`. `requestPath` is the path a shopper requests; `targetPath` is where they end up.
- **How it redirects** — `redirectType` is either `301` (permanent) or `302` (temporary). A `301` tells search engines the move is permanent and transfers ranking; a `302` signals a temporary detour.
- **Where it applies** — `locale` scopes the rewrite to a single storefront locale.

**Why it matters.** When a slug changes — a renamed product, a moved category, an updated CMS page — old bookmarks and search-engine links would otherwise break. A rewrite keeps those links alive by forwarding them to the new path.

**Relation to other menus.** Bagisto also creates rewrites automatically when a slug changes. The entries here are the ones you add or adjust by hand, complementing those automatic rewrites.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/search-seo/url-rewrites-list) | `GET /api/admin/marketing/url-rewrites` |
| [Detail](/api/rest-api/admin/marketing/search-seo/url-rewrites-detail) | `GET /api/admin/marketing/url-rewrites/{id}` |
| [Create](/api/rest-api/admin/marketing/search-seo/url-rewrites-create) | `POST /api/admin/marketing/url-rewrites` |
| [Update](/api/rest-api/admin/marketing/search-seo/url-rewrites-update) | `PUT /api/admin/marketing/url-rewrites/{id}` |
| [Delete](/api/rest-api/admin/marketing/search-seo/url-rewrites-delete) | `DELETE /api/admin/marketing/url-rewrites/{id}` |
| [Mass Delete](/api/rest-api/admin/marketing/search-seo/url-rewrites-mass-delete) | `POST /api/admin/marketing/url-rewrites/mass-delete` |

All URL Rewrites endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
