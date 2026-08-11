---
outline: false
examples:
  - id: customer-verify-token
    title: Verify Customer Token
    description: Verify if the customer authentication token is still valid.
    request: |
      POST /api/shop/verify-tokens
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 201 Created

      {
        "id": 1821,
        "firstName": "Doc",
        "lastName": "Check",
        "email": "doc.check@example.com",
        "isValid": true,
        "message": "Token is valid"
      }
    commonErrors:
      - error: isValid false with the message "Unauthenticated. Please login to perform this action"
        cause: The token is unknown, revoked by a logout, or no Authorization header was sent
        solution: Send the customer back through login and store the fresh token
      - error: 401 Unauthorized
        cause: The storefront key header is missing
        solution: Send X-STOREFRONT-KEY on the request

---

# Verify Customer Token

Verify if the customer authentication token is still valid and retrieve customer information.

## Endpoint

```
POST /api/shop/verify-tokens
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token to verify |

## Response

The endpoint always answers `201 Created`, whether the token checks out or not. Read `isValid` — never the status code.

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Customer ID when the token is valid, `0` when it is not. |
| `firstName` / `lastName` | string | Name of the token's owner, empty strings when the token is invalid. |
| `email` | string | Email of the token's owner, empty string when the token is invalid. |
| `isValid` | boolean | Whether the token resolves to a live customer. |
| `message` | string | `Token is valid`, or `Unauthenticated. Please login to perform this action`. |

An unknown token, a token revoked by [logout](/api/rest-api/shop/customers/customer-logout), and a request with no `Authorization` header all produce the same invalid response — the endpoint does not distinguish them.

## Token Lifetime

Customer tokens do not carry an expiry of their own. A token stays usable until it is revoked, which happens when the customer logs out with it or their account is deleted. There is no refresh endpoint: replace a dead token by logging in again.

## Use Cases

- **Resume a session on app start** — call once with the stored token and use `isValid` to decide between the logged-in and logged-out shell, instead of waiting for the first real request to fail.
- **Re-hydrate the header from one call** — a valid response carries the customer's name and email, enough to render an account header without a follow-up profile fetch.

## Best Practices

- **Branch on `isValid`, not on HTTP status** — every outcome is `201`, so status-code checks read every invalid token as a success.
- **Do not call it before every request** — it is a session-resume check; the endpoint the client actually wants already answers `401` when the token is dead.
- **Discard the stored token as soon as `isValid` is false** — nothing about it will start working again.

## Related Resources

- [Customer Login](/api/rest-api/shop/customers/customer-login) — authenticate and receive a customer token
- [Customer Logout](/api/rest-api/shop/customers/customer-logout) — revoke the token used on the request
- [Customer Registration](/api/rest-api/shop/customers/customer-registration) — create an account and receive a token
