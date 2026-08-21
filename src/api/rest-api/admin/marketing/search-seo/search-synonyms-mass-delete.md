---
outline: false
apiType: rest
examples:
  - id: mass-delete
    title: Mass Delete Search Synonyms
    description: Delete several synonym groups in one call. Non-existent ids are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/search-synonyms/mass-delete" \
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
        "message": "Search synonyms deleted."
      }
---

# Mass Delete Search Synonyms

Deletes several search-synonym groups in one call — the **Mass Delete** action on
the admin **Marketing → Search & SEO → Search Synonyms** datagrid.

New here? Read the [Search Synonyms overview](/api/rest-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym is and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/mass-delete` | POST |

## Details

- Requires an admin Bearer token and the
  `marketing.search_seo.search_synonyms.delete` permission.
- Non-existent ids are **silently skipped** (returned in `skipped`); the ids
  actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty list of numeric synonym-group ids to delete |
