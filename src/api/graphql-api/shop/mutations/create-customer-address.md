---
outline: false
examples:
  - id: create-customer-address
    title: Create Customer Address
    description: Create a new address for the authenticated customer.
    query: |
      mutation createCustomerAddress($input: createAddUpdateCustomerAddressInput!) {
        createAddUpdateCustomerAddress(input: $input) {
          addUpdateCustomerAddress{
            id
            firstName
            lastName
            companyName
            vatId
            city
            state
            country
            phone
            addressId
            email
            address1
            address2
            postcode
            defaultAddress
          }
        }
      }
    variables: |
      {
        "input": {
          "firstName": "John",
          "lastName": "Doe",
          "companyName": "ANC Corporation",
          "vatId": "GB123456789",
          "email": "hello@example.com",
          "phone": "+918888888888",
          "address1": "123 Main Street",
          "address2": "NY",
          "postcode": "10001",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "defaultAddress": false
        }
      }
    response: |
      {
        "data": {
          "createAddUpdateCustomerAddress": {
            "addUpdateCustomerAddress": {
              "id": "2851",
              "firstName": "John",
              "lastName": "Doe",
              "companyName": "ANC Corporation",
              "vatId": "GB123456789",
              "city": "New York",
              "state": "NY",
              "country": "US",
              "phone": "+918888888888",
              "addressId": 2851,
              "email": "hello@example.com",
              "address1": "123 Main Street",
              "address2": "NY",
              "postcode": "10001",
              "defaultAddress": false
            }
          }
        }
      }
---

# Create Customer Address

Create a new address for the authenticated customer.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ✅ Yes | First name |
| `lastName` | String | ✅ Yes | Last name |
| `companyName` | String | ❌ No | Company name |
| `vatId` | String | ❌ No | VAT identification number |
| `email` | String | ✅ Yes | Email address |
| `phone` | String | ✅ Yes | Phone number |
| `address1` | String | ✅ Yes | Street address line 1 |
| `address2` | String | ❌ No | Street address line 2 |
| `city` | String | ✅ Yes | City |
| `state` | String | ✅ Yes | State/Province |
| `country` | String | ✅ Yes | Country code (ISO 3166-1 alpha-2) |
| `postcode` | String | ✅ Yes | Postal/Zip code |
| `defaultAddress` | Boolean | ❌ No | Set as default address |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `addUpdateCustomerAddress` | Address | Created address object |

## Validation Rules

- First name and last name required
- Complete address required
- Valid country code must be provided
- Postal code format depends on country
- Phone number should be in valid format

## Related Documentation

- [Get Customer Addresses](/api/graphql-api/shop/queries/get-customer-addresses)
- [Update Customer Address](/api/graphql-api/shop/mutations/update-customer-address)
- [Delete Customer Address](/api/graphql-api/shop/mutations/delete-customer-address)
