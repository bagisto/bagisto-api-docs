---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Inventory Sources
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/inventory-sources?per_page=10" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "code": "default", "name": "Default Warehouse", "priority": 1, "status": 1, "country": "US", "city": "Springfield" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Inventory Sources

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/inventory-sources` | GET |

Returns every inventory source configured in the store in the `{ data, meta }` envelope. Every column is populated on each row, so you can read whatever you need without a follow-up call.

::: tip How this menu works
For what an inventory source is, field meanings, and the delete guards, see the [Inventory Sources overview](/api/rest-api/admin/settings/inventory-sources/).
:::

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**. They mirror the admin Inventory Sources datagrid filters.

| Parameter | Match | Example |
|-----------|-------|---------|
| `code` | Partial (contains). | `?code=warehouse` |
| `name` | Partial (contains). | `?name=West` |
| `status` | Exact — `0` (inactive) or `1` (active). | `?status=1` |
| `country` | Exact — 2-letter country code. | `?country=US` |

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `code`, `name`, `priority`, `status` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=name-asc` and the split form `?sort=name&order=asc` are accepted.

## Notes

- `status` is `0` (inactive) or `1` (active); only active sources are available for fulfilment.
- `latitude` / `longitude` are `null` when the source has no geo-coordinates configured.
- Seeded core sources (such as the `default` source) may have `null` `createdAt` / `updatedAt`.

See the [Inventory Sources overview](/api/rest-api/admin/settings/inventory-sources/) for field meanings and behaviour.
