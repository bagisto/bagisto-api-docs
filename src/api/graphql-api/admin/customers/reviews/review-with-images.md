---
outline: false
examples:
  - id: admin-review-with-images
    title: Review with Images
    description: Returns a single review with its attached images as a field-selectable Relay connection. Query the images via edges { node { … } } and pick exactly the sub-fields you need. The id argument is the IRI of the review.
    query: |
      query AdminReview($id: ID!) {
        adminReview(id: $id) {
          id
          _id
          rating
          status
          productId
          customerId
          createdAt
          images {
            edges {
              node {
                id
                _id
                type
                mimeType
                path
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/reviews/68"
      }
    response: |
      {
        "data": {
          "adminReview": {
            "id": "/api/admin/reviews/68",
            "_id": 68,
            "rating": 5,
            "status": "approved",
            "productId": 1,
            "customerId": null,
            "createdAt": "2026-06-18T16:14:27+05:30",
            "images": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin_review_images/1",
                    "_id": 1,
                    "type": "image",
                    "mimeType": "image/png",
                    "path": "review/68/a.png"
                  }
                },
                {
                  "node": {
                    "id": "/api/admin_review_images/2",
                    "_id": 2,
                    "type": "image",
                    "mimeType": "image/jpeg",
                    "path": "review/68/b.jpg"
                  }
                }
              ]
            }
          }
        }
      }
---

# Review — with Images

Equivalent to [`GET /api/admin/reviews/{id}`](/api/rest-api/admin/customers/reviews/review-with-images).

::: tip
This endpoint demonstrates the **field-selectable connection** shape for a nested relation. The review's `images` come back as a Relay connection you sub-select with `edges { node { … } }` — not an opaque JSON blob.
:::

## Operation

| Operation | Type |
|-----------|------|
| `adminReview(id: ID!)` | Query |

The `id` argument is the **IRI** (`/api/admin/reviews/{id}`). A bare numeric ID is not accepted.

## Fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | Review IRI. |
| `_id` | `Int` | Numeric review ID. |
| `rating` | `Int` | Star rating (1–5). |
| `status` | `String` | `pending` / `approved` / `disapproved`. |
| `productId` | `Int` | The reviewed product. |
| `customerId` | `Int` | Author customer ID (`null` for guest reviews). |
| `createdAt` | `String` | ISO 8601 timestamp. |
| `images` | Connection | Attached images — query via `images { edges { node { … } } }`. |

### `images` — connection

A field-selectable Relay connection. Each `node` exposes:

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | Image IRI. |
| `_id` | `Int` | Numeric image ID. |
| `type` | `String` | Attachment type. |
| `mimeType` | `String` | MIME type (e.g. `image/png`). |
| `path` | `String` | Storage path of the image. |

::: tip Field-selectable connections
`images` is a **Relay connection**, not opaque JSON. Select it with the `edges { node { … } }` syntax and pick exactly the sub-fields you need. Over REST the same data comes back as a plain JSON array — see the [REST page](/api/rest-api/admin/customers/reviews/review-with-images).
:::

## Errors

| Code | Cause |
|------|-------|
| Not found | Review not found. |
| Unauthorized | Missing or invalid admin Bearer token. |
