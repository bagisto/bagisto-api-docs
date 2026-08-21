---
outline: false
examples:
  - id: admin-catalog-attributes-list
    title: List Catalog Attributes (Datagrid)
    description: Cursor-paginated query returning the flat attribute list — the GraphQL equivalent of the admin Catalog → Attributes datagrid. Supports filtering by code, type, admin_name, boolean flags, and locale.
    query: |
      query AdminCatalogAttributes(
        $first: Int
        $after: String
        $type: String
        $isConfigurable: Int
        $locale: String
      ) {
        adminAttributes(
          first: $first
          after: $after
          type: $type
          isConfigurable: $isConfigurable
          locale: $locale
        ) {
          edges {
            cursor
            node {
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
              createdAt
              updatedAt
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          totalCount
        }
      }
    variables: |
      {
        "first": 10,
        "type": "select",
        "isConfigurable": 1,
        "locale": "en"
      }
    response: |
      {
        "data": {
          "adminAttributes": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
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
                  "createdAt": "2026-01-12T08:15:00+00:00",
                  "updatedAt": "2026-04-30T14:20:09+00:00"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "endCursor": "MA==",
              "startCursor": "MA=="
            },
            "totalCount": 1
          }
        }
      }
---

# Catalog Attributes — Datagrid Listing (GraphQL)

Cursor-paginated GraphQL query that mirrors the Bagisto admin **Catalog →
Attributes** datagrid. Returns the flat attribute list with filtering, sorting,
and cursor pagination.

For attribute types, options, and the configurable and filterable flags, see the [Attributes overview](/api/graphql-api/admin/catalog/attributes/).

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminAttributes` | Query | Cursor (`first` / `after`) |

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of items per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `last` | `Int` | Page size when paging backwards | `10` |
| `before` | `String` | Cursor from a previous `pageInfo.startCursor` | `"MA=="` |
| `id` | `String` | Filter by attribute ID — single integer or comma-separated list (e.g. `"1"` or `"1,2"`) | `"12"` |
| `code` | `String` | Partial attribute code match (SQL `LIKE %value%`) | `"color"` |
| `type` | `String` | Exact attribute type filter | `"select"` |
| `admin_name` | `String` | Partial admin name match (SQL `LIKE %value%`) | `"Color"` |
| `is_required` | `Int` | Filter by is_required: `0` = no, `1` = yes | `1` |
| `is_unique` | `Int` | Filter by is_unique: `0` = no, `1` = yes | `0` |
| `is_filterable` | `Int` | Filter by is_filterable: `0` = no, `1` = yes | `1` |
| `is_configurable` | `Int` | Filter by is_configurable: `0` = no, `1` = yes | `1` |
| `is_visible_on_front` | `Int` | Filter by is_visible_on_front: `0` = no, `1` = yes | `1` |
| `is_user_defined` | `Int` | Filter by is_user_defined: `0` = no, `1` = yes | `1` |
| `locale` | `String` | Locale code for translation resolution (default: app locale) | `"en"` |
| `sort` | `String` | Column to sort by (see Sorting section below) | `"id"` |
| `order` | `String` | Sort direction: `"asc"` or `"desc"` (default `"desc"`) | `"desc"` |

Every filter is a first-class GraphQL argument — pass them alongside `first` and `after`, not inside a nested filter object. Filters combine with AND, so each one narrows the result. Most filter names are snake_case (`admin_name`, `is_required`) while the node fields they filter are camelCase (`adminName`, `isRequired`); that mismatch is the literal schema.

## Node Fields

Each `edges[].node` object contains:

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
| `locale` | `String` | Locale code used for name resolution |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |

## Fields That Stay Null on the Listing

`translations`, `options`, `validation`, `defaultValue`, `isComparable`, `enableWysiwyg`, and `regex` are declared on the type but resolve only on the item query [`adminAttribute(id:)`](/api/graphql-api/admin/catalog/attributes/attributes-detail). Selecting them here is not an error — you simply get `null`.

`swatchType` and `position` are also frequently `null` on the listing, but for a different reason: they are genuinely unset on most attributes rather than withheld.

## Sorting

Pass `sort` with the column name and `order` for direction.

**Sortable columns:**

| `sort` value | Sorts by |
|---|---|
| `id` | Attribute ID (default) |
| `code` | Attribute code |
| `admin_name` | Admin label |
| `type` | Attribute type |
| `position` | Display order position |

## Cursor Pagination

- `first` controls the page size (default `10`, max `50`).
- To fetch the next page, pass the `pageInfo.endCursor` value as `after` in the
  next request.
- `totalCount` reflects the full count of matching attributes across all pages.

## Behaviour Worth Knowing

- **The boolean flags are integers, not booleans.** `isRequired`, `isUnique`, `isFilterable`, `isConfigurable`, `isVisibleOnFront`, `isUserDefined`, `valuePerLocale`, and `valuePerChannel` all come back as `0` or `1`. Note `0` is falsy in JavaScript but `"0"` would not be — these are real `Int`s here, unlike the product listing where the same concepts are strings.
- **System attributes are included.** The listing returns both Bagisto's built-in attributes and admin-created ones. Pass `is_user_defined: 1` for admin-created only — useful because system attributes cannot be deleted.
- **`swatchType` is only meaningful for swatch-capable types.** It stays `null` on a plain `text` or `select` attribute rather than carrying a default.
- **REST returns the same rows** through `GET /api/admin/catalog/attributes`, with identical filter and sort semantics.
