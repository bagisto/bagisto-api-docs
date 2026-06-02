---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attribute-detail
    title: Attribute Detail (with translations and options)
    description: Single attribute record including all locale translations and — for select/multiselect/checkbox types — all options, each with their own locale translations.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/attributes/12" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      id=12
    response: |
      {
        "id": 12,
        "code": "color",
        "type": "select",
        "adminName": "Color",
        "isRequired": 0,
        "isUnique": 0,
        "valuePerLocale": 0,
        "valuePerChannel": 0,
        "isFilterable": 1,
        "isConfigurable": 1,
        "isVisibleOnFront": 1,
        "isUserDefined": 1,
        "swatchType": "color",
        "position": 5,
        "locale": "en",
        "createdAt": "2026-01-12T08:15:00+00:00",
        "updatedAt": "2026-04-30T14:20:09+00:00",
        "validation": null,
        "defaultValue": null,
        "translations": [
          { "locale": "en", "name": "Color" },
          { "locale": "fr", "name": "Couleur" }
        ],
        "options": [
          {
            "id": 33,
            "adminName": "Red",
            "sortOrder": 1,
            "swatchValue": "#FF0000",
            "swatchValueUrl": null,
            "translations": [
              { "locale": "en", "label": "Red" },
              { "locale": "fr", "label": "Rouge" }
            ]
          },
          {
            "id": 34,
            "adminName": "Blue",
            "sortOrder": 2,
            "swatchValue": "#0000FF",
            "swatchValueUrl": null,
            "translations": [
              { "locale": "en", "label": "Blue" },
              { "locale": "fr", "label": "Bleu" }
            ]
          }
        ]
      }
    commonErrors:
      - error: Not Found (404)
        cause: The attribute ID does not exist in the database
        solution: 'Verify the ID with the listing endpoint `GET /api/admin/catalog/attributes`'

      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Attribute — Detail

Returns a single attribute record by ID, including the **full translations array**
(every locale present in the database) and — for `select`, `multiselect`, and
`checkbox` attribute types — all **options**, each with their own locale translations.

