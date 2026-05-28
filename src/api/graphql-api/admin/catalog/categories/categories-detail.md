---
outline: false
examples:
  - id: admin-catalog-category-detail
    title: Category Detail (with all translations)
    description: Fetch a single category by ID including the full translations array (all locales present in the DB) and the list of filterable attribute IDs.
    query: |
      query AdminCatalogCategory($id: ID!) {
        adminCategory(id: $id) {
          id
          _id
          name
          slug
          status
          position
          parentId
          displayMode
          logoUrl
          bannerUrl
          description
          locale
          createdAt
          updatedAt
          translations
          filterableAttributeIds
        }
      }
    variables: |
      {
        "id": "/api/admin/categories/7"
      }
    response: |
      {
        "data": {
          "adminCategory": {
            "id": "/api/admin/categories/7",
            "_id": 7,
            "name": "Apparel",
            "slug": "apparel",
            "status": 1,
            "position": 1,
            "parentId": 1,
            "displayMode": "products_and_description",
            "logoUrl": "https://example.com/storage/category/7/logo.webp",
            "bannerUrl": null,
            "description": "Men's and women's apparel",
            "locale": "en",
            "createdAt": "2026-01-12T08:15:00+00:00",
            "updatedAt": "2026-04-30T14:20:09+00:00",
            "translations": [
              {
                "locale": "en",
                "name": "Apparel",
                "slug": "apparel",
                "description": "Men's and women's apparel",
                "metaTitle": null,
                "metaDescription": null,
                "metaKeywords": null
              },
              {
                "locale": "fr",
                "name": "Vêtements",
                "slug": "vetements",
                "description": null,
                "metaTitle": null,
                "metaDescription": null,
                "metaKeywords": null
              }
            ],
            "filterableAttributeIds": [11, 23]
          }
        }
      }
---

# Catalog Category — Detail (GraphQL)

GraphQL item query that returns a single category by its IRI, including the
**full translations array** (every locale present in the database) and the list
of **filterable attribute IDs** configured for the category.

This is the query to call when an admin needs complete metadata for a category —
e.g. when pre-populating the edit form in Catalog → Categories.

## Operation

| Operation | Type |
|-----------|------|
| `adminCatalogCategory` | Query (item) |

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the category (e.g. `"/api/admin/admin_categories/7"`) |

::: tip Finding the IRI
The IRI can be taken directly from `id` in any `adminCatalogCategories` or
`adminCatalogCategoryTrees` edge node, or constructed as
`/api/admin/admin_categories/{numericId}`.
:::

## Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/admin_categories/7`) |
| `_id` | `Int` | Raw category ID |
| `name` | `String` | Category name in the current app locale |
| `slug` | `String` | URL slug in the current app locale |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `position` | `Int` | Display order position |
| `parentId` | `Int` | Parent category ID; `null` for root nodes |
| `displayMode` | `String` | Category display mode (e.g. `products_and_description`) |
| `logoUrl` | `String` | Storage URL for the category logo; `null` if not set |
| `bannerUrl` | `String` | Storage URL for the category banner; `null` if not set |
| `description` | `String` | Category description in the current app locale |
| `locale` | `String` | App locale used for top-level scalar fields |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |
| `translations` | scalar (JSON array) | All locale translations (see below) |
| `filterableAttributeIds` | scalar (JSON array) | Integer IDs of filterable attributes configured for this category |

### `translations` item shape

`translations` is returned as a **plain JSON array** (scalar in GraphQL). Each
element corresponds to one locale row in `category_translations`:

| Key | Type | Description |
|-----|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `name` | string\|null | Category name in this locale |
| `slug` | string\|null | URL slug in this locale |
| `description` | string\|null | Description in this locale |
| `metaTitle` | string\|null | SEO meta title |
| `metaDescription` | string\|null | SEO meta description |
| `metaKeywords` | string\|null | SEO meta keywords |

## Example Query

```graphql
query AdminCatalogCategory($id: ID!) {
  adminCatalogCategory(id: $id) {
    id
    _id
    name
    slug
    status
    position
    parentId
    displayMode
    logoUrl
    bannerUrl
    description
    locale
    createdAt
    updatedAt
    translations
    filterableAttributeIds
  }
}
```

```json
{
  "id": "/api/admin/admin_categories/7"
}
```

## Example Response

```json
{
  "data": {
    "adminCatalogCategory": {
      "id": "/api/admin/admin_categories/7",
      "_id": 7,
      "name": "Apparel",
      "slug": "apparel",
      "status": 1,
      "position": 1,
      "parentId": 1,
      "displayMode": "products_and_description",
      "logoUrl": "https://example.com/storage/category/7/logo.webp",
      "bannerUrl": null,
      "description": "Men's and women's apparel",
      "locale": "en",
      "createdAt": "2026-01-12T08:15:00+00:00",
      "updatedAt": "2026-04-30T14:20:09+00:00",
      "translations": [
        {
          "locale": "en",
          "name": "Apparel",
          "slug": "apparel",
          "description": "Men's and women's apparel",
          "metaTitle": null,
          "metaDescription": null,
          "metaKeywords": null
        },
        {
          "locale": "fr",
          "name": "Vêtements",
          "slug": "vetements",
          "description": null,
          "metaTitle": null,
          "metaDescription": null,
          "metaKeywords": null
        }
      ],
      "filterableAttributeIds": [11, 23]
    }
  }
}
```

## Errors

| Scenario | GraphQL `errors[]` | HTTP Status |
|----------|-------------------|-------------|
| Unknown ID | `"Category not found"` in `errors[]`, `data.adminCatalogCategory: null` | `200` (GraphQL convention) |
| Missing auth | `"Unauthenticated"` in `errors[]` | `200` |

## Notes

- **`translations` is a plain JSON scalar**, not a typed GraphQL object list. You access it as a regular JSON array. This avoids API Platform serializing nested DTO objects as IRI strings instead of inline objects.
- **`translations` contains every locale in the DB**, not just the current app locale. If the store has 3 locale rows (`en`, `fr`, `de`), all three are returned. Fields without content for a locale are `null`.
- **`filterableAttributeIds`** is a plain JSON scalar array of integers. An empty array `[]` means no filterable attributes have been configured for this category.
- **The `id` argument is the IRI**, not the numeric integer. Use the `_id` field from listing or tree queries and construct `"/api/admin/admin_categories/{_id}"`, or pass the `id` field directly.
- **Same provider as the REST detail endpoint** — `AdminCategoryItemProvider` serves both transports with identical data loading semantics.
