---
outline: false
examples:
  - id: admin-customer-review-detail-gql
    title: Customer Review Detail
    description: Single review with nested product, customer and the images as a field-selectable connection.
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
                }
              ]
            }
          }
        }
      }
---

# Customer Review Detail (GraphQL)

Returns a single review by IRI. The reviewed product and the author are nested objects (`product`, `customer`). The review's attached images come back as a field-selectable Relay connection — sub-select with `images { edges { node { … } } }` and pick the fields you need.

The `id` argument is the review IRI (`/api/admin/customers/reviews/{id}`).

See the [Reviews overview](/api/graphql-api/admin/customers/reviews/) for how moderation works.
