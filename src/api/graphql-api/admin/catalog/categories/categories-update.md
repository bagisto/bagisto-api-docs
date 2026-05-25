---
outline: false
examples:
  - id: admin-catalog-category-update
    title: Update (or Move) Category
    description: Update a category. Move-by-parent_id is handled here — there is NO separate move mutation. Translatable fields are nested under the locale key. Mirrors PUT /api/admin/catalog/categories/{id}.
    query: |
      mutation UpdateCategory($input: updateAdminCategoryInput!) {
        updateAdminCategory(input: $input) {
          adminCategory { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/categories/7",
          "locale": "en",
          "position": 2,
          "attributes": [11, 23],
          "parent_id": 1,
          "status": 1,
          "en": {
            "slug": "apparel",
            "name": "Apparel",
            "description": "Men's and women's apparel"
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCategory": {
            "adminCategory": { "id": "/api/admin/categories/7", "_id": 7 }
          }
        }
      }
---

# Category — Update (and Move)

Updates an existing category. Equivalent to
[`PUT /api/admin/catalog/categories/{id}`](/api/rest-api/admin/catalog/categories/categories-update).

::: warning No separate move mutation
**Move semantics are part of `updateAdminCategory`.** Re-parenting and
re-positioning are done by supplying `parent_id` and `position` on the
ordinary update mutation. There is no `moveAdminCategory` — this mirrors the
Bagisto admin panel, which has no separate move action either.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminCategory` | Mutation | Update an existing category (also handles moves) |

## Input

Top-level fields: `id` (resource IRI), `locale`, `position`, `attributes`,
`parent_id`, `status`. Translatable fields (`slug`, `name`, `description`,
optional `meta_*`) are nested under a key matching the locale code (e.g.
`"en"`). See the
[REST page](/api/rest-api/admin/catalog/categories/categories-update) for the
full schema.
