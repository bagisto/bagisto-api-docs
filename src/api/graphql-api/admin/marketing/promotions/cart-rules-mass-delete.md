---
outline: false
examples:
  - id: mass-delete
    title: Mass Delete Cart Rules
    description: Delete several cart rules in one call. Non-existent ids are silently skipped.
    query: |
      mutation CreateAdminMarketingCartRuleMassDelete(
        $input: createAdminMarketingCartRuleMassDeleteInput!
      ) {
        createAdminMarketingCartRuleMassDelete(input: $input) {
          adminMarketingCartRuleMassDelete {
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
          "createAdminMarketingCartRuleMassDelete": {
            "adminMarketingCartRuleMassDelete": {
              "deleted": [12, 18],
              "skipped": [],
              "message": "Cart rules deleted."
            }
          }
        }
      }
---

# Mass Delete Cart Rules

Deletes several cart rules in one call — the **Mass Delete** action on the
admin **Marketing → Promotions → Cart Rules** datagrid.

New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminMarketingCartRuleMassDelete` | Mutation | Delete multiple cart rules |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Pass the numeric rule ids in `indices`. Non-existent ids are **silently
  skipped** (returned in `skipped`); the ids actually removed are returned in
  `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric rule ids to delete |
