---
outline: false
examples:
  - id: gql
    title: Update RMA status
    query: |
      mutation UpdateAdminRmaStatus($input: updateAdminRmaStatusInput!) {
        updateAdminRmaStatus(input: $input) {
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
          "id": "/api/admin/rma/statuses/9",
          "title": "Inspection complete",
          "color": "#12B76A"
        }
      }
    response: |
      {
        "data": {
          "updateAdminRmaStatus": {
            "adminRmaStatus": {
              "id": "/api/admin/rma/statuses/9",
              "_id": 9,
              "title": "Inspection complete",
              "status": 1,
              "color": "#12B76A",
              "default": 0,
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T11:00:00+00:00"
            }
          }
        }
      }
---

# Update RMA status

Partial update — send only the fields you want to change. Pass the resource IRI as `id`. Permission: `sales.rma.statuses.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminRmaStatus(input:)` | Mutation | Update a RMA status |

## Input fields

Input fields are camelCase. `id` is the resource IRI.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA status to update. |
| `title` | string | No | Status label. Must be unique. |
| `status` | integer | No | `1` active / `0` inactive. |
| `color` | string | No | Hex color of the badge. |
