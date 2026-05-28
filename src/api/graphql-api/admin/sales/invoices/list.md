---
outline: false
examples:
  - id: admin-invoices-list-gql
    title: List Invoices (Datagrid)
    description: Cursor-paginated invoices datagrid listing.
    query: |
      query AdminInvoices($first: Int, $after: String) {
        adminInvoices(first: $first, after: $after) {
          edges {
            cursor
            node {
              id
              _id
            }
          }
          pageInfo { hasNextPage endCursor }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      { "data": { "adminInvoices": { "edges": [ { "cursor": "MA==", "node": { "id": "/api/admin/invoices/1", "_id": 1 } } ], "pageInfo": { "hasNextPage": false, "endCursor": "MA==" }, "totalCount": 1 } } }

---

# List Invoices (Datagrid)

GraphQL counterpart of `GET /api/admin/invoices`. Cursor pagination.

## Operation

`adminInvoices(first, after, id, order_id, state, base_grand_total_from, base_grand_total_to, created_at_from, created_at_to, date_range, sort, order)` — `QueryCollection`.

See the REST page for the full argument table — every REST query param is also exposed as a GraphQL argument.

## Permission

`sales.invoices.view`
