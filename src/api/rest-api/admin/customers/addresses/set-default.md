---
outline: false
apiType: rest
examples:
  - id: admin-customer-address-set-default
    title: Set Address as Default
    description: Sets the chosen address as the customer's default and clears the default flag on all their other addresses. Empty body.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/addresses/27/set-default" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json"
    response: |
      {
        "id": 27,
        "customerId": 14,
        "addressType": "customer",
        "firstName": "Jane",
        "lastName": "Doe",
        "companyName": "Acme Inc.",
        "address": "742 Evergreen Terrace",
        "city": "Springfield",
        "state": "IL",
        "country": "US",
        "postcode": "62704",
        "email": "jane@example.com",
        "phone": "+15551234567",
        "vatId": "GB123456789",
        "defaultAddress": true
      }
---

# Set Customer Address as Default

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/addresses/{id}/set-default` | POST |

Marks the chosen address as the customer's default. All the customer's other addresses have their default flag cleared in the same call. The request body is empty.

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `customerId` | integer | yes | The customer who owns the address. |
| `id` | integer | yes | The address to make default. Must belong to `customerId` (otherwise 403). Unknown address → 404. |

## Response

Returns the updated address detail (same shape as the address detail endpoint), with `defaultAddress: true`.

Permission: `customers.addresses.edit`.

::: tip
For default-address semantics and the address-book overview, see the [Addresses overview](./index.md).
:::

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
