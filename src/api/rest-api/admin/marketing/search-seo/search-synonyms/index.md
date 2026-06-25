---
outline: false
---

# Search Synonyms

A **search synonym** is a group of interchangeable search words. When a shopper searches for any word in the group, the storefront also matches products containing the other words — so a search for "shirt" still finds products tagged "tshirt" or "tee". It mirrors the admin **Marketing → Search & SEO → Search Synonyms** screen.

## How search synonyms work

A synonym group widens storefront search recall by treating several words as equivalent.

- **`name`** — a label for the group, used only to identify it in the admin list.
- **`terms`** — a comma-separated list of the interchangeable words (e.g. `shirt,tshirt,tee`). A search for any one of them matches products containing any of the others.

**What it does for search.** Without a synonym group, a search only matches the exact words typed. Grouping words together means a shopper who searches "tee" still sees every shirt, even if the product copy never uses the word "tee" — recovering sales that would otherwise return no results.

**Relation to other menus.** [Search Terms](/api/rest-api/admin/marketing/search-seo/search-terms/) reveal the words shoppers actually use and where the catalog returns too few results. Search Synonyms act on that signal — grouping the searched word with the words the catalog does use, so a low-result term starts matching the right products.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/search-seo/search-synonyms-list) | `GET /api/admin/marketing/search-synonyms` |
| [Detail](/api/rest-api/admin/marketing/search-seo/search-synonyms-detail) | `GET /api/admin/marketing/search-synonyms/{id}` |
| [Create](/api/rest-api/admin/marketing/search-seo/search-synonyms-create) | `POST /api/admin/marketing/search-synonyms` |
| [Update](/api/rest-api/admin/marketing/search-seo/search-synonyms-update) | `PUT /api/admin/marketing/search-synonyms/{id}` |
| [Delete](/api/rest-api/admin/marketing/search-seo/search-synonyms-delete) | `DELETE /api/admin/marketing/search-synonyms/{id}` |
| [Mass Delete](/api/rest-api/admin/marketing/search-seo/search-synonyms-mass-delete) | `POST /api/admin/marketing/search-synonyms/mass-delete` |

All Search Synonyms endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
