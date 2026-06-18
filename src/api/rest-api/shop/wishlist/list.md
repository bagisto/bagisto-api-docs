---
outline: false
examples:
  - id: list-wishlists
    title: Get Wishlist Items
    description: Retrieve the authenticated customer's wishlist items for the current channel.
    request: |
      GET /api/shop/wishlists
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      [
        {
          "id": 78,
          "product": {
            "id": 2500,
            "name": "Mint Axis Unisex Tailored Blazer",
            "sku": "MINT-BLAZER-001",
            "type": "configurable",
            "price": "0",
            "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2500/T97yKJVNKlmi6GXoqKl8FNqfM8115Wxo6jw4WhPF.webp"
          },
          "customer": {
            "id": 122,
            "email": "john.doe@example.com"
          },
          "channel": {
            "id": 1,
            "code": "default"
          },
          "createdAt": "2026-04-06T18:44:50+05:30",
          "updatedAt": "2026-04-06T18:44:50+05:30"
        },
        {
          "id": 81,
          "product": {
            "id": 122,
            "name": "Classic Cowboy Hat",
            "sku": "COWBOY-HAT-001",
            "type": "simple",
            "price": "149.99",
            "baseImageUrl": "https://api-demo.bagisto.com/storage/product/122/P9n1dbmgM4UOBT3zUAEGCn4wpKi0GjPGhgS1jZe7.webp"
          },
          "customer": {
            "id": 122,
            "email": "john.doe@example.com"
          },
          "channel": {
            "id": 1,
            "code": "default"
          },
          "createdAt": "2026-04-06T18:44:55+05:30",
          "updatedAt": "2026-04-06T18:44:55+05:30"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
  - id: list-wishlists-newest-first
    title: Get Wishlist Items (newest first)
    description: Sort the wishlist so the most recently added item appears first.
    request: |
      GET /api/shop/wishlists?sort=created_at&order=desc
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      [
        {
          "id": 81,
          "product": {
            "id": 122,
            "name": "Classic Cowboy Hat",
            "sku": "COWBOY-HAT-001",
            "type": "simple",
            "price": "149.99",
            "baseImageUrl": "https://api-demo.bagisto.com/storage/product/122/P9n1dbmgM4UOBT3zUAEGCn4wpKi0GjPGhgS1jZe7.webp"
          },
          "customer": {
            "id": 122,
            "email": "john.doe@example.com"
          },
          "channel": {
            "id": 1,
            "code": "default"
          },
          "createdAt": "2026-04-06T18:44:55+05:30",
          "updatedAt": "2026-04-06T18:44:55+05:30"
        },
        {
          "id": 78,
          "product": {
            "id": 2500,
            "name": "Mint Axis Unisex Tailored Blazer",
            "sku": "MINT-BLAZER-001",
            "type": "configurable",
            "price": "0",
            "baseImageUrl": "https://api-demo.bagisto.com/storage/product/2500/T97yKJVNKlmi6GXoqKl8FNqfM8115Wxo6jw4WhPF.webp"
          },
          "customer": {
            "id": 122,
            "email": "john.doe@example.com"
          },
          "channel": {
            "id": 1,
            "code": "default"
          },
          "createdAt": "2026-04-06T18:44:50+05:30",
          "updatedAt": "2026-04-06T18:44:50+05:30"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token

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

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Wishlist item ID |
| `product` | object | Associated product (id, name, sku, type, price, baseImageUrl) |
| `customer` | object | Customer who added the item (id, email) |
| `channel` | object | Channel where the item was added (id, code) |
| `createdAt` | string | Timestamp when the item was added |
| `updatedAt` | string | Timestamp when the item was last updated |

::: tip
The response is a plain JSON array of wishlist items. Pagination metadata is exposed via the `X-Total-Count` / `X-Page` / `X-Per-Page` / `X-Total-Pages` response headers.
:::

## Use Cases

- Display the customer's wishlist page
- Show a wishlist count in navigation
- Build saved-for-later product lists

## Notes

- Wishlist items are scoped to the customer and the current channel.
- Guests cannot have wishlists — a valid customer token is required.

## Related Resources

- [Create Wishlist Item](/api/rest-api/shop/wishlist/create)
- [Toggle Wishlist Item](/api/rest-api/shop/wishlist/toggle)
- [Move Wishlist Item to Cart](/api/rest-api/shop/wishlist/move-to-cart)
- [Delete All Wishlist Items](/api/rest-api/shop/wishlist/delete-all)
