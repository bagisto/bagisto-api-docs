---
outline: false
examples:
  - id: admin-menu-gql
    title: Get Admin Menu
    description: Returns the admin sidebar as a permission-filtered nested tree. The response below is trimmed to three top-level menus; a full-access token returns the whole sidebar.
    query: |
      query {
        getAdminMenu {
          id
          _id
          tree
        }
      }
    response: |
      {
        "data": {
          "getAdminMenu": {
            "id": "/api/admin/admin_menus/menu",
            "_id": "menu",
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
                    "key": "sales.rma",
                    "label": "RMA",
                    "icon": null,
                    "sort": 7,
                    "permission": "sales.rma",
                    "apiResource": null,
                    "children": [
                      {
                        "key": "sales.rma.requests",
                        "label": "Requests",
                        "icon": null,
                        "sort": 1,
                        "permission": "sales.rma.requests",
                        "apiResource": { "rest": "/api/admin/rma/requests", "graphql": "adminReturns" },
                        "children": []
                      }
                    ]
                  }
                ]
              },
              {
                "key": "catalog",
                "label": "Catalog",
                "icon": "icon-product",
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

# Get Admin Menu

Returns the admin sidebar as a nested tree, filtered to what the authenticated token is allowed to see. Use it to build a back-office navigation dynamically and to discover which API operation backs each screen.

## Output Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | ID! | Resource identifier in IRI form, `/api/admin/admin_menus/menu`. |
| `_id` | String | The bare identifier, always the literal `menu`. |
| `tree` | Iterable | The nested menu structure. |

`tree` is a JSON scalar — select it as a **bare field**. It has no sub-selection, so `tree { key label }` is a schema error.

## Node Shape

Every entry in `tree`, and in any nested `children`, carries the same seven keys:

| Key | Type | Description |
|-----|------|-------------|
| `key` | String | Unique node identifier, dot-delimited by depth (`sales.rma.requests`). |
| `label` | String | Menu title, translated into the request locale. |
| `icon` | String \| null | Icon class. Set on top-level menus only; `null` at every deeper level. |
| `sort` | Integer | Display order among siblings. |
| `permission` | String | ACL key controlling visibility of this node. |
| `apiResource` | Object \| null | `{ rest, graphql }` naming the operations that back this screen, or `null`. |
| `children` | Array | Nested nodes, `[]` when the node is a leaf. |

Four details a client will otherwise get wrong:

- **`sort` is not unique among siblings.** The sidebar ships duplicate values — under Communications both Events and Campaigns are `sort: 2`, and at the top level both Settings and Integration are `8`. Sort with a stable tiebreak (`key`) or the order flips between renders.
- **`permission` always equals `key`.** It is repeated for clarity, not because the two can diverge. Either one works as a lookup against [Get Admin Permissions](/api/graphql-api/admin/navigation/permissions).
- **The tree is three levels deep at most** — `sales.rma.requests`, `marketing.promotions.catalog_rules`, `settings.taxes.tax_categories`. Recurse anyway; do not hard-code two levels.
- **`key` is the only safe React/loop key.** Labels are translated and `sort` repeats.

## The apiResource Field

`apiResource` is resolved by matching the menu key against the admin API's own registered resources, so it stays correct as resources are added. It is `null` in two cases:

- **Group headers** with no listing of their own — `sales`, `catalog`, `marketing`, `settings`, `sales.rma`, `settings.taxes`.
- **Panel-only screens** with no API counterpart — `integration.tokens`, `integration.history`, `settings.push_notification`.

Being a parent does not by itself mean `null`: `customers` has children *and* an `apiResource`, and leaf nodes such as `cms` and `configuration` carry one too.

`rest` is a path you can call directly. `graphql` is the **listing** operation name for that screen — the detail, create, update, and delete operations are not named here; find them on that menu's own page.

## Permission Filtering

The tree is scoped to the token:

- A token whose permission type is `all` sees every node.
- A restricted token sees only the nodes it is granted; everything else is omitted entirely, not returned disabled.
- A parent stays visible when at least one of its children is visible, so a permitted leaf is never orphaned.

A token granted only `dashboard` receives a one-node tree. Two tokens on the same admin can therefore return different trees.

## Errors

A request without a valid token is rejected by the transport with HTTP `401` before the GraphQL layer runs. Any valid token can read this query — there is no separate permission gate on the menu itself, only the filtering above.
