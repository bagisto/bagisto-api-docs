---
outline: false
examples:
  - id: get-shipping-methods
    title: Get Available Shipping Methods
    description: Retrieve available shipping methods for checkout.
    request: |
      curl -X GET "http://localhost/api/shop/checkout-shipping-methods" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": "flatrate_flatrate_flatrate",
          "code": "flatrate",
          "label": "Flat Rate",
          "price": 10,
          "formattedPrice": "$10.00",
          "description": "Flat Rate Shipping",
          "method": "flatrate_flatrate",
          "methodTitle": "Flat Rate",
          "methodDescription": "Flat Rate Shipping",
          "basePrice": 10,
          "baseFormattedPrice": "$10.00",
          "carrier": "flatrate",
          "carrierTitle": "Flat Rate"
        },
        {
          "id": "free_free_free",
          "code": "free",
          "label": "Free Shipping",
          "price": 0,
          "formattedPrice": "$0.00",
          "description": "Free Shipping",
          "method": "free_free",
          "methodTitle": "Free Shipping",
          "methodDescription": "Free Shipping",
          "basePrice": 0,
          "baseFormattedPrice": "$0.00",
          "carrier": "free",
          "carrierTitle": "Free Shipping"
        }
      ]
    commonErrors:
      - error: Empty array
        cause: No checkout address is saved on the cart yet, or no carrier serves the saved address
        solution: Save the address first with Set Checkout Address; an empty list is a 200, not an error
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

---

# Get Shipping Methods

Retrieve available shipping methods based on address and cart contents.

## Endpoint

```
GET /api/shop/checkout-shipping-methods
```

Listing the rates is a **GET with no body**. The same path also accepts a `POST`, but that is the setter — see [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method). A `POST` sent here without a `shippingMethod` fails.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Accept` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The cart's own token as a Bearer token, or a logged-in customer's token. |

The destination is taken from the address already saved on the cart. There is no way to quote rates for an arbitrary country, state, or postcode — those are not request parameters.

## Response Fields (200 OK)

A bare array of rates.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Rate identifier, e.g. `flatrate_flatrate_flatrate`. |
| `method` | string | **The value to send to [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method)**, e.g. `flatrate_flatrate`. Note it differs from `id`. |
| `code` | string | Short carrier code. |
| `label` / `methodTitle` | string | Display name for the rate. |
| `description` / `methodDescription` | string | Description shown alongside it. |
| `price` / `basePrice` | number | Rate cost, in cart and base currency. |
| `formattedPrice` / `baseFormattedPrice` | string | The same amounts, currency-formatted. |
| `carrier` / `carrierTitle` | string | Carrier the rate belongs to. |

There is no delivery estimate — the payload carries no `estimatedDays` or delivery date.

## Use Cases

- **Shipping step of checkout** — call after the address is saved and render one radio option per rate, using `formattedPrice` for the label.
- **Show "free shipping" when it qualifies** — free-shipping rules surface as an ordinary rate with a `price` of `0`, so nothing special is needed to detect them.

## Best Practices

- **Save the address first** — with none on the cart the response is `[]`, which reads as "no carriers available" rather than "step out of order".
- **Send `method`, not `id`, to the setter** — the two look similar and the `id` value is rejected.
- **Re-fetch after changing the address** — rates depend on the destination and are not recalculated on the client.
- **Treat an empty array as a blocked checkout** — the order cannot be placed until a shipping method is set for a cart with shippable items.

## Related Resources

- [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method) — save the chosen rate on the cart
- [Get Payment Methods](/api/rest-api/shop/checkout/get-payment-methods) — the payment methods the store offers
- [Get Checkout Addresses](/api/rest-api/shop/checkout/get-addresses) — read back the addresses saved on the cart
