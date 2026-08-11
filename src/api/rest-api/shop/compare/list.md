---
outline: false
examples:
  - id: list-compare-items
    title: Get Compare Items
    description: Retrieve the authenticated customer's product comparison list.
    request: |
      GET /api/shop/compare_items
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
          "id": 155,
          "createdAt": "2026-08-07T15:56:42+05:30",
          "updatedAt": "2026-08-07T15:56:42+05:30",
          "product": "/api/shop/products/126",
          "customer": "/api/shop/customers/122"
        },
        {
          "id": 156,
          "createdAt": "2026-08-07T15:57:10+05:30",
          "updatedAt": "2026-08-07T15:57:10+05:30",
          "product": "/api/shop/products/127",
          "customer": "/api/shop/customers/122"
        }
      ]
    commonErrors:
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests hold no comparison list
      - error: Empty array
        cause: The customer has added nothing to compare
        solution: This is a normal empty state, not an error

---

# Get Compare Items

Retrieve the products in the authenticated customer's comparison list.

## Endpoint

```
GET /api/shop/compare_items
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Customer Bearer token (`Bearer <accessToken>`) |

## Response

A bare JSON array of comparison rows. Each row identifies its product and customer by **path reference, not as a nested object** — the product's name, price, and attributes are not in this payload.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Comparison row ID. Use it on [Get One](/api/rest-api/shop/compare/get) and [Delete](/api/rest-api/shop/compare/delete). |
| `product` | string | Path of the compared product, e.g. `/api/shop/products/126`. The trailing segment is the product ID. |
| `customer` | string | Path of the owning customer. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

Pagination is reported in headers, not in the body: `X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`.

Unlike the wishlist, the comparison list is **not scoped to a channel** — the same rows come back on every channel.

Over GraphQL the same rows expose `product` and `customer` as nested objects selectable in one query — see [Get Compare Items](/api/graphql-api/shop/queries/get-compare-items).

## Use Cases

- **Comparison table** — read the rows, take the numeric ID from the end of each `product` path, and fetch those products with their attribute values to build the table columns.
- **"Compare (n)" badge** — read `X-Total-Count`; the array holds only the current page.

## Best Practices

- **Do not expect product attributes here** — the row is a pointer, so a comparison view always needs a second round of product fetches, or the GraphQL query instead.
- **Fetch the products in one call** — the product listing endpoint accepts filters, so a single request can return every compared product rather than one request per row.
- **Keep the row `id` alongside the product ID** — deletion addresses the comparison row, not the product.

## Related Resources

- [Get Single Compare Item](/api/rest-api/shop/compare/get) — one comparison row by id
- [Create Compare Item](/api/rest-api/shop/compare/create) — add a product to the comparison list
- [Delete Compare Item](/api/rest-api/shop/compare/delete) — remove one comparison row
- [Delete All Compare Items](/api/rest-api/shop/compare/delete-all) — clear the whole comparison list
