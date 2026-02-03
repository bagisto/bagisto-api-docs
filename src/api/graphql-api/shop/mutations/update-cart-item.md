---
outline: false
examples:
  - id: update-cart-item-quantity
    title: Update Cart Item Quantity
    description: Modify the quantity of an item in the shopping cart.
    query: |
      mutation createUpdateCartItem(
          $cartItemId: Int!
          $quantity: Int!
      ) {
        createUpdateCartItem(
          input: {
            cartItemId: $cartItemId
            quantity: $quantity
          }
        ) {
          updateCartItem {
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
          "cartItemId": 3,
          "quantity": 1
      }
    response: |
      {
        "data": {
            "createUpdateCartItem": {
                "updateCartItem": {
                    "id": "4484",
                    "_id": 4484,
                    "cartToken": "4484",
                    "customerId": 122,
                    "channelId": 1,
                    "subtotal": 500,
                    "baseSubtotal": 500,
                    "discountAmount": 0,
                    "baseDiscountAmount": 0,
                    "taxAmount": 0,
                    "baseTaxAmount": 0,
                    "shippingAmount": 0,
                    "baseShippingAmount": 0,
                    "grandTotal": 500,
                    "baseGrandTotal": 500,
                    "formattedSubtotal": "$500.00",
                    "formattedDiscountAmount": "$0.00",
                    "formattedTaxAmount": "$0.00",
                    "formattedShippingAmount": "$0.00",
                    "formattedGrandTotal": "$500.00",
                    "couponCode": null,
                    "items": {
                        "totalCount": 1,
                        "pageInfo": {
                            "startCursor": "MA==",
                            "endCursor": "MA==",
                            "hasNextPage": false,
                            "hasPreviousPage": false
                        },
                        "edges": [
                            {
                                "cursor": "MA==",
                                "node": {
                                    "id": "5648",
                                    "cartId": 4484,
                                    "productId": 2394,
                                    "name": "Verdant Luxe 2-Seater Velvet Sofa Green",
                                    "sku": "sku-234235345346-variant-2",
                                    "quantity": 1,
                                    "price": 500,
                                    "basePrice": 500,
                                    "total": 500,
                                    "baseTotal": 500,
                                    "discountAmount": 0,
                                    "baseDiscountAmount": 0,
                                    "taxAmount": 0,
                                    "baseTaxAmount": 0,
                                    "type": "simple",
                                    "formattedPrice": "$500.00",
                                    "formattedTotal": "$500.00",
                                    "priceInclTax": 500,
                                    "basePriceInclTax": 500,
                                    "formattedPriceInclTax": "$500.00",
                                    "totalInclTax": 500,
                                    "baseTotalInclTax": 500,
                                    "formattedTotalInclTax": "$500.00",
                                    "productUrlKey": "sku-234235345346-variant-2",
                                    "canChangeQty": true
                                }
                            }
                        ]
                    },
                    "success": null,
                    "message": null,
                    "sessionToken": null,
                    "isGuest": false,
                    "itemsQty": 1,
                    "itemsCount": 1,
                    "haveStockableItems": true,
                    "paymentMethod": null,
                    "paymentMethodTitle": null,
                    "subTotalInclTax": 500,
                    "baseSubTotalInclTax": 500,
                    "formattedSubTotalInclTax": "$500.00",
                    "taxTotal": 0,
                    "formattedTaxTotal": "$0.00",
                    "shippingAmountInclTax": 0,
                    "baseShippingAmountInclTax": 0,
                    "formattedShippingAmountInclTax": "$0.00"
                }
            }
        }
      }
    commonErrors:
      - error: ITEM_NOT_FOUND
        cause: Cart item ID does not exist
        solution: Verify item ID
      - error: INVALID_QUANTITY
        cause: Quantity is invalid or exceeds stock
        solution: Use valid quantity
---

# Update Cart Item

## About

The `updateCartItem` mutation modifies the quantity or options of an existing cart item. Use this mutation to:

- Update product quantities in the shopping cart
- Adjust cart items from the cart page
- Modify product options or variants after adding
- Handle quantity increase/decrease operations
- Validate inventory availability for new quantities
- Recalculate cart totals and discounts

This mutation validates the new quantity against available inventory and updates cart totals including any applicable discounts and taxes.

## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```
 
## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `createUpdateCartItem` | `Cart!` | Updated cart with modified item. |
| `updateCartItem` | `CartItem!` | The updated cart. |
| `message` | `String!` | Success or error message. |
| `success` | `Boolean!` | Indicates successful update. |
| `errors` | `[ErrorMessage!]` | Validation errors if quantity unavailable. |

