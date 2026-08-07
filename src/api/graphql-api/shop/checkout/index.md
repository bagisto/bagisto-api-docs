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

## Operations

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| Read the checkout address | [`collectionGetCheckoutAddresses`](/api/graphql-api/shop/queries/get-addresses) | The address applied to the active checkout, not the customer's address book. |
| List shipping methods | [`collectionShippingRates`](/api/graphql-api/shop/queries/get-shipping-methods) | Rates available for the saved address. |
| List payment methods | [`collectionPaymentMethods`](/api/graphql-api/shop/queries/get-payment-methods) | Methods available once shipping is chosen. |
| Set the checkout address | [`createCheckoutAddress`](/api/graphql-api/shop/mutations/set-billing-address) | Save the billing and shipping addresses on the cart. |
| Set the shipping method | [`createCheckoutShippingMethod`](/api/graphql-api/shop/mutations/set-shipping-method) | Choose one of the returned rates. |
| Set the payment method | [`createCheckoutPaymentMethod`](/api/graphql-api/shop/mutations/set-payment-method) | Choose one of the available methods. |
| Place the order | [`createCheckoutOrder`](/api/graphql-api/shop/mutations/place-order) | Convert the prepared cart into an order. |

Placing an order has two success shapes. A direct method such as cash on delivery returns the order immediately; a redirect gateway returns `redirect: true` with a `redirectUrl` and **no order yet** — the order is created when the gateway returns. Branch on `redirect` rather than assuming an `orderId` is present.

Checkout operates on the cart (identified by its cart token); a guest needs only the storefront key, while a signed-in customer also sends their Bearer token. See [Authentication](/api/graphql-api/authentication).
