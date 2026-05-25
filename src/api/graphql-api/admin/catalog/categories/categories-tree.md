---
outline: false
examples:
  - id: admin-catalog-categories-tree
    title: Category Tree (Nested)
    description: Cursor-paginated GraphQL query that returns root category nodes, each carrying its full nested subtree under `children`. Supports locale, status, and rootId filters.
    query: |
      query AdminCatalogCategoryTrees(
        $first: Int
        $after: String
        $locale: String
        $status: Int
        $rootId: Int
      ) {
        adminCatalogCategoryTrees(
          first: $first
          after: $after
          locale: $locale
          status: $status
          rootId: $rootId
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
              children
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
        "locale": "en",
        "status": 1
      }
    response: |
      {
        "data": {
          "adminCatalogCategoryTrees": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/admin_category_trees/1",
                  "_id": 1,
                  "name": "Root Category",
                  "slug": "root",
                  "status": 1,
                  "position": 0,
                  "parentId": null,
                  "displayMode": null,
                  "children": [
                    {
                      "id": 2,
                      "name": "Apparel",
                      "slug": "apparel",
                      "status": 1,
                      "position": 1,
                      "parentId": 1,
                      "displayMode": null,
                      "children": []
                    },
                    {
                      "id": 5,
                      "name": "Electronics",
                      "slug": "electronics",
                      "status": 1,
                      "position": 2,
                      "parentId": 1,
                      "displayMode": null,
                      "children": []
                    }
                  ]
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

# Catalog Categories — Tree (Nested) (GraphQL)

Cursor-paginated GraphQL query that returns the full nested category hierarchy.
Each edge node represents a root-level category and carries its complete subtree
under `children`. Leaf nodes have `children: []`.

::: tip Distinct from the flat listing query
`adminCatalogCategoryTrees` (this query) returns the **nested hierarchy** —
ideal for tree-picker UIs and navigation menus.

`adminCatalogCategories` returns a **flat, cursor-paginated list** — ideal for
datagrid/table views with filtering and sorting.
:::

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCatalogCategoryTrees` | Query | Cursor (`first` / `after`) |

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
| `first` | `Int` | Number of root nodes per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `locale` | `String` | Locale code for name/slug resolution (default: app locale) | `"en"` |
| `status` | `Int` | Filter by status: `0` = disabled, `1` = enabled. Ancestor nodes are preserved when they have qualifying descendants. | `1` |
| `rootId` | `Int` | Limit the tree to descendants of this category ID (inclusive). Returns empty if the ID is unknown. | `1` |

::: tip extraArgs convention
API Platform does not automatically expose filter arguments in the GraphQL schema
for `QueryCollection` operations. This query uses `extraArgs` to surface `locale`,
`status`, and `rootId` as first-class GraphQL arguments alongside `first` and `after`.
:::

## Node Fields

Each `edges[].node` object represents a root-level category and contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/admin_category_trees/1`) |
| `_id` | `Int` | Raw category ID |
| `name` | `String` | Category name resolved via `locale` |
| `slug` | `String` | URL slug |
| `status` | `Int` | `1` = enabled, `0` = disabled |
| `position` | `Int` | Display order position |
| `parentId` | `Int` | Parent category ID; `null` for root nodes |
| `displayMode` | `String` | Category display mode |
| `children` | scalar (JSON array) | Nested child nodes (recursive plain objects); `[]` for leaf nodes |

### `children` structure

`children` is returned as a **plain JSON array** (not a GraphQL connection type).
Each element in the array has the same scalar shape as the parent node: `id`,
`name`, `slug`, `status`, `position`, `parentId`, `displayMode`, and `children`.
This recursive structure continues down to leaf nodes which have `children: []`.

## Example Query

```graphql
query AdminCatalogCategoryTrees(
  $first: Int
  $after: String
  $locale: String
  $status: Int
  $rootId: Int
) {
  adminCatalogCategoryTrees(
    first: $first
    after: $after
    locale: $locale
    status: $status
    rootId: $rootId
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
        children
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
  "locale": "en",
  "status": 1
}
```

## Example Response

```json
{
  "data": {
    "adminCatalogCategoryTrees": {
      "edges": [
        {
          "cursor": "MA==",
          "node": {
            "id": "/api/admin/admin_category_trees/1",
            "_id": 1,
            "name": "Root Category",
            "slug": "root",
            "status": 1,
            "position": 0,
            "parentId": null,
            "displayMode": null,
            "children": [
              {
                "id": 2,
                "name": "Apparel",
                "slug": "apparel",
                "status": 1,
                "position": 1,
                "parentId": 1,
                "displayMode": null,
                "children": []
              },
              {
                "id": 5,
                "name": "Electronics",
                "slug": "electronics",
                "status": 1,
                "position": 2,
                "parentId": 1,
                "displayMode": null,
                "children": []
              }
            ]
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

## Filtering by Root

To get the subtree rooted at a specific category, pass `rootId`:

```json
{
  "first": 10,
  "rootId": 2,
  "locale": "en"
}
```

If the `rootId` does not exist in the database, `totalCount` will be `0` and
`edges` will be empty.

## Notes

- **`children` is a plain JSON array**, not a GraphQL connection. You traverse it as a standard JSON array without `edges`/`node` wrappers. This is intentional — nested DTOs would cause API Platform to serialize them as IRI strings instead of inline objects.
- **`status` filtering preserves ancestor nodes.** When `status: 1` is applied, a disabled parent still appears if it has at least one enabled descendant, so the tree remains navigable.
- **Cursor pagination operates on root nodes.** The `first`/`after` arguments page through the top-level nodes; each root node's full subtree is always returned in the same response.
- **Same provider as the REST tree endpoint** — `AdminCategoryTreeProvider` serves both transports, so filter semantics are identical between `adminCatalogCategoryTrees` and `GET /api/admin/catalog/categories/tree`.
- **`translations` and `filterableAttributeIds` are not included** in tree nodes. Use the item query `adminCatalogCategory(id: ID!)` when you need the full detail for a specific category.
