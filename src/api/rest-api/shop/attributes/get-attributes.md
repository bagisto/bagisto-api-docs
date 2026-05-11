---
outline: false
examples:
  - id: list-attributes
    title: List Attributes
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
          "translation": { "id": 1, "attributeId": 1, "locale": "en", "name": "SKU" },
          "translations": [ "/api/shop/attribute_translations/1" ]
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
              "translation": { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" }
            }
          ],
          "translation": { "id": 23, "attributeId": 23, "locale": "en", "name": "Color" },
          "translations": [ "/api/shop/attribute_translations/23" ]
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

  - id: get-attribute
    title: Get Single Attribute
    description: Retrieve a single attribute by ID with its inline options array.
    request: |
      curl -X GET "http://localhost/api/shop/attributes/23" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

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
        "updatedAt": "2026-01-15T22:17:59+05:30",
        "columnName": "integer_value",
        "validations": "{  }",
        "options": [
          {
            "id": 1,
            "adminName": "Red",
            "sortOrder": 0,
            "translation": { "id": 1, "attributeOptionId": 1, "locale": "en", "label": "Red" },
            "translations": [
              { "id": 1,  "attributeOptionId": 1, "locale": "en", "label": "Red" },
              { "id": 86, "attributeOptionId": 1, "locale": "de", "label": "" }
            ]
          },
          {
            "id": 2,
            "adminName": "Green",
            "sortOrder": 0,
            "translation": { "id": 2, "attributeOptionId": 2, "locale": "en", "label": "Green" },
            "translations": []
          }
        ],
        "translation": { "id": 23, "attributeId": 23, "locale": "en", "name": "Color" },
        "translations": [ "/api/shop/attribute_translations/23" ]
      }
    commonErrors:
      - error: 404 Not Found
        cause: No attribute with the given `{id}` exists
        solution: List attributes via `GET /api/shop/attributes` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

---

# Attributes

Attributes describe customer-facing or internal properties of a product (SKU, name, color, size, etc.). For `select` / `multiselect` types, every selectable value is inlined under `options[]` — fetch a single attribute and you have its full option set in one request.

## Endpoints

| Method | Path                          | Purpose                                  |
|--------|-------------------------------|------------------------------------------|
| GET    | `/api/shop/attributes`        | Paginated list of attributes             |
| GET    | `/api/shop/attributes/{id}`   | Single attribute by ID                   |

Use the example switcher above to flip between the list and single calls.

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

## Attribute Object Fields

Both endpoints return the same shape — the collection wraps an array of these objects, the single endpoint returns one.

| Field               | Type                  | Description                                                                                  |
|---------------------|-----------------------|----------------------------------------------------------------------------------------------|
| `id`                | integer               | Attribute primary key                                                                        |
| `code`              | string                | Unique attribute code (`sku`, `color`, `size`, …)                                            |
| `adminName`         | string                | Internal admin label                                                                         |
| `type`              | string                | `text`, `textarea`, `price`, `boolean`, `select`, `multiselect`, `datetime`, `date`, `image`, `file`, `checkbox` |
| `swatchType`        | string \| null        | `dropdown`, `text`, `color`, `image` — only for visual selection attributes                  |
| `position`          | integer               | Display order in admin                                                                       |
| `isRequired`        | boolean (0/1)         | Whether values are required when saving a product                                            |
| `isUnique`          | boolean (0/1)         | Whether values must be unique across products                                                |
| `isFilterable`      | boolean (0/1)         | Whether the attribute appears in storefront layered filters                                  |
| `isComparable`      | boolean (0/1)         | Whether the attribute appears in product comparison                                          |
| `isConfigurable`    | boolean (0/1)         | Whether the attribute can be used to build configurable variants                             |
| `isUserDefined`     | boolean (0/1)         | `1` for custom attributes, `0` for system attributes                                         |
| `isVisibleOnFront`  | boolean (0/1)         | Whether the attribute is shown on the product detail page                                    |
| `valuePerLocale`    | boolean (0/1)         | Whether values can differ per locale                                                         |
| `valuePerChannel`   | boolean (0/1)         | Whether values can differ per channel                                                        |
| `enableWysiwyg`     | boolean (0/1)         | Whether `textarea` type uses a WYSIWYG editor                                                |
| `validations`       | string                | Serialized validation rules (e.g. `"{ required: true }"`)                                    |
| `columnName`        | string                | Storage column on `product_attribute_values`                                                 |
| `createdAt`, `updatedAt` | string (ISO-8601) | Timestamps                                                                                   |
| `options`           | array                 | Inline list of `AttributeOption` objects (empty for non-select types)                        |
| `translation`       | object \| null        | Translation for the current request locale (`{ id, attributeId, locale, name }`)             |
| `translations`      | array of IRI strings  | Links to all locale translations — see [IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas) |

### Embedded `options[]`

Each option carries:

| Field            | Type                | Description                                                  |
|------------------|---------------------|--------------------------------------------------------------|
| `id`             | integer             | Option primary key                                           |
| `adminName`      | string              | Internal admin label                                         |
| `sortOrder`      | integer             | Display order within the attribute                           |
| `translation`    | object              | Current-locale translation (`{ id, attributeOptionId, locale, label }`) |
| `translations`   | array               | All locale-specific labels                                   |

For non-select types (`text`, `textarea`, `boolean`, `price`, `date`, …), `options` is an empty array `[]`.

## Use Cases

- Build the attribute set for the product editor / filter sidebar.
- Discover which attributes are filterable (`isFilterable=1`) for a category page.
- Resolve `code` → `id` mappings for filter query parameters on `/products`.
- Render a configurable product's variant selectors (fetch the attribute once, get every option inline).
- Resolve attribute metadata (`type`, `validations`) before building a product-edit form.

## Related Resources

- [Attribute Options](/api/rest-api/shop/attributes/get-attribute-options)
- [Attribute Translations](/api/rest-api/shop/attributes/get-attribute-translations)
- [Get Products](/api/rest-api/shop/products/get-products) — pass `?<attribute_code>=<option_id>` to filter
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
