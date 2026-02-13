---
outline: false
examples:
  - id: get-customer-addresses
    title: Get Customer Addresses
    description: Retrieve all saved addresses for the authenticated customer.
    query: |
      query getCustomerAddresses($first: Int, $after: String) {
        getCustomerAddresses(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              addressType
              companyName
              name
              firstName
              lastName
              email
              address
              city
              state
              country
              postcode
              phone
              vatId
              defaultAddress
              useForShipping
              additional
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    variables: |
      {
        "first": 1
      }
    response: |
      {
        "data": {
          "getCustomerAddresses": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/customer-addresses/2829",
                  "_id": 2829,
                  "addressType": "customer",
                  "companyName": "ABC Retail Solutions",
                  "name": "John Doe",
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "john.doe@example.com",
                  "address": "123 Maple Street, Apt 4B",
                  "city": "Springfield",
                  "state": "IL",
                  "country": "US",
                  "postcode": "62704",
                  "phone": "+15551234567",
                  "vatId": "",
                  "defaultAddress": true,
                  "useForShipping": false,
                  "additional": null,
                  "createdAt": "2026-01-28T18:47:54+05:30",
                  "updatedAt": "2026-01-28T18:47:54+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MA=="
            }
          }
        }
      }
---

# Get Customer Addresses

Retrieve all saved addresses for the authenticated customer.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

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
| `isDefault` | Boolean | Is default address |
| `addressType` | String | Type (billing/shipping) |
| `createdAt` | DateTime | Creation date |

## Pagination

Uses cursor-based pagination:
- `first` + `after` for forward pagination
- `last` + `before` for backward pagination

## Address Types

| Type | Description |
|------|-------------|
| `billing` | Billing address |
| `shipping` | Shipping address |

## Use Cases

- Display saved addresses
- Pre-fill checkout address selection
- Show address book in account dashboard
- Select billing/shipping address

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
- [Delete Customer Address](/api/graphql-api/shop/mutations/delete-customer-address)
- [Get Addresses](/api/graphql-api/shop/queries/get-addresses)
