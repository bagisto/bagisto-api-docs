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
            cursor
            node {
              id
              _id
              productId
              sku
              type
              name
              quantity
              price
              formattedPrice
              total
              formattedTotal
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
          "adminCustomerCartItems": {
            "totalCount": 1,
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/19/cart-items/1701",
                  "_id": 1701,
                  "productId": 2358,
                  "sku": "test65",
                  "type": "simple",
                  "name": "Classic Watch Hand",
                  "quantity": 1,
                  "price": 4000,
                  "formattedPrice": "$4,000.00",
                  "total": 4000,
                  "formattedTotal": "$4,000.00",
                  "additional": { "quantity": 1 }
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

# Customer Active Cart Items (GraphQL)

Lists the items in the customer's **own** active storefront cart (`carts.is_active = 1`), top-level items only. The admin Create-Order screen shows this in its sidebar so the admin can pull items the customer already added into the draft order. This is distinct from the admin draft cart.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `customerId` | Int! | yes | The customer whose active cart to read. Returns an empty connection if the customer has no active cart. |

See the [Customers overview](/api/graphql-api/admin/customers/) for how the Create-Order sidebar panels work.
