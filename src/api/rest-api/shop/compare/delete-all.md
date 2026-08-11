---
outline: false
examples:
  - id: delete-all-compare-items
    title: Delete All Compare Items
    description: Remove every product from the authenticated customer's comparison list.
    request: |
      POST /api/shop/delete-all-compare-items
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer <accessToken>

      {}
    response: |
      HTTP/1.1 201 Created

      {
        "message": "All compare items have been removed successfully",
        "deletedCount": 2
      }
    commonErrors:
      - error: 403 Forbidden
        cause: No customer Bearer token was sent
        solution: Log the customer in; guests hold no comparison list
      - error: deletedCount of 0
        cause: The comparison list was already empty
        solution: This is a success, not a failure — the call is safe to repeat

---

# Delete All Compare Items

Remove every product from the authenticated customer's comparison list in a single request.

## Endpoint

```
POST /api/shop/delete-all-compare-items
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
| `message` | string | `All compare items have been removed successfully`. |
| `deletedCount` | integer | How many rows were removed. `0` when the list was already empty. |

## Behaviour

- Clears only the authenticated customer's rows. The comparison list is not channel-scoped, so one call empties it everywhere.
- Repeating the call is safe; the second one answers `201` with `deletedCount: 0`.
- The message reads the same whether rows were removed or not — read `deletedCount` to know what happened.

## Use Cases

- **"Clear comparison" button** — one call empties the table, and `deletedCount` tells the UI how many columns to drop without a re-fetch.
- **Reset between comparison sessions** — clearing is cheaper than deleting each row when the shopper starts a new set.

## Best Practices

- **Confirm in the UI first** — the call takes no ID and is irreversible.
- **Read `deletedCount`, not `message`** — the message is identical on an empty list.

## Related Resources

- [Get Compare Items](/api/rest-api/shop/compare/list) — the customer's comparison rows
- [Delete Compare Item](/api/rest-api/shop/compare/delete) — remove one comparison row
