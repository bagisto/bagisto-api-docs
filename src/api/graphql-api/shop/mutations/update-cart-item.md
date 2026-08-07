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
        "cartItemId": 5883,
        "quantity": 4
      }
    response: |
      {
        "data": {
          "createUpdateCartItem": {
            "updateCartItem": {
              "id": "4682",
              "_id": 4682,
              "cartToken": "4682",
              "customerId": 19,
              "channelId": 1,
              "subtotal": 780,
              "baseSubtotal": 780,
              "discountAmount": 0,
              "baseDiscountAmount": 0,
              "taxAmount": 0,
              "baseTaxAmount": 0,
              "shippingAmount": 0,
              "baseShippingAmount": 0,
              "grandTotal": 780,
              "baseGrandTotal": 780,
              "formattedSubtotal": "$780.00",
              "formattedDiscountAmount": "$0.00",
              "formattedTaxAmount": "$0.00",
              "formattedShippingAmount": "$0.00",
              "formattedGrandTotal": "$780.00",
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
                      "id": "5883",
                      "cartId": 4682,
                      "productId": 2511,
                      "name": "Fine Dining Table Reservation",
                      "sku": "FINE-DINING-TABLE-RESERVATION",
                      "quantity": 4,
                      "price": 195,
                      "basePrice": 195,
                      "total": 780,
                      "baseTotal": 780,
                      "discountAmount": 0,
                      "baseDiscountAmount": 0,
                      "taxAmount": 0,
                      "baseTaxAmount": 0,
                      "type": "booking",
                      "formattedPrice": "$195.00",
                      "formattedTotal": "$780.00",
                      "priceInclTax": 195,
                      "basePriceInclTax": 195,
                      "formattedPriceInclTax": "$195.00",
                      "totalInclTax": 780,
                      "baseTotalInclTax": 780,
                      "formattedTotalInclTax": "$780.00",
                      "productUrlKey": "fine-dining-table-reservation",
                      "canChangeQty": true
                    }
                  }
                ]
              },
              "success": true,
              "message": "Cart item updated successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 4,
              "itemsCount": 1,
              "haveStockableItems": false,
              "paymentMethod": null,
              "paymentMethodTitle": null,
              "subTotalInclTax": 780,
              "baseSubTotalInclTax": 780,
              "formattedSubTotalInclTax": "$780.00",
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

## Items whose quantity cannot change

Event and appointment booking products reject a quantity update once they are in the cart. Their quantity is fixed by the booking itself — an event booking's ticket counts are set at add-to-cart time, and an appointment booking is always a single slot.

Read `canChangeQty` on the cart item to tell the two apart: it is `false` for these products. Changing the amount then means removing the item and adding it again with the new configuration, which is what the storefront does.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `cartItemId` | `Int!` | The numeric ID of the cart item to update. |
| `quantity` | `Int!` | The new quantity to set for the cart item. |

Take `cartItemId` from the `id` field on a cart item — [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) and [Get Cart](/api/graphql-api/shop/queries/get-cart) both return it at `items.edges[].node.id`.

## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the Guest Cart Token `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

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

