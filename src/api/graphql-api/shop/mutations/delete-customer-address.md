---
outline: false
examples:
  - id: delete-customer-address
    title: Delete Customer Address
    description: Delete a customer address.
    query: |
      mutation deleteCustomerAddress($input: createDeleteCustomerAddressInput!) {
        createDeleteCustomerAddress(input: $input) {
          deleteCustomerAddress {
            id
          }
        }
      }
    variables: |
      {
        "input": {
          "addressId": 2858
        }
      }
    response: |
      {
        "data": {
          "createDeleteCustomerAddress": {
            "deleteCustomerAddress": {
              "id": "2858"
            }
          }
        }
      }
---

# Delete Customer Address

Delete a customer address.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```

## Arguments

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `addressId` | String | ✅ Yes | Address ID to delete |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `createDeleteCustomerAddress` | String | Return deleted customer address object |

## Important Notes

- Address must belong to the authenticated customer
- Default address cannot be deleted without setting a new default
- Addresses used in incomplete orders may be archived instead of deleted

## Error Responses

```json
{
  "errors": {
    "message": "Address not found or does not belong to this customer",
  }
}
```

## Related Documentation

- [Create Customer Address](/api/graphql/shop/mutations/create-customer-address)
- [Update Customer Address](/api/graphql/shop/mutations/update-customer-address)
- [Get Customer Addresses](/api/graphql/shop/queries/get-customer-addresses)
