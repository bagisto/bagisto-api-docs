---
outline: false
apiType: rest
examples:
  - id: admin-customer-wishlist
    title: Get Customer's Wishlist
    description: The customer's wishlist — the right-sidebar "Wishlist Items" panel on the Create-Order screen.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/19/wishlist-items" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 88, "productId": 2358, "sku": "test65",
            "name": "Classic Watch Hand",
            "price": 4000, "formattedPrice": "$4,000.00",
            "productImage": "http://localhost:8000/storage/product/2358/example.webp",
            "additional": null
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Customer Wishlist Items

The customer's full wishlist. Right-sidebar panel on the Create-Order screen.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/wishlist-items` | GET |

Returns the standard `{ data, meta }` envelope. Each row includes the product
thumbnail (`productImage`) for the badge. Requires an admin
Bearer token.
