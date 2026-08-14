---
outline: false
examples:
  - id: delete
    title: Delete Catalog Rule
    description: Delete a catalog rule by id. The mutation returns a snapshot of the just-deleted rule plus a success message.
    query: |
      mutation DeleteAdminMarketingCatalogRule(
        $input: deleteAdminMarketingCatalogRuleInput!
      ) {
        deleteAdminMarketingCatalogRule(input: $input) {
          adminMarketingCatalogRule {
            id
            _id
            name
            description
            startsFrom
            endsTill
            status
            sortOrder
            conditionType
            conditions
            endOtherRules
            actionType
            discountAmount
            createdAt
            updatedAt
            message
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
            "adminMarketingCatalogRule": {
              "id": "/api/admin/marketing/catalog-rules/126",
              "_id": 126,
              "name": "Summer Collection 10% Off",
              "description": "Sitewide 10% off the summer collection",
              "startsFrom": null,
              "endsTill": null,
              "status": 1,
              "sortOrder": 0,
              "conditionType": 1,
              "conditions": [],
              "endOtherRules": 0,
              "actionType": "by_percent",
              "discountAmount": 10,
              "createdAt": "2026-06-25T10:15:00+00:00",
              "updatedAt": "2026-06-25T10:15:00+00:00",
              "message": "Catalog rule deleted successfully."
            }
          }
        }
      }
---

# Delete Catalog Rule

Deletes a catalog rule — the **Delete** row action on the admin
**Marketing → Promotions → Catalog Rules** screen. Removing a rule recomputes
affected product prices in the background.

New here? Read the [Catalog Rules overview](/api/graphql-api/admin/marketing/promotions/catalog-rules/) for what a catalog rule does and how its fields behave.

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

### Returns the deleted rule + a `message`

The delete mutation returns a **snapshot of the just-deleted rule** — select
`id`, `_id`, `name`, and the other scalar fields to confirm exactly what was
removed. The `message` field carries the success confirmation
(`"Catalog rule deleted successfully."`). A response with no `errors[]` means the
delete succeeded. The `channels` / `customerGroups` connections come back empty
on a delete result (the rule's rows are already gone) — read those from the
[detail](/api/graphql-api/admin/marketing/promotions/catalog-rules-detail) query
before deleting if you need them. The REST endpoint
(`DELETE /api/admin/marketing/catalog-rules/{id}`) returns
`{ "message": "Catalog rule deleted successfully." }`.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rule's IRI |
