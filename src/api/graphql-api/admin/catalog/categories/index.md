---
outline: false
---

# Categories

Categories are the storefront's browsing tree — the sections customers navigate and products are assigned to. The Categories menu lists them (flat or as a nested tree), shows a single category, and creates / edits / deletes / moves them. It mirrors the admin **Catalog → Categories** screen.

## Flat list vs. tree

Two read shapes for the same data:

- **List** (`adminCategories`) — a flat, cursor-paginated, filterable datagrid of categories. Each row carries the category's own fields plus its `parentId`.
- **Tree** (`adminCategoryTrees`) — the full nested hierarchy, each node carrying its `children` recursively. Use this to render the category tree in one call.

## Hierarchy, status, display

- **`parentId`** places a category under its parent. The root category (`id = 1`) and any channel's root category are structural and **cannot be deleted**.
- **Moving** a category is just an update with a new `parentId` (and `position`) — there is no separate "move" operation.
- **`status`** (1 enabled / 0 disabled) and **`position`** (sort order among siblings).
- **`displayMode`** — what the category page shows: `products_and_description`, `products_only`, or `description_only`.

## Nested data is returned whole

On the single-category query, `translations` and `filterableAttributeIds` are returned as **whole JSON** — query each as a bare field (`translations`, not `translations { … }`); the entire array comes back, and it resolves over GraphQL. The tree's `children` are likewise whole JSON nodes. The listing leaves `translations` / `filterableAttributeIds` out (detail-only).

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List categories](/api/graphql-api/admin/catalog/categories/categories-listing) | `adminCategories` query |
| [Category tree](/api/graphql-api/admin/catalog/categories/categories-tree) | `adminCategoryTrees` query |
| [Category detail](/api/graphql-api/admin/catalog/categories/categories-detail) | `adminCategory(id:)` query |
| [Create category](/api/graphql-api/admin/catalog/categories/categories-create) | `createAdminCategory` mutation |
| [Update / move category](/api/graphql-api/admin/catalog/categories/categories-update) | `updateAdminCategory` mutation |
| [Delete category](/api/graphql-api/admin/catalog/categories/categories-delete) | `deleteAdminCategory` mutation |
| [Mass delete](/api/graphql-api/admin/catalog/categories/categories-mass-delete) | `createAdminCategoryMassDelete` mutation |
| [Mass update status](/api/graphql-api/admin/catalog/categories/categories-mass-update-status) | `createAdminCategoryMassUpdateStatus` mutation |

All Categories operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication). Reads require `catalog.categories.view`; writes require the matching `catalog.categories.create` / `.edit` / `.delete` permission.
