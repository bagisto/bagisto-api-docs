---
outline: false
examples:
  - id: update
    title: Update Search Synonym
    description: Update a synonym group's terms. Update is a partial merge — send only the fields you change.
    query: |
      mutation UpdateAdminMarketingSearchSynonym(
        $input: updateAdminMarketingSearchSynonymInput!
      ) {
        updateAdminMarketingSearchSynonym(input: $input) {
          adminMarketingSearchSynonym {
            id
            _id
            name
            terms
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/search-synonyms/19",
          "terms": "shirt,tshirt,tee,polo"
        }
      }
    response: |
      {
        "data": {
          "updateAdminMarketingSearchSynonym": {
            "adminMarketingSearchSynonym": {
              "id": "/api/admin/marketing/search-synonyms/19",
              "_id": 19,
              "name": "shirt-group",
              "terms": "shirt,tshirt,tee,polo",
              "createdAt": "2026-05-28T10:57:59+05:30",
              "updatedAt": "2026-06-23T13:05:11+05:30"
            }
          }
        }
      }
---

# Update Search Synonym

Updates an existing search synonym group — the **Edit Synonym** action on the
admin **Marketing → Search & SEO → Search Synonyms** screen.

New here? Read the [Search Synonyms overview](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminMarketingSearchSynonym` | Mutation | Update a search synonym group |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_synonyms.edit`
  permission.
- Pass the synonym's IRI as `id`. The update is a **partial merge** — send only the
  fields you want to change; omitted fields keep their existing values.
- The mutation returns the full updated synonym payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The synonym's IRI |
| `name` | String | No | Group name |
| `terms` | String | No | Comma-separated list of interchangeable search words |
