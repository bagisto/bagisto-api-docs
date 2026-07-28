---
outline: false
---

# Shop Workflows

The storefront call-sequences — how a client chains the Shop API (`/api/shop/*` REST + `/api/graphql`) to build a customer-facing store. Every request carries the `X-STOREFRONT-KEY`; customer-scoped steps add `Authorization: Bearer <token>`.

## Prerequisite inputs for the AI agent

Ask the user for these once, before any Shop call — they apply to every flow below, so the individual flow pages do not repeat them:

- **Storefront key** — send it on every Shop request. Never invent it.
- **Server URL** — the Bagisto server's base URL (e.g. `https://store.example.com`); prefix every endpoint path with it. Never assume localhost or a demo domain.
- **Customer credentials** *(only for the account area)* — needed to obtain a customer Bearer token via login.

Before building, read [Authentication](/api/authentication) (the credential model — `token` is the Bearer, not `apiToken`; there is no refresh token), then skim this Storefront overview for the surface you are about to work on.

## Start here

- **[Build a Storefront](/api/workflows/shop/build-a-storefront)** — the complete blueprint: every screen (homepage, catalog, product detail, CMS, themes, account) mapped to its API. Read this first for the whole picture, then drill into a focused flow below.
- Translating a REST call to GraphQL (or vice-versa)? The [API Mapping](/api/rest-graphql-mapping/) has the side-by-side tables per area.

## Focused flows

| Workflow | What it covers |
|----------|----------------|
| [Browse & Filter Catalog](/api/workflows/shop/browse-and-filter-catalog) | Categories, attributes, product listing with filters + sort + pagination, product detail |
| [Cart](/api/workflows/shop/cart) | Guest vs customer cart, add/update items, coupons, **merge on login** |
| [Checkout](/api/workflows/shop/checkout) | Addresses → shipping → payment methods → place order, with saved-address reuse |
| [Customer Account](/api/workflows/shop/customer-account) | Profile, addresses, orders, invoices, downloadable, reviews, wishlist, compare |
| [Returns / RMA](/api/workflows/shop/returns-rma) | Returnable items → reason → create return → track / message / cancel-reopen-close |
| [EU Withdrawal](/api/workflows/shop/eu-withdrawal) | File a right-of-withdrawal (customer or guest) → track |
| [GDPR Requests](/api/workflows/shop/gdpr) | Raise (delete/update) → list → view → revoke → delete (admin-gated) |

## Guest vs customer

The storefront key alone gives read-only access. A **guest can still place an order**: create a Cart Token (`createCartToken`), send it as `Authorization: Bearer <cartToken>`, and drive cart + checkout without a login. A logged-in customer additionally unlocks the account area (orders, addresses, wishlist) and lets a guest cart be **merged** into their cart at login.

## How to read a flow page

Intent → Prerequisites → **Mermaid dependency diagram** → ordered call table (links to the exact endpoint pages) → flow notes → customize hook. Flow pages own the sequence; endpoint detail lives on the linked API pages. The prerequisite inputs above are assumed on every flow page and not repeated.
