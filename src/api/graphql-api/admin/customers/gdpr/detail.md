---
outline: false
examples:
  - id: admin-customer-gdpr-detail-gql
    title: GDPR Request Detail
    query: |
      query AdminGdprRequest($id: ID!) {
        adminCustomerGdprRequest(id: $id) {
          id
          _id
          customerId
          customerName
          email
          type
          status
          message
          revokedAt
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/customers/gdpr-requests/9"
      }
    response: |
      {
        "data": {
          "adminCustomerGdprRequest": {
            "id": "/api/admin/customers/gdpr-requests/9",
            "_id": 9,
            "customerId": 14,
            "customerName": "Jane Doe",
            "email": "jane@example.com",
            "type": "delete",
            "status": "pending",
            "message": "Please remove my account.",
            "revokedAt": null,
            "createdAt": "2026-06-10 09:00:00",
            "updatedAt": "2026-06-10 09:00:00"
          }
        }
      }
---

# GDPR Request Detail (GraphQL)

Returns a single GDPR request by IRI, with the requesting customer's name and email resolved inline.

The `id` argument is the request IRI (`/api/admin/customers/gdpr-requests/{id}`).

See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
