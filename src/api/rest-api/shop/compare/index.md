---
outline: false
apiType: rest
---

# Compare

The Compare menu lets a logged-in customer build a side-by-side comparison list of products. A customer can list their compare items, read a single one, add a product, remove one item, or clear the whole list.

## When a client uses this

The comparison list is per customer and, unlike the wishlist, is **not scoped to a channel** — the same rows come back everywhere. Guests cannot hold one.

Reads identify the compared product by **path reference** (`/api/shop/products/126`), not as a nested object, so a comparison table fetches those products separately to get their names, prices, and attribute values. The GraphQL compare query returns them nested in a single request.

There is no toggle here as there is for the wishlist: adding a product that is already on the list is rejected, and removal addresses the comparison row's own ID.

## Building a Comparison Table

A comparison row carries `id`, timestamps, and path references to the product and customer — no product data at all. The table itself is built in two steps: list the rows here, take the numeric id from the end of each `product` path, then fetch those products for their names, prices, images, and attribute values.

Fetch the products in one call rather than one per row: the product listing accepts filters, so a single request can return the whole comparison set. The attribute values that make up the table's rows come from each product's detail payload.

The API sets no ceiling on how many products a customer may compare. A readable table usually tops out around four columns, so cap it client-side.

## Adding and Removing

Adding a product that is already on the list is rejected with `400` and the message `This product is already in your comparison list` — expected on a double tap, and worth treating as "already added" rather than surfacing as an error. There is no toggle endpoint, so a control that both adds and removes has to track the row id and call Delete itself.

Delete addresses the **comparison row** id, not the product id. Clearing the whole list is a single call that answers `201` with a `deletedCount`, and it is safe to repeat on an already-empty list.

## Flags on the Catalog

Product listing and detail responses carry an `isInCompare` flag per product, so a catalog grid can show which items are already being compared without reading this menu first. It is `0` for guests. Unlike its wishlist counterpart it is not channel-scoped, matching the comparison list itself.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Compare Items](/api/rest-api/shop/compare/list) | `GET /api/shop/compare_items` | List the customer's compare items. |
| [Get Compare Item](/api/rest-api/shop/compare/get) | `GET /api/shop/compare_items/{id}` | A single compare item. |
| [Create Compare Item](/api/rest-api/shop/compare/create) | `POST /api/shop/compare_items` | Add a product to the compare list. |
| [Delete Compare Item](/api/rest-api/shop/compare/delete) | `DELETE /api/shop/compare_items/{id}` | Remove one item. |
| [Delete All Compare Items](/api/rest-api/shop/compare/delete-all) | `POST /api/shop/delete-all-compare-items` | Clear the whole compare list. |

The item routes use an underscore — `compare_items`, not `compare-items`. The clear-all route is the hyphenated one.

All Compare endpoints require the storefront key and a customer Bearer token — see [Authentication](/api/rest-api/authentication).
