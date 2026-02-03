---
outline: false
examples:
  - id: add-simple-product-to-cart
    title: Add Simple Product to Cart
    description: Add a simple product with quantity to the shopping cart.
    query: |
      mutation createAddProductInCart(
          $productId: Int!
          $quantity: Int!
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
          }
        ) {
          addProductInCart {
            id
            _id      
            cartToken
            customerId
            channelId
            subtotal
            baseSubtotal
            discountAmount
            baseDiscountAmount
            taxAmount
            baseTaxAmount
            shippingAmount
            baseShippingAmount
            grandTotal
            baseGrandTotal
            formattedSubtotal
            formattedDiscountAmount
            formattedTaxAmount
            formattedShippingAmount
            formattedGrandTotal
            couponCode
            items {
              totalCount
              pageInfo {
                startCursor
                endCursor
                hasNextPage
                hasPreviousPage
              }
              edges {
                cursor
                node {
                  id
                  cartId
                  productId
                  name
                  sku
                  quantity
                  price
                  basePrice
                  total
                  baseTotal
                  discountAmount
                  baseDiscountAmount
                  taxAmount
                  baseTaxAmount
                  type
                  formattedPrice
                  formattedTotal
                  priceInclTax
                  basePriceInclTax
                  formattedPriceInclTax
                  totalInclTax
                  baseTotalInclTax
                  formattedTotalInclTax
                  productUrlKey
                  canChangeQty
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
            haveStockableItems
            paymentMethod
            paymentMethodTitle
            subTotalInclTax
            baseSubTotalInclTax
            formattedSubTotalInclTax
            taxTotal
            formattedTaxTotal
            shippingAmountInclTax
            baseShippingAmountInclTax
            formattedShippingAmountInclTax
          }
        }
      }
    variables: |
      {
          "productId": 1,
          "quantity": 9
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "1",
              "cartToken": "1",
              "items": [
                "totalCount": 1,
                "edges": [
                    {
                      "cursor": "MA==",
                      "node": {
                          "id": "5648",
                          "cartId": 4484,
                          "productId": 2394,
                          "name": "Verdant Luxe 2-Seater Velvet Sofa Green",
                          "sku": "sku-234235345346-variant-2",
                          "quantity": 9,
                          "price": 500,
                          "basePrice": 500,
                          "total": 4500,
                          "baseTotal": 4500,
                          "discountAmount": 0,
                          "baseDiscountAmount": 0,
                      }
                    }
                ]
              ]
            },
            "success": true,
            "message": "Product added to cart successfully"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify product ID
      - error: OUT_OF_STOCK
        cause: Product quantity not available
        solution: Reduce quantity or choose different product
---

# Add to Cart

## About

The `addProductToCart` mutation adds a product to a customer's shopping cart. Use this mutation to:

- Add products from product detail pages to cart
- Implement "Add to Cart" buttons and flows
- Add products programmatically from search results
- Handle quantity selection and variant options
- Update cart inventory reservations
- Track product additions for analytics

This mutation validates product availability, applies applicable pricing rules, and updates the cart total. It handles both simple products and configurable products with variants.


## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cart_id` | `String!` | Cart token from `createCart` mutation. Identifies which cart to add to. |
| `product_id` | `ID!` | The product to add. Use product ID from product queries. |
| `quantity` | `Int!` | Number of units to add (must be >= 1). |
| `variant_id` | `ID` | For configurable products, the specific variant to add. |
| `options` | `[CartItemOption!]` | Product-specific options (colors, sizes, custom text). |
| `custom_attributes` | `[CustomAttribute!]` | Custom product attributes and their selected values. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `cart` | `Cart!` | Updated cart with the new item added. |
| `cartItem` | `CartItem!` | The newly added cart line item. |
| `cartItem.id` | `String!` | Unique cart item identifier. |
| `cartItem.product` | `Product!` | Product information. |
| `cartItem.quantity` | `Int!` | Quantity added. |
| `cartItem.price` | `Float!` | Unit price at time of addition. |
| `cartItem.lineTotal` | `Float!` | Total for this line item. |
| `message` | `String!` | Success message or error description. |
| `success` | `Boolean!` | Indicates successful addition. |
| `errors` | `[ErrorMessage!]` | Validation errors (insufficient stock, invalid options, etc.). |

