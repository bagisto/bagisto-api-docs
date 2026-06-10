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

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | PUT |

::: tip Status-only
Only `status` is editable (`pending` / `approved` / `disapproved`). Title / comment / rating / images are owned by the storefront customer. Fires `customer.review.update.before/after` so the core "review approved" email listener still fires.
:::

Invalid `status` → 422. Permission: `customers.reviews.edit`.
