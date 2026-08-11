---
outline: false
examples:
  - id: toggle-wishlist-add
    title: Toggle Wishlist - Add Item
    description: Toggle a product in the wishlist. If the product is not in the wishlist, it gets added.
    query: |
      mutation ToggleWishlist($input: toggleWishlistInput!) {
        toggleWishlist(input: $input) {
          wishlist {
            id
            _id
            product {
              _id
              id
              name
              price
            }
            createdAt
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 2499
        }
      }
    response: |
      {
        "data": {
          "toggleWishlist": {
            "wishlist": {
              "id": "/api/shop/wishlists/89",
              "_id": 89,
              "product": {
                "_id": 2499,
                "id": "/api/shop/wishlists/89",
                "name": "Ivory Frost Classic Overcoat XL",
                "price": "500"
              },
              "createdAt": "2026-04-07T13:55:19+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: PRODUCT_NOT_FOUND
        cause: The product ID does not exist
        solution: Use a valid product ID that exists in the catalog

  - id: toggle-wishlist-remove
    title: Toggle Wishlist - Remove Item
    description: Toggle a product that already exists in the wishlist. The item is removed and an error-style message is returned with toggleWishlist set to null.
    query: |
      mutation ToggleWishlist($input: toggleWishlistInput!) {
        toggleWishlist(input: $input) {
          wishlist {
            id
            _id
            product {
              _id
              id
              name
              price
            }
            createdAt
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 2499
        }
      }
    response: |
      {
        "errors": [
          {
            "message": "Item Successfully Removed From Wishlist",
            "locations": [
              {
                "line": 2,
                "column": 3
              }
            ],
            "path": [
              "toggleWishlist"
            ]
          }
        ],
        "data": {
          "toggleWishlist": null
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
---

# Toggle Wishlist Item

## About

The `toggleWishlist` mutation adds or removes a product from the authenticated customer's wishlist based on its current state. Use this mutation to:

- Implement toggle-style wishlist buttons (heart icons)
- Add a product if it's not in the wishlist
- Remove a product if it's already in the wishlist
- Simplify wishlist UI logic with a single mutation

The two outcomes come back in different shapes, which is the one thing to get right when wiring a heart icon:

- **Added** — a normal success payload carrying the new `wishlist` object.
- **Removed** — the wishlist object is `null` and the confirmation arrives in `errors[]` as `"Item Successfully Removed From Wishlist"`.

A removal therefore looks like a failure to a client that treats any `errors[]` entry as one. Read the message before deciding, or call [Create Wishlist](/api/graphql-api/shop/mutations/create-wishlist) and [Delete Wishlist](/api/graphql-api/shop/mutations/delete-wishlist) separately when an unambiguous result matters more than a single round trip.

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `productId` | `Int` | The ID of the product to toggle in the wishlist. |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

**When item is added:**

| Field | Type | Description |
|-------|------|-------------|
| `wishlist` | `Wishlist!` | The newly created wishlist item. |
| `wishlist.id` | `ID!` | IRI identifier (e.g. `/api/shop/wishlists/71`). |
| `wishlist._id` | `Int!` | Numeric identifier. |
| `wishlist.product` | `Product!` | The associated product. |
| `wishlist.createdAt` | `String` | Timestamp when the item was added. |

**When item is removed:**

| Field | Type | Description |
|-------|------|-------------|
| `errors[].message` | `String!` | `"Item Successfully Removed From Wishlist"` |
