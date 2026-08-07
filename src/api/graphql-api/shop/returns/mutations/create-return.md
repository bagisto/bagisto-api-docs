---
outline: false
examples:
  - id: create-return
    title: Raise a Return
    description: Raise a new return (RMA) request for one item of one of the authenticated customer's orders.
    query: |
      mutation CreateCustomerReturn(
        $orderId: Int!
        $orderItemId: Int!
        $rmaQty: Int!
        $resolutionType: String!
        $rmaReasonId: Int!
        $information: String
        $packageCondition: String
        $agreement: Boolean!
      ) {
        createCustomerReturn(
          input: {
            orderId: $orderId
            orderItemId: $orderItemId
            rmaQty: $rmaQty
            resolutionType: $resolutionType
            rmaReasonId: $rmaReasonId
            information: $information
            packageCondition: $packageCondition
            agreement: $agreement
          }
        ) {
          customerReturn {
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
      }
    variables: |
      {
        "orderId": 45,
        "orderItemId": 78,
        "rmaQty": 1,
        "resolutionType": "return",
        "rmaReasonId": 2,
        "information": "Item arrived damaged.",
        "packageCondition": "opened",
        "agreement": true
      }
    response: |
      {
        "data": {
          "createCustomerReturn": {
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
              "images": [],
              "messagesCount": 0,
              "createdAt": "2026-07-20T10:15:30+00:00",
              "updatedAt": "2026-07-20T10:15:30+00:00"
            }
          }
        }
      }
    commonErrors:
      - error: item not returnable
        cause: The order item is outside its return window or already fully returned/canceled
        solution: Query returnableItems first and only raise a return for an eligible item and quantity
      - error: agreement required
        cause: The agreement field was not set to true
        solution: Send agreement as true to confirm the return terms
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The order does not exist or is not owned by the authenticated customer
        solution: Only order IDs belonging to the logged-in customer can be used
---

# Raise a Return

## About

The `createCustomerReturn` mutation raises a new return (RMA) request for one item of one of the customer's orders. The item must be return-eligible — check it with [`returnableItems`](/api/graphql-api/shop/returns/queries/list-returnable-items) first. The requested quantity (`rmaQty`) is capped server-side by the quantity the customer is actually allowed to return. The return starts in a `Pending` status.

## Authentication

This mutation requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderId` | `Int!` | ✅ Yes | Id of the order the item belongs to. |
| `orderItemId` | `Int!` | ✅ Yes | Id of the order item being returned — from `returnableItems`. |
| `rmaQty` | `Int!` | ✅ Yes | Quantity to return. Capped server-side by the returnable quantity. |
| `resolutionType` | `String!` | ✅ Yes | `return` or `cancel_items`. |
| `rmaReasonId` | `Int!` | ✅ Yes | Id of the chosen return reason — from `returnReasons`. |
| `information` | `String` | ❌ No | Free-text note about the return. |
| `packageCondition` | `String` | ❌ No | Reported package condition, e.g. `opened`. |
| `agreement` | `Boolean!` | ✅ Yes | Must be `true` to confirm the return terms. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `customerReturn._id` | `Int!` | Numeric return ID. |
| `customerReturn.orderId` | `Int!` | Id of the order the item belongs to. |
| `customerReturn.orderIncrementId` | `String!` | Human-readable order number. |
| `customerReturn.statusId` | `Int!` | Numeric status id — `1` (Pending) for a fresh return. |
| `customerReturn.statusTitle` | `String!` | Status label. |
| `customerReturn.statusColor` | `String!` | Hex color for the status badge. |
| `customerReturn.packageCondition` | `String` | Reported package condition. |
| `customerReturn.information` | `String` | The note supplied when raising the return. |
| `customerReturn.canClose` | `Boolean` | Whether the return can be closed. |
| `customerReturn.canReopen` | `Boolean` | Whether the return can be reopened. |
| `customerReturn.isExpired` | `Boolean` | Whether the return is past its action window. |
| `customerReturn.item` | `Object` | The returned item — `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution`, `reason_id`, `reason`, `variant_id`. Query bare (a JSON object). |
| `customerReturn.images` | `Array` | Attached images (`id`, `path`, `url`). Empty on a JSON-created return. Query bare (a JSON array). |
| `customerReturn.messagesCount` | `Int!` | Number of conversation messages — `0` for a fresh return. |
| `customerReturn.createdAt` | `DateTime!` | Return creation timestamp. |
| `customerReturn.updatedAt` | `DateTime!` | Return last update timestamp. |

Attaching image files to a return is REST-only, through a multipart `images[]` field — a JSON GraphQL request cannot carry a file. Raise the return here, then upload the images over REST if the shopper attached any.

## Related Resources

- [List Returnable Items](/api/graphql-api/shop/returns/queries/list-returnable-items)
- [List Return Reasons](/api/graphql-api/shop/returns/queries/list-return-reasons)
- [Cancel a Return](/api/graphql-api/shop/returns/mutations/cancel-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
