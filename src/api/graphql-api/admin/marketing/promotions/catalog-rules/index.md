---
outline: false
---

# Catalog Rules

A **catalog rule** automatically lowers a product's price store-wide — before the product is ever added to a cart. The shopper just sees a reduced price on the product and category pages; there is no coupon and no minimum-cart requirement. It mirrors the admin **Marketing → Promotions → Catalog Rules** screen.

## How a catalog rule works

A rule has three parts: **who it applies to**, **when it applies**, and **what it does to the price**.

- **Who** — `channels` (which storefront channels) and `customerGroups` (e.g. general, wholesale). A rule only fires for shoppers in a matching channel + group. On the detail query these are **field-selectable connections** of `{ id, _id, code, name }` — sub-select `edges { node { id _id code name } }`.
- **When** — an optional date window (`startsFrom` / `endsTill`) and a set of `conditions` (product attribute filters such as *category = Summer* or *brand = Acme*). `conditionType` decides whether **all** conditions must match (`1`) or **any** (`0`).
- **What** — the `actionType` + `discountAmount` rewrite the price:

| `actionType` | Effect | Example with `discountAmount: 10` |
|--------------|--------|-----------------------------------|
| `by_percent` | Reduce by N% | $100 → $90 |
| `by_fixed` | Reduce by a fixed amount | $100 → $90 |
| `to_percent` | Set price to N% of original | $100 → $10 |
| `to_fixed` | Set price to a fixed amount | $100 → $10 |

For `by_percent`, `discountAmount` is capped at `100`.

**Priority and stacking.** `sortOrder` sets evaluation priority (lower runs first). `endOtherRules` (`1`) stops any lower-priority rule from also applying once this one matches.

**Status and re-indexing.** `status` (`0`/`1`) toggles the rule on. Saving a rule recomputes affected product prices in the background, so a newly-created or edited rule can take a moment to show on the storefront.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/promotions/catalog-rules-list) | `adminMarketingCatalogRules` query |
| [Detail](/api/graphql-api/admin/marketing/promotions/catalog-rules-detail) | `adminMarketingCatalogRule` query |
| [Create](/api/graphql-api/admin/marketing/promotions/catalog-rules-create) | `createAdminMarketingCatalogRule` mutation |
| [Update](/api/graphql-api/admin/marketing/promotions/catalog-rules-update) | `updateAdminMarketingCatalogRule` mutation |
| [Delete](/api/graphql-api/admin/marketing/promotions/catalog-rules-delete) | `deleteAdminMarketingCatalogRule` mutation |
| [Mass Delete](/api/graphql-api/admin/marketing/promotions/catalog-rules-mass-delete) | `createAdminMarketingCatalogRuleMassDelete` mutation |

`conditions`, `channels`, and `customerGroups` resolve only on the **detail** query — they are `null` on list rows. `channels` and `customerGroups` are connections of `{ id, _id, code, name }` (sub-select `edges { node { ... } }`); they do not resolve on a create / update mutation payload, so re-query the detail to read them back.

All Catalog Rules operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
