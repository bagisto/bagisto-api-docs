---
outline: false
examples:
  - id: gql
    title: Create RMA rule
    query: |
      mutation CreateAdminRmaRule($input: createAdminRmaRuleInput!) {
        createAdminRmaRule(input: $input) {
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
          "name": "Apparel 30-day returns",
          "description": "Return window for all clothing.",
          "status": 1,
          "returnPeriod": 30
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaRule": {
            "adminRmaRule": {
              "id": "/api/admin/rma/rules/3",
              "_id": 3,
              "name": "Apparel 30-day returns",
              "description": "Return window for all clothing.",
              "status": 1,
              "returnPeriod": 30,
              "default": 0,
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T09:00:00+00:00"
            }
          }
        }
      }
---

# Create RMA rule

Creates a new RMA rule. Permission: `sales.rma.rules.create`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaRule(input:)` | Mutation | Create a RMA rule |

## Input fields

Input fields are camelCase.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `name` | string | Yes | Rule label. |
| `return_period` | integer | Yes | Return window in days. |
| `description` | string | No | Free-text description. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |
