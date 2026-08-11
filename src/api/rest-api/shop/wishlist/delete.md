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
      HTTP/1.1 204 No Content
    commonErrors:
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests hold no wishlist
      - error: 404 Not Found
        cause: No such wishlist row, or it belongs to another customer
        solution: Use an ID returned by Get Wishlist Items for this customer

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

## Response

`204 No Content` with an empty body. There is no confirmation message — the status is the confirmation.

## Behaviour

- Only the row is removed; the product itself is untouched and can be saved again straight away.
- A row that belongs to another customer answers `404`, exactly as an ID that does not exist.
- Repeating the call on an already-deleted row answers `404`.

## Use Cases

- **Remove one saved product** — call with the row's `id`, then drop it from the rendered list; the empty body leaves nothing to re-render from.
- **Un-save from a product page** — when the row ID is not at hand, [Toggle](/api/rest-api/shop/wishlist/toggle) removes by product ID instead and needs no lookup.

## Best Practices

- **Track the row `id`, not the product ID** — this endpoint addresses the wishlist row; only Toggle works from a product ID.
- **Do not parse a body** — a `204` carries none, so a client expecting a message object reads `undefined`.
- **Treat `404` as already gone** — after a successful [Move to Cart](/api/rest-api/shop/wishlist/move-to-cart) the row no longer exists.

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list) — the customer's saved products
- [Delete All Wishlist Items](/api/rest-api/shop/wishlist/delete-all) — clear the whole wishlist on this channel
- [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle) — add or remove in one call, for a heart icon
