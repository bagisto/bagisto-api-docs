---
outline: false
examples:
  - id: admin-customer-gdpr-update-gql
    title: Update GDPR Request
    query: |
      mutation Update($input: updateAdminCustomerGdprRequestInput!) {
        updateAdminCustomerGdprRequest(input: $input) { adminCustomerGdprRequest { id _id status } }
      }
    variables: |
      { "input": { "id": "/api/admin/customers/gdpr-requests/1", "status": "processing" } }
    response: |
      { "data": { "updateAdminCustomerGdprRequest": { "adminCustomerGdprRequest": { "id": "/api/admin/customers/gdpr-requests/1", "_id": 1, "status": "processing" } } } }
---

# Update GDPR Request (GraphQL)

Status + message only. Use `createAdminCustomerGdprProcess` for the destructive cascade. Permission: `customers.gdpr_requests.edit`.
