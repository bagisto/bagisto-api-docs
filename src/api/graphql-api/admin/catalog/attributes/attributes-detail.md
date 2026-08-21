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
          isComparable
          enableWysiwyg
          regex
          createdAt
          updatedAt
          translations
          options
        }
      }
    variables: |
      {
        "id": "/api/admin/catalog/attributes/12"
      }
    response: |
      {
        "data": {
          "adminAttribute": {
            "id": "/api/admin/catalog/attributes/12",
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
            "isComparable": 0,
            "enableWysiwyg": 0,
            "regex": null,
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

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `ID!` | Yes | API Platform IRI of the attribute (e.g. `"/api/admin/catalog/attributes/12"`) |

Take the IRI straight from the `id` of an [`adminAttributes`](/api/graphql-api/admin/catalog/attributes/attributes-listing) edge node, or build it as `/api/admin/catalog/attributes/<numericId>`.

## Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/catalog/attributes/12`) |
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
| `isComparable` | `Int` | `1` if shown in the storefront product-compare table, else `0` |
| `enableWysiwyg` | `Int` | `1` if a rich-text editor is used for a `textarea` attribute, else `0` |
| `regex` | `String` | Custom regex pattern, used when `validation` is `regex`; `null` otherwise |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |
| `translations` | scalar (JSON array) | All locale translations — see shape below |
| `options` | Iterable | Options for `select`, `multiselect`, and `checkbox` types; `[]` for every other type |

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

### Translations and Options Are JSON Scalars

Select `translations` and `options` as **bare fields** — a sub-selection is a schema error. Each returns its whole structure in one piece, including every option's own nested `translations`.

An option carries `id` (numeric, not an IRI), `adminName`, `sortOrder`, `swatchValue`, `swatchValueUrl`, and `translations`. Only `select`, `multiselect`, and `checkbox` attributes have options; every other type returns an empty list.

## Errors

| Condition | Result |
|-----------|--------|
| Unknown or deleted id | HTTP `200` with `Attribute not found.` in `errors[]` and `null` in `data.adminAttribute` |
| Missing or invalid token | HTTP `401` with `{"message": "Unauthenticated.", "error": "unauthenticated"}` — rejected by the transport before GraphQL runs |

## Working With This Query

- **`options` is `[]` for a non-option type, not `null`.** Only `select`, `multiselect`, and `checkbox` carry options; a `text` attribute returns an empty list. Test the length, not for null.
- **`translations` carries one entry per stored locale row**, not just the requested one, so a multi-locale store returns them all.
- **An option's `id` is the numeric option id**, not an IRI — unlike the attribute's own `id`. Send that number when referencing the option on a product's attribute value.
- **The boolean flags are integers**, `0` or `1`, not booleans.
- **The `id` argument is the IRI, not the number.** Build it as `/api/admin/catalog/attributes/<_id>` or pass a listing edge's `id` straight through.
