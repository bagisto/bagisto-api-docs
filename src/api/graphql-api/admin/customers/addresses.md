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
            node {
              id firstName lastName companyName
              address city state country postcode
              email phone defaultAddress
            }
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
                "node": {
                  "id": "/api/admin/customers/.../addresses/2638",
                  "firstName": "John", "lastName": "Doe", "companyName": "Webkul Softwares",
                  "address": "Grand Trunk road, Sector-62", "city": "Noida",
                  "state": "UP", "country": "IN", "postcode": "201556",
                  "email": "john@example.com", "phone": "78787887",
                  "defaultAddress": false
                }
              }
            ]
          }
        }
      }
---

# Customer Addresses

All saved addresses for a customer. Returned as a GraphQL cursor connection;
the REST counterpart returns plain arrays. Requires admin Bearer token.
