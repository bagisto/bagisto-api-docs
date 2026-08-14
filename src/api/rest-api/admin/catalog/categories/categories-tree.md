---
outline: false
apiType: rest
examples:
  - id: admin-catalog-categories-tree
    title: Category Tree (Nested)
    description: Full nested category tree. Returns a JSON array of root nodes, each carrying its full subtree under `children`. Supports optional locale, status, and rootId filters.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/categories/tree?locale=en&status=1" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      locale=en&status=1
    response: |
      {
        "data": [
          {
            "id": 1,
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
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 50,
          "lastPage": 1,
          "total": 1,
          "from": 1,
          "to": 1
        }
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Categories — Tree (Nested)

Returns the full nested category hierarchy for the admin **Catalog → Categories**
tree view. Each node carries the same scalar fields as the flat listing plus a
`children` array containing its full subtree. Leaf nodes have `children: []`.

This endpoint returns the **nested hierarchy**, which is what a tree picker or navigation menu needs. For a flat, filterable, sortable list use [`GET /api/admin/catalog/categories`](/api/rest-api/admin/catalog/categories/categories-listing) instead.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/categories/tree` | GET | Admin Bearer token |

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `locale` | string | Locale code for name/slug resolution (default: app locale) | `en` |
| `status` | integer | Filter by status: `0` = disabled, `1` = enabled. Ancestor nodes are preserved even when they are disabled, so children of the matching status remain reachable. | `1` |
| `rootId` | integer | Limit the tree to descendants of this category ID (inclusive). Returns an empty array if the ID is unknown. | `1` |

## Response Shape

The response uses the standard admin `{ data, meta }` envelope. The `data` array
contains root-level category nodes. Each node has the same scalar fields and a
`children` array with its subtree.

### Node fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `name` | string\|null | Category name resolved via `locale` |
| `slug` | string\|null | URL slug |
| `status` | integer | `1` = enabled, `0` = disabled |
| `position` | integer | Display order position |
| `parentId` | integer\|null | Parent category ID; `null` for root nodes |
| `displayMode` | string\|null | Category display mode (e.g. `products_and_description`) |
| `children` | array | Nested child nodes (recursive); `[]` for leaf nodes |

### `meta` object

The `meta` object counts **root nodes**, not individual categories. It uses
`perPage: 50` by default and `total: N` where N is the number of top-level nodes
after filtering.

## Filtering with `rootId`

Pass `?rootId=<id>` to return only the subtree rooted at that category ID
(the node itself plus all descendants):

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/categories/tree?rootId=2&locale=en" \
  -H "Authorization: Bearer <token>"
```

If the `rootId` does not exist in the database, the response is `{ "data": [], "meta": { ... "total": 0 } }`.

## Errors

| HTTP | Detail |
|------|--------|
| `401` | `Unauthenticated.` |

An unknown `?rootId` is not an error — it returns `data: []` with `total: 0`.

## Behaviour Worth Knowing

- **Everything arrives inline.** `children` is a plain nested array, not an IRI reference, so one call returns the whole tree with no follow-up requests.
- **Pagination counts root nodes, not categories.** Each matched root always arrives with its complete subtree, so a store with a single root reports `total: 1` however many categories sit beneath it. Scope a large catalog with `?rootId=<id>` rather than by paging.
- **`status` filtering keeps ancestors.** With `?status=1`, a disabled parent still appears when any descendant is enabled, so the branch stays reachable; non-matching leaves are pruned.
- **Nodes are slim by design** — `id`, `name`, `slug`, `status`, `position`, `parentId`, `displayMode`, and `children`. There is no `locale`, and no translations or filterable attribute ids; names and slugs are already resolved for the requested locale. Use [the detail endpoint](/api/rest-api/admin/catalog/categories/categories-detail) when you need per-locale metadata.
- **`id` is the numeric category id at every level**, unlike the GraphQL tree, whose top-level nodes expose an IRI in `id` and the number in `_id`.
