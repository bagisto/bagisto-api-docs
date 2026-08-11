---
outline: false
examples:
  - id: create-wishlist
    title: Add Product to Wishlist
    description: Add a product to the authenticated customer's wishlist.
    request: |
      POST /api/shop/wishlists
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "productId": 2
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 210,
        "createdAt": "2026-08-07T15:48:07+05:30",
        "updatedAt": "2026-08-07T15:48:07+05:30",
        "product": "/api/shop/products/126",
        "customer": "/api/shop/customers/122",
        "channel": "/api/shop/channels/1"
      }
    commonErrors:
      - error: 400 Bad Request — Product ID is required
        cause: productId was missing from the body
        solution: Send productId as a numeric product ID
      - error: 400 Bad Request — This product is already in your wishlist
        cause: The customer already saved this product on this channel
        solution: Use Toggle instead when the button should also be able to remove
      - error: 404 Not Found — Product not found
        cause: No product carries that ID
        solution: Use an ID returned by the product endpoints
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests cannot hold a wishlist

---

# Create Wishlist Item

Add a product to the authenticated customer's wishlist.

## Endpoint

```
POST /api/shop/wishlists
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
  "productId": 2
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `productId` | integer | Yes | ID of the product to add to the wishlist. |

## Response Fields (201 Created)

The created wishlist row. Product, customer, and channel come back as **path references, not nested objects** — the product's name and price are not part of this payload.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | New wishlist row ID. Keep it for [Delete](/api/rest-api/shop/wishlist/delete) and [Move to Cart](/api/rest-api/shop/wishlist/move-to-cart). |
| `product` | string | Path of the saved product, e.g. `/api/shop/products/126`. |
| `customer` | string | Path of the owning customer. |
| `channel` | string | Path of the channel the item was saved on. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

## Behaviour

- The row is scoped to the current channel, so the same product can be saved once per channel.
- Adding a product that is already saved is **rejected** with `400` — it is not a silent no-op. A heart button that must also un-save should call [Toggle](/api/rest-api/shop/wishlist/toggle) instead.
- Any product type can be saved, including configurable and bundled ones. Option choices are not stored, which is why those types cannot later be moved straight to the cart.

## Use Cases

- **"Add to wishlist" on a product page** — post the product ID and keep the returned row ID so the same button can remove it again without re-listing.
- **Save for later from the cart** — add here, then remove the cart line; there is no single endpoint that does both.

## Best Practices

- **Prefer Toggle for a heart icon** — this endpoint only adds, and a second tap produces a `400` the UI has to special-case.
- **Do not render from this response** — it carries no product name, price, or image; keep the details you already had on screen.
- **Treat `403` as "log in first"** — guests get no wishlist, so the control should prompt for login rather than retry.

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list) — the customer's saved products
- [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle) — add or remove in one call, for a heart icon
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete) — remove one saved row by its id
