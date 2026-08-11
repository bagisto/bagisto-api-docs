---
outline: false
examples:
  - id: list-wishlists
    title: Get Wishlist Items
    description: Retrieve the authenticated customer's wishlist items for the current channel, oldest first.
    request: |
      GET /api/shop/wishlists
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 2
      X-Page: 1
      X-Per-Page: 30
      X-Total-Pages: 1

      [
        {
          "id": 210,
          "createdAt": "2026-08-07T15:48:07+05:30",
          "updatedAt": "2026-08-07T15:48:07+05:30",
          "product": "/api/shop/products/126",
          "customer": "/api/shop/customers/122",
          "channel": "/api/shop/channels/1"
        },
        {
          "id": 211,
          "createdAt": "2026-08-07T15:52:41+05:30",
          "updatedAt": "2026-08-07T15:52:41+05:30",
          "product": "/api/shop/products/127",
          "customer": "/api/shop/customers/122",
          "channel": "/api/shop/channels/1"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: Empty array
        cause: The customer has saved nothing on the current channel
        solution: The wishlist is per channel — an item saved on another channel does not appear here

  - id: list-wishlists-newest-first
    title: Get Wishlist Items (newest first)
    description: Sort the wishlist so the most recently added item appears first.
    request: |
      GET /api/shop/wishlists?sort=created_at&order=desc
      Accept: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 211,
          "createdAt": "2026-08-07T15:52:41+05:30",
          "updatedAt": "2026-08-07T15:52:41+05:30",
          "product": "/api/shop/products/127",
          "customer": "/api/shop/customers/122",
          "channel": "/api/shop/channels/1"
        },
        {
          "id": 210,
          "createdAt": "2026-08-07T15:48:07+05:30",
          "updatedAt": "2026-08-07T15:48:07+05:30",
          "product": "/api/shop/products/126",
          "customer": "/api/shop/customers/122",
          "channel": "/api/shop/channels/1"
        }
      ]
    commonErrors:
      - error: Order unchanged
        cause: sort names a column the endpoint does not accept, so it falls back to id ascending
        solution: Sort by id or created_at only

---

# Get Wishlist Items

Retrieve the authenticated customer's wishlist items for the current channel.

## Endpoint

```
GET /api/shop/wishlists
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `sort` | No | `id` | Column to sort by — `id` or `created_at`. The compound form `created_at-desc` (`<column>-<direction>`) is also accepted. |
| `order` | No | `asc` | Sort direction — `asc` or `desc`. Use `desc` to return the most recently added items first. |

By default the wishlist is returned oldest-first (the order items were added). To show the newest item at the top, pass `?sort=created_at&order=desc` (or the shorthand `?sort=created_at-desc`).

## Response

A bare JSON array of wishlist rows. Each row identifies its product, customer, and channel by **path reference, not as a nested object** — fetch the product separately to render a card.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Wishlist row ID. Use it on [Delete](/api/rest-api/shop/wishlist/delete) and [Move to Cart](/api/rest-api/shop/wishlist/move-to-cart). |
| `product` | string | Path of the saved product, e.g. `/api/shop/products/126`. The trailing segment is the product ID. |
| `customer` | string | Path of the owning customer. |
| `channel` | string | Path of the channel the item was saved on. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

Pagination is reported in headers, not in the body: `X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`.

Over GraphQL the same rows expose `product`, `customer`, and `channel` as nested objects that can be selected in one query — see [Get Wishlist](/api/graphql-api/shop/queries/get-wishlist).

## Use Cases

- **Wishlist page** — read the array, take the numeric ID from the end of each `product` path, and fetch those products to render names, prices, and images.
- **"Saved" badge count** — read `X-Total-Count` from the headers instead of counting the array, which only holds the current page.
- **Newest-first view** — `?sort=created_at&order=desc` puts the latest save on top, which matches the "just added" confirmation a heart button produces.

## Best Practices

- **Do not expect product details inline** — the row carries a path only; a page that renders products needs a second call per product, or the GraphQL query instead.
- **Read the count from the header** — the body is one page, so `array.length` under-reports a long wishlist.
- **Remember the channel scope** — the same customer sees a different wishlist per channel, so a missing item usually means a different channel, not a lost row.

## Related Resources

- [Create Wishlist Item](/api/rest-api/shop/wishlist/create) — add a product; rejects one already saved
- [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle) — add or remove in one call, for a heart icon
- [Move Wishlist Item to Cart](/api/rest-api/shop/wishlist/move-to-cart) — add the saved product to the cart and drop the row
- [Delete All Wishlist Items](/api/rest-api/shop/wishlist/delete-all) — clear the whole wishlist on this channel
