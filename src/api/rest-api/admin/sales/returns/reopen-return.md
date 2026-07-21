---
outline: false
apiType: rest
examples:
  - id: admin-return-reopen
    title: Reopen Return
    description: Reopen a declined or canceled RMA back to pending when store settings allow it (otherwise 422). Empty body.
    query: |
      curl -X POST "https://your-domain.com/api/admin/rma/requests/12/reopen" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{}'
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
        "messagesCount": 3,
        "createdAt": "2026-07-20T10:15:30+00:00",
        "updatedAt": "2026-07-20T11:20:00+00:00"
      }
---

# Reopen Return

Reopens a declined or canceled RMA request back to **Pending**. The `canReopen` flag on the request detail tells you whether reopening is currently possible; when store settings disallow it the endpoint returns `422`.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests/{id}/reopen` | POST |

The body is empty (`{}`).

## Permission

`sales.rma.requests`

::: tip
See the [Returns overview](/api/rest-api/admin/sales/returns/) for the status workflow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
