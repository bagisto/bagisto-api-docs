---
outline: false
apiType: rest
examples:
  - id: admin-create-return
    title: Create Return
    description: Open a return (or item cancellation) for any customer order. rma_qty is capped server-side by the item's returnable/cancelable quantity. Optional proof images via multipart images[].
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/requests" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "order_id": 45,
          "order_item_id": 78,
          "rma_qty": 1,
          "resolution_type": "return",
          "rma_reason_id": 2,
          "information": "Customer reported a defect.",
          "package_condition": "opened"
        }'
    variables: |
      {
        "order_id": 45,
        "order_item_id": 78,
        "rma_qty": 1,
        "resolution_type": "return",
        "rma_reason_id": 2,
        "information": "Customer reported a defect.",
        "package_condition": "opened"
      }
    response: |
      {
        "id": 12,
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
---

# Create Return

Opens an RMA request for an order item. Use [List Returnable Items](./list-returnable-items) to get the eligible items and their caps, and [List Return Reasons](./list-return-reasons) for the reason ids of the chosen resolution type.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `order_id` | integer | yes | The order to open the return against. |
| `order_item_id` | integer | yes | The order item being returned/canceled. |
| `rma_qty` | integer | yes | Quantity to return. Capped server-side by the item's returnable/cancelable quantity. |
| `resolution_type` | string | yes | `return` or `cancel_items`. |
| `rma_reason_id` | integer | yes | A reason id valid for the chosen `resolution_type`. |
| `information` | string | no | Free-text note. |
| `package_condition` | string | no | Condition of the package (e.g. `opened`). |

To attach proof images, send the request as `multipart/form-data` with the fields above plus one or more `images[]` file parts.

## Permission

`sales.rma.requests.create`

See the [Returns overview](/api/rest-api/admin/sales/returns/) for the status workflow.
