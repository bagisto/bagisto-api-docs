---
outline: false
---

# Product Review

The Product Review menu lets shoppers read the reviews on a product and lets a signed-in customer write, edit, and remove their own reviews. A client uses it to render the review list on a product page and to power a "Write a review" form.

## Reading vs. writing

- Reading product reviews is a **public** query — anyone can fetch the reviews for a product.
- Creating, updating, and deleting a review require an authenticated **customer** — a customer can only edit or delete a review they wrote.

A submitted review may be held for moderation before it appears publicly, depending on the store's settings.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Product Reviews](/api/graphql-api/shop/queries/get-product-reviews) | `productReviews` query |
| [Create Product Review](/api/graphql-api/shop/mutations/create-product-review) | `createProductReview` mutation |
| [Update Product Review](/api/graphql-api/shop/mutations/update-product-review) | `updateProductReview` mutation |
| [Delete Product Review](/api/graphql-api/shop/mutations/delete-product-review) | `deleteProductReview` mutation |

Reading reviews is public (storefront key only). The create / update / delete operations require a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
