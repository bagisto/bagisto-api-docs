---
outline: false
apiType: rest
examples:
  - id: mass-delete
    title: Mass Delete URL Rewrites
    description: Delete several URL rewrites in one call. Non-existent ids are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/url-rewrites/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [12, 18]
        }'
    variables: |
      {}
    response: |
      {
        "deleted": [12, 18],
        "skipped": [],
        "message": "URL rewrites deleted."
      }
---

# Mass Delete URL Rewrites

Deletes several URL rewrites in one call — the **Mass Delete** action on the
admin **Marketing → Search & SEO → URL Rewrites** datagrid.

::: tip
New here? Read the [URL Rewrites overview](/api/rest-api/admin/marketing/search-seo/url-rewrites/) for what a URL rewrite does and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/url-rewrites/mass-delete` | POST |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.url_rewrites.delete`
  permission.
- Non-existent ids are **silently skipped** (returned in `skipped`); the ids
  actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty list of numeric rewrite ids to delete |
