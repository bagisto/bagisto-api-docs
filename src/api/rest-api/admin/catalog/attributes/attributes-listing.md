---
outline: false
apiType: rest
examples:
  - id: admin-catalog-attributes-list
    title: List Catalog Attributes (Datagrid)
    description: Paginated, filterable, sortable attribute list mirroring the Bagisto admin Catalog → Attributes datagrid. Returns the standard `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/attributes?per_page=10&page=1&type=select&sort=id&order=desc" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      per_page=10&page=1&type=select&sort=id&order=desc
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "sku",
            "type": "text",
            "adminName": "SKU",
            "isRequired": 1,
            "isUnique": 1,
            "valuePerLocale": 0,
            "valuePerChannel": 0,
            "isFilterable": 0,
            "isConfigurable": 0,
            "isVisibleOnFront": 0,
            "isUserDefined": 0,
            "swatchType": null,
            "position": 1,
            "locale": "en",
            "createdAt": "2024-01-01T00:00:00+00:00",
            "updatedAt": "2024-01-01T00:00:00+00:00",
            "translations": null,
            "options": null,
            "validation": null,
            "defaultValue": null
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 5,
          "total": 47,
          "from": 1,
          "to": 10
        }
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Attributes — Datagrid Listing

Paginated, filterable, and sortable attribute list that mirrors the Bagisto admin
**Catalog → Attributes** datagrid 1:1. This is the authoritative attribute-management
listing for the admin API — same columns, same filters, and the same sort options
used by the datagrid.

::: tip How this menu works
For attribute types, options, and the configurable/filterable flags, see the [Attributes overview](/api/rest-api/admin/catalog/attributes/).
:::

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/attributes` | GET | Admin Bearer token |

## Authentication

Every request requires:

```
Authorization: Bearer <token>
```

Obtain the Bearer token via [Authentication](/api/rest-api/admin/authentication).

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | integer | Page number (1-based, default `1`) | `1` |
| `per_page` | integer | Items per page (default `10`, max `50`) | `10` |
| `id` | string | Filter by attribute ID — single integer or comma-separated list (e.g. `"1"` or `"1,2"`) | `1` |
| `code` | string | Partial attribute code match (SQL `LIKE %value%`) | `color` |
| `type` | string | Exact attribute type filter | `select` |
| `admin_name` | string | Partial admin name match (SQL `LIKE %value%`) | `Color` |
| `is_required` | integer | Filter by is_required: `0` = no, `1` = yes | `1` |
| `is_unique` | integer | Filter by is_unique: `0` = no, `1` = yes | `0` |
| `is_filterable` | integer | Filter by is_filterable: `0` = no, `1` = yes | `1` |
| `is_configurable` | integer | Filter by is_configurable: `0` = no, `1` = yes | `0` |
| `is_visible_on_front` | integer | Filter by is_visible_on_front: `0` = no, `1` = yes | `1` |
| `is_user_defined` | integer | Filter by is_user_defined: `0` = no, `1` = yes | `1` |
| `value_per_locale` | integer | Filter by value_per_locale: `0` = no, `1` = yes | `0` |
| `value_per_channel` | integer | Filter by value_per_channel: `0` = no, `1` = yes | `0` |
| `locale` | string | Locale code for translation resolution (default: app locale) | `en` |
| `sort` | string | Column to sort by (see Sorting section below) | `id` |
| `order` | string | Sort direction: `asc` or `desc` (default `desc`) | `desc` |

**Valid `type` values:** `text`, `textarea`, `price`, `boolean`, `select`, `multiselect`, `datetime`, `date`, `image`, `file`, `checkbox`

## Response Shape

Responses use the standard admin `{ data, meta }` envelope.

### `meta` object

| Field | Type | Description |
|-------|------|-------------|
| `currentPage` | integer | Current page number (1-based) |
| `perPage` | integer | Number of items on this page |
| `lastPage` | integer | Total number of pages |
| `total` | integer | Total matching attributes |
| `from` | integer | 1-based index of the first item on this page |
| `to` | integer | 1-based index of the last item on this page |

### Row fields (`data[]`)

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
| `locale` | string\|null | Locale code used for name resolution |
| `createdAt` | string\|null | ISO 8601 creation timestamp |
| `updatedAt` | string\|null | ISO 8601 last-update timestamp |
| `translations` | null | Always `null` in list responses — full translations are available via the detail endpoint `GET /api/admin/catalog/attributes/{id}` |
| `options` | null | Always `null` in list responses — option data is available via the detail endpoint |
| `validation` | null | Always `null` in list responses — available via the detail endpoint |
| `defaultValue` | null | Always `null` in list responses — available via the detail endpoint |

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/attributes?per_page=10&page=1&type=select&sort=id&order=desc" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response

```json
{
  "data": [
    {
      "id": 1,
      "code": "sku",
      "type": "text",
      "adminName": "SKU",
      "isRequired": 1,
      "isUnique": 1,
      "valuePerLocale": 0,
      "valuePerChannel": 0,
      "isFilterable": 0,
      "isConfigurable": 0,
      "isVisibleOnFront": 0,
      "isUserDefined": 0,
      "swatchType": null,
      "position": 1,
      "locale": "en",
      "createdAt": "2024-01-01T00:00:00+00:00",
      "updatedAt": "2024-01-01T00:00:00+00:00",
      "translations": null,
      "options": null,
      "validation": null,
      "defaultValue": null
    }
  ],
  "meta": {
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 5,
    "total": 47,
    "from": 1,
    "to": 10
  }
}
```

## Sorting

| Parameter form | Example |
|----------------|---------|
| Separate `sort` + `order` params | `?sort=id&order=desc` |

**Sortable columns:**

| `sort` value | Sorts by |
|---|---|
| `id` | Attribute ID (default) |
| `code` | Attribute code |
| `admin_name` | Admin label |
| `type` | Attribute type |
| `position` | Display order position |

## Pagination

- Default page size: **10** items
- Maximum page size: **50** items
- Use `?page=N` for page navigation and `?per_page=N` to control page size

## Errors

| HTTP Status | Cause |
|-------------|-------|
| `401 Unauthorized` | Missing, expired, or revoked admin Bearer token |
| `401 Unauthorized` | Missing or invalid admin Bearer token |

**Unknown filter parameters** are silently ignored — no error is returned.

## Notes

- **`translations`, `options`, `validation`, and `defaultValue` are always `null` in list rows.** These detail-only fields are only populated by `GET /api/admin/catalog/attributes/{id}`, which loads all locale translations and — for `select`, `multiselect`, and `checkbox` types — all options with their own translations.
- **`adminName`** is the value from the `attributes.admin_name` column. It is not locale-aware — it is the internal admin label set when the attribute was created.
- **`locale` query parameter** controls which `attribute_translations` row is used to resolve any locale-specific display name in the provider. If no translation exists for the requested locale, the `adminName` column value is used as a fallback.
- **No automatic filter applied.** This endpoint returns all attributes (system and user-defined). Pass `?is_user_defined=1` to restrict to admin-created attributes, or `?is_user_defined=0` for system attributes only.
- Envelope-wrapped: `{ data: [...], meta: { currentPage, perPage, lastPage, total, from, to } }`.
- `per_page` caps at **50**; values ≤ 0 fall back to the default of **10**.
