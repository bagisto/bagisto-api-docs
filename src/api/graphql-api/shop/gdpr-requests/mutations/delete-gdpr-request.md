---
outline: false
examples:
  - id: delete-gdpr-request
    title: Delete a GDPR Request
    description: Remove a GDPR data request record owned by the authenticated customer.
    query: |
      mutation DeleteGdprRequest($id: ID!) {
        deleteGdprRequest(
          input: {
            id: $id
          }
        ) {
          gdprRequest {
            _id
            successMessage
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
          "deleteGdprRequest": {
            "gdprRequest": {
              "_id": 12,
              "successMessage": "Your GDPR data request has been deleted successfully."
            }
          }
        }
      }
    commonErrors:
      - error: GDPR disabled
        cause: GDPR data requests are turned off in the store's admin configuration
        solution: Re-enable GDPR from the admin configuration before deleting a request
      - error: NOT_FOUND
        cause: The request does not exist or is not owned by the authenticated customer
        solution: Only request IDs belonging to the logged-in customer can be deleted
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# Delete a GDPR Request

## About

The `deleteGdprRequest` mutation removes a GDPR data request record owned by the authenticated customer. The mutation returns a snapshot of the deleted request — its `_id` and a one-time `successMessage` — so the client can confirm the removal. A customer can only delete their own requests.

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
| `gdprRequest._id` | `Int!` | Numeric ID of the deleted request. |
| `gdprRequest.successMessage` | `String` | Confirmation message — present on create / revoke / delete results. |

## Related Resources

- [Raise a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/create-gdpr-request)
- [Revoke a GDPR Request](/api/graphql-api/shop/gdpr-requests/mutations/revoke-gdpr-request)
- [GDPR Requests Overview](/api/graphql-api/shop/gdpr-requests/)
