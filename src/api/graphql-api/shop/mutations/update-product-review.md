---
outline: false
examples:
  - id: update-product-review-basic
    title: Update Product Review - Basic
    description: Update basic product review information like title and comment.
    query: |
      mutation updateProductReview($input: updateProductReviewInput!) {
        updateProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/reviews/1",
          "title": "Updated: Excellent quality and very stylish",
          "comment": "After using this for a few weeks, I can confirm it's one of the best purchases. Very durable and comfortable."
        }
      }
    response: |
      {
        "data": {
          "updateProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/1",
              "_id": 93,
              "name": "John Doe",
              "title": "Updated: Excellent quality and very stylish",
              "rating": 5,
              "comment": "After using this for a few weeks, I can confirm it's one of the best purchases. Very durable and comfortable.",
              "status": 0,
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/shop/reviews/1")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/reviews/1"
        solution: Use IRI format ID (/api/shop/reviews/{id}) for review updates
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists

  - id: update-product-review-status
    title: Update Product Review - Change Status
    description: Update product review status (pending, approved, or disapproved).
    query: |
      mutation updateProductReview($input: updateProductReviewInput!) {
        updateProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/reviews/92",
          "status": 1
        }
      }
    response: |
      {
        "data": {
          "updateProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/92",
              "_id": 92,
              "name": "Jane Smith",
              "title": "Great Product with Excellent Service",
              "rating": 5,
              "comment": "Received the product on time. Packaging was excellent. Product quality is top-notch. Highly satisfied!",
              "status": 1,
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format
      - error: invalid-id-format
        cause: Invalid ID format
        solution: Use IRI format ID (/api/shop/reviews/{id})
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct
      - error: invalid-status
        cause: Status value is not valid
        solution: Use status pending, approved, or disapproved

  - id: update-product-review-complete
    title: Update Product Review - Complete Details
    description: Update all product review fields including rating, comment, and status with tracking.
    query: |
      mutation updateProductReview($input: updateProductReviewInput!) {
        updateProductReview(input: $input) {
          productReview {
            id
            _id
            name
            title
            rating
            comment
            status
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/reviews/1",
          "productId": 357,
          "title": "Excellent quality and very stylish",
          "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
          "rating": 5,
          "name": "John Doe",
          "status": 1,
          "clientMutationId": "demo-review-update-001"
        }
      }
    response: |
      {
        "data": {
          "updateProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/1",
              "_id": 93,
              "name": "John Doe",
              "title": "Excellent quality and very stylish",
              "rating": 5,
              "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
              "status": 1
            },
            "clientMutationId": "demo-review-update-001"
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/shop/reviews/1")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/reviews/1"
        solution: Use IRI format ID (/api/shop/reviews/{id}) for review updates
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists
      - error: invalid-product-id
        cause: Product ID is invalid or product does not exist
        solution: Use a valid product ID that exists in the system
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5
      - error: invalid-status
        cause: Status value is not valid
        solution: Use status pending, approved, or disapproved

---

# Update Product Review

## About

The `updateProductReview` mutation edits an existing review in place. Use it to:

- Correct the title or comment of a review a shopper has already submitted
- Change the rating when the shopper reassesses the product
- Fix the reviewer name shown on the review
- Attach further images or video to an existing review

Every field except the review's `id` is optional, and omitted fields keep their current value. The mutation returns the review as it stands after the update.

A review can only be edited by the customer who wrote it. Send that customer's Bearer token — an unauthenticated request, a different customer's token, or a review submitted by a guest is refused.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Identifies the review. Accepts the IRI form (`/api/shop/reviews/1`) or a plain numeric ID. |
| `productId` | `Int` | ❌ No | Moves the review to a different product. The product must exist. Rarely useful — omit it on a normal edit. |
| `title` | `String` | ❌ No | New review headline. |
| `comment` | `String` | ❌ No | New review body text. |
| `rating` | `Int` | ❌ No | New star rating. Must be 1 to 5. |
| `name` | `String` | ❌ No | New reviewer display name. |
| `email` | `String` | ❌ No | Accepted by the schema but not stored on the review. |
| `status` | `Int` | ❌ No | Leave unset — see [Review Status](#review-status). |
| `clientMutationId` | `String` | ❌ No | Arbitrary string echoed back in the payload. |

Only the fields you send are written. Sending `title` alone changes the title and leaves the rating, comment, and name untouched.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `updateProductReviewPayloadData` | The review after the update. |
| `productReview.id` | `ID!` | IRI-style review identifier. |
| `productReview._id` | `Int` | Numeric review ID. |
| `productReview.name` | `String` | Reviewer's name. |
| `productReview.title` | `String` | Review title. |
| `productReview.rating` | `Int` | Star rating, 1 to 5. |
| `productReview.comment` | `String` | Review body text. |
| `productReview.status` | `String` | Approval status — `"pending"`, `"approved"`, or `"disapproved"`. |
| `productReview.attachments` | `String` | JSON string of the stored attachments, each with a `type` and a `url`. |
| `productReview.createdAt` | `String` | ISO 8601 timestamp of when the review was submitted. |
| `productReview.updatedAt` | `String` | ISO 8601 timestamp of this update. |
| `clientMutationId` | `String` | The `clientMutationId` sent with the request, echoed back. |

## Review Status

A review's status is one of three strings:

| Status | Description |
|--------|-------------|
| `"pending"` | Awaiting moderation. Not shown on the storefront. |
| `"approved"` | Published and visible on the product page. |
| `"disapproved"` | Declined and never published. |

The `status` input takes an integer and is written to the review unchanged, so it cannot produce any of those three values — a review updated with `status: 1` ends up holding `1`, which no status filter matches and no storefront page displays. Approving or declining a review is an admin action; leave this field unset.

## Identifying the Review

The `id` argument accepts either form — the trailing number is what identifies the review:

| Value | Result |
|-------|--------|
| `"/api/shop/reviews/92"` | Resolves to review 92 |
| `"92"` | Resolves to review 92 |
| `"reviews/92"` | Resolves to review 92 |
| `"abc"` | Resolves to review 0, which does not exist, so the mutation fails |

Prefer the IRI form: it is what the query and create responses hand back, so it round-trips without conversion.

## Use Cases

### 1. Letting a shopper edit their own review

Send only the fields the edit form changed. Everything else on the review is left as it was.

```graphql
mutation editReview($input: updateProductReviewInput!) {
  updateProductReview(input: $input) {
    productReview {
      _id
      title
      comment
      rating
      status
      updatedAt
    }
  }
}
```

```json
{
  "input": {
    "id": "/api/shop/reviews/74",
    "comment": "Updated after a month of use — the fabric still looks new.",
    "rating": 4
  }
}
```

### 2. Re-checking the review after an edit

The response carries the review's current `status`. An approved review that is edited keeps whatever status it held, so read the field back rather than assuming the edit sent it for re-moderation.

## Best Practices

1. **Send only the fields being changed** — omitted fields keep their stored value, so a partial input is the normal case rather than an optimisation
2. **Use the IRI form of `id`** — a numeric ID also resolves, but the IRI is what the query and create responses return, so it round-trips without conversion
3. **Never send `status`** — the field takes an integer that cannot map to `pending`, `approved`, or `disapproved`, and writing it leaves the review in a state no query matches
4. **Leave `productId` out** — it exists to move a review to a different product, which is not something an edit form should do by accident
5. **Attach media at creation time** — this mutation takes no `attachments` field, so images and video can only be sent with [Create Product Review](/api/graphql-api/shop/mutations/create-product-review)
6. **Read `updatedAt` back** — it confirms the write landed, since a partial update that changed nothing returns the same values it was sent

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Missing ID | The `id` field was omitted from `input`. GraphQL rejects the document before the mutation runs. |
| Review not found | The ID resolves to a review that does not exist. |
| Not signed in | No customer Bearer token was sent, so ownership cannot be established. |
| Not your review | The review belongs to another customer, or was submitted by a guest and has no owner. |
| Rating out of range | `rating` was sent below 1 or above 5. |
| Product not found | `productId` was sent and no product has that ID. |
| Invalid attachment | A data URI is malformed, its Base64 will not decode, or a decoded file exceeds 5 MB. |

## Related Resources

- [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) - Create new product reviews
- [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) - Query product reviews
- [Get Product](/api/graphql-api/shop/queries/get-product) - Query product details
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
