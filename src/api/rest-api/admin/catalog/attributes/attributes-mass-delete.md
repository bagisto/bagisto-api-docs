---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attribute-mass-delete
    title: Mass Delete Attributes
    description: Deletes a batch of user-defined attributes. If any ID in the batch belongs to a system attribute, the entire batch is rejected (HTTP 422). Non-existent IDs are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/attributes/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [24, 31] }'
    variables: |
      {
        "indices": [24, 31]
      }
    response: |
      {
        "deleted": [24, 31],
        "message": "Attributes deleted successfully."
      }
    commonErrors:
      - error: System attribute in batch (422)
        cause: At least one id in `indices` is a system attribute (`is_user_defined = 0`)
        solution: Remove system-attribute ids from the batch before retrying — the operation is all-or-nothing
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Catalog Attribute — Mass Delete

Deletes multiple user-defined attributes in a single request. The whole batch
is pre-validated before any row is touched — if any id is a system attribute,
no row is deleted and the entire batch fails with `422`.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/attributes/mass-delete` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | integer[] | yes | Attribute ids to delete. |

## Response

`200 OK`:

```json
{
  "deleted": [24, 31],
  "message": "Attributes deleted successfully."
}
```

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `422 Unprocessable Entity` | One or more ids in the batch are system attributes — whole batch refused |

## Notes

- **All-or-nothing semantics.** A single bad id rejects the entire batch — no partial deletes.
- **Unknown ids are silently skipped.** Passing `[24, 9999]` where `9999` does not exist deletes id `24` and reports `"deleted": [24]`.
- For single-attribute deletion, use [`DELETE /api/admin/catalog/attributes/{id}`](/api/rest-api/admin/catalog/attributes/attributes-delete).
