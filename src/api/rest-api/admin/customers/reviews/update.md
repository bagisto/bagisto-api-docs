---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-update
    title: Update Review Status
    description: Status-only update. Other fields are silently ignored.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/reviews/9" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "status": "approved" }'
    response: |
      { "id": 9, "status": "approved" }
---

# Update Review Status

::: tip Overview
See the [Customer Reviews overview](/api/rest-api/admin/customers/reviews/) for the full feature flow.
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | PUT |

::: tip Status-only
Only `status` is editable (`pending` / `approved` / `disapproved`). Title / comment / rating / images are owned by the storefront customer. Approving a review still triggers the customer notification email.
:::

Invalid `status` → 422. Permission: `customers.reviews.edit`.
