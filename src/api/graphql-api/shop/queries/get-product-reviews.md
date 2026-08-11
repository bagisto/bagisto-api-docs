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
- Filter reviews by product, status, and rating
- Build review listing pages with cursor pagination
- Display customer feedback and testimonials
- Calculate average ratings and review counts

Two behaviours decide what you get back:

| Behaviour | What it means |
|-----------|---------------|
| **Approved only, by default** | Omitting `status` returns approved reviews and nothing else — the right default for a product page, since a customer's review stays `pending` until an admin approves it. Pass `status` to override, which is how moderation tooling asks for `"pending"` or `"disapproved"`. |
| **Fixed order, oldest first** | Reviews come back in review-ID order and there is no sort argument. Sort in the client when a product page needs newest or highest-rated first. |

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `product_id` | `Int` | ❌ No | Restrict the result to one product's reviews. Omit to read reviews across the whole catalog. |
| `status` | `String` | ❌ No | Filter by review status (`"pending"`, `"approved"`, `"disapproved"`). Defaults to `"approved"`. |
| `rating` | `Int` | ❌ No | Filter by rating value (1-5 stars). |
| `first` | `Int` | ❌ No | Number of results to return (forward pagination). Default: `30` |
| `after` | `String` | ❌ No | Pagination cursor for forward navigation. Use with `first`. |
| `last` | `Int` | ❌ No | Number of results for backward pagination. Default: `30` |
| `before` | `String` | ❌ No | Pagination cursor for backward navigation. Use with `last`. |

Supplying several filters narrows the result — they combine, they never widen the set.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[ProductReviewEdge]` | Review edges for the current page. |
| `edges.node` | `ProductReview` | A single review — fields below. |
| `edges.cursor` | `String!` | Cursor for this review, used as `after` on the next request. |
| `pageInfo` | `ProductReviewPageInfo!` | Pagination metadata. |
| `pageInfo.hasNextPage` | `Boolean` | Whether more reviews follow the current page. |
| `pageInfo.hasPreviousPage` | `Boolean` | Whether reviews precede the current page. |
| `pageInfo.startCursor` | `String` | Cursor of the first review on the page. |
| `pageInfo.endCursor` | `String` | Cursor of the last review on the page. |
| `totalCount` | `Int!` | Total reviews matching the filters. |

### Review Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI-style review identifier. |
| `_id` | `Int!` | Numeric review ID. |
| `name` | `String!` | Name of the customer who wrote the review. |
| `title` | `String!` | Review title or headline. |
| `rating` | `Int!` | Star rating, 1 to 5. |
| `comment` | `String` | Review body text. |
| `status` | `String!` | Approval status (`"pending"`, `"approved"`, `"disapproved"`). |
| `attachments` | `String` | Images the customer attached to the review, as a JSON value. `null` when none were uploaded. |
| `createdAt` | `String` | ISO 8601 timestamp of when the review was submitted. |
| `updatedAt` | `String` | ISO 8601 timestamp of the last change. |

## Review Status

| Status | Description |
|--------|-------------|
| `"pending"` | Awaiting moderation approval |
| `"approved"` | Published and visible on the storefront |
| `"disapproved"` | Declined and not published |

## Use Cases

### 1. Reviews block on a product page

Scope to the product and let the default status do the filtering — nothing pending or disapproved reaches the page.

```graphql
query productPageReviews($productId: Int!) {
  productReviews(product_id: $productId, first: 10) {
    totalCount
    edges {
      node {
        _id
        name
        title
        rating
        comment
        createdAt
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

Use `totalCount` for the "N reviews" heading, and feed `endCursor` into the next request's `after` when the shopper asks for more.

### 2. Star breakdown for the ratings summary

There is no aggregate field, so the rating histogram is five counts. Alias them into one request and read only `totalCount` from each:

```graphql
query ratingBreakdown($productId: Int!) {
  five:  productReviews(product_id: $productId, rating: 5, first: 1) { totalCount }
  four:  productReviews(product_id: $productId, rating: 4, first: 1) { totalCount }
  three: productReviews(product_id: $productId, rating: 3, first: 1) { totalCount }
  two:   productReviews(product_id: $productId, rating: 2, first: 1) { totalCount }
  one:   productReviews(product_id: $productId, rating: 1, first: 1) { totalCount }
}
```

Keep `first: 1` rather than `first: 0` — a zero page size fails the request.

### 3. Confirming a review the shopper just submitted

A review created through [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) is `pending`, so it will not appear in the block above. Ask for the pending set to show a "your review is awaiting approval" state instead of leaving the shopper wondering where it went.

```graphql
query pendingForProduct($productId: Int!) {
  productReviews(product_id: $productId, status: "pending", first: 5) {
    totalCount
    edges {
      node {
        _id
        title
        rating
        createdAt
      }
    }
  }
}
```

### 4. Newest-first review lists

The API returns reviews in review-ID order, so a "most recent" tab is built in the client: request the page, then sort the nodes by `createdAt` descending before rendering.

## Best Practices

1. **Omit `status` for anything customer-facing** — the default already restricts the result to approved reviews, so a product page needs no filter of its own. Send `status: "pending"` only to confirm a shopper's own freshly submitted review, never to build a public list
2. **Scope to a product** — pass `product_id` on a product detail page, otherwise the query reads reviews across the whole catalog
3. **Paginate** — a popular product accumulates hundreds of reviews; page through them with `first` and `after` rather than raising `first`
4. **Sort client-side** — the API returns reviews oldest first and offers no sort argument, so reorder in the client if the page needs newest or highest-rated first
5. **Cache the result** — reviews change infrequently, so they cache well per product and status

## Related Resources

- [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) - Submit new product review
- [Get Product](/api/graphql-api/shop/queries/get-product) - Query product details
- [Pagination Guide](/api/graphql-api/pagination) - Cursor pagination documentation
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
