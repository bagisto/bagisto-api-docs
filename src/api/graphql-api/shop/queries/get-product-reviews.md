---
outline: false
examples:
  - id: get-product-reviews-basic
    title: Get Product Reviews - Basic
    description: Retrieve product reviews with basic fields and pagination.
    query: |
      query productReviews($first: Int, $after: String) {
        productReviews(first: $first, after: $after) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              createdAt
              updatedAt
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/1",
                  "_id": 1,
                  "name": "Tom Smith",
                  "title": "Incredible Product!",
                  "rating": 5,
                  "comment": "This jacket is incredibly warm and comfortable. I love wearing it on cold days or when I'm going for a hike. It's also very stylish and looks great with a pair of jeans or chinos.",
                  "status": "approved",
                  "createdAt": "2023-11-16T12:23:20+05:30",
                  "updatedAt": "2023-12-01T10:44:45+05:30"
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/2",
                  "_id": 2,
                  "name": "Thomas Freeman",
                  "title": "High Quality & Affordable",
                  "rating": 5,
                  "comment": "I can't believe how affordable this jacket is for the quality. It's well-made and looks great. I've already gotten so many compliments on it.",
                  "status": "approved",
                  "createdAt": "2023-11-16T12:30:54+05:30",
                  "updatedAt": "2023-11-16T12:31:09+05:30"
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/3",
                  "_id": 3,
                  "name": "Emma Wilson",
                  "title": "Perfect Winter Essential",
                  "rating": 4,
                  "comment": "Great quality and very comfortable. Highly recommend for anyone looking for a warm jacket.",
                  "status": "approved",
                  "createdAt": "2023-11-18T08:15:30+05:30",
                  "updatedAt": "2023-11-18T08:15:30+05:30"
                },
                "cursor": "Mg=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "Mg=="
            },
            "totalCount": 45
          }
        }
      }
    commonErrors:
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100
      - error: invalid-product-id
        cause: Product ID is not a valid integer
        solution: Use a valid numeric product ID
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5

  - id: get-product-reviews-by-product-id
    title: Get Product Reviews - By Product ID
    description: Retrieve reviews for a specific product using its numeric product ID.
    query: |
      query productReviews($productId: Int) {
        productReviews(product_id: $productId) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              attachments
              createdAt
              updatedAt
            }
          }
        }
      }
    variables: |
      {
        "productId": 2446
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/33",
                  "_id": 33,
                  "name": "Hiroshi Tanaka",
                  "title": "Solid Gaming Keyboard",
                  "rating": 5,
                  "comment": "Gaming casual competitive Valorant/CS2. Switches tactile response accurate fast 8k polling proof. RGB control easy app intuitive. Wrist rest supportive gaming sessions. Cons: USB-C port slightly loose after 3 months (QA variance), N-key rollover flawless. Reliable 4 months daily use robust build. Worth ₹11.5k investment.",
                  "status": "approved",
                  "attachments": null,
                  "createdAt": "2026-01-08T13:50:01+05:30",
                  "updatedAt": "2026-01-08T13:50:23+05:30"
                }
              }
            ]
          }
        }
      }
    commonErrors:
      - error: invalid-product-id
        cause: Product ID is not a valid integer or product does not exist
        solution: Use a valid numeric product ID from your store
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100

  - id: get-product-reviews-by-status
    title: Get Product Reviews - Filtered by Status
    description: Retrieve reviews filtered by approval status. Use "approved" to show published reviews, "pending" for those awaiting moderation, or "disapproved" for declined reviews.
    query: |
      query productReviewsByStatus($status: String, $first: Int, $after: String) {
        productReviews(status: $status, first: $first, after: $after) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              createdAt
              updatedAt
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "status": "approved",
        "first": 10
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/4",
                  "_id": 4,
                  "name": "Gerson Rivera",
                  "title": "Earphones",
                  "rating": 5,
                  "comment": "I've been using these earphones for a week now and I'm really impressed. The sound is clear and balanced, with just the right amount of bass.",
                  "status": "approved",
                  "createdAt": "2025-09-03T12:32:39+05:30",
                  "updatedAt": "2025-09-03T12:33:56+05:30"
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/5",
                  "_id": 5,
                  "name": "Gerson Rivera",
                  "title": "Overhead",
                  "rating": 5,
                  "comment": "I've been using these overhead headphones for a while and they feel really solid. The sound quality is excellent – clear vocals, detailed highs, and a deep, punchy bass.",
                  "status": "approved",
                  "createdAt": "2025-09-03T12:33:34+05:30",
                  "updatedAt": "2025-09-03T12:33:56+05:30"
                },
                "cursor": "MQ=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "MQ=="
            },
            "totalCount": 12
          }
        }
      }
    commonErrors:
      - error: invalid-status
        cause: Status value is not a recognised string
        solution: Use one of "approved", "pending", or "disapproved"
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100

  - id: get-product-reviews-by-rating
    title: Get Product Reviews - Filtered by Rating
    description: Retrieve reviews filtered by a specific star rating (1–5). Useful for highlighting top-rated feedback or surfacing low-rated reviews for quality control.
    query: |
      query productReviewsByRating($rating: Int, $first: Int, $after: String) {
        productReviews(rating: $rating, first: $first, after: $after) {
          edges {
            node {
              id
              _id
              name
              title
              rating
              comment
              status
              createdAt
              updatedAt
            }
            cursor
          }
          pageInfo {
            hasNextPage
            endCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "rating": 5,
        "first": 10
      }
    response: |
      {
        "data": {
          "productReviews": {
            "edges": [
              {
                "node": {
                  "id": "/api/shop/reviews/4",
                  "_id": 4,
                  "name": "Gerson Rivera",
                  "title": "Earphones",
                  "rating": 5,
                  "comment": "I've been using these earphones for a week now and I'm really impressed. The sound is clear and balanced, with just the right amount of bass. Definitely worth it if you're looking for reliable everyday earphones.",
                  "status": "approved",
                  "createdAt": "2025-09-03T12:32:39+05:30",
                  "updatedAt": "2025-09-03T12:33:56+05:30"
                },
                "cursor": "MA=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/5",
                  "_id": 5,
                  "name": "Gerson Rivera",
                  "title": "Overhead",
                  "rating": 5,
                  "comment": "I've been using these overhead headphones for a while and they feel really solid. The sound quality is excellent – clear vocals, detailed highs, and a deep, punchy bass that makes music more immersive.",
                  "status": "approved",
                  "createdAt": "2025-09-03T12:33:34+05:30",
                  "updatedAt": "2025-09-03T12:33:56+05:30"
                },
                "cursor": "MQ=="
              },
              {
                "node": {
                  "id": "/api/shop/reviews/7",
                  "_id": 7,
                  "name": "Gerson Rivera",
                  "title": "Royal Sofa",
                  "rating": 5,
                  "comment": "I recently purchased the royal leather sofa and it truly adds a luxurious touch to the living room. The leather finish feels premium and elegant.",
                  "status": "approved",
                  "createdAt": "2025-09-03T12:36:08+05:30",
                  "updatedAt": "2025-09-03T12:40:50+05:30"
                },
                "cursor": "Mg=="
              }
            ],
            "pageInfo": {
              "hasNextPage": true,
              "endCursor": "Mg=="
            },
            "totalCount": 9
          }
        }
      }
    commonErrors:
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use an integer between 1 and 5
      - error: invalid-pagination
        cause: Invalid pagination arguments
        solution: Use valid first/after or last/before combinations with max value 100

  # - id: get-product-reviews-filtered
  #   title: Get Product Reviews - Filtered by Product
  #   description: Retrieve product reviews filtered by product ID with optional status and rating filters.
  #   query: |
  #     query productReviews($productId: Int, $status: Int, $rating: Int, $first: Int, $after: String) {
  #       productReviews(productId: $productId, status: $status, rating: $rating, first: $first, after: $after) {
  #         edges {
  #           node {
  #             id
  #             _id
  #             name
  #             title
  #             rating
  #             comment
  #             status
  #             createdAt
  #             updatedAt
  #             productId
  #           }
  #           cursor
  #         }
  #         pageInfo {
  #           hasNextPage
  #           endCursor
  #           startCursor
  #           hasPreviousPage
  #         }
  #         totalCount
  #       }
  #     }
  #   variables: |
  #     {
  #       "productId": 357,
  #       "status": 0,
  #       "rating": 5,
  #       "first": 10
  #     }
  #   response: |
  #     {
  #       "data": {
  #         "productReviews": {
  #           "edges": [
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/1",
  #                 "_id": 1,
  #                 "name": "Tom Smith",
  #                 "title": "Incredible Product!",
  #                 "rating": 5,
  #                 "comment": "This jacket is incredibly warm and comfortable. I love wearing it on cold days or when I'm going for a hike. It's also very stylish and looks great with a pair of jeans or chinos.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-16T12:23:20+05:30",
  #                 "updatedAt": "2023-12-01T10:44:45+05:30", 
  #               },
  #               "cursor": "MA=="
  #             },
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/2",
  #                 "_id": 2,
  #                 "name": "Thomas Freeman",
  #                 "title": "High Quality & Affordable",
  #                 "rating": 5,
  #                 "comment": "I can't believe how affordable this jacket is for the quality. It's well-made and looks great. I've already gotten so many compliments on it.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-16T12:30:54+05:30",
  #                 "updatedAt": "2023-11-16T12:31:09+05:30", 
  #               },
  #               "cursor": "MQ=="
  #             },
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/8",
  #                 "_id": 8,
  #                 "name": "Sarah Johnson",
  #                 "title": "Excellent Value",
  #                 "rating": 5,
  #                 "comment": "Outstanding quality for the price. Very satisfied with my purchase. Would buy again!",
  #                 "status": 0,
  #                 "createdAt": "2023-12-02T14:45:20+05:30",
  #                 "updatedAt": "2023-12-02T14:45:20+05:30",
  #                 "productId": 357
  #               },
  #               "cursor": "Mw=="
  #             }
  #           ],
  #           "pageInfo": {
  #             "hasNextPage": false,
  #             "endCursor": "Mw==",
  #             "startCursor": "MA==",
  #             "hasPreviousPage": false
  #           },
  #           "totalCount": 3
  #         }
  #       }
  #     }
  #   commonErrors:
  #     - error: invalid-pagination
  #       cause: Invalid pagination arguments or exceeding maximum limit
  #       solution: Use valid first/after or last/before combinations with max value 100
  #     - error: invalid-product-id
  #       cause: Product ID is not a valid integer
  #       solution: Use a valid numeric product ID
  #     - error: invalid-rating
  #       cause: Rating value is out of valid range
  #       solution: Use rating between 1 and 5
  #     - error: invalid-status
  #       cause: Status value is not valid
  #       solution: Use status 0 (pending), 1 (approved), or 2 (disapproved)

  # - id: get-product-reviews-complete
  #   title: Get Product Reviews - Complete Details
  #   description: Retrieve all product reviews with complete pagination information and all filters applied.
  #   query: |
  #     query productReviews($productId: Int, $status: Int, $rating: Int, $first: Int, $after: String, $last: Int, $before: String) {
  #       productReviews(productId: $productId, status: $status, rating: $rating, first: $first, after: $after, last: $last, before: $before) {
  #         edges {
  #           node {
  #             id
  #             _id
  #             name
  #             title
  #             rating
  #             comment
  #             status
  #             createdAt
  #             updatedAt
  #             productId
  #           }
  #           cursor
  #         }
  #         pageInfo {
  #           endCursor
  #           startCursor
  #           hasNextPage
  #           hasPreviousPage
  #         }
  #         totalCount
  #       }
  #     }
  #   variables: |
  #     {
  #       "first": 5
  #     }
  #   response: |
  #     {
  #       "data": {
  #         "productReviews": {
  #           "edges": [
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/1",
  #                 "_id": 1,
  #                 "name": "Tom Smith",
  #                 "title": "Incredible Product!",
  #                 "rating": 5,
  #                 "comment": "This jacket is incredibly warm and comfortable. I love wearing it on cold days or when I'm going for a hike. It's also very stylish and looks great with a pair of jeans or chinos.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-16T12:23:20+05:30",
  #                 "updatedAt": "2023-12-01T10:44:45+05:30",
  #                 "productId": 357
  #               },
  #               "cursor": "MA=="
  #             },
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/2",
  #                 "_id": 2,
  #                 "name": "Thomas Freeman",
  #                 "title": "High Quality & Affordable",
  #                 "rating": 5,
  #                 "comment": "I can't believe how affordable this jacket is for the quality. It's well-made and looks great. I've already gotten so many compliments on it.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-16T12:30:54+05:30",
  #                 "updatedAt": "2023-11-16T12:31:09+05:30",
  #                 "productId": 357
  #               },
  #               "cursor": "MQ=="
  #             },
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/3",
  #                 "_id": 3,
  #                 "name": "Emma Wilson",
  #                 "title": "Perfect Winter Essential",
  #                 "rating": 4,
  #                 "comment": "Great quality and very comfortable. Highly recommend for anyone looking for a warm jacket.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-18T08:15:30+05:30",
  #                 "updatedAt": "2023-11-18T08:15:30+05:30",
  #                 "productId": 357
  #               },
  #               "cursor": "Mg=="
  #             },
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/4",
  #                 "_id": 4,
  #                 "name": "James Brown",
  #                 "title": "Good Value",
  #                 "rating": 4,
  #                 "comment": "Nice jacket, good quality. Would recommend to friends and family.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-20T16:30:15+05:30",
  #                 "updatedAt": "2023-11-20T16:30:15+05:30",
  #                 "productId": 357
  #               },
  #               "cursor": "Mw=="
  #             },
  #             {
  #               "node": {
  #                 "id": "/api/shop/reviews/5",
  #                 "_id": 5,
  #                 "name": "Lisa Anderson",
  #                 "title": "Excellent Quality",
  #                 "rating": 5,
  #                 "comment": "Best jacket I've ever owned. Highly recommended for anyone looking for quality and style.",
  #                 "status": 0,
  #                 "createdAt": "2023-11-22T09:45:22+05:30",
  #                 "updatedAt": "2023-11-22T09:45:22+05:30",
  #                 "productId": 357
  #               },
  #               "cursor": "NA=="
  #             }
  #           ],
  #           "pageInfo": {
  #             "endCursor": "NA==",
  #             "startCursor": "MA==",
  #             "hasNextPage": true,
  #             "hasPreviousPage": false
  #           },
  #           "totalCount": 45
  #         }
  #       }
  #     }
  #   commonErrors:
  #     - error: invalid-pagination
  #       cause: Invalid pagination arguments or exceeding maximum limit
  #       solution: Use valid first/after or last/before combinations with max value 100
  #     - error: invalid-product-id
  #       cause: Product ID is not a valid integer
  #       solution: Use a valid numeric product ID
  #     - error: invalid-rating
  #       cause: Rating value is out of valid range
  #       solution: Use rating between 1 and 5
  #     - error: invalid-status
  #       cause: Status value is not valid
  #       solution: Use status 0 (pending), 1 (approved), or 2 (disapproved)

---

# Product Reviews

## About

The `productReviews` query retrieves a collection of product reviews with filtering and pagination support. Use this query to:

- Display product reviews on product detail pages
- Show review statistics and ratings
- Filter reviews by product, status, and rating
- Build review listing pages with pagination
- Display customer feedback and testimonials
- Calculate average ratings and review counts
- Show pending reviews in admin dashboard
- Implement review sorting and filtering

This query supports full pagination with cursor-based navigation and flexible filtering options for various use cases.

> **Note:** When the `status` argument is **omitted**, this query returns only **approved** reviews — the right default for a storefront product page (customer-submitted reviews start as `pending` until an admin approves them). Passing `status` overrides this default, so you can request `status: "pending"` or `status: "disapproved"` explicitly (e.g. for moderation tooling).

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `status` | `String` | ❌ No | Filter by review status (`"pending"`, `"approved"`, `"disapproved"`). |
| `rating` | `Int` | ❌ No | Filter by rating value (1-5 stars). |
| `first` | `Int` | ❌ No | Number of results to return (forward pagination). Max: 100. |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of results for backward pagination. Max: 100. |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | Unique review API identifier. |
| `_id` | `Int!` | Numeric review ID. |
| `name` | `String!` | Customer name who wrote the review. |
| `title` | `String!` | Review title/headline. |
| `rating` | `Int!` | Star rating (1-5). |
| `comment` | `String!` | Review comment/text. |
| `status` | `String!` | Review approval status (`"pending"`, `"approved"`, `"disapproved"`). |
| `createdAt` | `DateTime!` | Review creation timestamp. |
| `updatedAt` | `DateTime!` | Last update timestamp. |
| `pageInfo` | `PageInfo!` | Pagination information. |
| `pageInfo.hasNextPage` | `Boolean!` | Whether more pages exist forward. |
| `pageInfo.hasPreviousPage` | `Boolean!` | Whether more pages exist backward. |
| `pageInfo.startCursor` | `String` | Cursor for first item in page. |
| `pageInfo.endCursor` | `String` | Cursor for last item in page. |
| `totalCount` | `Int!` | Total reviews matching filters. |

## Review Status

| Status | Description |
|--------|-------------|
| `"pending"` | Awaiting moderation approval |
| `"approved"` | Published and visible on the storefront |
| `"disapproved"` | Declined and not published |

## Use Cases

### 1. Product Reviews Page
Use the "By Product ID" example to display all approved reviews for a specific product.

### 2. Admin Review Management
Use the "Filtered by Status" example with `status: "pending"` to show reviews awaiting moderation.

### 3. High-Rated Reviews
Use the "Filtered by Rating" example with `rating: 5` to highlight 5-star reviews.

### 4. Customer Testimonials
Filter by approved status and high rating to display customer testimonials.

### 5. Review Analytics
Use pagination to fetch all reviews for a product and calculate statistics.

## Best Practices

1. **Approved by default** - Omitting `status` already returns approved reviews only; pass `status` explicitly only when building moderation tooling
2. **Show Ratings** - Display the rating prominently alongside the review
3. **Use Pagination** - Always implement pagination for better performance
4. **Cache Results** - Cache reviews for better performance as they change infrequently
5. **Sort Reviews** - Display most recent or highest-rated reviews first
6. **Prevent Spam** - Only show approved reviews to maintain quality
7. **Display Author Info** - Show customer name to build trust and authenticity

## Related Resources

- [Get Single Product Review](/api/graphql-api/shop/queries/get-product-review) - Query individual review details
- [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) - Submit new product review
- [Get Product](/api/graphql-api/shop/queries/get-product) - Query product details
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
