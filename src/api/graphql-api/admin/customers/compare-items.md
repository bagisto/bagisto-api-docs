---
outline: false
examples:
  - id: admin-customer-compare
    title: Get Customer's Compare Items
    description: The customer's compare list for the Create-Order sidebar.
    query: |
      query adminCustomerCompareItems($customerId: Int!) {
        adminCustomerCompareItems(customerId: $customerId) {
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
          "adminCustomerCompareItems": {
            "totalCount": 1,
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/19/compare-items/12",
                  "_id": 12,
                  "productId": 2358,
                  "sku": "test65",
                  "name": "Classic Watch Hand",
                  "price": 4000,
                  "formattedPrice": "$4,000.00",
                  "productImage": "http://localhost:8000/storage/product/2358/example.webp"
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

# Customer Compare Items (GraphQL)

Lists the products the customer has added to their compare list. The admin Create-Order screen shows this in its sidebar so the admin can add compared products to the draft order.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `customerId` | Int! | yes | The customer whose compare list to read. |

::: tip Menu overview
See the [Customers overview](/api/graphql-api/admin/customers/) for how the Create-Order sidebar panels work.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
