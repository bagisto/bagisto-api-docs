---
outline: false
examples:
  - id: list-attribute-translations
    title: List Attribute Translations
    description: Retrieve a paginated, flat list of attribute translations across all locales.
    request: |
      curl -X GET "http://localhost/api/shop/attribute_translations?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 47
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 24

      [
        { "id": 1, "attributeId": 1, "locale": "en", "name": "SKU" },
        { "id": 2, "attributeId": 2, "locale": "en", "name": "Name" }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-attribute-translation
    title: Get Single Attribute Translation
    description: Retrieve a single attribute translation by ID. Typically reached by following an entry from the `translations[]` array of an Attribute response.
    request: |
      curl -X GET "http://localhost/api/shop/attribute_translations/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      { "id": 1, "attributeId": 1, "locale": "en", "name": "SKU" }
    commonErrors:
      - error: 404 Not Found
        cause: No translation with the given `{id}` exists
        solution: List translations via `GET /api/shop/attribute_translations` or read the parent attribute's `translations[]` array.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Attribute Translations

Locale-specific names for attributes. The single endpoint is the destination of the IRI strings emitted in the `translations[]` array of [`GET /api/shop/attributes/{id}`](/api/rest-api/shop/attributes/get-attributes) — for example `/api/shop/attribute_translations/23`.

The URL uses an underscore — `attribute_translations`, not `attribute-translations`. It is the framework's default snake-case route, kept because the resource declares no explicit path.

Most clients won't call this collection directly — they'll either:
- read the inline `translation` object on the parent attribute (current locale only), or
- follow a `translations[]` IRI for a single non-default locale.

Use these endpoints when you need to bulk-load every translation (e.g. for offline caching) or audit translation completeness.

## Endpoints

| Method | Path                                          | Purpose                                          |
|--------|-----------------------------------------------|--------------------------------------------------|
| GET    | `/api/shop/attribute_translations`            | Paginated flat list of every translation         |
| GET    | `/api/shop/attribute_translations/{id}`       | Single translation by ID                         |

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

| Field         | Type    | Description                                                |
|---------------|---------|------------------------------------------------------------|
| `id`          | integer | Translation primary key                                    |
| `attributeId` | integer | Owning attribute's ID — fetch via `GET /api/shop/attributes/{attributeId}` |
| `locale`      | string  | Locale code (e.g. `en`, `fr`, `de`, `ar`)                  |
| `name`        | string  | Localized attribute name shown to customers in that locale  |

## Typical Flow

```
GET /api/shop/attributes/23
   └─ response.translations = [
        "/api/shop/attribute_translations/23",
        "/api/shop/attribute_translations/156",
        ...
      ]

GET /api/shop/attribute_translations/156
   └─ { "id": 156, "attributeId": 23, "locale": "fr", "name": "Couleur" }
```

You don't need to know the translation ID up front — read the `translations[]` array on the attribute and dereference any entry you need.

## Use Cases

- Pre-populate a localized admin tool that lets store managers review every attribute translation in one view.
- Build an offline cache of all attribute names per locale for an SPA.
- Validate translation completeness — sort/filter by locale and check for empty `name` values.

## Related Resources

- [Attributes](/api/rest-api/shop/attributes/get-attributes) — returns inline `translation` for the request locale and `translations[]` IRIs for the rest
- [Attribute Options](/api/rest-api/shop/attributes/get-attribute-options) — the flat collection of every option row
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) — how to dereference the path references in these payloads
