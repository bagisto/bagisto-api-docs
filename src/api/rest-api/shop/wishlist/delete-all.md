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
      HTTP/1.1 201 Created

      {
        "message": "All wishlist items have been removed successfully",
        "deletedCount": 3
      }
    commonErrors:
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests hold no wishlist
      - error: deletedCount of 0
        cause: The wishlist was already empty on this channel
        solution: This is a success, not a failure — the call is safe to repeat

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

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | `All wishlist items have been removed successfully`. |
| `deletedCount` | integer | How many rows were removed. `0` when the wishlist was already empty. |

## Behaviour

- Clears only the authenticated customer's rows, and only on the **current channel** — items saved on another channel survive.
- Repeating the call is safe; the second one answers `201` with `deletedCount: 0`.
- The message is the same whether rows were removed or not, so read `deletedCount` to know what happened.

## Use Cases

- **"Clear wishlist" button** — one call empties the list, and `deletedCount` tells the UI how many rows to drop without a re-fetch.
- **Reset after a bulk move to cart** — [Move to Cart](/api/rest-api/shop/wishlist/move-to-cart) removes rows one at a time; this clears whatever remains in a single request.

## Best Practices

- **Confirm in the UI first** — the call is irreversible and takes no ID, so a mis-tap wipes the whole list.
- **Read `deletedCount`, not `message`** — the message reads the same on an empty wishlist.
- **Remember the channel scope** — a multi-channel storefront needs one call per channel to clear everything.

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list) — the customer's saved products
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete) — remove one saved row by its id
