---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-detail
    title: Customer Group Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/groups/4" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 4,
        "code": "wholesale",
        "name": "Wholesale",
        "isUserDefined": 1,
        "customersCount": 23,
        "createdAt": "2026-05-20 12:00:00",
        "updatedAt": "2026-06-20 14:30:00"
      }
---

# Customer Group Detail

Returns a single customer group, including the `customersCount` that the listing omits.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/{id}` | GET |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Group ID. |
| `code` | string | Unique group code. |
| `name` | string | Display name. |
| `isUserDefined` | integer | `0` (system group) or `1` (user-defined). |
| `customersCount` | integer | Number of customers in the group (detail-only — `null` on listing rows). |
| `createdAt`, `updatedAt` | string | Timestamps. |

Unknown id → `404`.

::: tip
For what customer groups are and the system-group rules, see the [Customer Groups overview](./index.md).
:::
