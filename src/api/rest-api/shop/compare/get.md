---
outline: false
examples:
  - id: get-compare-item
    title: Get Single Compare Item
    description: Retrieve a specific compare item by its ID.
    request: |
      GET /api/shop/compare_items/37
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      HTTP/1.1 200 OK

      {
        "id": 155,
        "createdAt": "2026-08-07T15:56:42+05:30",
        "updatedAt": "2026-08-07T15:56:42+05:30",
        "product": "/api/shop/products/126",
        "customer": "/api/shop/customers/122"
      }
    commonErrors:
      - error: 404 Not Found — Compare item not found
        cause: No such row, or it belongs to another customer
        solution: Use an ID returned by Get Compare Items for this customer
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests hold no comparison list

---

# Get Compare Item

Retrieve a single compare item by ID.

## Endpoint

```
GET /api/shop/compare_items/{id}
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
| `id` | integer | Yes | Compare item ID |

## Response Fields (200 OK)

One comparison row, with product and customer as **path references, not nested objects**.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Comparison row ID. |
| `product` | string | Path of the compared product, e.g. `/api/shop/products/126`. |
| `customer` | string | Path of the owning customer. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

A row belonging to another customer answers `404`, the same as an ID that does not exist.

## Use Cases

- **Confirm a row still exists** — before offering "remove", check the ID rather than reacting to a `404` mid-action.

## Best Practices

- **Prefer the list endpoint** — this returns the same four fields for one row, so fetching the whole list is usually one call instead of many.
- **Read `404` as "not yours or not there"** — the endpoint gives no separate signal for another customer's row.

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list) — the customer's comparison rows
- [Create Compare Item](/api/rest-api/shop/compare/create) — add a product to the comparison list
- [Delete Compare Item](/api/rest-api/shop/compare/delete) — remove one comparison row
