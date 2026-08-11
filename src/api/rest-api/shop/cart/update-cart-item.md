---
outline: false
examples:
  - id: update-cart-item
    title: Update Cart Item
    description: Change the quantity of a cart line. Both cartItemId and quantity are required.
    request: |
      curl -X POST "http://localhost/api/shop/update-cart-item" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec" \
        -d '{
              "cartItemId": 358,
              "quantity": 3
            }'
    response: |
      HTTP/1.1 201 Created

      {
        "id": 495,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "itemsCount": 1,
        "items": [
          {
            "id": 358,
            "cartId": 495,
            "productId": 2,
            "name": "Blossom Breeze Cotton Printed Short Skirt",
            "sku": "ws-blossom-skirt",
            "quantity": 3,
            "price": 24.99,
            "total": 74.97,
            "formattedPrice": "$24.99",
            "formattedTotal": "$74.97",
            "type": "simple",
            "canChangeQty": true
          }
        ],
        "subtotal": 74.97,
        "discountAmount": 0,
        "taxAmount": 0,
        "shippingAmount": 0,
        "grandTotal": 74.97,
        "formattedSubtotal": "$74.97",
        "formattedGrandTotal": "$74.97",
        "couponCode": null,
        "isGuest": true
      }
    commonErrors:
      - error: 400 Bad Request — Cart item ID and quantity are required
        cause: One of the two fields was missing, or quantity was sent as 0
        solution: Send both; use Remove Cart Item to take the line out entirely
      - error: 401 Unauthorized — Authentication token is required
        cause: No cart or customer token was sent as the Bearer token
        solution: Send the cartToken from Create Cart, or a logged-in customer's token
      - error: success true but nothing changed
        cause: cartItemId does not match a line on this cart — often a product id was sent instead
        solution: Read items[].id from the cart payload and compare the line back after the call

---

# Update Cart Item

Change the quantity of a line already in the cart.

## Endpoint

```
POST /api/shop/update-cart-item
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
  "cartItemId": 372,
  "quantity": 4
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `cartItemId` | integer | Yes | The **cart line** id from `items[].id` — not the product id. |
| `quantity` | integer | Yes | New quantity. Must be 1 or more. |

Both fields are required together, and the check rejects `0` as well as a missing value — the shared message is `Cart item ID and quantity are required`. Removing a line is a separate call, [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item), not a quantity of zero.

Product options cannot be changed here. To switch a variant or an option selection, remove the line and add the product again with the new choice.

## Response

`201 Created` carrying the whole recalculated cart — the same object [Get Cart](/api/rest-api/shop/cart/get-cart) returns, plus `success` and `message`.

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the call completed. |
| `message` | string | `Cart item updated successfully`. |
| `items[].quantity` | integer | The new quantity on the updated line. |
| `subtotal` / `grandTotal` and their `formatted*` twins | number / string | Recalculated totals. |

An unknown `cartItemId` also answers `201` with `success: true` and an unchanged cart — the call is a silent no-op rather than a `404`. Verify by reading the line back from `items`.

## Validation

| Rule | Result |
|------|--------|
| `cartItemId` and `quantity` both present, quantity at least 1 | Otherwise `400 Cart item ID and quantity are required`. |
| A Bearer token identifies the cart | Otherwise `401 Authentication token is required`. |
| Requested quantity is available | Stock is enforced by the cart, which trims the line and reports the change in the returned totals. |

## Use Cases

- **Quantity stepper on the cart page** — post the new quantity and re-render from the returned cart.
- **"Move to 1 before checkout" flows** — the same call handles both increase and decrease.

## Best Practices

- **Confirm the change from `items`, not from `success`** — a wrong line id reports success while changing nothing.
- **Send the line id, not the product id** — a product id normally matches no line and is silently ignored.
- **Use the remove endpoint for zero** — quantity `0` is rejected as a missing value.
- **Re-render totals from the response** — the payload is the full recalculated cart, so no follow-up fetch is needed.

## Related Resources

- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart) — add a product of any type to the cart
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item) — remove one line, or several in one call
