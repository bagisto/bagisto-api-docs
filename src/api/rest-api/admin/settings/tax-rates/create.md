---
outline: false
apiType: rest
examples:
  - id: rest
    title: Create Tax Rate (specific ZIP, is_zip=false)
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/tax-rates" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "identifier": "us-il-7", "tax_rate": 7.25, "country": "US", "state": "IL", "is_zip": false, "zip_code": "62704" }'
    response: |
      { "id": 1, "identifier": "us-il-7", "taxRate": 7.25 }
  - id: rest-zip-range
    title: Create Tax Rate (ZIP range, is_zip=true)
    query: |
      curl -X POST "https://your-domain.com/api/admin/settings/tax-rates" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "identifier": "us-il-zip-range", "tax_rate": 7.25, "country": "US", "state": "IL", "is_zip": true, "zip_from": "60000", "zip_to": "62999" }'
    response: |
      { "id": 2, "identifier": "us-il-zip-range" }
---

# Create Tax Rate

Body fields differ by `is_zip`:
- `is_zip=false` — pass `zip_code`.
- `is_zip=true` — pass `zip_from` + `zip_to`.

`identifier` must be unique. Permission: `settings.taxes.tax_rates.create`.
