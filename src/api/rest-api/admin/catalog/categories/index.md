---
outline: false
apiType: rest
---

# Categories

Categories are the storefront's browsing tree — the sections customers navigate and products are assigned to. The Categories menu lists them (flat or as a nested tree), shows a single category, and creates / edits / deletes / moves them. It mirrors the admin **Catalog → Categories** screen.

## Flat list vs. tree

Two read shapes for the same data:

- **List** (`GET /api/admin/catalog/categories`) — a flat, paginated, filterable datagrid of categories. Each row carries the category's own fields plus its `parentId`.
- **Tree** (`GET /api/admin/catalog/categories/tree`) — the full nested hierarchy, each node carrying its `children` recursively. Use this to render the category tree in one call.

## Hierarchy, status, display

- **`parentId`** places a category under its parent. The root category (`id = 1`) and any channel's root category are structural and **cannot be deleted**.
- **Moving** a category is just an update with a new `parentId` (and `position`) — there is no separate "move" endpoint.
- **`status`** (1 enabled / 0 disabled) and **`position`** (sort order among siblings).
- **`displayMode`** — what the category page shows: `products_and_description`, `products_only`, or `description_only`.
- **`translations`** hold the per-locale `slug`, `name`, `description`, and meta fields. **`filterableAttributeIds`** are the attributes used for this category's layered-navigation filters.

The single-category endpoint embeds the full `translations` and `filterableAttributeIds` inline; the listing leaves those two out (they're detail-only).

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List categories](/api/rest-api/admin/catalog/categories/categories-listing) | `GET /api/admin/catalog/categories` |
| [Category tree](/api/rest-api/admin/catalog/categories/categories-tree) | `GET /api/admin/catalog/categories/tree` |
| [Category detail](/api/rest-api/admin/catalog/categories/categories-detail) | `GET /api/admin/catalog/categories/{id}` |
| [Create category](/api/rest-api/admin/catalog/categories/categories-create) | `POST /api/admin/catalog/categories` |
| [Update / move category](/api/rest-api/admin/catalog/categories/categories-update) | `PUT /api/admin/catalog/categories/{id}` |
| [Delete category](/api/rest-api/admin/catalog/categories/categories-delete) | `DELETE /api/admin/catalog/categories/{id}` |
| [Mass delete](/api/rest-api/admin/catalog/categories/categories-mass-delete) | `POST /api/admin/catalog/categories/mass-delete` |
| [Mass update status](/api/rest-api/admin/catalog/categories/categories-mass-update-status) | `POST /api/admin/catalog/categories/mass-update-status` |

All Categories endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication). Reads require `catalog.categories.view`; writes require the matching `catalog.categories.create` / `.edit` / `.delete` permission.
