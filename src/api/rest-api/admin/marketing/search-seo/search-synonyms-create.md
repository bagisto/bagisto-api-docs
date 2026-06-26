---
outline: false
apiType: rest
examples:
  - id: create
    title: Create Search Synonym
    description: Create a synonym group so a search for any term also matches the others.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/search-synonyms" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "shirt-group",
          "terms": "shirt,tshirt,tee"
        }'
    variables: |
      {}
    response: |
      {
        "id": 19,
        "name": "shirt-group",
        "terms": "shirt,tshirt,tee",
        "createdAt": "2026-05-28T10:57:59+05:30",
        "updatedAt": "2026-05-28T10:57:59+05:30"
      }
---

# Create Search Synonym

Creates a search-synonym group — the **Create Synonym** action on the admin
**Marketing → Search & SEO → Search Synonyms** screen.

::: tip
New here? Read the [Search Synonyms overview](/api/rest-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms` | POST |

## Details

- Requires an admin Bearer token and the
  `marketing.search_seo.search_synonyms.create` permission.
- Returns the full synonym payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | yes | Group name |
| `terms` | string | yes | Comma-separated list of interchangeable search words (e.g. `shirt,tshirt,tee`) |
