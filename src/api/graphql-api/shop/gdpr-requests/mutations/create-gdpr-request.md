---
outline: false
examples:
  - id: create-gdpr-request
    title: Raise a GDPR Request
    description: Raise a new GDPR data request (delete or update) for the authenticated customer.
    query: |
      mutation CreateGdprRequest(
        $type: String!
        $message: String!
      ) {
        createGdprRequest(
          input: {
            type: $type
            message: $message
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
        "type": "delete",
        "message": "Please delete my account data."
      }
    response: |
      {
        "data": {
          "createGdprRequest": {
            "gdprRequest": {
              "_id": 12,
              "type": "delete",
              "status": "pending",
              "message": "Please delete my account data.",
              "email": "jane@example.com",
              "revokedAt": null,
              "createdAt": "2026-06-25T10:30:00+00:00",
              "updatedAt": "2026-06-25T10:30:00+00:00",
              "successMessage": "Your GDPR data request has been raised successfully.",
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
        solution: Re-enable GDPR from the admin configuration before raising a request
      - error: type required
        cause: The type field is missing or not one of delete / update
        solution: Provide a valid type — either "delete" or "update"
      - error: message required
        cause: The message field is missing
        solution: Provide a message describing the request
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# Raise a GDPR Request

## About

The `createGdprRequest` mutation raises a new GDPR data request for the authenticated customer. A new request is created with status `pending` and is tied to the logged-in customer. The result carries a one-time `successMessage` confirming the request was raised.

## Authentication

This mutation requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## GDPR must be enabled

If GDPR data requests are disabled in the store's admin configuration, the mutation fails with the message **"GDPR data requests are disabled. Please enable GDPR from the admin configuration."** in `errors[]`. The feature has been turned off on the admin side.

## Input Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `String` | ✅ Yes | Request type — `delete` (delete account data) or `update` (update personal data). Optional in the schema but rejected when absent, so treat it as required. |
| `message` | `String` | ✅ Yes | A message describing what the customer is requesting. Optional in the schema but rejected when absent. |
| `clientMutationId` | `String` | ❌ No | Arbitrary string echoed back in the payload, for correlating a response with its request. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `gdprRequest._id` | `Int!` | Numeric request ID. |
| `gdprRequest.type` | `String!` | Request type: `delete` or `update`. |
| `gdprRequest.status` | `String!` | Request status — `pending` for a freshly raised request. |
| `gdprRequest.message` | `String!` | The message supplied in the request. |
| `gdprRequest.email` | `String!` | Email address tied to the request. |
| `gdprRequest.revokedAt` | `String` | Timestamp when the request was revoked, or `null`. |
| `gdprRequest.createdAt` | `String` | Request creation timestamp. |
| `gdprRequest.updatedAt` | `String` | Request last update timestamp. |
| `gdprRequest.successMessage` | `String` | Confirmation message — present on create / revoke / delete results. |
| `gdprRequest.customer` | `Customer` | The customer who owns the request. |
| `gdprRequest.customer._id` | `Int!` | Numeric customer ID of the owner. |

## Related Resources

- [List GDPR Requests](/api/graphql-api/shop/gdpr-requests/queries/list-gdpr-requests)
- [Revoke a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/revoke-gdpr-request)
- [Delete a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/delete-gdpr-request)
- [GDPR Requests Overview](/api/graphql-api/shop/gdpr-requests/)
