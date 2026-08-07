---
outline: false
examples:
  - id: create-product-review-basic
    title: Create Product Review - Basic
    description: Create a basic product review with title, comment, and rating.
    query: |
      mutation createProductReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
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
        }
      }
    variables: |
      {
        "input": {
          "productId": 2511,
          "title": "Excellent quality and very stylish",
          "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
          "rating": 5,
          "name": "John Doe",
          "email": "john.doe@example.com"
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/92",
              "_id": 92,
              "name": "John Doe",
              "title": "Excellent quality and very stylish",
              "rating": 5,
              "comment": "Very impressed with the EleganceKnits cardigan sweatercoat. The fabric feels premium and soft, the fitting is perfect, and the collar design adds a classy look. Suitable for office wear as well as casual outings. Lightweight yet warm. Highly recommended.",
              "status": "pending",
              "createdAt": "2024-12-26T10:30:45+05:30",
              "updatedAt": "2024-12-26T10:30:45+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: input-required
        cause: Input parameter is missing
        solution: Provide all required input fields (productId, title, comment, rating, name)
      - error: invalid-product-id
        cause: Product ID is invalid or product does not exist
        solution: Use a valid product ID that exists in the system
      - error: invalid-rating
        cause: Rating value is out of valid range
        solution: Use rating between 1 and 5

  - id: create-product-review-with-attachments
    title: Create Product Review - With Image Attachments
    description: Create a product review with Base64-encoded image attachments.
    query: |
      mutation createProductReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
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
    variables: |
      {
        "input": {
          "productId": 2511,
          "title": "Great Product with Photos",
          "comment": "Here's the product with photos attached. The quality is excellent as you can see from the images.",
          "rating": 5,
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "attachments": "[\"data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\", \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\"]"
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/93",
              "_id": 93,
              "name": "Jane Smith",
              "title": "Great Product with Photos",
              "rating": 5,
              "comment": "Here's the product with photos attached. The quality is excellent as you can see from the images.",
              "status": "pending",
              "attachments": "[{\"type\":\"image\",\"url\":\"https://api-demo.bagisto.com/storage/review/93/image1.webp\"},{\"type\":\"image\",\"url\":\"https://api-demo.bagisto.com/storage/review/93/image2.png\"}]",
              "createdAt": "2024-12-26T11:15:30+05:30",
              "updatedAt": "2024-12-26T11:15:30+05:30"
            }
          }
        }
      }
    commonErrors:
      - error: input-required
        cause: Input parameter is missing
        solution: Provide all required input fields
      - error: invalid-attachment-format
        cause: Attachment format is not valid Base64 encoded data
        solution: Provide attachments as valid Base64-encoded image or video data
      - error: invalid-product-id
        cause: Product ID is invalid or product does not exist
        solution: Use a valid product ID that exists in the system
      - error: attachment-size-exceeded
        cause: Attachment file size exceeds maximum allowed
        solution: Use smaller image or video files

  - id: create-product-review-complete
    title: Create Product Review - Complete with Metadata
    description: Create a product review with every optional field set, including attachments and a client mutation ID for tracking the response.
    query: |
      mutation createProductReview($input: createProductReviewInput!) {
        createProductReview(input: $input) {
          productReview {
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
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "productId": 2511,
          "title": "Professional Review with Attachments",
          "comment": "This is a detailed product review with multiple attachments including product photos and a video demonstration. The product quality exceeded my expectations.",
          "rating": 5,
          "name": "Tom Wilson",
          "email": "tom.wilson@example.com",
          "clientMutationId": "review-mutation-001",
          "attachments": "[\"data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==\", \"data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAACKw=\"]"
        }
      }
    response: |
      {
        "data": {
          "createProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/94",
              "_id": 94,
              "name": "Tom Wilson",
              "title": "Professional Review with Attachments",
              "rating": 5,
              "comment": "This is a detailed product review with multiple attachments including product photos and a video demonstration. The product quality exceeded my expectations.",
              "status": "pending",
              "attachments": "[{\"type\":\"image\",\"url\":\"https://api-demo.bagisto.com/storage/review/94/photo1.webp\"},{\"type\":\"video\",\"url\":\"https://api-demo.bagisto.com/storage/review/94/demo.mp4\"}]",
              "createdAt": "2024-12-26T12:45:20+05:30",
              "updatedAt": "2024-12-26T12:45:20+05:30"
            },
            "clientMutationId": "review-mutation-001"
          }
        }
      }
    commonErrors:
      - error: input-required
        cause: Input parameter is missing
        solution: Provide the input object with all required fields
      - error: invalid-attachment-format
        cause: Attachment is not properly Base64 encoded
        solution: Ensure attachments are valid Base64-encoded data with proper MIME type prefix
      - error: invalid-product-id
        cause: Product ID is invalid or exceeds 32-bit integer range
        solution: Use a valid numeric product ID
      - error: invalid-rating
        cause: Rating is outside valid range
        solution: Use rating value between 1 and 5
      - error: missing-required-field
        cause: Required field is missing (title, comment, rating, name)
        solution: Provide all required input fields

