---
outline: false
examples:
  - id: gql
    title: Create RMA reason
    query: |
      mutation CreateAdminRmaReason($input: createAdminRmaReasonInput!) {
        createAdminRmaReason(input: $input) {
          adminRmaReason {
            id
            _id
            title
            status
            position
            isAdmin
            resolutionType
            message
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "title": "Damaged product",
          "status": 1,
          "position": 1,
          "resolutionType": [
            "return",
            "cancel_items"
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaReason": {
            "adminRmaReason": {
              "id": "/api/admin/rma/reasons/6",
              "_id": 6,
              "title": "Damaged product",
              "status": 1,
              "position": 1,
              "isAdmin": 0,
              "resolutionType": [
                "return",
                "cancel_items"
              ],
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T09:00:00+00:00"
            }
          }
        }
      }
---

# Create RMA reason

Creates a new RMA reason. Permission: `sales.rma.reasons.create`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaReason(input:)` | Mutation | Create a RMA reason |

## Input fields

Input fields are camelCase.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Reason label. |
| `resolution_type` | array | Yes | Allowed return actions: `return`, `cancel_items`. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |
| `position` | integer | No | Sort order. |
