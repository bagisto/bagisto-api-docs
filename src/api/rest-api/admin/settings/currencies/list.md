---
outline: false
apiType: rest
examples:
  - id: admin-settings-currencies-list
    title: List Currencies
    description: Paginated list of every currency configured in the store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/currencies?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$",
            "decimal": 2,
            "groupSeparator": ",",
            "decimalSeparator": ".",
            "currencyPosition": "left",
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
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by code, sorted by name ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/currencies?code=USD&sort=name&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "USD",
            "name": "US Dollar",
            "symbol": "$",
            "decimal": 2,
            "groupSeparator": ",",
            "decimalSeparator": ".",
            "currencyPosition": "left",
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

# List Currencies

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/currencies` | GET |

Returns every currency configured in the store in the `{ data, meta }` envelope. Use it to populate a currency picker, audit which currencies a store supports, or look up a currency's `id` before a detail / update / delete call.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Currencies datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `code` | Partial (contains). | `?code=USD` |
| `name` | Partial (contains). | `?name=Dollar` |
| `symbol` | Partial (contains). | `?symbol=$` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `code`, `name` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- `symbol` and `currencyPosition` may be `null` for currencies created without those fields set.
- The seeded default currency (`USD`) may carry `null` `createdAt` / `updatedAt`.
