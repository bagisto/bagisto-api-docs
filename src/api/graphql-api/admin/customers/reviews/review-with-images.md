---
outline: false
examples:
  - id: admin-customer-review-with-images-gql
    title: Review with Images
    description: A single review with its attached images as a field-selectable Relay connection. Sub-select the images via edges { node { … } }.
    query: |
      query AdminCustomerReview($id: ID!) {
        adminCustomerReview(id: $id) {
          id
          _id
          title
          comment
          rating
          status
          name
          createdAt
          updatedAt
          product {
            id
            name
            sku
          }
          customer {
            id
            name
            email
          }
          images {
            edges {
              node {
                id
                path
                url
              }
            }
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/customers/reviews/21"
      }
    response: |
      {
        "data": {
          "adminCustomerReview": {
            "id": "/api/admin/customers/reviews/21",
            "_id": 21,
            "title": "Great product",
            "comment": "Exactly as described.",
            "rating": 5,
            "status": "approved",
            "name": "Jane Doe",
            "createdAt": "2026-06-01 08:00:00",
            "updatedAt": "2026-06-20 14:30:00",
            "product": {
              "id": 2358,
              "name": "Classic Watch Hand",
              "sku": "SP-001"
            },
            "customer": {
              "id": 14,
              "name": "Jane Doe",
              "email": "jane@example.com"
            },
            "images": {
              "edges": [
                {
                  "node": {
                    "id": "/api/admin_customer_review_images/4",
                    "path": "review/21/photo.webp",
                    "url": "http://localhost:8000/storage/review/21/photo.webp"
                  }
                },
                {
                  "node": {
                    "id": "/api/admin_customer_review_images/5",
                    "path": "review/21/back.jpg",
                    "url": "http://localhost:8000/storage/review/21/back.jpg"
                  }
                }
              ]
            }
          }
        }
      }
---

# Review — with Images (GraphQL)

The same `adminCustomerReview` query, focused on the attached images. A review's `images` are returned as a field-selectable Relay connection — you sub-select them with `images { edges { node { … } } }` and pick exactly the sub-fields you need, rather than receiving an opaque JSON blob. Over REST the same data comes back as a plain JSON array.

The `id` argument is the review IRI (`/api/admin/customers/reviews/{id}`).

## Image node fields

| Field | Type | Notes |
|-------|------|-------|
| `id` | `ID` | Image IRI. |
| `path` | `String` | Storage path of the image. |
| `url` | `String` | Public URL resolved from the storage path. |

::: tip
See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
