---
outline: false
examples:
  - id: update-customer-address
    title: Update Customer Address
    description: Update an existing customer address.
    request: |
      PUT /api/shop/customer-addresses/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "Updated Corp.",
        "vatId": "DE987654321",
        "email": "jane@example.com",
        "phone": "9876543210",
        "address1": "789 Pine Rd",
        "address2": "Suite 300",
        "city": "Los Angeles",
        "state": "CA",
        "country": "US",
        "postcode": "90002"
      }
    response: |
      HTTP/1.1 200 OK

      {
        "id": 271,
        "addressId": 271,
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "Updated Corporation",
        "vatId": "GB123456789",
        "email": "jane@example.com",
        "phone": "9876543210",
        "address1": "456 Oak Ave",
        "address2": "Suite 200",
        "country": "US",
        "state": "CA",
        "city": "Los Angeles",
        "postcode": "90002",
        "defaultAddress": false
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Address does not exist
        solution: Verify the address ID
      - error: 403 Forbidden
        cause: Address belongs to different customer
        solution: Only update your own addresses

---

# Update Customer Address

Update an existing address in the customer's address book.

## Endpoint

```
PUT /api/shop/customer-addresses/{addressId}
```

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `addressId` | integer | Yes | Address ID to update |

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
  "companyName": "Updated Corp.",
  "vatId": "DE987654321",
  "email": "jane@example.com",
  "phone": "9876543210",
  "address1": "789 Pine Rd",
  "address2": "Suite 300",
  "city": "Los Angeles",
  "state": "CA",
  "country": "US",
  "postcode": "90002"
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `firstName` | string | No | First name |
| `lastName` | string | No | Last name |
| `companyName` | string | No | Company name |
| `vatId` | string | No | VAT identification number |
| `email` | string | No | Email address |
| `phone` | string | No | Phone number |
| `address1` | string | No | Street address line 1 |
| `address2` | string | No | Street address line 2 |
| `city` | string | No | City |
| `state` | string | No | State/Province |
| `country` | string | No | Country code |
| `postcode` | string | No | Postal code |
| `defaultAddress` | boolean | No | Set as default address |

## Response Fields (200 OK)

The response is the updated address itself, flat — there is no wrapper object and no message.

| Field | Type | Description |
|-------|------|-------------|
| `id` / `addressId` | integer | Address ID, returned under both keys. |
| `firstName` / `lastName` | string | Name as stored after the update. |
| `companyName` / `vatId` | string | Company details, `null` when unset. |
| `email` / `phone` | string | Contact details, `null` when unset. |
| `address1` / `address2` | string | Street lines. Sent and echoed as `address1`; read endpoints return the same value as `address`. |
| `country` / `state` / `city` / `postcode` | string | Location as stored. |
| `defaultAddress` | boolean | Whether this address is the customer's default. |

## Update Behaviour

- The update is a partial patch — send only the fields that change; omitted fields keep their stored value.
- `country`, `state`, and `postcode` are stored as sent and are not checked against the store's country list.
- Setting `defaultAddress: true` clears the flag on whichever address held it before.
- An address belonging to another customer answers `404`, the same as an ID that does not exist.

## Use Cases

- **Fix one field** — post just `{"city": "Boston"}`; nothing else on the address is touched.
- **Promote an address to default** — post `{"defaultAddress": true}`; the previous default is demoted in the same call.
- **Restore a default after deleting one** — deleting the default promotes nothing, so set a new one explicitly here.

## Best Practices

- **Do not resend the whole address to change one field** — a partial body is enough, and a full resend risks overwriting a field the customer edited elsewhere.
- **Use `address1`, not `address`** — an unrecognised key is ignored, so the street silently stays as it was.
- **Read `404` as "not yours or not there"** — the endpoint gives no separate signal for another customer's address.

## Related Resources

- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses) — the customer's saved address book
- [Create Customer Address](/api/rest-api/shop/customers/create-customer-address) — add an address to the book
- [Delete Customer Address](/api/rest-api/shop/customers/delete-customer-address) — remove one saved address
