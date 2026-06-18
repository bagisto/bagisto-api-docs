---
outline: false
examples:
  - id: delete-wishlist
    title: Delete Wishlist Item
    description: Remove a single item from the authenticated customer's wishlist by ID.
    request: |
      DELETE /api/shop/wishlists/82
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      {
        "message": "Item removed from wishlist successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: Wishlist item does not exist or belongs to another customer
        solution: Provide a valid wishlist item ID owned by the authenticated customer

---

# Delete Wishlist Item

Remove a single item from the authenticated customer's wishlist.

## Endpoint

```
DELETE /api/shop/wishlists/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Wishlist item ID to delete |

## Response (200 OK)

```json
{
  "message": "Item removed from wishlist successfully"
}
```

::: tip
This delete returns a confirmation message. Confirm the exact success status (200 with body vs 204 no content) against the live endpoint for your installation.
:::

## Validation

- The wishlist item must exist and belong to the authenticated customer.
- A valid customer Bearer token is required.

## Use Cases

- Remove a single saved product from the wishlist page
- Clean up the wishlist after moving an item to cart

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list)
- [Delete All Wishlist Items](/api/rest-api/shop/wishlist/delete-all)
- [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle)
