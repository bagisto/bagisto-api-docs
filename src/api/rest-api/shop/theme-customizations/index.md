---
outline: false
apiType: rest
---

# Theme Customizations

The Theme Customizations menu returns the content blocks an admin has configured for the storefront — image carousels, static-content sections, product/category carousels, footer link sets and similar homepage pieces. Use it to render the storefront's home and content areas from your own front end instead of hard-coding them.

## When a client uses this

Fetch the theme customizations for the current channel when building the homepage or any themed landing area. Each block carries its type and its per-locale content, so a client can lay out the same sections the storefront theme shows, in the shopper's language.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Theme Customizations](/api/rest-api/shop/theme-customizations/get-theme-customizations) | `GET /api/shop/theme-customizations` | List the configured storefront content blocks. |

All Theme Customization endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
