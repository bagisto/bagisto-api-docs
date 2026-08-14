---
outline: false
examples:
  - id: mass-delete
    title: Mass Delete Search Terms
    description: Delete several search terms in one call. Non-existent ids are silently skipped.
    query: |
      mutation CreateAdminMarketingSearchTermMassDelete(
        $input: createAdminMarketingSearchTermMassDeleteInput!
      ) {
        createAdminMarketingSearchTermMassDelete(input: $input) {
          adminMarketingSearchTermMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [106, 112]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingSearchTermMassDelete": {
            "adminMarketingSearchTermMassDelete": {
              "deleted": [106, 112],
              "skipped": [],
              "message": "Search terms deleted."
            }
          }
        }
      }
---

# Mass Delete Search Terms

Deletes several search terms in one call — the **Mass Delete** action on the admin
**Marketing → Search & SEO → Search Terms** datagrid.

New here? Read the [Search Terms overview](/api/graphql-api/admin/marketing/search-seo/search-terms/) for what a search term records and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingSearchTermMassDelete` | Mutation | Delete multiple search terms |

## Details

- Requires an admin Bearer token and the `marketing.search_seo.search_terms.delete`
  permission.
- Pass the numeric term ids in `indices`. Non-existent ids are **silently
  skipped** (returned in `skipped`); the ids actually removed are returned in
  `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric search-term ids to delete |
