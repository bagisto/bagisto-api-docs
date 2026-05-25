---
outline: false
apiType: rest
examples:
  - id: admin-catalog-category-delete
    title: Delete Category
    description: Refused with HTTP 400 if the category is the root (id=1) or referenced as `channels.root_category_id`.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/categories/7" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    variables: |
      id=7
    response: |
      {
        "message": "Category deleted successfully."
      }
    commonErrors:
      - error: Root or channel-root (400)
        cause: The category is the root (id=1) or is referenced by a channel as its `root_category_id`
        solution: Reassign the channel root before deleting, or pick a different category
      - error: Not Found (404)
        cause: Unknown category id
        solution: Verify the id with the listing endpoint
---

# Category — Delete

Deletes a category.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/categories/{id}` | DELETE |

`{id}` must be a positive integer.

## Response

`200 OK`:

```json
{ "message": "Category deleted successfully." }
```

## Errors

| HTTP | Cause |
|------|-------|
| `400 Bad Request` | Root category (`id=1`) or a category used as a channel's `root_category_id` |
| `401 Unauthorized` | Missing or invalid Bearer token |
| `404 Not Found` | The category does not exist |

For bulk deletion, use the [Mass Delete](/api/rest-api/admin/catalog/categories/categories-mass-delete) endpoint.
