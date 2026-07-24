---
outline: false
---

# Customer Account mapping

Everything behind a logged-in customer's account. All of these require the customer Bearer token (see [Auth & Context](/api/rest-graphql-mapping/shop/auth-context)). GraphQL reads are queries; writes are `create…` / `update…` / `delete…` mutations.

## Profile

| Capability | REST | GraphQL |
|---|---|---|
| Get profile | `GET /api/shop/customers/get` | `readCustomerProfile` |
| Update profile | `PUT /api/shop/customer-profile-updates/{id}` | `updateCustomerProfile` |
| Delete profile | `POST /api/shop/customer-profile-deletes` | `deleteCustomerProfile` |

## Addresses

| Capability | REST | GraphQL |
|---|---|---|
| List addresses | `GET /api/shop/customers/get-customer-addresses` | `getCustomerAddresses` |
| Create address | `POST /api/shop/customers/create-customer-address` | `createAddUpdateCustomerAddress` |
| Update address | `PUT /api/shop/customers/update-customer-address` | `createAddUpdateCustomerAddress` |
| Delete address | `DELETE /api/shop/customers/delete-customer-address` | `deleteCustomerAddress` |

## Orders

| Capability | REST | GraphQL | Filters |
|---|---|---|---|
| List orders | `GET /api/shop/customer-orders` | `customerOrders` | `status` (pending/processing/completed/canceled/closed/fraud) |
| Order detail | `GET /api/shop/customer-orders/{id}` | `customerOrder(id:)` | detail lookup needs the **IRI** `id`, not `incrementId` |
| Cancel order | `POST /api/shop/customer-orders/{id}/cancel` | `createCancelOrder` | |
| Reorder | `POST /api/shop/customer-orders/{id}/reorder` | `createReorderOrder` | |

## Wishlist

| Capability | REST | GraphQL |
|---|---|---|
| List | `GET /api/shop/wishlists` | `wishlists` |
| Single | `GET /api/shop/wishlists/{id}` | `wishlist(id:)` |
| Add / toggle | `POST /api/shop/wishlists` | `toggleWishlist` |
| Move to cart | `POST /api/shop/wishlists/move-to-cart` | `moveWishlistToCart` |
| Remove | `DELETE /api/shop/wishlists/{id}` | `deleteWishlist` |

## Compare

| Capability | REST | GraphQL |
|---|---|---|
| List | `GET /api/shop/compare-items` | `compareItems` |
| Add | `POST /api/shop/compare-items` | `createCompareItem` |
| Remove | `DELETE /api/shop/compare-items/{id}` | `deleteCompareItem` |
| Clear all | `POST /api/shop/delete-all-compare-items` | `createDeleteAllCompareItems` |

## Downloadable products

| Capability | REST | GraphQL | Filters |
|---|---|---|---|
| List purchased | `GET /api/shop/customer-downloadable-products` | `customerDownloadableProducts` | `status` |

## Product reviews

| Capability | REST | GraphQL | Filters |
|---|---|---|---|
| List a product's reviews | `GET /api/shop/product-reviews` | `productReviews` | `product_id` (required), `status` (default `approved`), `rating` (1–5) |
| List own reviews | `GET /api/shop/customer-reviews` | `customerReviews` | |
| Create review | `POST /api/shop/product-reviews` | `createProductReview` | |
| Update review | `PATCH /api/shop/product-reviews/{id}` | `updateProductReview` | |
| Delete review | `DELETE /api/shop/product-reviews/{id}` | `deleteProductReview` | |

## Returns (RMA)

| Capability | REST | GraphQL | Filters |
|---|---|---|---|
| List returns | `GET /api/shop/returns` | `customerReturns` | `status` (RMA status id) |
| View return | `GET /api/shop/returns/{id}` | `customerReturn(id:)` | |
| Returnable items | `GET /api/shop/returns/returnable-items` | `returnableItems` | |
| Return reasons | `GET /api/shop/returns/reasons` | `returnReasons` | |
| Create return | `POST /api/shop/returns` | `createCustomerReturn` | |
| Cancel / reopen / close | `POST /api/shop/returns/{id}/…` | `cancelCustomerReturn` / `reopenCustomerReturn` / `closeCustomerReturn` | |
| Send message | `POST /api/shop/returns/{id}/messages` | `sendCustomerReturnMessage` | |

## EU withdrawal

| Capability | REST | GraphQL |
|---|---|---|
| List withdrawals | `GET /api/shop/eu-withdrawals` | `euWithdrawals` |
| View withdrawal | `GET /api/shop/eu-withdrawals/{id}` | `euWithdrawal(id:)` |
| File withdrawal | `POST /api/shop/eu-withdrawals` | `createEuWithdrawal` |
| File as guest | `POST /api/shop/eu-withdrawals/guest` | `createGuestEuWithdrawal` |

## GDPR requests

| Capability | REST | GraphQL | Filters |
|---|---|---|---|
| List own requests | `GET /api/shop/gdpr-requests` | `gdprRequests` | sort `id` \| `created_at`, `order` |
| View request | `GET /api/shop/gdpr-requests/{id}` | `gdprRequest(id:)` | |
| Raise request | `POST /api/shop/gdpr-requests` | `createGdprRequest` | |
| Revoke request | `POST /api/shop/gdpr-requests/{id}/revoke` | `revokeGdprRequest` | |
| Delete request | `DELETE /api/shop/gdpr-requests/{id}` | `deleteGdprRequest` | |

::: tip Verify a REST path before hard-coding it
GraphQL operation names above are exact. A few REST sub-paths (returns actions, address verbs) vary by build — open the endpoint's own page (linked from the [Customer Account](/api/rest-api/shop/customers/) sidebar) to confirm the precise route and body.
:::
