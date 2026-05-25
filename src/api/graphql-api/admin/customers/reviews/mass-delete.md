---
outline: false
examples:
  - id: admin-customer-review-mass-delete-gql
    title: Mass Delete Reviews
    query: |
      mutation MassDelete($input: createAdminCustomerReviewMassDeleteInput!) {
        createAdminCustomerReviewMassDelete(input: $input) { adminCustomerReviewMassDelete { deleted skipped message } }
      }
    variables: |
      { "input": { "indices": [9, 10, 11] } }
    response: |
      { "data": { "createAdminCustomerReviewMassDelete": { "adminCustomerReviewMassDelete": { "deleted": [9, 10, 11], "skipped": [], "message": "Reviews deleted." } } } }
---

# Mass Delete Reviews (GraphQL)
