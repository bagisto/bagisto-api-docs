---
outline: false
apiType: rest
examples:
  - id: admin-cart-list-payment-methods
    title: List Payment Methods
    description: List the payment methods supported for the draft cart. Requires a shipping method to be selected first.
    query: |
      curl -X GET "https://your-domain.com/api/admin/carts/314/payment-methods" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          { "method": "cashondelivery", "methodTitle": "Cash On Delivery", "description": "", "sort": 1, "image": null },
          { "method": "moneytransfer", "methodTitle": "Money Transfer", "description": "", "sort": 2, "image": null }
        ],
        "meta": { "currentPage": 1, "perPage": 2, "lastPage": 1, "total": 2, "from": 1, "to": 2 }
      }
    commonErrors:
      - error: Conflict (409)
        cause: Shipping method not yet selected, or addresses missing
        solution: Save addresses then call `POST /api/admin/carts/{id}/shipping-methods` first
      - error: Not Found (404)
        cause: Unknown cart ID
        solution: Confirm the cart ID
      - error: Forbidden (403)
        cause: Cart is an active storefront cart
        solution: Only draft carts can be modified
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# List Payment Methods

Returns the payment methods valid for the current draft cart. Only
`cashondelivery` and `moneytransfer` are usable from
`POST /api/admin/orders/place/{cartId}` (matches the admin Create-Order screen).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{cartId}/payment-methods` | GET |

## Sequence

A shipping method must already be selected on the cart, otherwise the response
is HTTP 409 with *Shipping method must be selected before payment method.*
