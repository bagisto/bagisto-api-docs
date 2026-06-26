---
outline: false
examples:
  - id: admin-customer-create-gql
    title: Create Customer
    description: createAdminCustomer mutation. sendPassword defaults to true and emails the new customer their credentials.
    query: |
      mutation CreateAdminCustomer($input: createAdminCustomerInput!) {
        createAdminCustomer(input: $input) {
          adminCustomer {
            id
            _id
            firstName
            lastName
            email
            phone
            gender
            status
            dateOfBirth
            channelId
            createdAt
            updatedAt
            group {
              id
              code
              name
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "jane@example.com",
          "phone": "+1-202-555-0148",
          "gender": "Female",
          "dateOfBirth": "1990-01-01",
          "customerGroupId": 2,
          "status": 1,
          "sendPassword": true
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomer": {
            "adminCustomer": {
              "id": "/api/admin/customers/14",
              "_id": 14,
              "firstName": "Jane",
              "lastName": "Doe",
              "email": "jane@example.com",
              "phone": "+1-202-555-0148",
              "gender": "Female",
              "status": 1,
              "dateOfBirth": "1990-01-01",
              "channelId": 1,
              "createdAt": "2026-06-24 10:15:00",
              "updatedAt": "2026-06-24 10:15:00",
              "group": {
                "id": 2,
                "code": "wholesale",
                "name": "Wholesale"
              }
            }
          }
        }
      }
---

# Create Customer (GraphQL)

Creates a new customer. When `sendPassword` is `true` (the default) a random password is generated and the credentials are emailed to the customer; when `false`, an explicit `password` is required.

Permission: `customers.customers.create`. The response carries the new customer's scalars and the nested `group` object.

::: tip
See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
