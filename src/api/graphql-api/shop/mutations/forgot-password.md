---
outline: false
examples:
  - id: forgot-password
    title: Forgot Password
    description: Request a password reset email for an account.
    query: |
      mutation createForgotPassword($email: String!) {
        createForgotPassword(input: {
          email: $email
        }) {
          forgotPassword {
            success
            message
          }
        }
      }
    variables: |
      {
        "email": "john.doe@example.com"
      }
    response: |
      {
        "data": {
          "forgotPassword": {
            "message": "Password reset link sent to your email",
            "success": true
          }
        }
      }
---

# Forgot Password

Request a password reset email for an account.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | String | ✅ Yes | Customer's registered email address |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Request success status |

## Behavior

- Sends a password reset link to the customer's email
- The reset link is valid for a configurable period (typically 24 hours)
- Customer uses the link to set a new password
- Old tokens are invalidated when password is reset

## Error Responses

```json
{
  "errors": {
    "email": ["No account found with this email address."]
  }
}
```

## Email Content

The reset email typically contains:
- A unique password reset link/token
- Expiration time for the token
- Instructions to reset the password
- Security information

## Next Steps

After requesting a password reset:
1. The customer receives an email with a reset link.
2. The customer clicks the link and sets a new password **on the web page** the link opens.

There is no reset-password API operation — the reset is completed through the emailed web link. A logged-in customer who knows their current password can change it directly via the profile-update mutation instead.

## Related Documentation

- [Update Customer Profile](/api/graphql-api/shop/mutations/update-customer-profile) — change the password while logged in (current + new)
- [Customer Login](/api/graphql-api/shop/mutations/customer-login)
