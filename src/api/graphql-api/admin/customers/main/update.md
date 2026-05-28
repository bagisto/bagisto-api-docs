---
outline: false
examples:
  - id: admin-customer-update-gql
    title: Update Customer
    query: |
      mutation UpdateAdminCustomer($input: updateAdminCustomerInput!) {
        updateAdminCustomer(input: $input) { adminCustomer { id _id firstName status } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/14", "firstName": "Janet", "status": 0 } }
    response: |
      { "data": { "updateAdminCustomer": { "adminCustomer": { "id": "/api/admin/customers/14", "_id": 14, "firstName": "Janet", "status": 0 } } } }
---

# Update Customer (GraphQL)

Partial update. Permission: `customers.customers.edit`. Fires `customer.update.*` events.
