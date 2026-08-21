---
outline: false
examples:
  - id: admin-catalog-categories-list
    title: List Catalog Categories (Datagrid)
    description: Cursor-paginated query returning the flat category list — the GraphQL equivalent of the admin Catalog → Categories datagrid. Supports filtering by name, status, position, parent_id, and locale.
    query: |
      query AdminCatalogCategories(
        $first: Int
        $after: String
        $name: String
        $status: Int
        $locale: String
      ) {
        adminCategories(
          first: $first
          after: $after
          name: $name
          status: $status
          locale: $locale
        ) {
          edges {
            cursor
            node {
              id
              _id
              name
              slug
              description
              status
              position
              parentId
              displayMode
              locale
              logoUrl
              bannerUrl
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "name": "Apparel",
        "status": 1,
        "locale": "en"
      }
    response: |
      {
        "data": {
          "adminCategories": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/catalog/categories/7",
                  "_id": 7,
                  "name": "Apparel",
                  "slug": "apparel",
                  "description": "<p>Clothing and accessories for every season.</p>",
                  "status": 1,
                  "position": 1,
                  "parentId": 1,
                  "displayMode": "products_and_description",
                  "locale": "en",
                  "logoUrl": null,
                  "bannerUrl": null,
                  "createdAt": "2026-01-12T08:15:00+00:00",
                  "updatedAt": "2026-04-30T14:20:09+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "endCursor": "MA==",
              "startCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# Catalog Categories — Datagrid Listing (GraphQL)

Cursor-paginated GraphQL query that mirrors the Bagisto admin **Catalog →
Categories** datagrid. Returns the flat category list with filtering, sorting,
and cursor pagination.

For the flat-list versus tree shapes, hierarchy and move semantics, and display modes, see the [Categories overview](/api/graphql-api/admin/catalog/categories/).

This query returns a **flat, cursor-paginated list**, which is what a datagrid needs. For the nested hierarchy behind a tree picker use [`adminCategoryTrees`](/api/graphql-api/admin/catalog/categories/categories-tree) instead.

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCategories` | Query | Cursor (`first` / `after`) |

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of items per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `last` | `Int` | Page size when paging backwards | `10` |
| `before` | `String` | Cursor from a previous `pageInfo.startCursor` | `"MA=="` |
| `category_id` | `String` | Filter by category ID — single integer or comma-separated list (e.g. `"12"` or `"12,18"`) | `"7"` |
| `name` | `String` | Partial category name match (SQL `LIKE %value%`) | `"Apparel"` |
| `position` | `Int` | Exact position filter | `1` |
| `status` | `Int` | Filter by status: `0` = disabled, `1` = enabled | `1` |
| `parent_id` | `Int` | Filter by parent category ID | `1` |
| `locale` | `String` | Locale code for translation resolution (default: app locale) | `"en"` |
| `sort` | `String` | Column to sort by (see Sorting section below) | `"id"` |
| `order` | `String` | Sort direction: `"asc"` or `"desc"` (default `"desc"`) | `"desc"` |

Every filter is a first-class GraphQL argument — pass them alongside `first` and `after`, not inside a nested filter object. Filters combine with AND, so each one narrows the result. Note that `category_id`, `parent_id`, `sort`, and `order` are snake_case or single words while the rest are camelCase; that is the literal schema.

## Node Fields

Each `edges[].node` object contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/catalog/categories/7`) |
| `_id` | `Int` | Raw category ID |
| `name` | `String` | Category name resolved via `locale` |
| `slug` | `String` | URL slug |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `position` | `Int` | Display order position |
| `parentId` | `Int` | Parent category ID; `null` for root nodes |
| `description` | `String` | Category description, HTML, resolved via `locale` |
| `displayMode` | `String` | Category display mode (e.g. `products_and_description`) |
| `locale` | `String` | Locale used for name/slug/description resolution |
| `logoUrl` | `String` | Storage URL for the category logo; `null` if not set |
| `bannerUrl` | `String` | Storage URL for the category banner; `null` if not set |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |

## Sorting

Pass `sort` with the column name and `order` for direction. The compound form
`sort: "name-asc"` is also accepted (splits on `-`).

**Sortable columns:**

| `sort` value | Sorts by |
|---|---|
| `id` | Category ID (default) |
| `name` | Category name |
| `position` | Display order position |
| `status` | Enabled/disabled status |

## Cursor Pagination

- `first` controls the page size (default `10`, max `50`).
- To fetch the next page, pass the `pageInfo.endCursor` value as `after` in the
  next request.
- `totalCount` reflects the full count of matching categories across all pages.

## Fields That Stay Null on the Listing

`translations` and `filterableAttributeIds` are declared on the type but resolve only on the item query [`adminCategory(id:)`](/api/graphql-api/admin/catalog/categories/categories-detail). Selecting them here is not an error — you simply get `null`.

## Behaviour Worth Knowing

- **No implicit status filter.** Every status is returned so an admin can find a disabled category. Pass `status: 1` for enabled only.
- **`parent_id` returns direct children only**, not the whole subtree. For a full branch use [`adminCategoryTrees`](/api/graphql-api/admin/catalog/categories/categories-tree) with `rootId`.
- **Scalars are real types here.** `status`, `position`, `parentId`, and `_id` come back as `Int`, unlike the product listing, where the same concepts are strings. Timestamps are ISO 8601 with offset.
- **REST returns the same rows** through `GET /api/admin/catalog/categories`, with identical filter and sort semantics.
