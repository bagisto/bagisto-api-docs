---
outline: false
examples:
  - id: gql
    title: Get RMA status
    query: |
      query AdminRmaStatus($id: ID!) {
        adminRmaStatus(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/rma/statuses/9"
      }
    response: |
      {
        "data": {
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
---

# Get RMA status

Returns a single RMA status by its IRI.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminRmaStatus(id: ID!)` | Query | Fetch one RMA status |

Pass the resource IRI (`/api/admin/rma/statuses/{id}`) as `id`. Select `_id` for the numeric id.

For field meanings, see the [menu overview](../).
