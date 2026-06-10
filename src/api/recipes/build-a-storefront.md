---
outline: false
---

# Recipe: Build a Storefront

A storefront on the Shop API, from browsing to a placed order. Every request carries the `X-STOREFRONT-KEY` header; customer-scoped steps also carry the customer's `Authorization: Bearer <token>`.

Open each linked page for the exact request body and response shape.

## 1. Authenticate the storefront

Every Shop API request sends your storefront key:

```
X-STOREFRONT-KEY: <key>
```

For customer-scoped actions (their cart, account, orders), first log the customer in and keep the returned token:

- [Customer Login](/api/rest-api/shop/customers/customer-login) — `POST /api/shop/customers/login` → `data.token`. Send it as `Authorization: Bearer <token>` on later calls.
- New customers: [Customer Registration](/api/rest-api/shop/customers/customer-registration).

## 2. Browse the catalog

1. [Get Categories](/api/rest-api/shop/categories/get-categories) — build the navigation.
2. **List / search products** — paginated with `?page=`, `?per_page=`, `?query=`, `?sort=`, and category / price / attribute filters.
3. **Product detail** — fetch a single product for its price, images, and type-specific data (variants, bundle options, downloadable links, grouped items).

## 3. Cart

1. [Create / Get Cart](/api/rest-api/shop/cart/create-cart) — start or load the cart.
2. [Add to Cart](/api/rest-api/shop/cart/add-to-cart) — `POST /api/shop/cart/items`, body `{ productId, quantity, ... }`. **The extra fields depend on the product type** (configurable products need their selected options; grouped / bundle / downloadable need their selections) — open the page for the exact shape per type.
3. [Update Cart Item](/api/rest-api/shop/cart/update-cart-item) · [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item).
4. [Apply Coupon](/api/rest-api/shop/cart/apply-coupon) · [Remove Coupon](/api/rest-api/shop/cart/remove-coupon).

## 4. Checkout (in order — the sequence is enforced)

1. [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address)
2. [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address)
3. [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) → [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method)
4. [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods) → [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method)
5. [Place Order](/api/rest-api/shop/checkout/place-order)

## 5. Post-order

- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) and the single order for the confirmation screen.
- [Get Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) for downloadable invoices.

## GraphQL variant

Every step above has a GraphQL equivalent at `POST /api/graphql` (see the Shop GraphQL section). When mutating the cart or placing the order, **select the result fields** the mutation returns (cart contents, order id, `success`, `message`) — the cart/checkout mutations are actions, so don't select an `id` on them.

## Status codes to handle

`200/201` success · `401` unauthenticated (missing key/token) · `403` forbidden · `400` bad input · `404` not found · `422` validation (e.g. quantity exceeds stock).
