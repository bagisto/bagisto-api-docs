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
        "id": "/api/admin/catalog/categories/7"
      }
    response: |
      {
        "data": {
          "adminCategory": {
            "id": "/api/admin/catalog/categories/7",
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
| `adminCategory` | Query (item) |

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the category (e.g. `"/api/admin/catalog/categories/7"`) |

Take the IRI straight from the `id` of an [`adminCategories`](/api/graphql-api/admin/catalog/categories/categories-listing) edge node, or build it as `/api/admin/catalog/categories/<numericId>`. A tree node's `id` will not work — that one resolves to `/api/admin/admin_category_trees/<id>`, so use its `_id` to build the path.

## Node Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/catalog/categories/7`) |
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

## Errors

| Condition | Result |
|-----------|--------|
| Unknown or deleted id | HTTP `200` with `Category not found.` in `errors[]` and `null` in `data.adminCategory` |
| Missing or invalid token | HTTP `401` with `{"message": "Unauthenticated.", "error": "unauthenticated"}` — rejected by the transport before GraphQL runs |

## Working With This Query

- **`translations` and `filterableAttributeIds` are JSON scalars.** Select each as a **bare field** — a sub-selection is a schema error. The whole structure comes back in one piece.
- **`translations` carries one entry per stored locale row**, not just the requested one, so a multi-locale store returns them all. Unset text fields come back as the empty string `""`, not `null`.
- **The top-level `name`, `slug`, and `description` duplicate the requested locale's entry.** They are a shortcut, not extra data — `locale` tells you which entry they came from.
- **`filterableAttributeIds` is a flat integer array.** `[]` means none are configured; it is the layered-navigation attribute set for this category, not the products' attributes.
- **The `id` argument is the IRI, not the number.** Build it as `/api/admin/catalog/categories/<_id>` or pass a listing edge's `id` straight through.
