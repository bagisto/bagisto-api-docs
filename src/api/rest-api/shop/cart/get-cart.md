---
outline: false
examples:
  - id: get-cart
    title: Get Cart
    description: Read the current cart with its items and recalculated totals. The cart is identified by the token sent in the Authorization header.
    request: |
      curl -X POST "http://localhost/api/shop/cart" \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
        -H "Authorization: Bearer 62f2b3f5-a455-4c78-93ba-eabca63d32ec" \
        -d '{}'
    response: |
      HTTP/1.1 200 OK

      {
        "id": 495,
        "cartToken": "62f2b3f5-a455-4c78-93ba-eabca63d32ec",
        "customerId": null,
        "channelId": 1,
        "itemsCount": 1,
        "items": [
          {
            "id": 358,
            "cartId": 495,
            "productId": 2,
            "name": "Blossom Breeze Cotton Printed Short Skirt",
            "sku": "ws-blossom-skirt",
            "quantity": 1,
            "price": 24.99,
            "basePrice": 24.99,
            "total": 24.99,
            "baseTotal": 24.99,
            "discountAmount": 0,
            "baseDiscountAmount": 0,
            "taxAmount": 0,
            "baseTaxAmount": 0,
            "options": null,
            "type": "simple",
            "formattedPrice": "$24.99",
            "formattedTotal": "$24.99",
            "priceInclTax": 24.99,
            "formattedPriceInclTax": "$24.99",
            "totalInclTax": 24.99,
            "formattedTotalInclTax": "$24.99",
            "productUrlKey": "blossom-breeze-cotton-printed-short-skirt",
            "canChangeQty": true
          }
        ],
        "subtotal": 24.99,
        "baseSubtotal": 24.99,
        "discountAmount": 0,
        "taxAmount": 0,
        "shippingAmount": 0,
        "grandTotal": 24.99,
        "formattedSubtotal": "$24.99",
        "formattedDiscountAmount": "$0.00",
        "formattedTaxAmount": "$0.00",
        "formattedShippingAmount": "$0.00",
        "formattedGrandTotal": "$24.99",
        "couponCode": null,
        "isGuest": true
      }
    commonErrors:
      - error: 404 Not Found
        cause: No cart exists for the supplied token, or the cart is empty and was cleared
        solution: Create a cart and add an item before reading it.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Get Cart

Read the current cart with its line items and recalculated totals.

## Endpoint

```
POST /api/shop/cart
```

Reading the cart is a **POST**, not a GET. The cart is identified by the token in the `Authorization` header rather than by a path parameter, and the endpoint takes an empty JSON body.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | `application/json` |
| `Accept` | Yes | `application/json` |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | `Bearer <cartToken>` for a guest, or the customer's Bearer token when signed in |

## Request Body

```json
{}
```

## Response Fields

The response is the cart itself, returned as a bare object with no wrapper.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart ID. |
| `cartToken` | string | Token identifying this cart. |
| `customerId` | integer | Owning customer, or `null` for a guest cart. |
| `channelId` | integer | Channel the cart belongs to. |
| `itemsCount` | integer | Number of line items. |
| `itemsQty` | integer | Total units across those lines. |
| `items` | array | Line items — fields below. |
| `subtotal` / `baseSubtotal` | decimal | Items subtotal. |
| `discountAmount` / `baseDiscountAmount` | decimal | Discount applied. |
| `taxAmount` / `baseTaxAmount` | decimal | Tax calculated. |
| `shippingAmount` / `baseShippingAmount` | decimal | Shipping cost, once a method is chosen. |
| `grandTotal` / `baseGrandTotal` | decimal | Grand total. |
| `formattedSubtotal`, `formattedDiscountAmount`, `formattedTaxAmount`, `formattedShippingAmount`, `formattedGrandTotal` | string | The same amounts, currency-formatted. |
| `couponCode` | string | Applied coupon, or `null`. |
| `isGuest` | boolean | Whether the cart belongs to a guest. |

### Item Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Cart item ID. **This is what the update and remove endpoints expect.** |
| `cartId` | integer | Parent cart ID. |
| `productId` | integer | Product on this line. |
| `name` / `sku` | string | Product name and SKU as added. |
| `quantity` | integer | Units on this line. |
| `price` / `total` | decimal | Unit price and line total. |
| `formattedPrice` / `formattedTotal` | string | The same values, currency-formatted. |
| `priceInclTax` / `totalInclTax` | decimal | Tax-inclusive equivalents, with `formatted*` variants. |
| `discountAmount` / `taxAmount` | decimal | Per-line discount and tax. |
| `options` | array | Selected options for configurable, bundle, and customizable products. `null` when none apply. |
| `type` | string | Product type of the line. |
| `baseImage` | string | JSON string of the product's image URLs at each size. |
| `productUrlKey` | string | Storefront slug, for linking back to the product. |
| `canChangeQty` | boolean | `false` for event and appointment bookings, whose quantity is fixed. |

## Use Cases

- **Render the cart page** — one call returns items and every total needed for the summary panel.
- **Refresh the mini-cart** — read after any change to pick up recalculated totals.
- **Resume a guest session** — a stored `cartToken` restores the cart on a return visit.

## Best Practices

1. **Treat `404 Cart not found` as "no cart yet"** — a cart only exists once an item has been added, and it is cleared again when the last item is removed
2. **Read the totals from the response, not from your own arithmetic** — discounts and tax are recalculated server-side on every change
3. **Use the `formatted*` fields for display** — they carry the active currency's symbol and formatting
4. **Keep the numeric item `id`** — update and remove both key off it

## Related Resources

- [Create Cart](/api/rest-api/shop/cart/create-cart) — obtain the cart token every other cart call needs
- [Add to Cart](/api/rest-api/shop/cart/add-to-cart) — add a product of any type to the cart
- [Update Cart Item](/api/rest-api/shop/cart/update-cart-item) — change a line's quantity
- [Remove Cart Item](/api/rest-api/shop/cart/remove-cart-item) — remove one line, or several in one call
