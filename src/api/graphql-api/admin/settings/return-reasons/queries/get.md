---
outline: false
examples:
  - id: gql
    title: Get RMA reason
    query: |
      query AdminRmaReason($id: ID!) {
        adminRmaReason(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/rma/reasons/2"
      }
    response: |
      {
        "data": {
          "adminRmaReason": {
            "id": "/api/admin/rma/reasons/2",
            "_id": 2,
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
---

# Get RMA reason

Returns a single RMA reason by its IRI.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaReason(id: ID!)` | Query | Fetch one RMA reason |

Pass the resource IRI (`/api/admin/rma/reasons/{id}`) as `id`. Select `_id` for the numeric id.

For field meanings, see the [menu overview](./).
