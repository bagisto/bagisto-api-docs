---
outline: false
---

# Cart Rule Coupons

A **cart rule coupon** is a coupon code that activates a coupon-gated cart rule. It mirrors the coupon table on the admin **Marketing → Promotions → Cart Rules → Coupons** screen, which sits inside a single cart rule.

## How cart rule coupons work

A cart rule can be set to apply automatically or only when a shopper enters a coupon code (`couponType` `1` on the parent rule). When the rule is coupon-gated, these codes are what the shopper types at checkout to unlock the discount.

- **One rule, many codes.** Every coupon belongs to exactly one cart rule. The list is always scoped to a `cartRuleId`, and codes from one rule never appear under another.
- **Primary vs. secondary.** Each coupon has an `isPrimary` flag. The rule's single **primary** code is managed on the cart rule itself. The codes you create or generate here are **secondary** codes (`isPrimary` is `false`, `type` is `1`) — useful for handing out many distinct codes for the same promotion.
- **Two ways to add codes.** [Create](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-create) adds one explicit code; [Generate](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-generate) bulk-creates many random codes from a length, format, prefix and suffix.
- **Usage limits.** `usageLimit` caps total redemptions and `usagePerCustomer` caps per-customer redemptions. `timesUsed` is read-only and counts how often the code has been redeemed. `expiredAt` sets an expiry date. When omitted on create, these inherit the parent rule's values.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-list) | `adminMarketingCartRuleCoupons` query |
| [Create](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-create) | `createAdminMarketingCartRuleCoupon` mutation |
| [Generate](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-generate) | `createAdminMarketingCartRuleCouponGenerate` mutation |
| [Delete](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-delete) | `deleteAdminMarketingCartRuleCoupon` mutation |
| [Mass Delete](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons-mass-delete) | `createAdminMarketingCartRuleCouponMassDelete` mutation |

This is a sub-resource of [Cart Rules](/api/graphql-api/admin/marketing/promotions/cart-rules/) — every coupon belongs to one cart rule, and the list requires its `cartRuleId`.
