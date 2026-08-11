---
outline: false
examples:
  - id: set-shipping-method
    title: Set Shipping Method
    description: Select a shipping method for the order.
    request: |
      POST /api/shop/checkout-shipping-methods
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "shippingMethod": "flatrate_flatrate"
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": "504",
        "success": true,
        "message": "Shipping method saved successfully",
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "shippingMethod": "flatrate_flatrate"
      }
    commonErrors:
      - error: 500 Internal Server Error — Shipping method is required
        cause: shippingMethod was missing from the body
        solution: Send the method value of a rate from Get Shipping Methods
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Set Shipping Method

Select a shipping method for the order.

## Endpoint

```
POST /api/shop/checkout-shipping-methods
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
  "shippingMethod": "flatrate_flatrate"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `shippingMethod` | string | Yes | The `method` value of the chosen rate from [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods), e.g. `flatrate_flatrate`. |

There is no `shippingMethodCode` field. Send the rate's `method`, not its `id` — `flatrate_flatrate_flatrate` is the id and is not accepted.

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Cart ID. |
| `cartToken` | string | The cart's token, unchanged. |
| `shippingMethod` | string | The method now saved on the cart. |
| `success` | boolean | `true` when the method was saved. |
| `message` | string | `Shipping method saved successfully`. |

The response is a small confirmation object, not the cart. Read the updated totals — shipping now affects the grand total — from [Get Cart](/api/rest-api/shop/cart/get-cart).

## Validation

| Rule | Result |
|------|--------|
| `shippingMethod` present | Missing → `500` with `Shipping method is required`. |
| A Bearer token identifies the cart | Otherwise `401 Authentication token is required`. |
| An address is saved on the cart | Rates cannot be listed without one, so there is nothing valid to send. |

## Use Cases

- **Shipping step of checkout** — post the `method` from the rate the shopper picked, then move on to [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method).
- **Change of mind** — posting a different method replaces the saved one; there is no separate clear call.

## Best Practices

- **Take the value from the rate list** — hardcoding a method code breaks as soon as the store enables or renames a carrier.
- **Fetch the cart afterwards to show the new total** — this response carries no totals.
- **Re-run the shipping step after an address change** — the saved method may no longer be offered for the new destination.

## Related Resources

- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) — the rates available for the saved address
- [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address) — the same call with a separate delivery address
- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method) — save the chosen payment method on the cart
