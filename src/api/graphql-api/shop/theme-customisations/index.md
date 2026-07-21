---
outline: false
---

# Theme Customisations

The Theme Customisations menu exposes the configurable storefront content blocks the store owner has set up — image carousels, static content snippets, product carousels, footer link sets, and similar. A client uses it to render the same homepage / landing content the store has configured, without hard-coding it.

## When you use it

Fetch the list to discover every active content block for the current channel and locale, then render each block according to its `type`. The single query returns one block's details by id.

## How to render the home page

1. **Fetch** the `themeCustomizations` list (optionally filtered by `type`). Keep only blocks with `status = 1`.
2. **Order** the blocks by `sortOrder` — that is the top-to-bottom layout order.
3. For each block, **`JSON.parse(translation.options)`** and render by `type`:

| Type | How to render | Needs a second call? |
|------|---------------|----------------------|
| `image_carousel` | Render `options.images[]` as slides — `image` = source, `link` = href, `title` = alt. | No — self-contained |
| `static_content` | Inject `options.html` and `options.css` directly (`<img>` uses `data-src`). | No — self-contained |
| `footer_links` | Render `options.column_N[]` as footer link columns. | No — self-contained |
| `services_content` | Render `options.services[]` (`service_icon` / `title` / `description`). | No — self-contained |
| `product_carousel` | Pass `options.filters` to the [`products`](/api/graphql-api/shop/queries/get-products) query (as its `filter`), render the products under `options.title`. | **Yes → products** |
| `category_carousel` | Call [`treeCategories(parentId: options.filters.parent_id)`](/api/graphql-api/shop/queries/tree-categories), render the categories under `options.title`. | **Yes → treeCategories** |

> **Key point:** `image_carousel`, `static_content`, `footer_links` and `services_content` are self-contained — render straight from `options`. `product_carousel` and `category_carousel` are only *configuration*: their `options.filters` tell you what to query from the `products` / `treeCategories` fields — the block itself carries no products or categories.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Theme Customisations](/api/graphql-api/shop/queries/theme-customisations) | `themeCustomizations` query |
| [Single Theme Customisation](/api/graphql-api/shop/queries/single-theme-customisation) | `themeCustomization(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
