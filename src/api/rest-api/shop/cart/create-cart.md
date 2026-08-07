---
outline: false
examples:
  - id: create-cart-token
    title: Create Cart
    description: Start a cart and receive the cart token that identifies it on every later call.
    request: |
      curl -X POST "http://localhost/api/shop/cart-tokens" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -d '{}'
    response: |
      HTTP/1.1 201 Created

      {
        "id": 492,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "customerId": null,
        "channelId": 1,
        "itemsCount": 0,
        "itemsQty": null,
        "items": [],
        "subtotal": 0,
        "baseSubtotal": 0,
        "discountAmount": 0,
        "baseDiscountAmount": 0,
        "taxAmount": 0,
        "baseTaxAmount": 0,
        "shippingAmount": 0,
        "baseShippingAmount": 0,
        "grandTotal": 0,
        "baseGrandTotal": 0,
        "formattedSubtotal": "$0.00",
        "formattedDiscountAmount": "$0.00",
        "formattedTaxAmount": "$0.00",
        "formattedShippingAmount": "$0.00",
        "formattedGrandTotal": "$0.00",
        "couponCode": null,
        "isGuest": true
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Create Cart

Start a shopping cart and obtain the **cart token** that identifies it. A guest client calls this once at the beginning of a session and reuses the returned token for every subsequent cart and checkout call.

## Endpoint

```
POST /api/shop/cart-tokens
```

The path is `/cart-tokens`, not `/cart` — `/api/shop/cart` is the read endpoint documented on [Get Cart](/api/rest-api/shop/cart/get-cart).

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `Accept` | Yes | `application/json` |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | No | A signed-in customer's Bearer token, to tie the cart to their account |

## Request Body

Send an empty object. The endpoint takes no fields — items are added afterwards with [Add to Cart](/api/rest-api/shop/cart/add-to-cart).

```json
{}
```

## Response Fields

The response is the newly created cart, returned as a bare object with no wrapper.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart ID. |
| `cartToken` | string | **Send this as `Authorization: Bearer <cartToken>` on every later cart call.** |
| `customerId` | integer | Owning customer, or `null` for a guest cart. |
| `channelId` | integer | Channel the cart belongs to. |
| `itemsCount` | integer | Number of line items. `0` on a new cart. |
| `itemsQty` | integer | Total units across those lines. |
| `items` | array | Line items — empty on a new cart. |
| `subtotal` / `baseSubtotal` | decimal | Items subtotal, in cart and base currency. |
| `discountAmount` / `baseDiscountAmount` | decimal | Discount applied. |
| `taxAmount` / `baseTaxAmount` | decimal | Tax calculated. |
| `shippingAmount` / `baseShippingAmount` | decimal | Shipping cost. |
| `grandTotal` / `baseGrandTotal` | decimal | Grand total. |
| `formattedSubtotal`, `formattedDiscountAmount`, `formattedTaxAmount`, `formattedShippingAmount`, `formattedGrandTotal` | string | The same amounts, currency-formatted for display. |
| `couponCode` | string | Applied coupon, or `null`. |
| `isGuest` | boolean | Whether the cart belongs to a guest. |

## Use Cases

- **Start a guest session** — call once, store `cartToken`, and send it on every cart and checkout request.
- **Start a signed-in session** — send the customer's Bearer token as well, so the cart is tied to their account and survives across devices.

## Best Practices

1. **Store the `cartToken`, not the cart `id`** — the token is what authenticates later calls; the numeric ID is informational
2. **Create the cart once per session** — calling again issues a new empty cart and orphans the previous one
3. **Merge after login** — a guest who signs in mid-session should call [Merge Cart](/api/rest-api/shop/cart/merge-cart) so their items survive
4. **Expect an empty cart, not an error** — a newly created cart has `itemsCount: 0` and zeroed totals

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart) — add a product of any type to the cart
- [Merge Cart](/api/rest-api/shop/cart/merge-cart) — fold a guest cart into the customer's cart after login
