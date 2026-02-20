---
outline: false
examples:
  - id: get-customer-review-basic
    title: Get Single Customer Review
    description: Retrieve a specific product review by ID for the authenticated customer.
    query: |
      query getCustomerReview($id: ID!) {
        customerReview(id: $id) {
          id
          _id
          title
          comment
          rating
          status
          name
          product {
            id
            _id
            sku
          }
          customer {
            id
            _id
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/shop/customer-reviews/1"
      }
    response: |
      {
        "data": {
          "customerReview": {
            "id": "/api/shop/customer-reviews/1",
            "_id": 1,
            "title": "Great product",
            "comment": "Really enjoyed using this product.",
            "rating": 5,
            "status": "approved",
            "name": "John",
            "product": {
              "id": "/api/shop/products/2",
              "_id": 2,
              "sku": "PROD-002"
            },
            "customer": {
              "id": "/api/shop/customers/1",
              "_id": 1
            },
            "createdAt": "2026-02-18T10:30:00+00:00",
            "updatedAt": "2026-02-18T10:30:00+00:00"
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Review with specified ID does not exist or does not belong to the customer
        solution: Verify the review ID and ensure it belongs to the authenticated customer
      - error: MISSING_ID
        cause: Review ID not provided
        solution: Provide a valid review IRI identifier

  - id: get-customer-review-introspection
    title: Schema Introspection - CustomerReview
    description: Inspect the CustomerReview type schema.
    query: |
      {
        __type(name: "CustomerReview") {
          name
          kind
          fields {
            name
            type {
              name
              kind
            }
          }
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "__type": {
            "name": "CustomerReview",
            "kind": "OBJECT",
            "fields": [
              { "name": "id", "type": { "name": null, "kind": "NON_NULL" } },
              { "name": "_id", "type": { "name": "Int", "kind": "SCALAR" } },
              { "name": "title", "type": { "name": "String", "kind": "SCALAR" } },
              { "name": "comment", "type": { "name": "String", "kind": "SCALAR" } },
              { "name": "rating", "type": { "name": "Int", "kind": "SCALAR" } },
              { "name": "status", "type": { "name": "String", "kind": "SCALAR" } },
              { "name": "name", "type": { "name": "String", "kind": "SCALAR" } },
              { "name": "product", "type": { "name": "Product", "kind": "OBJECT" } },
              { "name": "customer", "type": { "name": "Customer", "kind": "OBJECT" } },
              { "name": "createdAt", "type": { "name": "String", "kind": "SCALAR" } },
              { "name": "updatedAt", "type": { "name": "String", "kind": "SCALAR" } }
            ]
          }
        }
      }
    commonErrors: []

---

# Get Customer Review

## About

The `customerReview` query retrieves a single product review by its ID for the authenticated customer. Customers can only access their own reviews. Use this query to:

- Display detailed review information
- Show the full review text and rating
- Check the approval status of a specific review
- Load a review for detailed viewing in the customer dashboard

## Authentication

This query requires customer authentication:

- **Authenticated customers**: Provide a valid customer authentication token in the `Authorization` header. Obtain this token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

```
Authorization: Bearer <accessToken>
X-STOREFRONT-KEY: <storefrontKey>
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | ✅ Yes | The IRI identifier of the customer review (e.g. `/api/shop/customer-reviews/1`). |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID!` | IRI identifier (e.g. `/api/shop/customer-reviews/1`). |
| `_id` | `Int!` | Numeric database ID. |
| `title` | `String!` | Review title. |
| `comment` | `String!` | Review body text. |
| `rating` | `Int!` | Star rating (1–5). |
| `status` | `String!` | Review status: `pending`, `approved`, or `rejected`. |
| `name` | `String!` | Reviewer display name. |
| `product` | `Product!` | Associated product with id, _id, sku. |
| `customer` | `Customer!` | Customer who wrote the review with id, _id. |
| `createdAt` | `DateTime!` | ISO 8601 creation timestamp. |
| `updatedAt` | `DateTime!` | ISO 8601 last update timestamp. |

## Error Responses

| Error | Cause |
|-------|-------|
| `Unauthenticated` | Missing or invalid Bearer token |
| `Customer review ID is required` | ID not provided for single-item query |
| `Customer review with ID ":id" not found` | Review doesn't exist or doesn't belong to the customer |

## Use Cases

- Display individual review details in customer account
- Show review with full context and approval status
- Load specific review for viewing or tracking
- Check if a submitted review has been approved

## Related Resources

- [Get All Customer Reviews](/api/graphql-api/shop/queries/get-customer-reviews) — Query all customer reviews
- [Get Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) — Query all product reviews
- [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) — Submit a new product review
