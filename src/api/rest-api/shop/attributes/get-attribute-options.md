---
outline: false
examples:
  - id: get-attribute-options
    title: Get Attribute Options
    description: Retrieve a paginated, flat list of every attribute option in the system.
    request: |
      curl -X GET "http://localhost/api/shop/attribute-options?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 84
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 42

      [
        {
          "id": 1,
          "adminName": "Red",
          "sortOrder": 0,
          "translation": {
            "id": 1,
            "attributeOptionId": 1,
            "locale": "en",
            "label": "Red"
          },
          "translations": [
            { "id": 1,  "attributeOptionId": 1, "locale": "en", "label": "Red" },
            { "id": 86, "attributeOptionId": 1, "locale": "de", "label": "" },
            { "id": 85, "attributeOptionId": 1, "locale": "es", "label": "" },
            { "id": 82, "attributeOptionId": 1, "locale": "fr", "label": "" },
            { "id": 87, "attributeOptionId": 1, "locale": "it", "label": "" },
            { "id": 83, "attributeOptionId": 1, "locale": "nl", "label": "" },
            { "id": 88, "attributeOptionId": 1, "locale": "ru", "label": "" },
            { "id": 84, "attributeOptionId": 1, "locale": "tr", "label": "" }
          ]
        },
        {
          "id": 2,
          "adminName": "Green",
          "sortOrder": 0,
          "translation": {
            "id": 2,
            "attributeOptionId": 2,
            "locale": "en",
            "label": "Green"
          },
          "translations": []
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Provide a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit to reset.

---

# Get Attribute Options

Retrieve a paginated **flat list of every attribute option** across all attributes (color values, sizes, brands, etc.). Most clients should prefer fetching options inline via [`GET /api/shop/attributes/{id}`](/api/rest-api/shop/attributes/get-attribute), since that returns options scoped to a single attribute. Use this endpoint when you need the full option catalog or want to look up an option by ID without knowing its parent attribute.

## Endpoint

```
GET /api/shop/attribute-options
```

> ⚠️ **Note**: this endpoint is **flat**, not nested under an attribute. The URL is `/attribute-options`, NOT `/attributes/{id}/options`.

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

`200 OK` — JSON array of attribute-option objects. The response carries the same `X-Total-Count` / `X-Page` / `X-Per-Page` / `X-Total-Pages` headers as other paginated collections.

### Attribute Option Object Fields

| Field          | Type    | Description                                                                              |
|----------------|---------|------------------------------------------------------------------------------------------|
| `id`           | integer | Option primary key — use this value when filtering products by an attribute              |
| `adminName`    | string  | Internal admin label                                                                     |
| `sortOrder`    | integer | Display order within its parent attribute                                                |
| `translation`  | object  | Current-locale translation: `{ id, attributeOptionId, locale, label }`                   |
| `translations` | array   | All locale-specific labels, each with `{ id, attributeOptionId, locale, label }`         |

> The parent attribute is **not** embedded in this response. To find which attribute an option belongs to, fetch the attribute itself or look the option up via [Get Single Attribute Option](/api/rest-api/shop/attributes/get-attribute-option).

## Use Cases

- Pre-load all option labels in every storefront locale for offline / SPA caching.
- Build admin-style "find option by label" search.
- Resolve historical option IDs stored against orders or carts.

## Related Resources

- [Get Single Attribute Option](/api/rest-api/shop/attributes/get-attribute-option)
- [Get Single Attribute](/api/rest-api/shop/attributes/get-attribute) — preferred when you only need options for one attribute
- [Get Attributes](/api/rest-api/shop/attributes/get-attributes)
