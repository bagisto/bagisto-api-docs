---
outline: false
---

# Marketing

The Marketing section groups everything used to **drive demand, run promotions, talk to customers, and shape how the storefront is found**. It mirrors the admin **Marketing** menu and splits into three sub-menus, each a different lever on sales.

## Sub-menus

| Sub-menu | What it's for |
|----------|----------------|
| [Promotions](/api/rest-api/admin/marketing/promotions/) | Price-and-cart discounting — **Catalog Rules** (automatic price reductions applied to products before they reach the cart), **Cart Rules** (discounts and coupons applied at checkout), and the **Cart Rule Coupons** that back coupon-driven cart rules. |
| [Communications](/api/rest-api/admin/marketing/communications/) | Outbound email — **Email Templates** (reusable HTML bodies), **Events** (dated triggers), **Campaigns** (a template sent to a customer group), and **Newsletter Subscribers** (the audience). |
| [Search & SEO](/api/rest-api/admin/marketing/search-seo/) | How the store is searched and indexed — **Search Terms** (what shoppers typed), **Search Synonyms** (query-widening word groups), **URL Rewrites** (301/302 redirects), and **Sitemaps** (XML sitemaps for crawlers). |

## How the sub-menus relate

- **Promotions** decide the *price* a shopper sees. A **Catalog Rule** rewrites a product's price store-wide (no coupon, no cart needed); a **Cart Rule** discounts the *cart total* at checkout, optionally gated by a coupon code drawn from **Cart Rule Coupons**.
- **Communications** decide *who hears about it*. A **Campaign** pairs an **Email Template** with a **customer group** of **Newsletter Subscribers**, optionally anchored to an **Event** date.
- **Search & SEO** decide *how the store is found*. **Search Terms** reveal demand, **Search Synonyms** widen matches, **URL Rewrites** keep old links alive, and **Sitemaps** feed crawlers.

All Marketing endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
