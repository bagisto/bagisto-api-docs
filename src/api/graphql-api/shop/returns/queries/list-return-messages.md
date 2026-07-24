---
outline: false
examples:
  - id: list-return-messages
    title: List Return Messages
    description: List the conversation messages of a return (RMA) request owned by the authenticated customer, newest first.
    query: |
      query CustomerReturnMessages($returnId: Int!) {
        customerReturnMessages(returnId: $returnId) {
          edges {
            cursor
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
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
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
          "customerReturnMessages": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 88,
                  "rmaId": 12,
                  "message": "We have received your request and will inspect the item.",
                  "isAdmin": true,
                  "attachment": null,
                  "attachmentUrl": null,
                  "createdAt": "2026-07-20T10:40:00+00:00"
                }
              },
              {
                "cursor": "Mg==",
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
              "startCursor": "MQ==",
              "endCursor": "Mg==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: returnId required
        cause: The returnId argument is missing
        solution: Provide the numeric id of a return owned by the authenticated customer
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be queried
---

# List Return Messages

## About

The `customerReturnMessages` query lists the conversation thread of a return (RMA) request, newest first. The return must belong to the authenticated customer. Each message is flagged with `isAdmin` so a client can tell who sent it, and carries an optional attachment.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `returnId` | `Int!` | ✅ Yes | Id of the return whose messages to list. Must belong to the authenticated customer. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[CustomerReturnMessageEdge!]` | Array of message edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `CustomerReturnMessage!` | The message object. |
| `edges.node._id` | `Int!` | Numeric message id. |
| `edges.node.rmaId` | `Int!` | Id of the return the message belongs to. |
| `edges.node.message` | `String!` | The message text. |
| `edges.node.isAdmin` | `Boolean!` | `true` if sent by the store, `false` if sent by the customer. |
| `edges.node.attachment` | `String` | Stored attachment path, or `null`. |
| `edges.node.attachmentUrl` | `String` | Public URL of the attachment, or `null`. |
| `edges.node.createdAt` | `DateTime!` | Message timestamp. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `pageInfo.startCursor` | `String` | Cursor for the first item in the page. |
| `pageInfo.endCursor` | `String` | Cursor for the last item in the page. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `totalCount` | `Int!` | Total number of messages on the return. |

## Related Resources

- [Send a Return Message](/api/graphql-api/shop/returns/mutations/send-return-message)
- [View Return](/api/graphql-api/shop/returns/queries/view-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
