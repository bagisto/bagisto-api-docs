---
outline: false
examples:
  - id: delete-product-review-basic
    title: Delete Product Review - Basic
    description: Delete a product review by providing its ID in IRI format.
    query: |
      mutation deleteProductReview($input: deleteProductReviewInput!) {
        deleteProductReview(input: $input) {
          productReview {
            id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/reviews/93"
        }
      }
    response: |
      {
        "data": {
          "deleteProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/93"
            }
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/shop/reviews/93")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/reviews/93"
        solution: Use IRI format ID (/api/shop/reviews/{id}) for review deletion
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists

  - id: delete-product-review-with-tracking
    title: Delete Product Review - With Tracking
    description: Delete a product review and track the deletion with client mutation ID.
    query: |
      mutation deleteProductReview($input: deleteProductReviewInput!) {
        deleteProductReview(input: $input) {
          productReview {
            id
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/shop/reviews/60",
          "clientMutationId": "delete-review-mutation-001"
        }
      }
    response: |
      {
        "data": {
          "deleteProductReview": {
            "productReview": {
              "id": "/api/shop/reviews/60"
            },
            "clientMutationId": "delete-review-mutation-001"
          }
        }
      }
    commonErrors:
      - error: id-required
        cause: Review ID parameter is missing
        solution: Provide the review ID in IRI format (e.g., "/api/shop/reviews/93")
      - error: invalid-id-format
        cause: Invalid ID format. Expected IRI format like "/api/shop/reviews/93"
        solution: Use IRI format ID (/api/shop/reviews/{id}) for review deletion
      - error: not-found
        cause: Review with given ID does not exist
        solution: Verify the review ID is correct and the review exists
      - error: unauthorized
        cause: User does not have permission to delete this review
        solution: Ensure the user has admin privileges or is the review owner

---

# Delete Product Review

## About

The `deleteProductReview` mutation permanently removes a review. Use it to:

- Let a shopper withdraw a review they submitted
- Remove a review a shopper asked to have taken down
- Clear reviews created while testing an integration

Deletion is immediate and cannot be undone — the row is removed rather than flagged, so the review disappears from every query at once.

A review can only be deleted by the customer who wrote it. Send that customer's Bearer token — an unauthenticated request, a different customer's token, or a review submitted by a guest is refused.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | Identifies the review. Accepts the IRI form (`/api/shop/reviews/93`) or a plain numeric ID. |
| `clientMutationId` | `String` | ❌ No | Arbitrary string echoed back in the payload, useful for correlating a response with its request. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `productReview` | `ProductReview` | The review that was removed. Only `id` is populated — the record is already gone, so its other fields are not available to select meaningfully. |
| `productReview.id` | `ID!` | IRI of the deleted review, returned as confirmation. |
| `clientMutationId` | `String` | The `clientMutationId` sent with the request, echoed back. |

A successful delete looks like this:

```json
{
  "data": {
    "deleteProductReview": {
      "productReview": {
        "id": "/api/shop/reviews/76"
      },
      "clientMutationId": "review-cleanup-76"
    }
  }
}
```

## Use Cases

### 1. Withdrawing a shopper's own review

Read the review ID back from the list the shopper is looking at, then delete it and drop the row from the rendered list on success.

```graphql
mutation removeReview($input: deleteProductReviewInput!) {
  deleteProductReview(input: $input) {
    productReview {
      id
    }
    clientMutationId
  }
}
```

```json
{
  "input": {
    "id": "/api/shop/reviews/76",
    "clientMutationId": "review-cleanup-76"
  }
}
```

### 2. Cleaning up integration test data

A review created while testing stays in the catalog and counts toward a product's review total. Delete it with the `_id` returned by the create mutation.

### 3. Confirming the review is gone

Re-run [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) for the same `product_id`. The deleted review is absent and `totalCount` has dropped by one.

## Best Practices

1. **Prefer an admin status change to a deletion** — marking a review disapproved hides it from the storefront while keeping the record; deleting destroys it with no way back
2. **Confirm with the shopper first** — there is no soft delete and no recovery path short of a database restore
3. **Only offer the action on the shopper's own reviews** — the API refuses a review written by anyone else, and a guest review can never be removed through the storefront
4. **Delete by the ID you were handed** — take it from the review list or the create response rather than assembling the IRI by hand
5. **Treat a repeat delete as already-done** — a second call for the same ID fails because the review no longer exists, which is a successful outcome from the shopper's point of view
6. **Refresh the product's review counts afterwards** — `totalCount` and any cached rating breakdown are stale the moment a review is removed

## Error Scenarios

| Scenario | Cause |
|----------|-------|
| Missing ID | The `id` field was omitted from `input`. GraphQL rejects the document before the mutation runs. |
| Review not found | The ID resolves to a review that does not exist, including one already deleted. |
| Not signed in | No customer Bearer token was sent, so ownership cannot be established. |
| Not your review | The review belongs to another customer, or was submitted by a guest and has no owner. |

## Related Resources

- [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) - Query product reviews
- [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) - Submit a new review
- [Update Product Review](/api/graphql-api/shop/mutations/update-product-review) - Edit an existing review
- [Get Product](/api/graphql-api/shop/queries/get-product) - Query product details
- [Shop API Overview](/api/graphql-api/shop-api) - Overview of Shop API resources
