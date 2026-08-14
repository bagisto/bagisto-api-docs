---
outline: false
---

# Build a Storefront

The **complete storefront blueprint** — every screen a shopper sees and the Shop API behind it, from the homepage to a placed order and the customer account. Use this as the map; for the two deepest flows, the focused [Cart](/api/workflows/shop/cart) and [Checkout](/api/workflows/shop/checkout) workflow pages carry the step-by-step call sequence.

Every request carries the `X-STOREFRONT-KEY` header; customer-scoped steps also carry `Authorization: Bearer <token>`. Open each linked page for the exact request/response shape.

## 0. Context (locale / currency / channel)

Optional per-request headers `X-LOCALE`, `X-CURRENCY`, `X-CHANNEL` control what content the API returns. Discover valid values:

- [Get Channels](/api/rest-api/shop/channels/get-channels) — the store's sales channels; each channel lists its allowed **currencies** and **locales**.
- [Get Locales](/api/rest-api/shop/locales/get-locales) — available languages (with `direction` for RTL).

## 1. Homepage

The landing screen is built from admin-managed content, not just products:

- **CMS pages** (About, Privacy, Terms, custom landing copy) — the admin authors these; the storefront reads them via the [CMS Pages query (GraphQL)](/api/graphql-api/shop/cms-pages/). Render them as static pages and footer links.
- **Theme customizations** (hero image carousel, static blocks, featured/category carousels, footer links) — the homepage layout the admin configures. Read with [Get Theme Customizations](/api/rest-api/shop/theme-customizations/get-theme-customizations). Each block tells you what to render (a product-carousel block gives you the product ids to fetch; an image block gives banners).
- **Navigation** — [Get Categories](/api/rest-api/shop/categories/get-categories) for the menu, or [Category Tree](/api/rest-api/shop/categories/get-category-tree) for a nested megamenu.

## 2. Catalog

- **Category page** — [Get Categories](/api/rest-api/shop/categories/get-categories) for the category, then list its products (step below) filtered by that category.
- **Product listing** — [Get Products](/api/rest-api/shop/products/get-products), paginated with `?page=`, `?per_page=`, `?sort=`. Scope and filter it with `?category_id=`, `?price=10,200` (min,max), `?new=1`, `?featured=1`, `?type=`, and any attribute code (`?color=3&size=6`). The complete parameter list is on [Search Products](/api/rest-api/shop/products/search-product).
- **Category children** — `?parent_id=N` (REST) or `treeCategories(parentId: N)` (GraphQL). The GraphQL `categories` field has **no** `parentId` argument.
- **Search** — [Search Products](/api/rest-api/shop/products/search-product) — the same endpoint with `?query=`; composes with the filters above.
- **Filters (faceting sidebar)** — [Get Attributes](/api/rest-api/shop/attributes/get-attributes) (`isFilterable: 1`) and [Attribute Options](/api/rest-api/shop/attributes/get-attribute-options) give you the filter codes and option ids to feed the product-listing filters above (color, size, brand, price).
- **Product detail page** — [Get Product](/api/rest-api/shop/products/get-product) for a single product: price, images, description, and type-specific data. Configurable / bundle / grouped / downloadable products expose their extra structure via [product sub-resources](/api/rest-api/shop/products/product-subresources) and [type sub-resources](/api/rest-api/shop/products/product-type-subresources); bookable products via [booking slots](/api/rest-api/shop/products/get-booking-slots).
- **Product reviews** — show and collect ratings: [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) · [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) (logged-in customer).

## 3. Shopper engagement

- **Wishlist** (logged-in) — [List](/api/rest-api/shop/wishlist/list) · [Add / Toggle](/api/rest-api/shop/wishlist/toggle) · [Move to Cart](/api/rest-api/shop/wishlist/move-to-cart).
- **Compare** — [List](/api/rest-api/shop/compare/list) · [Add](/api/rest-api/shop/compare/create) · [Remove](/api/rest-api/shop/compare/delete).
- **Newsletter** — [Subscribe](/api/rest-api/shop/newsletter/subscribe).

## 4. Authenticate the customer

For cart-to-order and the account area, log the customer in and keep the token:

- [Customer Login](/api/rest-api/shop/customers/customer-login) → `data.token` → send as `Authorization: Bearer <token>`.
- New customers: [Customer Registration](/api/rest-api/shop/customers/customer-registration).
- Guests can still order without an account — see the Cart workflow's guest path.

## 5. Cart

The full cart sequence (guest / customer, add / update, coupons, **merge on login**) is its own page: **[Cart workflow →](/api/workflows/shop/cart)**.

## 6. Checkout

The enforced checkout sequence (addresses → shipping → payment methods → place order, with saved-address reuse) is its own page: **[Checkout workflow →](/api/workflows/shop/checkout)**.

## 7. Customer account (post-login)

- **Profile & addresses** — the [Customers](/api/rest-api/shop/customers/) endpoints: [addresses](/api/rest-api/shop/customers/get-customer-addresses), [change password](/api/rest-api/shop/customers/change-password).
- **Orders** — [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) · [single order](/api/rest-api/shop/customer-orders/get-customer-order) for the confirmation + history screens.
- **Invoices** — [Get Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) · [download PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf).
- **Downloadable products** — [Get Downloadable Products](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-products).
- **GDPR** — [raise](/api/rest-api/shop/gdpr-requests/create-gdpr-request) / [list](/api/rest-api/shop/gdpr-requests/list-gdpr-requests) / [revoke](/api/rest-api/shop/gdpr-requests/revoke-gdpr-request) data requests (config-gated).

## GraphQL variant

Every step has a GraphQL equivalent at `POST /api/graphql` (see the Shop GraphQL section). On cart / checkout **mutations** select the result fields (cart contents, order id, `success`, `message`) — they're actions, so don't select an `id` on them.

## Status codes to handle

Every call below links to its **REST** endpoint page for concreteness. The sequence is transport-agnostic — the same flow works over GraphQL with the equivalent query or mutation, and each REST page cross-links to its GraphQL twin. Pick whichever transport your client uses; only the request shape changes, never the order of steps.

`200/201` success · `401` unauthenticated (missing key/token) · `403` forbidden · `400` bad input · `404` not found · `422` validation (e.g. quantity exceeds stock).
