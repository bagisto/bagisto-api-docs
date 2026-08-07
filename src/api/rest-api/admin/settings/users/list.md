---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Admin Users
    description: Paginated list of every admin user (back-office account) configured in the store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/users?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "name": "Admin",
            "email": "admin@example.com",
            "roleId": 1,
            "roleName": "Administrator",
            "status": 1,
            "image": null,
            "imageUrl": null,
            "createdAt": "2026-01-02T17:24:30+00:00",
            "updatedAt": "2026-06-05T10:40:17+00:00"
          },
          {
            "id": 1919,
            "name": "Everette Reilly",
            "email": "nikita36@gmail.com",
            "roleId": 42,
            "roleName": "Catalog Manager",
            "status": 1,
            "image": null,
            "imageUrl": null,
            "createdAt": "2026-05-28T13:36:13+00:00",
            "updatedAt": "2026-05-28T13:36:13+00:00"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 2,
          "from": 1,
          "to": 2
        }
      }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by name and status, sorted by name ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/users?name=Admin&status=1&sort=name&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "name": "Admin",
            "email": "admin@example.com",
            "roleId": 1,
            "roleName": "Administrator",
            "status": 1,
            "image": null,
            "imageUrl": null,
            "createdAt": "2026-01-02T17:24:30+00:00",
            "updatedAt": "2026-06-05T10:40:17+00:00"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
---

# List Admin Users

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/users` | GET |

Returns every admin user — the back-office accounts that can sign in to the admin panel — in the `{ data, meta }` envelope. Each row carries its assigned role (`roleId` / `roleName`) and active `status`. The `password` and `api_token` values are never returned.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Users datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `name` | Partial (contains). | `?name=Admin` |
| `email` | Partial (contains). | `?email=@example.com` |
| `role_id` | Exact — the assigned role id. | `?role_id=1` |
| `status` | Exact — `1` (active) or `0` (inactive). | `?status=1` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `name`, `email` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- `status` is `1` for an active admin (can sign in) and `0` for a deactivated one.
- `image` is the stored relative avatar path; `imageUrl` is its fully-qualified public URL. Both are `null` for admins without an avatar.

