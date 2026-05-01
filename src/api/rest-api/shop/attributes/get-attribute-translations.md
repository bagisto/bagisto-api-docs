---
outline: false
examples:
  - id: get-attribute-translations
    title: Get Attribute Translations
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
        {
          "id": 1,
          "attributeId": 1,
          "locale": "en",
          "name": "SKU"
        },
        {
          "id": 2,
          "attributeId": 2,
          "locale": "en",
          "name": "Name"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

---

# Get Attribute Translations

Retrieve a paginated **flat list** of attribute translations across every attribute and locale. This endpoint is the target of the IRI strings emitted in the `translations[]` array of [Get Single Attribute](/api/rest-api/shop/attributes/get-attribute) — for example `/api/shop/attribute_translations/23`.

> ⚠️ The URL uses an underscore: `attribute_translations`, not `attribute-translations`. This is API Platform's default snake-case route, kept for consistency with the IRIs returned by other endpoints.

Most clients won't call this endpoint directly — they'll either:
- read the inline `translation` object from the parent attribute (current locale only), or
- follow a `translations[]` IRI for a single non-default locale.

Use this collection only when you need to bulk-load every translation (e.g. for offline caching).

## Endpoint

```
GET /api/shop/attribute_translations
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Query Parameters

| Parameter   | Type    | Default | Description                                 |
|-------------|---------|---------|---------------------------------------------|
| `page`      | integer | 1       | Page number (1-based)                       |
| `per_page`  | integer | 10      | Items per page. Max **50**.                 |

## Response

`200 OK` — JSON array of translation objects. Pagination headers (`X-Total-Count`, `X-Page`, `X-Per-Page`, `X-Total-Pages`) are emitted on every paginated collection — see [Pagination](/api/rest-api/introduction#pagination).

### Translation Object Fields

| Field         | Type    | Description                                                |
|---------------|---------|------------------------------------------------------------|
| `id`          | integer | Translation primary key                                    |
| `attributeId` | integer | Owning attribute's ID — fetch via `GET /api/shop/attributes/{attributeId}` |
| `locale`      | string  | Locale code (e.g. `en`, `fr`, `de`, `ar`)                   |
| `name`        | string  | Localized attribute name shown to customers in that locale  |

## Use Cases

- Pre-populate a localized admin tool that lets store managers review every attribute translation in one view.
- Build an offline cache of all attribute names per locale for an SPA.
- Validate translation completeness — sort/filter by locale and check for empty `name` values.

## Related Resources

- [Get Single Attribute Translation](/api/rest-api/shop/attributes/get-attribute-translation)
- [Get Single Attribute](/api/rest-api/shop/attributes/get-attribute) — returns inline `translation` for the request locale and `translations[]` IRIs for the rest
- [Get Attributes](/api/rest-api/shop/attributes/get-attributes)
