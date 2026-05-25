---
outline: false
examples:
  - id: admin-catalog-attribute-detail
    title: Attribute Detail (with translations and options)
    description: Fetch a single attribute by IRI including all locale translations and — for select/multiselect/checkbox types — all options with their own translations.
    query: |
      query AdminCatalogAttribute($id: ID!) {
        adminAttribute(id: $id) {
          id
          _id
          code
          type
          adminName
          isRequired
          isUnique
          valuePerLocale
          valuePerChannel
          isFilterable
          isConfigurable
          isVisibleOnFront
          isUserDefined
          swatchType
          position
          locale
          validation
          defaultValue
          createdAt
          updatedAt
          translations
          options
        }
      }
    variables: |
      {
        "id": "/api/admin/admin_attributes/12"
      }
    response: |
      {
        "data": {
          "adminAttribute": {
            "id": "/api/admin/admin_attributes/12",
            "_id": 12,
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
            "validation": null,
            "defaultValue": null,
            "createdAt": "2026-01-12T08:15:00+00:00",
            "updatedAt": "2026-04-30T14:20:09+00:00",
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
        }
      }
---

# Catalog Attribute — Detail (GraphQL)

GraphQL item query that returns a single attribute by its IRI, including the
**full translations array** (every locale present in the database) and — for
`select`, `multiselect`, and `checkbox` types — all **options** with their own
locale translations.

This is the query to call when an admin needs complete metadata for an attribute —
e.g. when pre-populating the edit form in Catalog → Attributes.

## Operation

| Operation | Type |
|-----------|------|
| `adminAttribute` | Query (item) |

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the attribute (e.g. `"/api/admin/admin_attributes/12"`) |

::: tip Finding the IRI
The IRI can be taken directly from `id` in any `adminCatalogAdminAttributes` edge
node, or constructed as `/api/admin/admin_attributes/{numericId}`.
:::

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/admin_attributes/12`) |
| `_id` | `Int` | Raw attribute ID |
| `code` | `String` | Attribute code (e.g. `color`, `size`) |
| `type` | `String` | Attribute type (e.g. `select`, `text`, `boolean`) |
| `adminName` | `String` | Internal admin-facing label |
| `isRequired` | `Int` | `1` = required on product forms |
| `isUnique` | `Int` | `1` = value must be unique across products |
| `valuePerLocale` | `Int` | `1` = separate value per store locale |
| `valuePerChannel` | `Int` | `1` = separate value per channel |
| `isFilterable` | `Int` | `1` = appears in layered navigation |
| `isConfigurable` | `Int` | `1` = used as a configurable variant axis |
| `isVisibleOnFront` | `Int` | `1` = shown on the storefront product page |
| `isUserDefined` | `Int` | `1` = admin-created (not a system attribute) |
| `swatchType` | `String` | Swatch mode (`color`, `image`, `text`); `null` for non-swatch types |
| `position` | `Int` | Display order position |
| `locale` | `String` | App locale used for top-level scalar fields |
| `validation` | `String` | Validation rule string (e.g. `numeric`, `email`); `null` if none |
| `defaultValue` | `String` | Default value; `null` if not configured |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |
| `translations` | scalar (JSON array) | All locale translations — see shape below |
| `options` | scalar (JSON array\|null) | Options for `select`/`multiselect`/`checkbox` types; `null` for other types |

### `translations` item shape

`translations` is returned as a **plain JSON array** (scalar in GraphQL). Each
element corresponds to one locale row in `attribute_translations`:

| Key | Type | Description |
|-----|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `name` | string\|null | Locale-specific attribute display name |

### `options[]` item shape

`options` is returned as a **plain JSON array** (scalar in GraphQL). Each element
corresponds to one row in `attribute_options`:

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Option ID |
| `adminName` | string | Internal admin label for the option |
| `sortOrder` | integer | Display sort order |
| `swatchValue` | string\|null | Swatch value (hex for `color`, path for `image`, text for `text`); `null` otherwise |
| `swatchValueUrl` | string\|null | Full URL to the swatch image for `image` swatches; `null` for other types |
| `translations` | array | Locale translations for this option (see below) |

### `options[].translations[]` item shape

| Key | Type | Description |
|-----|------|-------------|
| `locale` | string | Locale code (e.g. `en`, `fr`) |
| `label` | string\|null | Locale-specific display label for the option |

## Example Query

```graphql
query AdminCatalogAttribute($id: ID!) {
  adminAttribute(id: $id) {
    id
    _id
    code
    type
    adminName
    isRequired
    isUnique
    valuePerLocale
    valuePerChannel
    isFilterable
    isConfigurable
    isVisibleOnFront
    isUserDefined
    swatchType
    position
    locale
    validation
    defaultValue
    createdAt
    updatedAt
    translations
    options
  }
}
```

```json
{
  "id": "/api/admin/admin_attributes/12"
}
```

## Example Response

```json
{
  "data": {
    "adminAttribute": {
      "id": "/api/admin/admin_attributes/12",
      "_id": 12,
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
      "validation": null,
      "defaultValue": null,
      "createdAt": "2026-01-12T08:15:00+00:00",
      "updatedAt": "2026-04-30T14:20:09+00:00",
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
  }
}
```

## Errors

| Scenario | GraphQL `errors[]` | HTTP Status |
|----------|-------------------|-------------|
| Unknown ID | `"Attribute not found"` in `errors[]`, `data.adminAttribute: null` | `200` (GraphQL convention) |
| Missing auth | `"Unauthenticated"` in `errors[]` | `200` |

## Notes

- **`translations` and `options` are plain JSON scalars**, not typed GraphQL object lists. You access them as regular JSON arrays in the response. This avoids API Platform serializing nested objects as IRI strings instead of inline objects — a known behaviour when using nested DTO types in API Platform GraphQL.
- **`options` is `null` for non-option types.** Only `select`, `multiselect`, and `checkbox` attributes have options. For all other types, `options` is `null`.
- **`translations` contains every locale in the DB**, not just the current app locale. If the store has translations for `en`, `fr`, and `de`, all three entries are returned. Missing locale entries have `null` name.
- **The `id` argument is the IRI**, not the numeric integer. Use the `_id` field from listing queries and construct `"/api/admin/admin_attributes/{_id}"`, or pass the `id` field directly from a listing result.
- **Same provider as the REST detail endpoint** — `AdminAttributeItemProvider` serves both transports with identical data loading semantics. Both return `translations` as a plain associative array, not a sub-resource.
- **Scalar GraphQL quirk:** camelCase integer fields (`isRequired`, `isConfigurable`, etc.) may return `null` over GraphQL for some installations — a known pre-existing project-wide limitation. `code`, `type`, `adminName`, `locale`, `createdAt`, `updatedAt`, `translations`, and `options` are not affected (string/array scalars resolve correctly). Use the REST detail endpoint if you need guaranteed non-null integer flag values.
