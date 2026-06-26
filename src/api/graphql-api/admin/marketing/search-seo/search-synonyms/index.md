---
outline: false
---

# Search Synonyms

A **search synonym** is a group of interchangeable search words. When a shopper
searches for any word in the group, the storefront also matches products that
contain the others. It mirrors the admin **Marketing → Search & SEO → Search
Synonyms** screen, and is the main lever for widening storefront search recall.

## How a search synonym works

A synonym group has just two parts: a label and the words it ties together.

- **`name`** — a label for the group, used only in the admin list (for example,
  `shirt-group`). It does not affect search behaviour.
- **`terms`** — a comma-separated list of words that are treated as equivalent
  (for example, `shirt,tshirt,tee`). A search for any one of them also returns
  products matching the others, so a query for `shirt` finds items described as
  `tshirt` or `tee`.

**What it does on the storefront.** Synonyms expand each search query before it
runs, so shoppers find relevant products even when their wording differs from the
product copy. This raises recall (how many relevant results appear) without you
having to re-tag products.

**Relation to other menus.** Synonyms address the gaps revealed by **Search
Terms** — phrases shoppers typed that returned few or no results. Reviewing the
most-used low-result terms tells you which synonym groups to create.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/search-seo/search-synonyms-list) | `adminMarketingSearchSynonyms` query |
| [Detail](/api/graphql-api/admin/marketing/search-seo/search-synonyms-detail) | `adminMarketingSearchSynonym` query |
| [Create](/api/graphql-api/admin/marketing/search-seo/search-synonyms-create) | `createAdminMarketingSearchSynonym` mutation |
| [Update](/api/graphql-api/admin/marketing/search-seo/search-synonyms-update) | `updateAdminMarketingSearchSynonym` mutation |
| [Delete](/api/graphql-api/admin/marketing/search-seo/search-synonyms-delete) | `deleteAdminMarketingSearchSynonym` mutation |
| [Mass Delete](/api/graphql-api/admin/marketing/search-seo/search-synonyms-mass-delete) | `createAdminMarketingSearchSynonymMassDelete` mutation |

All Search Synonyms operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
