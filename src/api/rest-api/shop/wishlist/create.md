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
      {
        "id": 82,
        "message": "Item added to wishlist successfully",
        "product": {
          "id": 2,
          "name": "Arctic Snow Jacket",
          "sku": "ARCTIC-JACKET-001",
          "type": "simple"
        }
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Product does not exist
        solution: Provide a valid productId
      - error: 422 Validation Error
        cause: productId is missing or invalid
        solution: Provide a positive integer productId

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

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | New wishlist item ID |
| `message` | string | Confirmation message |
| `product` | object | Associated product details |

::: tip
The exact response shape follows the package's serialization. Confirm field presence against the live endpoint for your installation.
:::

## Validation

- `productId` is required and must reference an existing product.
- A valid customer Bearer token is required.
- Adding the same product again is a no-op or returns the existing item (use [Toggle](/api/rest-api/shop/wishlist/toggle) to add/remove).

## Use Cases

- "Add to wishlist" buttons on product pages
- Save-for-later from cart or category listings

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list)
- [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle)
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete)
