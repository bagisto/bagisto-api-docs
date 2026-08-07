---
outline: false
examples:
  - id: delete-compare-item-basic
    title: Remove Product from Compare List
    description: Remove a product from the customer's comparison list by its IRI.
    query: |
      mutation DeleteCompareItem($input: deleteCompareItemInput!) {
        deleteCompareItem(input: $input) {
          compareItem {
            id
            _id
            product {
              id
              _id
              sku
              type
              name
              price
              formattedPrice
              minimumPrice
              formattedMinimumPrice
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/compare_items/38"
        }
      }
    response: |
      {
        "data": {
          "deleteCompareItem": {
            "compareItem": {
              "id": "/api/shop/compare_items/38",
              "_id": 38,
              "product": {
                "id": "/api/shop/compare_items/38",
                "_id": 2514,
                "sku": "SP-003",
                "type": "simple",
                "name": "Arctic Touchscreen Winter Gloves",
                "price": "21",
                "formattedPrice": "$21.00",
                "minimumPrice": "17",
                "formattedMinimumPrice": "$17.00"
              }
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: ITEM_NOT_FOUND
        cause: Compare item does not exist or belongs to another customer
        solution: Use a valid compare item IRI from the compareItems collection query
---

# Delete Compare Item

## About

The `deleteCompareItem` mutation removes a product from the authenticated customer's comparison list. Use this mutation to:

- Remove individual products from the compare list
- Implement "Remove from Compare" buttons
- Clean up comparison lists programmatically

## Authentication

This mutation requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID!` | The IRI of the compare item to delete (e.g. `/api/shop/compare_items/606`). |
| `clientMutationId` | `String` | Optional client-side mutation identifier for tracking. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `compareItem` | `CompareItem!` | The deleted compare item. |
| `compareItem.id` | `ID!` | IRI identifier of the removed item. |
| `compareItem.product` | `Product!` | Product details of the removed item. |
