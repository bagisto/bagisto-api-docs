---
outline: false
examples:
  - id: mass-delete
    title: Mass Delete Catalog Rules
    description: Delete several catalog rules in one call. Non-existent ids are silently skipped.
    query: |
      mutation CreateAdminMarketingCatalogRuleMassDelete(
        $input: createAdminMarketingCatalogRuleMassDeleteInput!
      ) {
        createAdminMarketingCatalogRuleMassDelete(input: $input) {
          adminMarketingCatalogRuleMassDelete {
            deleted
            skipped
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [12, 18, 9999]
        }
      }
    response: |
      {
        "data": {
          "createAdminMarketingCatalogRuleMassDelete": {
            "adminMarketingCatalogRuleMassDelete": {
              "deleted": [12, 18],
              "skipped": [9999],
              "message": "Catalog rules deleted successfully."
            }
          }
        }
      }
---

# Mass Delete Catalog Rules

Deletes several catalog rules in one call — the **Mass Delete** action on the
admin **Marketing → Promotions → Catalog Rules** datagrid. Removing rules
recomputes affected product prices in the background.

New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCatalogRuleMassDelete` | Mutation | Delete multiple catalog rules |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.delete`
  permission.
- Pass the numeric rule ids in `indices`. Non-existent ids are **silently
  skipped** (returned in `skipped`); the ids actually removed are returned in
  `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric rule ids to delete |
