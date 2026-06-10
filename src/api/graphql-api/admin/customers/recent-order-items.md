---
outline: false
examples:
  - id: admin-customer-recent-items
    title: Get Customer's Recent Order Items
    description: Up to 5 most-recent distinct items the customer has ordered.
    query: |
      query adminCustomerRecentOrderItems($customerId: Int!) {
        adminCustomerRecentOrderItems(customerId: $customerId) {
          totalCount
          edges { node { id productId sku type name price formattedPrice productImage } }
        }
      }
    variables: |
      {
          "customerId": 19
      }
    response: |
      {
        "data": {
          "adminCustomerRecentOrderItems": {
            "totalCount": 1,
            "edges": [
              {
                "node": {
                  "id": "/api/admin/.../recent-order-items/2694",
                  "productId": 2358, "sku": "test65",
                  "type": "simple", "name": "Classic Watch Hand",
                  "price": 4000, "formattedPrice": "$4,000.00",
                  "productImage": "http://localhost:8000/storage/product/2358/example.webp"
                }
              }
            ]
          }
        }
      }
---

# Customer Recent Order Items

Up to **5 most-recent distinct products** the customer has ordered. Each row
carries `type` so the client can render type-specific UI. Requires admin
Bearer token.
