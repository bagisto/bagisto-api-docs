---
outline: false
---

# Compare

The Compare menu lets a signed-in customer build a side-by-side comparison list of products. A client uses it to power the "add to compare" action and the compare page.

## When you use it

The compare list is per-customer. A customer can add a product to the list, list everything in it, view one item, remove an item, or clear the whole list at once. Compare is a customer feature — it is not available to guests.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Get Compare Items](/api/graphql-api/shop/queries/get-compare-items) | `compareItems` query |
| [Get Compare Item](/api/graphql-api/shop/queries/get-compare-item) | `compareItem(id:)` query |
| [Create Compare Item](/api/graphql-api/shop/mutations/create-compare-item) | `createCompareItem` mutation |
| [Delete Compare Item](/api/graphql-api/shop/mutations/delete-compare-item) | `deleteCompareItem` mutation |
| [Delete All Compare Items](/api/graphql-api/shop/mutations/delete-all-compare-items) | `deleteAllCompareItems` mutation |

All Compare operations require a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
