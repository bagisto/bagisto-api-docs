---
outline: false
examples:
  - id: view-return
    title: View a Return
    description: Retrieve a single return (RMA) request owned by the authenticated customer, including its item, images and action flags.
    query: |
      query CustomerReturn($id: ID!) {
        customerReturn(id: $id) {
          _id
          orderId
          orderIncrementId
          statusId
          statusTitle
          statusColor
          packageCondition
          information
          canClose
          canReopen
          isExpired
          item
          images
          messagesCount
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/returns/12"
      }
    response: |
      {
        "data": {
          "customerReturn": {
            "_id": 12,
            "orderId": 45,
            "orderIncrementId": "000000045",
            "statusId": 1,
            "statusTitle": "Pending",
            "statusColor": "#FDB022",
            "packageCondition": "opened",
            "information": "Item arrived damaged.",
            "canClose": true,
            "canReopen": false,
            "isExpired": false,
            "item": {
              "id": 30,
              "order_item_id": 78,
              "sku": "COASTALBREEZEMENSHOODIE",
              "name": "Coastal Breeze Men's Blue Zipper Hoodie",
              "quantity": 1,
              "resolution": "return",
              "reason_id": 2,
              "reason": "Damaged product",
              "variant_id": null
            },
            "images": [
              {
                "id": 5,
                "path": "rma/12/damage-front.png",
                "url": "https://example.com/storage/rma/12/damage-front.png"
              }
            ],
            "messagesCount": 2,
            "createdAt": "2026-07-20T10:15:30+00:00",
            "updatedAt": "2026-07-20T10:15:30+00:00"
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The return does not exist or is not owned by the authenticated customer
        solution: Only return IDs belonging to the logged-in customer can be viewed
---

# View Return

## About

The `customerReturn` query returns a single return (RMA) request **owned by the authenticated customer**, with the full detail — the returned item, attached images, status and the action flags (`canClose`, `canReopen`, `isExpired`). If the return does not exist or belongs to a different customer, the query returns a not-found error.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The return IRI, e.g. `/api/shop/returns/12`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric return ID. |
| `orderId` | `Int!` | Id of the order the item belongs to. |
| `orderIncrementId` | `String!` | Human-readable order number. |
| `statusId` | `Int!` | Numeric status id. |
| `statusTitle` | `String!` | Status label, e.g. `Pending`. |
| `statusColor` | `String!` | Hex color for the status badge. |
| `packageCondition` | `String` | Reported package condition, e.g. `opened`. |
| `information` | `String` | Free-text note supplied when the return was raised. |
| `canClose` | `Boolean` | Whether the return can be closed (marked solved). |
| `canReopen` | `Boolean` | Whether the return can be reopened back to pending. |
| `isExpired` | `Boolean` | Whether the return is past its action window. |
| `item` | `Object` | The returned item — `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution`, `reason_id`, `reason`, `variant_id`. Query bare (a JSON object). |
| `item.id` | `Int` | Id of the return item row. |
| `item.order_item_id` | `Int` | Id of the source order item. |
| `item.sku` | `String` | Product SKU. |
| `item.name` | `String` | Product name. |
| `item.quantity` | `Int` | Quantity being returned/canceled. |
| `item.resolution` | `String` | Resolution type: `return` or `cancel_items`. |
| `item.reason_id` | `Int` | Id of the chosen return reason. |
| `item.reason` | `String` | Title of the chosen return reason. |
| `item.variant_id` | `Int` | Variant id for a configurable product, or `null`. |
| `images` | `Array` | Attached images. Query bare (a JSON array). |
| `images[].id` | `Int` | Image id. |
| `images[].path` | `String` | Stored file path. |
| `images[].url` | `String` | Public URL of the image. |
| `messagesCount` | `Int!` | Number of conversation messages on the return. |
| `createdAt` | `DateTime!` | Return creation timestamp. |
| `updatedAt` | `DateTime!` | Return last update timestamp. |

## Related Resources

- [List Returns](/api/graphql-api/shop/returns/queries/list-returns)
- [List Return Messages](/api/graphql-api/shop/returns/queries/list-return-messages)
- [Cancel a Return](/api/graphql-api/shop/returns/mutations/cancel-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
