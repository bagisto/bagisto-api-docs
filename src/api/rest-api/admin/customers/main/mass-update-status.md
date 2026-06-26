---
outline: false
apiType: rest
examples:
  - id: admin-customer-mass-update-status
    title: Mass Update Customer Status
    description: Sets `status` on every supplied customer. `value` must be `0` or `1`.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/mass-update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [12, 13, 14], "value": 0 }'
    response: |
      { "updated": [12, 13, 14], "value": 0, "message": "Status updated." }
---

# Mass Update Customer Status

::: tip Overview
See the [Customers menu overview](/api/rest-api/admin/customers/main/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/mass-update-status` | POST |

Body: `{ "indices": int[], "value": 0|1 }`. Invalid `value` → 400. Permission: `customers.customers.edit`.
