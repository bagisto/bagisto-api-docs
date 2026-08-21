---
outline: false
examples:
  - id: admin-customer-update-gql
    title: Update Customer
    description: Partial update — send only the fields you change.
    query: |
      mutation UpdateAdminCustomer($input: updateAdminCustomerInput!) {
        updateAdminCustomer(input: $input) {
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
          "id": "/api/admin/customers/14",
          "firstName": "Janet",
          "status": 0
        }
      }
    response: |
      {
        "data": {
          "updateAdminCustomer": {
            "adminCustomer": {
              "id": "/api/admin/customers/14",
              "_id": 14,
              "firstName": "Janet",
              "lastName": "Doe",
              "email": "jane@example.com",
              "phone": "+1-202-555-0148",
              "gender": "Female",
              "status": 0,
              "dateOfBirth": "1990-01-01",
              "channelId": 1,
              "createdAt": "2026-05-20 12:00:00",
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

# Update Customer (GraphQL)

Updates a customer. The update is partial — send only the fields you want to change. Pass `password` to re-hash it.

Permission: `customers.customers.edit`. The response carries the updated scalars and the nested `group` object.

See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
