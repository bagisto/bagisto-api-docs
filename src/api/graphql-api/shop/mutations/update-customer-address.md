---
outline: false
examples:
  - id: update-customer-address
    title: Update Customer Address
    description: Update an existing customer address.
    query: |
      mutation updateCustomerAddress($input: createAddUpdateCustomerAddressInput!) {
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
          "addressId": 2851,
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

# Update Customer Address

Update an existing customer address.

## Authentication

This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addressId` | String | ✅ Yes | Address ID to update |
| `firstName` | String | ❌ No | First name |
| `lastName` | String | ❌ No | Last name |
| `address1` | String | ❌ No | Street address |
| `city` | String | ❌ No | City |
| `state` | String | ❌ No | State/Province |
| `country` | String | ❌ No | Country code |
| `postcode` | String | ❌ No | Postal/Zip code |
| `phone` | String | ❌ No | Phone number |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `createAddUpdateCustomerAddress` | Address | Updated address object |

## Validation Rules

- Address ID must be valid and belong to the customer
- All required fields must be provided if being updated
- Valid country code must be provided if country is being changed
- Phone number should be in valid format if provided

## Error Responses

```json
{
  "errors": {
    "message": ["Address not found or does not belong to this customer."],
  }
}
```

## Related Documentation

- [Create Customer Address](/api/graphql-api/shop/mutations/create-customer-address)
- [Delete Customer Address](/api/graphql-api/shop/mutations/delete-customer-address)
- [Get Customer Addresses](/api/graphql-api/shop/queries/get-customer-addresses)
