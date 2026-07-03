---
outline: false
---

# Shop Workflows

The storefront call-sequences — how a client chains the Shop API (`/api/shop/*` REST + `/api/graphql`) to build a customer-facing store. Every request carries the `X-STOREFRONT-KEY`; customer-scoped steps add `Authorization: Bearer <token>`.

## Agent-ask inputs

- **Storefront key** — ask the user; send it on every Shop request. Never invent it.
- **Server URL** — ask the user for their Bagisto server's base URL (e.g. `https://store.example.com`) and prefix every endpoint path with it. Never assume localhost or a demo domain.

## Start here

- **[Build a Storefront](/api/workflows/shop/build-a-storefront)** — the complete blueprint: every screen (homepage, catalog, product detail, CMS, themes, account) mapped to its API. Read this first for the whole picture, then drill into a focused flow below.

## Focused flows

| Workflow | What it covers |
|----------|----------------|
| [Cart](/api/workflows/shop/cart) | Guest vs customer cart, add/update items, coupons, **merge on login** |
| [Checkout](/api/workflows/shop/checkout) | Addresses → shipping → payment methods → place order, with saved-address reuse |

## Guest vs customer

The storefront key alone gives read-only access. A **guest can still place an order**: create a Cart Token (`createCartToken`), send it as `Authorization: Bearer <cartToken>`, and drive cart + checkout without a login. A logged-in customer additionally unlocks the account area (orders, addresses, wishlist) and lets a guest cart be **merged** into their cart at login.

## How to read a flow page

Intent → Agent-ask inputs → Prerequisites → **Mermaid dependency diagram** → ordered call table (links to the exact endpoint pages) → end-to-end example → customize hook. Flow pages own the sequence; endpoint detail lives on the linked API pages.
