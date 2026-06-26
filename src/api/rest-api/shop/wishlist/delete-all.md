---
outline: false
examples:
  - id: delete-all-wishlists
    title: Delete All Wishlist Items
    description: Remove every wishlist item for the authenticated customer.
    request: |
      POST /api/shop/delete-all-wishlists
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {}
    response: |
      {
        "message": "All wishlist items removed successfully",
        "deletedCount": 4
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

---

# Delete All Wishlist Items

Remove every item from the authenticated customer's wishlist in a single request.

## Endpoint

```
POST /api/shop/delete-all-wishlists
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Request Body

No fields are required. Send an empty JSON object:

```json
{}
```

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Confirmation message |
| `deletedCount` | integer | Number of wishlist items removed |

## Use Cases

- "Clear wishlist" action on the wishlist page
- Reset a customer's saved products in one call

## Notes

- Only the authenticated customer's items are removed.
- Returns `deletedCount: 0` when the wishlist is already empty.

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list)
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete)
