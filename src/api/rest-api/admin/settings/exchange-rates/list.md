---
outline: false
apiType: rest
examples:
  - id: rest
    title: List Exchange Rates
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/exchange-rates?per_page=10" -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "targetCurrency": 2, "targetCurrencyCode": "EUR", "targetCurrencyName": "Euro", "rate": 0.92, "createdAt": "2026-05-22T08:15:00+00:00", "updatedAt": "2026-05-22T08:15:00+00:00" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
  - id: filtered
    title: Filtered + Sorted
    description: Narrow by target currency and rate range, sorted by rate ascending. Supplying multiple filters narrows the result (logical AND).
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/exchange-rates?target_currency=2&rate_from=0.5&rate_to=2&sort=rate&order=asc&per_page=10" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "targetCurrency": 2, "targetCurrencyCode": "EUR", "targetCurrencyName": "Euro", "rate": 0.92, "createdAt": "2026-05-22T08:15:00+00:00", "updatedAt": "2026-05-22T08:15:00+00:00" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Exchange Rates

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/exchange-rates` | GET |

Returns every exchange rate in the `{ data, meta }` envelope. Each row carries its target currency's resolved `targetCurrencyCode` and `targetCurrencyName` inline, so no separate currency lookup is needed.

## Pagination

| Parameter | Description |
|-----------|-------------|
| `page` | Page number, 1-based. Default `1`. |
| `per_page` | Items per page. Default `10`, max `50`. |

## Filters

Query parameters that narrow the result. Supplying more than one **narrows further** — they combine with logical **AND**.

| Parameter | Match | Example |
|-----------|-------|---------|
| `target_currency` | Exact — target currency id. | `?target_currency=2` |
| `rate_from` | Minimum rate, inclusive. | `?rate_from=0.5` |
| `rate_to` | Maximum rate, inclusive. | `?rate_to=2` |

`rate_from` and `rate_to` together bound the rate to a range.

## Sorting

| Parameter | Values |
|-----------|--------|
| `sort` | `id` (default), `target_currency`, `rate` |
| `order` | `asc`, `desc` (default `desc`) |

Both the compound form `?sort=rate-asc` and the split form `?sort=rate&order=asc` are accepted.

See the [Exchange Rates overview](./) for field meanings and behaviour.
