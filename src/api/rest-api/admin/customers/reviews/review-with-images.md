---
outline: false
apiType: rest
examples:
  - id: admin-review-with-images
    title: Review with Images
    description: Returns a single review with its attached images as a flat array. This is the REST counterpart of the GraphQL adminReview connection — the same data, served as a plain JSON array instead of an edges/node connection.
    query: |
      curl -X GET "https://your-domain.com/api/admin/reviews/68" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 68,
        "name": "QA Reviewer",
        "title": "Solid product",
        "rating": 5,
        "comment": "works great",
        "status": "approved",
        "productId": 1,
        "customerId": null,
        "createdAt": "2026-06-18 16:14:27",
        "updatedAt": "2026-06-18 16:14:27",
        "images": [
          {
            "id": 1,
            "reviewId": 68,
            "type": "image",
            "mimeType": "image/png",
            "path": "review/68/a.png"
          },
          {
            "id": 2,
            "reviewId": 68,
            "type": "image",
            "mimeType": "image/jpeg",
            "path": "review/68/b.jpg"
          }
        ]
      }
---

# Review — with Images

The REST counterpart of the GraphQL [`adminReview`](/api/graphql-api/admin/customers/reviews/review-with-images) query. REST has no connections, so the review's `images` come back as a **flat JSON array** — the same underlying data the GraphQL endpoint serves as an `images { edges { node } }` connection.

| Endpoint | Method |
|----------|--------|
| `/api/admin/reviews/{id}` | GET |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Review ID. |
| `name` | string | Reviewer name. |
| `title` | string | Review title. |
| `rating` | integer | Star rating (1–5). |
| `comment` | string | Review body. |
| `status` | string | `pending` / `approved` / `disapproved`. |
| `productId` | integer | The reviewed product. |
| `customerId` | integer \| null | Author customer (`null` for guest reviews). |
| `createdAt` / `updatedAt` | string | Timestamps. |
| `images` | array | Attached images, each `{ id, reviewId, type, mimeType, path }`. |

## Errors

| HTTP | Cause |
|------|-------|
| 404 | Review not found. |
| 401 | Missing or invalid admin Bearer token. |
