---
outline: false
apiType: rest
examples:
  - id: admin-menu
    title: Get Admin Menu
    description: Returns the admin sidebar as a permission-filtered nested tree. The response below is trimmed to three top-level menus; a full-access token returns the whole sidebar.
    query: |
      curl -X GET "https://your-domain.com/api/admin/menu" \
        -H "Accept: application/json" \
        -H "Authorization: Bearer <id>|<token>"
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
      ]
---

# Get Admin Menu

| Endpoint | Method |
|----------|--------|
| `/api/admin/menu` | GET |

Returns the admin sidebar as a nested tree, filtered to what the authenticated token is allowed to see. Use it to build a back-office navigation dynamically and to discover which API endpoint backs each screen.

The response is a **one-element array**, not a bare object. The single element carries `id` (always the literal `menu`) and the navigation under `tree`.

## Node Shape

Every entry in `tree`, and in any nested `children`, carries the same seven keys:

| Field | Type | Description |
|-------|------|-------------|
| `key` | String | Unique node identifier, dot-delimited by depth (`sales.rma.requests`). |
| `label` | String | Menu title, translated into the request locale. |
| `icon` | String \| null | Icon class. Set on top-level menus only; `null` at every deeper level. |
| `sort` | Integer | Display order among siblings. |
| `permission` | String | ACL key controlling visibility of this node. |
| `apiResource` | Object \| null | `{ rest, graphql }` naming the operations that back this screen, or `null`. |
| `children` | Array | Nested nodes, `[]` when the node is a leaf. |

Four details a client will otherwise get wrong:

- **`sort` is not unique among siblings.** The sidebar ships duplicate values — under Communications both Events and Campaigns are `sort: 2`, and at the top level both Settings and Integration are `8`. Sort with a stable tiebreak (`key`) or the order flips between renders.
- **`permission` always equals `key`.** It is repeated for clarity, not because the two can diverge. Either one works as a lookup against [Get Admin Permissions](/api/rest-api/admin/navigation/permissions).
- **The tree is three levels deep at most** — `sales.rma.requests`, `marketing.promotions.catalog_rules`, `settings.taxes.tax_categories`. Recurse anyway; do not hard-code two levels.
- **`key` is the only safe loop key.** Labels are translated and `sort` repeats.

## The apiResource Field

| Field | Type | Description |
|-------|------|-------------|
| `rest` | String | Path of the REST listing endpoint backing this screen — callable as-is. |
| `graphql` | String | Name of the GraphQL listing operation backing the same screen. |

`apiResource` is resolved by matching the menu key against the admin API's own registered resources, so it stays correct as resources are added. It is `null` in two cases:

- **Group headers** with no listing of their own — `sales`, `catalog`, `marketing`, `settings`, `sales.rma`, `settings.taxes`.
- **Panel-only screens** with no API counterpart — `integration.tokens`, `integration.history`, `settings.push_notification`.

Being a parent does not by itself mean `null`: `customers` has children *and* an `apiResource`, and leaf nodes such as `cms` and `configuration` carry one too.

Only the **listing** endpoint is named. The detail, create, update, and delete endpoints for that screen are not in this payload — find them on that menu's own page.

## Permission Filtering

The tree is scoped to the token:

- A token whose permission type is `all` sees every node.
- A restricted token sees only the nodes it is granted; everything else is omitted entirely, not returned disabled.
- A parent stays visible when at least one of its children is visible, so a permitted leaf is never orphaned.

A token granted only `dashboard` receives a one-node tree. Two tokens on the same admin can therefore return different trees.

## Errors

A request without a valid token returns HTTP `401` with `{"message": "Unauthenticated.", "error": "unauthenticated"}`. Any valid token can call this endpoint — there is no separate permission gate on the menu itself, only the filtering above.
