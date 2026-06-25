---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Roles
    description: Paginated list of every admin role configured in the store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/roles?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "name": "Administrator",
            "description": "Administrator role",
            "permissionType": "all",
            "permissions": null,
            "createdAt": null,
            "updatedAt": null
          },
          {
            "id": 3,
            "name": "Catalogue manager",
            "description": "This is catalogue manager and permissions are added accordingly",
            "permissionType": "custom",
            "permissions": [
              "catalog",
              "catalog.products",
              "catalog.products.create",
              "catalog.products.edit"
            ],
            "createdAt": "2026-05-13T18:30:58+05:30",
            "updatedAt": "2026-05-13T18:30:58+05:30"
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
    description: Narrow by name and permission type, sorted by name ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/roles?name=Catalog&permission_type=custom&sort=name&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 3,
            "name": "Catalogue manager",
            "description": "This is catalogue manager and permissions are added accordingly",
            "permissionType": "custom",
            "permissions": [
              "catalog",
              "catalog.products",
              "catalog.products.create",
              "catalog.products.edit"
            ],
            "createdAt": "2026-05-13T18:30:58+05:30",
            "updatedAt": "2026-05-13T18:30:58+05:30"
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

# List Roles

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/roles` | GET |

Returns every admin role configured in the store in the `{ data, meta }` envelope. A role is a named permission set assigned to admin users to control which areas of the admin panel they can access. Use it to populate a role picker, audit which roles exist, or look up a role's `id` before a detail / update / delete call.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Roles datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `name` | Partial (contains). | `?name=Catalog` |
| `permission_type` | Exact — `all` or `custom`. | `?permission_type=custom` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `name` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- `permissions` is a string array of permission keys for a `custom` role. For an `all` role it is `null` (full access — no explicit key list is stored).
- Seeded core roles (such as Administrator) may have `null` `createdAt` / `updatedAt`.

See the [Roles overview](./) for field meanings and behaviour.
