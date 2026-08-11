# Sorting

How to sort and filter list endpoints. The mechanics are the same across every Shop list, so endpoint pages don't repeat them.

## Sorting

### REST

Two accepted forms — compound token or split params:

```
GET /api/shop/products?sort=name-asc
GET /api/shop/products?sort=name&order=desc
```

| Sort field | Token examples |
|-----------|----------------|
| `name` | `name-asc`, `name-desc` |
| `price` | `price-asc`, `price-desc` |
| `created_at` | `created_at-asc`, `created_at-desc` |
| `updated_at` | `updated_at-asc`, `updated_at-desc` |
| `id` | `id-asc`, `id-desc` |

String sorts are case-insensitive.

**Example** — cheapest first:

```bash
curl -X GET "https://your-domain.com/api/shop/products?sort=price-asc&per_page=2" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

```json
[
  { "id": 7, "sku": "BASICTEE", "name": "Basic Tee", "price": "12.00" },
  { "id": 3, "sku": "CANVASCAP", "name": "Canvas Cap", "price": "15.00" }
]
```

### GraphQL

```graphql
query {
  products(sortKey: PRICE, reverse: false, first: 2) {
    edges {
      node {
        id
        name
      }
    }
  }
}
```

```json
{
  "data": {
    "products": {
      "edges": [
        { "node": { "id": "/api/shop/products/7", "name": "Basic Tee" } },
        { "node": { "id": "/api/shop/products/3", "name": "Canvas Cap" } }
      ]
    }
  }
}
```

`sortKey` is the field in upper-case (`NAME`, `PRICE`, `CREATED_AT`, `UPDATED_AT`, `ID`); `reverse: true` = descending. So REST `?sort=price-desc` ≡ GraphQL `sortKey: PRICE, reverse: true`.

## Filtering (products)

### REST — query-string params

```
GET /api/shop/products?type=configurable&category_id=2&price=10,200&new=1
```

| Filter | Param |
|--------|-------|
| Search term | `query` |
| Type | `type` (simple / configurable / …) |
| Category | `category_id` |
| Price range | `price=<from>,<to>` — or `price_from` + `price_to` |
| New / Featured | `new=1` / `featured=1` |
| Attribute (e.g. colour, size) | `color=<optionId>`, `size=<optionId>` — any filterable attribute code |

Multiple filters combine with AND. Any query-string key that isn't a reserved one (`query`, `sort`, `order`, `page`, `per_page`, `locale`, `channel`, `filter`) is treated as an attribute filter.

### GraphQL — a JSON `filter` string

The same filters go into a single JSON-encoded `filter` argument:

```graphql
products(filter: "{\"type\":\"configurable\",\"category_id\":2,\"price\":\"10,200\",\"new\":1}") {
  edges {
    node {
      id
      name
    }
  }
}
```

This is the one shape that does not carry over literally between transports — REST spreads filters across query params, GraphQL packs them into the `filter` string.

## Category children — a common trip-up

REST fetches a category's children with `?parent_id=<id>`. GraphQL has **no `parentId` argument on `categories`** — children come from `treeCategories(parentId: <id>)`. Sending the REST shape into the GraphQL `categories` field returns everything, not the children.

## Related

- [Pagination](/api/pagination) — paging the same list endpoints.
