---
outline: false
examples:
  - id: customer-logout
    title: Customer Logout
    description: End the customer's authenticated session.
    request: |
      POST /api/shop/customer/logout
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      {
        "message": "Successfully logged out"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Only authenticated customers can logout
      - error: 400 Bad Request
        cause: Invalid logout request
        solution: Ensure Bearer token is provided

---

# Customer Logout

End the customer's authenticated session and invalidate their token.

## Endpoint

```
POST /api/shop/customer/logout
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{}
```

No body parameters required.

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `message` | string | Success message |

## After Logout

Only the token used on the request is revoked. Other tokens the same customer holds — a second device, another browser — keep working, so logging out on a phone does not sign the shopper out on their laptop.

- The token used here answers `401` on every later request and cannot be revived.
- The customer's cart, wishlist, and compare list are untouched and are still there at the next login.
- Any device token registered for push notifications is cleared as part of the call.

## Use Cases

- **Sign out on one device** — call with that device's token and discard it locally; other sessions stay live.
- **Sign out everywhere** — the API revokes one token per call, so a "log out of all devices" control has to call once per stored token, or the account has to be re-authenticated.

## Best Practices

- **Discard the token client-side even if the call fails** — a token the server already dropped answers `401` here too, and the shopper still expects to be signed out.
- **Do not use logout to clear a cart** — the cart survives; remove the items explicitly if the flow needs an empty cart.
- **Re-authenticate rather than looping tokens for a global sign-out** — the endpoint has no all-sessions mode.

## Related Resources

- [Customer Login](/api/rest-api/shop/customers/customer-login) — authenticate and receive a customer token
- [Customer Registration](/api/rest-api/shop/customers/customer-registration) — create an account and receive a token
- [Verify Customer Token](/api/rest-api/shop/customers/customer-verify-token) — check whether a stored token still resolves
