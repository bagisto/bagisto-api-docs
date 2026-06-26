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
          edges {
            cursor
            node {
              id
              _id
              productId
              sku
              type
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
          "adminCustomerRecentOrderItems": {
            "totalCount": 1,
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/19/recent-order-items/2694",
                  "_id": 2694,
                  "productId": 2358,
                  "sku": "test65",
                  "type": "simple",
                  "name": "Classic Watch Hand",
                  "price": 4000,
                  "formattedPrice": "$4,000.00",
                  "productImage": "http://localhost:8000/storage/product/2358/example.webp",
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

# Customer Recent Order Items (GraphQL)

Lists up to **5 most-recent distinct products** the customer has ordered. The admin Create-Order screen shows this in its sidebar so the admin can re-add previously ordered products. Each row carries `type` so the client can render type-specific UI.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `customerId` | Int! | yes | The customer whose recent items to read. |

::: tip Menu overview
See the [Customers overview](/api/graphql-api/admin/customers/) for how the Create-Order sidebar panels work.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
