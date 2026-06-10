---
outline: false
apiType: rest
examples:
  - id: admin-place-order
    title: Place Order
    description: Finalise a fully prepared draft cart into a real order.
    query: |
      curl -X POST "https://your-domain.com/api/admin/orders/place/314" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "orderId": 1284,
        "incrementId": "1000001284",
        "customerId": 7,
        "grandTotal": 149.99,
        "success": true,
        "message": "Order placed successfully."
      }
    commonErrors:
      - error: Conflict (409) — cart is empty
        cause: No items added to the cart
        solution: Add items via `POST /api/admin/carts/{id}/items`
      - error: Conflict (409) — addresses required
        cause: Billing and/or shipping address not saved
        solution: Save addresses via `POST /api/admin/carts/{id}/addresses`
      - error: Conflict (409) — shipping required
        cause: No shipping method selected
        solution: Select a shipping method via `POST /api/admin/carts/{id}/shipping-methods`
      - error: Conflict (409) — payment required
        cause: No payment method selected
        solution: Select a payment method via `POST /api/admin/carts/{id}/payment-methods`
      - error: Unprocessable Entity (422) — below minimum order amount
        cause: The cart total is below the store's configured minimum order amount
        solution: Add more items until the cart meets the minimum, or disable the minimum-order requirement in store settings
      - error: Unprocessable Entity (422)
        cause: Payment method is not in ['cashondelivery','moneytransfer']
        solution: Select COD or money transfer. Other methods are blocked for admin-placed orders.
      - error: Forbidden (403)
        cause: Cart is an active storefront cart
        solution: Only draft carts can be finalised
      - error: Not Found (404)
        cause: Unknown cart ID
        solution: Confirm the cart ID returned by Create-Cart / Reorder
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Place Order

Finalises a fully prepared draft cart into a real order. This is the same flow
as the admin Create-Order screen's place-order step:

1. The cart's totals are recalculated.
2. The cart total must meet the store's configured **minimum order amount**
   (when that requirement is enabled) — otherwise the order is rejected with
   `422`.
3. The selected payment method must be one of `cashondelivery` or
   `moneytransfer` (other gateways are not supported for admin-placed orders).
4. The order is created from the cart, and the draft cart is then removed.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/orders/place/{cartId}` | POST |

`{cartId}` is the draft cart id. The request body is empty — all payment,
shipping, and address selections must already be saved on the cart.

## Sequence enforcement

This endpoint enforces the entire Create-Order sequence explicitly. Each
missing step returns a distinct HTTP 409 with its own message, so the client
can drive the user back to the right step instead of seeing a generic 500.

| Step | Status | Message key |
|------|--------|-------------|
| Items present | 409 | `bagistoapi::app.admin.cart.place-order.empty-cart` |
| Addresses saved | 409 | `bagistoapi::app.admin.cart.place-order.addresses-required` |
| Shipping selected | 409 | `bagistoapi::app.admin.cart.place-order.shipping-required` |
| Payment selected | 409 | `bagistoapi::app.admin.cart.place-order.payment-required` |
| Payment in {cashondelivery, moneytransfer} | 422 | `bagistoapi::app.admin.cart.place-order.payment-method-unsupported` |

The supported-payment restriction matches the Bagisto admin UI — other methods
(Stripe, PayPal, …) cannot be admin-finalised through core's Create-Order
screen either.
