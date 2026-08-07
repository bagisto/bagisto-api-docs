---
outline: false
examples:
  - id: place-order-onsite
    title: Place Order (on-site payment)
    description: Cash-on-delivery or money-transfer — the order is created immediately. Address, shipping method, and payment method must already be set on the cart, so the body is empty.
    request: |
      POST /api/shop/checkout-orders
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {}
    response: |
      HTTP/1.1 201 Created

      {
        "id": 9372,
        "cartToken": "1536",
        "orderId": "554",
        "redirect": false,
        "redirectUrl": null,
        "success": true,
        "message": "Order placed successfully"
      }
  - id: place-order-redirect
    title: Place Order (payment gateway)
    description: Stripe / PayU / PhonePe / Razorpay / PayPal — no order is created yet; redirect the shopper to redirectUrl to complete payment.
    request: |
      POST /api/shop/checkout-orders
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {}
    response: |
      HTTP/1.1 201 Created

      {
        "id": 9372,
        "cartToken": "1536",
        "orderId": null,
        "redirect": true,
        "redirectUrl": "https://your-domain.com/stripe/redirect",
        "success": true,
        "message": "This payment method requires the shopper to complete payment on the gateway. Send them to redirectUrl; the order is created once the gateway confirms the payment."
      }
    commonErrors:
      - error: 500 Internal Server Error — Cart is empty
        cause: The cart has no items, or a previous place-order already emptied it
        solution: Add items before placing; a repeated call after success fails this way
      - error: 500 Internal Server Error — Billing address is required
        cause: The checkout address step has not been completed for this cart
        solution: Save the address with Set Checkout Address, then set shipping and payment
      - error: 500 Internal Server Error — Shipping method is required
        cause: The cart holds shippable items but no shipping method is saved
        solution: Pick a rate from Get Shipping Methods and save it
      - error: 500 Internal Server Error — Payment method is required
        cause: No payment method is saved on the cart
        solution: Save one with Set Payment Method
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Place Order

Create an order from the shopping cart. This completes the checkout process.

## Endpoint

```
POST /api/shop/checkout-orders
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

The address, shipping method, and payment method are set on the cart in the preceding checkout steps, so place-order takes an **empty body**:

```json
{}
```

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | The cart id the order was placed from (not the order id). |
| `cartToken` | string | The cart token. |
| `orderId` | string | The created order id — **only set on the on-site path**; `null` when a payment redirect is required. |
| `redirect` | boolean | `true` when the payment method needs the shopper sent to a payment page before the order exists. |
| `redirectUrl` | string | The payment page to open when `redirect` is `true`; `null` otherwise. |
| `success` | boolean | `true` when the call succeeded — order placed **or** redirect required. Failures return a 4xx with the reason, not `success: false`. |
| `message` | string | Human-readable result — "order placed", or an explanation to redirect the shopper to complete payment. |

### Two outcomes — branch on `redirect`

- **`redirect: false`** (cash-on-delivery, money-transfer) — the order exists; read `orderId`.
- **`redirect: true`** (stripe, payu, phonepe, razorpay, paypal) — **no order yet**. `orderId` is `null`; send the shopper to `redirectUrl` to pay. The order is created when the gateway returns to your success URL. `message` explains this.

On a genuine failure (empty cart, missing address/shipping/payment, suspended account, minimum-order not met) the endpoint returns a **4xx** with the exact reason in the error body — it does not return `success: false`.

## Order Status Values

A newly placed order starts at `pending`, or `processing` once payment is confirmed. The full set a storefront can see is listed on [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders).

## Prerequisites

Each step writes to the cart, and place-order reads what they left behind. They must run in this order:

1. A cart with at least one item — otherwise `Cart is empty`.
2. A billing address, and a shipping address when the cart holds shippable items — otherwise `Billing address is required`.
3. A shipping method, for a cart with shippable items.
4. A payment method.

Every failure is reported as a `500` with the reason in `detail`, not as a `4xx` and not as `success: false`. Read `detail` to know which step is missing.

## After the Order Is Placed

- The cart is emptied and its token can no longer be used for checkout.
- The order confirmation email goes out to the address captured at checkout.
- The order appears in [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) for a logged-in shopper. A guest order is not listed there — keep the returned `orderId` client-side.
- The invoice is created by the store, not at checkout, so [Get Customer Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) may be empty right after placing.

## Use Cases

- **Finish a guest checkout** — the whole flow works with the cart token alone; capture `orderId` from the response, since a guest cannot look the order up afterwards.
- **Gateway checkout** — when `redirect` is `true`, hand the shopper to `redirectUrl` and wait for the gateway to return; do not treat the missing `orderId` as a failure.

## Best Practices

- **Branch on `redirect` before reading `orderId`** — on the redirect path there is no order yet and `orderId` is `null`.
- **Read `detail` on a failure, not the status code** — every missing prerequisite is a `500`, so only the message identifies which step to send the shopper back to.
- **Store `orderId` for guests immediately** — there is no guest order-lookup endpoint.
- **Do not retry blindly after a success** — the cart is emptied, so a second call fails with `Cart is empty` rather than duplicating the order.

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address) — the same call with a separate delivery address
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address) — save both checkout addresses in one call
- [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method) — save the chosen rate on the cart
- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method) — save the chosen payment method on the cart
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
