---
outline: false
apiType: rest
---

# Product Review

The Product Review menu covers the ratings and reviews shoppers leave on products. Anyone can read the reviews on a product; a logged-in customer can write a new review and edit or delete their own.

## Read vs. write

- **Reading** reviews (list for a product, or a single review) is public — only the storefront key is needed.
- **Writing** a review, and updating or deleting one, requires an authenticated customer (a customer Bearer token). A customer may only edit or delete a review they created.

New reviews are typically held for moderation before they appear publicly, depending on the store's settings.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Product Reviews](/api/rest-api/shop/product-reviews/get-product-reviews) | `GET /api/shop/products/{id}/reviews` | List the reviews on a product. |
| [Get Product Review](/api/rest-api/shop/product-reviews/get-product-review) | `GET /api/shop/reviews/{id}` | A single review by id. |
| [Create Product Review](/api/rest-api/shop/product-reviews/create-product-review) | `POST /api/shop/products/{id}/reviews` | Submit a review for a product. |
| [Update Product Review](/api/rest-api/shop/product-reviews/update-product-review) | `PUT /api/shop/reviews/{id}` | Edit the customer's own review. |
| [Delete Product Review](/api/rest-api/shop/product-reviews/delete-product-review) | `DELETE /api/shop/reviews/{id}` | Remove the customer's own review. |

Read endpoints need only the storefront key; create, update and delete require a customer Bearer token — see [Authentication](/api/rest-api/authentication).
