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
                  "id": "/api/admin/admin_categories/7",
                  "_id": 7,
                  "name": "Apparel",
                  "slug": "apparel",
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

::: tip Distinct from the tree query
`adminCatalogCategories` (this query) returns a **flat, cursor-paginated list**
— ideal for datagrid/table views.

`adminCatalogCategoryTrees` returns the **nested hierarchy** — ideal for
tree-picker UIs.
:::

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCatalogCategories` | Query | Cursor (`first` / `after`) |

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of items per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `category_id` | `String` | Filter by category ID — single integer or comma-separated list (e.g. `"12"` or `"12,18"`) | `"7"` |
| `name` | `String` | Partial category name match (SQL `LIKE %value%`) | `"Apparel"` |
| `position` | `Int` | Exact position filter | `1` |
| `status` | `Int` | Filter by status: `0` = disabled, `1` = enabled | `1` |
| `parent_id` | `Int` | Filter by parent category ID | `1` |
| `locale` | `String` | Locale code for translation resolution (default: app locale) | `"en"` |
| `sort` | `String` | Column to sort by (see Sorting section below) | `"id"` |
| `order` | `String` | Sort direction: `"asc"` or `"desc"` (default `"desc"`) | `"desc"` |

::: tip extraArgs convention
API Platform does not automatically expose filter arguments in the GraphQL schema
for `QueryCollection` operations. This query uses `extraArgs` declared on the
`QueryCollection` operation to surface all filter/sort arguments as first-class
GraphQL arguments. Pass them directly alongside `first` and `after`.
:::

## Node Fields

Each `edges[].node` object contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/admin_categories/7`) |
| `_id` | `Int` | Raw category ID |
| `name` | `String` | Category name resolved via `locale` |
| `slug` | `String` | URL slug |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `position` | `Int` | Display order position |
| `parentId` | `Int` | Parent category ID; `null` for root nodes |
| `displayMode` | `String` | Category display mode (e.g. `products_and_description`) |
| `locale` | `String` | Locale used for name/slug/description resolution |
| `logoUrl` | `String` | Storage URL for the category logo; `null` if not set |
| `bannerUrl` | `String` | Storage URL for the category banner; `null` if not set |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |

## Example Query

```graphql
query AdminCatalogCategories(
  $first: Int
  $after: String
  $name: String
  $status: Int
  $locale: String
) {
  adminCatalogCategories(
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
```

```json
{
  "first": 10,
  "name": "Apparel",
  "status": 1,
  "locale": "en"
}
```

## Example Response

```json
{
  "data": {
    "adminCatalogCategories": {
      "edges": [
        {
          "cursor": "MA==",
          "node": {
            "id": "/api/admin/admin_categories/7",
            "_id": 7,
            "name": "Apparel",
            "slug": "apparel",
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
```

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

## Notes

- **`translations` and `filterableAttributeIds` are not available** in this query — they are only returned by the item query `adminCatalogCategory(id: ID!)`. Use the item query when you need per-locale metadata for a specific category.
- **Same provider as the REST endpoint** — `AdminCategoryCollectionProvider` serves both transports with identical filter and sort semantics.
- **No automatic status filter** — this query returns all statuses by default. Pass `status: 1` to restrict to enabled categories.
- **`parent_id` filter** returns only direct children of the specified parent. For the full subtree use `adminCatalogCategoryTrees` with `rootId`.
