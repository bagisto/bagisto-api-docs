---
outline: false
examples:
  - id: admin-customer-review-mass-update-status-gql
    title: Mass Update Review Status
    query: |
      mutation MassUpdate($input: createAdminCustomerReviewMassUpdateStatusInput!) {
        createAdminCustomerReviewMassUpdateStatus(input: $input) {
          adminCustomerReviewMassUpdateStatus {
            updated
            value
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [9, 10],
          "value": "approved"
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerReviewMassUpdateStatus": {
            "adminCustomerReviewMassUpdateStatus": {
              "updated": [9, 10],
              "value": "approved",
              "message": "Statuses updated."
            }
          }
        }
      }
---

# Mass Update Review Status (GraphQL)

Sets the moderation status on the supplied reviews in one call. `value` is a string — `pending`, `approved` or `disapproved`.

Permission: `customers.reviews.edit`.

See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
