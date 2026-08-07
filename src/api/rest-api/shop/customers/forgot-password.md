---
outline: false
examples:
  - id: forgot-password
    title: Forgot Password
    description: Request a password reset email.
    request: |
      POST /api/shop/forgot-passwords
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "email": "john@example.com"
      }
    response: |
      {
        "message": "Reset password link has been sent to your email"
      }
    commonErrors:
      - error: 404 Not Found
        cause: Email address not found
        solution: Verify the email is associated with an account
      - error: 400 Bad Request
        cause: Invalid email format
        solution: Provide valid email address

---

# Forgot Password

Request a password reset email. A reset link will be sent to the customer's email address.

## Endpoint

```
POST /api/shop/forgot-passwords
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

This endpoint is public — it takes the storefront key but no customer token, since the shopper cannot sign in at this point.

## Request Body

```json
{
  "email": "john@example.com"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email address associated with account |

## Response Fields (200 OK)

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the reset mail was queued. `false` when the address is unregistered or the request was throttled. |
| `message` | string | `Reset link sent successfully to your email`, or `Email address not found` on either failure path. |

Both outcomes answer with HTTP `200` — read `success`, not the status code.

## The Reset Link

The mail carries a storefront URL of the form:

```
https://yourstore.com/reset-password/{token}
```

Opening it renders the store's reset form; submitting that form sets the new password. The token is single-use, is invalidated once the reset completes, and is superseded when a newer reset request is made for the same address.

## Use Cases

- **Reset link from a login screen** — post the email the shopper typed; a `success` of `true` means the mail was queued, and the shopper completes the reset on the storefront web page the link points to.
- **Distinguish "sent" from "not sent" in the UI** — the endpoint always answers `200`; branch on the `success` field, never on the status code.

## Behaviour

1. The endpoint is public — it takes the storefront key and no customer token.
2. A reset link is mailed to the address when it belongs to a registered customer. The link is valid for **60 minutes**.
3. Repeating the request for the same address inside **60 seconds** is throttled and no second mail goes out.
4. A throttled repeat and an unregistered address return the same body — `success: false` with the message `Email address not found`. The message does not distinguish the two, so do not surface it as proof that an address is unregistered.
5. The reset itself happens on the storefront web page carried in the mail. The API exposes no endpoint that consumes the reset token, so a headless client cannot complete the flow in-app.

## Best Practices

- **Show one neutral confirmation whatever the response says** — the two failure paths are indistinguishable, and echoing "not found" tells an attacker which addresses are registered.
- **Back off for a minute before retrying** — a resend inside the throttle window silently returns the failure message rather than sending a second mail.
- **Send the customer to the web reset page** — a native app has to open the emailed link in a browser; there is no API counterpart.
- **Use [Change Password](/api/rest-api/shop/customers/change-password) when the customer is logged in** — that path takes the current password and needs no email round-trip.

## Related Resources

- [Change Password](/api/rest-api/shop/customers/change-password) — rotate the password of a logged-in customer
- [Customer Login](/api/rest-api/shop/customers/customer-login) — authenticate and receive a customer token
- [Customer Registration](/api/rest-api/shop/customers/customer-registration) — create an account and receive a token
