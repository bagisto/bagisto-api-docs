---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Tax Rates
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-rates" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "identifier": "us-il-7", "taxRate": 7.25, "country": "US", "state": "IL", "isZip": false, "zipCode": "62704" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Tax Rates

Returns the store-wide list of tax rates in the standard `{ data, meta }` envelope. Each row is one tax rate — a rule that defines the tax percentage applied to a location, identified by country/state and either a single zip code (`isZip: false`) or a zip-code range (`isZip: true`).

## Endpoint

```
GET /api/admin/settings/tax-rates
```

## Query parameters

All parameters are optional and combine in one request — filter, sort and paginate together.

### Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number (1-based). |
| `per_page` | Items per page (default `10`, max `50`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Parameter | Match | Example |
|-----------|-------|---------|
| `identifier` | Partial (contains). | `?identifier=AUDIT` |
| `country` | Exact — two-letter ISO code. | `?country=US` |
| `state` | Exact. | `?state=CA` |
| `tax_rate_from` | Minimum tax rate (inclusive). | `?tax_rate_from=5` |
| `tax_rate_to` | Maximum tax rate (inclusive). | `?tax_rate_to=10` |

### Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `identifier`, `tax_rate` |
| `order` | `asc`, `desc` (default `desc`) |

For how tax rates fit together with tax categories, see the [menu overview](./).
