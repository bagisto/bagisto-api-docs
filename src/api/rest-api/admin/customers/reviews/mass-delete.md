---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-mass-delete
    title: Mass Delete Reviews
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/reviews/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "indices": [9, 10, 11] }'
    response: |
      { "deleted": [9, 10, 11], "skipped": [], "message": "Reviews deleted." }
---

# Mass Delete Reviews

::: tip Overview
See the [Customer Reviews overview](/api/rest-api/admin/customers/reviews/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/mass-delete` | POST |

Empty `indices` → 422. Permission: `customers.reviews.delete`.
