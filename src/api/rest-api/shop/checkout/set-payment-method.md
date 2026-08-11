---
outline: false
examples:
  - id: set-payment-method
    title: Set Payment Method
    description: Select a payment method for the order.
    request: |
      POST /api/shop/checkout-payment-methods
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "paymentMethod": "cashondelivery"
      }
    response: |
      HTTP/1.1 201 Created

      {
        "success": true,
        "message": "Payment method saved successfully",
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "paymentMethod": "cashondelivery",
        "paymentRedirectUrl": null,
        "paymentGatewayUrl": null,
        "paymentData": null
      }
    commonErrors:
      - error: 500 Internal Server Error — Payment method is required
        cause: paymentMethod was missing, or the body nested it under a payment object
        solution: Send paymentMethod as a top-level string
      - error: 500 Internal Server Error — Invalid or unavailable payment method
        cause: The code is not one the store currently offers
        solution: Use a method value from Get Payment Methods
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Set Payment Method

Select a payment method for the order checkout.

## Endpoint

```
POST /api/shop/checkout-payment-methods
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The cart's own token as a Bearer token, or a logged-in customer's token. |

## Request Body

```json
{
  "paymentMethod": "cashondelivery"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `paymentMethod` | string | Yes | The `method` value of the chosen option from [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods). |

The field is a **top-level string**. A body that nests it as `{"payment": {"method": "…"}}` is read as missing and fails with `Payment method is required`.

Do not hardcode the method list — which codes exist depends on the payment extensions the store has installed and enabled. A store typically offers `cashondelivery` and `moneytransfer` out of the box, with gateway methods such as `stripe`, `razorpay`, or `paypal_standard` added on top.

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `paymentMethod` | string | The method now saved on the cart. |
| `cartToken` | string | The cart's token, unchanged. |
| `success` | boolean | `true` when the method was saved. |
| `message` | string | `Payment method saved successfully`. |
| `paymentRedirectUrl` | string | Where to send the shopper for an off-site gateway, `null` for methods that complete in place. |
| `paymentGatewayUrl` | string | Gateway endpoint when the method posts to one, `null` otherwise. |
| `paymentData` | object | Extra data a gateway needs on the client, `null` when there is none. |

The response is a confirmation object, not the cart. Fetch [Get Cart](/api/rest-api/shop/cart/get-cart) if the summary needs refreshing.

## Validation

| Rule | Result |
|------|--------|
| `paymentMethod` present at the top level | Missing or nested → `500 Payment method is required`. |
| The method is currently offered | Otherwise `500 Invalid or unavailable payment method`. |
| A Bearer token identifies the cart | Otherwise `401 Authentication token is required`. |

Unlike the shipping list, the payment list is not address-dependent — it returns the store's methods whether or not an address has been saved.

## Use Cases

- **Payment step of checkout** — post the selected `method`, then call [Place Order](/api/rest-api/shop/checkout/place-order).
- **Redirect to a gateway** — when `paymentRedirectUrl` comes back non-null, send the shopper there rather than placing the order directly.

## Best Practices

- **Render the options from the API, not a hardcoded list** — the available methods differ per store and per installed extension.
- **Check `paymentRedirectUrl` before showing a "Place order" button** — an off-site method needs the redirect instead.
- **Set shipping before payment** — a cart with shippable items and no shipping method cannot be turned into an order.

## Related Resources

- [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods) — the payment methods the store offers
- [Set Billing Address](/api/rest-api/shop/checkout/set-billing-address) — save both checkout addresses in one call
- [Place Order](/api/rest-api/shop/checkout/place-order) — turn the prepared cart into an order
