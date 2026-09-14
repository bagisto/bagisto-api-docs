---
outline: false
apiType: rest
---

# Sections

Sections are the blocks a storefront page is built from — carousels, static content blocks, the footer links. A store's merchandiser arranges them per channel, and the storefront draws them in the order they are given.

A headless storefront reads them to render the same page a Blade storefront would.

## What is returned

The endpoint returns the **published** sections of the current channel's active theme. Three things follow from that:

- **Only published content.** Unpublished edits held in the admin never appear here, so a page rendered from this endpoint matches what the merchandiser has actually released.
- **Only the active theme's sections.** A channel that switches theme keeps its old sections in the store, but they stop being returned.
- **Only sections that are switched on.** A section turned off is absent, not returned with a flag.

## Types

| Type | What it holds |
|------|---------------|
| `image_carousel` | Slides, each with an image and a link. |
| `product_carousel` | A product filter to run and draw as a slider. |
| `category_carousel` | A category filter to run and draw as a slider. |
| `footer_links` | Footer link columns. |
| `static_content` | Free HTML and CSS. |
| `services_content` | Service badges, each with an icon. |

The `type` decides the shape of `options`, so a client switches on it when rendering.

## Content and locale

Content is stored per locale. Each section carries `translation` — the block for the current locale — and `translations`, every locale it has content for. `options` is a JSON-encoded string; parse it before use.

## Endpoints

| Endpoint | Purpose |
|----------|---------|
| [List sections](/api/rest-api/shop/sections/list) | The published sections of the current channel |
| [Get section](/api/rest-api/shop/sections/detail) | One section by ID |

Both are public — they need only the storefront key, no customer token.
