---
outline: false
examples:
  - id: set-shipping-address
    title: Set Billing/Shipping Address
    description: Set the Billing and shipping address for a checkout.
    query: |
      mutation createCheckoutAddress(
          $billingFirstName: String!
          $billingLastName: String!
          $billingEmail: String!
          $billingAddress: String!
          $billingCity: String!
          $billingCountry: String!
          $billingState: String!
          $billingPostcode: String!
          $billingPhoneNumber: String!
          $useForShipping: Boolean
      ) {
        createCheckoutAddress(
          input: { 
            billingFirstName: $billingFirstName
            billingLastName: $billingLastName
            billingEmail: $billingEmail
            billingAddress: $billingAddress
            billingCity: $billingCity
            billingCountry: $billingCountry
            billingState: $billingState
            billingPostcode: $billingPostcode
            billingPhoneNumber: $billingPhoneNumber
            useForShipping: $useForShipping
          }
        ) {
          checkoutAddress {
            _id
            success
            message
            id
            cartToken
            billingFirstName
            billingLastName
            billingAddress
            billingCity
            billingState
            billingPostcode
            billingPhoneNumber
            shippingFirstName
            shippingLastName
            shippingCity
            
          }
        }
      }
    variables: |
      {
          "billingFirstName": "John",
          "billingLastName": "Doe",
          "billingEmail": "john@example.com",
          "billingAddress": "123 Main St",
          "billingCity": "Los Angeles",
          "billingCountry": "IN",
          "billingState": "UP",
          "billingPostcode": "201301",
          "billingPhoneNumber": "2125551234",
          "useForShipping": true
      }
    response: |
      {
          "data": {
              "createCheckoutAddress": {
                  "checkoutAddress": {
                      "_id": 2877,
                      "success": true,
                      "message": "Address saved successfully",
                      "id": "2877",
                      "cartToken": "122",
                      "billingFirstName": "John",
                      "billingLastName": "Doe",
                      "billingAddress": "123 Main St",
                      "billingCity": "Los Angeles",
                      "billingState": "UP",
                      "billingPostcode": "201301",
                      "billingPhoneNumber": "2125551234",
                      "shippingFirstName": "John",
                      "shippingLastName": "Doe",
                      "shippingCity": "Los Angeles"
                  }
              }
          }
      }
---

# Set Shipping / Billing Address

Set the shipping or Billing address for a cart.

## Authentication

This query supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide a valid customer authentication token in the `Authorization` header.

```
Authorization: Bearer <accessToken>
```


## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `billingFirstName` | String | ✅ Yes | Billing first name |
| `billingLastName` | String | ✅ Yes | Billing last name |
| `billingEmail` | String | ✅ Yes | Billing email address |
| `billingAddress` | String | ✅ Yes | Billing street address |
| `billingCity` | String | ✅ Yes | Billing city |
| `billingCountry` | String | ✅ Yes | Billing country code (ISO 3166-1 alpha-2) |
| `billingState` | String | ✅ Yes | Billing state/province |
| `billingPostcode` | String | ✅ Yes | Billing postal/zip code |
| `billingPhoneNumber` | String | ✅ Yes | Billing phone number |
| `useForShipping` | Boolean | ❌ No | Use billing address for shipping (default: false) |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `_id` | Integer | Internal address identifier |
| `id` | String | Address ID |
| `success` | Boolean | Success status |
| `message` | String | Success or error message |
| `cartToken` | String | Cart token |
| `billingFirstName` | String | Billing first name |
| `billingLastName` | String | Billing last name |
| `billingAddress` | String | Billing street address |
| `billingCity` | String | Billing city |
| `billingState` | String | Billing state/province |
| `billingPostcode` | String | Billing postal/zip code |
| `billingPhoneNumber` | String | Billing phone number |
| `shippingFirstName` | String | Shipping first name (if useForShipping is true) |
| `shippingLastName` | String | Shipping last name (if useForShipping is true) |
| `shippingCity` | String | Shipping city (if useForShipping is true) |

## Validation Rules

- All required billing address fields must be provided
- Country code must be valid (ISO 3166-1 alpha-2)
- Email format must be valid
- Phone number should be in valid format
- Postal code format depends on country
- When `useForShipping` is true, billing address is also used for shipping

## Error Responses

```json
{
  "errors": {
    "billingFirstName": ["The billing first name field is required."],
    "billingEmail": ["The billing email must be a valid email address."],
    "billingCountry": ["Invalid country code."]
  }
}
```

## Related Documentation
 
- [Checkout Flow](/api/graphql-api/shop/checkout)
