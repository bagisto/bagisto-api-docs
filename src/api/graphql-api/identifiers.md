---
outline: false
---

# Identifiers — `id`, `_id` and IRIs

Every GraphQL node exposes **two** identifier fields, and they are not interchangeable:

```graphql
query {
  products(first: 1) {
    edges {
      node {
        id      # "/api/shop/products/1"  — an IRI (a string path)
        _id     # 1                       — the numeric database id
        sku
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
        {
          "node": {
            "id": "/api/shop/products/1",
            "_id": 1,
            "sku": "ws-blossom-skirt"
          }
        }
      ]
    }
  }
}
```

| Field | Type | Value | Use it for |
|---|---|---|---|
| `id` | `ID!` | IRI string — `/api/shop/products/1` | Passing a record back into another GraphQL operation |
| `_id` | `Int` | `1` | Storing the record key, building REST URLs, comparing records |

REST is simpler: `GET /api/shop/products/1` returns `"id": 1` — the **numeric** id, matching GraphQL's `_id`. There is no IRI in REST responses.

## The rule

> **Display and store `_id`. Pass `id` back to the API.**

`_id` is stable and is the same number REST uses, so it is what belongs in your database, your URLs and your cache keys. `id` is the API's own address for that record and is what mutations expect.

## Passing an id to an operation

Both an IRI and a bare numeric id are accepted — the server reads the trailing segment either way:

```graphql
# Both of these return the same product
query { product(id: "/api/shop/products/1") { _id sku } }
query { product(id: "1")                    { _id sku } }
```

The same applies to mutation inputs:

```graphql
mutation { deleteWishlist(input: { id: "/api/shop/wishlists/155" }) { wishlist { _id } } }
mutation { deleteWishlist(input: { id: "154" })                     { wishlist { _id } } }
```

Prefer the **IRI** — it is the canonical form, it is what the API hands you, and passing back exactly what you received keeps client code free of string surgery.

::: warning The resource path is not validated
Only the trailing id segment is read. Sending `category(id: "/api/shop/products/2")` returns **category 2**, not an error — the `products` path is ignored. Never build an IRI by hand from a different resource's path; pass back the `id` you were given.
:::

## When `id` is not usable

Some resources have no single-record URL of their own — action results (reorder, generate, mass-action payloads), nested sub-resources, and a few listing-only resources. For those, `id` is `null`, or it points at a route you cannot fetch.

A real example — the admin order listing has no per-order route on that resource, so `id` resolves against the export route:

```graphql
query { adminOrders(first: 1) { edges { node { id _id incrementId } } } }
```

```json
{
  "node": {
    "id": "/api/admin/orders/export?id=384",
    "_id": 384,
    "incrementId": "383"
  }
}
```

`_id` is correct (`384`); `id` is not an address you can use. Order details live on a separate operation, `adminOrderDetail(id: 384)`.

::: tip Rule of thumb
If a field's value is what you need — a cart id, an order id, a created record's id — **select `_id`**. Reach for `id` only when you are handing the record straight back to another operation. On action results (`createAdminReorder`, `createAdminMarketingSitemapGenerate`, …) select the explicit value field the payload documents (e.g. `cartId`) plus `_id`, never `id`.
:::

## Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot return null for non-nullable field id` | Selected `id` on a resource with no single-record route | Select `_id` (and the payload's own value field) |
| A stored id looks like `/api/shop/products/1` | Persisted `id` instead of `_id` | Store `_id`; keep `id` only for the round trip |
| REST call 404s with an id taken from GraphQL | Built the URL from the IRI string | Use `_id` — `/api/shop/products/{_id}` |
| Wrong record returned by an item query | Hand-built IRI carrying another resource's path | Pass back the `id` the API returned |
