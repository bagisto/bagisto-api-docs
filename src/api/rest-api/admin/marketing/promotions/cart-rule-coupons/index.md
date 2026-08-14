---
outline: false
---

# Cart Rule Coupons

A **cart rule coupon** is a code a shopper enters at checkout to activate a
coupon-gated cart rule. These coupons belong to a single cart rule and are
managed from the **Coupons** tab of the admin **Marketing → Promotions → Cart
Rules** screen.

## How cart rule coupons work

A cart rule can be set to apply automatically when its conditions match, or to
require a specific code — that's the `couponType` field on the rule. When the
rule is coupon-gated (`couponType` `1`), its discount only kicks in once the
shopper enters a matching code at the cart.

Each rule has exactly one **primary** code (the rule's own code, `isPrimary`
`true`), which is set on the cart rule itself. Everything managed here are the
rule's **secondary** codes (`isPrimary` `false`) — extra codes that activate the
same discount. There are two ways to add them:

- **Create one** — add a single code with [Create](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-create).
- **Generate many** — [Generate](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-generate) makes a batch of random codes from a chosen length, character format, and optional prefix/suffix — useful for unique single-use codes in a campaign.

**Usage limits.** `usageLimit` caps total redemptions across all customers and
`usagePerCustomer` caps redemptions per shopper (`0` means unlimited for either).
When omitted on create or generate, both inherit the parent rule's settings.
`timesUsed` records how often a code has been redeemed and is read-only.

**Scoping.** Coupons always belong to one cart rule. Every endpoint is nested
under that rule's id, and a coupon from another rule is never returned or
deleted across rules.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-list) | `GET /api/admin/marketing/cart-rules/{cartRuleId}/coupons` |
| [Create](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-create) | `POST /api/admin/marketing/cart-rules/{cartRuleId}/coupons` |
| [Generate](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-generate) | `POST /api/admin/marketing/cart-rules/{cartRuleId}/coupons/generate` |
| [Delete](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-delete) | `DELETE /api/admin/marketing/cart-rules/{cartRuleId}/coupons/{id}` |
| [Mass Delete](/api/rest-api/admin/marketing/promotions/cart-rule-coupons-mass-delete) | `POST /api/admin/marketing/cart-rules/{cartRuleId}/coupons/mass-delete` |

These coupons belong to [Cart Rules](/api/rest-api/admin/marketing/promotions/cart-rules/) — the parent rule decides whether a code is required and what discount it applies.
