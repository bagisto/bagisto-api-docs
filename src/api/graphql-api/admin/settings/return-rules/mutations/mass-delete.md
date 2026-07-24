---
outline: false
examples:
  - id: gql
    title: Mass Delete RMA rules
    query: |
      mutation CreateAdminRmaRuleMassDelete($input: createAdminRmaRuleMassDeleteInput!) {
        createAdminRmaRuleMassDelete(input: $input) {
          adminRmaRuleMassDelete {
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [
            3,
            5
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaRuleMassDelete": {
            "adminRmaRuleMassDelete": {
              "deleted": [
                3,
                5
              ],
              "message": "Selected RMA rules deleted successfully."
            }
          }
        }
      }
---

# Mass Delete RMA rules

Deletes several RMA rules in one call. Permission: `sales.rma.rules.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaRuleMassDelete(input:)` | Mutation | Delete multiple RMA rules |

`deleted` is returned as a plain array of the numeric ids that were removed. An empty or missing `indices` list returns a `422` error.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | Array | Yes | Non-empty list of numeric ids to delete. |
