---
outline: false
examples:
  - id: get-customer-addresses
    title: Get Customer Addresses
    description: Retrieve all saved addresses for the authenticated customer.
    request: |
      GET /api/shop/customer-addresses
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 270,
          "addressType": "customer",
          "firstName": "Doc",
          "lastName": "Check",
          "address": "12 Market Street",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "postcode": "10001",
          "email": "doc.check@example.com",
          "phone": "+12125550123",
          "defaultAddress": true,
          "useForShipping": false,
          "createdAt": "2026-08-07T15:17:04+05:30",
          "updatedAt": "2026-08-07T15:17:04+05:30"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
  - id: get-customer-addresses-newest-first
    title: Get Customer Addresses (newest first)
    description: Sort the address book so the most recently added address appears first.
    request: |
      GET /api/shop/customer-addresses?sort=created_at&order=desc
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 271,
          "addressType": "customer",
          "firstName": "Jane",
          "lastName": "Doe",
          "address": "456 Oak Ave",
          "city": "Los Angeles",
          "state": "CA",
          "country": "US",
          "postcode": "90001",
          "email": "jane@example.com",
          "phone": "9876543210",
          "defaultAddress": false,
          "useForShipping": false,
          "createdAt": "2026-08-07T15:20:11+05:30",
          "updatedAt": "2026-08-07T15:20:11+05:30"
        },
        {
          "id": 270,
          "addressType": "customer",
          "firstName": "Doc",
          "lastName": "Check",
          "address": "12 Market Street",
          "city": "New York",
          "state": "NY",
          "country": "US",
          "postcode": "10001",
          "email": "doc.check@example.com",
          "phone": "+12125550123",
          "defaultAddress": true,
          "useForShipping": false,
          "createdAt": "2026-08-07T15:17:04+05:30",
          "updatedAt": "2026-08-07T15:17:04+05:30"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token

---

# Get Customer Addresses

Retrieve all saved addresses for the authenticated customer.

## Endpoint

```
GET /api/shop/customer-addresses
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Query Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `sort` | No | `id` | Column to sort by — `id` or `created_at`. The compound form `created_at-desc` (`<column>-<direction>`) is also accepted. |
| `order` | No | `asc` | Sort direction — `asc` or `desc`. Use `desc` to return the most recently added addresses first. |

By default addresses are returned oldest-first (the order they were added). To show the newest address at the top, pass `?sort=created_at&order=desc` (or the shorthand `?sort=created_at-desc`).

## Response

The response is a bare array of addresses — there is no wrapper object and no `addresses` key.

## Address Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Address ID. Use it on [Update](/api/rest-api/shop/customers/update-customer-address) and [Delete](/api/rest-api/shop/customers/delete-customer-address). |
| `addressType` | string | Always `customer` for an address-book entry. Cart addresses saved during checkout carry `cart_billing` or `cart_shipping` instead. |
| `firstName` / `lastName` | string | Name on the address. |
| `address` | string | Street address. Note the read endpoints return `address`, while create and update accept and echo `address1` / `address2`. |
| `city` | string | City. |
| `state` | string | State or region code. |
| `country` | string | Two-letter country code. |
| `postcode` | string | Postal code. |
| `email` / `phone` | string | Contact details stored with the address. |
| `defaultAddress` | boolean | Whether this is the customer's default address. |
| `useForShipping` | boolean | Carried from checkout usage; `false` on a plain address-book entry. |
| `createdAt` / `updatedAt` | string | ISO 8601 timestamps. |

## Use Cases

- **Address picker at checkout** — list the customer's entries and post the chosen one's fields to [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address); the checkout endpoints take address fields, not an address ID.
- **Address book, newest first** — `?sort=created_at&order=desc` puts the most recently added entry at the top, which is what an "added just now" confirmation screen needs.
- **Pre-select the default** — find the entry whose `defaultAddress` is `true`; there is at most one, and there may be none if the default was deleted.

## Best Practices

- **Filter out cart addresses before rendering** — checkout writes entries with an `addressType` of `cart_billing` or `cart_shipping` into the same list, and showing them makes the address book look duplicated.
- **Map `address` to `address1` when submitting** — the read returns `address`, but create and update expect `address1`; posting `address` stores an empty street with no error.
- **Do not assume a default exists** — deleting the default promotes nothing in its place.

## Related Resources

- [Create Customer Address](/api/rest-api/shop/customers/create-customer-address) — add an address to the book
- [Update Customer Address](/api/rest-api/shop/customers/update-customer-address) — patch one saved address
- [Delete Customer Address](/api/rest-api/shop/customers/delete-customer-address) — remove one saved address
