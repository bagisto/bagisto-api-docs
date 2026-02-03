---
outline: false
examples:
  - id: get-customer-profile
    title: Get Customer Profile
    description: Retrieve the authenticated customer's profile information.
    query: |
      query getCustomerProfile {
        readCustomerProfile(id: "") {
          id
          firstName
          lastName
          email
          dateOfBirth
          gender
          phone
          status
          subscribedToNewsLetter
          isVerified
          image
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "readCustomerProfile": {
            "id": "/api/shop/customer-profiles/122",
            "firstName": "John",
            "lastName": "Doe",
            "email": "john.doe@example.com",
            "dateOfBirth": "1990-01-15",
            "gender": "Male",
            "phone": "555-0123",
            "status": "1",
            "subscribedToNewsLetter": true,
            "isVerified": "1",
            "image": null
          }
        }
      }
---

# Get Customer Profile

Retrieve the authenticated customer's profile information.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

This query has no required arguments.

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Customer ID |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `email` | String | Email address |
| `dateOfBirth` | String | Date of birth (YYYY-MM-DD) |
| `gender` | String | Gender (male/female/other) |
| `phone` | String | Phone number |

## Use Cases

- Display customer account information
- Show profile on account dashboard
- Verify customer information
- Pre-fill form fields

## Error Responses

```json
{
  "errors": {
    "authentication": ["Unauthenticated. Please login to perform this action"]
  }
}
```

## Related Documentation

- [Update Customer Profile](/api/graphql/shop/mutations/update-customer-profile)
- [Get Customer Orders](/api/graphql/shop/queries/get-customer-orders)
- [Get Customer Addresses](/api/graphql/shop/queries/get-customer-addresses)
