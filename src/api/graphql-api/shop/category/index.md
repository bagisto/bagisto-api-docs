---
outline: false
---

# Category

The Category menu exposes the storefront's category structure — both as a flat list and as a nested tree — so a client can build navigation menus, category landing pages, and breadcrumb trails.

## Flat list vs. tree

- The **tree** query returns categories nested under their parents, which is what you want for a navigation menu or a category sidebar.
- The **categories** query returns a flat, paginated list — useful when you just need to page through every category.
- The **single category** query returns one category's full details by id.

Only active, storefront-visible categories are returned.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Tree Categories](/api/graphql-api/shop/queries/tree-categories) | `categoryTree` query |
| [Categories](/api/graphql-api/shop/queries/categories) | `categories` query |
| [Single Category](/api/graphql-api/shop/queries/get-category) | `category(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
