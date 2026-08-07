---
outline: false
examples:
  - id: list-return-messages
    title: List Return Messages
    description: List the conversation messages of a return (RMA) request owned by the authenticated customer, newest first.
    query: |
      query CustomerReturnMessages($returnId: Int!) {
        customerReturnMessages(returnId: $returnId) {
          _id
          rmaId
          message
          isAdmin
          attachment
          attachmentUrl
          createdAt
        }
      }
    variables: |
      {
        "returnId": 12
      }
    response: |
      {
        "data": {
          "customerReturnMessages": [
            {
              "_id": 88,
              "rmaId": 12,
              "message": "We have received your request and will inspect the item.",
              "isAdmin": true,
              "attachment": null,
              "attachmentUrl": null,
              "createdAt": "2026-07-20T10:40:00+00:00"
            },
            {
              "_id": 87,
              "rmaId": 12,
              "message": "The hoodie zipper is broken.",
              "isAdmin": false,
              "attachment": "rma/12/messages/zipper.jpg",
              "attachmentUrl": "https://example.com/storage/rma/12/messages/zipper.jpg",
              "createdAt": "2026-07-20T10:20:00+00:00"
            }
          ]
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

The query returns a plain list of messages, not a cursor connection — there is no `edges`, `pageInfo`, or `totalCount` to select, and no pagination arguments. The whole thread comes back in one response.

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric message id. |
| `rmaId` | `Int!` | Id of the return the message belongs to. |
| `message` | `String!` | The message text. |
| `isAdmin` | `Boolean!` | `true` if sent by the store, `false` if sent by the customer. |
| `attachment` | `String` | Stored attachment path, or `null`. |
| `attachmentUrl` | `String` | Public URL of the attachment, or `null`. |
| `createdAt` | `DateTime!` | Message timestamp. |

## Related Resources

- [Send a Return Message](/api/graphql-api/shop/returns/mutations/send-return-message)
- [View Return](/api/graphql-api/shop/returns/queries/view-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
