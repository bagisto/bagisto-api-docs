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
---

# List Customers (Datagrid)

Returns the paginated, filterable customer list that backs the admin Customers datagrid. The customer's group is returned as a nested `group` object (`id` / `code` / `name`). The detail-only counters (`totalOrders`, `totalAddresses`, `totalAmountSpent`) resolve only on the single-customer query and are omitted here.

Filter args: `name`, `email`, `phone`, `customer_group_id`, `status`, `channel_id`, `sort`, `order`, plus cursor `first` / `after`.

::: tip
See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
