---
outline: false
apiType: rest
---

# Theme Customizations

The Theme Customizations menu returns the content blocks an admin has configured for the storefront — image carousels, static-content sections, product/category carousels, footer link sets and similar homepage pieces. Use it to render the storefront's home and content areas from your own front end instead of hard-coding them.

## When a client uses this

Fetch the theme customizations for the current channel when building the homepage or any themed landing area. Each block carries its type and its per-locale content, so a client can lay out the same sections the storefront theme shows, in the shopper's language.

## How to render the home page

1. **Fetch** `GET /api/shop/theme-customizations` (optionally `?channelId=` / `?type=`). Keep only blocks with `status = 1`.
2. **Order** the blocks by `sortOrder` — that is the top-to-bottom layout order.
3. For each block, **`JSON.parse(translation.options)`** and render by `type`:

| Type | How to render | Needs a second call? |
|------|---------------|----------------------|
| `image_carousel` | Render `options.images[]` as slides — `image` = source, `link` = href, `title` = alt. | No — self-contained |
| `static_content` | Inject `options.html` and `options.css` directly. | No — self-contained |
| `footer_links` | Render `options.column_N[]` as footer link columns. | No — self-contained |
| `services_content` | Render `options.services[]` (`service_icon` / `title` / `description`). | No — self-contained |
| `product_carousel` | Send `options.filters` as query params to `GET /api/shop/products`, render the returned products under `options.title`. | **Yes → [Products](/api/rest-api/shop/products/search-product)** |
| `category_carousel` | Call `GET /api/shop/categories?parent_id={options.filters.parent_id}` (or the [category tree](/api/rest-api/shop/categories/get-categories)), render the categories under `options.title`. | **Yes → [Categories](/api/rest-api/shop/categories/get-categories)** |

> **Key point:** `image_carousel`, `static_content`, `footer_links` and `services_content` are self-contained — render straight from `options`. `product_carousel` and `category_carousel` are only *configuration*: their `options.filters` tell you what to request from the Products / Categories endpoints — the block itself carries no products or categories.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Theme Customizations](/api/rest-api/shop/theme-customizations/get-theme-customizations) | `GET /api/shop/theme-customizations` | List the configured storefront content blocks. |

All Theme Customization endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
