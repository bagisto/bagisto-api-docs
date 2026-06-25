---
outline: false
examples:
  - id: admin-customer-addresses
    title: Get Customer Addresses
    description: All saved addresses for a customer — billing/shipping picker on the Create-Order screen.
    query: |
      query adminCustomerAddresses($customerId: Int!) {
        adminCustomerAddresses(customerId: $customerId) {
          totalCount
          edges {
            cursor
            node {
              id
              _id
              customerId
              addressType
              firstName
              lastName
              companyName
              address
              city
              state
              country
              postcode
              email
              phone
              vatId
              defaultAddress
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
        "customerId": 122
      }
    response: |
      {
        "data": {
          "adminCustomerAddresses": {
            "totalCount": 1,
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/122/addresses/2638",
                  "_id": 2638,
                  "customerId": 122,
                  "addressType": "customer",
                  "firstName": "John",
                  "lastName": "Doe",
                  "companyName": "Webkul Softwares",
                  "address": "Grand Trunk road, Sector-62",
                  "city": "Noida",
                  "state": "UP",
                  "country": "IN",
                  "postcode": "201556",
                  "email": "john@example.com",
                  "phone": "78787887",
                  "vatId": null,
                  "defaultAddress": false
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

# Customer Addresses (GraphQL)

Lists every saved address for a customer. The admin Create-Order screen uses this as the billing / shipping address picker. Returned as a GraphQL cursor connection (the REST counterpart returns a plain array).

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `customerId` | Int! | yes | The customer whose addresses to list. Unknown customer → error. |

::: tip Menu overview
See the [Customer Addresses overview](/api/graphql-api/admin/customers/) for how the address book fits into the customer screen.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
