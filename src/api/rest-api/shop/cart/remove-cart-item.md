---
outline: false
examples:
  - id: remove-cart-item
    title: Remove One Item
    description: Remove a single line from the cart. The cart is identified by its token, the line by its cart-item id.
    request: |
      POST /api/shop/remove-cart-item
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec

      {
        "cartItemId": 369
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 506,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "customerId": null,
        "channelId": 1,
        "itemsCount": 0,
        "items": [],
        "subtotal": 0,
        "discountAmount": 0,
        "taxAmount": 0,
        "shippingAmount": 0,
        "grandTotal": 0,
        "formattedSubtotal": "$0.00",
        "formattedGrandTotal": "$0.00",
        "couponCode": null,
        "success": true,
        "message": "Item removed from cart successfully"
      }
    commonErrors:
      - error: 400 Bad Request — Cart item ID is required
        cause: cartItemId was missing from the body
        solution: Send the id of the cart line, not the product id
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token

  - id: remove-cart-items
    title: Remove Several Items
    description: Remove more than one line in a single call. A separate endpoint, taking an array of cart-item ids under itemIds.
    request: |
      POST /api/shop/remove-cart-items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec

      {
        "itemIds": [370, 371]
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 506,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "itemsCount": 0,
        "items": [],
        "subtotal": 0,
        "grandTotal": 0,
        "formattedGrandTotal": "$0.00",
        "couponCode": null,
        "success": true,
        "message": "Items removed from cart successfully"
      }
    commonErrors:
      - error: 400 Bad Request — Item IDs array is required
        cause: The body used cartItemIds, or the array was empty
        solution: The bulk endpoint reads itemIds — the singular endpoint's cartItemId name does not apply here

---

# Remove Cart Item

Remove one line from the cart, or several in a single call.

## Endpoints

| Purpose | Method & Path | Body field |
|---------|---------------|------------|
| Remove one line | `POST /api/shop/remove-cart-item` | `cartItemId` (integer) |
| Remove several lines | `POST /api/shop/remove-cart-items` | `itemIds` (array of integers) |

The two endpoints use **different body field names** — `cartItemId` on the singular route, `itemIds` on the plural one. Sending the wrong one is read as a missing value and rejected with `400`.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | The cart's own token as a Bearer token, or a logged-in customer's token. |

## Request Body

```json
{
  "cartItemId": 369
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cartItemId` | integer | Yes | The **cart line** id, from `items[].id` on the cart payload — not the product id. |

For the bulk route:

```json
{
  "itemIds": [370, 371]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `itemIds` | array | Yes | Cart line ids. An empty array is rejected. |

## Response

`201 Created` carrying the whole recalculated cart — the same object [Get Cart](/api/rest-api/shop/cart/get-cart) returns, plus `success` and `message`.

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the line or lines were removed. |
| `message` | string | `Item removed from cart successfully`, or the plural form on the bulk route. |
| `items` | array | The remaining lines. Empty once the last one is gone. |
| `grandTotal` and the other totals | number | Recalculated after the removal. |

Removing the last line leaves an empty cart rather than deleting it — the same `cartToken` keeps working, so the shopper can carry on adding.

## Use Cases

- **"Remove" on a cart line** — post the line id and re-render from the returned cart; no follow-up fetch is needed.
- **"Clear cart"** — collect every `items[].id` and send them to the bulk route in one call instead of looping the singular one.
- **Remove out-of-stock lines before checkout** — the bulk route takes exactly the ids a stock check flagged.

## Best Practices

- **Send the cart line id, not the product id** — they differ, and a product id usually matches no line, so nothing is removed.
- **Match the field name to the route** — `cartItemId` singular, `itemIds` plural; mixing them produces a `400` that reads as a missing field.
- **Re-render from the response** — it is the full recalculated cart, including totals and any coupon still applied.
- **Do not recreate the cart after removing everything** — the token stays valid on an empty cart.

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart) — add a product of any type to the cart
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item) — change a line's quantity
