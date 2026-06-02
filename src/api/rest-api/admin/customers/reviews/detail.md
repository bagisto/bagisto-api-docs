---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-detail
    title: Customer Review Detail
    description: Eager-loads product + customer + images. Each image has id/path/url.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/reviews/9" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 9,
        "title": "Great product!",
        "comment": "Loved it.",
        "rating": 5,
        "status": "pending",
        "productId": 142,
        "productSku": "SP-001",
        "productName": "Classic Watch",
        "customerId": 14,
        "customerName": "Jane Doe",
        "customerEmail": "jane@example.com",
        "images": [{ "id": 3, "path": "reviews/9/photo.jpg", "url": "https://your-domain.com/storage/reviews/9/photo.jpg" }],
        "createdAt": "2026-05-25 09:00:00"
      }
---

# Customer Review Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | GET |
