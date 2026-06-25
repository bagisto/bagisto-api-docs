---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Channels
    description: Paginated list of every channel (storefront) configured in the store.
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/channels?per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "default",
            "name": "Default Channel",
            "hostname": "store.example.com",
            "rootCategoryId": 1,
            "defaultLocaleId": 1,
            "baseCurrencyId": 1
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
    description: Narrow by code, name and hostname, sorted by name ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/channels?code=default&name=Store&hostname=example.com&sort=name&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "default",
            "name": "Default Channel",
            "hostname": "store.example.com",
            "rootCategoryId": 1,
            "defaultLocaleId": 1,
            "baseCurrencyId": 1
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

# List Channels

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/channels` | GET |

Returns every channel (storefront) configured in the store in the `{ data, meta }` envelope. Use it to audit which storefronts a store runs, or look up a channel's `id` before a detail / update / delete call.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Channels datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `code` | Partial (contains), on the channel code. | `?code=default` |
| `name` | Partial (contains), on the channel's translated name. | `?name=Store` |
| `hostname` | Partial (contains), on the channel hostname. | `?hostname=example.com` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `code`, `name` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- Listing rows are **slim**: the detail-only nested data — `locales`, `currencies`, `inventorySources`, and `translations` — is not included here. Fetch a single channel with the detail endpoint to get it populated.
- `code` and `hostname` match against the channel row; `name` matches against the channel's translation for the current locale.

See the [Channels overview](./) for field meanings and behaviour.
