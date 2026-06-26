---
outline: false
apiType: rest
examples:
  - id: admin-menu
    title: Get Admin Menu
    description: Returns the admin sidebar as a permission-filtered nested tree for the authenticated token.
    query: |
      curl -X GET "https://your-domain.com/api/admin/menu" \
        -H "Authorization: Bearer <token>"
    response: |
      [
        {
          "id": "menu",
          "tree": [
            {
              "key": "dashboard",
              "label": "Dashboard",
              "icon": "icon-dashboard",
              "sort": 1,
              "permission": "dashboard",
              "apiResource": { "rest": "/api/admin/dashboard/stats", "graphql": "statsAdminDashboard" },
              "children": []
            },
            {
              "key": "sales",
              "label": "Sales",
              "icon": "icon-sales",
              "sort": 2,
              "permission": "sales",
              "apiResource": null,
              "children": [
                {
                  "key": "sales.orders",
                  "label": "Orders",
                  "icon": null,
                  "sort": 1,
                  "permission": "sales.orders",
                  "apiResource": { "rest": "/api/admin/orders", "graphql": "adminOrders" },
                  "children": []
                },
                {
                  "key": "sales.shipments",
                  "label": "Shipments",
                  "icon": null,
                  "sort": 2,
                  "permission": "sales.shipments",
                  "apiResource": { "rest": "/api/admin/shipments", "graphql": "adminShipments" },
                  "children": []
                }
              ]
            },
            {
              "key": "catalog",
              "label": "Catalog",
              "icon": "icon-catalog",
              "sort": 3,
              "permission": "catalog",
              "apiResource": null,
              "children": [
                {
                  "key": "catalog.products",
                  "label": "Products",
                  "icon": null,
                  "sort": 1,
                  "permission": "catalog.products",
                  "apiResource": { "rest": "/api/admin/catalog/products", "graphql": "adminCatalogProducts" },
                  "children": []
                }
              ]
            }
          ]
        }
      ]
---

# Get Admin Menu

| Endpoint | Method |
|----------|--------|
| `/api/admin/menu` | GET |

Returns the admin sidebar as a nested tree, filtered to what the authenticated token's role is allowed to see. Use it to build a back-office navigation/sidebar dynamically and to discover which API endpoint backs each screen.

The response is a one-element array. The single element wraps the navigation under `tree` — a nested array of menu nodes.

## Permission Filtering

The tree is scoped to the token's role:

- A token whose permission type is `all` sees every menu node.
- A token with custom permissions sees only the nodes its role permits; menus it cannot access are omitted entirely.

So two admins with different roles will receive different trees from the same endpoint.

## Response Fields

Each node in `tree` (and in any nested `children`) has the shape:

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Unique node identifier (e.g. `sales.orders`). |
| `label` | string | Human-readable menu title. |
| `icon` | string \| null | Icon class for top-level menus; `null` for sub-items. |
| `sort` | integer | Display order among its siblings. |
| `permission` | string | ACL key controlling visibility of this node. |
| `apiResource` | object \| null | Maps the menu entry to its API endpoint, or `null`. |
| `children` | array | Nested child nodes (empty array when there are none). |

When present, `apiResource` carries:

| Field | Type | Description |
|-------|------|-------------|
| `rest` | string | The REST endpoint backing this screen. |
| `graphql` | string | The GraphQL operation backing this screen. |

`apiResource` is `null` for group headers (parent menus that only contain children, such as `Sales` or `Catalog`) and for panel-only screens that have no API counterpart (such as Integration).

## Errors

A request without a valid token returns `401 Unauthorized`.

All admin endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
