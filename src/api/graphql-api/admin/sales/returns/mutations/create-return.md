---
outline: false
examples:
  - id: admin-create-return-gql
    title: Create Return
    description: Open a return (or item cancellation) for any customer order. rmaQty is capped server-side by the item's returnable/cancelable quantity.
    query: |
      mutation CreateReturn($input: createAdminReturnInput!) {
        createAdminReturn(input: $input) {
          adminReturn {
            id
            _id
            orderId
            orderIncrementId
            orderStatus
            customerName
            customerEmail
            isGuest
            statusId
            statusTitle
            statusColor
            packageCondition
            information
            canReopen
            item
            images
            availableStatuses
            messagesCount
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "orderId": 45,
          "orderItemId": 78,
          "rmaQty": 1,
          "resolutionType": "return",
          "rmaReasonId": 2,
          "information": "Customer reported a defect.",
          "packageCondition": "opened"
        }
      }
    response: |
      {
        "data": {
          "createAdminReturn": {
            "adminReturn": {
              "id": "/api/admin/rma/requests/12",
              "_id": 12,
              "orderId": 45,
              "orderIncrementId": "000000045",
              "orderStatus": "processing",
              "customerName": "Jane Doe",
              "customerEmail": "jane@example.com",
              "isGuest": 0,
              "statusId": 1,
              "statusTitle": "Pending",
              "statusColor": "#FDB022",
              "packageCondition": "opened",
              "information": "Customer reported a defect.",
              "canReopen": false,
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
              "availableStatuses": [
                { "id": 2, "title": "Accept" },
                { "id": 3, "title": "Declined" }
              ],
              "messagesCount": 0,
              "createdAt": "2026-07-20T10:15:30+00:00",
              "updatedAt": "2026-07-20T10:15:30+00:00"
            }
          }
        }
      }
---

# Create Return (GraphQL)

Opens an RMA request for an order item. Use [List Returnable Items](../queries/list-returnable-items.md) to get the eligible items and their caps, and [List Return Reasons](../queries/list-return-reasons.md) for the reason ids of the chosen resolution type.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderId` | `Int` | yes | The order to open the return against. |
| `orderItemId` | `Int` | yes | The order item being returned/canceled. |
| `rmaQty` | `Int` | yes | Quantity to return. Capped server-side by the item's returnable/cancelable quantity. |
| `resolutionType` | `String` | yes | `return` or `cancel_items`. |
| `rmaReasonId` | `Int` | yes | A reason id valid for the chosen `resolutionType`. |
| `information` | `String` | no | Free-text note. |
| `packageCondition` | `String` | no | Condition of the package (e.g. `opened`). |

Attaching proof images is REST-only (multipart) — not available over GraphQL.

::: tip
See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the status workflow.
:::

Permission: `sales.rma.requests.create`.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
