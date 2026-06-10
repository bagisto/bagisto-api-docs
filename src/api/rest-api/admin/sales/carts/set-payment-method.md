---
outline: false
apiType: rest
examples:
  - id: admin-cart-set-payment-method
    title: Set Payment Method
    description: Save the selected payment method on the draft cart and recollect totals.
    query: |
      curl -X POST "https://your-domain.com/api/admin/carts/314/payment-methods" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "method": "cashondelivery" }'
    variables: |
      {
        "method": "cashondelivery"
      }
    response: |
      {
        "id": 314,
        "paymentMethod": "cashondelivery",
        "paymentMethodTitle": "Cash On Delivery",
        "grandTotal": 110,
        "success": true,
        "message": "Payment method saved."
      }
    commonErrors:
      - error: Conflict (409)
        cause: Shipping method not yet selected
        solution: 'Call `POST /api/admin/carts/{id}/shipping-methods` first'

      - error: Bad Request (400)
        cause: method field missing
        solution: 'Send `{ "method": "cashondelivery" }`'

      - error: Forbidden (403)
        cause: Cart is an active storefront cart
        solution: 'Only draft carts can be modified'

      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Set Payment Method

Saves the chosen payment method on the cart and recollects totals. The
response is the full updated cart.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/carts/{cartId}/payment-methods` | POST |

## Sequence

Items + addresses + shipping method must be present. Otherwise the response is
HTTP 409 with a precise message identifying the missing step.

## Note on supported methods

For `POST /api/admin/orders/place/{cartId}` to succeed, the saved method must
be one of `cashondelivery` or `moneytransfer` (matches the admin Create-Order
screen). This endpoint will *save* any supported method, but place-order
returns HTTP 422 for any other choice.
