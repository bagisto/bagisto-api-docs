---
outline: false
examples:
  - id: admin-customer-mass-update-status-gql
    title: Mass Update Customer Status
    query: |
      mutation MassUpdate($input: createAdminCustomerMassUpdateStatusInput!) {
        createAdminCustomerMassUpdateStatus(input: $input) { adminCustomerMassUpdateStatus { updated value message } }
      }
    variables: |
      { "input": { "indices": [12, 13], "value": 0 } }
    response: |
      { "data": { "createAdminCustomerMassUpdateStatus": { "adminCustomerMassUpdateStatus": { "updated": [12, 13], "value": 0, "message": "Status updated." } } } }
---

# Mass Update Customer Status (GraphQL)

Permission: `customers.customers.edit`.
