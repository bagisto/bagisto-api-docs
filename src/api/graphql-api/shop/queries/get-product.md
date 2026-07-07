---
outline: false
examples:
  - id: get-product-by-id
    title: Get Product by ID
    description: Retrieve a single product by its ID. `isInWishlist` / `isInCompare` need the customer Bearer token — see the field notes below.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          isInWishlist
          isInCompare
        }
      }
    variables: |
      {
        "id": 2499
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2499",
            "name": "Ivory Frost Classic Overcoat XL",
            "sku": "sku-345346346-variant-9",
            "urlKey": "sku-345346346-variant-9",
            "price": "500",
            "isInWishlist": "1",
            "isInCompare": "0"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: INVALID_ID
        cause: Invalid ID format
        solution: Use valid numeric or string ID
  - id: get-product-by-sku
    title: Get Product by SKU
    description: Retrieve product using the product SKU (Stock Keeping Unit).
    query: |
      query getProduct($sku: String!) {
        product(sku: $sku) {
          id
          name
          sku
          urlKey
          price
        }
      }
    variables: |
      {
        "sku": "sku-345346346-variant-9"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2499",
            "name": "Ivory Frost Classic Overcoat XL",
            "sku": "sku-345346346-variant-9",
            "urlKey": "sku-345346346-variant-9",
            "price": "500"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: SKU does not exist
        solution: Check product SKU spelling
  - id: get-product-by-url-key
    title: Get Product by URL Key
    description: Retrieve product using its URL key (the storefront slug). The URL key is matched across every locale, so a slug that exists only in another locale still resolves — you do not need to know which locale it was created in.
    query: |
      query getProduct($urlKey: String!) {
        product(urlKey: $urlKey) {
          id
          name
          sku
          urlKey
          price
        }
      }
    variables: |
      {
        "urlKey": "ivory-frost-classic-overcoat-xl"
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2499",
            "name": "Ivory Frost Classic Overcoat XL",
            "sku": "sku-345346346-variant-9",
            "urlKey": "ivory-frost-classic-overcoat-xl",
            "price": "500"
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: No product has this URL key in any locale
        solution: Check the URL key spelling
  - id: get-product-with-variants
    title: Get Product with Variants
    description: Retrieve a configurable product with its variant options and superAttributeOptions for building variant selectors.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          superAttributeOptions
          variants {
            edges {
              node {
                id
                name
                sku
                price
                attributeValues {
                  edges {
                    node {
                      value
                      attribute {
                        code
                        adminName
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2468
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2468",
            "name": "Minimalist Cotton Shirt",
            "sku": "MINIMAL-COTTON-001",
            "urlKey": "minimalist-cotton-shirt",
            "price": "0",
            "superAttributeOptions": "[{\"id\":23,\"code\":\"color\",\"label\":\"Color\",\"options\":[{\"id\":3,\"label\":\"Yellow\"},{\"id\":26,\"label\":\"Lavender Grey\"},{\"id\":27,\"label\":\"Charcoal\"}]},{\"id\":24,\"code\":\"size\",\"label\":\"Size\",\"options\":[{\"id\":6,\"label\":\"S\"},{\"id\":7,\"label\":\"M\"}]}]",
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/products/2469",
                    "name": "Minimalist Cotton Shirt Yellow S",
                    "sku": "MINIMAL-COTTON-YEL-S",
                    "price": "463",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "MINIMAL-COTTON-YEL-S",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Minimalist Cotton Shirt Yellow S",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "463.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "3",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2470",
                    "name": "Minimalist Cotton Shirt Lavender Grey S",
                    "sku": "MINIMAL-COTTON-LAV-S",
                    "price": "463",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "MINIMAL-COTTON-LAV-S",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Minimalist Cotton Shirt Lavender Grey S",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "463.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "26",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2471",
                    "name": "Minimalist Cotton Shirt Charcoal S",
                    "sku": "MINIMAL-COTTON-CHAR-S",
                    "price": "463",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "MINIMAL-COTTON-CHAR-S",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Minimalist Cotton Shirt Charcoal S",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "463.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "27",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2472",
                    "name": "Minimalist Cotton Shirt Yellow M",
                    "sku": "MINIMAL-COTTON-YEL-M",
                    "price": "463",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "MINIMAL-COTTON-YEL-M",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Minimalist Cotton Shirt Yellow M",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "463.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "3",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2473",
                    "name": "Minimalist Cotton Shirt Lavender Grey M",
                    "sku": "MINIMAL-COTTON-LAV-M",
                    "price": "463",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "MINIMAL-COTTON-LAV-M",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Minimalist Cotton Shirt Lavender Grey M",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "463.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "26",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2474",
                    "name": "Minimalist Cotton Shirt Charcoal M",
                    "sku": "MINIMAL-COTTON-CHAR-M",
                    "price": "463",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "MINIMAL-COTTON-CHAR-M",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Minimalist Cotton Shirt Charcoal M",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "463.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "27",
                            "attribute": { "code": "color", "adminName": "Color" }
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
    commonErrors:
      - error: NO_VARIANTS
        cause: Product has no variants
        solution: Use simple product query
  - id: get-product-details-full
    title: Get Full Product Details
    description: Retrieve complete product information including attributes, images, descriptions, pricing, and all formatted price fields.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          type
          urlKey
          locale
          channel
          status
          description
          shortDescription
          color
          size
          featured
          new
          guestCheckout
          isSaleable
          price
          specialPrice
          minimumPrice
          maximumPrice
          regularMinimumPrice
          regularMaximumPrice
          formattedPrice
          formattedSpecialPrice
          formattedMinimumPrice
          formattedMaximumPrice
          formattedRegularMinimumPrice
          formattedRegularMaximumPrice
          superAttributeOptions
          combinations
          images {
            edges {
              node {
                id
                publicPath
                position
              }
            }
          }
          attributeValues {
            edges {
              node {
                value
                attribute {
                  code
                  adminName
                }
              }
            }
          }
          variants {
            edges {
              node {
                id
                name
                sku
                price
                attributeValues {
                  edges {
                    node {
                      value
                      attribute {
                        code
                        adminName
                      }
                    }
                  }
                }
              }
            }
          }
          categories {
            edges {
              node {
                id
                translation {
                  name
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2478
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2478",
            "name": "Contemporary Fit Cut-Out Top",
            "sku": "CUTOUT-TOP-001",
            "type": "configurable",
            "urlKey": "contemporary-fit-cut-out-top",
            "locale": "en",
            "channel": null,
            "status": "1",
            "description": "This modern cut-out tank top is designed for those who prefer bold simplicity with a contemporary edge. Crafted with a body-hugging fit and subtle ribbed texture, it enhances the silhouette while keeping the look clean and refined.",
            "shortDescription": "A sleek ribbed tank top with a bold cut-out detail, designed to make a confident style statement with minimal effort.",
            "color": "",
            "size": "",
            "featured": "",
            "new": "1",
            "guestCheckout": "1",
            "isSaleable": "1",
            "price": "0",
            "specialPrice": null,
            "minimumPrice": "435",
            "maximumPrice": "435",
            "regularMinimumPrice": "435",
            "regularMaximumPrice": "435",
            "formattedPrice": "$0.00",
            "formattedSpecialPrice": null,
            "formattedMinimumPrice": "$435.00",
            "formattedMaximumPrice": "$435.00",
            "formattedRegularMinimumPrice": "$435.00",
            "formattedRegularMaximumPrice": "$435.00",
            "superAttributeOptions": "[{\"id\":23,\"code\":\"color\",\"label\":\"Color\",\"options\":[{\"id\":1,\"label\":\"Red\"},{\"id\":5,\"label\":\"White\"},{\"id\":20,\"label\":\"Ash grey\"}]},{\"id\":24,\"code\":\"size\",\"label\":\"Size\",\"options\":[{\"id\":6,\"label\":\"S\"}]}]",
            "combinations": "{\"2479\":{\"color\":1,\"size\":6},\"2480\":{\"color\":5,\"size\":6},\"2482\":{\"color\":20,\"size\":6}}",
            "images": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin/images/678",
                    "publicPath": "https://api-demo.bagisto.com/storage/product/2478/AA1X8qJMtgi3HKHGiwmV1LEPFrQk6Z8aYPc137Y0.webp",
                    "position": "1"
                  }
                },
                {
                  "node": {
                    "id": "/api/admin/images/679",
                    "publicPath": "https://api-demo.bagisto.com/storage/product/2478/LXF5IyrOREvTpNl0mMMeWgMLNFFWb7LqQjfn21H6.webp",
                    "position": "2"
                  }
                }
              ]
            },
            "attributeValues": {
              "edges": [
                {
                  "node": {
                    "value": "CUTOUT-TOP-001",
                    "attribute": { "code": "sku", "adminName": "SKU" }
                  }
                },
                {
                  "node": {
                    "value": "Contemporary Fit Cut-Out Top",
                    "attribute": { "code": "name", "adminName": "Name" }
                  }
                },
                {
                  "node": {
                    "value": "contemporary-fit-cut-out-top",
                    "attribute": { "code": "url_key", "adminName": "URL Key" }
                  }
                }
              ]
            },
            "variants": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/products/2479",
                    "name": "Contemporary Fit Cut-Out Top Red S",
                    "sku": "CUTOUT-TOP-RED-S",
                    "price": "435",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "CUTOUT-TOP-RED-S",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Contemporary Fit Cut-Out Top Red S",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "435.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "1",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2480",
                    "name": "Contemporary Fit Cut-Out Top White S",
                    "sku": "CUTOUT-TOP-WHT-S",
                    "price": "435",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "CUTOUT-TOP-WHT-S",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Contemporary Fit Cut-Out Top White S",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "435.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "5",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/products/2482",
                    "name": "Contemporary Fit Cut-Out Top Ash Grey S",
                    "sku": "CUTOUT-TOP-AGREY-S",
                    "price": "435",
                    "attributeValues": {
                      "edges": [
                        {
                          "node": {
                            "value": "CUTOUT-TOP-AGREY-S",
                            "attribute": { "code": "sku", "adminName": "SKU" }
                          }
                        },
                        {
                          "node": {
                            "value": "Contemporary Fit Cut-Out Top Ash Grey S",
                            "attribute": { "code": "name", "adminName": "Name" }
                          }
                        },
                        {
                          "node": {
                            "value": "435.0000",
                            "attribute": { "code": "price", "adminName": "Price" }
                          }
                        },
                        {
                          "node": {
                            "value": "20",
                            "attribute": { "code": "color", "adminName": "Color" }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            "categories": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/categories/22",
                    "translation": {
                      "name": "Fashion"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID is correct
  - id: get-downloadable-product-samples
    title: Get Downloadable Product with Samples
    description: Retrieve a downloadable product with its downloadable links and product-level samples. Use the _id from each link or sample to download the corresponding file.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          _id
          name
          sku
          type
          price
          downloadableLinks {
            edges {
              node {
                _id
                type
                translation {
                  title
                }
                price
                formattedPrice
                sampleType
                sampleFile
                sampleFileUrl
                sampleUrl
              }
            }
          }
          downloadableSamples {
            edges {
              node {
                _id
                type
                file
                fileUrl
                url
                translation {
                  title
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2506
      }
    response: |
      {
        "data": {
          "product": {
            "_id": 2506,
            "name": "Complete Personal Finance Guide (eBook PDF)",
            "sku": "COMPLETE-PERSONAL-FINANCE-GUIDE-EBOOK",
            "type": "downloadable",
            "price": "70",
            "downloadableLinks": {
              "edges": [
                {
                  "node": {
                    "_id": 2,
                    "type": "url",
                    "translation": {
                      "title": "Full eBook PDF"
                    },
                    "price": "69",
                    "formattedPrice": "$69.00",
                    "sampleType": "file",
                    "sampleFile": "product_downloadable_links/2506/4aUxeYumTemSR3QwHHHGmdiHBG2qWek3KDR8fhYK.pdf",
                    "sampleFileUrl": "https://api-demo.bagisto.com/api/downloadable/download-sample/link/2",
                    "sampleUrl": null
                  }
                }
              ]
            },
            "downloadableSamples": {
              "edges": [
                {
                  "node": {
                    "_id": 1,
                    "type": "file",
                    "file": "product_downloadable_links/2506/1apTXUkt2ugCISKHadT5Fmp4EwU7YeWYY2wb4mNs.pdf",
                    "fileUrl": "https://api-demo.bagisto.com/api/downloadable/download-sample/sample/1",
                    "url": null,
                    "translation": {
                      "title": ""
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID is correct
  - id: get-grouped-product
    title: Get Grouped Product
    description: Retrieve a grouped product with its associated child products and quantities. Grouped products bundle multiple simple products together, each with a default quantity.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          type
          urlKey
          locale
          channel
          status
          description
          shortDescription
          featured
          new
          guestCheckout
          isSaleable
          price
          specialPrice
          minimumPrice
          maximumPrice
          regularMinimumPrice
          regularMaximumPrice
          formattedPrice
          formattedSpecialPrice
          formattedMinimumPrice
          formattedMaximumPrice
          formattedRegularMinimumPrice
          formattedRegularMaximumPrice
          groupedProducts {
            edges {
              node {
                id
                qty
                sortOrder
                associatedProduct {
                  id
                  name
                  sku
                  price
                  formattedPrice
                  specialPrice
                  formattedSpecialPrice
                  images(first: 3) {
                    edges {
                      node {
                        id
                        publicPath
                      }
                    }
                  }
                }
              }
            }
          }
          images {
            edges {
              node {
                id
                publicPath
                position
              }
            }
          }
          categories {
            edges {
              node {
                id
                translation {
                  name
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2516
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2516",
            "name": "Arctic Frost Winter Accessories",
            "sku": "GP-001",
            "type": "grouped",
            "urlKey": "arctic-frost-winter-accessories",
            "locale": "en",
            "channel": null,
            "status": "1",
            "description": "Introducing the Arctic Frost Winter Accessories Bundle, your go-to solution for staying warm, stylish, and connected during the chilly winter days. This thoughtfully curated set brings together Four essential winter accessories to create a harmonious ensemble. The luxurious scarf, woven from a blend of acrylic and wool, not only adds a layer of warmth but also brings a touch of elegance to your winter wardrobe. The soft knit beanie, crafted with care, promises to keep you cozy while adding a fashionable flair to your look. But it doesn't end there – our bundle also includes touchscreen-compatible gloves. Stay connected without sacrificing warmth as you navigate your devices effortlessly. Whether you're answering calls, sending messages, or capturing winter moments on your smartphone, these gloves ensure convenience without compromising style. The soft and cozy texture of the socks offers a luxurious feel against your skin. Say goodbye to chilly feet as you embrace the plush warmth provided by these wool blend socks. The Arctic Frost Winter Accessories Bundle is not just about functionality; it's a statement of winter fashion. Each piece is designed not only to protect you from the cold but also to elevate your style during the frosty season. The materials chosen for this bundle prioritize both durability and comfort, ensuring that you can enjoy the winter wonderland in style. Whether you're treating yourself or searching for the perfect gift, the Arctic Frost Winter Accessories Bundle is a versatile choice. Delight someone special during the holiday season or elevate your own winter wardrobe with this stylish and functional ensemble. Embrace the frost with confidence, knowing that you have the perfect accessories to keep you warm and chic.",
            "shortDescription": "Embrace the winter chill with our Arctic Frost Winter Accessories Bundle. This curated set includes a luxurious scarf, a cozy beanie, touchscreen-compatible gloves and wool Blend Socks. Stylish and functional, this ensemble is crafted from high-quality materials, ensuring both durability and comfort. Elevate your winter wardrobe or delight someone special with this perfect gifting option.",
            "featured": "1",
            "new": "1",
            "guestCheckout": "1",
            "isSaleable": "1",
            "price": "0",
            "specialPrice": null,
            "minimumPrice": "14",
            "maximumPrice": "21",
            "regularMinimumPrice": "14",
            "regularMaximumPrice": "21",
            "formattedPrice": "$0.00",
            "formattedSpecialPrice": null,
            "formattedMinimumPrice": "$14.00",
            "formattedMaximumPrice": "$21.00",
            "formattedRegularMinimumPrice": "$14.00",
            "formattedRegularMaximumPrice": "$21.00",
            "groupedProducts": {
              "edges": [
                {
                  "node": {
                    "id": "/api/shop/product_grouped_products/1",
                    "qty": 1,
                    "sortOrder": 0,
                    "associatedProduct": {
                      "id": "/api/shop/products/2512",
                      "name": "Arctic Cozy Knit Unisex Beanie",
                      "sku": "SP-001",
                      "price": "14",
                      "formattedPrice": "$14.00",
                      "specialPrice": null,
                      "formattedSpecialPrice": null,
                      "images": {
                        "edges": [
                          {
                            "node": {
                              "id": "/api/admin/images/851",
                              "publicPath": "https://api-demo.bagisto.com/storage/product/2512/Muc0qeWks34MTZaxf38s6DBmfqMqrCxku81Uo8EB.webp"
                            }
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/product_grouped_products/2",
                    "qty": 1,
                    "sortOrder": 1,
                    "associatedProduct": {
                      "id": "/api/shop/products/2514",
                      "name": "Arctic Touchscreen Winter Gloves",
                      "sku": "SP-003",
                      "price": "21",
                      "formattedPrice": "$21.00",
                      "specialPrice": "17",
                      "formattedSpecialPrice": "$17.00",
                      "images": {
                        "edges": [
                          {
                            "node": {
                              "id": "/api/admin/images/853",
                              "publicPath": "https://api-demo.bagisto.com/storage/product/2514/g8lR0Ity8HcpE20A4yAkX5wvLY5RlTC67NJKyyg6.webp"
                            }
                          }
                        ]
                      }
                    }
                  }
                },
                {
                  "node": {
                    "id": "/api/shop/product_grouped_products/3",
                    "qty": 1,
                    "sortOrder": 2,
                    "associatedProduct": {
                      "id": "/api/shop/products/2515",
                      "name": "Arctic Warmth Wool Blend Socks",
                      "sku": "SP-004",
                      "price": "21",
                      "formattedPrice": "$21.00",
                      "specialPrice": null,
                      "formattedSpecialPrice": null,
                      "images": {
                        "edges": [
                          {
                            "node": {
                              "id": "/api/admin/images/854",
                              "publicPath": "https://api-demo.bagisto.com/storage/product/2515/442ouyaT1K4weKSZGhSDtSKDBbrhiH0aWWwGcFW0.webp"
                            }
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            },
            "images": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin/images/855",
                    "publicPath": "https://api-demo.bagisto.com/storage/product/2516/5Kgto6KVm6FLMaaDEY6pwCcVoTIhX03D3OGDzwbf.webp",
                    "position": "1"
                  }
                }
              ]
            },
            "categories": {
              "edges": []
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Product ID does not exist
        solution: Verify the product ID is correct
  - id: get-appointment-booking-product
    title: Get Appointment Booking Product
    description: Retrieve an appointment booking product with its slot configuration. Appointment bookings use the `appointmentSlot` relationship which includes duration, break time, and time slot availability per day.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          bookingProducts {
            edges {
              node {
                _id
                type
                availableFrom
                availableTo
                qty
                location
                availableEveryWeek
                appointmentSlot {
                  id
                  _id
                  bookingProductId
                  duration
                  breakTime
                  sameSlotAllDays
                  slots
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2509
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2509",
            "name": "Men's Haircut Appointment",
            "sku": "SALON-HAIRCUT-APPOINTMENT",
            "urlKey": "mens-haircut-appointment",
            "price": "60",
            "bookingProducts": {
              "edges": [
                {
                  "node": {
                    "_id": 3,
                    "type": "appointment",
                    "availableFrom": "2026-04-06T06:30:00.000000Z",
                    "availableTo": "2026-12-30T06:30:00.000000Z",
                    "qty": 10,
                    "location": "Noida, Uttar Pradesh",
                    "availableEveryWeek": "0",
                    "appointmentSlot": {
                      "id": "1",
                      "_id": 1,
                      "bookingProductId": "3",
                      "duration": 45,
                      "breakTime": 15,
                      "sameSlotAllDays": "1",
                      "slots": "[{\"to\": \"10:45\", \"from\": \"10:00\"}, {\"to\": \"11:45\", \"from\": \"11:00\"}, {\"to\": \"12:45\", \"from\": \"12:00\"}, {\"to\": \"14:45\", \"from\": \"14:00\"}, {\"to\": \"15:45\", \"from\": \"15:00\"}]"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: BOOKING_TYPE_MISMATCH
        cause: Product is not an appointment booking type
        solution: Ensure the product has appointment booking enabled
  - id: get-rental-booking-product
    title: Get Rental Booking Product
    description: Retrieve a rental booking product with its rental slot configuration. Rental bookings use the `rentalSlot` relationship which includes renting type (daily/hourly), daily and hourly pricing, and slot availability.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          bookingProducts {
            edges {
              node {
                _id
                type
                availableFrom
                availableTo
                qty
                location
                availableEveryWeek
                startingPrice
                formattedStartingPrice
                startingRegularPrice
                formattedStartingRegularPrice
                rentalSlot {
                  id
                  _id
                  bookingProductId
                  rentingType
                  dailyPrice
                  hourlyPrice
                  sameSlotAllDays
                  slots
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2510
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2510",
            "name": "Wooden Folding Chair Rental",
            "sku": "WOODEN-FOLDING-CHAIR-RENTAL",
            "urlKey": "wooden-folding-chair-rental",
            "price": "109",
            "bookingProducts": {
              "edges": [
                {
                  "node": {
                    "_id": 4,
                    "type": "rental",
                    "availableFrom": "2026-04-06T06:30:00.000000Z",
                    "availableTo": "2026-04-30T06:30:00.000000Z",
                    "qty": 150,
                    "location": "Noida, Uttar Pradesh",
                    "availableEveryWeek": "0",
                    "startingPrice": 208,
                    "formattedStartingPrice": "$208.00",
                    "startingRegularPrice": 208,
                    "formattedStartingRegularPrice": "$208.00",
                    "rentalSlot": {
                      "id": "1",
                      "_id": 1,
                      "bookingProductId": "4",
                      "rentingType": "daily_hourly",
                      "dailyPrice": "99",
                      "hourlyPrice": "105",
                      "sameSlotAllDays": "1",
                      "slots": "[{\"to\": \"18:00\", \"from\": \"12:00\"}]"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: BOOKING_TYPE_MISMATCH
        cause: Product is not a rental booking type
        solution: Ensure the product has rental booking enabled
  - id: get-default-booking-product
    title: Get Default Booking Product
    description: Retrieve a default booking product with its slot configuration. Default bookings use the `defaultSlot` relationship which includes booking type, duration, break time, and day-wise slot availability.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          bookingProducts {
            edges {
              node {
                _id
                type
                availableFrom
                availableTo
                qty
                location
                availableEveryWeek
                defaultSlot {
                  id
                  _id
                  bookingType
                  duration
                  breakTime
                  slots
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2507
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2507",
            "name": "Professional Photography Session",
            "sku": "PROFESSIONAL-PHOTOGRAPHY-SESSION",
            "urlKey": "professional-photography-session",
            "price": "100",
            "bookingProducts": {
              "edges": [
                {
                  "node": {
                    "_id": 1,
                    "type": "default",
                    "availableFrom": "2026-04-06T06:30:00.000000Z",
                    "availableTo": "2026-12-31T06:30:00.000000Z",
                    "qty": 150,
                    "location": "Noida, Uttar Pradesh",
                    "availableEveryWeek": null,
                    "defaultSlot": {
                      "id": "1",
                      "_id": 1,
                      "bookingType": "one",
                      "duration": null,
                      "breakTime": null,
                      "slots": "[{\"id\": \"1\", \"to\": \"18:00\", \"from\": \"12:00\", \"to_day\": \"1\", \"from_day\": \"1\"}, {\"id\": \"2\", \"to\": \"18:00\", \"from\": \"12:00\", \"to_day\": \"2\", \"from_day\": \"2\"}, {\"id\": \"1\", \"to\": \"18:00\", \"from\": \"12:00\", \"to_day\": \"3\", \"from_day\": \"3\"}]"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: BOOKING_TYPE_MISMATCH
        cause: Product is not a default booking type
        solution: Ensure the product has default booking enabled
  - id: get-table-booking-product
    title: Get Table Booking Product
    description: Retrieve a table booking product with its slot configuration. Table bookings use the `tableSlot` relationship which includes price type, guest limit, duration, break time, scheduling restrictions, and day-wise slot availability.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          bookingProducts {
            edges {
              node {
                _id
                type
                availableFrom
                availableTo
                qty
                location
                availableEveryWeek
                tableSlot {
                  id
                  _id
                  bookingProductId
                  priceType
                  guestLimit
                  duration
                  breakTime
                  preventSchedulingBefore
                  sameSlotAllDays
                  slots
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2511
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2511",
            "name": "Fine Dining Table Reservation",
            "sku": "FINE-DINING-TABLE-RESERVATION",
            "urlKey": "fine-dining-table-reservation",
            "price": "200",
            "bookingProducts": {
              "edges": [
                {
                  "node": {
                    "_id": 5,
                    "type": "table",
                    "availableFrom": "2026-04-06T06:30:00.000000Z",
                    "availableTo": "2026-04-30T06:30:00.000000Z",
                    "qty": 5,
                    "location": "Mumbai, Maharashtra",
                    "availableEveryWeek": "0",
                    "tableSlot": {
                      "id": "1",
                      "_id": 1,
                      "bookingProductId": "5",
                      "priceType": "guest",
                      "guestLimit": 0,
                      "duration": 45,
                      "breakTime": 15,
                      "preventSchedulingBefore": 2,
                      "sameSlotAllDays": "1",
                      "slots": "[{\"to\": \"12:45\", \"from\": \"12:00\"}, {\"to\": \"13:45\", \"from\": \"13:00\"}, {\"to\": \"14:45\", \"from\": \"14:00\"}, {\"to\": \"19:45\", \"from\": \"19:00\"}, {\"to\": \"20:45\", \"from\": \"20:00\"}, {\"to\": \"21:45\", \"from\": \"21:00\"}]"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: BOOKING_TYPE_MISMATCH
        cause: Product is not a table booking type
        solution: Ensure the product has table booking enabled
  - id: get-event-booking-product
    title: Get Event Booking Product
    description: Retrieve an event booking product with its ticket configuration. Event bookings use the `eventTickets` relationship which includes ticket pricing, quantity, and special price date ranges — a different structure from slot-based booking types.
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          urlKey
          price
          bookingProducts {
            edges {
              node {
                _id
                type
                availableFrom
                availableTo
                qty
                location
                availableEveryWeek
                startingPrice
                formattedStartingPrice
                startingRegularPrice
                formattedStartingRegularPrice
                eventTickets {
                  edges {
                    node {
                      id
                      _id
                      bookingProductId
                      price
                      qty
                      specialPrice
                      specialPriceFrom
                      specialPriceTo
                      formattedPrice
                      formattedSpecialPrice
                      translation {
                        locale
                        name
                        description
                      }
                      translations {
                        edges {
                          node {
                            locale
                            name
                            description
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2508
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2508",
            "name": "Live Music Concert Ticket",
            "sku": "LIVE-MUSIC-CONCERT-TICKET",
            "urlKey": "live-music-concert-ticket",
            "price": "120",
            "bookingProducts": {
              "edges": [
                {
                  "node": {
                    "_id": 2,
                    "type": "event",
                    "availableFrom": "2026-04-06T06:30:00.000000Z",
                    "availableTo": "2026-04-30T06:30:00.000000Z",
                    "qty": 0,
                    "location": "Noida, Uttar Pradesh",
                    "availableEveryWeek": null,
                    "startingPrice": 235,
                    "formattedStartingPrice": "$235.00",
                    "startingRegularPrice": 240,
                    "formattedStartingRegularPrice": "$240.00",
                    "eventTickets": {
                      "edges": [
                        {
                          "node": {
                            "id": "7",
                            "_id": 7,
                            "bookingProductId": "2",
                            "price": "120",
                            "qty": 1500,
                            "specialPrice": "115",
                            "specialPriceFrom": "2026-04-06 12:00:00",
                            "specialPriceTo": "2026-04-30 12:00:00",
                            "formattedPrice": "$120.00",
                            "formattedSpecialPrice": "$115.00",
                            "translation": {
                              "locale": "en",
                              "name": "Standard Entry Ticket",
                              "description": "General admission ticket for the event with access to all standard areas and performances."
                            },
                            "translations": {
                              "edges": [
                                {
                                  "node": {
                                    "locale": "en",
                                    "name": "Standard Entry Ticket",
                                    "description": "General admission ticket for the event with access to all standard areas and performances."
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          "node": {
                            "id": "8",
                            "_id": 8,
                            "bookingProductId": "2",
                            "price": "125",
                            "qty": 150,
                            "specialPrice": "120",
                            "specialPriceFrom": "2026-04-02 12:00:00",
                            "specialPriceTo": "2026-04-30 12:00:00",
                            "formattedPrice": "$125.00",
                            "formattedSpecialPrice": "$120.00",
                            "translation": {
                              "locale": "en",
                              "name": "VIP Access Ticket",
                              "description": "VIP ticket includes priority entry, reserved seating, and access to exclusive areas near the stage."
                            },
                            "translations": {
                              "edges": [
                                {
                                  "node": {
                                    "locale": "en",
                                    "name": "VIP Access Ticket",
                                    "description": "VIP ticket includes priority entry, reserved seating, and access to exclusive areas near the stage."
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
              ]
            }
          }
        }
      }
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
      - error: BOOKING_TYPE_MISMATCH
        cause: Product is not an event booking type
        solution: Ensure the product has event booking enabled
  - id: get-product-with-customizable-options
    title: Get Simple Product with Customizable Options
    description: Retrieve a product's customizable options. Each option node's `_id` is the option id and each price node's `_id` is a selectable value id — you send these back when adding to cart (see Add to Cart).
    query: |
      query getProduct($id: ID!) {
        product(id: $id) {
          id
          name
          sku
          price
          customizableOptions {
            edges {
              node {
                _id
                type
                isRequired
                maxCharacters
                customizableOptionPrices {
                  edges {
                    node {
                      _id
                      label
                      price
                      formattedPrice
                      sortOrder
                    }
                  }
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "id": 2977
      }
    response: |
      {
        "data": {
          "product": {
            "id": "/api/shop/products/2977",
            "name": "Simple Customizable options",
            "sku": "testcustomizeoption",
            "price": "24",
            "customizableOptions": {
              "edges": [
                {
                  "node": {
                    "_id": 9,
                    "type": "select",
                    "isRequired": "0",
                    "maxCharacters": null,
                    "customizableOptionPrices": {
                      "edges": [
                        {
                          "node": {
                            "_id": 9,
                            "label": "1kg",
                            "price": "10",
                            "formattedPrice": "$10.00",
                            "sortOrder": 0
                          }
                        },
                        {
                          "node": {
                            "_id": 10,
                            "label": "2kg",
                            "price": "20",
                            "formattedPrice": "$20.00",
                            "sortOrder": 1
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  "node": {
                    "_id": 10,
                    "type": "select",
                    "isRequired": "1",
                    "maxCharacters": null,
                    "customizableOptionPrices": {
                      "edges": [
                        {
                          "node": {
                            "_id": 11,
                            "label": "Chocolate",
                            "price": "10",
                            "formattedPrice": "$10.00",
                            "sortOrder": 0
                          }
                        },
                        {
                          "node": {
                            "_id": 12,
                            "label": "Pineapple",
                            "price": "20",
                            "formattedPrice": "$20.00",
                            "sortOrder": 1
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
    commonErrors:
      - error: PRODUCT_NOT_FOUND
        cause: Provided product ID does not exist
        solution: Verify the product ID exists
---

# Single Product

## About

The `product` query retrieves a single product by its unique identifier, SKU, or URL key. Use this query to:

- Fetch individual products for detail pages
- Look up products by different identifier types (ID, SKU, URL)
- Display complete product information including images, variants, and attributes
- Show product pricing, descriptions, and SEO metadata
- Retrieve inventory and availability status
- Build product-specific API integrations
- Generate product detail pages with all metadata

This query supports multiple lookup methods (ID, SKU, or URL key) and can return minimal data for previews or comprehensive data for full product detail pages, making it flexible for various use cases.

::: info Why Booking Product Types Are Documented Separately
All product types (simple, configurable, grouped, bundle, downloadable, virtual) share the same core fields (`name`, `sku`, `price`, `images`, `variants`, `attributeValues`, etc.) and can be queried using the same base query structure. However, **booking products** are documented with separate examples because each booking type (Appointment, Rental, Default, Table, Event) exposes its own unique relationship and slot structure through the `bookingProducts` field. These sub-types have different fields and response shapes (e.g., `appointmentSlot`, `rentalSlot`, `defaultSlot`, `tableSlot`, `eventTickets`), so dedicated examples are provided to show how to query each one correctly.
:::

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `id` | `ID` | Product's unique system identifier. Use this for direct lookups. |
| `sku` | `String` | Stock Keeping Unit. Alternative identifier for product lookup. |
| `urlKey` | `String` | URL-friendly product slug. Alternative lookup method. Matched across **all locales** — a slug created in any locale resolves regardless of the request's `locale`. |
| `include_variants` | `Boolean` | Include product variants (colors, sizes, options). Default: `false` |
| `include_images` | `Boolean` | Include product images. Default: `false` |
| `include_attributes` | `Boolean` | Include custom product attributes. Default: `true` |
| `image_resolution` | `String` | Image quality: `thumbnail`, `medium`, `large`, `original`. Default: `large` |
| `include_recommendations` | `Boolean` | Include related and recommended products. Default: `false` |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique product identifier. |
| `name` | `String!` | Product display name. |
| `sku` | `String!` | Stock Keeping Unit for inventory tracking. |
| `urlKey` | `String!` | URL-friendly product slug for SEO. |
| `type` | `String!` | Product type (simple, configurable, grouped, bundle). |
| `description` | `String` | Full product description with formatting. |
| `shortDescription` | `String` | Brief product summary. |
| `price` | `Float!` | Base product price. |
| `specialPrice` | `Float` | Promotional/discounted price if applicable. |
| `superAttributeOptions` | `String (JSON)` | JSON-encoded array of configurable attribute options (e.g. color, size) with their available values. Only populated for **configurable** products — returns the attributes and selectable options that define the product's variants. |
| `combinations` | `String (JSON)` | JSON-encoded object mapping variant product IDs to their attribute option combinations. Each key is a variant ID and the value contains the attribute option IDs that define that variant. Only populated for **configurable** products. |
| `taxClass` | `String` | Tax classification for the product. |
| `images` | `[ProductImage!]` | Array of product images with URLs and metadata. |
| `images.url` | `String!` | Image URL. |
| `images.altText` | `String` | Image alt text for accessibility. |
| `images.position` | `Int` | Image order in gallery. |
| `images.width` | `Int` | Image width in pixels. |
| `images.height` | `Int` | Image height in pixels. |
| `attributes` | `[ProductAttribute!]` | Custom product attributes and values. |
| `variants` | `[ProductVariant!]` | Product variants (colors, sizes, options). |
| `variants.sku` | `String!` | Variant SKU. |
| `variants.price` | `Float!` | Variant-specific price. |
| `inventory` | `InventoryInfo!` | Stock availability information. |
| `inventory.stock` | `Int!` | Current stock quantity. |
| `inventory.status` | `String!` | Stock status (in_stock, out_of_stock, low_stock). |
| `categories` | `[Category!]!` | Categories this product belongs to. |
| `tags` | `[String!]` | Product tags and labels. |
| `seo` | `ProductSEO!` | SEO metadata. |
| `status` | `String!` | Product status (active, draft, inactive). |
| `visibility` | `String!` | Visibility status (visible, not visible, search only). |
| `createdAt` | `DateTime!` | Product creation date. |
| `updatedAt` | `DateTime!` | Last modification date. |
| `isInWishlist` | `Int` | Whether the signed-in customer has this product in their **wishlist** (active channel): `1` = yes, `0` = no. |
| `isInCompare` | `Int` | Whether the signed-in customer has this product in their **compare list**: `1` = yes, `0` = no. |

> **Wishlist & compare flags:** `isInWishlist` and `isInCompare` let you highlight the wishlist / compare icon directly from the product response instead of separately fetching and cross-referencing those lists. They require the customer Bearer token — for guests both are `0`. The values are `0` / `1`; over GraphQL they are returned as the strings `"1"` (in the list) / `"0"` (not in the list), while the REST API returns them as `1` / `0` integers.

## Configurable Products

A **configurable product** is a product that has multiple variants based on attributes like color, size, or material. For example, a T-shirt that comes in 3 colors and 2 sizes would have 6 variants. When querying a configurable product, two additional fields are returned that are essential for building a variant selection UI:

### `superAttributeOptions`

This field returns a JSON-encoded string containing the configurable attributes and their selectable options. Each entry includes:

- `code` — the attribute code (e.g. `color`, `size`)
- `label` — the display label (e.g. `Color`, `Size`)
- `options` — an array of available values, each with an `id` and `label`

Use this field to render attribute dropdowns (e.g. color picker, size selector) on the product detail page.

### `combinations`

This field returns a JSON-encoded object that maps each **variant product ID** to its specific attribute option combination. For example:

```json
{"8": {"color": 3, "size": 7}, "9": {"color": 3, "size": 8}}
```

This means variant ID `8` is the product with color option `3` and size option `7`. When a customer selects a color and size from the dropdowns, use this mapping to resolve which variant ID to load (for pricing, stock, images, etc.).

### How they work together

1. Use `superAttributeOptions` to render the attribute dropdowns on your product page
2. When the customer selects options (e.g. Color: Blue, Size: M), match their selection against the `combinations` object to find the corresponding variant ID
3. Use that variant ID to display the correct price, stock status, and images for the selected variant

> For non-configurable product types (simple, grouped, bundle, etc.), both `superAttributeOptions` and `combinations` will be `null`.

## Downloadable Products

A **downloadable** product contains digital files that customers can download after purchase. Each downloadable product can have two types of sample files:

### `downloadableLinks`

These are the individual download links that make up the product (e.g. Track 1, Track 2 for a music album, or Chapter 1, Chapter 2 for an e-book). Each link has its own price and can optionally have a **sample file** attached for preview. The fields `sampleFile`, `sampleFileUrl`, and `sampleUrl` provide details about the sample associated with each link.

### `downloadableSamples`

These are **product-level samples** — general preview files for the entire product rather than a specific link. The `_id` from each sample node is used to download the sample via:

```
GET /api/shop/downloadable/download-sample/sample/{_id}
```

### Downloading purchased files

After a customer purchases a downloadable product, the purchased files can be downloaded using the `_id` from the [Get Downloadable Products](/api/graphql-api/shop/queries/get-customer-downloadable-products) query (not the product query). See the [Download Downloadable Product](/api/graphql-api/shop/queries/download-downloadable-product) page for full details.

> Sample downloads are free and do not require authentication. Purchased file downloads require customer authentication and have a limited number of downloads.

## Grouped Products

A **grouped product** bundles multiple simple products together, allowing customers to purchase them as a set. Unlike a bundle product where the customer selects options, a grouped product presents each child product with a default quantity that the customer can adjust before adding to cart.

### `groupedProducts`

This field returns the list of associated child products via the `groupedProducts` connection. Each node contains:

- `id` — the grouped product relationship ID
- `qty` — the default quantity for that child product in the group
- `sortOrder` — the display order of the child product
- `associatedProduct` — the full child product details including `id`, `name`, `sku`, `price`, `formattedPrice`, `specialPrice`, `formattedSpecialPrice`, and `images`

### Pricing behavior

A grouped product's own `price` is always `0` because it does not have a standalone price. Instead, the price range is derived from its child products:

- `minimumPrice` — the lowest priced child product
- `maximumPrice` — the highest priced child product

The customer's total depends on which child products they select and in what quantities.

> For non-grouped product types, the `groupedProducts` field will return an empty edges array.

## Booking Product Types

All standard product types (simple, configurable, grouped, bundle, downloadable, virtual) share the same core fields and can be queried using any of the general examples above. Booking products, however, require special attention because each booking type exposes a **different relationship with its own unique fields** through the `bookingProducts` connection.

The `bookingProducts` field returns a `type` that determines which slot/ticket relationship contains the data:

| Booking Type | Relationship Field | Key Fields | Use Case |
|---|---|---|---|
| **Appointment** | `appointmentSlot` | `duration`, `breakTime`, `sameSlotAllDays`, `slots` | Salon visits, doctor appointments, consultations |
| **Rental** | `rentalSlot` | `rentingType`, `dailyPrice`, `hourlyPrice`, `slots` | Equipment rental, vehicle hire, venue booking |
| **Default** | `defaultSlot` | `bookingType`, `duration`, `breakTime`, `slots` | General time-slot bookings |
| **Table** | `tableSlot` | `priceType`, `guestLimit`, `duration`, `breakTime`, `preventSchedulingBefore`, `slots` | Restaurant reservations, meeting rooms |
| **Event** | `eventTickets` | `price`, `qty`, `specialPrice`, `specialPriceFrom`, `specialPriceTo` | Concerts, workshops, conferences |

::: tip
Only the relationship matching the product's booking type will contain data. For example, an appointment booking product will have data in `appointmentSlot` but not in `rentalSlot` or `tableSlot`. Always check the `type` field first to determine which relationship to query.
:::

### Starting-from price

Each `bookingProducts` node also exposes a computed **"starting from"** price — the product base price plus the cheapest bookable extra — matching what the storefront shows on the product card / detail page:

| Field | Meaning |
|---|---|
| `startingPrice` | Final (post-discount) starting price. |
| `formattedStartingPrice` | Currency-formatted `startingPrice`. |
| `startingRegularPrice` | Pre-discount starting price. Differs from `startingPrice` only when an event ticket is on sale — use both to render a strike-through. |
| `formattedStartingRegularPrice` | Currency-formatted `startingRegularPrice`. |

The extra is the **cheapest event ticket** (for `event`) or the **minimum rental unit rate** (for `rental`, whichever of hourly/daily is smallest). For `default`, `appointment` and `table` there is no composed extra, so all four fields are `null` and the product's own `price` is the correct figure.

## Product Fields Reference

Below is a complete reference of all available fields on the `Product` type. Use this as a lookup when building your queries — include only the fields you need.

### Basic Information

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique product identifier in IRI format (e.g. `/api/shop/products/1`) |
| `_id` | `Int!` | Numeric database ID |
| `sku` | `String!` | Stock Keeping Unit — unique product code for inventory tracking |
| `type` | `String!` | Product type: `simple`, `virtual`, `configurable`, `grouped`, `bundle`, `downloadable`, `booking` |
| `name` | `String` | Product display name |
| `urlKey` | `String` | URL-friendly slug (e.g. `premium-wireless-headphones`) |
| `status` | `String` | Product status (`1` = active, `0` = inactive) |
| `locale` | `String` | Locale of the returned product data |
| `channel` | `String` | Channel the product belongs to |
| `productNumber` | `String` | Optional product number assigned by the store |
| `additional` | `Iterable` | Additional product data stored as key-value pairs |
| `createdAt` | `String` | Product creation timestamp |
| `updatedAt` | `String` | Last modification timestamp |

### Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `description` | `String` | Full product description (plain text) |
| `descriptionHtml` | `String` | Full product description with HTML formatting preserved |
| `shortDescription` | `String` | Brief product summary for listing pages |

### Pricing

| Field | Type | Description |
|-------|------|-------------|
| `price` | `String` | Base catalog price. Reflects active currency conversion. |
| `specialPrice` | `String` | Discounted price if set, otherwise `null` |
| `specialPriceFrom` | `String` | Start date for the special price (YYYY-MM-DD) |
| `specialPriceTo` | `String` | End date for the special price (YYYY-MM-DD) |
| `cost` | `String` | Product cost/purchase price (internal use) |
| `minimumPrice` | `String` | Lowest effective price — accounts for special price and variant pricing. Used for price sorting. |
| `maximumPrice` | `String` | Highest effective price across all variants |
| `regularMinimumPrice` | `String` | Regular (non-discounted) minimum price |
| `regularMaximumPrice` | `String` | Regular (non-discounted) maximum price |
| `formattedPrice` | `String` | `price` with currency symbol (e.g. `$99.00`) |
| `formattedSpecialPrice` | `String` | `specialPrice` with currency symbol |
| `formattedMinimumPrice` | `String` | `minimumPrice` with currency symbol |
| `formattedMaximumPrice` | `String` | `maximumPrice` with currency symbol |
| `formattedRegularMinimumPrice` | `String` | `regularMinimumPrice` with currency symbol |
| `formattedRegularMaximumPrice` | `String` | `regularMaximumPrice` with currency symbol |
| `taxCategoryId` | `String` | Tax category ID assigned to the product |

### Physical Dimensions

| Field | Type | Description |
|-------|------|-------------|
| `weight` | `String` | Product weight |
| `length` | `String` | Product length |
| `width` | `String` | Product width |
| `height` | `String` | Product height |

### Attributes

| Field | Type | Description |
|-------|------|-------------|
| `color` | `String` | Color attribute value (if applicable) |
| `size` | `String` | Size attribute value (if applicable) |
| `brand` | `String` | Brand attribute value (if applicable) |

### SEO

| Field | Type | Description |
|-------|------|-------------|
| `metaTitle` | `String` | SEO meta title for the product page |
| `metaKeywords` | `String` | SEO meta keywords |
| `metaDescription` | `String` | SEO meta description |

### Flags & Settings

| Field | Type | Description |
|-------|------|-------------|
| `isSaleable` | `String` | Whether the product can be purchased (`1` = yes) |
| `new` | `String` | Whether the product is marked as "new" (`1` = yes) |
| `featured` | `String` | Whether the product is featured (`1` = yes) |
| `visibleIndividually` | `String` | Whether the product appears in catalog listings (`1` = yes) |
| `guestCheckout` | `String` | Whether guest users can purchase this product (`1` = yes) |
| `manageStock` | `String` | Whether stock is managed for this product (`1` = yes) |

### Configurable Product Fields

| Field | Type | Description |
|-------|------|-------------|
| `superAttributeOptions` | `String` | JSON-encoded array of configurable attributes and their selectable options. See [Configurable Products](#configurable-products). |
| `combinations` | `String` | JSON-encoded object mapping variant IDs to their attribute option combinations. See [Configurable Products](#configurable-products). |

### Media

| Field | Type | Description |
|-------|------|-------------|
| `baseImageUrl` | `String` | URL of the product's primary/base image |

## Product Relationships Reference

These are the connection/relationship fields available on the `Product` type. Each returns a paginated cursor connection supporting `first`, `last`, `before`, and `after` arguments.

### Core Relationships

| Relationship | Return Type | Description |
|---|---|---|
| `images` | `ProductImageCursorConnection` | Product gallery images with `id`, `publicPath`, and `position` |
| `videos` | `ProductVideoCursorConnection` | Product videos |
| `categories` | `CategoryCursorConnection` | Categories the product belongs to, with `translation { name }` |
| `attributeValues` | `AttributeValueCursorConnection` | All attribute values with `value` and `attribute { code, adminName }` |
| `attributeFamily` | `AttributeFamily!` | The attribute family this product belongs to (not paginated) |
| `channels` | `ChannelCursorConnection` | Channels this product is assigned to |

### Variant & Configuration

| Relationship | Return Type | Description |
|---|---|---|
| `variants` | `ProductCursorConnection` | Child variant products (for configurable products). Each variant is a full `Product` with its own `id`, `name`, `sku`, `price`, and `attributeValues`. |
| `superAttributes` | `AttributeCursorConnection` | The attributes used for configurable options (e.g. Color, Size) |
| `parent` | `Product!` | Parent product (for variant products — returns the configurable parent) |

### Product Type-Specific

| Relationship | Return Type | Description | Dropdown Example |
|---|---|---|---|
| `groupedProducts` | `ProductGroupedProductCursorConnection` | Associated child products with `qty`, `sortOrder`, and `associatedProduct` details | "Get Grouped Product" |
| `bundleOptions` | `ProductBundleOptionCursorConnection` | Bundle option groups with selectable products and quantities | — |
| `downloadableLinks` | `ProductDownloadableLinkCursorConnection` | Downloadable links with `price`, `formattedPrice`, `translation { title }`, and sample info | "Get Downloadable Product with Samples" |
| `downloadableSamples` | `ProductDownloadableSampleCursorConnection` | Product-level sample files with `file`, `fileUrl`, `url`, and `translation { title }` | "Get Downloadable Product with Samples" |
| `bookingProducts` | `BookingProductCursorConnection` | Booking configuration with `type`, `availableFrom`, `availableTo`, `qty`, `location`, and type-specific slots | "Get Appointment/Rental/Default/Table/Event Booking Product" |
| `customizableOptions` | `ProductCustomizableOptionCursorConnection` | Custom product options (e.g. engraving text, gift wrapping) | — |

### Related & Recommended Products

| Relationship | Return Type | Description |
|---|---|---|
| `relatedProducts` | `ProductCursorConnection` | Products marked as related — typically shown in a "Related Products" section on the product page |
| `upSells` | `ProductCursorConnection` | Up-sell products — higher-value alternatives shown on the product page |
| `crossSells` | `ProductCursorConnection` | Cross-sell products — complementary items shown during checkout or in the cart |

### Reviews

| Relationship | Return Type | Description |
|---|---|---|
| `reviews` | `ProductReviewCursorConnection` | All reviews for this product (all statuses) |
| `approvedReviews` | `ProductReviewCursorConnection` | Only admin-approved reviews — use this for public-facing display |

::: tip
All relationship fields support cursor-based pagination with `first`, `last`, `before`, and `after` arguments. For example: `images(first: 5)` returns only the first 5 images. Use the nested `pageInfo { hasNextPage, endCursor }` to paginate through large collections.
:::
