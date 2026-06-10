---
outline: false
apiType: rest
examples:
  - id: admin-cart-set-shipping-method
    title: Set Shipping Method
    description: Save the selected shipping method on the draft cart and recollect totals.
    query: |
      curl -X POST "https://your-domain.com/api/admin/carts/314/shipping-methods" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "shippingMethod": "flatrate_flatrate" }'
    variables: |
      {
        "shippingMethod": "flatrate_flatrate"
      }
    response: |
      {
        "id": 314,
        "shippingMethod": "flatrate_flatrate",
        "shippingAmount": 10,
        "grandTotal": 110,
        "success": true,
        "message": "Shipping method saved."
      }
    commonErrors:
      - error: Conflict (409)
        cause: Addresses not yet saved on the cart
        solution: 'Call `POST /api/admin/carts/{id}/addresses` first'

      - error: Bad Request (400)
        cause: shippingMethod field missing
        solution: 'Send `{ "shippingMethod": "<code>" }`'

      - error: Forbidden (403)
        cause: Cart is an active storefront cart
        solution: 'Only draft carts (is_active = 0) can be modified'

      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Set Shipping Method

Saves the chosen shipping method on the cart and recollects totals. The response
is the full updated cart so the UI can render new totals without another fetch.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{cartId}/shipping-methods` | POST |

## Sequence

The processor enforces: items, billing AND shipping addresses must already be
present on the cart. Otherwise the call returns HTTP 409 with a precise
message — *Addresses must be saved before selecting a shipping method.*
