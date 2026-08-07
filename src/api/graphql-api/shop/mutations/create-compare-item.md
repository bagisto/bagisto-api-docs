---
outline: false
examples:
  - id: create-compare-item-basic
    title: Add Product to Compare List
    description: Add a product to the authenticated customer's comparison list. The customer is auto-detected from the Bearer token.
    query: |
      mutation CreateCompareItem($input: createCompareItemInput!) {
        createCompareItem(input: $input) {
          compareItem {
            id
            _id
            createdAt
            updatedAt
            product {
              id
              _id
              sku
              type
              name
              description
              shortDescription
              price
              formattedPrice
              minimumPrice
              formattedMinimumPrice
              maximumPrice
              formattedMaximumPrice
              guestCheckout
              locale
              channel
            }
            customer {
              id
              firstName
              lastName
              gender
              dateOfBirth
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 2514
        }
      }
    response: |
      {
        "data": {
          "createCompareItem": {
            "compareItem": {
              "id": "/api/shop/compare_items/38",
              "_id": 38,
              "createdAt": "2026-04-06T18:50:10+05:30",
              "updatedAt": "2026-04-06T18:50:10+05:30",
              "product": {
                "id": "/api/shop/compare_items/38",
                "_id": 2514,
                "sku": "SP-003",
                "type": "simple",
                "name": "Arctic Touchscreen Winter Gloves",
                "description": "Introducing the Arctic Touchscreen Winter Gloves – where warmth, style, and connectivity meet to enhance your winter experience. Crafted from high-quality acrylic, these gloves are designed to provide exceptional warmth and durability.",
                "shortDescription": "Stay connected and warm with our Arctic Touchscreen Winter Gloves. These gloves are crafted from high-quality acrylic for warmth and durability with a touchscreen-compatible design.",
                "price": "21",
                "formattedPrice": "$21.00",
                "minimumPrice": "17",
                "formattedMinimumPrice": "$17.00",
                "maximumPrice": "17",
                "formattedMaximumPrice": "$17.00",
                "guestCheckout": "1",
                "locale": null,
                "channel": null
              },
              "customer": {
                "id": "/api/shop/customers/122",
                "firstName": "John",
                "lastName": "Doe",
                "gender": "Male",
                "dateOfBirth": "1990-01-15"
              }
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
        cause: This product is already in the comparison list
        solution: Check existing compare items before adding
---

# Create Compare Item

## About

The `createCompareItem` mutation adds a product to the authenticated customer's comparison list. Use this mutation to:

- Add products to the compare list from product pages
- Implement "Add to Compare" buttons
- Build product comparison flows programmatically
- Allow customers to compare product features side by side

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
| `productId` | `Int` | The ID of the product to add to the comparison list. |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `compareItem` | `CompareItem!` | The newly created compare item. |
| `compareItem.id` | `ID!` | IRI identifier (e.g. `/api/shop/compare_items/607`). |
| `compareItem._id` | `Int!` | Numeric identifier. |
| `compareItem.product` | `Product!` | The associated product. |
| `compareItem.customer` | `Customer!` | The authenticated customer. |
| `compareItem.createdAt` | `String` | Timestamp when the item was added. |
| `compareItem.updatedAt` | `String` | Timestamp when the item was last updated. |
