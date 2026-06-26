---
outline: false
---

# Cart Rules

A **cart rule** discounts the **cart at checkout** — unlike a catalog rule, which lowers a product's price before it is ever added to a cart. A cart rule can apply automatically when its conditions match, or be gated behind a coupon code the shopper enters. It mirrors the admin **Marketing → Promotions → Cart Rules** screen.

## How a cart rule works

A rule has three parts: **who it applies to**, **when it applies**, and **what it does to the cart**.

- **Who** — `channels` (which storefront channels) and `customerGroups` (e.g. general, wholesale). A rule only fires for shoppers in a matching channel + group.
- **When** — an optional date window (`startsFrom` / `endsTill`, where `endsTill` must be `>= startsFrom`) and a set of `conditions` (cart / product filters such as *subtotal > $100* or *category = Summer*). `conditionType` decides whether **all** conditions must match (`1`) or **any** (`0`).
- **What** — the `actionType` + `discountAmount` decide the discount:

| `actionType` | Effect |
|--------------|--------|
| `by_percent` | Reduce the cart by N% (`discountAmount` capped at `100`) |
| `by_fixed` | Reduce each matching item by a fixed amount |
| `cart_fixed` | Reduce the whole cart by a fixed amount |
| `buy_x_get_y` | Buy-X-get-Y free, driven by `discountQuantity` and `discountStep` |

**Coupons.** `couponType` controls whether a code is needed:

- `0` — no coupon; the rule **auto-applies** whenever its conditions match.
- `1` — a **specific coupon code** is required. When `useAutoGeneration` is `0`, you supply a unique `couponCode` (the rule's single primary code); bulk codes are managed through the [Cart Rule Coupons](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-list) sub-resource.

**Shipping.** `freeShipping` (`1`) grants free shipping; `applyToShipping` (`1`) extends the discount to the shipping amount too.

**Priority and stacking.** `sortOrder` sets evaluation priority (lower runs first). `endOtherRules` (`1`) stops any lower-priority rule from also applying once this one matches.

**Status and usage.** `status` (`0`/`1`) toggles the rule on. `timesUsed`, `usagePerCustomer`, and `usesPerCoupon` track and cap how often the rule and its coupons can be redeemed (`0` = unlimited). `timesUsed` is read-only.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/promotions/cart-rules-list) | `adminMarketingCartRules` query |
| [Detail](/api/graphql-api/admin/marketing/promotions/cart-rules-detail) | `adminMarketingCartRule` query |
| [Create](/api/graphql-api/admin/marketing/promotions/cart-rules-create) | `createAdminMarketingCartRule` mutation |
| [Update](/api/graphql-api/admin/marketing/promotions/cart-rules-update) | `updateAdminMarketingCartRule` mutation |
| [Copy](/api/graphql-api/admin/marketing/promotions/cart-rules-copy) | `copyAdminMarketingCartRule` mutation |
| [Delete](/api/graphql-api/admin/marketing/promotions/cart-rules-delete) | `deleteAdminMarketingCartRule` mutation |
| [Mass Delete](/api/graphql-api/admin/marketing/promotions/cart-rules-mass-delete) | `createAdminMarketingCartRuleMassDelete` mutation |

`conditions`, `channels`, and `customerGroups` resolve only on the **detail** query — they are `null` on list rows (`couponCode` is present on both).

Coupon-gated rules (`couponType` `1`) draw their codes from the related [Cart Rule Coupons](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-list).

All Cart Rules operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
