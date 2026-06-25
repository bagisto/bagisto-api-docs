---
outline: false
examples:
  - id: admin-customer-gdpr-list-gql
    title: List GDPR Requests
    description: Cursor pagination over the GDPR data-request queue.
    query: |
      query AdminGdpr($first: Int, $status: String) {
        adminCustomerGdprRequests(first: $first, status: $status) {
          edges {
            cursor
            node {
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
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "status": "pending"
      }
    response: |
      {
        "data": {
          "adminCustomerGdprRequests": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
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
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# List GDPR Requests (GraphQL)

Returns the paginated GDPR data-request queue. Each request has a `type` (`update` or `delete`) and a moderation `status`.

Filter args: `status`, `type`, `customer_id`, `email`, `customer_name`, `created_at_from`, `created_at_to`, `sort`, `order`, plus cursor `first` / `after`.

::: tip
See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
