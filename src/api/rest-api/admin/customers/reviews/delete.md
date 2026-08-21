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

See the [Customer Reviews overview](/api/rest-api/admin/customers/reviews/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | DELETE |

Permission: `customers.reviews.delete`.
