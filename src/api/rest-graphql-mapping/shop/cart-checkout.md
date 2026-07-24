---
outline: false
---

# Cart & Checkout mapping

The cart and checkout flow is a sequence — the same on both transports. The difference is naming: REST uses one path per step; GraphQL wraps each step as a mutation (most prefixed `create…`) and reads as a query.

Auth for this flow: a **guest** cart uses the cart token as the Bearer; a **logged-in** customer uses their customer token. See [Auth & Context](/api/rest-graphql-mapping/shop/auth-context).

## Cart

| Capability | REST | GraphQL |
|---|---|---|
| Create guest cart token | `POST /api/shop/cart-tokens` | `createCartToken` |
| Read cart | `POST /api/shop/cart` | `createReadCart` |
| Add item | `POST /api/shop/cart/add-to-cart` | `createAddProductInCart` |
| Update item quantity | `PUT /api/shop/cart/update-cart-item` | `createUpdateCartItem` |
| Remove item | `POST /api/shop/cart/remove-cart-item` | `createRemoveCartItem` |
| Apply coupon | `POST /api/shop/cart/apply-coupon` | `createApplyCoupon` |
| Remove coupon | `POST /api/shop/cart/remove-coupon` | `createRemoveCoupon` |
| Merge guest cart on login | `POST /api/shop/cart/merge-cart` | `createMergeCart` |
| Upload customizable-option file | `POST /api/shop/cart/upload-customizable-file` | — REST only (binary upload) |

## Checkout

| Capability | REST | GraphQL |
|---|---|---|
| Read saved addresses | `GET /api/shop/checkout/get-addresses` | `collectionGetCheckoutAddresses` |
| Set billing / shipping address | `POST /api/shop/checkout/set-billing-address` (or `set-shipping-address`) | `createCheckoutAddress` |
| Get shipping methods (rates) | `GET /api/shop/checkout/get-shipping-methods` | `collectionShippingRates` |
| Set shipping method | `POST /api/shop/checkout/set-shipping-method` | `createCheckoutShippingMethod` |
| Get payment methods | `GET /api/shop/checkout/get-payment-methods` | `collectionPaymentMethods` |
| Set payment method | `POST /api/shop/checkout/set-payment-method` | `createCheckoutPaymentMethod` |
| Place order | `POST /api/shop/checkout/place-order` | `createCheckoutOrder` |

::: warning Two things every checkout client must know
- **Shipping rates are empty until an address is saved.** Call set-address first; only then do get-shipping-methods / get-payment-methods return options.
- **`createCheckoutAddress` input is flat**, not nested — `billingFirstName`, `billingAddress`, `billingCountry`, `billingPostcode`, `useForShipping`, and the `shipping*` equivalents. A nested `{ billing {}, shipping {} }` is rejected.
:::

## Offsite payment redirect

For gateway methods (Stripe, PayU, PhonePe, Razorpay, PayPal), **set payment method** returns a non-null `paymentGatewayUrl` — redirect the shopper there, and the order is created when they return to the success URL. On-site methods (`cashondelivery`, `moneytransfer`) return `null` and go straight to place-order. See the [Checkout workflow](/api/workflows/shop/checkout).
