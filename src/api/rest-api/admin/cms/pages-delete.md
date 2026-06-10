---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-delete
    title: Delete a CMS Page
    description: Deletes a CMS page.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/cms/pages/7" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      <empty body — HTTP 204>
---

# CMS Page — Delete

Deletes a single CMS page.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages/{id}` | DELETE |

## Response

`204 No Content` on success.

## Errors

| HTTP | Cause |
|------|-------|
| `404 Not Found` | Page not found. |
