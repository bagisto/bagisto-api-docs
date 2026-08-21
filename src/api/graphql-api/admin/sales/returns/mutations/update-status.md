---
outline: false
examples:
  - id: admin-return-update-status-gql
    title: Update Status
    description: Set the RMA status. "Received package" creates a refund for the returned item (send shipping to include shipping); "Item canceled" cancels the order item and restores inventory; any other status just updates the status. A status note is added and the customer is notified.
    query: |
      mutation UpdateReturnStatus($input: updateStatusAdminReturnInput!) {
        updateStatusAdminReturn(input: $input) {
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
          "id": "/api/admin/rma/requests/12",
          "rmaStatusId": 2,
          "shipping": 0
        }
      }
    response: |
      {
        "data": {
          "updateStatusAdminReturn": {
            "adminReturn": {
              "id": "/api/admin/rma/requests/12",
              "_id": 12,
              "orderId": 45,
              "orderIncrementId": "000000045",
              "orderStatus": "processing",
              "customerName": "Jane Doe",
              "customerEmail": "jane@example.com",
              "isGuest": 0,
              "statusId": 2,
              "statusTitle": "Accept",
              "statusColor": "#12B76A",
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
                { "id": 5, "title": "Received package" },
                { "id": 4, "title": "Dispatched package" }
              ],
              "messagesCount": 3,
              "createdAt": "2026-07-20T10:15:30+00:00",
              "updatedAt": "2026-07-20T11:00:00+00:00"
            }
          }
        }
      }
---

# Update Status (GraphQL)

Moves an RMA request to a new status. Pass a status id taken from the request's `availableStatuses` (see [View Return](../queries/view-return.md)).

## Action semantics

Two statuses do more than change the label:

- **Received package** (`rmaStatusId` = `5`) — creates a **refund** for the returned item. Send a `shipping` amount to include shipping in the refund; omit or send `0` to refund the item only.
- **Item canceled** (`rmaStatusId` = `8`) — **cancels the order item** and restores its inventory.

Any other status just updates the status. Every status change adds a note to the conversation and notifies the customer.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ID` | yes | The return IRI (`/api/admin/rma/requests/{id}`). |
| `rmaStatusId` | `Int` | yes | The next status id (one of the request's `availableStatuses`). |
| `shipping` | `Float` | no | Shipping amount to include when the status creates a refund. Defaults to `0`. |

See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the full status workflow.

Permission: `sales.rma.requests`.
