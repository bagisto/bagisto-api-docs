---
outline: false
examples:
  - id: admin-customer-review-mass-update-status-gql
    title: Mass Update Review Status
    query: |
      mutation MassUpdate($input: createAdminCustomerReviewMassUpdateStatusInput!) {
        createAdminCustomerReviewMassUpdateStatus(input: $input) { adminCustomerReviewMassUpdateStatus { updated value message } }
      }
    variables: |
      { "input": { "indices": [9, 10], "value": "approved" } }
    response: |
      { "data": { "createAdminCustomerReviewMassUpdateStatus": { "adminCustomerReviewMassUpdateStatus": { "updated": [9, 10], "value": "approved", "message": "Statuses updated." } } } }
---

# Mass Update Review Status (GraphQL)

`value` is a string (`pending|approved|disapproved`). Permission: `customers.reviews.edit`.
