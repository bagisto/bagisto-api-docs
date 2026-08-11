---
outline: false
examples:
  - id: merge-guest-cart
    title: Merge Guest Cart with Customer Cart
    description: Merge a guest cart into the authenticated customer's cart. Pass the guest cart's _id as cartId and the customer's Bearer token in the Authorization header. Returns the full merged cart with all items.
    query: |
      mutation createMergeCart {
        createMergeCart(input: {
          cartId: 4929
        }) {
          mergeCart {
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
                  baseImage
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
                  options
                }
              }
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "createMergeCart": {
            "mergeCart": {
              "grandTotal": 2584,
              "discountAmount": 0,
              "cartToken": "4928",
              "customerId": 19,
              "channelId": 1,
              "subtotal": 2584,
              "baseSubtotal": 2584,
              "baseDiscountAmount": 0,
              "taxAmount": 0,
              "baseTaxAmount": 0,
              "shippingAmount": 0,
              "baseShippingAmount": 0,
              "baseGrandTotal": 2584,
              "formattedSubtotal": "$2,584.00",
              "formattedDiscountAmount": "$0.00",
              "formattedTaxAmount": "$0.00",
              "formattedShippingAmount": "$0.00",
              "formattedGrandTotal": "$2,584.00",
              "couponCode": null,
              "success": true,
              "message": "Guest cart merged successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 2,
              "itemsCount": 2,
              "haveStockableItems": true,
              "paymentMethod": null,
              "paymentMethodTitle": null,
              "subTotalInclTax": 2584,
              "baseSubTotalInclTax": 2584,
              "formattedSubTotalInclTax": "$2,584.00",
              "taxTotal": 0,
              "formattedTaxTotal": "$0.00",
              "shippingAmountInclTax": 0,
              "baseShippingAmountInclTax": 0,
              "formattedShippingAmountInclTax": "$0.00",
              "items": {
                "totalCount": 2,
                "pageInfo": {
                  "startCursor": "MA==",
                  "endCursor": "MQ==",
                  "hasNextPage": false,
                  "hasPreviousPage": false
                },
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "6258",
                      "cartId": 4928,
                      "productId": 2500,
                      "name": "Mint Axis Unisex Tailored Blazer",
                      "sku": "MINT-BLAZER-001",
                      "quantity": 1,
                      "price": 544,
                      "basePrice": 544,
                      "total": 544,
                      "baseImage": "{\"small_image_url\":\"https://api-demo.bagisto.com/cache/small/product/2503/XcPrmG5JXJNJ6WdOmGOYkY1kMyVvWc4DnIUaUiJG.webp\",\"original_image_url\":\"https://api-demo.bagisto.com/cache/original/product/2503/XcPrmG5JXJNJ6WdOmGOYkY1kMyVvWc4DnIUaUiJG.webp\"}",
                      "baseTotal": 544,
                      "discountAmount": 0,
                      "baseDiscountAmount": 0,
                      "taxAmount": 0,
                      "baseTaxAmount": 0,
                      "type": "configurable",
                      "formattedPrice": "$544.00",
                      "formattedTotal": "$544.00",
                      "priceInclTax": 544,
                      "basePriceInclTax": 544,
                      "formattedPriceInclTax": "$544.00",
                      "totalInclTax": 544,
                      "baseTotalInclTax": 544,
                      "formattedTotalInclTax": "$544.00",
                      "productUrlKey": "mint-axis-unisex-tailored-blazer",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 8,
                              "option_label": "L",
                              "attribute_name": "Size"
                            }
                          }
                        ]
                      }
                    }
                  },
                  {
                    "cursor": "MQ==",
                    "node": {
                      "id": "6262",
                      "cartId": 4928,
                      "productId": 123,
                      "name": "Zoe Tank",
                      "sku": "ZOE-TANK-001",
                      "quantity": 1,
                      "price": 2040,
                      "basePrice": 2040,
                      "total": 2040,
                      "baseImage": "{\"small_image_url\":\"https://api-demo.bagisto.com/cache/small/product/124/Ba8yoli6aFgjpiFLUcfEpuHaGzbaRCYu7wEvKR2d.webp\",\"original_image_url\":\"https://api-demo.bagisto.com/cache/original/product/124/Ba8yoli6aFgjpiFLUcfEpuHaGzbaRCYu7wEvKR2d.webp\"}",
                      "baseTotal": 2040,
                      "discountAmount": 0,
                      "baseDiscountAmount": 0,
                      "taxAmount": 0,
                      "baseTaxAmount": 0,
                      "type": "configurable",
                      "formattedPrice": "$2,040.00",
                      "formattedTotal": "$2,040.00",
                      "priceInclTax": 2040,
                      "basePriceInclTax": 2040,
                      "formattedPriceInclTax": "$2,040.00",
                      "totalInclTax": 2040,
                      "baseTotalInclTax": 2040,
                      "formattedTotalInclTax": "$2,040.00",
                      "productUrlKey": "zoe-tank",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 6,
                              "option_label": "S",
                              "attribute_name": "Size"
                            }
                          },
                          {
                            "node": {
                              "option_id": 1,
                              "option_label": "Red",
                              "attribute_name": "Color"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Login and provide a valid customer authentication token in the Authorization header
      - error: CART_NOT_FOUND
        cause: The guest cart ID does not exist or has already been merged
        solution: Verify the cartId is a valid guest cart _id from the Create Cart mutation
      - error: EMPTY_CART
        cause: The guest cart has no items to merge
        solution: Ensure the guest cart contains at least one item before merging
---

# Merge Cart

## About

The `createMergeCart` mutation merges a guest (unauthenticated) cart into the authenticated customer's cart. This is essential for preserving the shopping experience when a guest user logs in after adding items to their cart. Use this mutation to:

- Transfer guest cart items to the customer's cart after login
- Preserve products added during anonymous browsing
- Combine guest and existing customer cart items seamlessly

## How It Works

1. A guest user browses the store and adds items to a cart using the [Create Cart](/api/graphql-api/shop/mutations/create-cart) mutation, which returns a `cartToken` and cart `_id`
2. The guest decides to log in via the [Customer Login](/api/graphql-api/shop/mutations/customer-login) mutation and receives a Bearer token
3. The `createMergeCart` mutation is called with the guest cart's `_id` as `cartId` and the customer's Bearer token in the `Authorization` header
4. The system merges all guest cart items into the customer's cart and returns the updated cart state

## Authentication

This mutation requires **customer authentication**. The Bearer token identifies which customer's cart the guest cart should be merged into.

```
Authorization: Bearer <customerAccessToken>
X-STOREFRONT-KEY: <storefrontKey>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `cartId` | `Int!` | Yes | The `_id` of the guest cart to merge. This is the numeric ID returned by the [Create Cart](/api/graphql-api/shop/mutations/create-cart) mutation during the guest session. |

## Response

| Field | Type | Description |
|-------|------|-------------|
| `id` | `String` | The merged cart ID (customer's cart) |
| `itemsCount` | `Int` | Total number of distinct items in the merged cart |
| `grandTotal` | `Float` | Updated grand total of the merged cart |
| `success` | `Boolean` | Whether the merge was successful |
| `message` | `String` | Success or error message |

## Typical Flow

```
Guest Session:
  1. createCartToken → get cartToken + cart _id (e.g. 364)
  2. addProductInCart → add items using guest cart token

Login:
  3. createCustomerLogin → get customer Bearer token

Merge:
  4. createMergeCart(cartId: 364) → with customer Bearer token
     → Guest cart items are now in the customer's cart
```

A successful merge invalidates the guest cart. The guest session's `cartToken` stops working from that point, so every later cart call must use the customer's Bearer token instead.

## Related Documentation

- [Create Cart](/api/graphql-api/shop/mutations/create-cart) — Create a guest cart and get the cart `_id`
- [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) — Add products to cart
- [Get Cart](/api/graphql-api/shop/queries/get-cart) — View the merged cart contents
- [Customer Login](/api/graphql-api/shop/mutations/customer-login) — Authenticate and get Bearer token