---

# Create Product Review

## About

The `createProductReview` mutation allows customers to submit product reviews with ratings, comments, and media attachments. Use this mutation to:

- Submit product reviews from customers
- Add images and videos as review attachments
- Set review status (pending, approved, disapproved)
- Track review submissions with client mutation ID
- Enable customer feedback on products
- Build user-generated content on storefront
- Collect product ratings and reviews

This mutation supports Base64-encoded image and video attachments for rich media reviews.

## Arguments

All input fields live inside the mutation's `input` object.

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `productId` | `Int!` | ✅ Yes | ID of the product being reviewed. The product must exist, otherwise the mutation fails. |
| `title` | `String!` | ✅ Yes | Review headline. Rejected when empty. |
| `comment` | `String!` | ✅ Yes | Review body text. Rejected when empty. |
| `rating` | `Int!` | ✅ Yes | Star rating. Must be 1 to 5; anything outside that range is rejected. |
| `name` | `String!` | ✅ Yes | Reviewer's display name, as it appears on the review. |
| `email` | `String` | ❌ No | Accepted by the schema but not stored on the review. |
| `status` | `Int` | ❌ No | Leave unset. New reviews are created as `pending` for moderation — see [Review Status](#review-status). |
| `attachments` | `String` | ❌ No | JSON string holding an array of Base64 data URIs — see [Attachments Format](#attachments-format). |
| `clientMutationId` | `String` | ❌ No | Arbitrary string echoed back in the payload, for correlating a response with its request. |

The review is attributed to the authenticated customer when a Bearer token is sent. Without one it is stored as a guest review, which the store must allow — reviews are rejected outright when customer reviews are switched off, and guest reviews are rejected separately when the store requires a login to review.

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `createProductReviewPayloadData` | The review that was created. |
| `productReview.id` | `ID!` | IRI-style review identifier. |
| `productReview._id` | `Int!` | Numeric review ID. |
| `productReview.name` | `String!` | Reviewer's name. |
| `productReview.title` | `String!` | Review title. |
| `productReview.rating` | `Int!` | Star rating, 1 to 5. |
| `productReview.comment` | `String` | Review body text. |
| `productReview.status` | `String!` | Approval status — `"pending"` on a newly created review. |
| `productReview.attachments` | `String` | JSON string of the stored attachments, each with a `type` and a `url`. `null` when none were uploaded. |
| `productReview.createdAt` | `String` | ISO 8601 creation timestamp. |
| `productReview.updatedAt` | `String` | ISO 8601 timestamp of the last change. |
| `clientMutationId` | `String` | The `clientMutationId` sent with the request, echoed back. |

## Attachments Format

### Input Format (Creating Review)
- Must be a **JSON string** containing an array — not a GraphQL list
- Each item is a **Base64-encoded data URI** in the form `data:{MIME_TYPE};base64,{BASE64_DATA}`
- The MIME type must start with `image/` or `video/`; the subtype is taken from whatever you send and becomes the stored file's extension
- **Each decoded file must be 5 MB or smaller.** A larger one is rejected and the whole mutation fails
- A malformed data URI, or Base64 that will not decode, is rejected the same way

**Example Input:**
```json
"[\"data:image/webp;base64,iVBORw0KG...\", \"data:image/png;base64,iVBORw0KG...\"]"
```

### Response Format (Retrieved Review)
- Returned as a **JSON string** containing an array of objects
- Each object has `type` (image/video) and `url` (file URL)

**Example Response:**
```json
"[{\"type\":\"image\",\"url\":\"https://api-demo.bagisto.com/storage/review/94/photo1.webp\"},{\"type\":\"video\",\"url\":\"https://api-demo.bagisto.com/storage/review/94/demo.mp4\"}]"
```

## Review Status

A review's `status` is one of three strings, and a newly created review is always `pending`:

| Status | Description |
|--------|-------------|
| `"pending"` | Awaiting moderation. Not shown on the storefront. |
| `"approved"` | Published and visible on the product page. |
| `"disapproved"` | Declined and never published. |

Moving a review between these states is an admin action, not something the storefront does. The `status` input field takes an integer and is written through unchanged, so a value passed there does not map onto any of the three states and leaves the review in a status no query can match — leave it unset.

## Use Cases

### 1. Review form on a product page

The minimum submission is `productId`, `title`, `comment`, `rating`, and `name`. Send the shopper's Bearer token with the request and the review is attributed to their customer account; without one it is stored as a guest review, which the store must be configured to accept.

```graphql
mutation submitReview($input: createProductReviewInput!) {
  createProductReview(input: $input) {
    productReview {
      _id
      status
      createdAt
    }
  }
}
```

Reading `status` back confirms the review landed as `pending`.

### 2. Attaching photos from a file input

Attachments are not file uploads. Each file is read into a Base64 data URI, the URIs go into an array, and that array is serialised to a string before it is sent:

```js
const toDataUri = file => new Promise(resolve => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.readAsDataURL(file)
})

const uris = await Promise.all([...fileInput.files].map(toDataUri))

input.attachments = JSON.stringify(uris)
```

Check each file against the 5 MB limit before encoding — Base64 inflates the payload by roughly a third, and one oversized file fails the whole submission.

### 3. Telling the shopper what happens next

The review does not appear on the product page when the form is submitted, because it is created `pending`. Show a confirmation that it is awaiting approval, and read it back with [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) using `status: "pending"` and the same `productId` if the page needs to display it.

### 4. Correlating a response with its request

Pass a `clientMutationId` and it is echoed back in the payload, which lets a client match a response to the submission that produced it — useful when a review form is retried or several submissions are in flight.

## Best Practices

1. **Validate before submitting** — check `rating` is 1 to 5 and that `title` and `comment` are non-empty, so the customer sees a field-level message instead of a failed mutation
2. **Keep each attachment under 5 MB** — that is the hard server limit, and one oversized file fails the entire submission
3. **Compress images first** — WebP keeps a photo well inside the limit and uploads faster over a mobile connection
4. **Cap the attachment count client-side** — the server sets no limit, and every file is Base64-encoded into the request body, so a handful of photos is already a large payload
5. **Never send `status`** — reviews are created `pending` for moderation, and the field cannot promote one to approved
6. **Tell the customer the review is pending** — it does not appear on the product page until an admin approves it
7. **Send the customer's Bearer token when there is one** — it attributes the review to their account; without it the review is stored as a guest submission and is rejected outright if the store does not accept those

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Missing input | The `input` argument was omitted, or a required field inside it is absent. GraphQL rejects the document before the mutation runs. |
| Product not found | No product exists for the supplied `productId`. |
| Rating out of range | `rating` is below 1 or above 5. |
| Empty title or comment | Either field was sent as an empty string. |
| Invalid attachment | The data URI is malformed, the Base64 will not decode, or a decoded file exceeds 5 MB. |
| Reviews disabled | The store has customer reviews switched off, or the request is unauthenticated and guest reviews are not allowed. |

## Related Resources

- [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) - Query product reviews
- [Get Product](/api/graphql-api/shop/queries/get-product) - Query product details
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
