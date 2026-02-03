---
outline: false
examples:
  - id: get-cart-details
    title: Get Cart Details
    description: Retrieve the current shopping cart with all items.
    query: |
      mutation readCart {
        createReadCart(input: {}) {
          readCart {
            id
            _id
            grandTotal
            discountAmount
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
    response: |
      {
        "data": {
            "createReadCart": {
                "readCart": {
                    "id": "4484",
                    "_id": 4484,
                    "grandTotal": 4500,
                    "discountAmount": 0,
                    "cartToken": "4484",
                    "customerId": 122,
                    "channelId": 1,
                    "subtotal": 4500,
                    "baseSubtotal": 4500,
                    "baseDiscountAmount": 0,
                    "taxAmount": 0,
                    "baseTaxAmount": 0,
                    "shippingAmount": 0,
                    "baseShippingAmount": 0,
                    "baseGrandTotal": 4500,
                    "formattedSubtotal": "$4,500.00",
                    "formattedDiscountAmount": "$0.00",
                    "formattedTaxAmount": "$0.00",
                    "formattedShippingAmount": "$0.00",
                    "formattedGrandTotal": "$4,500.00",
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
                                    "quantity": 9,
                                    "price": 500,
                                    "basePrice": 500,
                                    "total": 4500,
                                    "baseTotal": 4500,
                                    "discountAmount": 0,
                                    "baseDiscountAmount": 0,
                                    "taxAmount": 0,
                                    "baseTaxAmount": 0,
                                    "type": "simple",
                                    "formattedPrice": "$500.00",
                                    "formattedTotal": "$4,500.00",
                                    "priceInclTax": 500,
                                    "basePriceInclTax": 500,
                                    "formattedPriceInclTax": "$500.00",
                                    "totalInclTax": 4500,
                                    "baseTotalInclTax": 4500,
                                    "formattedTotalInclTax": "$4,500.00",
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
                    "itemsQty": 9,
                    "itemsCount": 1,
                    "haveStockableItems": true,
                    "paymentMethod": null,
                    "paymentMethodTitle": null,
                    "subTotalInclTax": 4500,
                    "baseSubTotalInclTax": 4500,
                    "formattedSubTotalInclTax": "$4,500.00",
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
      - error: CART_NOT_FOUND
        cause: Cart ID is invalid or expired
        solution: Create a new cart or check the cart token
      - error: INVALID_CART_ID
        cause: Invalid cart ID format
        solution: Provide valid cart ID
---

# Get Cart

## About

The `getCart` query retrieves the contents and summary information for a customer's shopping cart. Use this query to:

- Display cart previews in sidebars and mini carts
- Render the full shopping cart page
- Calculate cart totals with applied discounts and taxes
- Show line item details and product information
- Track cart state throughout the checkout process
- Sync cart data with external inventory systems

This query returns complete cart information including all items, quantities, prices, and applicable discounts/taxes needed for checkout and order processing.
 
## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String!` | Unique cart identifier/token. |
| `items` | `[CartItem!]!` | Array of products in the cart. |
| `items.id` | `String!` | Unique cart line item ID. |
| `items.product` | `Product!` | Product object with id, name, sku. |
| `items.quantity` | `Int!` | Number of items ordered. |
| `items.price` | `Float!` | Unit price at time of adding to cart. |
| `items.lineTotal` | `Float!` | Total for line item (price × quantity). |
| `itemsCount` | `Int!` | Total number of line items in cart. |
| `itemsQuantity` | `Int!` | Total quantity of all items. |
| `subTotal` | `Float!` | Cart subtotal before discounts and taxes. |
| `discountAmount` | `Float` | Total discount applied to cart. |
| `taxAmount` | `Float!` | Calculated tax on cart. |
| `shippingAmount` | `Float!` | Selected shipping cost. |
| `total` | `Float!` | Grand total (subtotal + tax + shipping - discounts). |
| `appliedCoupons` | `[CouponCode!]` | Active coupon codes applied to cart. |
| `shippingMethods` | `[ShippingMethod!]` | Available shipping options and costs. |
| `currency` | `String!` | Cart currency code (e.g., USD, EUR). |
| `createdAt` | `DateTime!` | Cart creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |

