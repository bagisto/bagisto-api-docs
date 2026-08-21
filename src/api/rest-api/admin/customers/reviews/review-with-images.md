---
outline: false
apiType: rest
examples:
  - id: admin-customer-review-with-images
    title: Review with Images
    description: A single customer review whose attached images come back as a flat JSON array. This is the REST counterpart of the GraphQL images connection — the same data, served as a plain array instead of edges / node.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/reviews/9" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "id": 9,
        "title": "Great product!",
        "comment": "Loved it.",
        "rating": 5,
        "status": "approved",
        "name": "Jane Doe",
        "product": {
          "id": 142,
          "name": "Classic Watch",
          "sku": "SP-001"
        },
        "customer": {
          "id": 14,
          "name": "Jane Doe",
          "email": "jane@example.com"
        },
        "images": [
          {
            "id": 3,
            "path": "reviews/9/front.jpg",
            "url": "https://your-domain.com/storage/reviews/9/front.jpg"
          },
          {
            "id": 4,
            "path": "reviews/9/back.jpg",
            "url": "https://your-domain.com/storage/reviews/9/back.jpg"
          }
        ],
        "createdAt": "2026-05-25 09:00:00",
        "updatedAt": "2026-05-25 09:00:00"
      }
---

# Review with Images

The same endpoint as [Customer Review Detail](/api/rest-api/admin/customers/reviews/detail), highlighting a review that carries attachments. REST has no connections, so the review's `images` come back as a **flat JSON array** — the same data the GraphQL endpoint serves as an `images { edges { node } }` connection. Each image carries its `id`, storage `path`, and a ready-to-use `url`.

See the [Customer Reviews overview](/api/rest-api/admin/customers/reviews/) for the moderation flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/reviews/{id}` | GET |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Review ID. |
| `title` | string | Review title. |
| `comment` | string | Review body. |
| `rating` | integer | Star rating (1–5). |
| `status` | string | `pending` / `approved` / `disapproved`. |
| `name` | string | Reviewer name. |
| `product` | object | Reviewed product — `{ id, name, sku }`. |
| `customer` | object \| null | Author — `{ id, name, email }`; `null` for guest reviews. |
| `images` | array | Attachments, each `{ id, path, url }`; empty array when none. |
| `createdAt` / `updatedAt` | string | Timestamps. |

## Errors

| HTTP | Cause |
|------|-------|
| 404 | Review not found. |
| 401 | Missing or invalid admin Bearer token. |
