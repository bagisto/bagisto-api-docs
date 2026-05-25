---
outline: false
apiType: rest
examples:
  - id: admin-customer-mass-delete
    title: Mass Delete Customers
    description: Customers with active orders are skipped with a reason instead of aborting the batch.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/mass-delete" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 13, 14] }'
    response: |
      {
        "deleted": [12, 14],
        "skipped": [{ "id": 13, "reason": "Customer has active orders" }],
        "message": "Customers processed."
      }
---

# Mass Delete Customers

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/mass-delete` | POST |

Body: `{ "indices": int[] }`. Per-id active-orders guard skips with a reason rather than aborting. Permission: `customers.customers.delete`.
