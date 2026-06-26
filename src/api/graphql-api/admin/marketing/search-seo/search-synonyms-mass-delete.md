---
outline: false
examples:
  - id: mass-delete
    title: Mass Delete Search Synonyms
    description: Delete several search synonym groups in one call. Non-existent ids are silently skipped.
    query: |
      mutation CreateAdminMarketingSearchSynonymMassDelete(
        $input: createAdminMarketingSearchSynonymMassDeleteInput!
      ) {
        createAdminMarketingSearchSynonymMassDelete(input: $input) {
          adminMarketingSearchSynonymMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [12, 18]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingSearchSynonymMassDelete": {
            "adminMarketingSearchSynonymMassDelete": {
              "deleted": [12, 18],
              "skipped": [],
              "message": "Search synonyms deleted."
            }
          }
        }
      }
---

# Mass Delete Search Synonyms

Deletes several search synonym groups in one call — the **Mass Delete** action on
the admin **Marketing → Search & SEO → Search Synonyms** datagrid.

::: tip
New here? Read the [Search Synonyms overview](/api/graphql-api/admin/marketing/search-seo/search-synonyms/) for what a search synonym does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingSearchSynonymMassDelete` | Mutation | Delete multiple search synonym groups |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_synonyms.delete`
  permission.
- Pass the numeric synonym ids in `indices`. Non-existent ids are **silently
  skipped** (returned in `skipped`); the ids actually removed are returned in
  `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric synonym ids to delete |
