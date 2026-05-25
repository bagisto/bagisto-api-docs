---
outline: false
apiType: rest
examples:
  - id: admin-catalog-category-mass-update-status
    title: Mass Update Category Status
    description: Sets the status of a batch of categories to the given value (0 or 1).
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/categories/mass-update-status" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 18], "value": 1 }'
    variables: |
      {
        "indices": [12, 18],
        "value": 1
      }
    response: |
      {
        "updated": [12, 18],
        "message": "Categories status updated successfully."
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Category — Mass Update Status

Bulk-flips the status (enabled/disabled) of a batch of categories.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/categories/mass-update-status` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | integer[] | yes | Category ids to update. |
| `value` | integer | yes | `0` to disable, `1` to enable. |

## Response

`200 OK`:

```json
{
  "updated": [12, 18],
  "message": "Categories status updated successfully."
}
```

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
