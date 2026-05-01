---
outline: false
examples:
  - id: get-attribute
    title: Get Single Attribute
    description: Retrieve detailed information for a specific attribute, including its inline options.
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
            "translation": {
              "id": 1,
              "attributeOptionId": 1,
              "locale": "en",
              "label": "Red"
            },
            "translations": [
              { "id": 1,  "attributeOptionId": 1, "locale": "en", "label": "Red" },
              { "id": 86, "attributeOptionId": 1, "locale": "de", "label": "" },
              { "id": 85, "attributeOptionId": 1, "locale": "es", "label": "" }
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
    commonErrors:
      - error: 404 Not Found
        cause: No attribute with the given `{id}` exists
        solution: List attributes via `GET /api/shop/attributes` to discover valid IDs.
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Provide a valid storefront API key.
      - error: 403 Forbidden
        cause: Storefront key inactive or rate-limited
        solution: Activate the key or wait for the rate limit window to reset.

---

# Get Single Attribute

Retrieve a single attribute by ID, with its inline options array. This is the canonical way to fetch all selectable values for a `select` / `multiselect` attribute (e.g. all colors for the `color` attribute) in one request.

## Endpoint

```
GET /api/shop/attributes/{id}
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |

## Path Parameters

| Parameter | Type    | Required | Description                            |
|-----------|---------|----------|----------------------------------------|
| `id`      | integer | Yes      | Attribute primary key                  |

## Response

`200 OK` — single attribute JSON object (no envelope).

### Top-level fields

Same shape as items in `GET /api/shop/attributes`. See [Get Attributes → Attribute Object Fields](/api/rest-api/shop/attributes/get-attributes#attribute-object-fields) for the full table.

### Embedded `options[]`

For `select` / `multiselect` attributes, every option is inlined inside `options[]`. Each option carries:

| Field            | Type                | Description                                                  |
|------------------|---------------------|--------------------------------------------------------------|
| `id`             | integer             | Option primary key — use as the value when filtering products |
| `adminName`      | string              | Internal admin label                                          |
| `sortOrder`      | integer             | Display order within the attribute                            |
| `translation`    | object              | Current-locale translation (`{ id, attributeOptionId, locale, label }`) |
| `translations`   | array               | All locale-specific labels                                    |

For non-select types (`text`, `textarea`, `boolean`, `price`, `date`, …), `options` is an empty array `[]`.

### Embedded `translation` and `translations`

- `translation` — single object scoped to the current request locale.
- `translations` — array of IRI strings to all locale translations. Follow each IRI with `GET <iri>` to retrieve a specific locale.

## Use Cases

- Render a configurable product's variant selectors (fetch the attribute once, get every option inline).
- Build a category-page filter widget: fetch each filterable attribute and use `options` directly as facet values.
- Resolve attribute metadata (type, validations) before building a product-edit form.

## Related Resources

- [Get Attributes](/api/rest-api/shop/attributes/get-attributes)
- [Get Attribute Options](/api/rest-api/shop/attributes/get-attribute-options)
- [Get Single Attribute Option](/api/rest-api/shop/attributes/get-attribute-option)
- [Get Products](/api/rest-api/shop/products/get-products) — pass `?<attribute_code>=<option_id>` to filter
