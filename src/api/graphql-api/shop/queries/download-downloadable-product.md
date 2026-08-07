---
outline: false
apiType: rest
examples:
  - id: download-purchased-product
    title: Download Purchased Product
    description: Download the actual purchased downloadable product file. Requires customer authentication. Each download decrements the remaining download count.
    query: |
      curl -X GET "https://api-demo.bagisto.com/api/shop/customer-downloadable-products/4/download" \
        -H "X-STOREFRONT-KEY: <storefrontKey>" \
        -H "Authorization: Bearer <accessToken>" \
        -o purchased-product.png
    variables: |
      {}
    response: |
      HTTP/1.1 200 OK
      Content-Type: image/png (or application/pdf, application/zip, etc.)
      Content-Disposition: attachment; filename="downloaded-file.png"

      [Binary file content — the actual purchased file]

      The response is the raw file content, not JSON.
      In Postman, the file opens directly in the browser
      or downloads automatically.
      In cURL, use the -o flag to save it to a file.

      On authentication failure (HTTP 401):
      {
        "message": "Unauthorized: Customer authentication required.",
        "error": "unauthenticated"
      }
    commonErrors:
      - error: Unauthenticated
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: Not Found
        cause: The purchase ID does not exist or belongs to another customer
        solution: Verify the purchase ID from the Get Downloadable Products query
      - error: Download Limit Reached
        cause: All allowed downloads have been used
        solution: Check remainingDownloads via the Get Downloadable Products query
---

# Download Downloadable Product

## About

After a customer purchases a downloadable product and the order is completed, the purchased files can be downloaded using the `downloadUrl` field. This URL is available from both the [Get Downloadable Products](/api/graphql-api/shop/queries/get-customer-downloadable-products) query (list of all purchases) and the [Get Downloadable Product](/api/graphql-api/shop/queries/get-customer-downloadable-product) query (single purchase). Use the `downloadUrl` value directly in a cURL request to download the file.

This download is handled via a **REST API endpoint** (not a GraphQL query), as the response is binary file content rather than JSON.

## Purchased Product Downloads

After a customer purchases a downloadable product and the order is completed, they can download the actual product files. This requires customer authentication. Use the `downloadUrl` from the GraphQL query response as the URL in your cURL request.

**Endpoint:**
```
GET /api/shop/customer-downloadable-products/{purchase_id}/download
```

The `{purchase_id}` is the `_id` field from the [Get Downloadable Products](/api/graphql-api/shop/queries/get-customer-downloadable-products) query.

### Authentication

This endpoint requires a valid customer authentication token:

```
Authorization: Bearer <your_access_token>
X-STOREFRONT-KEY: pk_storefront_your_key_here
```

### Example

```bash
curl -X GET "https://your-domain.com/api/shop/customer-downloadable-products/403/download" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer 2879|mZB2airbqULCamPo5LmADjzYawSRYUM8lyvWIM3e" \
  -o purchased-product.png
```

## Implementation Guide

When implementing the download in a client, do **not** save the response straight to a file — that is, do not pass `-o` on the first request. Instead, first make the request **without** `-o` and check the response. If authentication fails, the API returns a JSON error response instead of the file content. If you blindly save with `-o`, you may end up saving the error JSON as your "downloaded file."

**Recommended two-step approach:**

**Step 1 — Verify the request:**
```bash
curl -X GET "https://your-domain.com/api/shop/customer-downloadable-products/403/download" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer <your_access_token>"
```

If the token is invalid or missing, you will see:
```json
{
  "message": "Unauthorized: Customer authentication required.",
  "error": "unauthenticated"
}
```

**Step 2 — Download the file (only after confirming success):**
```bash
curl -X GET "https://your-domain.com/api/shop/customer-downloadable-products/403/download" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer <your_access_token>" \
  -o purchased-product.png
```

Alternatively, in your application code, check the response `Content-Type` header — a successful download returns a file content type (e.g. `image/png`, `application/pdf`), while an error returns `application/json`.

## Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Storefront API key |
| `Authorization` | Only for purchased downloads | Customer authentication token (`Bearer <token>`) |

## Related Documentation

- [Get Downloadable Products](/api/graphql-api/shop/queries/get-customer-downloadable-products) — List all purchased downloadable products
- [Get Downloadable Product](/api/graphql-api/shop/queries/get-customer-downloadable-product) — Get details of a single purchased downloadable product
