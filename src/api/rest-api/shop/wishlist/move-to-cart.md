---
outline: false
examples:
  - id: move-wishlist-to-cart
    title: Move Wishlist Item to Cart
    description: Move a wishlist item to the shopping cart and remove it from the wishlist.
    request: |
      POST /api/shop/move-wishlist-to-carts
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "wishlistItemId": 77,
        "quantity": 2
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 1,
        "cartToken": null,
        "customerId": 122,
        "channelId": 1,
        "itemsCount": 1,
        "items": [
          {
            "id": 368,
            "cartId": 1,
            "productId": 126,
            "name": "Digital Air Fryer with Touch Controls \u2013 4.5L",
            "sku": "el-air-fryer",
            "quantity": 1,
            "price": 122.5,
            "basePrice": 122.5,
            "total": 122.5,
            "baseTotal": 122.5,
            "discountAmount": 0,
            "baseDiscountAmount": 0,
            "taxAmount": 0,
            "baseTaxAmount": 0,
            "type": "simple",
            "formattedPrice": "$122.50",
            "formattedTotal": "$122.50",
            "priceInclTax": 122.5,
            "basePriceInclTax": 122.5,
            "formattedPriceInclTax": "$122.50",
            "totalInclTax": 122.5,
            "baseTotalInclTax": 122.5,
            "formattedTotalInclTax": "$122.50",
            "baseImage": "{\"small_image_url\":\"https://yourstore.com/cache/small/products/419/nDQSWv3dJOTfLFlWeA47GPGCXoIKfgnx.webp\",\"medium_image_url\":\"https://yourstore.com/cache/medium/products/419/nDQSWv3dJOTfLFlWeA47GPGCXoIKfgnx.webp\",\"large_image_url\":\"https://yourstore.com/cache/large/products/419/nDQSWv3dJOTfLFlWeA47GPGCXoIKfgnx.webp\",\"original_image_url\":\"https://yourstore.com/cache/original/products/419/nDQSWv3dJOTfLFlWeA47GPGCXoIKfgnx.webp\"}",
            "productUrlKey": "digital-air-fryer-with-touch-controls-45l",
            "canChangeQty": true
          }
        ],
        "subtotal": 122.5,
        "baseSubtotal": 122.5,
        "discountAmount": 0,
        "baseDiscountAmount": 0,
        "taxAmount": 0,
        "baseTaxAmount": 0,
        "shippingAmount": 0,
        "baseShippingAmount": 0,
        "grandTotal": 122.5,
        "baseGrandTotal": 122.5,
        "formattedSubtotal": "$122.50",
        "formattedDiscountAmount": "$0.00",
        "formattedTaxAmount": "$0.00",
        "formattedShippingAmount": "$0.00",
        "formattedGrandTotal": "$122.50",
        "couponCode": null,
        "success": true,
        "message": "Item moved to cart successfully",
        "carts": null,
        "sessionToken": null,
        "isGuest": false,
        "itemsQty": 1,
        "subTotalInclTax": 122.5,
        "baseSubTotalInclTax": 122.5,
        "formattedSubTotalInclTax": "$122.50",
        "taxTotal": 0,
        "formattedTaxTotal": "$0.00",
        "shippingAmountInclTax": 0,
        "baseShippingAmountInclTax": 0,
        "formattedShippingAmountInclTax": "$0.00",
        "billingAddress": null,
        "shippingAddress": null,
        "appliedTaxes": {
          " (0%)": "$0.00"
        },
        "haveStockableItems": true,
        "paymentMethod": null,
        "paymentMethodTitle": null,
        "selectedShippingRate": null,
        "selectedShippingRateTitle": null,
        "paymentRedirectUrl": null,
        "orderId": null,
        "redirectUri": null,
        "redirect": false,
        "redirectUrl": null,
        "orderIncrementId": null
      }
    commonErrors:
      - error: 400 Bad Request — Quantity must be greater than 0
        cause: quantity was sent as 0 or a negative number
        solution: Send a positive quantity, or omit the field to default to 1
      - error: 400 Bad Request — Product has missing required options
        cause: The saved product is configurable, bundled, or otherwise needs option choices that a wishlist row does not hold
        solution: Send the shopper to the product page and add it through Add to Cart with its options
      - error: 404 Not Found — Wishlist item not found
        cause: No such wishlist row, or it belongs to another customer
        solution: Use an ID returned by Get Wishlist Items for this customer
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

  - id: move-wishlist-to-cart-default-qty
    title: Move Wishlist Item to Cart - Default Quantity
    description: Move a wishlist item with the default quantity of 1 by omitting the quantity field.
    request: |
      POST /api/shop/move-wishlist-to-carts
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "wishlistItemId": 68
      }
    response: |
      HTTP/1.1 201 Created

      The same cart object as above, with `itemsQty` of 1.
    commonErrors:
      - error: 404 Not Found — Wishlist item not found
        cause: No such wishlist row, or it belongs to another customer
        solution: Use an ID returned by Get Wishlist Items for this customer

---

# Move Wishlist Item to Cart

Move a product from the customer's wishlist directly into their shopping cart. The item is removed from the wishlist once it is successfully added to the cart.

## Endpoint

```
POST /api/shop/move-wishlist-to-carts
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Request Body

```json
{
  "wishlistItemId": 77,
  "quantity": 2
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `wishlistItemId` | integer | Yes | The numeric ID of the wishlist item to move. |
| `quantity` | integer | No | Number of units to add to the cart. Defaults to `1`. |

## Response

`201 Created`, carrying the whole updated cart — the same object [Get Cart](/api/rest-api/shop/cart/get-cart) returns, plus two fields specific to this action.

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the item reached the cart. |
| `message` | string | `Item moved to cart successfully`. |

Everything else — `id`, `items`, the `subtotal` / `taxAmount` / `grandTotal` family and their `formatted*` counterparts, `billingAddress`, `shippingAddress`, `paymentMethod`, and the checkout flags — is the standard cart shape documented on [Get Cart](/api/rest-api/shop/cart/get-cart). The example on this page shows the full payload.

## What the Call Does

1. Adds the saved product to the customer's active cart, creating that cart when none exists.
2. Deletes the wishlist row, so the item is gone from [Get Wishlist Items](/api/rest-api/shop/wishlist/list) afterwards.
3. Recalculates the cart totals and returns the result, so no follow-up cart fetch is needed.

Nothing is moved when the call fails — the wishlist row survives a `400` or `404`.

## Validation

| Rule | Failure |
|------|---------|
| `wishlistItemId` must be a row owned by the authenticated customer | `404` — `Wishlist item not found`, the same answer as an ID that does not exist. |
| `quantity`, when sent, must be greater than 0 | `400` — `Quantity must be greater than 0`. |
| The product must be addable without option choices | `400` — `Product has missing required options. Please configure it manually`. |

## Use Cases

- **"Move to cart" on the wishlist page** — one call both adds to the cart and clears the wishlist row, and the response is enough to re-render the mini-cart.
- **Move several items** — the endpoint takes one wishlist row per call; loop over the IDs and read the totals off the last response.

## Best Practices

- **Route configurable and bundled products to their product page instead** — a wishlist row stores no option selections, so those types always fail here.
- **Re-render from the response, not from a fresh fetch** — the payload is the complete recalculated cart.
- **Treat `404` as "already moved or not yours"** — a repeated call after a successful move hits the deleted row and answers `404`.

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list) — the customer's saved products
- [Get Cart](/api/rest-api/shop/cart/get-cart) — read the current items and recalculated totals
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete) — remove one saved row by its id
