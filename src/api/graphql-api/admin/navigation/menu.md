---
outline: false
examples:
  - id: admin-menu-gql
    title: Get Admin Menu
    query: |
      query {
        getAdminMenu {
          id
          tree
        }
      }
    response: |
      {
        "data": {
          "getAdminMenu": {
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
        }
      }
---

# Get Admin Menu (GraphQL)

Returns the admin sidebar as a nested tree, filtered to what the authenticated token's role is allowed to see. Use it to build a back-office navigation/sidebar dynamically and to discover which API operation backs each screen.

## Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Identifier of the menu payload (`menu`). |
| `tree` | JSON | The nested menu structure. |

`tree` is returned as a JSON structure — query it as a bare field, not a sub-selection.

Each node in `tree` (and in any nested `children`) carries `key`, `label`, `icon`, `sort`, `permission`, `apiResource`, and `children`. When present, `apiResource` maps the node to its backing endpoint as `{ rest, graphql }`; it is `null` for group headers (parent menus that only contain children) and for panel-only screens that have no API counterpart.

## Permission Filtering

The tree is scoped to the token's role:

- A token whose permission type is `all` sees every menu node.
- A token with custom permissions sees only the nodes its role permits; menus it cannot access are omitted entirely.

So two admins with different roles will receive different trees from the same operation.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
