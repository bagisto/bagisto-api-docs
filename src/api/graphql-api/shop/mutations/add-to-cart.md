---
outline: false
examples:
  - id: add-simple-product-to-cart
    title: Add Simple Product to Cart
    description: Add a simple product to the cart. Simple products only require `productId` and `quantity` — no additional options are needed.
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
        "productId": 2359,
        "quantity": 1
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4635",
              "_id": 4635,
              "cartToken": "4635",
              "customerId": 19,
              "channelId": 1,
              "subtotal": 4000,
              "baseSubtotal": 4000,
              "discountAmount": 0,
              "baseDiscountAmount": 0,
              "taxAmount": 0,
              "baseTaxAmount": 0,
              "shippingAmount": 0,
              "baseShippingAmount": 0,
              "grandTotal": 4000,
              "baseGrandTotal": 4000,
              "formattedSubtotal": "$4,000.00",
              "formattedDiscountAmount": "$0.00",
              "formattedTaxAmount": "$0.00",
              "formattedShippingAmount": "$0.00",
              "formattedGrandTotal": "$4,000.00",
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
                      "id": "5809",
                      "cartId": 4635,
                      "productId": 2359,
                      "name": "Horizon Arc 49\" OLED Curved Gaming Monitor",
                      "sku": "HORIZON-MONITOR-49",
                      "quantity": 1,
                      "price": 4000,
                      "basePrice": 4000,
                      "total": 4000,
                      "baseTotal": 4000,
                      "discountAmount": 0,
                      "baseDiscountAmount": 0,
                      "taxAmount": 0,
                      "baseTaxAmount": 0,
                      "type": "simple",
                      "formattedPrice": "$4,000.00",
                      "formattedTotal": "$4,000.00",
                      "priceInclTax": 4000,
                      "basePriceInclTax": 4000,
                      "formattedPriceInclTax": "$4,000.00",
                      "totalInclTax": 4000,
                      "baseTotalInclTax": 4000,
                      "formattedTotalInclTax": "$4,000.00",
                      "productUrlKey": "horizon-arc-49-oled-curved-gaming-monitor",
                      "canChangeQty": true
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1,
              "haveStockableItems": true,
              "paymentMethod": null,
              "paymentMethodTitle": null,
              "subTotalInclTax": 4000,
              "baseSubTotalInclTax": 4000,
              "formattedSubTotalInclTax": "$4,000.00",
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
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist or product is inactive
        solution: Verify the product ID exists and the product status is active
      - error: OUT_OF_STOCK
        cause: Requested quantity exceeds available stock
        solution: Reduce quantity or choose a different product

  - id: add-virtual-product-to-cart
    title: Add Virtual Product to Cart
    description: |
      Add a virtual product (e.g., a subscription, service, or digital access) to the cart. Virtual products are added the same way as simple products — only `productId` and `quantity` are required. Virtual products have no physical shipment, so `haveStockableItems` will be `false` and no shipping step is needed during checkout.
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
        "productId": 2505,
        "quantity": 1
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4645",
              "_id": 4645,
              "cartToken": "4645",
              "customerId": 19,
              "channelId": 1,
              "subtotal": 59,
              "baseSubtotal": 59,
              "discountAmount": 0,
              "baseDiscountAmount": 0,
              "taxAmount": 0,
              "baseTaxAmount": 0,
              "shippingAmount": 0,
              "baseShippingAmount": 0,
              "grandTotal": 59,
              "baseGrandTotal": 59,
              "formattedSubtotal": "$59.00",
              "formattedDiscountAmount": "$0.00",
              "formattedTaxAmount": "$0.00",
              "formattedShippingAmount": "$0.00",
              "formattedGrandTotal": "$59.00",
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
                      "id": "5842",
                      "cartId": 4645,
                      "productId": 2505,
                      "name": "HD Streaming Subscription - 1 Month Access",
                      "sku": "HD-STREAMING-SUB-1M",
                      "quantity": 1,
                      "price": 59,
                      "basePrice": 59,
                      "total": 59,
                      "baseTotal": 59,
                      "discountAmount": 0,
                      "baseDiscountAmount": 0,
                      "taxAmount": 0,
                      "baseTaxAmount": 0,
                      "type": "virtual",
                      "formattedPrice": "$59.00",
                      "formattedTotal": "$59.00",
                      "priceInclTax": 59,
                      "basePriceInclTax": 59,
                      "formattedPriceInclTax": "$59.00",
                      "totalInclTax": 59,
                      "baseTotalInclTax": 59,
                      "formattedTotalInclTax": "$59.00",
                      "productUrlKey": "hd-streaming-subscription-1-month-access",
                      "canChangeQty": true
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1,
              "haveStockableItems": false,
              "paymentMethod": null,
              "paymentMethodTitle": null,
              "subTotalInclTax": 59,
              "baseSubTotalInclTax": 59,
              "formattedSubTotalInclTax": "$59.00",
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
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist or product is inactive
        solution: Verify the product ID exists and the product status is active
      - error: OUT_OF_STOCK
        cause: Requested quantity exceeds available stock
        solution: Reduce quantity or choose a different product

  - id: add-configurable-product-to-cart
    title: Add Configurable Product to Cart
    description: |
      Add a configurable product (e.g., a product with color/size options) to the cart. Requires `selectedConfigurableOption` (the child variant product ID) and `superAttribute` (an array mapping attribute IDs to their selected option IDs).
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $quantity: Int!
        $selectedConfigurableOption: Int!
        $superAttribute: Iterable
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            selectedConfigurableOption: $selectedConfigurableOption
            superAttribute: $superAttribute
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
            grandTotal
            baseGrandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 123,
        "quantity": 1,
        "selectedConfigurableOption": 124,
        "superAttribute": [
          { "23": 1 },
          { "24": 6 }
        ]
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4634",
              "_id": 4634,
              "cartToken": "4634",
              "customerId": 19,
              "channelId": 1,
              "subtotal": 4080,
              "baseSubtotal": 4080,
              "grandTotal": 4080,
              "baseGrandTotal": 4080,
              "formattedSubtotal": "$4,080.00",
              "formattedGrandTotal": "$4,080.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5805",
                      "cartId": 4634,
                      "productId": 123,
                      "name": "Zoe Tank",
                      "sku": "SDASDAS123123",
                      "quantity": 1,
                      "price": 2040,
                      "basePrice": 2040,
                      "total": 4080,
                      "baseImage": "{\"small_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/small\\/product\\/124\\/Ba8yoli6aFgjpiFLUcfEpuHaGzbaRCYu7wEvKR2d.webp\",\"medium_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/medium\\/product\\/124\\/Ba8yoli6aFgjpiFLUcfEpuHaGzbaRCYu7wEvKR2d.webp\",\"large_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/large\\/product\\/124\\/Ba8yoli6aFgjpiFLUcfEpuHaGzbaRCYu7wEvKR2d.webp\",\"original_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/original\\/product\\/124\\/Ba8yoli6aFgjpiFLUcfEpuHaGzbaRCYu7wEvKR2d.webp\"}",
                      "baseTotal": 4080,
                      "type": "configurable",
                      "formattedPrice": "$2,040.00",
                      "formattedTotal": "$4,080.00",
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
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 2,
              "itemsCount": 1
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID or selected configurable option does not exist
        solution: Verify both the parent product ID and the child variant ID are correct
      - error: INVALID_CONFIGURATION
        cause: The superAttribute values don't match any valid variant
        solution: Ensure superAttribute maps the correct attribute IDs to valid option IDs for the selected variant
      - error: OUT_OF_STOCK
        cause: The selected variant is out of stock
        solution: Choose a different variant or reduce quantity

  - id: add-downloadable-product-to-cart
    title: Add Downloadable Product to Cart
    description: |
      Add a downloadable product to the cart. Requires `links` — an array of downloadable link IDs that the customer has selected to purchase. Link IDs can be retrieved from the product query.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $quantity: Int!
        $links: Iterable
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            links: $links
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
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
          }
        }
      }
    variables: |
      {
        "productId": 2506,
        "quantity": 1,
        "links": [2]
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4638",
              "_id": 4638,
              "cartToken": "4638",
              "subtotal": 138,
              "grandTotal": 138,
              "formattedSubtotal": "$138.00",
              "formattedGrandTotal": "$138.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5813",
                      "cartId": 4638,
                      "productId": 2506,
                      "name": "Complete Personal Finance Guide (eBook PDF)",
                      "sku": "COMPLETE-PERSONAL-FINANCE-GUIDE-EBOOK",
                      "quantity": 1,
                      "price": 138,
                      "basePrice": 138,
                      "total": 138,
                      "baseTotal": 138,
                      "type": "downloadable",
                      "formattedPrice": "$138.00",
                      "formattedTotal": "$138.00",
                      "productUrlKey": "complete-personal-finance-guide-ebook-pdf",
                      "canChangeQty": false,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "Full eBook PDF",
                              "attribute_name": "Downloads"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1,
              "haveStockableItems": false
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID
      - error: INVALID_LINKS
        cause: One or more link IDs are invalid or do not belong to this product
        solution: Use valid link IDs from the product query response

  - id: add-grouped-product-to-cart
    title: Add Grouped Product to Cart
    description: |
      Add a grouped product to the cart. Requires `groupedQty` — a JSON string mapping each associated product ID to its desired quantity. All associated products in the group must be included in the map.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $quantity: Int!
        $groupedQty: String
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            groupedQty: $groupedQty
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2516,
        "quantity": 1,
        "groupedQty": "{\"2512\":1,\"2514\":1,\"2515\":1}"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4641",
              "_id": 4641,
              "cartToken": "4641",
              "subtotal": 52,
              "grandTotal": 52,
              "formattedSubtotal": "$52.00",
              "formattedGrandTotal": "$52.00",
              "items": {
                "totalCount": 3,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5819",
                      "cartId": 4641,
                      "productId": 2512,
                      "name": "Arctic Cozy Knit Unisex Beanie",
                      "sku": "SP-001",
                      "quantity": 1,
                      "price": 14,
                      "basePrice": 14,
                      "total": 14,
                      "baseTotal": 14,
                      "type": "simple",
                      "formattedPrice": "$14.00",
                      "formattedTotal": "$14.00",
                      "productUrlKey": "arctic-cozy-knit-unisex-beanie",
                      "canChangeQty": true,
                      "options": null
                    }
                  },
                  {
                    "cursor": "MQ==",
                    "node": {
                      "id": "5820",
                      "cartId": 4641,
                      "productId": 2514,
                      "name": "Arctic Touchscreen Winter Gloves",
                      "sku": "SP-003",
                      "quantity": 1,
                      "price": 17,
                      "basePrice": 17,
                      "total": 17,
                      "baseTotal": 17,
                      "type": "simple",
                      "formattedPrice": "$17.00",
                      "formattedTotal": "$17.00",
                      "productUrlKey": "arctic-touchscreen-winter-gloves",
                      "canChangeQty": true,
                      "options": null
                    }
                  },
                  {
                    "cursor": "Mg==",
                    "node": {
                      "id": "5821",
                      "cartId": 4641,
                      "productId": 2515,
                      "name": "Arctic Warmth Wool Blend Socks",
                      "sku": "SP-004",
                      "quantity": 1,
                      "price": 21,
                      "basePrice": 21,
                      "total": 21,
                      "baseTotal": 21,
                      "type": "simple",
                      "formattedPrice": "$21.00",
                      "formattedTotal": "$21.00",
                      "productUrlKey": "arctic-warmth-wool-blend-socks",
                      "canChangeQty": true,
                      "options": null
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 3,
              "itemsCount": 3
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID
      - error: MISSING_GROUPED_QUANTITIES
        cause: Not all associated product IDs are included in groupedQty
        solution: Include all associated product IDs in the groupedQty JSON with their quantities

  - id: add-bundle-product-to-cart
    title: Add Bundle Product to Cart
    description: |
      Add a bundle product to the cart. Requires `bundleOptions` (a JSON string mapping bundle option IDs to arrays of selected product IDs) and `bundleOptionQty` (a JSON string mapping bundle option IDs to their quantities). For checkbox/multiselect options, quantities are fixed by admin; for radio/select options, customers can specify quantities.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $quantity: Int!
        $bundleOptions: String
        $bundleOptionQty: String
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            bundleOptions: $bundleOptions
            bundleOptionQty: $bundleOptionQty
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2517,
        "quantity": 1,
        "bundleOptions": "{\"1\":[1],\"2\":[2],\"3\":[3],\"4\":[4]}",
        "bundleOptionQty": "{\"1\":2,\"2\":3}"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4643",
              "_id": 4643,
              "cartToken": "4643",
              "subtotal": 117,
              "grandTotal": 117,
              "formattedSubtotal": "$117.00",
              "formattedGrandTotal": "$117.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5837",
                      "cartId": 4643,
                      "productId": 2517,
                      "name": "Arctic Frost Winter Accessories Bundle",
                      "sku": "BP-001",
                      "quantity": 1,
                      "price": 117,
                      "basePrice": 117,
                      "total": 117,
                      "baseImage": "{\"small_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/small\\/product\\/2517\\/lW2A3FH3oKBJnnukyUyKUArdrr8dwTJxxDKthSgq.webp\",\"medium_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/medium\\/product\\/2517\\/lW2A3FH3oKBJnnukyUyKUArdrr8dwTJxxDKthSgq.webp\",\"large_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/large\\/product\\/2517\\/lW2A3FH3oKBJnnukyUyKUArdrr8dwTJxxDKthSgq.webp\",\"original_image_url\":\"https:\\/\\/api-demo.bagisto.com\\/cache\\/original\\/product\\/2517\\/lW2A3FH3oKBJnnukyUyKUArdrr8dwTJxxDKthSgq.webp\"}",
                      "baseTotal": 117,
                      "type": "bundle",
                      "formattedPrice": "$117.00",
                      "formattedTotal": "$117.00",
                      "productUrlKey": "arctic-frost-winter-accessories-bundle",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 1,
                              "option_label": "2 x Arctic Cozy Knit Unisex Beanie $14.00",
                              "attribute_name": "Bundle Option 1",
                              "is_required": true,
                              "can_change_qty": true
                            }
                          },
                          {
                            "node": {
                              "option_id": 2,
                              "option_label": "3 x Arctic Bliss Stylish Winter Scarf $17.00",
                              "attribute_name": "Bundle Option 1",
                              "is_required": true,
                              "can_change_qty": true
                            }
                          },
                          {
                            "node": {
                              "option_id": 3,
                              "option_label": "1 x Arctic Touchscreen Winter Gloves $17.00",
                              "attribute_name": "Bundle Option 2",
                              "is_required": true,
                              "can_change_qty": false
                            }
                          },
                          {
                            "node": {
                              "option_id": 4,
                              "option_label": "1 x Arctic Warmth Wool Blend Socks $21.00",
                              "attribute_name": "Bundle Option 2",
                              "is_required": true,
                              "can_change_qty": false
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID
      - error: INVALID_BUNDLE_OPTIONS
        cause: Required bundle options are missing or invalid product IDs provided
        solution: Include all required bundle option IDs with valid product selections
      - error: INVALID_BUNDLE_QTY
        cause: Trying to change quantity for a checkbox/multiselect bundle option (admin-fixed qty)
        solution: Only specify quantities for radio/select bundle options; checkbox/multiselect quantities are fixed by admin

  - id: add-default-booking-product-to-cart
    title: Add Default Booking Product to Cart
    description: |
      Add a default booking product to the cart. The `booking` input is a JSON string containing `type`, `date` (YYYY-MM-DD), and `slot` (a time range string like "12:00 PM - 08:00 PM"). The API automatically converts the time range to Unix timestamps.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $booking: String!
        $quantity: Int
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            booking: $booking
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2507,
        "quantity": 1,
        "booking": "{\"type\":\"default\",\"date\":\"2026-04-15\",\"slot\":\"12:00 PM - 06:00 PM\"}"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4663",
              "_id": 4663,
              "cartToken": "4663",
              "subtotal": 99,
              "grandTotal": 99,
              "formattedSubtotal": "$99.00",
              "formattedGrandTotal": "$99.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5861",
                      "cartId": 4663,
                      "productId": 2507,
                      "name": "Professional Photography Session",
                      "sku": "PROFESSIONAL-PHOTOGRAPHY-SESSION",
                      "quantity": 1,
                      "price": 99,
                      "basePrice": 99,
                      "total": 99,
                      "baseTotal": 99,
                      "type": "booking",
                      "formattedPrice": "$99.00",
                      "formattedTotal": "$99.00",
                      "productUrlKey": "professional-photography-session",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "15 April, 2026 12:00 PM",
                              "attribute_name": "Booking From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "15 April, 2026 06:00 PM",
                              "attribute_name": "Booking Till"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID
      - error: INVALID_BOOKING
        cause: Booking JSON is malformed or missing required fields
        solution: Ensure booking JSON contains type, date, and slot fields
      - error: SLOT_NOT_AVAILABLE
        cause: The selected time slot is already booked or not available on the selected date
        solution: Choose a different date or time slot

  - id: add-appointment-booking-product-to-cart
    title: Add Appointment Booking Product to Cart
    description: |
      Add an appointment booking product to the cart. The `booking` input is a JSON string with `type` set to "appointment", a `date` (YYYY-MM-DD), and a `slot` (time range string). Appointment slots are generated based on the product's configured duration and break time.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $booking: String!
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            booking: $booking
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2509,
        "booking": "{\"type\":\"appointment\",\"date\":\"2026-04-08\",\"slot\":\"10:00 AM - 10:45 AM\"}"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4666",
              "_id": 4666,
              "cartToken": "4666",
              "subtotal": 55,
              "grandTotal": 55,
              "formattedSubtotal": "$55.00",
              "formattedGrandTotal": "$55.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5863",
                      "cartId": 4666,
                      "productId": 2509,
                      "name": "Men's Haircut Appointment",
                      "sku": "SALON-HAIRCUT-APPOINTMENT",
                      "quantity": 1,
                      "price": 55,
                      "basePrice": 55,
                      "total": 55,
                      "baseTotal": 55,
                      "type": "booking",
                      "formattedPrice": "$55.00",
                      "formattedTotal": "$55.00",
                      "productUrlKey": "mens-haircut-appointment",
                      "canChangeQty": false,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "08 April, 2026 10:00 AM",
                              "attribute_name": "Booking From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "08 April, 2026 10:45 AM",
                              "attribute_name": "Booking Till"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID
      - error: SLOT_NOT_AVAILABLE
        cause: The selected appointment slot is already booked
        solution: Choose a different time slot or date

  - id: add-rental-booking-product-daily-to-cart
    title: Add Rental Booking Product to Cart (Daily)
    description: |
      Add a rental booking product with daily renting to the cart. For daily rentals, the `booking` JSON requires `renting_type` set to "daily", `date_from` (start date), and `date_to` (end date). The price is calculated based on the number of rental days.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $booking: String!
        $quantity: Int
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            booking: $booking
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  total
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2510,
        "quantity": 1,
        "booking": "{\"type\":\"rental\",\"renting_type\":\"daily\",\"date_from\":\"2026-04-08\",         \"date_to\":\"2026-04-09\"}"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4677",
              "_id": 4677,
              "cartToken": "4677",
              "subtotal": 594,
              "grandTotal": 594,
              "formattedSubtotal": "$594.00",
              "formattedGrandTotal": "$594.00",
              "items": {
                "totalCount": 2,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5872",
                      "cartId": 4677,
                      "productId": 2510,
                      "name": "Wooden Folding Chair Rental",
                      "sku": "WOODEN-FOLDING-CHAIR-RENTAL",
                      "quantity": 1,
                      "price": 297,
                      "total": 297,
                      "type": "booking",
                      "formattedPrice": "$297.00",
                      "formattedTotal": "$297.00",
                      "productUrlKey": "wooden-folding-chair-rental",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "Daily Basis",
                              "attribute_name": "Rent Type"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "08 April, 2026",
                              "attribute_name": "Rent From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "09 April, 2026",
                              "attribute_name": "Rent Till"
                            }
                          }
                        ]
                      }
                    }
                  },
                  {
                    "cursor": "MQ==",
                    "node": {
                      "id": "5873",
                      "cartId": 4677,
                      "productId": 2510,
                      "name": "Wooden Folding Chair Rental",
                      "sku": "WOODEN-FOLDING-CHAIR-RENTAL",
                      "quantity": 1,
                      "price": 297,
                      "total": 297,
                      "type": "booking",
                      "formattedPrice": "$297.00",
                      "formattedTotal": "$297.00",
                      "productUrlKey": "wooden-folding-chair-rental",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "Daily Basis",
                              "attribute_name": "Rent Type"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "08 April, 2026",
                              "attribute_name": "Rent From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "09 April, 2026",
                              "attribute_name": "Rent Till"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 2,
              "itemsCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_DATE_RANGE
        cause: date_from is after date_to or dates are in the past
        solution: Ensure date_from is before date_to and both are future dates

  - id: add-rental-booking-product-hourly-to-cart
    title: Add Rental Booking Product to Cart (Hourly)
    description: |
      Add a rental booking product with hourly renting to the cart. For hourly rentals, the `booking` JSON requires `renting_type` set to "hourly", a `date`, and a `slot` (time range string). The API converts the time range to timestamps automatically.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $booking: String!
        $quantity: Int
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            booking: $booking
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  total
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2510,
        "quantity": 1,
        "booking": "{\"type\":\"rental\",\"renting_type\":\"hourly\",\"date\":\"2026-04-22\",\"slot\":\"12:00 PM - 01:00 PM\"}"
      }

    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4676",
              "_id": 4676,
              "cartToken": "4676",
              "subtotal": 204,
              "grandTotal": 204,
              "formattedSubtotal": "$204.00",
              "formattedGrandTotal": "$204.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5871",
                      "cartId": 4676,
                      "productId": 2510,
                      "name": "Wooden Folding Chair Rental",
                      "sku": "WOODEN-FOLDING-CHAIR-RENTAL",
                      "quantity": 1,
                      "price": 204,
                      "total": 204,
                      "type": "booking",
                      "formattedPrice": "$204.00",
                      "formattedTotal": "$204.00",
                      "productUrlKey": "wooden-folding-chair-rental",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "Hourly Basis",
                              "attribute_name": "Rent Type"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "22 April, 2026 12:00 PM",
                              "attribute_name": "Rent From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "22 April, 2026 01:00 PM",
                              "attribute_name": "Rent Till"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 1,
              "itemsCount": 1
            }
          }
        }
      }
    commonErrors:
      - error: SLOT_NOT_AVAILABLE
        cause: The selected hourly slot is not available on the chosen date
        solution: Choose a different time slot or date

  - id: add-event-booking-product-to-cart
    title: Add Event Booking Product to Cart
    description: |
      Add an event booking product to the cart. The `booking` JSON requires `type` set to "event" and `qty` — an object mapping ticket type IDs to their quantities. At least one ticket must have a quantity greater than 0.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $booking: String!
        $quantity: Int
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            booking: $booking
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  total
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2508,
        "quantity": 1,
        "booking": "{\"type\":\"event\",\"qty\":{\"7\":2,\"8\":1}}"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4680",
              "_id": 4680,
              "cartToken": "4680",
              "subtotal": 710,
              "grandTotal": 710,
              "formattedSubtotal": "$710.00",
              "formattedGrandTotal": "$710.00",
              "items": {
                "totalCount": 2,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5879",
                      "cartId": 4680,
                      "productId": 2508,
                      "name": "Live Music Concert Ticket",
                      "sku": "LIVE-MUSIC-CONCERT-TICKET",
                      "quantity": 2,
                      "price": 235,
                      "total": 470,
                      "type": "booking",
                      "formattedPrice": "$235.00",
                      "formattedTotal": "$470.00",
                      "productUrlKey": "live-music-concert-ticket",
                      "canChangeQty": false,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "Standard Entry Ticket",
                              "attribute_name": "Event Ticket"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "06 April, 2026",
                              "attribute_name": "Event From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "30 April, 2026",
                              "attribute_name": "Event Till"
                            }
                          }
                        ]
                      }
                    }
                  },
                  {
                    "cursor": "MQ==",
                    "node": {
                      "id": "5880",
                      "cartId": 4680,
                      "productId": 2508,
                      "name": "Live Music Concert Ticket",
                      "sku": "LIVE-MUSIC-CONCERT-TICKET",
                      "quantity": 1,
                      "price": 240,
                      "total": 240,
                      "type": "booking",
                      "formattedPrice": "$240.00",
                      "formattedTotal": "$240.00",
                      "productUrlKey": "live-music-concert-ticket",
                      "canChangeQty": false,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "VIP Access Ticket",
                              "attribute_name": "Event Ticket"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "06 April, 2026",
                              "attribute_name": "Event From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "30 April, 2026",
                              "attribute_name": "Event Till"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 3,
              "itemsCount": 2
            }
          }
        }
      }
    commonErrors:
      - error: INVALID_TICKET_QTY
        cause: All ticket quantities are 0 or no ticket quantities provided
        solution: At least one ticket type must have a quantity greater than 0
      - error: TICKETS_SOLD_OUT
        cause: Requested quantity exceeds available tickets
        solution: Reduce ticket quantity or choose a different ticket type

  - id: add-table-booking-product-to-cart
    title: Add Table Booking Product to Cart
    description: |
      Add a table booking product to the cart. The `booking` JSON requires `type` set to "table", a `date`, and a `slot`. Table bookings also require a `bookingNote` (or `specialNote`) for special requests — this is mandatory for table reservations.
    query: |
      mutation createAddProductInCart(
        $productId: Int!
        $booking: String!
        $quantity: Int
        $specialNote: String
      ) {
        createAddProductInCart(
          input: {
            productId: $productId
            quantity: $quantity
            booking: $booking
            bookingNote: $specialNote
          }
        ) {
          addProductInCart {
            id
            _id
            cartToken
            subtotal
            grandTotal
            formattedSubtotal
            formattedGrandTotal
            items {
              totalCount
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
                  total
                  type
                  formattedPrice
                  formattedTotal
                  productUrlKey
                  canChangeQty
                  options
                }
              }
            }
            success
            message
            sessionToken
            isGuest
            itemsQty
            itemsCount
          }
        }
      }
    variables: |
      {
        "productId": 2511,
        "quantity": 2,
        "booking": "{\"type\":\"table\",\"date\":\"2026-04-15\",\"slot\":\"12:00 PM - 12:45 PM\"}",
        "specialNote": "Table near a window is much appreciated"
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "4682",
              "_id": 4682,
              "cartToken": "4682",
              "subtotal": 390,
              "grandTotal": 390,
              "formattedSubtotal": "$390.00",
              "formattedGrandTotal": "$390.00",
              "items": {
                "totalCount": 1,
                "edges": [
                  {
                    "cursor": "MA==",
                    "node": {
                      "id": "5883",
                      "cartId": 4682,
                      "productId": 2511,
                      "name": "Fine Dining Table Reservation",
                      "sku": "FINE-DINING-TABLE-RESERVATION",
                      "quantity": 2,
                      "price": 195,
                      "total": 390,
                      "type": "booking",
                      "formattedPrice": "$195.00",
                      "formattedTotal": "$390.00",
                      "productUrlKey": "fine-dining-table-reservation",
                      "canChangeQty": true,
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "15th Apr, 2026 12:00 PM",
                              "attribute_name": "Booking From"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "15th Apr, 2026 12:45 PM",
                              "attribute_name": "Booking Till"
                            }
                          },
                          {
                            "node": {
                              "option_id": 0,
                              "option_label": "Table near a window is much appreciated",
                              "attribute_name": "Special Request/Notes"
                            }
                          }
                        ]
                      }
                    }
                  }
                ]
              },
              "success": true,
              "message": "Product added to cart successfully",
              "sessionToken": null,
              "isGuest": false,
              "itemsQty": 2,
              "itemsCount": 1
            }
          }
        }
      }
    commonErrors:
      - error: MISSING_BOOKING_NOTE
        cause: Table bookings require a note/special request
        solution: Provide a bookingNote or specialNote parameter
      - error: SLOT_NOT_AVAILABLE
        cause: The selected table slot is already reserved
        solution: Choose a different time slot or date
  - id: add-product-with-customizable-options
    title: Simple Product - Customizable Options
    description: Add a product with customizable options. Options 9 and 10 are selects (value ids). Option 11 is a file type — its value is a token from the upload endpoint (upload the file over REST first, then pass the token here). See the Customizable Options section below.
    query: |
      mutation createAddProductInCart($input: createAddProductInCartInput!) {
        createAddProductInCart(input: $input) {
          addProductInCart {
            id
            grandTotal
            formattedGrandTotal
            success
            message
            items {
              edges {
                node {
                  id
                  productId
                  name
                  quantity
                  price
                  formattedPrice
                  options
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 2977,
          "quantity": 1,
          "customizableOptions": {
            "9": [9],
            "10": [12],
            "11": ["<token-from-upload-endpoint>"]
          }
        }
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "6895",
              "grandTotal": 54,
              "formattedGrandTotal": "$54.00",
              "success": true,
              "message": "Product added to cart successfully",
              "items": {
                "edges": [
                  {
                    "node": {
                      "id": "7769",
                      "productId": 2977,
                      "name": "Simple Customizable options",
                      "quantity": 1,
                      "price": 54,
                      "formattedPrice": "$54.00",
                      "options": {
                        "edges": [
                          {
                            "node": {
                              "option_label": "1kg",
                              "attribute_name": "Weight Select",
                              "attribute_type": "select"
                            }
                          },
                          {
                            "node": {
                              "option_label": "Pineapple",
                              "attribute_name": "Flavour",
                              "attribute_type": "select"
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
      - error: MISSING_REQUIRED_OPTION
        cause: A required customizable option was not provided
        solution: Include every option whose `isRequired` is `"1"` in `customizableOptions`
---

# Add to Cart

## About

The `createAddProductInCart` mutation adds a product to a customer's shopping cart. Use this mutation to:

- Add products from product detail pages to cart
- Implement "Add to Cart" buttons and flows
- Add products programmatically from search results
- Handle quantity selection and product-specific options
- Support all product types: simple, virtual, configurable, downloadable, grouped, bundle, and booking

This mutation validates product availability, applies applicable pricing rules, and updates the cart totals. It returns the complete updated cart state including all items, pricing, and tax information.

## Authentication

This mutation supports both authenticated customers and guest users:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).
- **Guest users**: Provide the Guest Cart Token `cartToken` obtained from the [Create Cart mutation](/api/graphql-api/shop/mutations/create-cart).

```
Authorization: Bearer <accessToken>
```

## Input Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | `Int!` | Yes | The product ID to add to the cart. |
| `quantity` | `Int` | No | Number of units to add. Defaults to `1` if omitted. |
| `selectedConfigurableOption` | `Int` | Configurable only | The child variant product ID for configurable products. |
| `superAttribute` | `Iterable` | Configurable only | Array of attribute-option mappings, e.g., `[{"23": 2}, {"24": 8}]` where keys are attribute IDs and values are option IDs. |
| `links` | `Iterable` | Downloadable only | Array of downloadable link IDs the customer wants to purchase, e.g., `[1, 2]`. |
| `groupedQty` | `String` | Grouped only | JSON string mapping each associated product ID to its quantity, e.g., `"{\"1\":1,\"3\":2}"`. All associated products must be included. |
| `bundleOptions` | `String` | Bundle only | JSON string mapping bundle option IDs to arrays of selected product IDs, e.g., `"{\"1\":[1],\"2\":[2]}"`. |
| `bundleOptionQty` | `String` | Bundle only | JSON string mapping bundle option IDs to their quantities, e.g., `"{\"2\":3,\"3\":4}"`. Only applies to radio/select options; checkbox/multiselect quantities are fixed by admin. |
| `booking` | `String` | Booking only | JSON string containing booking details. Structure varies by booking type (see [Booking Input Reference](#booking-input-reference) below). |
| `bookingNote` | `String` | Table booking only | Special note or request for table bookings. Required for table booking type. |
| `customizableOptions` | `Iterable` | Customizable products | Map of each customizable-option `_id` → array of chosen value `_id`s (from the product's `customizableOptions`), e.g. `{"9":[9],"10":[12]}`. Available on **simple and virtual** products. See [Customizable Options](#customizable-options). |
| `isBuyNow` | `Int` | No | Set to `1` for buy-now flow (creates a new cart for immediate checkout). Default: `0`. |

## Input Requirements by Product Type

| Product Type | Required Fields | Optional Fields |
|---|---|---|
| **Simple** | `productId` | `quantity` |
| **Virtual** | `productId` | `quantity` |
| **Configurable** | `productId`, `selectedConfigurableOption`, `superAttribute` | `quantity` |
| **Downloadable** | `productId`, `links` | `quantity` |
| **Grouped** | `productId`, `groupedQty` | `quantity` |
| **Bundle** | `productId`, `bundleOptions` | `quantity`, `bundleOptionQty` |
| **Booking** | `productId`, `booking` | `quantity`, `bookingNote` |

## Customizable Options

Customizable options are extra inputs an admin attaches to a product (a weight dropdown, a flavour picker, an engraving text field, a file upload). They are **not** limited to configurable products — a **simple or virtual** product can carry them, and when it does the shopper must satisfy them before adding to cart.

**1. Read the options from the product.** [Get Product](/api/graphql-api/shop/queries/get-product) exposes `customizableOptions`. Each option node's `_id` is the option id; each price node's `_id` is a selectable value id. `isRequired: "1"` means the shopper must pick a value.

**2. Send the selections.** Pass `customizableOptions` as a map of option `_id` → an **array** of the chosen value `_id`s:

```json
"customizableOptions": { "9": [9], "10": [12] }
```

Here option `9` (Weight) → value `9` (1kg), option `10` (Flavour) → value `12` (Pineapple). The array form supports multi-select options; for a text/textarea option the array holds the entered string.

**3. Rules.**
- Include every option whose `isRequired` is `"1"` — omitting one returns a validation error.
- The value ids must belong to that option (from its `customizableOptionPrices`).
- The chosen values come back on the cart item's `options` (`option_label` / `attribute_name`) so you can render them on the cart page.

### File-type options

A `file`-type option needs a file upload, which cannot travel over GraphQL. Upload the file over REST first (it returns a token), then pass the token here as that option's value:

```json
"customizableOptions": { "9": [9], "10": [12], "11": ["<upload-token>"] }
```

The full flow, the upload endpoint, and the allowed file formats are on the **[Upload Customizable File](/api/graphql-api/shop/mutations/upload-customizable-file)** page.

## Booking Input Reference

The `booking` field accepts a JSON string whose structure varies by booking type. The API automatically converts human-readable time range strings (e.g., `"12:00 PM - 08:00 PM"`) to Unix timestamps internally.

| Booking Type | JSON Structure | Example |
|---|---|---|
| **Default** | `{"type":"default","date":"YYYY-MM-DD","slot":"HH:MM AM - HH:MM PM"}` | `{"type":"default","date":"2026-03-25","slot":"12:00 PM - 08:00 PM"}` |
| **Appointment** | `{"type":"appointment","date":"YYYY-MM-DD","slot":"HH:MM AM - HH:MM PM"}` | `{"type":"appointment","date":"2026-03-28","slot":"12:00 PM - 12:45 PM"}` |
| **Rental (Daily)** | `{"type":"rental","renting_type":"daily","date_from":"YYYY-MM-DD","date_to":"YYYY-MM-DD"}` | `{"type":"rental","renting_type":"daily","date_from":"2026-03-24","date_to":"2026-03-26"}` |
| **Rental (Hourly)** | `{"type":"rental","renting_type":"hourly","date":"YYYY-MM-DD","slot":"HH:MM AM - HH:MM PM"}` | `{"type":"rental","renting_type":"hourly","date":"2026-03-19","slot":"11:00 AM - 12:00 PM"}` |
| **Event** | `{"type":"event","qty":{"ticketId":qty,...}}` | `{"type":"event","qty":{"1":1,"2":1}}` |
| **Table** | `{"type":"table","date":"YYYY-MM-DD","slot":"HH:MM AM - HH:MM PM"}` + `bookingNote` param | `{"type":"table","date":"2026-03-25","slot":"12:00 PM - 12:45 PM"}` |

Four rules apply on top of the shapes above:

- **Event bookings** — at least one ticket type must carry a quantity greater than 0.
- **Table bookings** — `bookingNote` is required, and it is a separate input parameter rather than part of the `booking` JSON.
- **Rental bookings** — a daily rental uses `date_from` / `date_to`; an hourly rental uses `date` / `slot`.
- **Slot format** — a time range such as `"12:00 PM - 08:00 PM"` is parsed and converted to Unix timestamps server-side.

## Cart Item `options` Field

The `options` field on each cart item contains product-specific selection details. This data is essential for displaying what the customer selected on the cart page. The structure varies by product type:

| Product Type | Options Content | Example |
|---|---|---|
| **Simple** | Not present — no additional options needed | — |
| **Virtual** | Not present — no additional options needed. `haveStockableItems` is `false` as virtual products have no physical shipment. | — |
| **Configurable** | Selected attribute values (color, size, etc.) | `[{"id":"23","label":"Color","value":"Blue","option_id":"2"}]` |
| **Downloadable** | Selected downloadable links | `[{"link_id":"1","title":"PDF Version","price":15}]` |
| **Grouped** | Individual product quantities | `[{"product_id":"101","name":"Product A","qty":2}]` |
| **Bundle** | Selected bundle options and quantities | `[{"option_id":"1","label":"Mouse","can_change_qty":true,"value":[...]}]` |
| **Booking** | Booking date, slot, and note details | `[{"label":"Date","value":"2026-03-25"},{"label":"Slot","value":"12:00 PM - 12:45 PM"}]` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Cart identifier in IRI format. |
| `_id` | `Int!` | Numeric cart ID. |
| `cartToken` | `String!` | Cart session token for guest users. |
| `customerId` | `Int` | Customer ID (null for guest users). |
| `channelId` | `Int!` | Channel the cart belongs to. |
| `subtotal` | `String!` | Cart subtotal before tax and shipping. |
| `grandTotal` | `String!` | Final cart total including tax and discounts. |
| `discountAmount` | `String` | Total discount applied. |
| `taxAmount` | `String` | Total tax amount. |
| `shippingAmount` | `String` | Shipping cost. |
| `couponCode` | `String` | Applied coupon code, if any. |
| `items` | `CartItemConnection!` | Paginated collection of cart items. |
| `items.totalCount` | `Int!` | Total number of items in cart. |
| `items.edges.node` | `CartItem!` | Individual cart item with product details, pricing, and options. |
| `success` | `Boolean!` | Whether the product was added successfully. |
| `message` | `String!` | Success or error message. |
| `sessionToken` | `String` | Session token for cart persistence. |
| `isGuest` | `Boolean!` | Whether the cart belongs to a guest user. |
| `itemsQty` | `Int!` | Total quantity of all items in cart. |
| `itemsCount` | `Int!` | Number of distinct items in cart. |
| `haveStockableItems` | `Boolean!` | Whether cart contains physical/shippable items. |

## Best Practices

1. **Use Product-Specific Fields** — Only pass the input fields relevant to the product type being added (e.g., don't pass `booking` for simple products)
2. **Handle Options in Cart Display** — Use the `options` field on cart items to display what the customer selected (variant attributes, bundle choices, booking dates, etc.)
3. **Check `success` Field** — Always check the `success` boolean and `message` in the response to handle errors gracefully
4. **Persist Session Token** — Store the `sessionToken`/`cartToken` returned for guest users to maintain cart state across requests
5. **Validate Booking Slots** — For booking products, retrieve available slots from the product query before adding to cart
6. **Bundle Qty Restrictions** — For bundle products, note that checkbox/multiselect option quantities are admin-controlled and cannot be changed by customers

## Related Resources

- [Create Cart](/api/graphql-api/shop/mutations/create-cart) - Create a new cart (required for guest users)
- [Update Cart Item](/api/graphql-api/shop/mutations/update-cart-item) - Update quantity of items in cart
- [Remove Cart Item](/api/graphql-api/shop/mutations/remove-cart-item) - Remove items from cart
- [Get Cart](/api/graphql-api/shop/queries/get-cart) - Retrieve current cart state
- [Single Product](/api/graphql-api/shop/queries/get-product) - Get product details and available options
- [Upload Customizable File](/api/graphql-api/shop/mutations/upload-customizable-file) - The file-option flow: upload over REST, then reference the token in this mutation
