---
outline: false
examples:
  - id: list-theme-customizations
    title: List Theme Customizations
    description: Retrieve a paginated list of every theme customization (carousels, footer links, static content blocks, …).
    request: |
      curl -X GET "http://localhost/api/shop/theme-customizations?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 12
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 6

      [
        {
          "id": 1,
          "themeCode": "default",
          "channelId": 1,
          "type": "image_carousel",
          "name": "Image Carousel",
          "sortOrder": 1,
          "status": 1,
          "createdAt": "2024-04-16T21:44:15+05:30",
          "updatedAt": "2026-04-06T19:15:53+05:30",
          "translation": {
            "id": 1,
            "themeCustomizationId": 1,
            "locale": "en",
            "options": "{\"images\": [{\"link\": \"fashion\", \"image\": \"storage/theme/1/...webp\", \"title\": \"Fashion\"}, {\"link\": \"furniture\", \"image\": \"storage/theme/1/...webp\", \"title\": \"Furniture\"}]}"
          },
          "translations": [
            { "id": 1,  "themeCustomizationId": 1, "locale": "en", "options": "{\"images\": [...]}" },
            { "id": 19, "themeCustomizationId": 1, "locale": "AR", "options": "{\"images\": [...]}" }
          ]
        },
        {
          "id": 3,
          "themeCode": "default",
          "channelId": 1,
          "type": "category_carousel",
          "name": "Categories Collections",
          "sortOrder": 3,
          "status": 1,
          "createdAt": "2024-04-16T21:44:15+05:30",
          "updatedAt": "2026-04-07T18:05:39+05:30",
          "translation": {
            "id": 3,
            "themeCustomizationId": 3,
            "locale": "en",
            "options": "{\"filters\": {\"sort\": \"asc\", \"limit\": \"10\", \"parent_id\": \"1\"}}"
          },
          "translations": [
            { "id": 3,  "themeCustomizationId": 3, "locale": "en", "options": "{\"filters\": {...}}" }
          ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

  - id: list-by-type-footer-links
    title: Filter by type — `footer_links`
    description: Use `?type=footer_links` to fetch only the footer-links blocks. The same `?type=…` filter works for any of the supported types.
    request: |
      curl -X GET "http://localhost/api/shop/theme-customizations?type=footer_links" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 1
      X-Page: 1
      X-Per-Page: 10
      X-Total-Pages: 1

      [
        {
          "id": 11,
          "themeCode": "default",
          "channelId": 1,
          "type": "footer_links",
          "name": "Footer Links",
          "sortOrder": 11,
          "status": 1,
          "createdAt": "2024-04-16T21:44:15+05:30",
          "updatedAt": "2026-04-23T23:54:54+05:30",
          "translation": {
            "id": 11,
            "themeCustomizationId": 11,
            "locale": "en",
            "options": "{\"column_1\": [{\"url\": \"https://example.com/page/privacy-policy\", \"title\": \"Privacy policy\", \"sort_order\": \"3\"}, {\"url\": \"https://example.com/page/whats-new\", \"title\": \"What's New\", \"sort_order\": \"3\"}], \"column_2\": [{\"url\": \"https://example.com/page/about-us\", \"title\": \"About Us\", \"sort_order\": \"8\"}]}"
          },
          "translations": [
            { "id": 11, "themeCustomizationId": 11, "locale": "en", "options": "{\"column_1\": [...], \"column_2\": [...]}" },
            { "id": 21, "themeCustomizationId": 11, "locale": "AR", "options": "{\"column_1\": [...], \"column_2\": [...]}" }
          ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-theme-customization
    title: Get Single Theme Customization
    description: Retrieve a single theme customization by ID with its inline `translation` and `translations[]`.
    request: |
      curl -X GET "http://localhost/api/shop/theme-customizations/11" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 11,
        "themeCode": "default",
        "channelId": 1,
        "type": "footer_links",
        "name": "Footer Links",
        "sortOrder": 11,
        "status": 1,
        "createdAt": "2024-04-16T21:44:15+05:30",
        "updatedAt": "2026-04-23T23:54:54+05:30",
        "translation": {
          "id": 11,
          "themeCustomizationId": 11,
          "locale": "en",
          "options": "{\"column_1\": [{\"url\": \"https://example.com/page/privacy-policy\", \"title\": \"Privacy policy\", \"sort_order\": \"3\"}], \"column_2\": [{\"url\": \"https://example.com/page/about-us\", \"title\": \"About Us\", \"sort_order\": \"8\"}]}"
        },
        "translations": [
          { "id": 11, "themeCustomizationId": 11, "locale": "en", "options": "{\"column_1\": [...], \"column_2\": [...]}" },
          { "id": 21, "themeCustomizationId": 11, "locale": "AR", "options": "{\"column_1\": [...], \"column_2\": [...]}" }
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No theme customization with the given `{id}` exists or its `status=0`
        solution: List active customizations via `GET /api/shop/theme-customizations` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Theme Customizations

Theme customizations are the configurable content blocks that drive the storefront home page and footer — image carousels, category carousels, product carousels, static-content slots, the footer-links columns, and the "services" / "USP" strip. Each block is scoped to a `themeCode` + `channelId` pair, with locale-specific `options` JSON inside its translations.

## Endpoints

| Method | Path                                       | Purpose                                  |
|--------|--------------------------------------------|------------------------------------------|
| GET    | `/api/shop/theme-customizations`           | Paginated list — supports `?type=` filter |
| GET    | `/api/shop/theme-customizations/{id}`      | Single customization by ID               |

Use the example switcher above to flip between the unfiltered list, the `?type=footer_links` filter, and a single fetch.

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale — affects which row populates `translation`. Default: channel locale. |
| `X-Channel`        | No       | Override channel scope                   |

## Query Parameters (collection only)

| Parameter   | Type    | Default | Description                                                                          |
|-------------|---------|---------|--------------------------------------------------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                                                                |
| `per_page`  | integer | 10      | Items per page. Max **100** for this endpoint.                                       |
| `type`      | string  | —       | Exact-match filter on the `type` field (see [Supported types](#supported-types))     |

Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are emitted on the collection. See [Pagination](/api/rest-api/introduction#pagination).

## Supported types

The `type` filter accepts any of these exact strings:

| Type                | Purpose                                                            |
|---------------------|--------------------------------------------------------------------|
| `image_carousel`    | Hero / banner image carousel on the home page                      |
| `category_carousel` | Horizontally-scrolling list of categories                          |
| `product_carousel`  | Horizontally-scrolling list of products                            |
| `static_content`    | Free-form HTML / Markdown block                                    |
| `footer_links`      | Footer link columns (privacy, terms, about, customer service, …)   |
| `services_content`  | "Services" / USP strip (free shipping, 24×7 support, refund policy, …) |

> Unsupported values are accepted by the filter but return an empty array (`[]`) — the validation isn't strict.

## Customization Object Fields

Both endpoints return the same shape — the collection wraps an array of these objects, the single endpoint returns one.

| Field          | Type                  | Description                                                                              |
|----------------|-----------------------|------------------------------------------------------------------------------------------|
| `id`           | integer               | Customization primary key                                                                |
| `themeCode`    | string                | Theme this block belongs to (e.g. `default`)                                             |
| `channelId`    | integer               | Channel that owns this block — pair with `themeCode`                                     |
| `type`         | string                | One of the [supported types](#supported-types)                                           |
| `name`         | string                | Admin-facing name                                                                        |
| `sortOrder`    | integer               | Display order within the home page / footer                                              |
| `status`       | boolean (0/1)         | Whether the block is published — only published rows are returned                        |
| `createdAt`, `updatedAt` | string (ISO-8601) | Timestamps                                                                          |
| `translation`  | object \| null        | Inline translation for the request locale: `{ id, themeCustomizationId, locale, options }` |
| `translations` | array of objects      | All locale translations as **inline objects** (not IRI strings)                          |

> Both `translation` and `translations[]` are inlined — there are no IRIs to follow on this resource. The `options` field inside each translation is a **JSON string**, not a parsed object — you have to `JSON.parse(translation.options)` on the client.

> **Content is locale-specific — pass `X-Locale`.** The `translation` field returns the block's content for the **requested locale**, selected by the `X-Locale` request header (e.g. `X-Locale: ar`); omit it and you get the store default locale. The `translations[]` array always carries every locale, so you can also read them all and pick client-side.

### Shape of the `options` payload (per type)

The `options` JSON string varies by `type`. Common shapes:

| `type`              | Parsed `options` shape                                                                       |
|---------------------|----------------------------------------------------------------------------------------------|
| `image_carousel`    | `{ "images": [{ "image": "storage/theme/.../*.webp", "link": "...", "title": "..." }, …] }`  |
| `product_carousel`  | `{ "title": "...", "filters": { "new": 1, "featured": 1, "limit": 10, "sort": "asc" } }` — `filters` is forwarded as query params to the [Products](/api/rest-api/shop/products/search-product) listing |
| `category_carousel` | `{ "title": "...", "filters": { "parent_id": "1", "limit": "10", "sort": "asc" } }` — `parent_id` selects the parent whose children are shown (same value you'd pass to `treeCategories(parentId:)`) |
| `static_content`    | `{ "html": "<div>…</div>", "css": ".foo{…}" }`                                               |
| `footer_links`      | `{ "column_1": [{ "url": "...", "title": "...", "sort_order": "3" }, …], "column_2": […], … }` |
| `services_content`  | `{ "services": [{ "service_icon": "storage/…", "title": "...", "description": "..." }, …] }`  |

> The client must **parse the JSON string** before using it. The API stores `options` as a TEXT column and returns it verbatim.

> **`static_content` images:** the stored `html` is authored for the storefront web theme, where `<img>` tags carry the real source in a **`data-src`** attribute (lazy-loading) and a placeholder in `src`. If you render this HTML in your own frontend, read `data-src`, not `src`, or images won't load.

## Use Cases

- Render the storefront home page in a single round trip: fetch the unfiltered collection, group by `type`, sort by `sortOrder` per group.
- Render the footer in a focused request: `?type=footer_links` returns just one row whose `options` carries the column data.
- Build an admin preview of every locale: read all `translations[]` entries side-by-side.
- Auto-detect new home-page blocks added by store admins by polling the collection — anything with `status=1` will appear.

## Related Resources

- [Channels](/api/rest-api/shop/channels/get-channels) — `channelId` on each customization points at one of these
- [Categories](/api/rest-api/shop/categories/get-categories) — referenced by `category_carousel` and `product_carousel` filters
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
