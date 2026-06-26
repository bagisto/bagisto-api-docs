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

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Addresses](/api/rest-api/shop/checkout/get-addresses) | `GET /api/shop/checkout-addresses` | Read the addresses saved on the cart. |
| [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address) | `POST /api/shop/checkout-addresses` | Save the shipping address. |
| [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address) | `POST /api/shop/checkout-addresses` | Save the billing address. |
| [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) | `GET /api/shop/checkout-shipping-methods` | List available shipping rates. |
| [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method) | `POST /api/shop/checkout-shipping-methods` | Select a shipping method. |
| [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods) | `GET /api/shop/checkout-payment-methods` | List available payment methods. |
| [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method) | `POST /api/shop/checkout-payment-methods` | Select a payment method. |
| [Place Order](/api/rest-api/shop/checkout/place-order) | `POST /api/shop/checkout-orders` | Finalise the cart into an order. |

All Checkout endpoints require the storefront key and the active cart's token — see [Authentication](/api/rest-api/authentication).
