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
        adminCategoryTrees(
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
          "adminCategoryTrees": {
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

This query returns the **nested hierarchy**, which is what a tree picker or navigation menu needs. For a flat, filterable, sortable list use [`adminCategories`](/api/graphql-api/admin/catalog/categories/categories-listing) instead.

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCategoryTrees` | Query | Cursor (`first` / `after`) |

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of root nodes per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `locale` | `String` | Locale code for name/slug resolution (default: app locale) | `"en"` |
| `status` | `Int` | Filter by status: `0` = disabled, `1` = enabled. Ancestor nodes are preserved when they have qualifying descendants. | `1` |
| `rootId` | `Int` | Limit the tree to descendants of this category ID (inclusive). Returns empty if the ID is unknown. | `1` |

Every filter is a first-class GraphQL argument — pass `locale`, `status`, and `rootId` alongside `first` and `after`, not inside a nested filter object.

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

### The children Structure

`children` is a **plain JSON scalar**, not a connection — select it bare, then walk it as an ordinary nested array with no `edges`/`node` wrappers.

Each element repeats the same shape recursively — `id`, `name`, `slug`, `status`, `position`, `parentId`, `displayMode`, `children` — down to leaves, which carry `children: []`.

One difference will catch you: **a nested child identifies itself with `id` holding the numeric id**, while the top-level connection node uses `id` for the IRI and `_id` for the number. So `node.id` is `/api/admin/admin_category_trees/1` but `node.children[0].id` is `2`. Read `_id` at the top level and `id` inside `children`.

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

## Behaviour Worth Knowing

- **Pagination counts root nodes, not categories.** `first` and `after` page through top-level nodes only, and each one always arrives with its complete subtree. A store with a single root therefore reports `totalCount: 1` no matter how many categories exist beneath it — do not read it as a category count.
- **`status` filtering keeps ancestors.** With `status: 1`, a disabled parent still appears when any descendant is enabled, so the branch stays reachable.
- **The node IRI is routeless.** `id` resolves to `/api/admin/admin_category_trees/<id>`, which is not a queryable path. Use `_id`, and fetch a category with [`adminCategory(id:)`](/api/graphql-api/admin/catalog/categories/categories-detail) using `/api/admin/catalog/categories/<_id>`.
- **Tree nodes carry no `locale`, `translations`, or `filterableAttributeIds`.** Names and slugs are already resolved for the requested locale; for per-locale metadata use the item query.
- **REST returns the same tree** through `GET /api/admin/catalog/categories/tree`, with identical filter semantics.
