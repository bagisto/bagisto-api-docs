---
outline: false
examples:
  - id: admin-customer-gdpr-detail-gql
    title: GDPR Request Detail
    query: |
      query AdminGdprRequest($id: ID!) {
        adminCustomerGdprRequest(id: $id) { id _id customerId customerName email type status message revokedAt createdAt }
      }
    variables: |
      { "id": "/api/admin/customers/gdpr-requests/1" }
    response: |
      { "data": { "adminCustomerGdprRequest": { "id": "/api/admin/customers/gdpr-requests/1", "_id": 1, "customerId": 14, "customerName": "Jane Doe", "email": "jane@example.com", "type": "delete", "status": "pending", "message": "Please remove my account", "revokedAt": null, "createdAt": "2026-05-25 08:00:00" } } }
---

# GDPR Request Detail (GraphQL)
