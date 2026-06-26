---
outline: false
---

# Checkout

The Checkout menu turns a prepared cart into a placed order. It runs as an ordered sequence — set the address, pick a shipping method, pick a payment method, then place the order — and provides queries to read the saved addresses and the available shipping / payment options at each step.

## The checkout sequence

Checkout must run in order, because each step depends on the one before:

1. **Set the checkout address** (billing, and shipping unless the cart is virtual / downloadable only).
2. **Get shipping methods** for the saved address, then **set the chosen shipping method**.
3. **Get payment methods** available once shipping is selected, then **set the chosen payment method**.
4. **Place the order** to finalise the cart into an order.

Calling a step out of sequence (for example, fetching shipping methods before an address is saved) fails — finish the previous step first.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Get Addresses](/api/graphql-api/shop/queries/get-addresses) | `addresses` query |
| [Get Shipping Methods](/api/graphql-api/shop/queries/get-shipping-methods) | `shippingMethods` query |
| [Get Payment Methods](/api/graphql-api/shop/queries/get-payment-methods) | `paymentMethods` query |
| [Set Checkout Address](/api/graphql-api/shop/mutations/set-billing-address) | `saveCheckoutAddresses` mutation |
| [Set Shipping Method](/api/graphql-api/shop/mutations/set-shipping-method) | `saveShippingMethod` mutation |
| [Set Payment Method](/api/graphql-api/shop/mutations/set-payment-method) | `savePaymentMethod` mutation |
| [Place Order](/api/graphql-api/shop/mutations/place-order) | `placeOrder` mutation |

Checkout operates on the cart (identified by its cart token); a guest needs only the storefront key, while a signed-in customer also sends their Bearer token. See [Authentication](/api/graphql-api/authentication).
