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
            city
            state
            country 
            phone
            addressId
            email
            phone
            address1
            address2
            postcode
            useForShipping
            defaultAddress
          }
        }
      }
    variables: |
      {
        "input": {  
          "firstName": "John",
          "lastName": "Doe",
          "email": "hello@example.com",
          "phone": "+918888888888",
          "address1": "123 Main Street",
          "address2": "NY",
          "postcode": "10001",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "phone": "+1-555-0100",
          "useForShipping": true
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
              "city": "New York",
              "state": "NY",
              "country": "US",
              "phone": "+1-555-0100",
              "addressId": 2851,
              "email": "hello@example.com",
              "address1": "123 Main Street",
              "address2": "NY",
              "postcode": "10001",
              "useForShipping": true,
              "defaultAddress": false
            }
          }
        }
      }
---

# Create Customer Address

Create a new address for the authenticated customer.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `firstName` | String | ✅ Yes | First name |
| `lastName` | String | ✅ Yes | Last name |
| `address1` | String | ✅ Yes | Street address |
| `city` | String | ✅ Yes | City |
| `state` | String | ✅ Yes | State/Province |
| `country` | String | ✅ Yes | Country code (ISO 3166-1 alpha-2) |
| `zipCode` | String | ✅ Yes | Postal/Zip code |
| `postcode` | String | ❌ No | Phone number |
| `isDefault` | Boolean | ❌ No | Set as default address |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `customerAddressToken` | Address | Created address object |
| `message` | String | Success or error message |
| `success` | Boolean | Creation success status |

## Validation Rules

- First name and last name required
- Complete address required
- Valid country code must be provided
- Zip code format depends on country
- Phone number should be in valid format
 
## Related Documentation

- [Get Customer Addresses](/api/graphql/shop/queries/get-customer-addresses)
- [Update Customer Address](/api/graphql/shop/mutations/update-customer-address)
- [Delete Customer Address](/api/graphql/shop/mutations/delete-customer-address)
