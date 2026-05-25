---
outline: false
examples:
  - id: admin-customer-gdpr-delete-gql
    title: Delete GDPR Request
    query: |
      mutation Delete($input: deleteAdminCustomerGdprRequestInput!) {
        deleteAdminCustomerGdprRequest(input: $input) { adminCustomerGdprRequest { id } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/gdpr-requests/1" } }
    response: |
      { "data": { "deleteAdminCustomerGdprRequest": { "adminCustomerGdprRequest": null } } }
---

# Delete GDPR Request (GraphQL)

Permission: `customers.gdpr_requests.delete`.
