---
outline: false
examples:
  - id: admin-catalog-families-list
    title: List Attribute Families (Datagrid)
    description: Cursor-paginated query returning the flat attribute family list — the GraphQL equivalent of the admin Catalog → Attribute Families datagrid. Supports filtering by code and name. Returns only 3 fields per node (id, code, name) because the underlying table carries no timestamps.
    query: |
      query AdminAttributeFamilies(
        $first: Int
        $after: String
        $code: String
        $name: String
        $sort: String
        $order: String
      ) {
        adminAttributeFamilies(
          first: $first
          after: $after
          code: $code
          name: $name
          sort: $sort
          order: $order
        ) {
          edges {
            cursor
            node {
              id
              _id
              code
              name
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
        "sort": "id",
        "order": "desc"
      }
    response: |
      {
        "data": {
          "adminAttributeFamilies": {
            "edges": [
              {
                "cursor": "MA==",
                "node": {
                  "id": "/api/admin/catalog/families/3",
                  "_id": 3,
                  "code": "apparel",
                  "name": "Apparel"
                }
              },
              {
                "cursor": "MQ==",
                "node": {
                  "id": "/api/admin/catalog/families/1",
                  "_id": 1,
                  "code": "default",
                  "name": "Default"
                }
              }
            ],
            "pageInfo": {
              "hasNextPage": false,
              "hasPreviousPage": false,
              "endCursor": "MQ==",
              "startCursor": "MA=="
            },
            "totalCount": 2
          }
        }
      }
---

# Catalog Attribute Families — Datagrid Listing (GraphQL)

Cursor-paginated GraphQL query that mirrors the Bagisto admin **Catalog →
Attribute Families** datagrid. Returns the flat family list with filtering,
sorting, and cursor pagination.

For how a family's attribute groups and attributes are structured, and the delete guards, see the [Attribute Families overview](/api/graphql-api/admin/catalog/families/).

## Operation

| Operation | Type | Pagination |
|-----------|------|------------|
| `adminAttributeFamilies` | Query | Cursor (`first` / `after`) |

## Arguments

| Argument | Type | Description | Example |
|----------|------|-------------|---------|
| `first` | `Int` | Number of items per page (default `10`, max `50`) | `10` |
| `after` | `String` | Cursor from a previous `pageInfo.endCursor` for keyset pagination | `"MA=="` |
| `last` | `Int` | Page size when paging backwards | `10` |
| `before` | `String` | Cursor from a previous `pageInfo.startCursor` | `"MA=="` |
| `id` | `String` | Filter by family ID — single integer or comma-separated list (e.g. `"1"` or `"1,2"`) | `"1"` |
| `code` | `String` | Partial family code match (SQL `LIKE %value%`) | `"default"` |
| `name` | `String` | Partial family name match (SQL `LIKE %value%`) | `"Apparel"` |
| `sort` | `String` | Column to sort by (see Sorting section below) | `"id"` |
| `order` | `String` | Sort direction: `"asc"` or `"desc"` (default `"desc"`) | `"desc"` |

Every filter is a first-class GraphQL argument — pass them alongside `first` and `after`, not inside a nested filter object. Filters combine with AND, so each one narrows the result.

## Node Fields

Each `edges[].node` object contains:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `ID` | API Platform IRI (e.g. `/api/admin/catalog/families/1`) |
| `_id` | `Int` | Raw family ID |
| `code` | `String` | Family code (e.g. `default`, `apparel`) |
| `name` | `String` | Family display name (e.g. `Default`, `Apparel`) |

## Fields That Are Not Here

The listing is deliberately three fields. Families carry **no timestamps at all** — there is no `createdAt` or `updatedAt` on this resource, unlike every other admin listing — so you cannot sort or filter by date here.

`attributeGroups` resolves only on [`adminAttributeFamily(id:)`](/api/graphql-api/admin/catalog/families/families-detail); selecting it on the listing returns `null`.

## Sorting

Pass `sort` with the column name and `order` for direction.

**Sortable columns:**

| `sort` value | Sorts by |
|---|---|
| `id` | Family ID (default) |
| `code` | Family code |
| `name` | Family display name |

## Cursor Pagination

- `first` controls the page size (default `10`, max `50`).
- To fetch the next page, pass the `pageInfo.endCursor` value as `after` in the
  next request.
- `totalCount` reflects the full count of matching families across all pages.

## Notes

- **Same provider as the REST endpoint** — `AdminAttributeFamilyCollectionProvider` serves both transports with identical filter and sort semantics.
- **Only 3 node fields are available.** The listing is intentionally slim — `id`, `_id`, `code`, `name`. No timestamps exist on the table and attribute groups are not embedded in the listing.
- **`extraArgs` declares custom arguments.** The filter/sort arguments are not part of the standard API Platform GraphQL schema for `QueryCollection` — they are explicitly declared via `extraArgs` on the operation. Pass them at the top level of the query, alongside `first` and `after`.
- **`attributeGroups` is not a field in this query.** It is only populated by the item query `adminAttributeFamily(id: ID!)`. Requesting `attributeGroups` in the collection query will cause a GraphQL schema error.
