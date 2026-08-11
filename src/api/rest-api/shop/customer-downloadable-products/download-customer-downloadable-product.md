---
outline: false
examples:
  - id: download-purchased-product
    title: Download a Purchased File
    description: Stream the file behind a downloadable purchase. The response is binary, and each successful call consumes one of the customer's remaining downloads.
    request: |
      GET /api/shop/customer-downloadable-products/403/download
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken
    response: |
      HTTP/1.1 200 OK
      Content-Type: application/pdf
      Content-Disposition: attachment; filename=user-guide.pdf

      [binary file content]
    commonErrors:
      - error: 401 Unauthorized — Unauthorized. Customer authentication required.
        cause: No customer Bearer token was sent
        solution: Log the customer in and send their token
      - error: 404 Not Found — Downloadable product not found.
        cause: No such purchase, or it belongs to another customer
        solution: Use an id from Get Downloadable Products for this customer
      - error: 403 Forbidden — Download is pending. Please wait for the order to be invoiced.
        cause: The order has not been invoiced, so the purchase is still pending
        solution: Nothing client-side — the store must invoice the order first
      - error: 403 Forbidden — Download limit exceeded.
        cause: The downloads used have reached the quantity actually invoiced
        solution: Wait for the remaining quantity to be invoiced, or contact the store
      - error: 403 Forbidden — No more downloads available.
        cause: Every purchased download has been used or canceled
        solution: The purchase is exhausted; its status is now expired
      - error: 404 Not Found — File not found.
        cause: The stored file is missing on the server
        solution: Contact the store; the purchase record exists but its file does not

---

# Download a Purchased Downloadable Product

Stream the file a customer bought as a downloadable product.

## Endpoint

```
GET /api/shop/customer-downloadable-products/{id}/download
```

The `{id}` is the purchase id from [Get Downloadable Products](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-products) — not a product or order id.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token of the customer who bought the product |

## Response

`200 OK` with the raw file as the body. The content type follows the stored file, and `Content-Disposition` carries its original filename. Nothing about the response is JSON.

Both link types are served the same way: a `file` purchase streams from the store's private storage, and a `url` purchase is fetched by the store and passed through, so a client never receives the external address.

## Each Download Is Counted

A successful call increments the used-download counter for the purchase, and the purchase flips to `expired` once nothing remains. Two separate limits apply, and each has its own error:

| Limit | When it trips |
|-------|---------------|
| Invoiced quantity | Downloads are released in step with what the store has invoiced. Using more than the invoiced share fails with `Download limit exceeded.` even though the purchase still shows remaining downloads. |
| Purchased quantity | Once used plus canceled downloads reach the bought quantity, the purchase is exhausted and fails with `No more downloads available.` |

A purchase whose order has not been invoiced at all is `pending` and refuses with `Download is pending. Please wait for the order to be invoiced.`

## Use Cases

- **"Download" button in the account area** — call with the purchase id, then hand the returned blob to the user.
- **Show the remaining count after a download** — the counter changes server-side, so re-read [Get Downloadable Products](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-products) rather than decrementing locally.

## Best Practices

- **Do not put this URL in an anchor tag** — a browser navigation sends no `Authorization` or storefront-key header, and the request fails with `401`.
- **Check the status code and content type before saving** — every failure answers with JSON, so writing the body blind produces a file containing an error message.
- **Do not retry a failed download automatically** — a call that reaches the file consumes a download, and a blind retry loop can exhaust the customer's allowance.
- **Read `remainingDownloads` before offering the button** — a purchase already at zero fails with `403` rather than a friendly message.

## Related Resources

- [Get Downloadable Products](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-products) — the customer's purchased downloads
- [Get Downloadable Product](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-product) — one purchase with its remaining download count
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
