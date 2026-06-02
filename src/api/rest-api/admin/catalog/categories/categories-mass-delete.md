---
outline: false
apiType: rest
examples:
  - id: admin-catalog-category-mass-delete
    title: Mass Delete Categories
    description: Deletes a batch of categories. If any ID in the batch is non-deletable (root or a channel root), the entire batch is rejected (HTTP 400). Non-existent IDs are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/categories/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 18] }'
    variables: |
      {
        "indices": [12, 18]
      }
    response: |
      {
        "deleted": [12, 18],
        "message": "Categories deleted successfully."
      }
    commonErrors:
      - error: Root or channel-root in batch (400)
        cause: At least one ID in `indices` is a root category or referenced as a channel's `root_category_id`
        solution: Remove non-deletable ids before retrying — the operation is all-or-nothing
---

# Category — Mass Delete

Deletes a batch of categories in a single request. Pre-validates the entire
batch before touching any row.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/categories/mass-delete` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | integer[] | yes | Category ids to delete. |

## Response

`200 OK`:

```json
{
  "deleted": [12, 18],
  "message": "Categories deleted successfully."
}
```

## Errors

| HTTP | Cause |
|------|-------|
| `400 Bad Request` | At least one id is a root or channel root — whole batch refused |
| `401 Unauthorized` | Missing or invalid Bearer token |

## Notes

- **All-or-nothing semantics.** A single non-deletable id rejects the entire batch.
- **Unknown ids are silently skipped** — they do not appear in `deleted`.
