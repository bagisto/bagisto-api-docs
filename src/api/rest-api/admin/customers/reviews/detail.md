---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-detail
    title: Customer Review Detail
    description: Returns one review with the reviewed product and the customer as nested objects, plus the attached images as a flat array (each `id` / `path` / `url`).
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
        "name": "Jane Doe",
        "product": {
          "id": 142,
          "name": "Classic Watch",
          "sku": "SP-001"
        },
        "customer": {
          "id": 14,
          "name": "Jane Doe",
          "email": "jane@example.com"
        },
        "images": [
          {
            "id": 3,
            "path": "reviews/9/photo.jpg",
            "url": "https://your-domain.com/storage/reviews/9/photo.jpg"
          }
        ],
        "createdAt": "2026-05-25 09:00:00",
        "updatedAt": "2026-05-25 09:00:00"
      }
---

# Customer Review Detail

Returns one review with the reviewed `product` (`id` / `name` / `sku`) and the `customer` (`id` / `name` / `email`) as nested objects, plus the attached `images` as a flat array (each `id` / `path` / `url`).

See the [Customer Reviews overview](/api/rest-api/admin/customers/reviews/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | GET |

`customer` is `null` for guest reviews. `images` is an empty array when the review has no attachments.
