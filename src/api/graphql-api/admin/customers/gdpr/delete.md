---
outline: false
examples:
  - id: admin-customer-gdpr-delete-gql
    title: Delete GDPR Request
    description: The delete response returns a snapshot of the removed request.
    query: |
      mutation Delete($input: deleteAdminCustomerGdprRequestInput!) {
        deleteAdminCustomerGdprRequest(input: $input) {
          adminCustomerGdprRequest {
            id
            _id
            type
            status
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/customers/gdpr-requests/9"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminCustomerGdprRequest": {
            "adminCustomerGdprRequest": {
              "id": "/api/admin/customers/gdpr-requests/9",
              "_id": 9,
              "type": "delete",
              "status": "pending"
            }
          }
        }
      }
---

# Delete GDPR Request (GraphQL)

Deletes a GDPR request. The mutation returns a snapshot of the record that was removed.

Permission: `customers.gdpr_requests.delete`.

The example uses an illustrative `id`. Replace it with a request that exists in your store — use [`adminCustomerGdprRequests`](./list.md) to discover valid ids.

See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
