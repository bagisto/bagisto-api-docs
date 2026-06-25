---
outline: false
examples:
  - id: revoke-gdpr-request
    title: Revoke a GDPR Request
    description: Withdraw a pending or processing GDPR data request owned by the authenticated customer.
    query: |
      mutation RevokeGdprRequest($id: ID!) {
        revokeGdprRequest(
          input: {
            id: $id
          }
        ) {
          gdprRequest {
            _id
            type
            status
            message
            email
            revokedAt
            createdAt
            updatedAt
            successMessage
            customer {
              _id
            }
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
          "revokeGdprRequest": {
            "gdprRequest": {
              "_id": 12,
              "type": "delete",
              "status": "revoked",
              "message": "Please delete my account data.",
              "email": "jane@example.com",
              "revokedAt": "2026-06-25T11:05:00+00:00",
              "createdAt": "2026-06-25T10:30:00+00:00",
              "updatedAt": "2026-06-25T11:05:00+00:00",
              "successMessage": "Your GDPR data request has been revoked successfully.",
              "customer": {
                "_id": 7
              }
            }
          }
        }
      }
    commonErrors:
      - error: GDPR disabled
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before revoking a request
      - error: cannot revoke
        cause: The request is not in a pending or processing state
        solution: Only pending or processing requests can be revoked
      - error: NOT_FOUND
        cause: The request does not exist or is not owned by the authenticated customer
        solution: Only request IDs belonging to the logged-in customer can be revoked
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# Revoke a GDPR Request

## About

The `revokeGdprRequest` mutation withdraws a GDPR data request the customer raised earlier. Revoking sets the request's status to `revoked` and stamps `revokedAt`. A request can only be revoked while it is still `pending` or `processing` — once it has been declined or approved it can no longer be revoked. The result carries a one-time `successMessage`.

## Authentication

This mutation requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## GDPR must be enabled

If GDPR data requests are disabled in the store's admin configuration, the mutation fails with the message **"GDPR data requests are disabled. Please enable GDPR from the admin configuration."** in `errors[]`. The feature has been turned off on the admin side.

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The request IRI, e.g. `/api/shop/gdpr-requests/12`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `gdprRequest._id` | `Int!` | Numeric request ID. |
| `gdprRequest.type` | `String!` | Request type: `delete` or `update`. |
| `gdprRequest.status` | `String!` | Request status — `revoked` after a successful revoke. |
| `gdprRequest.message` | `String` | The message supplied in the request. |
| `gdprRequest.email` | `String!` | Email address tied to the request. |
| `gdprRequest.revokedAt` | `DateTime` | Timestamp when the request was revoked. |
| `gdprRequest.createdAt` | `DateTime!` | Request creation timestamp. |
| `gdprRequest.updatedAt` | `DateTime!` | Request last update timestamp. |
| `gdprRequest.successMessage` | `String` | Confirmation message — present on create / revoke / delete results. |
| `gdprRequest.customer` | `Customer!` | The customer who owns the request. |
| `gdprRequest.customer._id` | `Int!` | Numeric customer ID of the owner. |

## Related Resources

- [Raise a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/create-gdpr-request)
- [Delete a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/delete-gdpr-request)
- [GDPR Requests Overview](/api/graphql-api/shop/gdpr-requests/)
