---
outline: false
examples:
  - id: admin-customer-create-gql
    title: Create Customer
    description: createAdminCustomer mutation. `send_password` defaults to true and triggers a credentials email.
    query: |
      mutation CreateAdminCustomer($input: createAdminCustomerInput!) {
        createAdminCustomer(input: $input) {
          adminCustomer { id _id email customerGroupId status }
        }
      }
    variables: |
      {
        "input": {
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "jane@example.com",
          "customerGroupId": 2,
          "status": 1,
          "sendPassword": true
        }
      }
    response: |
      { "data": { "createAdminCustomer": { "adminCustomer": { "id": "/api/admin/customers/14", "_id": 14, "email": "jane@example.com", "customerGroupId": 2, "status": 1 } } } }
---

# Create Customer (GraphQL)

Permission: `customers.customers.create`. Fires `customer.registration.*` + `customer.create.*` events.
