---
outline: false
examples:
  - id: gql
    title: Create RMA status
    query: |
      mutation CreateAdminRmaStatus($input: createAdminRmaStatusInput!) {
        createAdminRmaStatus(input: $input) {
          adminRmaStatus {
            id
            _id
            title
            status
            color
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
          "title": "Awaiting inspection",
          "status": 1,
          "color": "#FDB022"
        }
      }
    response: |
      {
        "data": {
          "createAdminRmaStatus": {
            "adminRmaStatus": {
              "id": "/api/admin/rma/statuses/9",
              "_id": 9,
              "title": "Awaiting inspection",
              "status": 1,
              "color": "#FDB022",
              "default": 0,
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T09:00:00+00:00"
            }
          }
        }
      }
---

# Create RMA status

Creates a new RMA status. Permission: `sales.rma.statuses.create`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminRmaStatus(input:)` | Mutation | Create a RMA status |

## Input fields

Input fields are camelCase.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Status label. Must be unique. |
| `status` | integer | No | `1` active / `0` inactive (default `1`). |
| `color` | string | No | Hex color of the badge. |
