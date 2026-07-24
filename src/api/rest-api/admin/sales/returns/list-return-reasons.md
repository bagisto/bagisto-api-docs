---
outline: false
apiType: rest
examples:
  - id: admin-return-reasons
    title: List Return Reasons
    description: The active return reasons available when creating a return, filtered by resolution type. Returned as a plain JSON array (no envelope).
    query: |
      curl -X GET "https://your-domain.com/api/admin/rma/requests/resolution-reasons?resolution_type=return" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    response: |
      [
        { "id": 2, "title": "Damaged product", "position": 1 },
        { "id": 3, "title": "Wrong item delivered", "position": 2 }
      ]
---

# List Return Reasons

Returns the active reasons available when creating a return, ordered by `position`. Returned as a **plain JSON array** (no `{ data, meta }` envelope). The reason set differs per resolution type — pass the chosen reason's `id` as `rma_reason_id` when [creating a return](./create-return).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/rma/requests/resolution-reasons` | GET |

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `resolution_type` | string | yes | `return` or `cancel_items`. |

## Permission

`sales.rma.requests`

::: tip
See the [Returns overview](/api/rest-api/admin/sales/returns/) for how a return is created.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
