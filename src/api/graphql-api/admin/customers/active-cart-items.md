---
outline: false
examples:
  - id: admin-customer-active-cart
    title: Get Customer's Active Cart Items
    description: Items in the customer's own active storefront cart (carts.is_active = 1).
    query: |
      query adminCustomerCartItems($customerId: Int!) {
        adminCustomerCartItems(customerId: $customerId) {
          totalCount
          edges {
            node { id productId sku type name quantity price formattedPrice total }
          }
        }
      }
    variables: |
      {
          "customerId": 19
      }
    response: |
      {
        "data": {
          "adminCustomerCartItems": {
            "totalCount": 1,
            "edges": [
              {
                "node": {
                  "id": "/api/admin/.../cart-items/1701",
                  "productId": 2358, "sku": "test65",
                  "type": "simple", "name": "Classic Watch Hand",
                  "quantity": 1, "price": 4000, "formattedPrice": "$4,000.00", "total": 4000
                }
              }
            ]
          }
        }
      }
---

# Customer Active Cart Items

Items in the customer's **own** active storefront cart. Distinct from the
admin draft cart. Returns top-level items only. Requires admin Bearer token.
