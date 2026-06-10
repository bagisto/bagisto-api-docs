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

::: tip Distinct from the flat listing
`GET /api/admin/catalog/categories/tree` (this endpoint) returns the **nested
hierarchy** — ideal for tree-picker UIs and category navigation menus.

`GET /api/admin/catalog/categories` returns a **flat, paginated list** — ideal
for datagrid/table views with filtering and sorting.
:::

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/categories/tree` | GET | Admin Bearer token |

## Authentication

Every request requires:

```
Authorization: Bearer <token>
```

Obtain the Bearer token via [Authentication](/api/rest-api/admin/authentication).

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

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/categories/tree?locale=en&status=1" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response

```json
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
```

## Filtering with `rootId`

Pass `?rootId=<id>` to return only the subtree rooted at that category ID
(the node itself plus all descendants):

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/categories/tree?rootId=2&locale=en" \
  -H "Authorization: Bearer <token>"
```

If the `rootId` does not exist in the database, the response is `{ "data": [], "meta": { ... "total": 0 } }`.

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Missing or invalid admin Bearer token |

## Notes

- **`children` is a plain JSON array**, not an IRI reference. You can traverse it directly without follow-up requests.
- **`status` filtering preserves ancestor nodes.** When `?status=1` is applied, a disabled parent node still appears if it has at least one enabled descendant, so the tree remains navigable. Leaf nodes that do not match the status are pruned.
- **No pagination across the tree levels.** The tree endpoint is not paginated per level — the full subtree of every matched root node is returned in one response. For very large catalogs use `?rootId=<id>` to scope the response.
- **URL conflict prevention.** The route `/api/admin/catalog/categories/tree` is registered with `requirements: ['id' => '\d+']` on the detail route so that the string `tree` does not match the `{id}` path segment of `GET /api/admin/catalog/categories/{id}`.
- **Slim node shape.** Tree nodes carry 7 scalar fields (id, name, slug, status, position, parentId, displayMode) plus `children`. Full translations and filterable attribute IDs are not included — fetch the detail endpoint for a single category when those are needed.
