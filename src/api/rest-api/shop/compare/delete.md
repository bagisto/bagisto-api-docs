---
outline: false
examples:
  - id: delete-compare-item
    title: Delete Compare Item
    description: Remove a single product from the authenticated customer's comparison list by ID.
    request: |
      DELETE /api/shop/compare_items/38
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>
    response: |
      HTTP/1.1 204 No Content
    commonErrors:
      - error: 404 Not Found — Compare item not found
        cause: No such row, or it belongs to another customer
        solution: Use an ID returned by Get Compare Items for this customer
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests hold no comparison list

---

# Delete Compare Item

Remove a single product from the authenticated customer's comparison list.

## Endpoint

```
DELETE /api/shop/compare_items/{id}
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
| `id` | integer | Yes | Compare item ID to delete |

## Response

`204 No Content` with an empty body. There is no confirmation message — the status is the confirmation.

## Behaviour

- Only the comparison row is removed; the product is untouched and can be added again immediately.
- A row belonging to another customer answers `404`, exactly as an ID that does not exist.
- Repeating the call on an already-deleted row answers `404`.

## Use Cases

- **Remove one column from a comparison table** — call with the row's `id`, then drop that column locally; the empty body leaves nothing to re-render from.
- **Undo an accidental add** — the `400` returned by a duplicate [Create](/api/rest-api/shop/compare/create) means the row is already there, and this removes it.

## Best Practices

- **Address the row, not the product** — the path takes the comparison row ID; there is no remove-by-product-ID endpoint here.
- **Do not parse a body** — a `204` carries none.
- **Use [Delete All](/api/rest-api/shop/compare/delete-all) to clear the set** — one call beats a loop over the rows.

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list) — the customer's comparison rows
- [Delete All Compare Items](/api/rest-api/shop/compare/delete-all) — clear the whole comparison list
