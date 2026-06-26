---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-mass-update-status
    title: Mass Update Review Status
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/reviews/mass-update-status" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [9, 10], "value": "approved" }'
    response: |
      { "updated": [9, 10], "value": "approved", "message": "Statuses updated." }
---

# Mass Update Review Status

::: tip Overview
See the [Customer Reviews overview](/api/rest-api/admin/customers/reviews/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/mass-update-status` | POST |

Body: `{ "indices": int[], "value": "pending"|"approved"|"disapproved" }`. `value` is a **string** (unlike Customers where it is `0|1`). Invalid `value` → 422. Permission: `customers.reviews.edit`.
