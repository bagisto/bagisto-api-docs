---
outline: false
examples:
  - id: update-customer-profile
    title: Update Customer Profile
    description: Update the authenticated customer's profile information.
    query: |
      mutation updateCustomerProfile($input: createCustomerProfileUpdateInput!) {
        createCustomerProfileUpdate(input: $input) {
          customerProfileUpdate {
            id
            firstName
            lastName
            email
            phone
            gender
            dateOfBirth
            status
            subscribedToNewsLetter
            isVerified
            isSuspended
            image
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "firstName": "Jane",
          "lastName": "Doe",
          "email": "jane.doe@example.com",
          "phone": "+15551234567",
          "dateOfBirth": "1990-01-15",
          "gender": "female",
          "subscribedToNewsLetter": true,
          "currentPassword": "OldPassword123!",
          "password": "NewPassword456!",
          "confirmPassword": "NewPassword456!"
        }
      }
    response: |
      {
        "data": {
          "createCustomerProfileUpdate": {
            "customerProfileUpdate": {
              "id": "1",
              "firstName": "Jane",
              "lastName": "Doe",
              "email": "jane.doe@example.com",
              "phone": "+15551234567",
              "gender": "female",
              "dateOfBirth": "1990-01-15",
              "status": "1",
              "subscribedToNewsLetter": true,
              "isVerified": "1",
              "isSuspended": "0",
              "image": null,
              "success": true,
              "message": "Profile updated successfully"
            }
          }
        }
      }

  - id: update-customer-profile-password
    title: Update Customer Password
    description: Change the authenticated customer's password by providing the current password and a new password.
    query: |
      mutation updateCustomerProfile($input: createCustomerProfileUpdateInput!) {
        createCustomerProfileUpdate(input: $input) {
          customerProfileUpdate {
            id
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "currentPassword": "OldPassword123!",
          "password": "NewPassword456!",
          "confirmPassword": "NewPassword456!"
        }
      }
    response: |
      {
        "data": {
          "createCustomerProfileUpdate": {
            "customerProfileUpdate": {
              "id": "1",
              "success": true,
              "message": "Password updated successfully"
            }
          }
        }
      }

  - id: update-customer-profile-image
    title: Update Profile Image
    description: Upload a new profile image (base64 encoded) or remove the existing one.
    query: |
      mutation updateCustomerProfile($input: createCustomerProfileUpdateInput!) {
        createCustomerProfileUpdate(input: $input) {
          customerProfileUpdate {
            id
            image
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA..."
        }
      }
    response: |
      {
        "data": {
          "createCustomerProfileUpdate": {
            "customerProfileUpdate": {
              "id": "1",
              "image": "/storage/customer/1/profile.jpg",
              "success": true,
              "message": "Profile image updated successfully"
            }
          }
        }
      }
---

# Update Customer Profile

Update the authenticated customer's profile information. All input fields are optional — send only the fields you want to change.

> **Note on password fields:** `currentPassword`, `password`, and `confirmPassword` are **only required when the customer wants to change their password**. For a regular profile update (name, email, phone, date of birth, etc.) you can omit all three. If you do change the password, you must send all three together — `currentPassword` to verify the existing password, plus `password` and `confirmPassword` for the new password (which must match).

The same mutation also handles profile image updates via the `image` (base64 upload) or `deleteImage` (remove existing) fields.

## Authentication

This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Mutation

```graphql
mutation updateCustomerProfile($input: createCustomerProfileUpdateInput!) {
  createCustomerProfileUpdate(input: $input) {
    customerProfileUpdate {
      id
      firstName
      lastName
      email
      phone
      gender
      dateOfBirth
      status
      subscribedToNewsLetter
      isVerified
      isSuspended
      image
      success
      message
    }
  }
}
```

## Input Fields

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ❌ No | Customer's first name |
| `lastName` | String | ❌ No | Customer's last name |
| `email` | String | ❌ No | Customer's email address (must be unique) |
| `phone` | String | ❌ No | Phone number |
| `gender` | String | ❌ No | Gender — one of `male`, `female`, `other` |
| `dateOfBirth` | String | ❌ No | Date of birth in `YYYY-MM-DD` format |
| `currentPassword` | String | ⚠️ Conditional | Required when changing password |
| `password` | String | ⚠️ Conditional | New password |
| `confirmPassword` | String | ⚠️ Conditional | New password confirmation (must match `password`) |
| `subscribedToNewsLetter` | Boolean | ❌ No | Newsletter subscription flag |
| `status` | String | ❌ No | Customer status (admin-controlled fields) |
| `isVerified` | String | ❌ No | Verification status |
| `isSuspended` | String | ❌ No | Suspension status |
| `image` | String | ❌ No | Profile image as a base64 data URI (e.g. `data:image/jpeg;base64,...`) |
| `deleteImage` | Boolean | ❌ No | Set to `true` to remove the existing profile image |

## Response Fields

The mutation returns the updated profile under `createCustomerProfileUpdate.customerProfileUpdate`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID | Customer identifier |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `email` | String | Email address |
| `phone` | String | Phone number |
| `gender` | String | Gender |
| `dateOfBirth` | String | Date of birth (`YYYY-MM-DD`) |
| `status` | String | Customer status |
| `subscribedToNewsLetter` | Boolean | Newsletter subscription flag |
| `isVerified` | String | Verification flag |
| `isSuspended` | String | Suspension flag |
| `image` | String | URL/path to stored profile image |
| `success` | Boolean | Operation success flag |
| `message` | String | Success or error message |

## Validation Rules

- First name and last name can contain letters and spaces.
- Email must be a valid format and unique across all customers.
- Date of birth must be in `YYYY-MM-DD` format.
- Gender must be one of: `male`, `female`, `other`.
- Password change requires **all three** of `currentPassword`, `password`, and `confirmPassword`. `password` must match `confirmPassword`, and `currentPassword` must match the existing password on file.
- `image` must be a valid base64 data URI (`data:image/<jpeg|png|gif|webp>;base64,...`).
- Sending `deleteImage: true` removes any existing stored image — pair it with no `image` field to clear the profile picture.

## Error Responses

```json
{
  "errors": [
    {
      "message": "The email has already been taken.",
      "extensions": { "category": "validation" }
    }
  ]
}
```

Other common error cases:

- `Current password is incorrect.` — `currentPassword` does not match.
- `The password confirmation does not match.` — `password` ≠ `confirmPassword`.
- `Invalid image format.` — `image` is not a recognized base64 data URI.
- `Unauthenticated.` — missing or invalid Bearer token.

## Related Documentation

- [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile)
- [Delete Customer Profile](/api/graphql-api/shop/mutations/delete-customer-profile)
