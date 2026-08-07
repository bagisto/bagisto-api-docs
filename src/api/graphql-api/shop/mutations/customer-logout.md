---
outline: false
examples:
  - id: customer-logout
    title: Customer Logout
    description: Logout a customer and invalidate their authentication tokens.
    query: |
      mutation createLogout {
        createLogout(input: {}) {
          logout {
            success
            message
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createLogout": {
            "logout": {
              "success": true,
              "message": "Logged out successfully"
            }
          }
        }
      }

  - id: customer-logout-with-device-token
    title: Customer Logout with Device Token
    description: Logout a customer and deregister the FCM device token to stop push notifications. Only applicable if the Bagisto Push Notification package is installed.
    query: |
      mutation createLogout($deviceToken: String) {
        createLogout(input: { deviceToken: $deviceToken }) {
          logout {
            success
            message
          }
        }
      }
    variables: |
      {
        "deviceToken": "your_fcm_device_token"
      }
    response: |
      {
        "data": {
          "createLogout": {
            "logout": {
              "success": true,
              "message": "Logged out successfully"
            }
          }
        }
      }
---

# Customer Logout

Logout a customer and invalidate their authentication tokens.

The `deviceToken` field applies only when the [Bagisto Push Notification](https://bagisto.com/en/extensions/push-notifications-for-bagisto/) package is installed. If the customer logged in with a `deviceToken`, the same token must be passed here on logout to properly deregister the device and stop push notifications for that session. If the package is not installed, this field can be omitted.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `deviceToken` | `String` | ❌ No | FCM device token. Required only if the customer logged in with a `deviceToken` and the Push Notification package is installed. |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `success` | Boolean | Logout success status |

## Behavior

- Invalidates the current access token
- Invalidates the refresh token
- Clears any session-related data
- Customer will need to login again for future requests
- If logged in with a `deviceToken`, passing the same token on logout deregisters the device from push notifications

## Error Responses

```json
{
  "errors": {
    "authentication": ["Unauthorized: Invalid or expired token"]
  }
}
```

## Related Documentation

- [Customer Login](/api/graphql-api/shop/mutations/customer-login)
- [Authentication Guide](/api/graphql-api/authentication)
