---
outline: false
apiType: rest
examples:
  - id: admin-returns-list
    title: List Returns
    description: Paginated RMA queue. Detail-only fields (item, images, availableStatuses, information, packageCondition, canReopen, messagesCount) are null on the listing rows.
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/requests?per_page=10" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      {
        "data": [
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
            "packageCondition": null,
            "information": null,
            "canReopen": null,
            "item": null,
            "images": null,
            "availableStatuses": null,
            "messagesCount": null,
            "createdAt": "2026-07-20T10:15:30+00:00",
            "updatedAt": "2026-07-20T10:15:30+00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Returns

Mirrors the admin **Sales → Returns** datagrid. Each row carries the return's status and order/customer context; the detail-only fields (`item`, `images`, `availableStatuses`, `information`, `packageCondition`, `canReopen`, `messagesCount`) are `null` on the listing — fetch them with [Get Return](./get-return).

The response is wrapped in the `{ data, meta }` envelope.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `per_page=10`, cap `50`). |
| `id` | string | Filter by return id (int or comma-list). |
| `order_id` | integer | Exact order id. |
| `status` | string | Status title (e.g. `Pending`, `Accept`, `Declined`). |
| `customer_name` | string | Partial customer name. |
| `created_at_from` / `_to` | date | Created range. |
| `sort` | string | `id` (default), `order_id`, `created_at`. |
| `order` | string | `asc`, `desc` (default `desc`). |

## Permission

`sales.rma.requests`

See the [Returns overview](/api/rest-api/admin/sales/returns/) for the status workflow and action semantics.
