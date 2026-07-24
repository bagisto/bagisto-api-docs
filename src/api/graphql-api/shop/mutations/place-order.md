---
outline: false
examples:
  - id: place-order-onsite
    title: Place Order (on-site payment)
    description: Cash-on-delivery or money-transfer — the order is created immediately.
    query: |
      mutation createCheckoutOrder {
        createCheckoutOrder(input:{}) {
          checkoutOrder {
            id
            orderId
            redirect
            redirectUrl
            success
            message
          }
        }
      }
    response: |
      {
        "data": {
          "createCheckoutOrder": {
            "checkoutOrder": {
              "id": "4814",
              "orderId": "554",
              "redirect": false,
              "redirectUrl": null,
              "success": true,
              "message": "Order placed successfully"
            }
          }
        }
      }
  - id: place-order-redirect
    title: Place Order (payment gateway)
    description: Stripe / PayU / PhonePe / Razorpay / PayPal — no order yet; redirect the shopper to complete payment.
    query: |
      mutation createCheckoutOrder {
        createCheckoutOrder(input:{}) {
          checkoutOrder {
            id
            orderId
            redirect
            redirectUrl
            success
            message
          }
        }
      }
    response: |
      {
        "data": {
          "createCheckoutOrder": {
            "checkoutOrder": {
              "id": "9372",
              "orderId": null,
              "redirect": true,
              "redirectUrl": "https://your-domain.com/stripe/redirect",
              "success": true,
              "message": "This payment method requires the shopper to complete payment on the gateway. Send them to redirectUrl; the order is created once the gateway confirms the payment."
            }
          }
        }
      }
---

# Place Order

Create an order from a cart and complete the checkout process.

## Authentication

This query supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the Guest Cart Token `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```
 
## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID | The cart id the order was placed from (numeric — this is an action result, not a fetchable IRI; use `orderId` for the created order). |
| `orderId` | String | The created order id — **only set on the on-site path**. `null` when a payment redirect is required (the order is created after the gateway confirms). |
| `redirect` | Boolean | `true` when the payment method needs the shopper sent to a payment page before the order exists. |
| `redirectUrl` | String | The payment page to open when `redirect` is `true`; `null` otherwise. |
| `success` | Boolean | `true` when the call succeeded — either the order was placed **or** a redirect is required. Order-placement **failures** are returned in `errors[]`, not here. |
| `message` | String | Human-readable result — "order placed", or an explanation that the shopper must be redirected to complete payment. |

### Two outcomes

This mutation has two success shapes — branch on `redirect`:

- **`redirect: false`** (cash-on-delivery, money-transfer) — the order exists; read `orderId`.
- **`redirect: true`** (stripe, payu, phonepe, razorpay, paypal) — **no order yet**. `orderId` is `null`; send the shopper to `redirectUrl` to pay. The order is created when the gateway returns to your success URL. `message` explains this so a client that only checks the payload knows why there is no order id.

On a genuine failure (empty cart, missing address/shipping/payment, suspended account, minimum-order not met) the mutation returns `errors[]` with the exact reason and `checkoutOrder` is `null`.

## Prerequisites

All of these must be completed before placing an order:
1. ✅ Cart must contain items
2. ✅ Shipping address must be set
3. ✅ Billing address must be set
4. ✅ Shipping method must be selected
5. ✅ Payment method must be selected
6. ✅ Valid coupon (if applicable)

## Validation Rules

- Cart must have at least one item
- All checkout steps must be completed
- Billing and shipping addresses are required
- Shipping and payment methods must be selected
- Stock must be available for all items
- Inventory must not be exceeded

## Error Responses

```json
{
  "errors": {
    "checkout": ["Unable to complete checkout. Please verify all required fields."],
    "inventory": ["Insufficient stock for one or more items."],
    "payment": ["Payment processing failed."]
  }
}
```

## Order Status Values

| Status | Description |
|--------|-------------|
| `pending` | Order created, awaiting payment |
| `processing` | Payment confirmed, preparing shipment |
| `shipped` | Order has been shipped |
| `delivered` | Order delivered |
| `cancelled` | Order cancelled |
| `refunded` | Order refunded |

## After Order Placement

1. Cart is cleared
2. Order confirmation email is sent
3. Inventory is updated
4. Customer can track order using order ID

## Related Documentation

- [Create Cart](/api/graphql-api/shop/mutations/create-cart)
- [Set Checkout Address](/api/graphql-api/shop/mutations/set-billing-address)
- [Set Payment Method](/api/graphql-api/shop/mutations/set-payment-method)
- [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders)
