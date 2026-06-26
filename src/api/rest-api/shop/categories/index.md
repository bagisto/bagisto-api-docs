---
outline: false
apiType: rest
---

# Categories

The Categories menu exposes the store's catalog category structure — the browsable departments and sub-departments a shopper navigates. You can read categories as a flat list (with optional filtering) or as a nested tree that mirrors the storefront's category navigation.

## Flat list vs. tree

- The **flat list** returns categories as individual rows. Use it when you want to fetch, filter or page through categories without their hierarchy.
- The **tree** returns categories nested under their parents in one response. Use it to render a navigation menu or a category sidebar without stitching the hierarchy together yourself.

Only storefront-visible (enabled) categories are returned. Pass a `locale` to receive category names and content in that language.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Categories](/api/rest-api/shop/categories/get-categories) | `GET /api/shop/categories` | Flat list of storefront categories. |
| [Category Tree](/api/rest-api/shop/categories/get-category-tree) | `GET /api/shop/category-trees` | Nested category tree for navigation. |

All Category endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
