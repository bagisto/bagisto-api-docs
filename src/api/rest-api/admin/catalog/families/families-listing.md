---
outline: false
apiType: rest
examples:
  - id: admin-catalog-families-list
    title: List Attribute Families (Datagrid)
    description: Paginated, filterable, sortable attribute family list mirroring the Bagisto admin Catalog → Attribute Families datagrid. Returns the standard `{ data, meta }` envelope. Only 3 columns are returned — id, code, name — because the underlying table carries no timestamps.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/families?per_page=10&page=1&sort=id&order=desc" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/json"
    variables: |
      per_page=10&page=1&sort=id&order=desc
    response: |
      {
        "data": [
          {
            "id": 1,
            "code": "default",
            "name": "Default"
          },
          {
            "id": 3,
            "code": "apparel",
            "name": "Apparel"
          }
        ],
        "meta": {
          "currentPage": 1,
          "perPage": 10,
          "lastPage": 1,
          "total": 2,
          "from": 1,
          "to": 2
        }
      }
    commonErrors:
      - error: Unauthorized (401)
        cause: Missing, invalid, expired, or revoked admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.

---

# Catalog Attribute Families — Datagrid Listing

Paginated, filterable, and sortable attribute family list that mirrors the Bagisto
admin **Catalog → Attribute Families** datagrid 1:1. This is the authoritative
family-management listing for the admin API — same 3 columns and the same sort
options used by the datagrid.

::: tip How this menu works
For how a family's attribute groups + attributes are structured and the delete guards, see the [Attribute Families overview](/api/rest-api/admin/catalog/families/).
:::

## Endpoint

| Endpoint | Method | Authentication |
|----------|--------|----------------|
| `/api/admin/catalog/families` | GET | Admin Bearer token |

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
| `id` | string | Filter by family ID — single integer or comma-separated list (e.g. `"1"` or `"1,2"`) | `1` |
| `code` | string | Partial family code match (SQL `LIKE %value%`) | `default` |
| `name` | string | Partial family name match (SQL `LIKE %value%`) | `Default` |
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
| `total` | integer | Total matching families |
| `from` | integer | 1-based index of the first item on this page |
| `to` | integer | 1-based index of the last item on this page |

### Row fields (`data[]`)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Attribute family ID |
| `code` | string | Family code (e.g. `default`, `apparel`) |
| `name` | string | Family display name (e.g. `Default`, `Apparel`) |

::: tip Slim listing by design
The listing returns only 3 columns. The `attribute_families` table carries no
timestamps (`$timestamps = false` on the Eloquent model), so `createdAt` and
`updatedAt` do not exist. Attribute groups and their associated attributes are
only available via the detail endpoint `GET /api/admin/catalog/families/{id}`.
:::

## Example Request

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/families?per_page=10&page=1&sort=id&order=desc" \
  -H "Authorization: Bearer <token>" \
  -H "Accept: application/json"
```

## Example Response

```json
{
  "data": [
    {
      "id": 1,
      "code": "default",
      "name": "Default"
    },
    {
      "id": 3,
      "code": "apparel",
      "name": "Apparel"
    }
  ],
  "meta": {
    "currentPage": 1,
    "perPage": 10,
    "lastPage": 1,
    "total": 2,
    "from": 1,
    "to": 2
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
| `id` | Family ID (default) |
| `code` | Family code |
| `name` | Family display name |

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

- **Only 3 columns are returned.** The listing mirrors the admin datagrid exactly: `id`, `code`, `name`. No timestamps exist on the `attribute_families` table. No attribute-group or attribute data is included — use `GET /api/admin/catalog/families/{id}` for the full nested payload.
- **No automatic filter applied.** All families (system and user-defined) are returned by default. There is no `is_user_defined` filter on families — all families are returned.
- Envelope-wrapped: `{ data: [...], meta: { currentPage, perPage, lastPage, total, from, to } }`.
- `per_page` caps at **50**; values ≤ 0 fall back to the default of **10**.
