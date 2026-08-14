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
          edges {
            cursor
            node {
              id
              _id
              productId
              sku
              name
              price
              formattedPrice
              productImage
              additional
            }
          }
          pageInfo {
            hasNextPage
            endCursor
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
          "adminCustomerWishlistItems": {
            "totalCount": 1,
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/19/wishlist-items/88",
                  "_id": 88,
                  "productId": 2358,
                  "sku": "test65",
                  "name": "Classic Watch Hand",
                  "price": 4000,
                  "formattedPrice": "$4,000.00",
                  "productImage": "http://localhost:8000/storage/product/2358/example.webp",
                  "additional": null
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            }
          }
        }
      }
---

# Customer Wishlist Items (GraphQL)

Lists the customer's full wishlist. The admin Create-Order screen shows this in its sidebar so the admin can add wishlisted products to the draft order.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `customerId` | Int! | yes | The customer whose wishlist to read. |

See the [Customers overview](/api/graphql-api/admin/customers/) for how the Create-Order sidebar panels work.
