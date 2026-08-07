---
outline: false
examples:
  - id: list-channels
    title: List Channels
    description: Retrieve a paginated list of store channels.
    request: |
      curl -X GET "http://localhost/api/shop/channels?per_page=10" \
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
          "id": 1,
          "code": "default",
          "timezone": null,
          "theme": "default",
          "hostname": "https://api-demo.bagisto.com",
          "logo": null,
          "favicon": null,
          "homeSeo": {
            "meta_title": "Demo store",
            "meta_keywords": "Demo store meta keyword",
            "meta_description": "Demo store meta description"
          },
          "isMaintenanceOn": 0,
          "allowedIps": "192.168.45.51",
          "createdAt": null,
          "updatedAt": "2026-04-08T17:23:40+05:30",
          "logoUrl": null,
          "faviconUrl": null,
          "locales": [
            "/api/shop/locales/1",
            "/api/shop/locales/10"
          ],
          "currencies": [
            "/api/shop/currencies/1",
            "/api/shop/currencies/3",
            "/api/shop/currencies/4"
          ],
          "defaultLocale": "/api/shop/locales/1",
          "baseCurrency": "/api/shop/currencies/1",
          "translation": "/api/shop/channel_translations/1",
          "translations": [
            "/api/shop/channel_translations/1",
            "/api/shop/channel_translations/5",
            "/api/shop/channel_translations/2"
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

  - id: get-channel
    title: Get Single Channel
    description: Retrieve a single channel by ID.
    request: |
      curl -X GET "http://localhost/api/shop/channels/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "code": "default",
        "timezone": null,
        "theme": "default",
        "hostname": "https://api-demo.bagisto.com",
        "logo": null,
        "favicon": null,
        "homeSeo": {
          "meta_title": "Demo store",
          "meta_keywords": "Demo store meta keyword",
          "meta_description": "Demo store meta description"
        },
        "isMaintenanceOn": 0,
        "allowedIps": "192.168.45.51",
        "createdAt": null,
        "updatedAt": "2026-04-08T17:23:40+05:30",
        "logoUrl": null,
        "faviconUrl": null,
        "locales": [
          "/api/shop/locales/1",
          "/api/shop/locales/10"
        ],
        "currencies": [
          "/api/shop/currencies/1",
          "/api/shop/currencies/3",
          "/api/shop/currencies/4"
        ],
        "defaultLocale": "/api/shop/locales/1",
        "baseCurrency": "/api/shop/currencies/1",
        "translation": "/api/shop/channel_translations/1",
        "translations": [
          "/api/shop/channel_translations/1",
          "/api/shop/channel_translations/5",
          "/api/shop/channel_translations/2",
          "/api/shop/channel_translations/3",
          "/api/shop/channel_translations/4"
        ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No channel with the given `{id}` exists
        solution: List channels via `GET /api/shop/channels` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Channels

A **channel** represents an individual storefront — its hostname, theme, allowed locales and currencies, default locale, base currency, and SEO defaults. Most stores have one channel; multi-channel installations expose every channel through the same endpoints.

## Endpoints

| Method | Path                          | Purpose                          |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/shop/channels`          | Paginated list of channels       |
| GET    | `/api/shop/channels/{id}`     | Single channel by ID             |

Use the example switcher above the curl block to flip between the two.

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Query Parameters (collection only)

| Parameter   | Type    | Default | Description                                 |
|-------------|---------|---------|---------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                       |
| `per_page`  | integer | 10      | Items per page. Max **50**.                 |

The collection response carries pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`). See [Pagination](/api/rest-api/introduction#pagination).

## Channel Object Fields

Both endpoints return the same shape — the collection wraps an array of these objects, the single endpoint returns one.

| Field             | Type                  | Description                                                                |
|-------------------|-----------------------|----------------------------------------------------------------------------|
| `id`              | integer               | Channel primary key                                                        |
| `code`            | string                | Unique channel code — pass it as the `X-Channel` header to scope a request |
| `hostname`        | string                | Public hostname for this channel                                           |
| `theme`           | string                | Theme assigned to the channel                                              |
| `timezone`        | string \| null        | Timezone code (e.g. `America/New_York`)                                    |
| `homeSeo`         | object                | SEO metadata: `{ meta_title, meta_keywords, meta_description }`            |
| `isMaintenanceOn` | boolean (0/1)         | Maintenance mode flag                                                      |
| `allowedIps`      | string \| null        | Comma-separated IP allowlist (used when maintenance mode is on)            |
| `logo`, `favicon` | string \| null        | Storage paths                                                              |
| `logoUrl`, `faviconUrl` | string \| null  | Fully-qualified asset URLs                                                 |
| `createdAt`, `updatedAt` | string (ISO-8601) \| null | Timestamps                                                       |
| `locales`         | array of IRI strings  | Locales enabled for this channel — `GET <iri>` to dereference              |
| `currencies`      | array of IRI strings  | Currencies enabled for this channel                                        |
| `defaultLocale`   | string (IRI) \| null  | Default locale for the channel                                             |
| `baseCurrency`    | string (IRI) \| null  | Base currency for prices                                                   |
| `translation`     | string (IRI) \| null  | Channel translation for the request locale (single IRI, **not inline**)    |
| `translations`    | array of IRI strings  | All locale translations                                                    |

Unlike attributes and categories, a channel's `translation` is a **path reference, not an inline object** — fetch it to read `name`, `description`, and `maintenanceModeText`. The channel object itself therefore carries no human-readable name. See [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) for how to dereference these paths.

## Use Cases

- Discover the channel `code` to send as `X-Channel` on subsequent requests.
- Read `locales` / `currencies` / `defaultLocale` / `baseCurrency` IRIs to render channel-aware switchers.
- Read `homeSeo` for the home-page `<title>` and meta tags before any product is loaded.
- Check `isMaintenanceOn` before showing the storefront; if `1`, fetch the `translation` IRI for the localized maintenance text.

## Best Practices

- **Read `code` first** — it is the value every other endpoint expects in `X-Channel`; the numeric `id` is not accepted there.
- **Fetch the `translation` path for display text** — the channel object itself carries no name or description.
- **Do not assume timestamps are set** — seeded channels return `null` for `createdAt` and `updatedAt`.
- **Check `isMaintenanceOn` before rendering the storefront** — when it is `1`, the localised maintenance message lives in the channel translation.

## Related Resources

- [Channel Translations](/api/rest-api/shop/channels/get-channel-translations) — a channel's localised name and content
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) — how to dereference the path references in these payloads
