---
outline: false
apiType: rest
examples:
  - id: admin-get-return
    title: Get Return
    description: Full detail of a single return request — the returned item, images, status, order/customer context, whether it can be reopened, and the status transitions the admin may set next.
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/requests/12" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
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
        "images": [
          {
            "id": 5,
            "path": "rma/12/damage-front.png",
            "url": "https://example.com/storage/rma/12/damage-front.png"
          }
        ],
        "availableStatuses": [
          { "id": 2, "title": "Accept" },
          { "id": 3, "title": "Declined" }
        ],
        "messagesCount": 2,
        "createdAt": "2026-07-20T10:15:30+00:00",
        "updatedAt": "2026-07-20T10:15:30+00:00"
      }
---

# Get Return

Returns the full detail of a single RMA request: the returned `item`, proof `images`, status, order/customer context, the `canReopen` flag, and the `availableStatuses` transitions the admin may set next.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests/{id}` | GET |

## Field notes

- `item` — the returned line, with snake_case keys: `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution` (`return` or `cancel_items`), `reason_id`, `reason`, `variant_id`.
- `images` — a list of `{ id, path, url }`.
- `availableStatuses` — a list of `{ id, title }`, the status ids you may pass to [Update Status](./update-status).

## Permission

`sales.rma.requests`

::: tip
See the [Returns overview](/api/rest-api/admin/sales/returns/) for the status workflow and action semantics.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
