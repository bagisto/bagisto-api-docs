---
outline: false
examples:
  - id: create-customer-address
    title: Create Customer Address
    description: Add a new address to the customer's address book.
    request: |
      POST /api/shop/customer-addresses
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "ANC Corporation",
        "vatId": "GB123456789",
        "email": "jane@example.com",
        "phone": "9876543210",
        "address1": "456 Oak Ave",
        "address2": "Suite 200",
        "city": "Los Angeles",
        "state": "CA",
        "country": "US",
        "postcode": "90001",
        "defaultAddress": false
      }
    response: |
      HTTP/1.1 201 Created

      {
        "id": 271,
        "addressId": 271,
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "ANC Corporation",
        "vatId": "GB123456789",
        "email": "jane@example.com",
        "phone": "9876543210",
        "address1": "456 Oak Ave",
        "address2": "Suite 200",
        "country": "US",
        "state": "CA",
        "city": "Los Angeles",
        "postcode": "90001",
        "defaultAddress": false
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Unprocessable Entity
        cause: Missing required fields
        solution: Provide all required fields

---

# Create Customer Address

Add a new address to the customer's address book.

## Endpoint

```
POST /api/shop/customer-addresses
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "companyName": "ANC Corporation",
  "vatId": "GB123456789",
  "email": "jane@example.com",
  "phone": "9876543210",
  "address1": "456 Oak Ave",
  "address2": "Suite 200",
  "city": "Los Angeles",
  "state": "CA",
  "country": "US",
  "postcode": "90001",
  "defaultAddress": false
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstName` | string | Yes | First name on the address. |
| `lastName` | string | Yes | Last name on the address. |
| `address1` | string | Yes | Street address. Note the read endpoints return this value under the key `address`. |
| `city` | string | Yes | City. |
| `address2` | string | No | Second street line. |
| `companyName` | string | No | Company name. |
| `vatId` | string | No | VAT identification number. |
| `email` | string | No | Contact email stored with the address. |
| `phone` | string | No | Contact phone stored with the address. |
| `state` | string | No | State or region code. |
| `country` | string | No | Two-letter country code. |
| `postcode` | string | No | Postal code. |
| `defaultAddress` | boolean | No | Marks this address as the customer's default and clears the flag on the previous one. Defaults to `false`. |

The four required fields are the ones the address record cannot be stored without. Everything else — including `country`, `state`, and `postcode` — is accepted as sent and is not checked against the store's country list, so validate those on the client if the checkout depends on them.

## Response Fields (201 Created)

The response is the created address itself, flat — there is no wrapper object and no message.

| Field | Type | Description |
|-------|------|-------------|
| `id` / `addressId` | integer | The new address ID, returned under both keys. |
| `firstName` / `lastName` | string | Name as stored. |
| `companyName` / `vatId` | string | Echoed back, `null` when not sent. |
| `email` / `phone` | string | Echoed back, `null` when not sent. |
| `address1` / `address2` | string | Street lines as stored. |
| `country` / `state` / `city` / `postcode` | string | Location as stored. |
| `defaultAddress` | boolean | Whether this address is now the default. |

## Use Cases

- **Save an address during checkout** — create it here, then send the same fields to [Set Shipping Address](/api/rest-api/shop/checkout/set-shipping-address); checkout takes address fields, not an address ID.
- **First address for a new customer** — pass `defaultAddress: true` so later screens have a default to pre-select.
- **Switch the default** — creating with `defaultAddress: true` clears the flag on the previous default in the same call, so no second request is needed.

## Best Practices

- **Send `address1`, never `address`** — an unrecognised key is ignored silently and the address is stored with an empty street.
- **Validate country, state, and postcode client-side** — the endpoint stores whatever is sent, so a typo surfaces only later at checkout.
- **Keep the returned `addressId`** — update and delete address the row by that ID, and the create response is the only place it is handed back.

## Related Resources

- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses) — the customer's saved address book
- [Update Customer Address](/api/rest-api/shop/customers/update-customer-address) — patch one saved address
- [Delete Customer Address](/api/rest-api/shop/customers/delete-customer-address) — remove one saved address
