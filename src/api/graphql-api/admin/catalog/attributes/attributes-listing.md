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
        $is_configurable: Int
        $locale: String
      ) {
        adminCatalogAdminAttributes(
          first: $first
          after: $after
          type: $type
          is_configurable: $is_configurable
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
        "is_configurable": 1,
        "locale": "en"
      }
    response: |
      {
        "data": {
          "adminCatalogAdminAttributes": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
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

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminCatalogAdminAttributes` | Query | Cursor (`first` / `after`) |

::: tip Operation name
API Platform derives the GraphQL operation name from the resource `shortName`.
`AdminAttribute` has `shortName: 'AdminAttribute'`, so the collection query is
`adminCatalogAdminAttributes` (the `Catalog` segment is the API tag, not part of
the name). The item query is `adminAttribute(id: ID!)`.
:::

## Authentication

Every request must include an admin Bearer token:

```
Authorization: Bearer <token>
```

Obtain a token via the [`createAdminLogin`](/api/graphql-api/admin/authentication)
mutation.

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of items per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
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

::: tip extraArgs convention
API Platform does not automatically expose filter arguments in the GraphQL schema
for `QueryCollection` operations. This query uses `extraArgs` declared on the
`QueryCollection` operation to surface all filter/sort arguments as first-class
GraphQL arguments. Pass them directly alongside `first` and `after`.
:::

## Node Fields

Each `edges[].node` object contains:

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
| `locale` | `String` | Locale code used for name resolution |
| `createdAt` | `String` | ISO 8601 creation timestamp |
| `updatedAt` | `String` | ISO 8601 last-update timestamp |

::: warning translations and options not available in listing
`translations` and `options` are **not returned** in this query — they are only
available in the item query `adminAttribute(id: ID!)`. Use the item query when
you need per-locale display names or option lists for a specific attribute.
:::

## Example Query

```graphql
query AdminCatalogAttributes(
  $first: Int
  $after: String
  $type: String
  $is_configurable: Int
  $locale: String
) {
  adminCatalogAdminAttributes(
    first: $first
    after: $after
    type: $type
    is_configurable: $is_configurable
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
```

```json
{
  "first": 10,
  "type": "select",
  "is_configurable": 1,
  "locale": "en"
}
```

## Example Response

```json
{
  "data": {
    "adminCatalogAdminAttributes": {
      "edges": [
        {
          "cursor": "MA==",
          "node": {
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
```

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

## Notes

- **Same provider as the REST endpoint** — `AdminAttributeCollectionProvider` serves both transports with identical filter and sort semantics.
- **No automatic filter applied.** All attributes (system and user-defined) are returned by default. Pass `is_user_defined: 1` to restrict to admin-created attributes.
- **`extraArgs` declares custom arguments.** The filter/sort arguments are not part of the standard API Platform GraphQL schema for `QueryCollection` — they are explicitly declared via `extraArgs` on the operation. Pass them at the top level of the query, alongside `first` and `after`.
- **Scalar GraphQL quirk:** camelCase fields (`isRequired`, `isConfigurable`, etc.) may return `null` over GraphQL for some installations — a known pre-existing limitation in the project's scalar name conversion for non-string fields. Use the REST listing endpoint if you need guaranteed non-null boolean/integer values.
