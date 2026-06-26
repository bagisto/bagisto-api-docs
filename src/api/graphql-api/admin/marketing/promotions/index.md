---
outline: false
---

# Promotions

Promotions are the store's **discounting engine**. There are two kinds, and they fire at different moments in the shopping journey.

## The two rule types

**Catalog Rules — change the price *before* the cart.** A catalog rule rewrites a product's displayed price store-wide, automatically, for everyone (or a chosen customer group / channel) who meets its conditions. No coupon, no minimum cart — the shopper just sees a lower price on the product and category pages. Use it for "10% off the whole Summer collection" or "wholesale group always pays 15% less". Because it recomputes product prices, saving a catalog rule triggers a price re-index in the background.

**Cart Rules — discount the *cart* at checkout.** A cart rule applies to the cart total once the shopper has added items, optionally gated by a **coupon code** and by conditions (cart subtotal over X, specific products present, etc.). Use it for "free shipping over $100", "$20 off with code WELCOME20", or "buy-X-get-Y". A cart rule that uses a specific coupon code draws that code (and any bulk-generated batch) from **Cart Rule Coupons**.

| Resource | What it does |
|----------|----------------|
| [Catalog Rules](/api/graphql-api/admin/marketing/promotions/catalog-rules/) | Automatic product-price reductions applied store-wide before checkout. |
| [Cart Rules](/api/graphql-api/admin/marketing/promotions/cart-rules/) | Discounts applied to the cart at checkout, optionally coupon-gated. |
| [Cart Rule Coupons](/api/graphql-api/admin/marketing/promotions/cart-rule-coupons/) | The coupon codes (single or bulk-generated) that activate a coupon-driven cart rule. |

## How they relate

A **Catalog Rule** and a **Cart Rule** can both touch the same order: the catalog rule lowers the per-product price the shopper sees, then the cart rule discounts the resulting cart total. **Cart Rule Coupons** exist only to feed a cart rule whose coupon type is *specific code* — they are a sub-resource of a single cart rule, not a standalone promotion.

All Promotions operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
