---
outline: false
examples:
  - id: admin-customer-gdpr-process-gql
    title: Process GDPR Request
    description: The GraphQL input uses requestId because id is reserved as the resource IRI on mutation inputs.
    query: |
      mutation Process($input: createAdminCustomerGdprProcessInput!) {
        createAdminCustomerGdprProcess(input: $input) {
          adminCustomerGdprProcess {
            id
            _id
            requestId
            customerId
            type
            status
            customerDeleted
            processedAt
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "requestId": "9",
          "message": "Approved on customer request."
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerGdprProcess": {
            "adminCustomerGdprProcess": {
              "id": "/api/admin/customers/gdpr-requests/9/process",
              "_id": 9,
              "requestId": 9,
              "customerId": 14,
              "type": "delete",
              "status": "approved",
              "customerDeleted": true,
              "processedAt": "2026-06-24 10:30:00",
              "message": "GDPR request processed successfully."
            }
          }
        }
      }
---

# Process GDPR Request (GraphQL)

Approves and executes a GDPR request. For `type=delete` requests this cascades the customer deletion (`customerDeleted` reports whether it happened); for `type=update` it marks the request approved so the admin can apply the changes manually.

### Destructive

For delete requests this permanently removes the customer. Already-approved or revoked requests are refused (surfaced in `errors[]`).

### GraphQL input quirk

The input uses `requestId` (not `id`) — `id` is reserved as the resource IRI on mutation inputs.

Permission: `customers.gdpr_requests.edit`.

See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
