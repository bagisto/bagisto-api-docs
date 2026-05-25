---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-mass-delete
    title: Mass Delete CMS Pages
    description: Deletes a batch of CMS pages. Non-existent IDs are silently skipped (mirrors monolith).
    query: |
      curl -X POST "https://your-domain.com/api/admin/cms/pages/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [12, 18]
        }'
    variables: |
      {
        "indices": [12, 18]
      }
    response: |
      {
        "deleted": [12, 18],
        "message": "CMS pages deleted successfully."
      }
    commonErrors:
      - error: Validation (422)
        cause: Empty or missing indices
        solution: Send a non-empty integer array
---

# CMS Pages — Mass Delete

Bulk-deletes CMS pages.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages/mass-delete` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty array of CMS page IDs. |

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `deleted` | int[] | IDs the call attempted to delete. |
| `message` | string | Translated confirmation. |

## Errors

| HTTP | Cause |
|------|-------|
| `422 Unprocessable Entity` | Empty / missing indices. |
