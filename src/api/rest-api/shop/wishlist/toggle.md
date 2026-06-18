---
outline: false
examples:
  - id: toggle-wishlist-add
    title: Toggle Wishlist - Add
    description: Toggle a product in the wishlist. If not present, it is added.
    request: |
      POST /api/shop/wishlists/toggle
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "productId": 2
      }
    response: |
      {
        "id": 82,
        "message": "Item added to wishlist successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Product does not exist
        solution: Provide a valid productId

  - id: toggle-wishlist-remove
    title: Toggle Wishlist - Remove
    description: Toggle a product in the wishlist. If already present, it is removed.
    request: |
      POST /api/shop/wishlists/toggle
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {
        "productId": 2
      }
    response: |
      {
        "message": "Item removed from wishlist successfully"
      }
    commonErrors:
      - error: 422 Validation Error
        cause: productId is missing or invalid
        solution: Provide a positive integer productId

---

# Toggle Wishlist Item

Add a product to the wishlist if it is not present, or remove it if it already is.

## Endpoint

```
POST /api/shop/wishlists/toggle
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
| `productId` | integer | Yes | ID of the product to toggle in the wishlist. |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Wishlist item ID (present when the item was added) |
| `message` | string | Confirmation message indicating whether the item was added or removed |

## Behaviour

- If the product is **not** in the wishlist, it is added and a "added" message is returned.
- If the product **is** in the wishlist, it is removed and a "removed" message is returned.

## Use Cases

- A single heart/wishlist toggle button on product cards
- One-tap add/remove without checking current state first

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list)
- [Create Wishlist Item](/api/rest-api/shop/wishlist/create)
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete)
