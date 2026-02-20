---
outline: false
examples:
  - id: create-wishlist-basic
    title: Add Product to Wishlist
    description: Add a product to the authenticated customer's wishlist.
    query: |
      mutation CreateWishlist($input: createWishlistInput!) {
        createWishlist(input: $input) {
          wishlist {
            id
            _id
            product {
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
          "productId": 1
        }
      }
    response: |
      {
        "data": {
          "createWishlist": {
            "wishlist": {
              "id": "/api/shop/wishlists/70",
              "_id": 70,
              "product": {
                "id": "/api/shop/products/1",
                "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                "price": "100"
              },
              "createdAt": "2026-02-17T20:17:36+05:30"
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
      - error: DUPLICATE_ITEM
        cause: This product is already in the wishlist
        solution: Use the toggle mutation or check existing wishlist items
---

# Create Wishlist Item

## About

The `createWishlist` mutation adds a product to the authenticated customer's wishlist. Use this mutation to:

- Add products to the wishlist from product pages
- Implement "Add to Wishlist" buttons and heart icons
- Save products for later purchase
- Build wishlist flows programmatically

The customer is automatically detected from the Bearer token — no customer ID is needed in the input.

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `productId` | `Int` | The ID of the product to add to the wishlist. |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `wishlist` | `Wishlist!` | The newly created wishlist item. |
| `wishlist.id` | `ID!` | IRI identifier (e.g. `/api/shop/wishlists/70`). |
| `wishlist._id` | `Int!` | Numeric identifier. |
| `wishlist.product` | `Product!` | The associated product with id, name, price. |
| `wishlist.createdAt` | `String` | Timestamp when the item was added. |
