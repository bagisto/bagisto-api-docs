---
outline: false
examples:
  - id: admin-customers-list-gql
    title: List Customers (Datagrid)
    description: Cursor pagination. The customer group is a nested object. Detail-only counters are null on the listing.
    query: |
      query AdminCustomers($first: Int, $after: String, $customer_group_id: Int) {
        adminCustomers(first: $first, after: $after, customer_group_id: $customer_group_id) {
          edges {
            cursor
            node {
              id
              _id
              firstName
              lastName
              email
              phone
              gender
              status
              dateOfBirth
              channelId
              createdAt
              updatedAt
              group {
                id
                code
                name
              }
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
        "customer_group_id": 2
      }
    response: |
      {
        "data": {
          "adminCustomers": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/14",
                  "_id": 14,
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "email": "jane@example.com",
                  "phone": "+1-202-555-0148",
                  "gender": "Female",
                  "status": 1,
                  "dateOfBirth": "1990-01-01",
                  "channelId": 1,
                  "createdAt": "2026-05-20 12:00:00",
                  "updatedAt": "2026-06-20 14:30:00",
                  "group": {
                    "id": 2,
                    "code": "wholesale",
                    "name": "Wholesale"
                  }
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
  - id: admin-customers-list-filtered
    title: Filtered + Sorted
    description: Active customers in a group, born in a date range, sorted by email ascending. Filter args, sorting and pagination all combine in one query (multiple filters narrow the result — logical AND).
    query: |
      query AdminCustomers(
        $first: Int
        $customer_group_id: Int
        $status: Int
        $date_of_birth_from: String
        $date_of_birth_to: String
        $created_at_from: String
        $created_at_to: String
        $sort: String
        $order: String
      ) {
        adminCustomers(
          first: $first
          customer_group_id: $customer_group_id
          status: $status
          date_of_birth_from: $date_of_birth_from
          date_of_birth_to: $date_of_birth_to
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
              firstName
              lastName
              email
              phone
              gender
              status
              dateOfBirth
              channelId
              createdAt
              updatedAt
              group {
                id
                code
                name
              }
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
        "customer_group_id": 2,
        "status": 1,
        "date_of_birth_from": "1980-01-01",
        "date_of_birth_to": "1999-12-31",
        "sort": "email",
        "order": "asc"
      }
    response: |
      {
        "data": {
          "adminCustomers": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/customers/14",
                  "_id": 14,
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "email": "jane@example.com",
                  "phone": "+1-202-555-0148",
                  "gender": "Female",
                  "status": 1,
                  "dateOfBirth": "1990-01-01",
                  "channelId": 1,
                  "createdAt": "2026-05-20 12:00:00",
                  "updatedAt": "2026-06-20 14:30:00",
                  "group": {
                    "id": 2,
                    "code": "wholesale",
                    "name": "Wholesale"
                  }
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

# List Customers (Datagrid)

Returns the paginated, filterable customer list that backs the admin Customers datagrid. The customer's group is returned as a nested `group` object (`id` / `code` / `name`). The detail-only counters (`totalOrders`, `totalAddresses`, `totalAmountSpent`) resolve only on the single-customer query and are omitted here.

## Arguments

All arguments are optional and combine in a single query — filter, sort and paginate together.

### Pagination

| Argument | Description |
|----------|-------------|
| `first` | Number of records to return. |
| `after` | Cursor to fetch the page after (from `pageInfo.endCursor`). |

### Filters

Each filter narrows the result; supplying more than one combines with logical **AND**. They mirror the admin Customers datagrid filters.

| Argument | Type | Match |
|----------|------|-------|
| `name` | `String` | Partial first/last name. |
| `email` | `String` | Partial email. |
| `phone` | `String` | Partial phone. |
| `customer_group_id` | `Int` | Exact group id. |
| `status` | `Int` | `0` or `1`. |
| `channel_id` | `Int` | Exact channel id. |
| `date_of_birth_from` | `String` | Date of birth ≥ (e.g. `"1980-01-01"`). |
| `date_of_birth_to` | `String` | Date of birth ≤. |
| `created_at_from` | `String` | Registered on ≥. |
| `created_at_to` | `String` | Registered on ≤. |

### Sorting

| Argument | Type | Values |
|----------|------|--------|
| `sort` | `String` | `id` (default), `email`, `first_name` |
| `order` | `String` | `asc`, `desc` (default `desc`) |

::: tip
See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
