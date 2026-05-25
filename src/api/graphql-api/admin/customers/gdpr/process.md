---
outline: false
examples:
  - id: admin-customer-gdpr-process-gql
    title: Process GDPR Request
    description: GraphQL input uses `requestId` because API Platform rewrites `id` to `_id` on mutation inputs.
    query: |
      mutation Process($input: createAdminCustomerGdprProcessInput!) {
        createAdminCustomerGdprProcess(input: $input) {
          adminCustomerGdprProcess { requestId customerId type status customerDeleted processedAt message }
        }
      }
    variables: |
      { "input": { "requestId": 1, "message": "Approved on customer request" } }
    response: |
      { "data": { "createAdminCustomerGdprProcess": { "adminCustomerGdprProcess": { "requestId": 1, "customerId": 14, "type": "delete", "status": "approved", "customerDeleted": true, "processedAt": "2026-05-25 10:30:00", "message": "GDPR request approved and processed." } } } }
---

# Process GDPR Request (GraphQL)

::: warning Destructive
For `type=delete`, cascades the customer deletion. Already-approved or revoked requests → errors[].
:::

::: tip GraphQL input quirk
The GraphQL input uses `requestId` (not `id`) — `id` is reserved as the resource IRI by API Platform.
:::

Permission: `customers.gdpr_requests.edit`.
