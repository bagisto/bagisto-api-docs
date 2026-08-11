---
outline: false
examples:
  - id: get-products-wishlist-compare-flags
    title: Get Products with Wishlist & Compare Flags
    description: For a signed-in customer, every product carries 'isInWishlist' and 'isInCompare' fields.
    query: |
      query getProductsWithFlags {
        products(first: 3) {
          edges {
            node {
              id
              name
              sku
              isInWishlist
              isInCompare
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/1",
                  "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                  "sku": "COASTALBREEZEMENSHOODIE",
                  "isInWishlist": "1",
                  "isInCompare": "0"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/22",
                  "name": "Acme Drawstring Bag",
                  "sku": "ACME-DRAWBAG-001",
                  "isInWishlist": "0",
                  "isInCompare": "1"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/92",
                  "name": "Bagisto Sticker",
                  "sku": "bagisto-sticker",
                  "isInWishlist": "0",
                  "isInCompare": "0"
                }
              }
            ]
          }
        }
      }

  - id: get-products-currency-formatted-prices
    title: Get Products with Currency Formatted Prices
    description: Fetch products with all formatted price fields that reflect the active currency set via the locale header.
    query: |
      query getProductsSorted {
        products(first: 10) {
          edges {
            node {
              id
              name
              sku
              price
              formattedPrice
              specialPrice
              formattedSpecialPrice
              minimumPrice
              formattedMinimumPrice
              maximumPrice
              formattedMaximumPrice
              regularMinimumPrice
              formattedRegularMinimumPrice
              regularMaximumPrice
              formattedRegularMaximumPrice
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/1",
                  "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                  "sku": "COASTALBREEZEMENSHOODIE",
                  "price": "100",
                  "formattedPrice": "$100.00",
                  "specialPrice": null,
                  "formattedSpecialPrice": null,
                  "minimumPrice": "100",
                  "formattedMinimumPrice": "$100.00",
                  "maximumPrice": "100",
                  "formattedMaximumPrice": "$100.00",
                  "regularMinimumPrice": "100",
                  "formattedRegularMinimumPrice": "$100.00",
                  "regularMaximumPrice": "100",
                  "formattedRegularMaximumPrice": "$100.00"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/22",
                  "name": "Acme Drawstring Bag",
                  "sku": "ACME-DRAWBAG-001",
                  "price": "3000",
                  "formattedPrice": "$3,000.00",
                  "specialPrice": "2700",
                  "formattedSpecialPrice": "$2,700.00",
                  "minimumPrice": "2700",
                  "formattedMinimumPrice": "$2,700.00",
                  "maximumPrice": "2700",
                  "formattedMaximumPrice": "$2,700.00",
                  "regularMinimumPrice": "3000",
                  "formattedRegularMinimumPrice": "$3,000.00",
                  "regularMaximumPrice": "3000",
                  "formattedRegularMaximumPrice": "$3,000.00"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/92",
                  "name": "Bagisto Sticker",
                  "sku": "bagisto-sticker",
                  "price": "10",
                  "formattedPrice": "$10.00",
                  "specialPrice": "8",
                  "formattedSpecialPrice": "$8.00",
                  "minimumPrice": "8",
                  "formattedMinimumPrice": "$8.00",
                  "maximumPrice": "8",
                  "formattedMaximumPrice": "$8.00",
                  "regularMinimumPrice": "10",
                  "formattedRegularMinimumPrice": "$10.00",
                  "regularMaximumPrice": "10",
                  "formattedRegularMaximumPrice": "$10.00"
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/114",
                  "name": "Nike Shoes",
                  "sku": "Nike-Shoes",
                  "price": "200",
                  "formattedPrice": "$200.00",
                  "specialPrice": "123",
                  "formattedSpecialPrice": "$123.00",
                  "minimumPrice": "123",
                  "formattedMinimumPrice": "$123.00",
                  "maximumPrice": "123",
                  "formattedMaximumPrice": "$123.00",
                  "regularMinimumPrice": "200",
                  "formattedRegularMinimumPrice": "$200.00",
                  "regularMaximumPrice": "200",
                  "formattedRegularMaximumPrice": "$200.00"
                }
              }
            ]
          }
        }
      }

  - id: get-products-type-simple
    title: Get Products - Simple Type
    description: Retrieve all simple products. Simple products have no variants and include pricing, images, attributes, categories and customizable options.
    query: |
      query getAllSimpleProducts {
        products(filter: "{\"type\": \"simple\"}") {
          edges {
            node {
              id
              name
              sku
              urlKey
              description
              shortDescription
              price
              specialPrice
              customizableOptions {
                edges {
                  node {
                    id
                    _id
                    type
                    isRequired
                    maxCharacters
                    supportedFileExtensions
                    sortOrder
                    customizableOptionPrices {
                      edges {
                        node {
                          label
                          price
                          formattedPrice
                        }
                      }
                    }
                  }   
                }
              }
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/1",
                  "name": "Coastal Breeze Men's Blue Zipper Hoodie",
                  "sku": "COASTALBREEZEMENSHOODIE",
                  "urlKey": "coastal-breeze-mens-blue-zipper-hoodie",
                  "description": "The Coastal Breeze Men's Blue Zipper Hoodie is your reliable companion for staying warm, comfortable, and stylish...",
                  "shortDescription": "Stay warm and stylish with the Coastal Breeze Men's Blue Zipper Hoodie. This fashionable hoodie features a modern design, making it ideal for casual and active wear.",
                  "price": "100",
                  "specialPrice": null,
                  "customizableOptions": {
                    "edges": []
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/967",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/1/zKcWZTLDjcawJmaNg8g1cpARqwVONgEKEflabstT.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "COASTALBREEZEMENSHOODIE",
                          "attribute": {
                            "code": "sku",
                            "adminName": "SKU"
                          }
                        }
                      },
                      {
                        "node": {
                          "value": "Coastal Breeze Men's Blue Zipper Hoodie",
                          "attribute": {
                            "code": "name",
                            "adminName": "Name"
                          }
                        }
                      },
                      {
                        "node": {
                          "value": "coastal-breeze-mens-blue-zipper-hoodie",
                          "attribute": {
                            "code": "url_key",
                            "adminName": "URL Key"
                          }
                        }
                      },
                      {
                        "node": {
                          "value": "1",
                          "attribute": {
                            "code": "manage_stock",
                            "adminName": "Manage Stock"
                          }
                        }
                      }
                    ]
                  },
                  "categories": {
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2",
                  "name": "PureStride Men's Classic White Sneakers",
                  "sku": "PUREWHTSNEAK2023",
                  "urlKey": "purestride-mens-classic-white-sneakers",
                  "description": "Introducing PureStride Men's Classic White Sneakers, a perfect blend of style, comfort, and versatility...",
                  "shortDescription": "Step into timeless style and comfort with our PureStride Men's Classic White Sneakers.",
                  "price": "189",
                  "specialPrice": null,
                  "customizableOptions": {
                    "edges": []
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/969",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2/XmdfIafCjuYEhHiBkHvzmOuDT0mpGHDTi9QhnUoY.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "PUREWHTSNEAK2023",
                          "attribute": {
                            "code": "sku",
                            "adminName": "SKU"
                          }
                        }
                      },
                      {
                        "node": {
                          "value": "PureStride Men's Classic White Sneakers",
                          "attribute": {
                            "code": "name",
                            "adminName": "Name"
                          }
                        }
                      }
                    ]
                  },
                  "categories": {
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/92",
                  "name": "Bagisto Sticker",
                  "sku": "bagisto-sticker",
                  "urlKey": "bagisto-sticker",
                  "description": "A collectible Bagisto branded sticker, perfect for laptops and notebooks.",
                  "shortDescription": "Bagisto branded collectible sticker.",
                  "price": "10",
                  "specialPrice": "8",
                  "customizableOptions": {
                    "edges": []
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/965",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/92/JUvPvPCFeYnjPdVOr1HThLzHptZ7BZLp2RQPnSG5.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "bagisto-sticker",
                          "attribute": {
                            "code": "sku",
                            "adminName": "SKU"
                          }
                        }
                      },
                      {
                        "node": {
                          "value": "Bagisto Sticker",
                          "attribute": {
                            "code": "name",
                            "adminName": "Name"
                          }
                        }
                      }
                    ]
                  },
                  "categories": {
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/91",
                  "name": "Bagisto Keyboard",
                  "sku": "Bagisto-keyboard",
                  "urlKey": "bagisto-keyboard",
                  "description": "A mechanical keyboard designed for productivity and comfort.",
                  "shortDescription": "Mechanical keyboard for everyday computing.",
                  "price": "20",
                  "specialPrice": null,
                  "customizableOptions": {
                    "edges": []
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/964",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/91/E9jCNFXrqr2PYYLKIXUbjFRBURpkYms3MWKJRIba.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "Bagisto-keyboard",
                          "attribute": {
                            "code": "sku",
                            "adminName": "SKU"
                          }
                        }
                      },
                      {
                        "node": {
                          "value": "Bagisto Keyboard",
                          "attribute": {
                            "code": "name",
                            "adminName": "Name"
                          }
                        }
                      }
                    ]
                  },
                  "categories": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/categories/8",
                          "translation": {
                            "name": "Electronics"
                          }
                        }
                      }
                    ]
                  }
                }
              }
            ],
            "totalCount": 45
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes e.g. "{\"type\":\"simple\"}"

  - id: get-products-type-configurable
    title: Get Products - Configurable Type
    description: Retrieve all configurable products. Configurable products have selectable variants (e.g. size, color) and include variants, combinations, and superAttributeOptions.
    query: |
      query getAllConfigurableProducts {
        products(filter: "{\"type\": \"configurable\"}") {
          edges {
            node {
              id
              name
              sku
              type
              combinations
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
              urlKey
              description
              shortDescription
              minimumPrice
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/123",
                  "name": "Zoe Tank",
                  "sku": "ZOE-TANK-001",
                  "type": "configurable",
                  "combinations": "{\"124\":{\"color\":1,\"size\":6},\"125\":{\"color\":2,\"size\":6},\"129\":{\"color\":1,\"size\":7},\"132\":{\"color\":2,\"size\":7}}",
                  "superAttributeOptions": "[{\"id\":23,\"code\":\"color\",\"label\":\"Color\",\"options\":[{\"id\":1,\"label\":\"Red\"},{\"id\":2,\"label\":\"Green\"}]},{\"id\":24,\"code\":\"size\",\"label\":\"Size\",\"options\":[{\"id\":6,\"label\":\"S\"},{\"id\":7,\"label\":\"M\"}]}]",
                  "variants": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/products/124",
                          "name": "Zoe Tank - Red / S",
                          "sku": "ZOE-TANK-RED-S",
                          "price": "2040",
                          "attributeValues": {
                            "edges": [
                              {
                                "node": {
                                  "value": "ZOE-TANK-RED-S",
                                  "attribute": { "code": "sku", "adminName": "SKU" }
                                }
                              },
                              {
                                "node": {
                                  "value": "Zoe Tank - Red / S",
                                  "attribute": { "code": "name", "adminName": "Name" }
                                }
                              }
                            ]
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/products/129",
                          "name": "Zoe Tank - Red / M",
                          "sku": "ZOE-TANK-RED-M",
                          "price": "2040",
                          "attributeValues": {
                            "edges": [
                              {
                                "node": {
                                  "value": "ZOE-TANK-RED-M",
                                  "attribute": { "code": "sku", "adminName": "SKU" }
                                }
                              },
                              {
                                "node": {
                                  "value": "Zoe Tank - Red / M",
                                  "attribute": { "code": "name", "adminName": "Name" }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "urlKey": "zoe-tank",
                  "description": "A stylish tank top available in multiple colors and sizes, perfect for layering or wearing solo.",
                  "shortDescription": "Stylish tank top with color and size options.",
                  "minimumPrice": "2040",
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/50",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/123/zoe-tank.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "ZOE-TANK-001",
                          "attribute": { "code": "sku", "adminName": "SKU" }
                        }
                      },
                      {
                        "node": {
                          "value": "Zoe Tank",
                          "attribute": { "code": "name", "adminName": "Name" }
                        }
                      },
                      {
                        "node": {
                          "value": "zoe-tank",
                          "attribute": { "code": "url_key", "adminName": "URL Key" }
                        }
                      }
                    ]
                  },
                  "categories": {
                    "edges": []
                  }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2495",
                  "name": "Ivory Frost Classic Overcoat",
                  "sku": "IVORY-OVERCOAT-001",
                  "type": "configurable",
                  "combinations": "{\"2496\":{\"color\":19,\"size\":6},\"2497\":{\"color\":19,\"size\":7},\"2498\":{\"color\":20,\"size\":6},\"2499\":{\"color\":20,\"size\":7}}",
                  "superAttributeOptions": "[{\"id\":23,\"code\":\"color\",\"label\":\"Color\",\"options\":[{\"id\":19,\"label\":\"Blue\"},{\"id\":20,\"label\":\"Ash grey\"}]},{\"id\":24,\"code\":\"size\",\"label\":\"Size\",\"options\":[{\"id\":6,\"label\":\"S\"},{\"id\":7,\"label\":\"M\"}]}]",
                  "variants": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/products/2496",
                          "name": "Ivory Frost Classic Overcoat - Blue / S",
                          "sku": "IVORY-OVERCOAT-BLUE-S",
                          "price": "500",
                          "attributeValues": {
                            "edges": [
                              {
                                "node": {
                                  "value": "IVORY-OVERCOAT-BLUE-S",
                                  "attribute": { "code": "sku", "adminName": "SKU" }
                                }
                              },
                              {
                                "node": {
                                  "value": "Ivory Frost Classic Overcoat - Blue / S",
                                  "attribute": { "code": "name", "adminName": "Name" }
                                }
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "urlKey": "ivory-frost-classic-overcoat",
                  "description": "The Ivory Frost Classic Overcoat blends modern simplicity with timeless winter design. Crafted in a smooth, insulating fabric, it offers dependable warmth while maintaining a lightweight, structured feel.",
                  "shortDescription": "A sleek ivory overcoat with a tailored fit and soft warmth.",
                  "minimumPrice": "500",
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/950",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2495/FFHxE9HE2Ezt9aqvr6s3fPPCc1nrjwMNna1o1wTQ.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "IVORY-OVERCOAT-001",
                          "attribute": { "code": "sku", "adminName": "SKU" }
                        }
                      },
                      {
                        "node": {
                          "value": "Ivory Frost Classic Overcoat",
                          "attribute": { "code": "name", "adminName": "Name" }
                        }
                      }
                    ]
                  },
                  "categories": {
                    "edges": []
                  }
                }
              }
            ],
            "totalCount": 12
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes

  - id: get-products-type-booking
    title: Get Products - Booking Type
    description: Retrieve all booking products. Booking products are time-slot or appointment-based and include bookingProducts connection with availability details.
    query: |
      query getAllBookingProducts {
        products(filter: "{\"type\": \"booking\"}") {
          edges {
            node {
              id
              name
              sku
              type
              urlKey
              description
              shortDescription
              price
              specialPrice
              bookingProducts {
                edges {
                  node {
                    id
                    type
                    qty
                    location
                    showLocation
                    availableEveryWeek
                    availableFrom
                    availableTo
                    createdAt
                    updatedAt
                  }
                }
              }
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/2507",
                  "name": "Professional Photography Session",
                  "sku": "PROFESSIONAL-PHOTOGRAPHY-SESSION",
                  "type": "booking",
                  "urlKey": "professional-photography-session",
                  "description": "Capture high-quality photos with a professional photography session. Suitable for portraits, events, and product shoots.",
                  "shortDescription": "Book a professional photography session for personal or commercial use.",
                  "price": "100",
                  "specialPrice": "99",
                  "bookingProducts": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/booking-products/1",
                          "type": "default",
                          "qty": 150,
                          "location": "Noida, Uttar Pradesh",
                          "showLocation": "0",
                          "availableEveryWeek": null,
                          "availableFrom": "2026-04-06T06:30:00.000000Z",
                          "availableTo": "2026-12-31T06:30:00.000000Z",
                          "createdAt": "2026-04-02T13:24:30.000000Z",
                          "updatedAt": "2026-04-06T10:09:47.000000Z"
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/850",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2507/1jO3Pb5UA89ZaVsp1cnlICSFgZKlwy6lPlDJynGu.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2508",
                  "name": "Live Music Concert Ticket",
                  "sku": "LIVE-MUSIC-CONCERT-TICKET",
                  "type": "booking",
                  "urlKey": "live-music-concert-ticket",
                  "description": "Enjoy a live music concert featuring top artists and an energetic crowd.",
                  "shortDescription": "Book tickets for an exciting live music concert experience.",
                  "price": "120",
                  "specialPrice": null,
                  "bookingProducts": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/booking-products/2",
                          "type": "event",
                          "qty": 0,
                          "location": "Noida, Uttar Pradesh",
                          "showLocation": "0",
                          "availableEveryWeek": null,
                          "availableFrom": "2026-04-06T06:30:00.000000Z",
                          "availableTo": "2026-04-30T06:30:00.000000Z",
                          "createdAt": "2026-04-02T13:41:33.000000Z",
                          "updatedAt": "2026-04-06T10:01:47.000000Z"
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/846",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2508/qXYifNamNZcymBWoGmuh3cauzyujPl23mMH1XYPt.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2509",
                  "name": "Men's Haircut Appointment",
                  "sku": "SALON-HAIRCUT-APPOINTMENT",
                  "type": "booking",
                  "urlKey": "mens-haircut-appointment",
                  "description": "Schedule a haircut with experienced stylists. Choose your preferred date and time slot.",
                  "shortDescription": "Book a professional haircut appointment with flexible time slots.",
                  "price": "60",
                  "specialPrice": "55",
                  "bookingProducts": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/booking-products/3",
                          "type": "appointment",
                          "qty": 10,
                          "location": "Noida, Uttar Pradesh",
                          "showLocation": "0",
                          "availableEveryWeek": "0",
                          "availableFrom": "2026-04-06T06:30:00.000000Z",
                          "availableTo": "2026-12-30T06:30:00.000000Z",
                          "createdAt": "2026-04-02T13:52:29.000000Z",
                          "updatedAt": "2026-04-06T10:06:42.000000Z"
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/847",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2509/JaLDOwXAOLJCecJs7hlPwEiDr2G42WlHIjJxFdxF.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2510",
                  "name": "Wooden Folding Chair Rental",
                  "sku": "WOODEN-FOLDING-CHAIR-RENTAL",
                  "type": "booking",
                  "urlKey": "wooden-folding-chair-rental",
                  "description": "High-quality wooden folding chairs available for daily rental. Ideal for weddings, parties, and corporate events.",
                  "shortDescription": "Rent durable wooden folding chairs for events and gatherings.",
                  "price": "109",
                  "specialPrice": "99",
                  "bookingProducts": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/booking-products/4",
                          "type": "rental",
                          "qty": 150,
                          "location": "Noida, Uttar Pradesh",
                          "showLocation": "0",
                          "availableEveryWeek": "0",
                          "availableFrom": "2026-04-06T06:30:00.000000Z",
                          "availableTo": "2026-04-30T06:30:00.000000Z",
                          "createdAt": "2026-04-02T14:02:30.000000Z",
                          "updatedAt": "2026-04-06T10:02:29.000000Z"
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/848",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2510/eDIAyoJLDAshEe3AOwhi2sgoFH9sAjpMvoemDVpo.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              },
              {
                "node": {
                  "id": "/api/shop/products/2511",
                  "name": "Fine Dining Table Reservation",
                  "sku": "FINE-DINING-TABLE-RESERVATION",
                  "type": "booking",
                  "urlKey": "fine-dining-table-reservation",
                  "description": "Book a table for a fine dining experience with comfortable seating and a premium ambiance.",
                  "shortDescription": "Reserve a table at a premium dining restaurant.",
                  "price": "200",
                  "specialPrice": "195",
                  "bookingProducts": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/booking-products/5",
                          "type": "table",
                          "qty": 5,
                          "location": "Mumbai, Maharashtra",
                          "showLocation": "0",
                          "availableEveryWeek": "0",
                          "availableFrom": "2026-04-06T06:30:00.000000Z",
                          "availableTo": "2026-04-30T06:30:00.000000Z",
                          "createdAt": "2026-04-02T14:10:57.000000Z",
                          "updatedAt": "2026-04-06T10:06:05.000000Z"
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/849",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2511/lw253CbVba9nRZVUGy9atW9t85ADE2UwldssE8t6.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              }
            ],
            "totalCount": 5
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes

  - id: get-products-type-virtual
    title: Get Products - Virtual Type
    description: Retrieve all virtual products. Virtual products are non-physical items (e.g. services, warranties) that require no shipping. Structurally similar to simple products.
    query: |
      query getAllVirtualProducts {
        products(filter: "{\"type\": \"virtual\"}") {
          edges {
            node {
              id
              name
              sku
              type
              urlKey
              description
              shortDescription
              price
              specialPrice
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/2505",
                  "name": "HD Streaming Subscription - 1 Month Access",
                  "sku": "HD-STREAMING-SUBSCRIPTION-1-MONTH",
                  "type": "virtual",
                  "urlKey": "hd-streaming-subscription-1-month-access",
                  "description": "This 1-month HD streaming subscription gives you unlimited access to a wide range of movies, TV series, and exclusive content across multiple genres.",
                  "shortDescription": "Enjoy unlimited access to movies and TV shows with a 1-month HD streaming plan.",
                  "price": "64",
                  "specialPrice": "59",
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/842",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2505/sCwS1QRNlJHLPjw5UzxYSR21oqYbMvo4UNRYklME.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "HD-STREAMING-SUBSCRIPTION-1-MONTH",
                          "attribute": { "code": "sku", "adminName": "SKU" }
                        }
                      },
                      {
                        "node": {
                          "value": "HD Streaming Subscription - 1 Month Access",
                          "attribute": { "code": "name", "adminName": "Name" }
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes

  - id: get-products-type-grouped
    title: Get Products - Grouped Type
    description: Retrieve all grouped products. Grouped products are a collection of simple products sold together. Includes groupedProducts connection with associated product details.
    query: |
      query getAllGroupedProducts {
        products(filter: "{\"type\": \"grouped\"}") {
          edges {
            node {
              id
              name
              sku
              type
              urlKey
              description
              shortDescription
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
                      specialPrice
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
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/2516",
                  "name": "Arctic Frost Winter Accessories",
                  "sku": "GP-001",
                  "type": "grouped",
                  "urlKey": "arctic-frost-winter-accessories",
                  "description": "A thoughtfully curated set of essential winter accessories including a beanie, gloves, and socks.",
                  "shortDescription": "Curated winter accessories set with beanie, gloves, and socks.",
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
                            "specialPrice": null,
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
                            "specialPrice": "17",
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
                            "specialPrice": null,
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
                  "categories": { "edges": [] }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes

  - id: get-products-type-downloadable
    title: Get Products - Downloadable Type
    description: Retrieve all downloadable products. Downloadable products are digital items with file links and optional samples. Includes downloadableLinks and downloadableSamples connections.
    query: |
      query getAllDownloadableProducts {
        products(filter: "{\"type\": \"downloadable\"}") {
          edges {
            node {
              id
              name
              sku
              type
              urlKey
              description
              shortDescription
              price
              specialPrice
              downloadableLinks {
                edges {
                  node {
                    id
                    type
                    price
                    downloads
                    sortOrder
                    fileUrl
                    sampleFileUrl
                    translation {
                      title
                    }
                  }
                }
              }
              downloadableSamples {
                edges {
                  node {
                    id
                    type
                    fileUrl
                    sortOrder
                    translation {
                      title
                    }
                  }
                }
              }
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/2506",
                  "name": "Complete Personal Finance Guide (eBook PDF)",
                  "sku": "COMPLETE-PERSONAL-FINANCE-GUIDE-EBOOK",
                  "type": "downloadable",
                  "urlKey": "complete-personal-finance-guide-ebook-pdf",
                  "description": "This comprehensive personal finance eBook helps you take control of your money with practical strategies for budgeting, saving, investing, and debt management.",
                  "shortDescription": "Download a practical guide to managing money, saving, and building long-term wealth.",
                  "price": "70",
                  "specialPrice": "69",
                  "downloadableLinks": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/product-downloadable-links/2",
                          "type": "url",
                          "price": "69",
                          "downloads": 10,
                          "sortOrder": 0,
                          "fileUrl": "https://api-demo.bagisto.com/storage/",
                          "sampleFileUrl": "https://api-demo.bagisto.com/api/downloadable/download-sample/link/2",
                          "translation": {
                            "title": "Full eBook PDF"
                          }
                        }
                      }
                    ]
                  },
                  "downloadableSamples": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/product-downloadable-samples/1",
                          "type": "file",
                          "fileUrl": "https://api-demo.bagisto.com/api/downloadable/download-sample/sample/1",
                          "sortOrder": 0,
                          "translation": {
                            "title": ""
                          }
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/843",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2506/XY0sCaNbWfeXDntNFbYnlL6N5uOJ9tfyR7AtntSf.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "attributeValues": {
                    "edges": [
                      {
                        "node": {
                          "value": "COMPLETE-PERSONAL-FINANCE-GUIDE-EBOOK",
                          "attribute": { "code": "sku", "adminName": "SKU" }
                        }
                      },
                      {
                        "node": {
                          "value": "Complete Personal Finance Guide (eBook PDF)",
                          "attribute": { "code": "name", "adminName": "Name" }
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes

  - id: get-products-type-bundle
    title: Get Products - Bundle Type
    description: Retrieve all bundle products. Bundle products are composed of selectable options where customers can choose individual components. Includes bundleOptions and bundleOptionProducts connections.
    query: |
      query getAllBundleProducts {
        products(filter: "{\"type\": \"bundle\"}") {
          edges {
            node {
              id
              name
              sku
              type
              urlKey
              description
              shortDescription
              minimumPrice
              bundleOptions {
                edges {
                  node {
                    id
                    type
                    isRequired
                    sortOrder
                    translation {
                      label
                    }
                    bundleOptionProducts {
                      edges {
                        node {
                          id
                          qty
                          isDefault
                          isUserDefined
                          sortOrder
                          product {
                            id
                            name
                            sku
                            price
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
                  }
                }
              }
              images(first: 5) {
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
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "products": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/products/2517",
                  "name": "Arctic Frost Winter Accessories Bundle",
                  "sku": "BP-001",
                  "type": "bundle",
                  "urlKey": "arctic-frost-winter-accessories-bundle",
                  "description": "A curated bundle of essential winter accessories. Choose from beanies, scarves, gloves, and socks to build your perfect winter kit.",
                  "shortDescription": "Build your perfect winter accessories bundle with beanie, scarf, gloves, and socks.",
                  "minimumPrice": "69",
                  "bundleOptions": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/shop/product_bundle_options/1",
                          "type": "radio",
                          "isRequired": "1",
                          "sortOrder": 0,
                          "translation": { "label": "Bundle Option 1" },
                          "bundleOptionProducts": {
                            "edges": [
                              {
                                "node": {
                                  "id": "/api/shop/product-bundle-option-products/1",
                                  "qty": 1,
                                  "isDefault": "1",
                                  "isUserDefined": "1",
                                  "sortOrder": 0,
                                  "product": {
                                    "id": "/api/shop/products/2512",
                                    "name": "Arctic Cozy Knit Unisex Beanie",
                                    "sku": "SP-001",
                                    "price": "14",
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
                              }
                            ]
                          }
                        }
                      },
                      {
                        "node": {
                          "id": "/api/shop/product_bundle_options/3",
                          "type": "checkbox",
                          "isRequired": "1",
                          "sortOrder": 2,
                          "translation": { "label": "Bundle Option 2" },
                          "bundleOptionProducts": {
                            "edges": [
                              {
                                "node": {
                                  "id": "/api/shop/product-bundle-option-products/3",
                                  "qty": 1,
                                  "isDefault": "1",
                                  "isUserDefined": "1",
                                  "sortOrder": 0,
                                  "product": {
                                    "id": "/api/shop/products/2514",
                                    "name": "Arctic Touchscreen Winter Gloves",
                                    "sku": "SP-003",
                                    "price": "21",
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
                              }
                            ]
                          }
                        }
                      }
                    ]
                  },
                  "images": {
                    "edges": [
                      {
                        "node": {
                          "id": "/api/admin/images/856",
                          "publicPath": "https://api-demo.bagisto.com/storage/product/2517/lW2A3FH3oKBJnnukyUyKUArdrr8dwTJxxDKthSgq.webp",
                          "position": "1"
                        }
                      }
                    ]
                  },
                  "categories": { "edges": [] }
                }
              }
            ],
            "totalCount": 1
          }
        }
      }
    commonErrors:
      - error: INVALID_FILTER_FORMAT
        cause: Filter string is not valid JSON
        solution: Pass filter as a single-line JSON string with escaped quotes
---

# Get Products

## About

The `products` query returns a cursor-paginated list of catalog products with filtering and sorting. It is the canonical reference for both — [Search Products](/api/graphql-api/shop/queries/search-products) is the same field with its `query` argument supplied, and uses the identical filter keys and sort keys documented below. Use it to:

- Build product catalog browsing interfaces
- Drive listing, filtering, and sorting experiences
- Create product recommendation rails
- Sync product data with external systems

Each product node carries its basic information (name, SKU, descriptions), pricing, images, categories and custom attributes, availability status, and timestamps.

## Wishlist & Compare Flags

Every product carries two per-customer flags so the wishlist and compare icons can be rendered straight from the catalog response. The wishlist and compare endpoints paginate independently of the catalog, so matching those lists against catalog rows on the client is unreliable.

| Field | Description |
|-------|-------------|
| `isInWishlist` | `"1"` when the product is in the signed-in customer's wishlist for the active channel, `"0"` when it is not. |
| `isInCompare` | `"1"` when the product is in the signed-in customer's compare list, `"0"` when it is not. |

Both need the customer Bearer token and are always `"0"` for guests. GraphQL returns them as the strings `"1"` / `"0"`; the REST API returns the same flags as the integers `1` / `0`.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | The number of products to return per page. Used for forward pagination. Default: `30` |
| `after` | `String` | The cursor of the product to start after. Used with `first` for pagination. |
| `last` | `Int` | The number of products to return in reverse. Used for backward pagination. Default: `30` |
| `before` | `String` | The cursor to start before. Used with `last` for reverse pagination. |
| `sortKey` | `String` | Field to sort by: `ID`, `TITLE` (alias `NAME`), `PRICE`, `CREATED_AT`, `UPDATED_AT`. Case-insensitive. Default: `ID` |
| `reverse` | `Boolean` | Reverse the sort order. Default: `false` |
| `query` | `String` | Search query string for filtering products. Supports advanced search syntax. |
| `filter` | `String` | JSON string of filter keys (see below). Pass as a single-line JSON string with escaped quotes. |

### Filter keys

The `filter` argument is a JSON object encoded as a string. Accepted keys:

| Key | Type | Description |
|-----|------|-------------|
| `type` | String | Product type: `simple`, `configurable`, `bundle`, `grouped`, `virtual`, `downloadable`, `booking`. |
| `sku` | String | Exact SKU match. |
| `category_id` | Int | Restrict to a category. |
| `price_from` | Number | Minimum price (inclusive). |
| `price_to` | Number | Maximum price (inclusive). |
| `new` | Boolean | `true` → only products flagged "new". |
| `featured` | Boolean | `true` → only products flagged "featured". |
| `<attribute_code>` | String | Any filterable attribute code (e.g. `color`, `size`, `brand`). Value is the option id; comma-separate for multiple (`"3,4"`). |

Write the filter as a normal JSON object first:

```json
{
  "type": "simple",
  "price_from": 10,
  "price_to": 200
}
```

Then pass it to `filter` as a single-line string with its quotes escaped:

```graphql
query getFilteredProducts {
  products(
    filter: "{\"type\": \"simple\", \"price_from\": 10, \"price_to\": 200}"
    first: 10
  ) {
    totalCount
    edges {
      node {
        _id
        sku
        name
        price
        formattedPrice
      }
    }
  }
}
```

Escaping is avoided entirely by writing the filter as a GraphQL block string, which accepts embedded quotes as-is:

```graphql
query getFilteredProducts {
  products(
    filter: """{"type": "simple", "price_from": 10, "price_to": 200}"""
    first: 10
  ) {
    totalCount
    edges {
      node {
        _id
        sku
        name
        price
        formattedPrice
      }
    }
  }
}
```

A variable keeps the query document static, which is what most clients want:

```graphql
query getFilteredProducts($filter: String) {
  products(filter: $filter, first: 10) {
    totalCount
    edges {
      node {
        _id
        sku
        name
        price
        formattedPrice
      }
    }
  }
}
```

```json
{
  "filter": "{\"type\": \"simple\", \"price_from\": 10, \"price_to\": 200}"
}
```

### Filter behaviour

Four rules decide what a filter actually returns:

| Rule | What it means |
|------|---------------|
| **Keys combine** | Every key you add narrows the result. Filters intersect — they never widen the set. |
| **The value is always a string** | `filter` is a `String` scalar, not an input object, so a real JSON object is rejected before the query runs. Build the string in the client — `JSON.stringify({ type: 'simple', price_from: 10 })` — and the escaping is handled for you. |
| **A price range needs two keys** | Use `price_from` and `price_to`. The compound `price=min,max` form is REST-only and has no effect here. |
| **Price matches the product's own `price`** | That attribute is `0` on configurable and bundle parents, whose real price lives in their variants or selections. Any `price_from` above `0` therefore drops both types — filter them by `type` and read `minimumPrice` / `maximumPrice` instead. |

### Sorting

Use `sortKey` to pick the column and `reverse` to flip the direction. The common combinations:

| Sort | `sortKey` | `reverse` |
|------|-----------|-----------|
| A → Z | `"TITLE"` | `false` |
| Z → A | `"TITLE"` | `true` |
| Newest first | `"CREATED_AT"` | `true` |
| Oldest first | `"CREATED_AT"` | `false` |
| Cheapest first | `"PRICE"` | `false` |
| Most expensive first | `"PRICE"` | `true` |

Omitting `sortKey` orders by product ID, so a listing that cares about order should always set one.

#### How price sorting works

Sorting by `PRICE` does not order on the `price` field. It orders on `minimumPrice` — the effective price the shopper sees, which accounts for:

- **Special price** — a discounted price replaces the regular one.
- **Configurable variants** — the parent takes the lowest price across its variants.
- **Neither applies** — `minimumPrice` equals `price`.

Display `minimumPrice` alongside price-sorted results, otherwise the order and the numbers on screen disagree.

<!-- ## REST and GraphQL parameter mapping

The same catalog operations use different shapes on each transport. Common equivalents:

| Goal | REST (`GET /api/shop/products`, `?query`) | GraphQL |
|------|-------------------------------------------|---------|
| Children of a category | `?parent_id=5` on `GET /api/shop/categories` | `treeCategories(parentId: 5)` — the flat `categories` query has **no** `parentId` argument |
| Price range | `?price={min},{max}` e.g. `?price=10,200` (comma = min/max split, not a thousands separator) **or** `?price_from=10&price_to=200` | `filter: "{\"price_from\": 10, \"price_to\": 200}"` (no compound `price` key) |
| New / Featured | `?new=1` / `?featured=1` | `filter: "{\"new\": true, \"featured\": true}"` |
| Sort | `?sort=price-asc` (or `?sort=price&order=asc`) | `sortKey: PRICE, reverse: false` |
| Category filter | `?category_id=5` | `filter: "{\"category_id\": 5}"` |
| Attribute filter | `?color=3` | `filter: "{\"color\": \"3\"}"` |
| Auth Bearer | `Authorization: Bearer <token>` | `Authorization: Bearer <token>` — same `token` field from login; `apiToken` is a legacy field, **not** a Bearer on either transport | -->

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductEdge!]!` | Array of edges containing products and cursors. Each edge represents a connection between nodes. |
| `edges.node` | `Product!` | The actual product object containing id, name, sku, price, and other product fields. |
| `edges.cursor` | `String!` | Pagination cursor for this product. Use with `after` or `before` arguments. |
| `nodes` | `[Product!]!` | Flattened array of products without edge information. |
| `pageInfo` | `PageInfo!` | Pagination metadata object. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether there are more products after the current page. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether there are products before the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first product on the current page. |
| `pageInfo.endCursor` | `String` | Cursor of the last product on the current page. |
| `totalCount` | `Int!` | Total number of products matching the query criteria. |

## Price Fields

| Field | Type | Description |
|-------|------|-------------|
| `price` | `Float` | Base catalog price. Returns the converted numeric value based on the active currency set via `X-Currency` header. |
| `formattedPrice` | `String` | Same as `price` but returned as a string with the currency symbol prefixed (e.g. `"€84.99"`). |
| `specialPrice` | `Float` | Discounted price if a special price is set, otherwise `null`. Reflects currency conversion. |
| `formattedSpecialPrice` | `String` | Same as `specialPrice` but with the currency symbol prefixed. |
| `minimumPrice` | `Float` | The lowest effective price — accounts for special price and configurable variant pricing. Used for price sorting. Reflects currency conversion. |
| `formattedMinimumPrice` | `String` | Same as `minimumPrice` but with the currency symbol prefixed. |
| `maximumPrice` | `Float` | The highest effective price across all variants or configurations. Reflects currency conversion. |
| `formattedMaximumPrice` | `String` | Same as `maximumPrice` but with the currency symbol prefixed. |
| `regularMinimumPrice` | `Float` | The regular (non-discounted) minimum price before any special price is applied. Reflects currency conversion. |
| `formattedRegularMinimumPrice` | `String` | Same as `regularMinimumPrice` but with the currency symbol prefixed. |
| `regularMaximumPrice` | `Float` | The regular (non-discounted) maximum price before any special price is applied. Reflects currency conversion. |
| `formattedRegularMaximumPrice` | `String` | Same as `regularMaximumPrice` but with the currency symbol prefixed. |

## Product Types

Use the `filter` argument with `"type"` to fetch products of a specific kind. The filter value must be a single-line JSON string with escaped quotes.

| Type | Filter Value | Key Fields |
|------|-------------|------------|
| Simple | `"{\"type\": \"simple\"}"` | `price`, `specialPrice`, `images`, `attributeValues` |
| Configurable | `"{\"type\": \"configurable\"}"` | `variants`, `combinations`, `superAttributeOptions` |
| Booking | `"{\"type\": \"booking\"}"` | `bookingProducts` (type, qty, location, availability) |
| Virtual | `"{\"type\": \"virtual\"}"` | `price`, `specialPrice`, `attributeValues` |
| Grouped | `"{\"type\": \"grouped\"}"` | `groupedProducts` → `associatedProduct` |
| Downloadable | `"{\"type\": \"downloadable\"}"` | `downloadableLinks`, `downloadableSamples` |
| Bundle | `"{\"type\": \"bundle\"}"` | `bundleOptions` → `bundleOptionProducts` → `product` |

