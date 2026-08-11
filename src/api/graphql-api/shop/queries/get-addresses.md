---
outline: false
examples:
  - id: get-addresses
    title: Get Checkout Addresses
    description: Retrieve the address applied to the current checkout session — either the guest-entered address or the authenticated customer's selected checkout address.
    query: |
      query collectionGetCheckoutAddresses {
        collectionGetCheckoutAddresses {
          edges {
            node {
              id
              _id
              name
              addressType
              parentAddressId
              firstName
              lastName
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
                  "id": "/api/shop/get_checkout_addresses/3025",
                  "_id": 3025,
                  "name": "John Doe",
                  "addressType": "cart_billing",
                  "parentAddressId": null,
                  "firstName": "John",
                  "lastName": "Doe",
                  "companyName": null,
                  "address": "123 Main St",
                  "city": "Los Angeles",
                  "state": "CA",
                  "country": "US",
                  "postcode": "90001",
                  "email": "john@example.com",
                  "phone": "2125551234",
                  "vatId": null,
                  "defaultAddress": false,
                  "useForShipping": false,
                  "additional": null,
                  "createdAt": "2026-04-02T13:44:34+05:30",
                  "updatedAt": "2026-04-02T13:44:34+05:30"
                }
              },
              {
                "node": {
                  "id": "/api/shop/get_checkout_addresses/3026",
                  "_id": 3026,
                  "name": "John Doe",
                  "addressType": "cart_shipping",
                  "parentAddressId": null,
                  "firstName": "John",
                  "lastName": "Doe",
                  "companyName": null,
                  "address": "123 Main St",
                  "city": "Los Angeles",
                  "state": "CA",
                  "country": "US",
                  "postcode": "90001",
                  "email": "john@example.com",
                  "phone": "2125551234",
                  "vatId": null,
                  "defaultAddress": false,
                  "useForShipping": false,
                  "additional": null,
                  "createdAt": "2026-04-02T13:44:34+05:30",
                  "updatedAt": "2026-04-02T13:44:34+05:30"
                }
              }
            ]
          }
        }
      }
---

# Get Checkout Addresses

Retrieve the address associated with the current checkout session.

This query returns only the address applied to the **active checkout** — the one entered during guest checkout, or the one the signed-in customer selected for this order. It is not the customer's address book; read that with [Get Customer Addresses](/api/graphql-api/shop/queries/get-customer-addresses).

## Authentication

This query supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the Guest Cart Token `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | Address ID |
| `addressType` | String | Type of address (billing or shipping) |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `address` | String | Street address |
| `city` | String | City |
| `state` | String | State/Province |
| `country` | String | Country code |
| `postcode` | String | Postal/Zip code |
| `email` | String | Email address |
| `phone` | String | Phone number |
| `useForShipping` | Boolean | Whether this address is also used for shipping |
| `defaultAddress` | Boolean | Whether this is the customer's default address |
| `createdAt` | DateTime | When address was created |

## Use Cases

- Confirm the address applied to the current checkout session
- Display the selected address on the order review/summary page
- Verify guest checkout address before placing the order

## Related Documentation

- [Get Customer Addresses](/api/graphql-api/shop/queries/get-customer-addresses)
- [Set Checkout Address](/api/graphql-api/shop/mutations/set-billing-address)
- [Set Billing Address](/api/graphql-api/shop/mutations/set-billing-address)
