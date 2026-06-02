---
outline: false
apiType: rest
examples:
  - id: admin-catalog-family-delete
    title: Delete Attribute Family
    description: Refuses with HTTP 400 if the family is the last one in the store, or if any product is still using it.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/families/4" \
        -H "Authorization: Bearer <token>"
    variables: |
      id=4
    response: |
      {
        "message": "Attribute family deleted successfully."
      }
    commonErrors:
      - error: Last family (400)
        cause: There must be at least one attribute family in the store
        solution: Create another family before deleting this one
      - error: Family in use (400)
        cause: One or more products reference this family
        solution: Reassign or delete those products first
      - error: Not Found (404)
        cause: Unknown family id
        solution: Verify the id with the listing endpoint
---

# Attribute Family — Delete

Deletes an attribute family.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/families/{id}` | DELETE |

`{id}` must be a positive integer.

## Response

`200 OK`:

```json
{ "message": "Attribute family deleted successfully." }
```

## Errors

| HTTP | Cause |
|------|-------|
| `400 Bad Request` | The family is the last one in the store (`At least one attribute family is required.`) |
| `400 Bad Request` | Products reference this family |
| `401 Unauthorized` | Missing or invalid Bearer token |
| `404 Not Found` | The family does not exist |
