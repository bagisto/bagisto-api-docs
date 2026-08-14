---
outline: false
examples:
  - id: admin-customer-delete-gql
    title: Delete Customer
    description: The delete response returns a snapshot of the removed customer.
    query: |
      mutation DeleteAdminCustomer($input: deleteAdminCustomerInput!) {
        deleteAdminCustomer(input: $input) {
          adminCustomer {
            id
            _id
            firstName
            lastName
            email
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/14"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminCustomer": {
            "adminCustomer": {
              "id": "/api/admin/customers/14",
              "_id": 14,
              "firstName": "Jane",
              "lastName": "Doe",
              "email": "jane@example.com"
            }
          }
        }
      }
---

# Delete Customer (GraphQL)

Deletes a customer. The mutation returns a snapshot of the record that was removed.

### Active orders guard

The delete is refused (surfaced in `errors[]`) when the customer has any pending or processing orders.

Permission: `customers.customers.delete`.

See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
