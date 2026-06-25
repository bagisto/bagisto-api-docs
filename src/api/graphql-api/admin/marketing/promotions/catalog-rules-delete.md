---
outline: false
examples:
  - id: delete
    title: Delete Catalog Rule
    description: Delete a catalog rule by id. A successful delete returns no errors; the rule is removed.
    query: |
      mutation DeleteAdminMarketingCatalogRule(
        $input: deleteAdminMarketingCatalogRuleInput!
      ) {
        deleteAdminMarketingCatalogRule(input: $input) {
          adminMarketingCatalogRule {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/catalog-rules/126"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingCatalogRule": {
            "adminMarketingCatalogRule": null
          }
        }
      }
---

# Delete Catalog Rule

Deletes a catalog rule — the **Delete** row action on the admin
**Marketing → Promotions → Catalog Rules** screen. Removing a rule recomputes
affected product prices in the background.

::: tip
New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingCatalogRule` | Mutation | Delete a catalog rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.catalog_rules.delete`
  permission.
- Pass the rule's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/promotions/catalog-rules-list) query to
  discover valid ids.

::: warning Confirm success via the absence of `errors`
The delete mutation returns a success acknowledgement, not the deleted rule's
data — `adminMarketingCatalogRule` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/catalog-rules/{id}`), which returns
`{ "message": "Catalog rule deleted." }`.
:::

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rule's IRI |
