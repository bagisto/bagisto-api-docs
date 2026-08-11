---
outline: false
examples:
  - id: get-payment-methods
    title: Get Available Payment Methods
    description: List the payment methods the store offers for the current cart. Requires the cart token; the list is empty until a checkout address and shipping method are saved.
    request: |
      curl -X GET "http://localhost/api/shop/payment-methods" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": "stripe",
          "method": "stripe",
          "title": "Stripe",
          "description": "Stripe",
          "icon": "http://localhost/themes/shop/default/build/assets/stripe-WsnmAxt1.png",
          "additionalData": null,
          "isAllowed": true
        },
        {
          "id": "cashondelivery",
          "method": "cashondelivery",
          "title": "Cash On Delivery",
          "description": "Cash On Delivery",
          "icon": "http://localhost/themes/shop/default/build/assets/cash-on-delivery-DUCmTQ0R.png",
          "additionalData": null,
          "isAllowed": true
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 404 Not Found
        cause: No cart resolves from the supplied token
        solution: Create a cart and add an item before reading payment methods.

---

# Get Payment Methods

List the payment methods available for the current cart.

## Endpoint

```
GET /api/shop/payment-methods
```

The path is `/payment-methods`. `/api/shop/checkout-payment-methods` accepts **POST only** — that is [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method), not the read.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Accept` | Yes | `application/json` |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | `Bearer <cartToken>` for a guest, or the customer's Bearer token when signed in |

## Response Fields

The response is a bare array of methods.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Method identifier, the same value as `method`. |
| `method` | string | Method code — send this to [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method). |
| `title` | string | Display name configured by the merchant. |
| `description` | string | Description shown alongside the option. |
| `icon` | string | Absolute URL of the method's icon. |
| `additionalData` | object | Extra configuration a gateway supplies, or `null`. |
| `isAllowed` | boolean | Whether the method may be selected for this cart. |

## Order of the checkout steps

Payment methods depend on the steps before them. Calling this before they are complete returns an empty array rather than an error:

1. Save the checkout address with [Set Checkout Address](/api/rest-api/shop/checkout/set-billing-address).
2. Select a rate with [Set Shipping Method](/api/rest-api/shop/checkout/set-shipping-method).
3. Read this list and let the shopper choose.

## Use Cases

- **Render the payment step** — one call gives the title, icon, and code for every option.
- **Filter what is selectable** — hide or disable any method whose `isAllowed` is `false` rather than letting the shopper pick it and fail at order placement.

## Best Practices

1. **Send `method`, not `title`, when selecting** — the code is the identifier the set endpoint expects
2. **Treat an empty array as "steps outstanding"** — it means no address or no shipping method yet, not that the store accepts no payments
3. **Re-read after changing the address** — availability can differ by country, so a shipping-address change can add or remove methods
4. **Check `isAllowed` before rendering** — a method can be listed but blocked for this particular cart

## Related Resources

- [Set Payment Method](/api/rest-api/shop/checkout/set-payment-method) — save the chosen payment method on the cart
- [Get Shipping Methods](/api/rest-api/shop/checkout/get-shipping-methods) — the rates available for the saved address
- [Place Order](/api/rest-api/shop/checkout/place-order) — turn the prepared cart into an order
