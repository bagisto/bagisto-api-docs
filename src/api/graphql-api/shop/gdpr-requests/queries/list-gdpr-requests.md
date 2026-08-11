---
outline: false
examples:
  - id: list-gdpr-requests
    title: List Own GDPR Requests
    description: Retrieve a paginated list of the authenticated customer's own GDPR data requests, newest first.
    query: |
      query GdprRequests(
        $sort: String
        $order: String
      ) {
        gdprRequests(
          first: 10
          after: null
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              _id
              type
              status
              message
              email
              revokedAt
              createdAt
              updatedAt
              customer {
                _id
              }
            }
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "gdprRequests": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 12,
                  "type": "delete",
                  "status": "pending",
                  "message": "Please delete my account data.",
                  "email": "jane@example.com",
                  "revokedAt": null,
                  "createdAt": "2026-06-25T10:30:00+00:00",
                  "updatedAt": "2026-06-25T10:30:00+00:00",
                  "customer": {
                    "_id": 7
                  }
                }
              }
            ],
            "pageInfo": {
              "startCursor": "MQ==",
              "endCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: GDPR disabled
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before calling this query
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# List GDPR Requests

## About

The `gdprRequests` query returns a paginated list of the authenticated customer's **own** GDPR data requests. Requests are always scoped to the logged-in customer — you can never see another customer's requests. Results are ordered newest first by default.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## GDPR must be enabled

If GDPR data requests are disabled in the store's admin configuration, the query fails with the message **"GDPR data requests are disabled. Please enable GDPR from the admin configuration."** in `errors[]`. The feature has been turned off on the admin side.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | `Int` | ❌ No | Number of items to return (forward pagination). Default: `30` |
| `after` | `String` | ❌ No | Cursor for forward pagination. Use `endCursor` from a previous response. |
| `last` | `Int` | ❌ No | Number of items for backward pagination. Default: `30` |
| `before` | `String` | ❌ No | Cursor for backward pagination. Use `startCursor` from a previous response. |
| `sort` | `String` | ❌ No | Sort column: `id` or `created_at`. Default `id`. |
| `order` | `String` | ❌ No | Sort direction: `asc` or `desc`. Default `desc`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[GdprRequestEdge]` | Array of request edges with cursor and node. |
| `edges.cursor` | `String!` | Cursor for this edge, used in pagination. |
| `edges.node` | `GdprRequest` | The GDPR request object. |
| `edges.node._id` | `Int!` | Numeric request ID. |
| `edges.node.type` | `String!` | Request type: `delete` or `update`. |
| `edges.node.status` | `String!` | Request status: `pending`, `processing`, `declined`, `approved`, `revoked`. |
| `edges.node.message` | `String!` | The customer's message describing the request. |
| `edges.node.email` | `String!` | Email address tied to the request. |
| `edges.node.revokedAt` | `String` | Timestamp when the request was revoked, or `null`. |
| `edges.node.createdAt` | `String` | Request creation timestamp. |
| `edges.node.updatedAt` | `String` | Request last update timestamp. |
| `edges.node.successMessage` | `String` | Confirmation text. Populated only on create, revoke, and delete results — `null` when listing. |
| `edges.node.customer` | `Customer` | The customer who owns the request. |
| `edges.node.customer._id` | `Int!` | Numeric customer ID of the owner. |
| `pageInfo` | `GdprRequestPageInfo!` | Pagination metadata. |
| `pageInfo.startCursor` | `String` | Cursor for the first item in the page. |
| `pageInfo.endCursor` | `String` | Cursor for the last item in the page. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `totalCount` | `Int!` | Total number of the customer's requests. |

## Related Resources

- [View GDPR Request](/api/graphql-api/shop/gdpr-requests/queries/view-gdpr-request)
- [Raise a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/create-gdpr-request)
- [GDPR Requests Overview](/api/graphql-api/shop/gdpr-requests/)
