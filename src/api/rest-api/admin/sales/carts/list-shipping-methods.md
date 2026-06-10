---
outline: false
apiType: rest
examples:
  - id: admin-cart-list-shipping-methods
    title: List Shipping Methods
    description: Returns the available shipping rates for a draft cart, flattened across carriers. Requires both addresses to already be saved on the cart.
    query: |
      curl -X GET "https://your-domain.com/api/admin/carts/314/shipping-methods" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "method": "flatrate_flatrate",
            "carrierCode": "flatrate",
            "carrierTitle": "Flat Rate",
            "methodTitle": "Fixed",
            "price": 10,
            "formattedPrice": "$10.00",
            "baseTotal": 10,
            "formattedBaseTotal": "$10.00"
          },
          {
            "method": "free_free",
            "carrierCode": "free",
            "carrierTitle": "Free Shipping",
            "methodTitle": "Free Shipping",
            "price": 0,
            "formattedPrice": "$0.00",
            "baseTotal": 0,
            "formattedBaseTotal": "$0.00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 2, "lastPage": 1, "total": 2, "from": 1, "to": 2 }
      }
    commonErrors:
      - error: Conflict (409)
        cause: Cart is empty, or billing/shipping address not yet saved
        solution: Add at least one item and call `POST /api/admin/carts/{id}/addresses` first
      - error: Not Found (404)
        cause: Unknown cart ID
        solution: Confirm the cart ID returned by Create-Cart or Reorder
      - error: Forbidden (403)
        cause: Cart is an active storefront cart (is_active = 1)
        solution: This endpoint only works for draft carts
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# List Shipping Methods

Returns the available shipping rates for the draft cart. The grouped result is
flattened into one row per rate so the client can render a flat selector.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{cartId}/shipping-methods` | GET |

## Sequence

The provider enforces the Create-Order sequence — both billing AND shipping
addresses must already be saved on the cart, otherwise the response is HTTP 409
with `Addresses must be saved before selecting a shipping method.`
