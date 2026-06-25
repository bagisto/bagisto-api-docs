---
outline: false
examples:
  - id: create
    title: Create Search Synonym
    description: Create a synonym group so a search for any term also matches the others.
    query: |
      mutation CreateAdminMarketingSearchSynonym(
        $input: createAdminMarketingSearchSynonymInput!
      ) {
        createAdminMarketingSearchSynonym(input: $input) {
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
          "name": "shirt-group",
          "terms": "shirt,tshirt,tee"
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingSearchSynonym": {
            "adminMarketingSearchSynonym": {
              "id": "/api/admin/marketing/search-synonyms/19",
              "_id": 19,
              "name": "shirt-group",
              "terms": "shirt,tshirt,tee",
              "createdAt": "2026-05-28T10:57:59+05:30",
              "updatedAt": "2026-05-28T10:57:59+05:30"
            }
          }
        }
      }
---

# Create Search Synonym

Creates a search synonym group — the **Create Synonym** action on the admin
**Marketing → Search & SEO → Search Synonyms** screen.

::: tip
New here? Read the [Search Synonyms overview](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingSearchSynonym` | Mutation | Create a search synonym group |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_synonyms.create`
  permission.
- The mutation returns the full synonym payload.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | String | Yes | Group name |
| `terms` | String | Yes | Comma-separated list of interchangeable search words |
