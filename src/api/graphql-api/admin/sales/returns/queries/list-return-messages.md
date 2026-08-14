---
outline: false
examples:
  - id: admin-return-messages-gql
    title: List Return Messages
    description: The conversation messages of an RMA request, newest first.
    query: |
      query AdminReturnMessages($returnId: Int!) {
        adminReturnMessages(returnId: $returnId) {
          edges {
            node {
              _id
              rmaId
              message
              isAdmin
              attachment
              attachmentUrl
              createdAt
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
        "returnId": 12
      }
    response: |
      {
        "data": {
          "adminReturnMessages": {
            "edges": [
              {
                "node": {
                  "_id": 90,
                  "rmaId": 12,
                  "message": "We have received your package.",
                  "isAdmin": true,
                  "attachment": null,
                  "attachmentUrl": null,
                  "createdAt": "2026-07-20T11:30:00+00:00"
                }
              },
              {
                "node": {
                  "_id": 87,
                  "rmaId": 12,
                  "message": "The hoodie zipper is broken.",
                  "isAdmin": false,
                  "attachment": "rma/12/messages/zipper.jpg",
                  "attachmentUrl": "https://example.com/storage/rma/12/messages/zipper.jpg",
                  "createdAt": "2026-07-20T10:20:00+00:00"
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

# List Return Messages (GraphQL)

Returns the conversation thread of an RMA request, newest first. The `returnId` argument is required. `isAdmin` distinguishes admin replies from customer messages; `attachmentUrl` is the public URL of an attached file (both `null` when there is no attachment).

Select `_id` for the numeric message id.

See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the conversation flow.

Permission: `sales.rma.requests`.
