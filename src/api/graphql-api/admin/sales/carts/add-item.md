---
outline: false
examples:
  - id: admin-cart-add-item
    title: Add Item (simple)
    description: Add a simple/virtual product. `id` is the resource IRI; `cartId` is forwarded as the raw integer for the processor.
    query: |
      mutation AddItem($input: addItemAdminCartInput!) {
        addItemAdminCart(input: $input) {
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
          "productId": 142,
          "quantity": 1
        }
      }
    response: |
      {
        "data": {
          "addItemAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Item added to cart."
            }
          }
        }
      }
  - id: admin-cart-add-configurable
    title: Add Item (configurable)
    description: Configurable products require the chosen variant's product id in selectedConfigurableOption.
    query: |
      mutation AddItem($input: addItemAdminCartInput!) {
        addItemAdminCart(input: $input) {
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
          "productId": 123,
          "quantity": 1,
          "selectedConfigurableOption": 124
        }
      }
    response: |
      {
        "data": {
          "addItemAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Item added to cart."
            }
          }
        }
      }
  - id: admin-cart-add-bundle
    title: Add Item (bundle)
    description: Bundle products require bundleOptions — a list of { optionId, productIds, quantity }.
    query: |
      mutation AddItem($input: addItemAdminCartInput!) {
        addItemAdminCart(input: $input) {
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
          "productId": 2517,
          "quantity": 1,
          "bundleOptions": [
            {
              "optionId": 5,
              "productIds": [
                10
              ],
              "quantity": 1
            },
            {
              "optionId": 6,
              "productIds": [
                12
              ],
              "quantity": 1
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "addItemAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Item added to cart."
            }
          }
        }
      }
  - id: admin-cart-add-grouped
    title: Add Item (grouped)
    description: Grouped products require groupedQuantities — a list of { productId, quantity }.
    query: |
      mutation AddItem($input: addItemAdminCartInput!) {
        addItemAdminCart(input: $input) {
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
          "productId": 2516,
          "quantity": 1,
          "groupedQuantities": [
            {
              "productId": 301,
              "quantity": 1
            },
            {
              "productId": 302,
              "quantity": 2
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "addItemAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Item added to cart."
            }
          }
        }
      }
  - id: admin-cart-add-downloadable
    title: Add Item (downloadable)
    description: Downloadable products require links — a list of downloadable-link ids.
    query: |
      mutation AddItem($input: addItemAdminCartInput!) {
        addItemAdminCart(input: $input) {
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
          "productId": 2506,
          "quantity": 1,
          "links": [
            1,
            2
          ]
        }
      }
    response: |
      {
        "data": {
          "addItemAdminCart": {
            "adminCart": {
              "itemsCount": 1,
              "grandTotal": 100,
              "formattedGrandTotal": "$100.00",
              "success": true,
              "message": "Item added to cart."
            }
          }
        }
      }
---

# Add Item to Cart

GraphQL counterpart of `POST /api/admin/carts/{id}/items`. Mutation field is
`addItemAdminCart`. Input type is `addItemAdminCartInput`.

### Select cart fields, not `id`

This mutation returns the updated cart — select `itemsCount`, `grandTotal`,
`formattedGrandTotal`, `couponCode`, `success`, `message`, etc. Do **not** select
`id` (or `_id`): this is an action result with no addressable record, so the
auto-generated IRI field is `null` and selecting it errors out the whole payload.
The same applies to every cart-write mutation.

**Prerequisites** — The example uses an illustrative cart id. Admin cart endpoints only operate on **draft carts** (`is_active=0`) — storefront carts are rejected by the admin cart guard. Create a draft cart first with the [`createAdminDraftCart`](../../customers/create-draft-cart.md) mutation and use the returned `cartId`.

## Operation

| Operation | Type |
|-----------|------|
| `addItemAdminCart(input: addItemAdminCartInput!)` | Mutation |

## Product type fields

Each product type needs its own selection fields (besides `productId` and
`quantity`). These are typed input fields, so they work over GraphQL exactly as
they do over REST:

| Product type | Field |
|--------------|-------|
| Simple / Virtual | — |
| Configurable | `selectedConfigurableOption` — the chosen variant's product id |
| Downloadable | `links` — list of downloadable-link ids |
| Grouped      | `groupedQuantities` — list of `{ productId, quantity }` |
| Bundle       | `bundleOptions` — list of `{ optionId, productIds, quantity }` |
| Booking      | not supported in admin Create-Order (returns an error) |

See the examples dropdown for a per-type sample.

## Errors

| Cause | Response |
|-------|----------|
| `productId` missing | `errors[]` — `productId is required.` |
| Product not found | `errors[]` — `Product not found.` |
| **Booking product** — admin draft orders do not support booking products | `errors[]` — `Booking products cannot be added to an admin draft order. Booking purchases must be made through the customer storefront.` Sample: `{"errors":[{"message":"Booking products cannot be added to an admin draft order. Booking purchases must be made through the customer storefront.","extensions":{"category":"user"}}],"data":{"addItemAdminCart":null}}` |
| Cart is an active storefront cart | `errors[]` — `This cart cannot be modified through the admin API.` |
