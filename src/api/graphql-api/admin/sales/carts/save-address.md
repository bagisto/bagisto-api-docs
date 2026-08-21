---
outline: false
examples:
  - id: admin-cart-save-address
    title: Save Cart Addresses
    description: Save billing (and optionally shipping) addresses on the draft cart.
    query: |
      mutation SaveAddress($input: saveAddressAdminCartInput!) {
        saveAddressAdminCart(input: $input) {
          adminCart {
            itemsCount
            grandTotal
            formattedGrandTotal
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/carts/314",
          "cartId": "314",
          "billing": {
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane@example.com",
            "address": [
              "12 Main St"
            ],
            "city": "Berlin",
            "country": "DE",
            "state": "BE",
            "postcode": "10115",
            "phone": "+4930123456",
            "useForShipping": true
          }
        }
      }
    response: |
      {
        "data": {
          "saveAddressAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Address saved."
            }
          }
        }
      }
---

# Save Cart Addresses

GraphQL counterpart of `POST /api/admin/carts/{id}/addresses`. Mutation field
is `saveAddressAdminCart`.

### Select cart fields, not `id`

This mutation returns the updated cart — select `itemsCount`, `grandTotal`, `formattedGrandTotal`, `success`, `message`, etc. Do **not** select `id` (or `_id`): this is an action result with no addressable record, so the auto-generated IRI field is `null` and selecting it errors out the whole payload.

**Prerequisites** — The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.

## Operation

| Operation | Type |
|-----------|------|
| `saveAddressAdminCart(input: saveAddressAdminCartInput!)` | Mutation |

## Required fields

Each address (billing always; shipping too when `useForShipping` is `false`)
must include `firstName`, `lastName`, `email`, `address` (a non-empty array of
street lines), `city`, `country`, `state`, `postcode` and `phone`, otherwise the
mutation fails with a `422`-equivalent error. `companyName` is optional.
