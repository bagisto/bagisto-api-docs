---
outline: false
examples:
  - id: register-customer-basic
    title: Register New Customer
    description: Create a new customer account with email and password.
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
          "email": "john@example.com",
          "password": "Password123!",
          "confirmPassword": "Password123!",
          "phone": "1234567890",
          "gender": "Male",
          "subscribedToNewsLetter": true
        }
      }
    response: |
      {
        "data": {
          "createCustomer": {
            "customer": {
              "id": "1",
              "email": "john@example.com",
              "firstName": "John",
              "lastName": "Doe",
              "status": "active",
              "token": "eyJpdiI6IjhWM..."
            }
          }
        }
      }
    commonErrors:
      - error: EMAIL_ALREADY_EXISTS
        cause: Email address already registered
        solution: Use different email or login instead
      - error: INVALID_PASSWORD
        cause: Password doesn't meet requirements
        solution: Use stronger password (8+ chars, mix of types)
      - error: INVALID_EMAIL
        cause: Email format is invalid
        solution: Provide valid email address

  - id: register-customer-with-device-token
    title: Register New Customer with Device Token
    description: Create a new customer account and associate an FCM device token for push notifications. Only applicable if the Bagisto Push Notification package is installed.
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
            deviceToken
          }
        }
      }
    variables: |
      {
        "input": {
          "firstName": "John",
          "lastName": "Doe",
          "email": "john@example.com",
          "password": "Password123!",
          "confirmPassword": "Password123!",
          "phone": "1234567890",
          "gender": "Male",
          "subscribedToNewsLetter": true,
          "deviceToken": "your_fcm_device_token"
        }
      }
    response: |
      {
        "data": {
          "createCustomer": {
            "customer": {
              "id": "1",
              "email": "john@example.com",
              "firstName": "John",
              "lastName": "Doe",
              "status": "active",
              "token": "eyJpdiI6IjhWM...",
              "deviceToken": "your_fcm_device_token"
            }
          }
        }
      }
    commonErrors:
      - error: EMAIL_ALREADY_EXISTS
        cause: Email address already registered
        solution: Use different email or login instead
      - error: INVALID_PASSWORD
        cause: Password doesn't meet requirements
        solution: Use stronger password (8+ chars, mix of types)
      - error: INVALID_EMAIL
        cause: Email format is invalid
        solution: Provide valid email address
---

# Register Customer

## About

The `registerCustomer` mutation creates a new customer account. Use this mutation to:

- Implement customer registration/signup flows
- Create new user accounts programmatically
- Enable self-service customer registration
- Integrate with external registration systems
- Collect customer information during signup
- Generate authentication tokens
- Set up customer profiles

This mutation validates input, checks for duplicate emails, and generates authentication credentials for immediate use.

> **Push Notifications:** The `deviceToken` field is only applicable if the [Bagisto Push Notification](https://bagisto.com/en/extensions/push-notifications-for-bagisto/) package is installed. It accepts an FCM (Firebase Cloud Messaging) device token to enable push notifications for the registered customer. If the package is not installed, this field can be omitted.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `input` | `createCustomerInput!` | Customer registration data. |
| `input.email` | `String!` | Unique customer email address. |
| `input.password` | `String!` | Account password (minimum 8 characters recommended). |
| `input.firstName` | `String!` | Customer first name. |
| `input.lastName` | `String!` | Customer last name. |
| `input.phone` | `String` | Customer phone number. |
| `input.gender` | `String` | Gender: `male`, `female`, `other`. |
| `input.dateOfBirth` | `Date` | Customer birth date (YYYY-MM-DD). |
| `input.subscribeToNewsletter` | `Boolean` | Opt-in to marketing emails. Default: `false` |
| `input.deviceToken` | `String` | FCM device token for push notifications. Only required if the [Bagisto Push Notification](https://bagisto.com/en/extensions/push-notifications-for-bagisto/) package is installed. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `customer` | `Customer!` | Newly created customer object. |
| `customer.id` | `ID!` | Customer ID. |
| `customer.email` | `String!` | Customer email. |
| `customer.firstName` | `String!` | First name. |
| `customer.lastName` | `String!` | Last name. |
| `customer.token` | `String!` | **The authentication credential** — send as `Authorization: Bearer <token>`. |
| `customer.apiToken` | `String!` | Legacy field, kept for backward compatibility. **Not** an auth Bearer — authenticate with `token` instead. |
| `customer.status` | `String!` | Account status (active, inactive). |
| `message` | `String!` | Success message. |
| `success` | `Boolean!` | Indicates successful registration. |
| `errors` | `[ErrorMessage!]` | Validation errors if registration failed. |

