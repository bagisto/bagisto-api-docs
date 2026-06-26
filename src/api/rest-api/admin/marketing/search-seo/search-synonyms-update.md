---
outline: false
apiType: rest
examples:
  - id: update
    title: Update Search Synonym
    description: Update a synonym group's terms. Update is a partial merge — send only the fields you change.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/marketing/search-synonyms/19" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "terms": "shirt,tshirt,tee,polo"
        }'
    variables: |
      {}
    response: |
      {
        "id": 19,
        "name": "shirt-group",
        "terms": "shirt,tshirt,tee,polo",
        "createdAt": "2026-05-28T10:57:59+05:30",
        "updatedAt": "2026-06-23T12:32:58+05:30"
      }
---

# Update Search Synonym

Updates an existing search-synonym group — the **Edit Synonym** action on the
admin **Marketing → Search & SEO → Search Synonyms** screen.

::: tip
New here? Read the [Search Synonyms overview](/api/rest-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym is and how its fields behave.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/search-synonyms/{id}` | PUT |

## Details

- Requires an admin Bearer token and the
  `marketing.search_seo.search_synonyms.edit` permission.
- The update is a **partial merge** — send only the fields you want to change;
  omitted fields keep their existing values.
- Returns the full updated synonym payload.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | no | Group name |
| `terms` | string | no | Comma-separated list of interchangeable search words |
