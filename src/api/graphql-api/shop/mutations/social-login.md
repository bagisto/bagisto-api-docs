---
outline: false
examples:
  - id: social-login-google
    title: Social Login with Google
    description: Sign in (or sign up) with a Google ID token from Google Identity Services (web) or the Google SDK (mobile).
    query: |
      mutation createSocialLogin(
        $provider: String!
        $idToken: String
      ) {
        createSocialLogin(
          input: {
            provider: $provider
            idToken: $idToken
          }
        ) {
          socialLogin {
            id
            _id
            token
            apiToken
            firstName
            lastName
            email
            phone
            isNewCustomer
            success
            message
            code
          }
        }
      }
    variables: |
      {
        "provider": "google",
        "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6…"
      }
    response: |
      {
        "data": {
          "createSocialLogin": {
            "socialLogin": {
              "id": "1782",
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
          }
        }
      }
  - id: social-login-facebook
    title: Social Login with Facebook
    description: Sign in with a Facebook access token from the Facebook Login SDK.
    query: |
      mutation createSocialLogin(
        $provider: String!
        $accessToken: String
      ) {
        createSocialLogin(
          input: {
            provider: $provider
            accessToken: $accessToken
          }
        ) {
          socialLogin {
            id
            _id
            token
            apiToken
            firstName
            lastName
            email
            phone
            isNewCustomer
            success
            message
            code
          }
        }
      }
    variables: |
      {
        "provider": "facebook",
        "accessToken": "EAAJZC…"
      }
    response: |
      {
        "data": {
          "createSocialLogin": {
            "socialLogin": {
              "id": "1783",
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
          }
        }
      }
  - id: social-login-linkedin
    title: Social Login with LinkedIn
    description: Sign in with a LinkedIn access token.
    query: |
      mutation createSocialLogin(
        $provider: String!
        $accessToken: String
      ) {
        createSocialLogin(
          input: {
            provider: $provider
            accessToken: $accessToken
          }
        ) {
          socialLogin {
            id
            _id
            token
            apiToken
            firstName
            lastName
            email
            phone
            isNewCustomer
            success
            message
            code
          }
        }
      }
    variables: |
      {
        "provider": "linkedin",
        "accessToken": "AQV8…"
      }
    response: |
      {
        "data": {
          "createSocialLogin": {
            "socialLogin": {
              "id": "1784",
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
          }
        }
      }
  - id: social-login-invalid
    title: Invalid Token
    description: The provider rejected the token. Obtain a fresh one and retry.
    query: |
      mutation createSocialLogin(
        $provider: String!
        $idToken: String
      ) {
        createSocialLogin(
          input: {
            provider: $provider
            idToken: $idToken
          }
        ) {
          socialLogin {
            success
            message
            code
          }
        }
      }
    variables: |
      {
        "provider": "google",
        "idToken": "expired-or-tampered-token"
      }
    response: |
      {
        "data": {
          "createSocialLogin": {
            "socialLogin": {
              "success": false,
              "message": "The social login token is invalid or expired. Please try again.",
              "code": "SOCIAL_TOKEN_INVALID"
            }
          }
        }
      }
---

# Social Login

Sign a customer in — or sign them up on first sight — with a token their app or browser already holds. The client obtains the token from the provider itself (Google Identity Services or the Google SDK, the Facebook Login SDK, or LinkedIn), so there is no browser redirect; the token is verified server-side and a Bearer `token` is returned, the same credential [Customer Login](/api/graphql-api/shop/mutations/customer-login) answers with.

One mutation both signs in and signs up, so the app never has to check first whether the email exists:

- A known provider account signs in.
- A known email links the provider to that account and signs in.
- Neither creates the account, links it, and signs in — `isNewCustomer` is `true`.

Accounts created this way have no password; a customer who wants one uses the forgot-password flow.

## Supported Providers

| `provider` | Token argument | Where the client gets it |
|------------|----------------|--------------------------|
| `google` | `idToken` (preferred) or `accessToken` | Google Identity Services (web) or the Google SDK (mobile) |
| `facebook` | `accessToken` | Facebook Login SDK (web or mobile) |
| `linkedin` | `accessToken` | LinkedIn OAuth |

A provider must be enabled and configured under **Configure → Customer → Settings → Social Login** in the admin panel. No Bearer token is needed to call this mutation — the storefront key alone authorizes it.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `provider` | String | ✅ Yes | One of `google`, `facebook`, `linkedin`. |
| `idToken` | String | Conditional | Google ID token. Use for `google`. |
| `accessToken` | String | Conditional | OAuth access token. Use for `facebook` and `linkedin`, or for `google` when you hold an access token instead of an ID token. |
| `deviceToken` | String | ❌ No | FCM device token to register push in the same call. Applies only when the Bagisto Push Notification package is installed. |

Send `idToken` for Google, or `accessToken` for Facebook and LinkedIn — one token is enough.

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | ID / Int | Customer ID. |
| `token` | String | **The authentication credential** (format `<id>\|<secret>`). Send as `Authorization: Bearer <token>`. |
| `apiToken` | String | Legacy field, kept for backward compatibility. **Not** an auth Bearer. |
| `firstName` | String | Customer first name. |
| `lastName` | String | Customer last name. |
| `email` | String | Customer email. |
| `phone` | String | Customer phone, or `null` if unset. |
| `isNewCustomer` | Boolean | `true` when the mutation created the account, `false` when it signed an existing one in. |
| `success` | Boolean | Whether sign-in succeeded. |
| `message` | String | Human-readable result. |
| `code` | String | A stable machine-readable error code on failure, `null` on success. |

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

Once signed in, send the `token` in the `Authorization` header on authenticated requests:

```
"Authorization": "Bearer 1550|1LMsQ6hVh0mZ8b0c2Jit4uVWAShoK8TfeOxnjEmG"
```
