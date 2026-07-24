---
outline: false
examples:
  - id: gql
    title: Update RMA rule
    query: |
      mutation UpdateAdminRmaRule($input: updateAdminRmaRuleInput!) {
        updateAdminRmaRule(input: $input) {
          adminRmaRule {
            id
            _id
            name
            description
            status
            returnPeriod
            default
            message
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/rma/rules/3",
          "name": "Apparel 45-day returns",
          "description": "Extended window for clothing.",
          "returnPeriod": 45
        }
      }
    response: |
      {
        "data": {
          "updateAdminRmaRule": {
            "adminRmaRule": {
              "id": "/api/admin/rma/rules/3",
              "_id": 3,
              "name": "Apparel 45-day returns",
              "description": "Extended window for clothing.",
              "status": 1,
              "returnPeriod": 45,
              "default": 0,
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T11:00:00+00:00"
            }
          }
        }
      }
---

# Update RMA rule

Partial update — send only the fields you want to change. Pass the resource IRI as `id`. Permission: `sales.rma.rules.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminRmaRule(input:)` | Mutation | Update a RMA rule |

## Input fields

Input fields are camelCase. `id` is the resource IRI.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA rule to update. |
| `name` | string | No | Rule label. |
| `description` | string | No | Free-text description. |
| `status` | integer | No | `1` active / `0` inactive. |
| `return_period` | integer | No | Return window in days. |
