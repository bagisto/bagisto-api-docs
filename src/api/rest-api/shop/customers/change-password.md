---
outline: false
examples:
  - id: change-password
    title: Change Password
    description: A logged-in customer changes their password by supplying the current password plus a new password and its confirmation.
    request: |
      PUT /api/shop/customer-profile-updates/1192
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx
      Authorization: Bearer 3628|zGSvw5t...

      {
        "currentPassword": "OldPass123!",
        "password": "NewPass456!",
        "confirmPassword": "NewPass456!"
      }
    response: |
      {
        "id": "1192",
        "_id": "1192",
        "firstName": "Pw",
        "lastName": "Tester",
        "email": "pw.change@example.com",
        "status": "1",
        "subscribedToNewsLetter": false,
        "isVerified": "false",
        "isSuspended": "false",
        "success": true,
        "message": "Customer profile updated successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid customer token
        solution: Log the customer in and send their Bearer token.
      - error: 400 Bad Request
        cause: currentPassword is missing or does not match the account's current password
        solution: Send the customer's correct current password.
      - error: 422 Unprocessable Entity
        cause: password and confirmPassword do not match
        solution: Make the new password and its confirmation identical.

---

# Change Password

A **logged-in** customer changes their own password by sending their **current** password together with a new password and its confirmation. This is part of the customer profile-update endpoint.

::: tip Forgot the password instead?
This endpoint is for a customer who knows their current password. If the password was **forgotten**, use [Forgot Password](/api/rest-api/shop/customers/forgot-password) (`POST /api/shop/forgot-passwords`) — that emails a reset link the customer completes on the web. The storefront API has no token-based reset endpoint.
:::

## Endpoint

```
PUT /api/shop/customer-profile-updates/{id}
```

`{id}` is the authenticated customer's ID.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | `Bearer <token>` — the customer's token from [Customer Login](/api/rest-api/shop/customers/customer-login) |

## Request Body

```json
{
  "currentPassword": "OldPass123!",
  "password": "NewPass456!",
  "confirmPassword": "NewPass456!"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currentPassword` | string | Yes | The customer's existing password (verified before the change) |
| `password` | string | Yes | The new password |
| `confirmPassword` | string | Yes | Must match `password` |

This is the same endpoint used to update profile fields (name, email, …) — to change the password, send the three password fields above. Sending profile fields without the password fields updates the profile without touching the password.

## Response (200 OK)

The endpoint returns the updated customer profile.

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | string | Customer ID |
| `firstName` / `lastName` / `email` | string | Profile fields |
| `success` | boolean | Whether the update succeeded |
| `message` | string | Human-readable result |

After the change, the old password stops working and the customer logs in with the new one (existing tokens remain valid until they expire).

## Related Resources

- [Customer Login](/api/rest-api/shop/customers/customer-login)
- [Update Customer Profile](/api/rest-api/shop/customers/update-customer-profile)
- [Forgot Password](/api/rest-api/shop/customers/forgot-password)
