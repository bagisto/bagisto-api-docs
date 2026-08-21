---
outline: false
apiType: rest
examples:
  - id: admin-catalog-categories-list
    title: List Catalog Categories (Datagrid)
    description: Paginated, filterable, sortable category list mirroring the Bagisto admin Catalog → Categories datagrid. Returns the standard `{ data, meta }` envelope.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/categories?per_page=10&page=1&status=1&sort=name-asc" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      per_page=10&page=1&status=1&sort=name-asc
    response: |
      {
        "data": [
          {
            "id": 7,
            "position": 1,
            "status": 1,
            "parentId": 1,
            "displayMode": "products_and_description",
            "logoUrl": null,
            "bannerUrl": null,
            "name": "Apparel",
            "slug": "apparel",
            "description": "Men's and women's apparel",
            "locale": "en",
            "createdAt": "2026-01-12T08:15:00+00:00",
            "updatedAt": "2026-04-30T14:20:09+00:00",
            "translations": null,
            "filterableAttributeIds": null
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

# Catalog Categories — Datagrid Listing

Paginated, filterable, and sortable category list that mirrors the Bagisto admin
**Catalog → Categories** datagrid 1:1. This is the authoritative category-management
listing for the admin API — same columns, same filters, and the same sort options
used by the datagrid.

For the flat-list versus tree shapes, hierarchy and move semantics, and display modes, see the [Categories overview](/api/rest-api/admin/catalog/categories/).

This endpoint returns a **flat, paginated list**, which is what a datagrid needs. For the nested hierarchy behind a tree picker use [`GET /api/admin/catalog/categories/tree`](/api/rest-api/admin/catalog/categories/categories-tree) instead.

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/categories` | GET | Admin Bearer token |

## Query Parameters

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `page` | integer | Page number (1-based, default `1`) | `1` |
| `per_page` | integer | Items per page (default `10`, max `50`) | `10` |
| `category_id` | string | Filter by category ID — single integer or comma-separated list (e.g. `"12"` or `"12,18"`) | `7` |
| `name` | string | Partial category name match (SQL `LIKE %value%`) | `Apparel` |
| `position` | integer | Exact position filter | `1` |
| `status` | integer | Filter by status: `0` = disabled, `1` = enabled | `1` |
| `parent_id` | integer | Filter by parent category ID | `1` |
| `locale` | string | Locale code for translation resolution (default: app locale) | `en` |
| `sort` | string | Column to sort by (see Sorting section below) | `id` |
| `order` | string | Sort direction: `asc` or `desc` (default `desc`) | `desc` |

## Response Shape

Responses use the standard admin `{ data, meta }` envelope.

### `meta` object

| Field | Type | Description |
|-------|------|-------------|
| `currentPage` | integer | Current page number (1-based) |
| `perPage` | integer | Number of items on this page |
| `lastPage` | integer | Total number of pages |
| `total` | integer | Total matching categories |
| `from` | integer | 1-based index of the first item on this page |
| `to` | integer | 1-based index of the last item on this page |

### Row fields (`data[]`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Category ID |
| `position` | integer | Display order position |
| `status` | integer | `1` = enabled, `0` = disabled |
| `parentId` | integer\|null | ID of the parent category; `null` for root nodes |
| `displayMode` | string\|null | How the category page is displayed (e.g. `products_and_description`) |
| `logoUrl` | string\|null | Storage URL for the category logo; `null` if not set |
| `bannerUrl` | string\|null | Storage URL for the category banner; `null` if not set |
| `name` | string\|null | Category name resolved via `locale` |
| `slug` | string\|null | URL slug (e.g. `apparel`) |
| `description` | string\|null | Category description in the resolved locale |
| `locale` | string\|null | Locale code used for resolution |
| `createdAt` | string\|null | ISO 8601 creation timestamp |
| `updatedAt` | string\|null | ISO 8601 last-update timestamp |
| `translations` | null | Always `null` in list responses — full translations are available via the detail endpoint `GET /api/admin/catalog/categories/{id}` |
| `filterableAttributeIds` | null | Always `null` in list responses — available via the detail endpoint |

## Sorting

Two forms are accepted — choose whichever suits your client:

| Form | Example |
|------|---------|
| Compound `sort` param | `?sort=name-asc` |
| Separate `sort` + `order` params | `?sort=name&order=asc` |

When both `order` and a compound `sort` value are present, the explicit `order`
param takes precedence.

**Sortable columns:**

| `sort` value | Sorts by |
|---|---|
| `id` | Category ID (default) |
| `name` | Category name |
| `position` | Display order position |
| `status` | Enabled/disabled status |

## Pagination

- Default page size: **10** items
- Maximum page size: **50** items
- Use `?page=N` for page navigation and `?per_page=N` to control page size

## Errors

| HTTP | Detail |
|------|--------|
| `401` | `Unauthenticated.` |

The listing never rejects a bad filter. An unknown parameter is ignored, and an out-of-range `status` is dropped rather than applied — both return the full unfiltered list, so a wrong filter looks like a successful query. `?per_page=999` is clamped to `50`, and `?per_page=0` falls back to `10`.

## Fields That Stay Null on the Listing

`translations` and `filterableAttributeIds` are present on every row but always `null`. Both resolve only on [`GET /api/admin/catalog/categories/{id}`](/api/rest-api/admin/catalog/categories/categories-detail), which returns all locale translations in one call.

## Behaviour Worth Knowing

- **No implicit status filter.** Every status is returned so an admin can find a disabled category. Pass `?status=1` for enabled only.
- **`parent_id` returns direct children only**, not the whole subtree. For a full branch use the tree endpoint with `?rootId=<id>`.
- **`name`, `slug`, and `description` are per-locale.** A category with no translation in the requested locale returns `null` for all three — the row still appears, so an empty name is not a missing category.
- **Scalars are real types.** `status`, `position`, and `parentId` are integers, and timestamps are ISO 8601 with offset — note the product listing uses `2026-04-19 11:56:43` instead, so the two are not interchangeable.
