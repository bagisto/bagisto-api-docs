---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attribute-create
    title: Create Attribute
    description: Creates an attribute with optional translations and options (for select/multiselect/checkbox types). The `code` must be unique, pass the Code rule (letters/digits/underscore), and not be a reserved word.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/attributes" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "code": "material",
          "admin_name": "Material",
          "type": "select",
          "swatch_type": "text",
          "is_required": false,
          "is_unique": false,
          "is_filterable": true,
          "is_configurable": false,
          "is_visible_on_front": true,
          "is_comparable": false,
          "value_per_locale": false,
          "value_per_channel": false,
          "enable_wysiwyg": false,
          "position": 10,
          "translations": {
            "en": { "name": "Material" },
            "fr": { "name": "Matière" }
          },
          "options": [
            { "admin_name": "Cotton", "sort_order": 1, "translations": { "en": { "label": "Cotton" }, "fr": { "label": "Coton" } } }
          ]
        }'
    variables: |
      {
        "code": "material",
        "admin_name": "Material",
        "type": "select"
      }
    response: |
      {
        "id": 50,
        "code": "material",
        "type": "select",
        "adminName": "Material",
        "isRequired": 0,
        "isUnique": 0,
        "valuePerLocale": 0,
        "valuePerChannel": 0,
        "isFilterable": 1,
        "isConfigurable": 0,
        "isVisibleOnFront": 1,
        "isUserDefined": 1,
        "swatchType": "text",
        "position": 10,
        "locale": "en",
        "createdAt": "2026-05-22T10:00:00+00:00",
        "updatedAt": "2026-05-22T10:00:00+00:00",
        "validation": null,
        "defaultValue": null,
        "translations": [
          { "locale": "en", "name": "Material" },
          { "locale": "fr", "name": "Matière" }
        ],
        "options": [
          {
            "id": 101,
            "adminName": "Cotton",
            "sortOrder": 1,
            "swatchValue": null,
            "swatchValueUrl": null,
            "translations": [
              { "locale": "en", "label": "Cotton" },
              { "locale": "fr", "label": "Coton" }
            ]
          }
        ]
      }
    commonErrors:
      - error: Validation (422)
        cause: '`code` missing, malformed, duplicate, or a reserved word (`type`, `attribute_family_id`)'
        solution: Send a unique snake_case code that matches `^[a-z][a-z0-9_]*$`
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Log in via `/api/admin/login`
---

# Catalog Attribute — Create

Creates a new product attribute. Mirrors **Catalog → Attributes → Create** in
the Bagisto admin panel. The same event hooks fire
(`catalog.attribute.create.before` / `catalog.attribute.create.after`), so any
core listener (search reindex, cache flush, etc.) is triggered.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/attributes` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `code` | string | yes | Snake_case identifier. Must be unique and not a reserved word. |
| `admin_name` | string | yes | Internal admin label. |
| `type` | string | yes | One of `text`, `textarea`, `price`, `boolean`, `select`, `multiselect`, `checkbox`, `date`, `datetime`, `image`, `file`. |
| `swatch_type` | string\|null | no | `color`, `image`, or `text`. Only relevant for `select`/`multiselect`. |
| `is_required` / `is_unique` / `is_filterable` / `is_configurable` / `is_visible_on_front` / `is_comparable` / `value_per_locale` / `value_per_channel` / `enable_wysiwyg` | boolean | no | Standard attribute flags. |
| `validation` | string\|null | no | Validation rule (`numeric`, `email`, `decimal`, `url`). |
| `default_value` | string\|null | no | Default value for the attribute. |
| `position` | integer | no | Display order. |
| `translations` | object | no | Map of locale → `{ name }`. |
| `options` | array | no | Initial options (select/multiselect/checkbox only). Each entry: `{ admin_name, sort_order?, swatch_value?, translations? }`. |

## Response

`201 Created` returning the full attribute detail — identical shape to
[`GET /api/admin/catalog/attributes/{id}`](/api/rest-api/admin/catalog/attributes/attributes-detail).

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid Bearer token |
| `422 Unprocessable Entity` | Validation failure (missing/duplicate `code`, invalid `type`, malformed body) |

## Notes

- The `code` field is **immutable** after creation — see the [Update endpoint](/api/rest-api/admin/catalog/attributes/attributes-update).
- The repository returns a contract interface — the response is re-fetched as a full Eloquent model so the payload always carries `translations` and `options`.
- For attribute types that do not support options (`text`, `textarea`, `boolean`, etc.), the `options` array in the response is `null`.
