---
outline: false
---

# Cart Rules

A **cart rule** discounts the shopper's **cart at checkout** — unlike a catalog rule, which lowers a product's price before it is ever added to a cart. A cart rule can apply automatically when its conditions match, or be gated behind a coupon code. It mirrors the admin **Marketing → Promotions → Cart Rules** screen.

## How a cart rule works

A rule has four parts: **who it applies to**, **when it applies**, **how it is triggered**, and **what it does to the cart**.

- **Who** — `channels` (which storefront channels) and `customerGroups` (e.g. general, wholesale). A rule only fires for shoppers in a matching channel + group.
- **When** — an optional date window (`startsFrom` / `endsTill`, where `endsTill` must be `>= startsFrom`) and a set of `conditions` (cart / product filters such as *subtotal ≥ 100* or *category = Summer*). `conditionType` decides whether **all** conditions must match (`1`) or **any** (`0`).
- **How it is triggered** — `couponType`:

| `couponType` | Trigger |
|--------------|---------|
| `0` | Auto-apply — the rule fires automatically whenever its conditions match. |
| `1` | Specific code — the shopper must enter a coupon code. `couponCode` is the rule's primary code (required unless codes are auto-generated). |

  When `couponType` is `1`, additional codes can be issued in bulk through **Cart Rule Coupons**.

- **What** — the `actionType` + `discountAmount` rewrite the cart total:

| `actionType` | Effect |
|--------------|--------|
| `by_percent` | Reduce the cart by N% (`discountAmount` capped at `100`) |
| `by_fixed` | Reduce each matching item by a fixed amount |
| `cart_fixed` | Reduce the whole cart by a fixed amount |
| `buy_x_get_y` | Buy-X-get-Y, driven by `discountQuantity` and `discountStep` |

  `freeShipping` (`1`) grants free shipping; `applyToShipping` (`1`) also applies the discount to the shipping cost.

**Priority and stacking.** `sortOrder` sets evaluation priority (lower runs first). `endOtherRules` (`1`) stops any lower-priority rule from also applying once this one matches.

**Status and usage.** `status` (`0`/`1`) toggles the rule on. `usagePerCustomer` and `usesPerCoupon` cap how often it can be used (`0` = unlimited). `timesUsed` records how often the rule has applied and is read-only.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/promotions/cart-rules-list) | `GET /api/admin/marketing/cart-rules` |
| [Detail](/api/rest-api/admin/marketing/promotions/cart-rules-detail) | `GET /api/admin/marketing/cart-rules/{id}` |
| [Create](/api/rest-api/admin/marketing/promotions/cart-rules-create) | `POST /api/admin/marketing/cart-rules` |
| [Update](/api/rest-api/admin/marketing/promotions/cart-rules-update) | `PUT /api/admin/marketing/cart-rules/{id}` |
| [Copy](/api/rest-api/admin/marketing/promotions/cart-rules-copy) | `POST /api/admin/marketing/cart-rules/{id}/copy` |
| [Delete](/api/rest-api/admin/marketing/promotions/cart-rules-delete) | `DELETE /api/admin/marketing/cart-rules/{id}` |
| [Mass Delete](/api/rest-api/admin/marketing/promotions/cart-rules-mass-delete) | `POST /api/admin/marketing/cart-rules/mass-delete` |

`conditions`, `channels`, and `customerGroups` are returned only on the **detail** endpoint — they are `null` on list rows. List rows do carry `couponCode`.

Coupon-gated rules (`couponType` = `1`) draw their codes from **Cart Rule Coupons**, a sub-resource of each cart rule.

All Cart Rules endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
