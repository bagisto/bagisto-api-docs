---
outline: false
examples:
  - id: admin-customer-gdpr-update-gql
    title: Update GDPR Request
    description: Status + message only. Use the process mutation for the destructive cascade.
    query: |
      mutation Update($input: updateAdminCustomerGdprRequestInput!) {
        updateAdminCustomerGdprRequest(input: $input) {
          adminCustomerGdprRequest {
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
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/gdpr-requests/9",
          "status": "processing",
          "message": "Reviewing the request."
        }
      }
    response: |
      {
        "data": {
          "updateAdminCustomerGdprRequest": {
            "adminCustomerGdprRequest": {
              "id": "/api/admin/customers/gdpr-requests/9",
              "_id": 9,
              "customerId": 14,
              "customerName": "Jane Doe",
              "email": "jane@example.com",
              "type": "delete",
              "status": "processing",
              "message": "Reviewing the request.",
              "revokedAt": null,
              "createdAt": "2026-06-10 09:00:00",
              "updatedAt": "2026-06-24 10:15:00"
            }
          }
        }
      }
---

# Update GDPR Request (GraphQL)

Updates a request's `status` and optional `message`. Allowed status values are `pending`, `processing`, `declined`, `approved` and `revoked`. Use [`createAdminCustomerGdprProcess`](./process.md) to also perform the destructive cascade for delete requests.

Permission: `customers.gdpr_requests.edit`.

The example uses an illustrative `id`. Replace it with a request that exists in your store — use [`adminCustomerGdprRequests`](./list.md) to discover valid ids.

See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
