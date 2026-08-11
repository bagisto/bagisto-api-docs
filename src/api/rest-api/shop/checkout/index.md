---
outline: false
apiType: rest
---

# Checkout

The Checkout menu turns a prepared cart into a placed order. It runs as a sequence: set the addresses, choose a shipping method, choose a payment method, then place the order.

## The checkout sequence

Checkout is order-sensitive — each step unlocks the next:

1. **Set the shipping and billing addresses** (or read back the saved ones). Addresses are required before shipping rates can be calculated.
2. **Get shipping methods** for the cart, then **set** the chosen one.
3. **Get payment methods**, then **set** the chosen one.
4. **Place the order** to finalise the cart into an order.

Calling a step out of order (e.g. asking for shipping methods before addresses are saved) is rejected — complete the earlier step first.

## Body Shapes to Get Right

Three of the four write steps have a shape that is easy to guess wrong:

| Step | Send | Not |
|------|------|-----|
| Address | Flat `billingFirstName`, `billingAddress`, `billingCity`, … plus `useForShipping` | A nested `billing: { … }` object |
| Shipping method | `shippingMethod`, holding the rate's **`method`** value | `shippingMethodCode`, or the rate's `id` |
| Payment method | `paymentMethod` as a top-level string | A nested `payment: { method }` object |
| Place order | `{}` | Anything — the cart already holds every choice |

The shipping rate list is where this bites most: a rate carries both `id` (`flatrate_flatrate_flatrate`) and `method` (`flatrate_flatrate`), and only `method` is accepted.

## Failures Report as 500 With a Reason

A step run out of order does not answer `4xx`. Every missing prerequisite comes back as `500` with the cause in `detail` — `Cart is empty`, `Billing address is required`, `Shipping method is required`, `Payment method is required`. Read `detail` to know which step to send the shopper back to; the status code alone says nothing.

## Two Outcomes When Placing an Order

Place Order answers `201` either way, and `redirect` decides what happens next. With `redirect: false` the order exists and `orderId` is set. With `redirect: true` there is **no order yet**: `orderId` is `null` and the shopper must be sent to `redirectUrl`, where the gateway creates the order once payment clears. Treating the missing `orderId` as a failure is the common mistake.

Afterwards the cart is emptied, so a repeated call fails with `Cart is empty` rather than duplicating the order. A guest order is not listed under customer orders, so capture `orderId` client-side at that moment.

## Guest and Customer Checkout

The whole sequence works with a cart token alone — no account required. A logged-in customer sends their own Bearer token instead, and can prefill the address step from their saved addresses, though checkout stores its own copy of the address on the cart rather than referencing the address-book row.

## Operations

Checkout runs as an ordered sequence. Each step depends on the one before, and the read endpoints return an empty array until their prerequisite is saved.

| Step | Operation | Method & Path |
|------|-----------|---------------|
| 1 | [Set Checkout Address](/api/rest-api/shop/checkout/set-billing-address) | `POST /api/shop/checkout-addresses` |
| 1a | [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address) | `POST /api/shop/checkout-addresses` — the same call, with `useForShipping: false` |
| 2 | [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) | `GET /api/shop/checkout-shipping-methods` |
| 3 | [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method) | `POST /api/shop/checkout-shipping-methods` |
| 4 | [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods) | `GET /api/shop/payment-methods` |
| 5 | [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method) | `POST /api/shop/checkout-payment-methods` |
| 6 | [Place Order](/api/rest-api/shop/checkout/place-order) | `POST /api/shop/checkout-orders` |
| — | [Get Addresses](/api/rest-api/shop/checkout/get-addresses) | `GET /api/shop/checkout-addresses` — read back what step 1 saved |

Two paths are easy to get wrong. Reading payment methods is **`GET /api/shop/payment-methods`**, not `checkout-payment-methods`, which accepts POST only. And one endpoint saves both addresses — there is no separate billing and shipping call.

All Checkout endpoints require the storefront key and the active cart's token — see [Authentication](/api/rest-api/authentication).
