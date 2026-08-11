---
outline: false
apiType: rest
---

# Categories

The Categories menu exposes the store's catalog structure — the browsable departments and sub-departments a shopper navigates. Two endpoints read the same data in two shapes: a **flat list** of individual category rows, and a **nested tree** that mirrors the storefront's navigation.

Both are public reads. They need the storefront key and no customer token.

## Flat List or Tree

| | Flat list | Tree |
|---|-----------|------|
| Path | `GET /api/shop/categories` | `GET /api/shop/category-trees` |
| Shape | One row per category, paginated | Roots with `children` nested inline |
| Children | Path references only, e.g. `/api/shop/categories/5` | Real nested objects, recursively |
| Extras | `filterableAttributes`, `minPrice` / `maxPrice`, `parent`, image URLs | Slimmer node — none of those |
| Use it for | Category admin screens, price-range facets, paging through every category | Navigation menus, sidebars, breadcrumbs |

Build a menu from the **tree**. Building one from the flat list means one request per level, because `children` there are references rather than objects.

## Filtering and Paging

The flat list accepts three parameters:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `parent_id` | — | Return only the direct children of that category. `parentId` is accepted as an alias. Omit it to list every category. |
| `page` | `1` | Page number. |
| `per_page` | `10` | Rows per page, capped at 50. |

The tree accepts two:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `parentId` | — | Return that category's children as the top level. Omitted, the response starts at the root categories. An unknown id returns `[]`. |
| `depth` | `4` | How many levels to nest. `depth=1` returns the top level with empty `children`; `depth=2` adds one level below, and so on. |

There is no name search, no status filter, and no sort parameter. Rows always come back ordered by the `position` the store set, then by id — the same order the storefront renders them in.

## Only Active Categories Are Returned

Both endpoints hard-filter to `status = 1` at every level. A disabled category never appears, and neither does anything beneath it, even when its parent is active. Sending `?status=0` does not override this — the parameter is ignored and active categories come back anyway.

This is a storefront surface, so there is no way to read a draft or hidden category through it.

## Localisation

Category names, slugs, and descriptions live in a `translation` block, not at the top level of the category object — the row itself carries no `name`. Send `X-Locale` to pick the language; the inline `translation` follows the request locale, and `translations` lists every stored language for a client that wants to cache them all at once.

## Absent Fields Are Omitted, Not Null

`logoPath`, `logoUrl`, and `parent` are dropped from the payload entirely when they have no value, rather than being returned as `null`. A root category therefore has **no** `parent` key at all. Test for key presence, not for a null value.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Categories](/api/rest-api/shop/categories/get-categories) | `GET /api/shop/categories` | Flat, paginated list. Also documents `GET /api/shop/categories/{id}` for a single category. |
| [Category Tree](/api/rest-api/shop/categories/get-category-tree) | `GET /api/shop/category-trees` | Nested tree for navigation. |

## Where Categories Are Used Elsewhere

- **Product listing** — `GET /api/shop/products?category_id=N` filters the catalog to one category. The id comes from either endpoint here.
- **Category-page facets** — each category inlines `filterableAttributes` with their options, plus `minPrice` and `maxPrice`, so a facet sidebar needs no extra call. There is no separate filters endpoint; see [Category Attribute Filters](/api/rest-api/shop/categories/get-categories#category-attribute-filters) for the field meanings and how to turn a facet into a product-listing parameter.
- **Breadcrumbs** — follow `parent` upwards on the flat row; its absence marks the root.

All Category endpoints are public reads that require only the storefront key — see [Authentication](/api/rest-api/authentication).
