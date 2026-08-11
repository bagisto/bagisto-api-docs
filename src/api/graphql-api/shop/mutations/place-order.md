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

## Before the order can be placed

Every step of the checkout must be complete. The mutation fails with `errors[]` and a `null` payload when any of them is outstanding:

| Requirement | Satisfied by |
|-------------|--------------|
| The cart holds at least one item | [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) |
| A billing address is set | [Set Checkout Address](/api/graphql-api/shop/mutations/set-billing-address) |
| A shipping address is set, for a cart with shippable items | [Set Checkout Address](/api/graphql-api/shop/mutations/set-billing-address) |
| A shipping method is selected | [Set Shipping Method](/api/graphql-api/shop/mutations/set-shipping-method) |
| A payment method is selected | [Set Payment Method](/api/graphql-api/shop/mutations/set-payment-method) |

Stock is re-checked at this point as well, so an item that sold out while the shopper was in checkout fails the call even though every step was completed.

A coupon is not a prerequisite. An invalid or expired one blocks the order, but placing an order without any coupon is the normal case.

## Order status after placing

A newly placed order is `pending`, or `pending_payment` while a redirect gateway completes. It then moves through the store's own workflow:

| Status | Meaning |
|--------|---------|
| `pending` | Order created and awaiting processing. |
| `pending_payment` | Awaiting payment confirmation from the gateway. |
| `processing` | Payment confirmed and the order is being prepared. |
| `completed` | Fully invoiced and shipped. |
| `canceled` | Canceled before fulfilment. |
| `closed` | Closed after a refund. |
| `fraud` | Flagged by the store as fraudulent. |

## What happens on success

- The cart is emptied and its token stops resolving.
- The order confirmation email is sent to the shopper.
- Stock is decremented for every ordered item.
- The shopper can track the order through [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders).

On a redirect payment none of this happens yet — the cart survives until the gateway returns and the order is actually created.

## Related Documentation

- [Create Cart](/api/graphql-api/shop/mutations/create-cart)
- [Set Checkout Address](/api/graphql-api/shop/mutations/set-billing-address)
- [Set Payment Method](/api/graphql-api/shop/mutations/set-payment-method)
- [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders)
