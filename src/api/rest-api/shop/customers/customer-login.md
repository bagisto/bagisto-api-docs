---
outline: false
examples:
  - id: customer-login
    title: Customer Login
    description: Authenticate a customer with email and password to get a Bearer token for subsequent requests.
    request: |
      POST /api/shop/customer/login
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx

      {
        "email": "john@example.com",
        "password": "Password123!"
      }
    response: |
      {
        "id": 1191,
        "_id": 1191,
        "apiToken": "aRfn7cVRSN7qUR6W7vGnlgb40XXa1mko4QNoLbiui1dAAKFcFh3yHY1PtG68OfJdksl0aHgbRKOvdxdl",
        "token": "3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G5c9660e4",
        "success": true,
        "message": "You have logged in successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Invalid email or password
        solution: Verify credentials and try again
      - error: 400 Bad Request
        cause: Missing email or password
        solution: Provide both email and password
      - error: 403 Forbidden
        cause: Account is suspended
        solution: Contact support to reactivate account

---

# Customer Login

Authenticate a customer with email and password and receive a Bearer token to use on subsequent customer-scoped requests.

## Endpoint

```
POST /api/shop/customer/login
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

## Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123!"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Customer email address |
| `password` | string | Yes | Customer password |

## Response Fields (201)

The response is flat — the token is at the top level.

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | integer | Customer ID |
| `token` | string | **The authentication credential.** Format `<id>\|<secret>` — send as `Authorization: Bearer <token>` on all authenticated requests |
| `apiToken` | string | Legacy field, kept for backward compatibility. **Not** an auth Bearer — using it in the `Authorization` header returns `Unauthenticated` |
| `success` | boolean | Whether login succeeded |
| `message` | string | Human-readable result |

## Token Usage

Send the returned `token` on customer-scoped requests:

```bash
Authorization: Bearer 3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G5c9660e4
```

## Session Management

- Use [Verify Token](/api/rest-api/shop/customers/customer-verify-token) to check validity.
- Use [Customer Logout](/api/rest-api/shop/customers/customer-logout) to end the session.

## Related Resources

- [Customer Registration](/api/rest-api/shop/customers/customer-registration) — create an account and receive a token
- [Verify Customer Token](/api/rest-api/shop/customers/customer-verify-token) — check whether a stored token still resolves
- [Customer Logout](/api/rest-api/shop/customers/customer-logout) — revoke the token used on the request
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
