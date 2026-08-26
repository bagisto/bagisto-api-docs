---
outline: false
examples:
  - id: social-login-google
    title: Social Login with Google
    description: Sign in (or sign up) with a Google ID token obtained from Google Identity Services (web) or the Google SDK (mobile).
    request: |
      POST /api/shop/customers/social-login
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx

      {
        "provider": "google",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6…"
      }
    response: |
      {
        "id": 1782,
        "_id": 1782,
        "token": "1550|1LMsQ6hVh0mZ8b0c2Jit4uVWAShoK8TfeOxnjEmG",
        "apiToken": "rjTLsuOsX5qehio2q1cMeMd6TCaIKofwQ4mb7y2zcy0",
        "firstName": "Nadia",
        "lastName": "Rahman",
        "email": "nadia@example.com",
        "phone": null,
        "isNewCustomer": true,
        "success": true,
        "message": "Signed in successfully.",
        "code": null
      }
  - id: social-login-facebook
    title: Social Login with Facebook
    description: Sign in with a Facebook access token obtained from the Facebook Login SDK.
    request: |
      POST /api/shop/customers/social-login
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx

      {
        "provider": "facebook",
        "accessToken": "EAAJZC…"
      }
    response: |
      {
        "id": 1783,
        "_id": 1783,
        "token": "1551|8b0c2Jit4uVWAShoK8TfeOxnjEmG1LMsQ6hVh0mZ",
        "apiToken": "q1cMeMd6TCaIKofwQ4mb7y2zcy0rjTLsuOsX5qehio2",
        "firstName": "Omar",
        "lastName": "Ali",
        "email": "omar@example.com",
        "phone": null,
        "isNewCustomer": false,
        "success": true,
        "message": "Signed in successfully.",
        "code": null
      }
  - id: social-login-linkedin
    title: Social Login with LinkedIn
    description: Sign in with a LinkedIn access token.
    request: |
      POST /api/shop/customers/social-login
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx

      {
        "provider": "linkedin",
        "accessToken": "AQV8…"
      }
    response: |
      {
        "id": 1784,
        "_id": 1784,
        "token": "1552|4uVWAShoK8TfeOxnjEmG1LMsQ6hVh0mZ8b0c2Jit",
        "apiToken": "TCaIKofwQ4mb7y2zcy0rjTLsuOsX5qehio2q1cMeMd6",
        "firstName": "Chen",
        "lastName": "Wei",
        "email": "chen@example.com",
        "phone": null,
        "isNewCustomer": true,
        "success": true,
        "message": "Signed in successfully.",
        "code": null
      }
  - id: social-login-invalid
    title: Invalid Token
    description: The provider rejected the token. Obtain a fresh one and retry.
    request: |
      POST /api/shop/customers/social-login
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxx

      {
        "provider": "google",
        "idToken": "expired-or-tampered-token"
      }
    response: |
      {
        "id": null,
        "_id": null,
        "token": null,
        "apiToken": null,
        "firstName": null,
        "lastName": null,
        "email": null,
        "phone": null,
        "isNewCustomer": null,
        "success": false,
        "message": "The social login token is invalid or expired. Please try again.",
        "code": "SOCIAL_TOKEN_INVALID"
      }
---

# Social Login

Sign a customer in — or sign them up on first sight — with a token their app or browser already holds. The client obtains the token from the provider itself (Google Identity Services or the Google SDK, the Facebook Login SDK, or LinkedIn), so there is no browser redirect; the token is verified server-side and a Bearer `token` is returned, the same credential [Customer Login](/api/rest-api/shop/customers/customer-login) answers with.

One endpoint both signs in and signs up, so the app never has to check first whether the email exists:

- A known provider account signs in.
- A known email links the provider to that account and signs in.
- Neither creates the account, links it, and signs in — `isNewCustomer` is `true`.

Accounts created this way have no password; a customer who wants one uses [Forgot Password](/api/rest-api/shop/customers/forgot-password).

## Endpoint

```
POST /api/shop/customers/social-login
```

## Supported Providers

| `provider` | Token field | Where the client gets it |
|------------|-------------|--------------------------|
| `google` | `idToken` (preferred) or `accessToken` | Google Identity Services (web) or the Google SDK (mobile) |
| `facebook` | `accessToken` | Facebook Login SDK (web or mobile) |
| `linkedin` | `accessToken` | LinkedIn OAuth |

A provider must be enabled and configured under **Configure → Customer → Settings → Social Login** in the admin panel.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key. No Bearer token is needed to call this endpoint. |

## Request Body

```json
{
  "provider": "google",
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6…"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `provider` | string | Yes | One of `google`, `facebook`, `linkedin`. |
| `idToken` | string | Conditional | Google ID token. Use for `google`. |
| `accessToken` | string | Conditional | OAuth access token. Use for `facebook` and `linkedin`, or for `google` when you hold an access token instead of an ID token. |
| `deviceToken` | string | No | FCM device token to register push in the same call. Applies only when the Bagisto Push Notification package is installed. |

Send `idToken` for Google, or `accessToken` for Facebook and LinkedIn — one token is enough.

## Response Fields

The response is flat — the token is at the top level. Field names are camelCase.

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | integer | Customer ID. |
| `token` | string | **The authentication credential.** Format `<id>\|<secret>` — send as `Authorization: Bearer <token>` on all authenticated requests. |
| `apiToken` | string | Legacy field, kept for backward compatibility. **Not** an auth Bearer. |
| `firstName` | string | Customer first name. |
| `lastName` | string | Customer last name. |
| `email` | string | Customer email. |
| `phone` | string | Customer phone, or `null` if unset. |
| `isNewCustomer` | boolean | `true` when this call created the account, `false` when it signed an existing one in. |
| `success` | boolean | Whether sign-in succeeded. |
| `message` | string | Human-readable result. |
| `code` | string | A stable machine-readable error code on failure, `null` on success. See below. |

## Error Codes

Every failure returns `success: false`, a translated `message`, and a stable `code`.

| `code` | Meaning |
|--------|---------|
| `SOCIAL_TOKEN_REQUIRED` | No `idToken` / `accessToken` was sent. |
| `SOCIAL_TOKEN_INVALID` | The provider rejected the token — obtain a fresh one and retry. |
| `SOCIAL_TOKEN_AUDIENCE` | The Google token was issued for a different app. A configuration mismatch, not retryable. |
| `SOCIAL_EMAIL_REQUIRED` | The provider shared no email address. Use email sign-up instead. |
| `ACCOUNT_INACTIVE` | The matched account is not activated. |
| `PROVIDER_NOT_SUPPORTED` | The `provider` value is not one of the supported providers. |
| `PROVIDER_DISABLED` | The provider is not enabled in the admin panel. |

## Token Usage

Send the returned `token` on customer-scoped requests:

```bash
Authorization: Bearer 1550|1LMsQ6hVh0mZ8b0c2Jit4uVWAShoK8TfeOxnjEmG
```

## Related Resources

- [Customer Login](/api/rest-api/shop/customers/customer-login) — email and password sign-in returning the same token.
- [Forgot Password](/api/rest-api/shop/customers/forgot-password) — set a password on a social account.
- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details.
