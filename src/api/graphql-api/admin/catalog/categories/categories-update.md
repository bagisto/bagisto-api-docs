---
outline: false
examples:
  - id: admin-catalog-category-update
    title: Update (or Move) Category
    description: Update a category. Translatable fields are nested under the locale key. Re-parenting and re-positioning (move) are done on this same mutation — there is no separate move operation.
    query: |
      mutation UpdateCategory($input: updateAdminCategoryInput!) {
        updateAdminCategory(input: $input) {
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
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/categories/7",
          "locale": "en",
          "position": 2,
          "attributes": [11, 23],
          "parentId": 1,
          "status": 1,
          "en": {
            "slug": "watches",
            "name": "Watches",
            "description": "Wrist and pocket watches"
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCategory": {
            "adminCategory": {
              "id": "/api/admin/catalog/categories/7",
              "_id": 7,
              "name": "Watches",
              "slug": "watches",
              "description": "Wrist and pocket watches",
              "position": 2,
              "status": 1,
              "displayMode": "products_and_description",
              "parentId": 1,
              "locale": "en",
              "createdAt": "2026-06-24 08:15:00",
              "updatedAt": "2026-06-24 09:40:00"
            }
          }
        }
      }
---

# Category — Update (and Move) (GraphQL)

Updates a category and returns its detail. Unlike create, the translatable values (`slug`, `name`, `description`, optional meta fields) are **nested under a key matching the locale code** (e.g. `"en"`), and `locale` names which block is written. Top-level fields: `id` (the category IRI), `position`, `attributes`, `parentId`, `displayMode`, `status`. **Moving** a category is part of this same mutation — change `parentId` and `position` to re-parent and re-order; there is no separate move operation (this mirrors the admin panel).

::: tip
See the [Categories overview](/api/graphql-api/admin/catalog/categories/) for how the menu works.
:::

The update mutation payload resolves the category's scalar fields. The category's `translations` and `filterableAttributeIds` are not returned here — re-query [`adminCategory`](/api/graphql-api/admin/catalog/categories/categories-detail) for the full detail.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
