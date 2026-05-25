---
outline: false
apiType: rest
examples:
  - id: admin-settings-currencies-list
    title: List Currencies
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/currencies?per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      { "data": [{ "id": 1, "code": "USD", "name": "US Dollar", "symbol": "$", "decimal": ".", "groupSeparator": ",", "decimalSeparator": ".", "currencyPosition": "left", "createdAt": "2025-01-01 00:00:00" }], "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 } }
---

# List Currencies

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/currencies` | GET |

## Query Parameters

`page`, `per_page` (default 10, cap 50), `code` (partial), `name` (partial), `symbol` (partial), `sort` (`id`, `code`, `name`), `order` (`asc`/`desc`).
