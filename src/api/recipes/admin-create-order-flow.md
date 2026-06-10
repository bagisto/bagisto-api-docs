---
outline: false
---

# Recipe: Admin Create-Order Flow

Place an order for a customer from the admin side — the API equivalent of the admin panel's **Create Order** screen. Every request carries the admin Integration token:

```
Authorization: Bearer <id>|<token>
```

The flow builds a **draft cart**, fills it, then places it. Do the steps in order — the sequence is enforced (you can't set a shipping method before addresses, etc.).

## The 6 steps (REST)

| # | Step | Call |
|---|------|------|
| 1 | Create a draft cart for the customer | `POST /api/admin/customers/{customerId}/draft-carts` → returns `cartId` |
| 2 | Add items | `POST /api/admin/carts/{cartId}/items` |
| 3 | Save billing + shipping addresses | `POST /api/admin/carts/{cartId}/addresses` |
| 4 | List then set a shipping method | `GET` then `POST /api/admin/carts/{cartId}/shipping-methods` |
| 5 | List then set a payment method | `GET` then `POST /api/admin/carts/{cartId}/payment-methods` |
| 6 | Place the order | `POST /api/admin/orders/place/{cartId}` → returns `orderId` |

Open the Sales → Orders pages for the exact request bodies. Add-item bodies are **product-type-specific** (configurable / grouped / bundle / downloadable need their option selections). Booking products are not supported in admin Create-Order (matches the admin panel).

## GraphQL variant — select result fields, never `id`

The draft-cart and cart-write operations are **actions**, not fetchable resources, so they have **no selectable `id`**. Select the result fields instead, or the query returns an internal-server error.

Step 1 — create the draft cart (select `cartId`, not `id`):

```graphql
mutation CreateDraftCart($input: createAdminDraftCartInput!) {
  createAdminDraftCart(input: $input) {
    adminDraftCart {
      cartId
      customerId
      success
      message
    }
  }
}
```

```json
{
  "input": {
    "customerId": 1
  }
}
```

Step 6 — place the order (select `orderId`, not `id`):

```graphql
mutation PlaceOrder($input: createAdminPlaceOrderInput!) {
  createAdminPlaceOrder(input: $input) {
    adminPlaceOrder {
      orderId
      incrementId
      grandTotal
      success
      message
    }
  }
}
```

```json
{
  "input": {
    "cartId": 42
  }
}
```

The intermediate cart mutations (add item, save addresses, set shipping/payment method) likewise return the updated cart payload — select the cart's contents and the `success` / `message` fields, not `id`.

## Why `id` is not selectable here

Fetchable resources — a customer, a product, a placed order — have a `GET /…/{id}` route, so GraphQL can resolve their `id`. Action operations (create-draft-cart, cart writes, place-order) have no such route, so there is no `id` to return. Read the action's result fields (`cartId`, `orderId`, `status`, `success`, `message`) instead.

## Status codes to handle

`200/201` success · `401` unauthenticated · `403` forbidden · `404` cart/customer not found · `409` wrong step order (e.g. shipping before addresses) · `422` validation (e.g. below minimum order amount, unsupported payment method).
