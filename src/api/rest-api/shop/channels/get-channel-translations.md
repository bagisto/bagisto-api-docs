---
outline: false
examples:
  - id: list-channel-translations
    title: List Channel Translations
    description: Retrieve a paginated, flat list of channel translations across all locales.
    request: |
      curl -X GET "http://localhost/api/shop/channel_translations?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 5
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 3

      [
        {
          "id": 1,
          "channelId": 1,
          "locale": "en",
          "name": "bagisto store",
          "description": "",
          "maintenanceModeText": "Maintenance Mode",
          "homeSeo": {
            "meta_title": "Demo store",
            "meta_keywords": "Demo store meta keyword",
            "meta_description": "Demo store meta description"
          },
          "createdAt": null,
          "updatedAt": "2026-04-08T17:23:40+05:30"
        },
        {
          "id": 2,
          "channelId": 1,
          "locale": "fr",
          "name": "Default",
          "description": null,
          "maintenanceModeText": null,
          "homeSeo": {
            "meta_title": "Demo store",
            "meta_keywords": "Demo store meta keyword",
            "meta_description": "Demo store meta description"
          },
          "createdAt": null,
          "updatedAt": null
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-channel-translation
    title: Get Single Channel Translation
    description: Retrieve a single channel translation by ID. Typically reached by following a `translation` / `translations[]` IRI from the parent Channel response.
    request: |
      curl -X GET "http://localhost/api/shop/channel_translations/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "channelId": 1,
        "locale": "en",
        "name": "bagisto store",
        "description": "",
        "maintenanceModeText": "Maintenance Mode",
        "homeSeo": {
          "meta_title": "Demo store",
          "meta_keywords": "Demo store meta keyword",
          "meta_description": "Demo store meta description"
        },
        "createdAt": null,
        "updatedAt": "2026-04-08T17:23:40+05:30"
      }
    commonErrors:
      - error: 404 Not Found
        cause: No translation with the given `{id}` exists
        solution: List translations via `GET /api/shop/channel_translations` or read the channel's `translations[]` array.

---

# Channel Translations

The locale-specific copy for a channel — its display name, tagline, maintenance-mode text, and per-locale home-page SEO.

> ⚠️ The URL uses an **underscore**: `channel_translations`, not `channel-translations`. This matches the IRI strings emitted by `/api/shop/channels/{id}` (`translation` and `translations[]`).

Most clients reach a single row by following the `translation` / `translations[]` IRIs on a Channel response. The collection endpoint is mostly useful for bulk auditing or pre-caching every locale.

## Endpoints

| Method | Path                                       | Purpose                                  |
|--------|--------------------------------------------|------------------------------------------|
| GET    | `/api/shop/channel_translations`           | Paginated flat list of every translation |
| GET    | `/api/shop/channel_translations/{id}`      | Single translation by ID                 |

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

Pagination headers are emitted on the collection. See [Pagination](/api/rest-api/introduction#pagination).

## Translation Object Fields

| Field                 | Type              | Description                                                |
|-----------------------|-------------------|------------------------------------------------------------|
| `id`                  | integer           | Translation primary key                                    |
| `channelId`           | integer           | Owning channel — fetch via `GET /api/shop/channels/{channelId}` |
| `locale`              | string            | Locale code (`en`, `fr`, `de`, `ar`, …)                    |
| `name`                | string            | Channel display name in this locale                        |
| `description`         | string \| null    | Channel tagline / description                              |
| `maintenanceModeText` | string \| null    | Text shown to customers while maintenance mode is active   |
| `homeSeo`             | object            | `{ meta_title, meta_keywords, meta_description }` for the home page in this locale |
| `createdAt`           | string \| null    | Creation timestamp                                         |
| `updatedAt`           | string \| null    | Last update timestamp                                      |

## Typical Flow

```
GET /api/shop/channels/1
   └─ response.translation  = "/api/shop/channel_translations/1"
   └─ response.translations = [
        "/api/shop/channel_translations/1",  // en
        "/api/shop/channel_translations/2",  // fr
        "/api/shop/channel_translations/3",  // de
        ...
      ]

GET /api/shop/channel_translations/2
   └─ { id: 2, channelId: 1, locale: "fr", name: "...", maintenanceModeText: "...", homeSeo: {...} }
```

You don't need to know the translation ID up front — read the parent channel's `translation` / `translations[]` and dereference any entry you need.

## Use Cases

- Audit translation completeness across every locale and channel.
- Build an admin UI that lets store managers review channel-level localization.
- Pre-cache every locale's home-page SEO for a multi-locale SPA.
- Render the localized maintenance-mode banner when `Channel.isMaintenanceOn = 1`.

## Related Resources

- [Channels](/api/rest-api/shop/channels/get-channels)
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
