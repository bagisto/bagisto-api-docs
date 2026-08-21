---
outline: false
---

# Identifiers — `id`, `_id` and IRIs

Most GraphQL nodes expose **two** identifier fields, and they are not interchangeable:

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
| `_id` | `Int` on most types | `1` | Storing the record key, building REST URLs, comparing records |

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

## The resource path is not validated

Only the trailing id segment is read. Sending `category(id: "/api/shop/products/2")` returns **category 2**, not an error — the `products` path is ignored:

```graphql
query { category(id: "/api/shop/products/2") { _id } }   # → { "_id": 2 }
```

Never build an IRI by hand from a different resource's path. A mistyped path silently resolves against whichever resource you queried, so the mistake surfaces as wrong data rather than an error. Pass back the `id` you were given.

## Not every type has `_id`

A handful of types expose `id` without `_id`, so a query that selects it is rejected outright:

```
Cannot query field "_id" on type "createAdminDraftCartPayloadData". Did you mean "id"?
```

This affects two groups:

- **Mutation payload wrappers** — the `create…PayloadData` type behind an action result such as contact-us, logout, reorder, forgot-password or draft-cart creation.
- **A few synthetic read types** that are not database rows — booking slots, category trees, returnable items and downloadable links among them.

On those, read the payload's own explicit value field. A draft-cart result carries `cartId`; a reorder result carries the same. Introspect the type — or check the endpoint's page — rather than assuming `_id` is available.

Where `_id` does exist, it is an integer on almost every type. A small number of resources that are keyed by something other than a row id — the customer profile, payment methods, shipping rates — type it as `String`, so do not assume the value is numeric before parsing it.

## When `id` is not a usable address

`id` is `ID!`, so it is always present and never null. What varies is whether the string is an address you can actually fetch. Resources without a single-record route still get a generated IRI, and it points nowhere:

```graphql
query { adminOrderComments(orderId: 38, first: 1) { edges { node { id _id } } } }
```

```json
{
  "node": {
    "id": "/api/admin/admin_order_comments/17",
    "_id": 17
  }
}
```

`GET /api/admin/admin_order_comments/17` returns **404** — that path is not a route. The listing-only resources behave the same way, and some resolve against an unrelated route entirely. The admin order listing has no per-order route, so its `id` resolves against the export route:

```json
{
  "node": {
    "id": "/api/admin/orders/export?id=384",
    "_id": 384,
    "incrementId": "383"
  }
}
```

`_id` is correct (`384`); `id` is not something to follow. Order details live on a separate operation, `adminOrderDetail(id: 384)`.

Because the IRI is generated whether or not a route exists, its presence proves nothing. Treat `id` as a value to hand back to the API, never as a URL to fetch — that is what `_id` and the documented REST path are for.

## Common mistakes

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot query field "_id" on type "…PayloadData"` | Selected `_id` on an action result, which has no such field | Select the payload's own value field, such as `cartId` |
| A stored id looks like `/api/shop/products/1` | Persisted `id` instead of `_id` | Store `_id`; keep `id` only for the round trip |
| REST call 404s with an id taken from GraphQL | Built the URL from the IRI string | Use `_id` — `/api/shop/products/{_id}` |
| A fetched IRI returns 404 | The resource has no single-record route, so its IRI is generated but unroutable | Use the operation the endpoint's page documents |
| Wrong record returned by an item query | Hand-built IRI carrying another resource's path | Pass back the `id` the API returned |
