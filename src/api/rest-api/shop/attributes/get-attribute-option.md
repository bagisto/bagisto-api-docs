---
outline: false
examples:
  - id: get-attribute-option
    title: Get Single Attribute Option
    description: Retrieve a single attribute option by ID with all its locale translations.
    request: |
      curl -X GET "http://localhost/api/shop/attribute-options/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

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
      }
    commonErrors:
      - error: 404 Not Found
        cause: No attribute option with the given `{id}` exists
        solution: List options via `GET /api/shop/attribute-options` or fetch the parent attribute via `GET /api/shop/attributes/{id}`.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Provide a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

---

# Get Single Attribute Option

Retrieve a single attribute option by its ID. The response includes the option's admin name, sort order, the translation for the current request locale, and the full list of locale-specific labels.

## Endpoint

```
GET /api/shop/attribute-options/{id}
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Path Parameters

| Parameter | Type    | Required | Description                            |
|-----------|---------|----------|----------------------------------------|
| `id`      | integer | Yes      | Attribute option primary key           |

## Response

`200 OK` — single attribute-option JSON object.

### Fields

| Field          | Type    | Description                                                                          |
|----------------|---------|--------------------------------------------------------------------------------------|
| `id`           | integer | Option primary key                                                                   |
| `adminName`    | string  | Internal admin label                                                                 |
| `sortOrder`    | integer | Display order within its parent attribute                                            |
| `translation`  | object  | Translation for the request's current locale: `{ id, attributeOptionId, locale, label }` |
| `translations` | array   | Every locale translation. Locales without a stored label are returned as empty strings. |

## Use Cases

- Resolve a historical `option_id` (stored on an order or cart) back to a human-readable label without re-fetching the parent attribute.
- Look up the localized label for a specific option in a non-default locale.
- Build admin tooling that links directly to a single option resource.

## Related Resources

- [Get Attribute Options](/api/rest-api/shop/attributes/get-attribute-options) — flat collection
- [Get Single Attribute](/api/rest-api/shop/attributes/get-attribute) — fetch options inline with their parent attribute
- [Get Attributes](/api/rest-api/shop/attributes/get-attributes)
