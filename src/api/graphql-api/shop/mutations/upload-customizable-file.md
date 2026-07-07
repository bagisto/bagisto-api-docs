---
outline: false
examples:
  - id: upload-then-add
    title: Upload a File, then Add to Cart
    description: A file-type customizable option needs a binary upload, which cannot travel over GraphQL. Upload the file over REST to get a token, then reference the token in the GraphQL add-to-cart mutation.
    query: |
      # Step 2 — upload the file over REST (binary cannot travel over GraphQL):
      #
      #   POST /api/shop/customizable-option-files   (multipart/form-data)
      #   product_id=2977  option_id=11  file=@spec.pdf
      #   → { "token": "…", "fileName": "spec.pdf", "optionId": 11 }
      #
      # Step 3 — add to cart over GraphQL with the token:
      mutation createAddProductInCart($input: createAddProductInCartInput!) {
        createAddProductInCart(input: $input) {
          addProductInCart {
            id
            grandTotal
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "productId": 2977,
          "quantity": 1,
          "customizableOptions": {
            "9": [9],
            "10": [12],
            "11": ["<token-from-upload-endpoint>"]
          }
        }
      }
    response: |
      {
        "data": {
          "createAddProductInCart": {
            "addProductInCart": {
              "id": "6895",
              "grandTotal": 54,
              "success": true,
              "message": "Product added to cart successfully"
            }
          }
        }
      }

---

# Upload Customizable File

A `file`-type customizable option (e.g. "upload your design") needs a binary file. **A file cannot travel over GraphQL**, so the upload itself is a REST call — but the rest of the flow stays in GraphQL. You upload once over REST to get a **token**, then reference the token in the GraphQL [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) mutation.

## The flow

```mermaid
flowchart TD
  read["1. Read option id"]
  up["2. Upload (REST)"]
  add["3. Add to cart"]
  cart["File in cart"]
  order["File to order"]
  read --> up --> add --> cart --> order
```

1. **Read the option** from the product's `customizableOptions` ([Single Product](/api/graphql-api/shop/queries/get-product)) — a `file`-type option carries its `_id` and the allowed extensions.
2. **Upload the file over REST** — `POST /api/shop/customizable-option-files` (multipart) with `product_id`, `option_id`, `file`. It returns a short-lived `token`. This is REST-only; see the [REST upload endpoint](/api/rest-api/shop/cart/upload-customizable-file) for the full request/response.
3. **Add to cart over GraphQL** — pass the token as that option's value: `customizableOptions: { "11": ["<token>"] }`. The mutation carries only the token string.
4. **Core owns the rest** — the file is stored with the cart, then moved to the order automatically at place-order.

## Which file formats are allowed?

There is no fixed API list — the **admin sets the allowed extensions per option** (the option's "Supported File Extensions", e.g. `pdf` or `jpg,png,pdf`). Read them from the product's `customizableOptions`; a mismatched extension is rejected at upload.

## Related

- [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) — reference the token here
- [Single Product](/api/graphql-api/shop/queries/get-product) — read the customizable options
- [REST upload endpoint](/api/rest-api/shop/cart/upload-customizable-file) — the actual multipart upload
