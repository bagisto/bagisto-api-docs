---
outline: false
examples:
  - id: admin-return-reasons-gql
    title: List Return Reasons
    description: The active return reasons available when creating a return, filtered by resolution type.
    query: |
      query AdminReturnReasons($resolutionType: String!) {
        adminReturnReasons(resolutionType: $resolutionType) {
          edges {
            node {
              _id
              title
              position
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "resolutionType": "return"
      }
    response: |
      {
        "data": {
          "adminReturnReasons": {
            "edges": [
              {
                "node": {
                  "_id": 2,
                  "title": "Damaged product",
                  "position": 1
                }
              },
              {
                "node": {
                  "_id": 3,
                  "title": "Wrong item delivered",
                  "position": 2
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MQ=="
            },
            "totalCount": 2
          }
        }
      }
---

# List Return Reasons (GraphQL)

Returns the active reasons available when creating a return, ordered by `position`. The `resolutionType` argument is required and must be `return` or `cancel_items` — the reason set differs per resolution type. Pass the chosen reason's id as `rmaReasonId` when creating a return.

Select `_id` for the numeric reason id.

See the [Returns overview](/api/graphql-api/admin/sales/returns/) for how a return is created.

Permission: `sales.rma.requests`.
