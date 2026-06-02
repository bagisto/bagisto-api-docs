---
outline: false
apiType: rest
examples:
  - id: admin-customer-groups-list
    title: List Customer Groups
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/groups?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          { "id": 1, "code": "general", "name": "General", "isUserDefined": 0, "customersCount": null, "createdAt": "2025-01-01 00:00:00", "updatedAt": "2025-01-01 00:00:00" },
          { "id": 4, "code": "wholesale", "name": "Wholesale", "isUserDefined": 1, "customersCount": null, "createdAt": "2026-05-20 12:00:00", "updatedAt": "2026-05-20 12:00:00" }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 2, "from": 1, "to": 2 }
      }
---

# List Customer Groups

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination (default `10`, cap `50`). |
| `code` | string | Partial code match. |
| `name` | string | Partial name match. |
| `is_user_defined` | integer | `0` (system) or `1` (user-defined). |
| `sort` | string | `id` (default desc), `code`, `name`. |
| `order` | string | `asc`, `desc`. |

`customersCount` is detail-only — null on listing rows.
