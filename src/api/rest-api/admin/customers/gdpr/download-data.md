---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-download-data
    title: Download GDPR Data Export
    description: Ad-hoc data dump (not bound to a GDPR request). Returns every table referencing the customer's id.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/gdpr-download-data" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "customerId": 14,
        "customerEmail": "jane@example.com",
        "generatedAt": "2026-05-25 10:00:00",
        "data": {
          "customer": { "id": 14, "first_name": "Jane", "last_name": "Doe", "email": "jane@example.com" },
          "addresses": [ /* ... */ ],
          "orders": [ /* with items, addresses, payment */ ],
          "reviews": [ /* ... */ ],
          "wishlist": [ /* ... */ ],
          "notes": [ /* ... */ ]
        }
      }
---

# Download GDPR Data Export

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/gdpr-download-data` | POST |

::: tip Wider than the storefront GDPR PDF
The storefront `pdfView` only exports orders + addresses. The admin API extends this to addresses + orders + reviews + wishlist + notes — full GDPR-style export. `password` and `remember_token` are stripped from the `customer` block.
:::

Each sub-query is wrapped in try/catch so a missing optional table (e.g. wishlist on a non-storefront install) returns `[]` rather than 500ing.

Permission: `customers.gdpr_requests.view`.
