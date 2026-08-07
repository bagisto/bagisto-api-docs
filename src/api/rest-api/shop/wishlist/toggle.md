---
outline: false
examples:
  - id: toggle-wishlist-add
    title: Toggle Wishlist - Add
    description: The product is not saved yet, so this call adds it. The message states which way the toggle went.
    request: |
      POST /api/shop/wishlists/toggle
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken

      {
        "productId": 126
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 208,
        "createdAt": "2026-08-07T15:49:09+05:30",
        "updatedAt": "2026-08-07T15:49:09+05:30",
        "message": "Item Successfully Added To Wishlist",
        "product": "/api/shop/products/126",
        "customer": "/api/shop/customers/122",
        "channel": "/api/shop/channels/1"
      }
    commonErrors:
      - error: 400 Bad Request — Product ID is required
        cause: productId was missing from the body
        solution: Send productId as a numeric product ID
      - error: 404 Not Found — Product not found
        cause: No product carries that ID
        solution: Use an ID returned by the product endpoints
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests cannot hold a wishlist

  - id: toggle-wishlist-remove
    title: Toggle Wishlist - Remove
    description: The product is already saved, so the same call removes it. The row returned is the one that was deleted.
    request: |
      POST /api/shop/wishlists/toggle
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken

      {
        "productId": 126
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 207,
        "createdAt": "2026-08-07T15:48:07+05:30",
        "updatedAt": "2026-08-07T15:48:07+05:30",
        "message": "Item Successfully Removed From Wishlist",
        "product": "/api/shop/products/126",
        "customer": "/api/shop/customers/122",
        "channel": "/api/shop/channels/1"
      }
    commonErrors:
      - error: 400 Bad Request — Product ID is required
        cause: productId was missing from the body
        solution: Send productId as a numeric product ID

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

## Response Fields (201 Created)

Both directions answer `201` with the same shape — the wishlist row, plus a `message` naming the direction. Product, customer, and channel are **path references, not nested objects**.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | The row that was created, or the row that was just deleted. |
| `message` | string | `Item Successfully Added To Wishlist` or `Item Successfully Removed From Wishlist`. |
| `product` | string | Path of the product, e.g. `/api/shop/products/126`. |
| `customer` | string | Path of the owning customer. |
| `channel` | string | Path of the channel the toggle applied to. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps of the row. |

## Behaviour

- The product is looked up in the customer's wishlist **for the current channel**. Absent, it is added; present, it is removed.
- Removing returns the deleted row's data, so the `id` in a remove response no longer exists — do not store it.
- The status code is `201` either way; the direction is only in `message`.
- Toggling never errors on state — it is the safe call for a control that must work whichever way the item is currently saved.

## Use Cases

- **Heart button on a product card** — one call handles both directions, so the UI needs no prior read of the wishlist.
- **Optimistic UI** — flip the icon immediately, then reconcile against `message`; a mismatch means another device changed the state first.

## Best Practices

- **Branch on `message`, not on the status code** — add and remove both return `201`.
- **Discard the `id` from a remove response** — the row it names has already been deleted.
- **Use this rather than [Create](/api/rest-api/shop/wishlist/create) for toggle-style controls** — Create rejects an already-saved product with `400`.

## Related Resources

- [Get Wishlist Items](/api/rest-api/shop/wishlist/list) — the customer's saved products
- [Create Wishlist Item](/api/rest-api/shop/wishlist/create) — add a product; rejects one already saved
- [Delete Wishlist Item](/api/rest-api/shop/wishlist/delete) — remove one saved row by its id
