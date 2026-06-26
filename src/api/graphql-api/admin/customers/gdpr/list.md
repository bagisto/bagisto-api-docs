---
outline: false
examples:
  - id: admin-customer-gdpr-list-gql
    title: List GDPR Requests
    description: Cursor pagination over the GDPR data-request queue. Each request has a type (update or delete) and a moderation status.
    query: |
      query AdminGdpr($first: Int, $after: String, $status: String) {
        adminCustomerGdprRequests(first: $first, after: $after, status: $status) {
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
  - id: admin-customer-gdpr-list-filtered
    title: Filtered + Sorted
    description: Delete requests for a given email created in a date range, sorted by creation date descending. Filter args, sorting and pagination all combine in one query (multiple filters narrow the result — logical AND).
    query: |
      query AdminGdpr(
        $first: Int
        $status: String
        $type: String
        $email: String
        $created_at_from: String
        $created_at_to: String
        $sort: String
        $order: String
      ) {
        adminCustomerGdprRequests(
          first: $first
          status: $status
          type: $type
          email: $email
          created_at_from: $created_at_from
          created_at_to: $created_at_to
          sort: $sort
          order: $order
        ) {
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
        "status": "pending",
        "type": "delete",
        "email": "jane@example.com",
        "created_at_from": "2026-06-01",
        "created_at_to": "2026-06-30",
        "sort": "created_at",
        "order": "desc"
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

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**.

| Argument | Type | Match |
|----------|------|-------|
| `status` | `String` | Exact status (e.g. `pending`, `processing`, `declined`, `approved`, `revoked`). |
| `type` | `String` | Exact type (`update` or `delete`). |
| `customer_id` | `Int` | Exact customer id. |
| `email` | `String` | Partial email. |
| `customer_name` | `String` | Partial customer name. |
| `created_at_from` | `String` | Requested on ≥ (e.g. `"2026-06-01"`). |
| `created_at_to` | `String` | Requested on ≤. |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `status`, `type`, `created_at` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

::: tip
See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
