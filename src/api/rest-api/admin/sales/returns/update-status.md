---
outline: false
apiType: rest
examples:
  - id: admin-return-update-status
    title: Update Status
    description: Set the RMA status. "Received package" creates a refund for the returned item (send shipping to include shipping); "Item canceled" cancels the order item and restores inventory; any other status just updates the status. A status note is added and the customer is notified.
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/requests/12/update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "rma_status_id": 2,
          "shipping": 0
        }'
    variables: |
      {
        "rma_status_id": 2,
        "shipping": 0
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
---

# Update Status

Moves an RMA request to a new status. Pass a status id taken from the request's `availableStatuses` (see [Get Return](./get-return)).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests/{id}/update-status` | POST |

## Action semantics

Two statuses do more than change the label:

- **Received package** (`rma_status_id` = `5`) — creates a **refund** for the returned item. Send a `shipping` amount to include shipping in the refund; omit or send `0` to refund the item only.
- **Item canceled** (`rma_status_id` = `8`) — **cancels the order item** and restores its inventory.

Any other status just updates the status. Every status change adds a note to the conversation and notifies the customer.

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rma_status_id` | integer | yes | The next status id (one of the request's `availableStatuses`). |
| `shipping` | number | no | Shipping amount to include when the status creates a refund. Defaults to `0`. |

## Permission

`sales.rma.requests`

::: tip
See the [Returns overview](/api/rest-api/admin/sales/returns/) for the full status workflow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
