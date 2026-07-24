---
outline: false
examples:
  - id: gql
    title: Delete RMA rule
    query: |
      mutation DeleteAdminRmaRule($input: deleteAdminRmaRuleInput!) {
        deleteAdminRmaRule(input: $input) {
          adminRmaRule {
            id
            _id
            name
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/rma/rules/3"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminRmaRule": {
            "adminRmaRule": {
              "id": "/api/admin/rma/rules/3",
              "_id": 3,
              "name": "Apparel 30-day returns",
              "message": "RMA rule deleted successfully."
            }
          }
        }
      }
---

# Delete RMA rule

Deletes a RMA rule. Pass the resource IRI as `id`. Permission: `sales.rma.rules.delete`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminRmaRule(input:)` | Mutation | Delete a RMA rule |

The mutation returns a snapshot of the deleted record — select `_id` for the numeric id.

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA rule to delete. |
