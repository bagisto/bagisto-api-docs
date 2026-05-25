---
outline: false
apiType: rest
examples:
  - id: admin-customer-note-create
    title: Add Note to Customer
    description: Append-only — every POST inserts a new row into `customer_notes` (the legacy `customers.notes` text column was dropped in 2023).
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/notes" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "note": "Followed up about return RMA-1023", "customer_notified": false }'
    response: |
      { "id": 5, "customerId": 14, "note": "Followed up about return RMA-1023", "customerNotified": false, "createdAt": "2026-05-25 10:00:00" }
---

# Add Customer Note

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/notes` | POST |

## Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `note` | string | yes | Non-empty. Empty → 422. |
| `customer_notified` | boolean | no | When true, fires the customer notification email listener. |

::: tip Append-only
Notes are append-only. There is no update/delete endpoint — every note is a separate row for audit.
:::

Permission: `customers.customers.edit`.
