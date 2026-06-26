---
outline: false
apiType: rest
---

# Dashboard

The Dashboard menu returns the aggregate figures that power the Bagisto admin **Dashboard** screen — sales, orders, customers, visitors, stock alerts, top products and top customers. It mirrors the admin **Dashboard** landing page.

## The dashboard is **seven** separate calls

This is the most important thing to understand about this menu.

The Dashboard you see in the panel is **not one response**. The page is assembled from **seven independent requests**, one per section, each selected with the `?type=` query parameter. A single call returns **one section** of the dashboard. To render the whole screen, call the endpoint once per `type` (or only for the sections you need).

The `statistics` payload **changes shape per `type`** — sometimes an object, sometimes a flat array — so always branch on `type` when consuming it.

| Dashboard section (admin panel) | `type` | `statistics` is |
|---|---|---|
| **Overall Details** cards | `over-all` (default) | object |
| **Today's Details** + today's order list | `today` | object |
| **Stock Threshold** product list | `stock-threshold-products` | array |
| **Store Stats** sales chart | `total-sales` | object (with `over_time` series) |
| **Visitors** chart | `total-visitors` | object (with `over_time` series) |
| **Top Selling Products** list | `top-selling-products` | array |
| **Customer With Most Sales** list | `top-customers` | array |

## Date window

`start` / `end` (both `YYYY-MM-DD`) bound the figures and drive the `previous` baseline behind every `progress` percentage — the previous period is the same-length window immediately before `start`. `start` defaults to **30 days ago**, `end` to **today**. `channel` (a channel **code**) scopes the figures to a single storefront channel.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [Dashboard statistics](/api/rest-api/admin/dashboard/stats) | `GET /api/admin/dashboard/stats` |

The Dashboard is read-only — there are no write actions, mass-actions or exports on this menu. For deeper, dedicated sales / customer / product reports, see [Reporting](/api/rest-api/admin/reporting/).

All Dashboard endpoints require only an admin Bearer token (no permission gate) — see [Authentication](/api/rest-api/admin/authentication).
