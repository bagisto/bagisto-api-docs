---
outline: false
examples:
  - id: get-attributes
    title: Get All Attributes
    description: Retrieve a paginated list of product attributes.
    request: |
      curl -X GET "http://localhost/api/shop/attributes?page=1&per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 28
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 14
      Access-Control-Expose-Headers: X-Total-Count, X-Page, X-Per-Page, X-Total-Pages

      [
        {
          "id": 1,
          "code": "sku",
          "adminName": "SKU",
          "type": "text",
          "position": 1,
          "isRequired": 1,
          "isUnique": 1,
          "isFilterable": 0,
          "isComparable": 0,
          "isConfigurable": 0,
          "isUserDefined": 0,
          "isVisibleOnFront": 0,
          "valuePerLocale": 0,
          "valuePerChannel": 0,
          "enableWysiwyg": 0,
          "createdAt": "2024-04-16T21:44:17+05:30",
          "updatedAt": "2024-04-16T21:44:17+05:30",
          "columnName": "text_value",
          "validations": "{ required: true }",
          "options": [],
          "translation": {
            "id": 1,
            "attributeId": 1,
            "locale": "en",
            "name": "SKU"
          },
          "translations": [
            "/api/shop/attribute_translations/1"
          ]
        },
        {
          "id": 23,
          "code": "color",
          "adminName": "Color",
          "type": "select",
          "swatchType": "dropdown",
          "position": 26,
          "isRequired": 0,
          "isUnique": 0,
          "isFilterable": 1,
          "isComparable": 0,
          "isConfigurable": 1,
          "isUserDefined": 1,
          "isVisibleOnFront": 0,
          "valuePerLocale": 0,
          "valuePerChannel": 0,
          "enableWysiwyg": 0,
          "createdAt": "2024-04-16T21:44:17+05:30",
          "updatedAt": "2024-04-16T21:44:17+05:30",
          "columnName": "integer_value",
          "validations": "{  }",
          "options": [
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
                { "id": 86, "attributeOptionId": 1, "locale": "de", "label": "" }
              ]
            }
          ],
          "translation": {
            "id": 23,
            "attributeId": 23,
            "locale": "en",
            "name": "Color"
          },
          "translations": [
            "/api/shop/attribute_translations/23"
          ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY` header
        solution: Send a valid storefront API key. Generate one with `php artisan bagisto-api:generate-key`.
      - error: 403 Forbidden
        cause: Storefront key is inactive, expired, or rate-limited
        solution: Activate the key in the admin panel or request a higher rate limit.

---

# Get Attributes

Retrieve a paginated list of product attributes. Each attribute represents a customer-facing or internal property of a product (SKU, name, color, size, etc.) and may include a list of selectable options for `select` / `multiselect` types.

## Endpoint

```
GET /api/shop/attributes
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

`200 OK` — JSON array of attribute objects (no envelope).

### Pagination Headers

Every paginated response includes:

| Header              | Description                                  |
|---------------------|----------------------------------------------|
| `X-Total-Count`     | Total attributes across all pages            |
| `X-Page`            | Current page (1-based)                       |
| `X-Per-Page`        | Items returned on this page                  |
| `X-Total-Pages`     | Total number of pages                        |

These headers are CORS-exposed via `Access-Control-Expose-Headers`, so JS clients can read them with `response.headers.get('X-Total-Count')`.

### Attribute Object Fields

| Field               | Type                | Description                                                                 |
|---------------------|---------------------|-----------------------------------------------------------------------------|
| `id`                | integer             | Attribute primary key                                                       |
| `code`              | string              | Unique attribute code (e.g. `sku`, `color`, `size`)                          |
| `adminName`         | string              | Internal admin label                                                         |
| `type`              | string              | `text`, `textarea`, `price`, `boolean`, `select`, `multiselect`, `datetime`, `date`, `image`, `file`, `checkbox` |
| `swatchType`        | string \| null      | `dropdown`, `text`, `color`, `image` — only for visual selection attributes |
| `position`          | integer             | Display order in admin                                                       |
| `isRequired`        | boolean (0/1)       | Whether values are required when saving a product                            |
| `isUnique`          | boolean (0/1)       | Whether values must be unique across products                                |
| `isFilterable`      | boolean (0/1)       | Whether the attribute appears in storefront layered filters                  |
| `isComparable`      | boolean (0/1)       | Whether the attribute appears in product comparison                          |
| `isConfigurable`    | boolean (0/1)       | Whether the attribute can be used to build configurable variants             |
| `isUserDefined`     | boolean (0/1)       | `1` for custom attributes, `0` for system attributes                         |
| `isVisibleOnFront`  | boolean (0/1)       | Whether the attribute is shown on the product detail page                    |
| `valuePerLocale`    | boolean (0/1)       | Whether values can differ per locale                                         |
| `valuePerChannel`   | boolean (0/1)       | Whether values can differ per channel                                        |
| `enableWysiwyg`     | boolean (0/1)       | Whether `textarea` type uses a WYSIWYG editor                                |
| `validations`       | string              | Serialized validation rules (e.g. `"{ required: true }"`)                   |
| `columnName`        | string              | Storage column on `product_attribute_values` (`text_value`, `integer_value`, `decimal_value`, `boolean_value`, `datetime_value`, `date_value`) |
| `createdAt`         | string (ISO-8601)   | Creation timestamp                                                           |
| `updatedAt`         | string (ISO-8601)   | Last update timestamp                                                        |
| `options`           | array               | Inline list of `AttributeOption` objects (empty for non-select types)        |
| `translation`       | object \| null      | Translation for the current request locale (`{ id, attributeId, locale, name }`) |
| `translations`      | array of IRI strings | Links to all locale translations — fetch with `GET <iri>` for other locales  |

## Use Cases

- Build the attribute set for the product editor / filter sidebar.
- Discover which attributes are filterable (`isFilterable=1`) for a category page.
- Resolve `code` → `id` mappings for filter query parameters on `/products`.

## Related Resources

- [Get Single Attribute](/api/rest-api/shop/attributes/get-attribute)
- [Get Attribute Options](/api/rest-api/shop/attributes/get-attribute-options)
- [Get Single Attribute Option](/api/rest-api/shop/attributes/get-attribute-option)
