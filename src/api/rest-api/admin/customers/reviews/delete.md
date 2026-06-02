---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-delete
    title: Delete Review
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/customers/reviews/9" \
        -H "Authorization: Bearer <token>"
    response: |
      { "message": "Review deleted." }
---

# Delete Review

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | DELETE |

Fires `customer.review.delete.before/after`. Permission: `customers.reviews.delete`.
