---
outline: false
examples:
  - id: customer-registration
    title: Customer Registration
    description: Register a new customer account with email and password.
    query: |
      mutation registerCustomer($input: createCustomerInput!) {
        createCustomer(input: $input) {
          customer {
            id
            _id
            token
            channelId
            customerGroupId
            dateOfBirth
            email
            gender
            isSuspended
            isVerified
            name
            firstName
            lastName
            rememberToken
            subscribedToNewsLetter
            status
            phone
          }
        }
      }

    variables: |
      {
        "input": {
          "firstName": "John",
          "lastName": "Doe",
          "gender": "Male",
          "dateOfBirth": "01/15/1990",
          "phone": "555-0123",
          "status": "1",
          "isVerified": "1",
          "isSuspended": "0",
          "email": "john.doe@example.com",
          "password": "SecurePass@123",
          "confirmPassword": "SecurePass@123",
          "subscribedToNewsLetter": true
        }
      }

    response: |
      {
          "data": {
              "createCustomer": {
                  "customer": {
                      "id": "/api/shop/customers/1",
                      "_id": 1,
                      "apiToken": "OOxDk2s06JCndg5FHb8WbfF6ZR8jGq23168m9gm37J9Cmz4xah8B8AFK0Cp95xoeztD1mDJV2eGRNTZ4",
                      "channelId": null,
                      "customerGroupId": null,
                      "dateOfBirth": "1990-01-15",
                      "email": "john.doe@example.com",
                      "gender": "Male",
                      "isSuspended": "0",
                      "isVerified": "1",
                      "name": "John Doe",
                      "firstName": "John",
                      "lastName": "Doe",
                      "rememberToken": null,
                      "subscribedToNewsLetter": true,
                      "status": "1",
                      "token": "7b65c50e0c15cdc684d36e5819eb7c19",
                      "phone": "555-0123"
                  }
              }
          }
      }
---

# Customer Registration

Register a new customer account with Bagisto.

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ✅ Yes | Customer's first name |
| `lastName` | String | ✅ Yes | Customer's last name |
| `email` | String | ✅ Yes | Customer's email address (must be unique) |
| `password` | String | ✅ Yes | Password for the account (min. 8 characters) |
| `passwordConfirmation` | String | ✅ Yes | Password confirmation (must match password) |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `customer` | Customer | The created customer object |
| `accessToken` | String | JWT token for API authentication |
| `refreshToken` | String | Token to refresh access token |
| `message` | String | Success or error message |
| `success` | Boolean | Registration success status |

## Validation Rules

- Email must be in valid format and unique
- Password must be at least 8 characters
- Password and password confirmation must match
- First name and last name are required
- Email cannot already exist in the system

## Error Responses

```json
{
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

## Related Documentation

- [Customer Login](/api/graphql/shop/mutations/customer-login)
- [Update Customer Profile](/api/graphql/shop/mutations/update-customer-profile)
- [Authentication Guide](/api/graphql/authentication)
