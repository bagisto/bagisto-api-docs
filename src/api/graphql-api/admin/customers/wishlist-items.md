---
outline: false
examples:
  - id: admin-customer-wishlist
    title: Get Customer's Wishlist
    description: The customer's wishlist for the Create-Order sidebar.
    query: |
      query adminCustomerWishlistItems($customerId: Int!) {
        adminCustomerWishlistItems(customerId: $customerId) {
          totalCount
          edges { node { id productId sku name price formattedPrice productImage } }
        }
      }
    variables: |
      {
          "customerId": 19
      }
    response: |
      {
        "data": {
          "adminCustomerWishlistItems": {
            "totalCount": 1,
            "edges": [
              {
                "node": {
                  "id": "/api/admin/.../wishlist-items/88",
                  "productId": 2358, "sku": "test65",
                  "name": "Classic Watch Hand",
                  "price": 4000, "formattedPrice": "$4,000.00",
                  "productImage": "http://localhost:8000/storage/product/2358/example.webp"
                }
              }
            ]
          }
        }
      }
---

# Customer Wishlist Items

The customer's full wishlist. Requires admin Bearer token.
