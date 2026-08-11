---
outline: false
---

# Compare

The Compare menu lets a signed-in customer build a side-by-side comparison list of products. A client uses it to power the "add to compare" action and the compare page.

## When you use it

The compare list is per-customer. A customer can add a product to the list, list everything in it, view one item, remove an item, or clear the whole list at once. Compare is a customer feature — it is not available to guests.

## Operations

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List the comparison | [`compareItems`](/api/graphql-api/shop/queries/get-compare-items) | Every product the customer has added, each with its full product detail. |
| View one entry | [`compareItem`](/api/graphql-api/shop/queries/get-compare-item) | A single comparison entry. |
| Add a product | [`createCompareItem`](/api/graphql-api/shop/mutations/create-compare-item) | Put a product on the comparison list. |
| Remove a product | [`deleteCompareItem`](/api/graphql-api/shop/mutations/delete-compare-item) | Drop one product from the list. |
| Clear the list | [`createDeleteAllCompareItems`](/api/graphql-api/shop/mutations/delete-all-compare-items) | Remove every product in one call. |

Each entry carries the whole `product` object, so a compare table can be rendered from one request — there is no need to fetch each product separately. Catalog products also carry an `isInCompare` flag, which lets a listing page show the added state without reading this list.

All Compare operations require a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
