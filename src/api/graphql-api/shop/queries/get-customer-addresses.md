---
outline: false
examples:
  - id: get-customer-addresses
    title: Get Customer Addresses
    description: Retrieve all saved addresses for the authenticated customer with cursor-based pagination.
    query: |
      query getCustomerAddresses($first: Int, $after: String) {
        getCustomerAddresses(first: $first, after: $after) {
          edges {
            cursor
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
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "getCustomerAddresses": {
            "edges": [
              {
                "cursor": "MQ==",
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
              },
              {
                "cursor": "Mg==",
                "node": {
                  "id": "/api/shop/customer-addresses/2830",
                  "_id": 2830,
                  "addressType": "customer",
                  "companyName": null,
                  "name": "John Doe",
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "john.doe@example.com",
                  "address": "456 Oak Avenue, Suite 12",
                  "city": "Los Angeles",
                  "state": "CA",
                  "country": "US",
                  "postcode": "90001",
                  "phone": "+15559876543",
                  "vatId": null,
                  "defaultAddress": false,
                  "useForShipping": true,
                  "additional": null,
                  "createdAt": "2026-02-05T10:15:00+05:30",
                  "updatedAt": "2026-02-05T10:15:00+05:30"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "startCursor": "MQ==",
              "endCursor": "Mg=="
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: Unauthenticated
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: Invalid storefront key
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

  - id: get-customer-addresses-paginated
    title: Paginated Addresses (Forward)
    description: Retrieve customer addresses one page at a time using cursor-based pagination.
    query: |
      query getCustomerAddresses {
        getCustomerAddresses(first: 2) {
          edges {
            cursor
            node {
              _id
              firstName
              lastName
              address
              city
              state
              country
              postcode
              defaultAddress
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "getCustomerAddresses": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 2829,
                  "firstName": "John",
                  "lastName": "Doe",
                  "address": "123 Maple Street, Apt 4B",
                  "city": "Springfield",
                  "state": "IL",
                  "country": "US",
                  "postcode": "62704",
                  "defaultAddress": true
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "_id": 2830,
                  "firstName": "John",
                  "lastName": "Doe",
                  "address": "456 Oak Avenue, Suite 12",
                  "city": "Los Angeles",
                  "state": "CA",
                  "country": "US",
                  "postcode": "90001",
                  "defaultAddress": false
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "Mg=="
            },
            "totalCount": 5
          }
        }
      }

  - id: get-customer-addresses-next-page
    title: Paginated Addresses — Next Page
    description: Fetch the next page of addresses using the `after` cursor from a previous response.
    query: |
      query getCustomerAddresses {
        getCustomerAddresses(first: 2, after: "Mg==") {
          edges {
            cursor
            node {
              _id
              firstName
              lastName
              address
              city
              state
              country
              postcode
              defaultAddress
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "getCustomerAddresses": {
            "edges": [
              {
                "cursor": "Mw==",
                "node": {
                  "_id": 2831,
                  "firstName": "John",
                  "lastName": "Doe",
                  "address": "789 Pine Road",
                  "city": "Chicago",
                  "state": "IL",
                  "country": "US",
                  "postcode": "60601",
                  "defaultAddress": false
                }
              },
              {
                "cursor": "NA==",
                "node": {
                  "_id": 2832,
                  "firstName": "John",
                  "lastName": "Doe",
                  "address": "321 Elm Boulevard",
                  "city": "Houston",
                  "state": "TX",
                  "country": "US",
                  "postcode": "77001",
                  "defaultAddress": false
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "NA=="
            },
            "totalCount": 5
          }
        }
      }

  - id: get-customer-addresses-minimal
    title: Minimal Address Fields
    description: Fetch only essential address fields for a lightweight dropdown or address selector.
    query: |
      query getCustomerAddresses {
        getCustomerAddresses(first: 50) {
          edges {
            node {
              _id
              name
              address
              city
              state
              country
              postcode
              defaultAddress
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "getCustomerAddresses": {
            "edges": [
              {
                "node": {
                  "_id": 2829,
                  "name": "John Doe",
                  "address": "123 Maple Street, Apt 4B",
                  "city": "Springfield",
                  "state": "IL",
                  "country": "US",
                  "postcode": "62704",
                  "defaultAddress": true
                }
              },
              {
                "node": {
                  "_id": 2830,
                  "name": "John Doe",
                  "address": "456 Oak Avenue, Suite 12",
                  "city": "Los Angeles",
                  "state": "CA",
                  "country": "US",
                  "postcode": "90001",
                  "defaultAddress": false
                }
              }
            ],
            "totalCount": 2
          }
        }
      }

  - id: get-customer-addresses-with-company
    title: Addresses with Company & VAT Details
    description: Retrieve addresses including business-specific fields like company name and VAT ID.
    query: |
      query getCustomerAddresses {
        getCustomerAddresses(first: 10) {
          edges {
            node {
              _id
              companyName
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
              addressType
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "getCustomerAddresses": {
            "edges": [
              {
                "node": {
                  "_id": 2829,
                  "companyName": "ABC Retail Solutions",
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "john.doe@example.com",
                  "address": "123 Maple Street, Apt 4B",
                  "city": "Springfield",
                  "state": "IL",
                  "country": "US",
                  "postcode": "62704",
                  "phone": "+15551234567",
                  "vatId": "US123456789",
                  "defaultAddress": true,
                  "addressType": "customer"
                }
              },
              {
                "node": {
                  "_id": 2833,
                  "companyName": null,
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "john.doe@example.com",
                  "address": "789 Residential Lane",
                  "city": "Miami",
                  "state": "FL",
                  "country": "US",
                  "postcode": "33101",
                  "phone": "+15559991234",
                  "vatId": null,
                  "defaultAddress": false,
                  "addressType": "customer"
                }
              }
            ],
            "totalCount": 2
          }
        }
      }
---

# Get Customer Addresses

Retrieve all saved addresses for the authenticated customer. Addresses are used for billing and shipping during checkout, and can be managed from the customer's account dashboard.

## Query

```graphql
query getCustomerAddresses($first: Int, $after: String) {
  getCustomerAddresses(first: $first, after: $after) {
    edges {
      cursor
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
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
```

## Authentication

This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

## Request Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Content-Type` | `application/json` | Yes | Request content type |
| `X-STOREFRONT-KEY` | `pk_storefront_xxx` | Yes | Storefront API key |
| `Authorization` | `Bearer {token}` | Yes | Customer authentication token |

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | Int | No | Number of addresses to fetch (default: 10, max: 100) |
| `after` | String | No | Cursor for forward pagination |
| `last` | Int | No | Number of addresses to fetch backward |
| `before` | String | No | Cursor for backward pagination |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | String | IRI identifier (e.g., `/api/shop/customer-addresses/2829`) |
| `_id` | Int | Numeric database ID |
| `addressType` | String | Address type (e.g., `customer`) |
| `companyName` | String | Company name (nullable) |
| `name` | String | Full name (computed from first + last name) |
| `firstName` | String | First name |
| `lastName` | String | Last name |
| `email` | String | Email address |
| `address` | String | Street address |
| `city` | String | City |
| `state` | String | State/Province code |
| `country` | String | Country code (ISO 3166-1 alpha-2) |
| `postcode` | String | Postal/Zip code |
| `phone` | String | Phone number |
| `vatId` | String | VAT identification number (nullable) |
| `defaultAddress` | Boolean | Whether this is the default address |
| `useForShipping` | Boolean | Whether this address is used for shipping |
| `additional` | JSON | Additional address data (nullable) |
| `createdAt` | DateTime | Creation timestamp |
| `updatedAt` | DateTime | Last update timestamp |

## cURL Example

```bash
curl -X POST "http://localhost:8000/api/graphql" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { getCustomerAddresses(first: 10) { edges { cursor node { _id firstName lastName address city state country postcode phone defaultAddress } } pageInfo { hasNextPage endCursor } totalCount } }"
  }'
```

## Pagination

Uses cursor-based pagination:
- **Forward:** `first` + `after` — use `endCursor` from `pageInfo` as the next `after` value
- **Backward:** `last` + `before` — use `startCursor` from `pageInfo` as the next `before` value
- **Check for more:** read `pageInfo.hasNextPage` or `pageInfo.hasPreviousPage`

## Empty Response

When the customer has no saved addresses:

```json
{
  "data": {
    "getCustomerAddresses": {
      "edges": [],
      "pageInfo": {
        "hasNextPage": false,
        "hasPreviousPage": false,
        "startCursor": null,
        "endCursor": null
      },
      "totalCount": 0
    }
  }
}
```

## Use Cases

| Use Case | Approach |
|----------|----------|
| **Address book** | Fetch all addresses with `first: 50` for account dashboard |
| **Checkout selector** | Fetch minimal fields (`_id`, `name`, `address`, `city`, `defaultAddress`) for an address dropdown |
| **Default address** | Look for the entry with `defaultAddress: true` |
| **Business addresses** | Include `companyName` and `vatId` fields for B2B customers |
| **Pre-fill checkout** | Use `defaultAddress: true` entry to pre-populate shipping/billing forms |

## Error Responses

### Unauthenticated

```json
{
  "errors": [
    {
      "message": "Unauthenticated. Please login to perform this action",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["getCustomerAddresses"]
    }
  ]
}
```

## Related Documentation

- [Create Customer Address](/api/graphql-api/shop/mutations/create-customer-address)
- [Update Customer Address](/api/graphql-api/shop/mutations/update-customer-address)
- [Delete Customer Address](/api/graphql-api/shop/mutations/delete-customer-address)
