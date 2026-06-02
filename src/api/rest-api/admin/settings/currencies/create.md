---
outline: false
apiType: rest
examples:
  - id: admin-settings-currency-create
    title: Create Currency
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/currencies" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "code": "EUR", "name": "Euro", "symbol": "€" }'
    response: |
      { "id": 2, "code": "EUR", "name": "Euro", "symbol": "€" }
---

# Create Currency

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/currencies` | POST |

## Request Body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | yes | Alpha, exactly 3 chars, unique. Uppercased by the model mutator. |
| `name` | string | yes | |
| `symbol` | string | no | |
| `decimal` | string | no | |
| `group_separator` | string | no | |
| `decimal_separator` | string | no | |
| `currency_position` | enum | no | `left`, `right`, `left_with_space`, `right_with_space`. |

Fires `core.currency.create.before/after`. Permission: `settings.currencies.create`.
