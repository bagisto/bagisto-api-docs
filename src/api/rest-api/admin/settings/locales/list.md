---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Locales
    description: Paginated list of every locale (storefront language) configured in the store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/locales?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "en",
            "name": "English",
            "direction": "ltr",
            "logoPath": "locales/en.png",
            "logoUrl": "https://your-domain.com/storage/locales/en.png",
            "createdAt": null,
            "updatedAt": null
          },
          {
            "id": 10,
            "code": "ar",
            "name": "Arabic",
            "direction": "rtl",
            "logoPath": null,
            "logoUrl": null,
            "createdAt": "2026-05-22T08:15:00+00:00",
            "updatedAt": "2026-05-22T08:15:00+00:00"
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
    description: Narrow by code and direction, sorted by name ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/locales?code=en&direction=ltr&sort=name&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "en",
            "name": "English",
            "direction": "ltr",
            "logoPath": "locales/en.png",
            "logoUrl": "https://your-domain.com/storage/locales/en.png",
            "createdAt": null,
            "updatedAt": null
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

# List Locales

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/locales` | GET |

Returns every locale configured in the store in the `{ data, meta }` envelope. Use it to populate a locale picker, audit which languages a store supports, or look up a locale's `id` before a detail / update / delete call.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Locales datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `id` | Exact. Single id or a comma-separated list. | `?id=1` · `?id=1,10,35` |
| `code` | Partial (contains). | `?code=en` |
| `name` | Partial (contains). | `?name=Eng` |
| `direction` | Exact — `ltr` or `rtl`. | `?direction=rtl` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `code`, `name` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- `direction` controls the text direction of the storefront when that locale is active.
- `logoPath` is the stored relative path; `logoUrl` is its fully-qualified public URL. Both are `null` for locales without a logo.
- Seeded core locales (such as English) may have `null` `createdAt` / `updatedAt`.

