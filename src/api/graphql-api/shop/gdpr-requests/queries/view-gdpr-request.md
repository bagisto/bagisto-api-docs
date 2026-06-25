---
outline: false
examples:
  - id: view-gdpr-request
    title: View a GDPR Request
    description: Retrieve a single GDPR data request owned by the authenticated customer.
    query: |
      query GdprRequest($id: ID!) {
        gdprRequest(id: $id) {
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
    variables: |
      {
        "id": "/api/shop/gdpr-requests/12"
      }
    response: |
      {
        "data": {
          "gdprRequest": {
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
      }
    commonErrors:
      - error: GDPR disabled
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before calling this query
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: The request does not exist or is not owned by the authenticated customer
        solution: Only request IDs belonging to the logged-in customer can be viewed
---

# View GDPR Request

## About

The `gdprRequest` query returns a single GDPR data request **owned by the authenticated customer**. If the request does not exist or belongs to a different customer, the query returns a not-found error — a customer can only view their own requests.

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## GDPR must be enabled

If GDPR data requests are disabled in the store's admin configuration, the query fails with the message **"GDPR data requests are disabled. Please enable GDPR from the admin configuration."** in `errors[]`. The feature has been turned off on the admin side.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The request IRI, e.g. `/api/shop/gdpr-requests/12`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric request ID. |
| `type` | `String!` | Request type: `delete` or `update`. |
| `status` | `String!` | Request status: `pending`, `processing`, `declined`, `approved`, `revoked`. |
| `message` | `String` | The customer's message describing the request. |
| `email` | `String!` | Email address tied to the request. |
| `revokedAt` | `DateTime` | Timestamp when the request was revoked, or `null`. |
| `createdAt` | `DateTime!` | Request creation timestamp. |
| `updatedAt` | `DateTime!` | Request last update timestamp. |
| `customer` | `Customer!` | The customer who owns the request. |
| `customer._id` | `Int!` | Numeric customer ID of the owner. |

## Related Resources

- [List GDPR Requests](/api/graphql-api/shop/gdpr-requests/queries/list-gdpr-requests)
- [Revoke a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/revoke-gdpr-request)
- [GDPR Requests Overview](/api/graphql-api/shop/gdpr-requests/)
