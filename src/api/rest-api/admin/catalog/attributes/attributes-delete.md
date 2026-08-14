---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attribute-delete
    title: Delete Attribute
    description: Deletes a user-defined attribute. Returns HTTP 403 for system attributes, HTTP 409 if the attribute is referenced by any attribute family.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/attributes/50" \
        -H "Authorization: Bearer <token>"
    variables: |
      id=50
    response: |
      {
        "message": "Attribute deleted successfully."
      }
    commonErrors:
      - error: System attribute (403)
        cause: The attribute has `is_user_defined = 0` and cannot be deleted
        solution: System attributes are immutable — pick a different attribute
      - error: In use by attribute family (409)
        cause: Removing the attribute would orphan one or more attribute families
        solution: Remove the attribute from each family first, then retry
      - error: Not Found (404)
        cause: Unknown attribute id
        solution: Verify the id via the listing endpoint
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Catalog Attribute — Delete

Deletes a user-defined attribute.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/attributes/{id}` | DELETE |

`{id}` must be a positive integer (`requirements: ['id' => '\\d+']`).

## Response

`200 OK` with a confirmation message:

```json
{ "message": "Attribute deleted successfully." }
```

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `403 Forbidden` | System attribute (`is_user_defined = 0`) |
| `404 Not Found` | The attribute does not exist |
| `409 Conflict` | The attribute is part of one or more attribute families |

## Notes

- For bulk deletion, use the [Mass Delete](/api/rest-api/admin/catalog/attributes/attributes-mass-delete) endpoint.
- The `409` body names the blocking groups so you can act on it directly: `Attribute is part of one or more attribute families (group IDs: 12, 20, 28). Remove it from those families first.`
