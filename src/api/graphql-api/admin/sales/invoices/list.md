---
outline: false
examples:
  - id: admin-invoices-list-gql
    title: List Invoices (Datagrid)
    description: Cursor-paginated invoices datagrid listing.
    query: |
      query AdminInvoices($first: Int, $after: String, $state: String) {
        adminInvoices(first: $first, after: $after, state: $state) {
          edges {
            cursor
            node {
              id
              _id
              incrementId
              orderId
              orderIncrementId
              state
              baseGrandTotal
              formattedBaseGrandTotal
              createdAt
            }
          }
          pageInfo { hasNextPage hasPreviousPage endCursor startCursor }
          totalCount
        }
      }
    variables: |
      { "first": 10, "state": "paid" }
    response: |
      {
        "data": {
          "adminInvoices": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/invoices/12",
                  "_id": 12,
                  "incrementId": "12",
                  "orderId": 8,
                  "orderIncrementId": "00000000008",
                  "state": "paid",
                  "baseGrandTotal": 99.99,
                  "formattedBaseGrandTotal": "$99.99",
                  "createdAt": "2026-05-20 12:34:56"
                }
              }
            ],
            "pageInfo": { "hasNextPage": false, "hasPreviousPage": false, "endCursor": "MA==", "startCursor": "MA==" },
            "totalCount": 1
          }
        }
      }
---

# List Invoices (Datagrid)

GraphQL counterpart of `GET /api/admin/invoices`. Cursor pagination.

## Operation

`adminInvoices(first, after, id, order_id, state, base_grand_total_from, base_grand_total_to, created_at_from, created_at_to, date_range, sort, order)` — `QueryCollection`.

See the REST page for the full argument table — every REST query param is also exposed as a GraphQL argument.

## Permission

`sales.invoices.view`
