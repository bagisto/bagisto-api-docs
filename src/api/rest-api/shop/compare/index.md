---
outline: false
apiType: rest
---

# Compare

The Compare menu lets a logged-in customer build a side-by-side comparison list of products. A customer can list their compare items, read a single one, add a product, remove one item, or clear the whole list.

## When a client uses this

Use the compare list to power a "compare products" feature — add products as the shopper marks them, then read the list to render a comparison view. The list is per-customer.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Compare Items](/api/rest-api/shop/compare/list) | `GET /api/shop/compare-items` | List the customer's compare items. |
| [Get Compare Item](/api/rest-api/shop/compare/get) | `GET /api/shop/compare-items/{id}` | A single compare item. |
| [Create Compare Item](/api/rest-api/shop/compare/create) | `POST /api/shop/compare-items` | Add a product to the compare list. |
| [Delete Compare Item](/api/rest-api/shop/compare/delete) | `DELETE /api/shop/compare-items/{id}` | Remove one item. |
| [Delete All Compare Items](/api/rest-api/shop/compare/delete-all) | `POST /api/shop/delete-all-compare-items` | Clear the whole compare list. |

All Compare endpoints require the storefront key and a customer Bearer token — see [Authentication](/api/rest-api/authentication).
