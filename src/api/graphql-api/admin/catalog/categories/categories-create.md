---
outline: false
examples:
  - id: admin-catalog-category-create
    title: Create Category
    description: Create a new category. On create, the translatable fields (slug, name, description) are sent at the top level and broadcast to the configured locales. Logo/banner upload is not supported.
    query: |
      mutation CreateCategory($input: createAdminCategoryInput!) {
        createAdminCategory(input: $input) {
          adminCategory {
            id
            _id
            name
            slug
            description
            position
            status
            displayMode
            parentId
            locale
            logoUrl
            bannerUrl
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "slug": "watches",
          "name": "Watches",
          "description": "Wrist and pocket watches",
          "position": 1,
          "attributes": [11, 23],
          "parentId": 1,
          "displayMode": "products_and_description",
          "status": 1,
          "locale": "en"
        }
      }
    response: |
      {
        "data": {
          "createAdminCategory": {
            "adminCategory": {
              "id": "/api/admin/catalog/categories/7",
              "_id": 7,
              "name": "Watches",
              "slug": "watches",
              "description": "Wrist and pocket watches",
              "position": 1,
              "status": 1,
              "displayMode": "products_and_description",
              "parentId": 1,
              "locale": "en",
              "logoUrl": null,
              "bannerUrl": null,
              "createdAt": "2026-06-24 08:15:00",
              "updatedAt": "2026-06-24 08:15:00"
            }
          }
        }
      }
---

# Category — Create (GraphQL)

Creates a new category and returns its detail. On **create**, the translatable values (`slug`, `name`, `description`, optional `metaTitle` / `metaDescription` / `metaKeywords`) are supplied at the **top level** and broadcast to the configured locales — this differs from update, which takes those values **nested under a locale key**. Required: `slug`, `name`, `position`, `attributes` (filterable attribute ids); `description` is required when `displayMode` is `description_only` or `products_and_description`. Logo/banner image upload is not available — set them in the admin panel.

See the [Categories overview](/api/graphql-api/admin/catalog/categories/) for how this menu works.

The create mutation payload resolves the category's scalar fields. The category's `translations` and `filterableAttributeIds` are not returned here — re-query [`adminCategory`](/api/graphql-api/admin/catalog/categories/categories-detail) for the full detail.
