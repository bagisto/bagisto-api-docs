---
outline: false
examples:
  - id: get-addresses
    title: Get Checkout Addresses
    description: Retrieve all cart addresses for checkout.
    query: |
      query collectionGetCheckoutAddresses {
        collectionGetCheckoutAddresses {
          edges {
            node {
              id
              _id
              addressType
              parentAddressId
              firstName
              lastName
              gender
              companyName
              address
              city
              state
              country
              postcode
              email
              phone
              vatId
              defaultAddress
              useForShipping
              additional
              createdAt
              updatedAt
              name
            }
          }
        }
      }
      
    variables: |
      {}
    response: |
      {
        "data": {
          "collectionGetCheckoutAddresses": {
            "edges": [
              {
                "node": {
                  "id": "1",
                  "firstName": "John",
                  "lastName": "Doe",
                  "address": "123 Main Street",
                  "city": "New York",
                  "state": "NY",
                  "country": "US",
                  "zipCode": "10001",
                  "phone": "+1-555-0100",
                  "useForShipping": true,
                  "createdAt": "2024-01-10T10:00:00Z"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "endCursor": "cursor-value"
            }
          }
        }
      }
---

# Get Checkout Addresses

Retrieve all saved addresses for the authenticated customer.


## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `first` | Int | ❌ No | Number of addresses to fetch (default: 10, max: 100) |
| `after` | String | ❌ No | Cursor for forward pagination |
| `last` | Int | ❌ No | Number of addresses to fetch backward |
| `before` | String | ❌ No | Cursor for backward pagination |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Address ID |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `address` | String | Street address |
| `city` | String | City |
| `state` | String | State/Province |
| `country` | String | Country code |
| `zipCode` | String | Postal/Zip code |
| `phone` | String | Phone number |
| `isDefault` | Boolean | Is this the default address |
| `createdAt` | DateTime | When address was created |

## Pagination

Uses cursor-based pagination:
- `first` + `after` for forward pagination
- `last` + `before` for backward pagination
- `pageInfo` contains `hasNextPage` and `endCursor`

## Use Cases

- Display address list in checkout
- Pre-fill address selection dropdown
- Allow customers to select shipping/billing address
- Manage saved addresses

## Error Responses

```json
{
  "errors": {
    "authentication": ["Unauthorized: Invalid or expired token"]
  }
}
```

## Related Documentation

- [Create Customer Address](/api/graphql-api/shop/mutations/create-customer-address)
- [Update Customer Address](/api/graphql-api/shop/mutations/update-customer-address)
- [Set Shipping Address](/api/graphql-api/shop/mutations/set-shipping-address)
- [Set Billing Address](/api/graphql-api/shop/mutations/set-billing-address)
