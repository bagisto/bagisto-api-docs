---
outline: false
apiType: graphql
---

# Sections

Sections are the blocks a storefront page is built from — carousels, static content, the footer links. A merchandiser arranges them per channel, and the storefront draws them in the order given.

## What is returned

The queries return the **published** sections of the current channel's active theme:

- **Only published content** — unpublished edits held in the admin never appear.
- **Only the active theme's sections** — a channel that switches theme keeps its old sections, but they stop being returned.
- **Only sections that are switched on** — a section turned off is absent rather than flagged.

## Types

| Type | What it holds |
|------|---------------|
| `image_carousel` | Slides, each with an image and a link. |
| `product_carousel` | A product filter to run and draw as a slider. |
| `category_carousel` | A category filter to run and draw as a slider. |
| `footer_links` | Footer link columns. |
| `static_content` | Free HTML and CSS. |
| `services_content` | Service badges, each with an icon. |

`type` decides the shape of `options`, so a client switches on it when rendering.

## Content and locale

Content is stored per locale. Each section carries `translation` for the current locale and `translations` for every locale it has content in. `options` is a JSON-encoded string; parse it before use.

## Queries

| Query | Purpose |
|-------|---------|
| [sections](/api/graphql-api/shop/sections/list) | The published sections of the current channel |
| [section](/api/graphql-api/shop/sections/detail) | One section by ID |

Both are public — they need only the storefront key, no customer token.
