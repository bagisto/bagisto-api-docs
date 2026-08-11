---
outline: false
examples:
  - id: delete-customer-address
    title: Delete Customer Address
    description: Remove an address from the customer's address book.
    request: |
      DELETE /api/shop/customer-addresses/1
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 204 No Content
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: No such address, or the address belongs to another customer — both answer the same way
        solution: Delete only IDs returned by Get Customer Addresses for this customer

---

# Delete Customer Address

Remove an address from the customer's address book.

## Endpoint

```
DELETE /api/shop/customer-addresses/{addressId}
```

## URL Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `addressId` | integer | Yes | Address ID to delete |

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response

`204 No Content` with an empty body. There is no confirmation payload — the status is the confirmation.

## Deletion Behaviour

- The address row is removed outright and cannot be recovered.
- Deleting the default address does **not** promote another one. The customer is left with no default until one is set explicitly, so re-set it with [Update Address](/api/rest-api/shop/customers/update-customer-address) if the flow depends on a default.
- The last remaining address can be deleted; an empty address book is allowed.
- Addresses already captured on an order are snapshots stored with that order, so past orders keep their address after this call.
- An ID belonging to another customer answers `404`, the same as an ID that does not exist — the endpoint never confirms that someone else's address is real.

## Use Cases

- **Address-book "remove" button** — call with the row's `id`, then re-render from [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses); the response body carries nothing to render from.
- **Cleaning up after a checkout** — the addresses saved during checkout carry an `addressType` of `cart_billing` or `cart_shipping`, so they can be pruned separately from the shopper's own entries.

## Best Practices

- **Re-fetch the list after deleting** — a `204` returns no data, so the client cannot patch its state from the response.
- **Check whether the deleted row was the default** — nothing is promoted in its place, and a checkout that assumes a default will find none.
- **Treat `404` as "not yours or not there"** — do not branch on it as proof the address never existed.

## Related Resources

- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses) — the customer's saved address book
- [Create Customer Address](/api/rest-api/shop/customers/create-customer-address) — add an address to the book
- [Update Customer Address](/api/rest-api/shop/customers/update-customer-address) — patch one saved address
