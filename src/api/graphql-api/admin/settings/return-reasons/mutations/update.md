---
outline: false
examples:
  - id: gql
    title: Update RMA reason
    query: |
      mutation UpdateAdminRmaReason($input: updateAdminRmaReasonInput!) {
        updateAdminRmaReason(input: $input) {
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
          "id": "/api/admin/rma/reasons/2",
          "title": "Damaged on arrival",
          "position": 2,
          "resolutionType": [
            "return"
          ]
        }
      }
    response: |
      {
        "data": {
          "updateAdminRmaReason": {
            "adminRmaReason": {
              "id": "/api/admin/rma/reasons/2",
              "_id": 2,
              "title": "Damaged on arrival",
              "status": 1,
              "position": 2,
              "isAdmin": 0,
              "resolutionType": [
                "return"
              ],
              "message": null,
              "createdAt": "2026-07-20T09:00:00+00:00",
              "updatedAt": "2026-07-20T11:00:00+00:00"
            }
          }
        }
      }
---

# Update RMA reason

Partial update — send only the fields you want to change. Pass the resource IRI as `id`. Permission: `sales.rma.reasons.edit`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminRmaReason(input:)` | Mutation | Update a RMA reason |

## Input fields

Input fields are camelCase. `id` is the resource IRI.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | Resource IRI of the RMA reason to update. |
| `title` | string | No | Reason label. |
| `status` | integer | No | `1` active / `0` inactive. |
| `position` | integer | No | Sort order. |
| `resolution_type` | array | No | Allowed return actions. |
