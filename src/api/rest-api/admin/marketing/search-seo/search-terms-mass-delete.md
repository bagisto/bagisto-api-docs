---
outline: false
apiType: rest
examples:
  - id: mass-delete
    title: Mass Delete Search Terms
    description: Delete several search terms in one call. Non-existent ids are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/search-terms/mass-delete" \
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
        "message": "Search terms deleted."
      }
---

# Mass Delete Search Terms

Deletes several search terms in one call — the **Mass Delete** action on the admin
**Marketing → Search & SEO → Search Terms** datagrid.

::: tip
New here? Read the [Search Terms overview](/api/rest-api/admin/marketing/search-seo/search-terms/) for what a search term is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-terms/mass-delete` | POST |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_terms.delete`
  permission.
- Non-existent ids are **silently skipped** (returned in `skipped`); the ids
  actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty list of numeric search-term ids to delete |
