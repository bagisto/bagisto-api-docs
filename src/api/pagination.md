# Pagination

How to page through list endpoints. The mechanics are the same across every Shop list, so endpoint pages don't repeat them. The two transports page differently — REST uses offset, GraphQL uses cursors.

## REST — offset (`page` + `per_page`)

```
GET /api/shop/products?page=2&per_page=20
```

| Parameter | Meaning | Default | Cap |
|-----------|---------|---------|-----|
| `page` | 1-based page number | `1` | — |
| `per_page` | Items per page (snake_case) | `10` (products `30`) | `50` |

`per_page` above the cap is clamped to `50`; `0`/negative falls back to the default. The list body is a **flat JSON array**; the paging totals come back in response headers:

| Header | Meaning |
|--------|---------|
| `X-Total-Count` | Total items across all pages |
| `X-Page` | Current page |
| `X-Per-Page` | Items on this page |
| `X-Total-Pages` | Total page count |

Loop until `X-Page` reaches `X-Total-Pages`.

**Example**

```bash
curl -X GET "https://your-domain.com/api/shop/products?page=1&per_page=2" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

The body is a flat array; the paging totals are in the response headers:

```http
HTTP/1.1 200 OK
X-Total-Count: 137
X-Page: 1
X-Per-Page: 2
X-Total-Pages: 69

[
  { "id": 1, "sku": "COASTALBREEZE", "name": "Coastal Breeze Hoodie" },
  { "id": 2, "sku": "URBANEDGE", "name": "Urban Edge Jacket" }
]
```

## GraphQL — cursor (`first` + `after`)

```graphql
query {
  products(first: 20, after: "MjA=") {
    edges {
      node {
        id
        name
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

| Argument | Meaning |
|----------|---------|
| `first` | Page size (equivalent to `per_page`) |
| `after` | Cursor to start after — pass the previous page's `pageInfo.endCursor` |

Response — each edge carries a `cursor`, and `pageInfo` tells you how to continue:

```json
{
  "data": {
    "products": {
      "edges": [
        { "node": { "id": "/api/shop/products/21", "name": "Coastal Breeze Hoodie" }, "cursor": "MjE=" },
        { "node": { "id": "/api/shop/products/22", "name": "Urban Edge Jacket" }, "cursor": "MjI=" }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "MjI="
      }
    }
  }
}
```

Page forward by repeating with `after: <endCursor>` (here `after: "MjI="`) until `pageInfo.hasNextPage` is `false`. The cursor is opaque — do not parse or construct it; use the value the API returns.

## Related

- [Sorting](/api/sorting) — sort tokens and filters for the same list endpoints.
- [API Mapping](/api/rest-graphql-mapping/) — side-by-side REST ↔ GraphQL for a specific call.
