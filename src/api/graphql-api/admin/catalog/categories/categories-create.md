---
outline: false
examples:
  - id: admin-catalog-category-create
    title: Create Category
    description: Create a new category. File upload for logo/banner is NOT supported in v1. Mirrors POST /api/admin/catalog/categories.
    query: |
      mutation CreateCategory($input: createAdminCategoryInput!) {
        createAdminCategory(input: $input) {
          adminCategory { id _id }
        }
      }
    variables: |
      {
        "input": {
          "slug": "apparel",
          "name": "Apparel",
          "description": "Men's and women's apparel",
          "position": 1,
          "attributes": [11, 23],
          "parent_id": 1,
          "display_mode": "products_and_description",
          "status": 1,
          "locale": "en"
        }
      }
    response: |
      {
        "data": {
          "createAdminCategory": {
            "adminCategory": { "id": "/api/admin/categories/7", "_id": 7 }
          }
        }
      }
---

# Category — Create

Creates a new category. Equivalent to
[`POST /api/admin/catalog/categories`](/api/rest-api/admin/catalog/categories/categories-create).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminCategory` | Mutation | Create a new category |

## Input

Same fields as the REST endpoint — `slug`, `name`, `description`, `position`,
`attributes`, `parent_id`, `display_mode`, `status`, `locale`, and optional SEO
fields. See the
[REST page](/api/rest-api/admin/catalog/categories/categories-create) for the
full field table and validation rules.

## Notes

- **File upload not supported in v1** — `logo_path` / `banner_path` cannot be set via this mutation.
- Follow up with the [`adminCategory`](/api/graphql-api/admin/catalog/categories/categories-detail) query to load the refreshed detail.
