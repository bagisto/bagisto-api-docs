---
outline: false
examples:
  - id: customer-login
    title: Customer Login
    description: Authenticate a customer with email and password.
    query: |
      mutation createCustomerLogin(
        $email: String!
        $password: String!
      ) {
        createCustomerLogin(
          input: {
            email: $email
            password: $password
          }
        ) {
          customerLogin {
            id
            _id
            apiToken
            token
            success
            message
          }
        }
      }
    variables: |
      {
          "email": "john.doe@example.com",
          "password": "SecurePass@123"
      }
    response: |
      {
        "data": {
          "createCustomerLogin": {
            "customerLogin": {
              "id": "1",
              "_id": 1,
              "apiToken": "OOxDk2s06JCndg5FHb8WbfF6ZR8jGq23168m9gm37J9Cmz4xah8B8AFK0Cp95x...",
              "token": "1|xy56RHXcttcDnimTHVEGIeyxzMKAWX6MyICCsZTA7dc...",
              "success": true,
              "message": "You have logged in successfully"
            }
          }
        }
      }

  - id: customer-login-with-device-token
    title: Customer Login with Device Token
    description: Authenticate a customer with email, password and an FCM device token. Only applicable if the Bagisto Push Notification package is installed.
    query: |
      mutation createCustomerLogin(
        $email: String!
        $password: String!
        $deviceToken: String!
      ) {
        createCustomerLogin(
          input: {
            email: $email
            password: $password
            deviceToken: $deviceToken
          }
        ) {
          customerLogin {
            id
            _id
            apiToken
            token
            success
            message
          }
        }
      }
    variables: |
      {
          "email": "john.doe@example.com",
          "password": "SecurePass@123",
          "deviceToken": "your_fcm_device_token"
      }
    response: |
      {
        "data": {
          "createCustomerLogin": {
            "customerLogin": {
              "id": "1",
              "_id": 1,
              "apiToken": "OOxDk2s06JCndg5FHb8WbfF6ZR8jGq23168m9gm37J9Cmz4xah8B8AFK0Cp95x...",
              "token": "1|xy56RHXcttcDnimTHVEGIeyxzMKAWX6MyICCsZTA7dc...",
              "success": true,
              "message": "You have logged in successfully"
            }
          }
        }
      }
---

# Customer Login

Authenticate a customer account with email and password.

The `deviceToken` field applies only when the [Bagisto Push Notification](https://bagisto.com/en/extensions/push-notifications-for-bagisto/) package is installed. Pass the FCM device token here to associate the device with the customer session for push notification delivery. If the package is not installed, this field can be omitted.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `email` | String | ✅ Yes | Customer's email address |
| `password` | String | ✅ Yes | Customer's password |
| `deviceToken` | String | ❌ No | FCM device token for push notifications. Only required if the [Bagisto Push Notification](https://bagisto.com/en/extensions/push-notifications-for-bagisto/) package is installed. |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `createCustomerLogin` | Customer | The authenticated customer login object |
| `token` | String | **The authentication credential** (format `<id>\|<secret>`). Send as `Authorization: Bearer <token>` |
| `apiToken` | String | Legacy field, kept for backward compatibility. **Not** an auth Bearer — sending it in the `Authorization` header returns `Unauthenticated` |
| `message` | String | Success or error message |
| `success` | Boolean | Login success status |

## Token Usage

Once logged in, use the `token` in the `Authorization` header for authenticated requests:

```
Authorization: Bearer <token>
```
e.g.
```
"Authorization": "Bearer 220|KZhQuUwUzb6Z7j....."
```

## Error Responses

```json
{
  "errors": {
    "email": ["Invalid email or password."]
  }
}
```

## Related Documentation

- [Customer Registration](/api/graphql-api/shop/mutations/customer-registration)
- [Customer Logout](/api/graphql-api/shop/mutations/customer-logout)
- [Authentication Guide](/api/graphql-api/authentication)
