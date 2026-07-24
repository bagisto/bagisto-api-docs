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
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 400 Bad Request
        cause: Missing required checkout details
        solution: Ensure shipping address, method, and payment method are set
      - error: 409 Conflict
        cause: Cart is empty
        solution: Add items to cart first
      - error: 422 Unprocessable Entity
        cause: Inventory not available
        solution: Verify product stock

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

- `pending` - Awaiting payment confirmation
- `processing` - Payment confirmed, preparing shipment
- `shipped` - Order shipped
- `delivered` - Order delivered
- `canceled` - Order canceled
- `failed` - Payment failed

## Pre-requisites

All of these must be completed before placing order:
1. Cart must have items
2. Shipping address must be set
3. Shipping method must be selected
4. Billing address must be set
5. Payment method must be selected
6. All items in stock

## After Order Placement

- Cart is automatically cleared
- Customer receives confirmation email
- Order status can be tracked
- Invoice becomes available
- Payment processing may redirect customer

## Validation Rules

- Cart cannot be empty
- All addresses must be complete
- Inventory must be available for all items
- Shipping method must match location
- Payment method must be valid

## Use Cases

- Complete customer checkout
- Create order for in-store pickup
- Process cash on delivery
- Execute payment gateway transaction
- Generate order confirmation and invoice

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart)
- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address)
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address)
- [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method)
- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method)
- [Get Customer Orders](/api/rest-api/shop/customers/get-customer-orders)