This is the read endpoint to call when an admin needs the complete metadata for
an attribute — e.g. when opening the edit form in the Catalog → Attributes UI.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/attributes/{id}` | GET | Admin Bearer token |

`{id}` must be a positive integer. Non-numeric values are rejected by a route
requirement (`\d+`) — this prevents the `{id}` segment from matching any other
path under `/catalog/attributes/`.

## Authentication

Every request requires:

```
Authorization: Bearer <token>
```

Obtain the Bearer token via [Authentication](/api/rest-api/admin/authentication).

## Path Parameter

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | The numeric attribute ID |

## Response Shape

The response is a single JSON object (not wrapped in `{ data }`) with the
following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute ID |
| `code` | string | Attribute code (e.g. `color`, `size`) |
| `type` | string | Attribute type (e.g. `select`, `text`, `boolean`) |
| `adminName` | string | Internal admin-facing label |
| `isRequired` | integer | `1` = required on product forms, `0` = optional |
| `isUnique` | integer | `1` = value must be unique across products |
| `valuePerLocale` | integer | `1` = separate value per store locale |
| `valuePerChannel` | integer | `1` = separate value per channel |
| `isFilterable` | integer | `1` = attribute appears in layered navigation filters |
| `isConfigurable` | integer | `1` = used as a configurable variant axis |
| `isVisibleOnFront` | integer | `1` = shown on the product page storefront |
| `isUserDefined` | integer | `1` = created by an admin user (not a system attribute) |
| `swatchType` | string\|null | Swatch rendering mode (`color`, `image`, `text`); `null` for non-swatch types |
| `position` | integer | Display order position |
| `locale` | string\|null | App locale used for the top-level scalar fields |
| `createdAt` | string\|null | ISO 8601 creation timestamp |
| `updatedAt` | string\|null | ISO 8601 last-update timestamp |
| `validation` | string\|null | Validation rule string (e.g. `numeric`, `email`); `null` if none |
| `defaultValue` | string\|null | Default value for the attribute; `null` if not configured |
| `translations` | array | All locale translations (see below) |
| `options` | array\|null | Attribute options for `select`, `multiselect`, `checkbox` types; `null` for all other types |

### `translations[]` item shape

Each entry in the `translations` array corresponds to one locale row in
`attribute_translations`:

| Field | Type | Description |
|-------|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `name` | string\|null | Locale-specific attribute display name |

### `options[]` item shape

Each entry represents one attribute option (row in `attribute_options`):

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Option ID |
| `adminName` | string | Internal admin label for the option |
| `sortOrder` | integer | Display sort order |
| `swatchValue` | string\|null | Swatch value — hex color code for `color` swatches, storage path for `image` swatches, display text for `text` swatches; `null` if not a swatch type |
| `swatchValueUrl` | string\|null | Full URL to the swatch image for `image` swatches; `null` for other swatch types or no image |
| `translations` | array | Locale translations for this option (see below) |

### `options[].translations[]` item shape

Each entry corresponds to one row in `attribute_option_translations`:

| Field | Type | Description |
|-------|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `label` | string\|null | Locale-specific display label for the option |

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/attributes/12" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response

```json
{
  "id": 12,
  "code": "color",
  "type": "select",
  "adminName": "Color",
  "isRequired": 0,
  "isUnique": 0,
  "valuePerLocale": 0,
  "valuePerChannel": 0,
  "isFilterable": 1,
  "isConfigurable": 1,
  "isVisibleOnFront": 1,
  "isUserDefined": 1,
  "swatchType": "color",
  "position": 5,
  "locale": "en",
  "createdAt": "2026-01-12T08:15:00+00:00",
  "updatedAt": "2026-04-30T14:20:09+00:00",
  "validation": null,
  "defaultValue": null,
  "translations": [
    { "locale": "en", "name": "Color" },
    { "locale": "fr", "name": "Couleur" }
  ],
  "options": [
    {
      "id": 33,
      "adminName": "Red",
      "sortOrder": 1,
      "swatchValue": "#FF0000",
      "swatchValueUrl": null,
      "translations": [
        { "locale": "en", "label": "Red" },
        { "locale": "fr", "label": "Rouge" }
      ]
    },
    {
      "id": 34,
      "adminName": "Blue",
      "sortOrder": 2,
      "swatchValue": "#0000FF",
      "swatchValueUrl": null,
      "translations": [
        { "locale": "en", "label": "Blue" },
        { "locale": "fr", "label": "Bleu" }
      ]
    }
  ]
}
```

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Missing or invalid admin Bearer token |
| `404 Not Found` | The specified `{id}` does not exist in the database |

## Notes

- **`translations` contains every locale in the DB**, not just the current app locale. If the store has translations for `en`, `fr`, and `de`, all three entries are returned. Fields with no content for a locale are `null`.
- **`options` is `null` for non-option types.** Only `select`, `multiselect`, and `checkbox` attributes have options. For all other types (`text`, `textarea`, `price`, `boolean`, `datetime`, `date`, `image`, `file`), `options` is `null`.
- **`translations` and `options` are plain arrays**, not IRIs. Nested objects (options and their translations) are serialized inline in the response — there are no follow-up requests needed.
- **The `{id}` route parameter must be a digit.** The route carries a `requirements: ['id' => '\d+']` constraint — non-numeric path segments are rejected with `404` before reaching the provider.
- **`swatchValueUrl`** is only non-null for options of attributes with `swatch_type = 'image'`. For `color` and `text` swatches, `swatchValue` carries the display value directly and `swatchValueUrl` is always `null`.
- **`validation`** holds the validation rule string stored in `attributes.validation` (e.g. `numeric`, `email`, `decimal`, `url`). `null` means no validation rule is configured for the attribute.
- **Top-level `locale`** reflects the app's current default locale. It is a convenience indicator — use `translations` to get display names in other locales.
