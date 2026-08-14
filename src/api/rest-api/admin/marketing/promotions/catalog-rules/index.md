---
outline: false
---

# Catalog Rules

A **catalog rule** automatically lowers a product's price store-wide — before the product is ever added to a cart. The shopper just sees a reduced price on the product and category pages; there is no coupon and no minimum-cart requirement. It mirrors the admin **Marketing → Promotions → Catalog Rules** screen.

## How a catalog rule works

A rule has three parts: **who it applies to**, **when it applies**, and **what it does to the price**.

- **Who** — `channels` (which storefront channels) and `customer_groups` (e.g. general, wholesale). A rule only fires for shoppers in a matching channel + group. In responses these come back as `channels` / `customerGroups` — **arrays of objects** (each `{ id, code, name }`). Requests still send them as plain id arrays.
- **When** — an optional date window (`starts_from` / `ends_till`) and a set of `conditions` (product attribute filters such as *category = Summer* or *brand = Acme*). `condition_type` decides whether **all** conditions must match (`1`) or **any** (`0`).
- **What** — the `action_type` + `discount_amount` rewrite the price:

| `action_type` | Effect | Example with `discount_amount: 10` |
|---------------|--------|------------------------------------|
| `by_percent` | Reduce by N% | $100 → $90 |
| `by_fixed` | Reduce by a fixed amount | $100 → $90 |
| `to_percent` | Set price to N% of original | $100 → $10 |
| `to_fixed` | Set price to a fixed amount | $100 → $10 |

For `by_percent`, `discount_amount` is capped at `100`.

**Priority and stacking.** `sort_order` sets evaluation priority (lower runs first). `end_other_rules` (`1`) stops any lower-priority rule from also applying once this one matches.

**Status and re-indexing.** `status` (`0`/`1`) toggles the rule on. Saving a rule recomputes affected product prices in the background, so a newly-created or edited rule can take a moment to show on the storefront.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/promotions/catalog-rules-list) | `GET /api/admin/marketing/catalog-rules` |
| [Detail](/api/rest-api/admin/marketing/promotions/catalog-rules-detail) | `GET /api/admin/marketing/catalog-rules/{id}` |
| [Create](/api/rest-api/admin/marketing/promotions/catalog-rules-create) | `POST /api/admin/marketing/catalog-rules` |
| [Update](/api/rest-api/admin/marketing/promotions/catalog-rules-update) | `PUT /api/admin/marketing/catalog-rules/{id}` |
| [Delete](/api/rest-api/admin/marketing/promotions/catalog-rules-delete) | `DELETE /api/admin/marketing/catalog-rules/{id}` |
| [Mass Delete](/api/rest-api/admin/marketing/promotions/catalog-rules-mass-delete) | `POST /api/admin/marketing/catalog-rules/mass-delete` |

`conditions`, `channels`, and `customerGroups` are returned only on the **detail**, **create**, and **update** responses — they are `null` on list rows. `channels` and `customerGroups` are arrays of `{ id, code, name }` objects.
