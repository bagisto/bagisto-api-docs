---
outline: false
apiType: rest
examples:
  - id: admin-customer-reviews-list
    title: List Customer Reviews (Moderation)
    description: Reviews are written from the storefront. The admin endpoints are moderation-only — list / detail / status-update / delete.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/reviews?status=pending&per_page=10" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "data": [
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
            "images": null,
            "createdAt": "2026-05-25 09:00:00"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 10, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# List Customer Reviews

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews` | GET |

## Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page`, `per_page` | integer | Pagination. |
| `status` | string | `pending`, `approved`, `disapproved`. |
| `rating` | integer | Exact rating (1–5). |
| `product_id` | integer | Filter by product. |
| `customer_id` | integer | Filter by customer (nullable — guest reviews allowed). |
| `created_at_from` / `_to` | datetime | Range. |
| `sort` | string | `id` (default desc), `rating`, `created_at`. |
| `order` | string | `asc`, `desc`. |

`images` is detail-only — null on listing.
