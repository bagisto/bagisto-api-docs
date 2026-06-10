---
outline: false
apiType: rest
examples:
  - id: admin-customer-recent-items
    title: Get Customer's Recent Order Items
    description: Up to 5 most-recent distinct items the customer has ordered. Right-sidebar panel on the Create-Order screen.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/19/recent-order-items" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 2694, "productId": 2358, "sku": "test65",
            "type": "simple", "name": "Classic Watch Hand",
            "price": 4000, "formattedPrice": "$4,000.00",
            "productImage": "http://localhost:8000/storage/product/2358/example.webp",
            "additional": { "quantity": 1 }
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Customer Recent Order Items

Up to **5 most-recent distinct products** the customer has ordered — the
right-sidebar "Recent Order Items" panel on the Create-Order screen.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/recent-order-items` | GET |

Mirrors the monolith: distinct `product_id` from `order_items` joined to
`orders`, `parent_id IS NULL`, ordered by `orders.created_at DESC`, limited
to 5. Each row carries the product `type` so the client can render
type-specific UI. Requires an admin Bearer token.
