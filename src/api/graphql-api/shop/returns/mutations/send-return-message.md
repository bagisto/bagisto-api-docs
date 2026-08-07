---
outline: false
examples:
  - id: send-return-message
    title: Send a Return Message
    description: Add a customer message to the conversation thread of a return (RMA) request.
    query: |
      mutation CreateCustomerReturnMessage(
        $returnId: Int!
        $message: String!
      ) {
        createCustomerReturnMessage(
          input: {
            returnId: $returnId
            message: $message
          }
        ) {
          customerReturnMessage {
            _id
            rmaId
            message
            isAdmin
            attachment
            attachmentUrl
            createdAt
          }
        }
      }
    variables: |
      {
        "returnId": 12,
        "message": "Any update on my return?"
      }
    response: |
      {
        "data": {
          "createCustomerReturnMessage": {
            "customerReturnMessage": {
              "_id": 89,
              "rmaId": 12,
              "message": "Any update on my return?",
              "isAdmin": false,
              "attachment": null,
              "attachmentUrl": null,
              "createdAt": "2026-07-20T11:15:00+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: message required
        cause: The message field is missing
        solution: Provide a non-empty message
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be messaged
---

# Send a Return Message

## About

The `createCustomerReturnMessage` mutation adds a customer message to the conversation thread of a return (RMA) request. The return must belong to the authenticated customer. The created message comes back flagged `isAdmin: false`.

## Authentication

This mutation requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `returnId` | `Int!` | ✅ Yes | Id of the return to add the message to. Must belong to the authenticated customer. |
| `message` | `String!` | ✅ Yes | The message text. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `customerReturnMessage._id` | `Int!` | Numeric message id. |
| `customerReturnMessage.rmaId` | `Int!` | Id of the return the message belongs to. |
| `customerReturnMessage.message` | `String!` | The message text. |
| `customerReturnMessage.isAdmin` | `Boolean!` | `false` — the message was sent by the customer. |
| `customerReturnMessage.attachment` | `String` | Stored attachment path, or `null`. |
| `customerReturnMessage.attachmentUrl` | `String` | Public URL of the attachment, or `null`. |
| `customerReturnMessage.createdAt` | `DateTime!` | Message timestamp. |

Attaching a file to a message is REST-only, through a multipart `file` field — a JSON GraphQL request cannot carry a file. Send the text here, and use REST when the shopper attaches something.

## Related Resources

- [List Return Messages](/api/graphql-api/shop/returns/queries/list-return-messages)
- [View Return](/api/graphql-api/shop/returns/queries/view-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
