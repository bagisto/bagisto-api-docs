---
outline: false
examples:
  - id: admin-cart-list-shipping-methods
    title: List Shipping Methods
    description: Returns available shipping rates for a draft cart. Both addresses must be saved first.
    query: |
      query AdminCartShippingRates($id: Int!) {
        adminCartShippingRates(cartId: $id) {
          edges {
            node {
              method
              carrierCode
              carrierTitle
              methodTitle
              price
              formattedPrice
            }
          }
        }
      }
    variables: |
      {
        "id": 314
      }
    response: |
      {
        "data": {
          "adminCartShippingRates": {
            "edges": [
              {
                "node": {
                  "method": "flatrate_flatrate",
                  "carrierCode": "flatrate",
                  "carrierTitle": "Flat Rate",
                  "methodTitle": "Fixed",
                  "price": 10,
                  "formattedPrice": "$10.00"
                }
              }
            ]
          }
        }
      }
---

# List Shipping Methods

**Prerequisites** — The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminCartShippingRates(cartId: Int!)` | QueryCollection | List available shipping rates |

## Sequence

Both billing AND shipping addresses must be saved on the cart, otherwise the
response carries an `errors[]` entry equivalent to HTTP 409 on REST
(`Addresses must be saved before selecting a shipping method.`).

## Errors

| Cause | Notes |
|-------|-------|
| Cart not found | Unknown id |
| 403 — active storefront cart | Only draft carts (is_active = 0) are accessible |
| 409 — addresses missing | Save addresses via `saveAddressAdminCart` first |
| Unauthenticated | Missing admin Bearer token |
