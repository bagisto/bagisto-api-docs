---
outline: false
examples:
  - id: admin-customer-mass-delete-gql
    title: Mass Delete Customers
    query: |
      mutation MassDelete($input: createAdminCustomerMassDeleteInput!) {
        createAdminCustomerMassDelete(input: $input) { adminCustomerMassDelete { deleted skipped message } }
      }
    variables: |
      { "input": { "indices": [12, 13, 14] } }
    response: |
      { "data": { "createAdminCustomerMassDelete": { "adminCustomerMassDelete": { "deleted": [12, 14], "skipped": [{ "id": 13, "reason": "Customer has active orders" }], "message": "Customers processed." } } } }
---

# Mass Delete Customers (GraphQL)

Per-id active-orders guard skips with a reason. Permission: `customers.customers.delete`.
