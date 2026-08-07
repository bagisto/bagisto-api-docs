---
outline: false
examples:
  - id: get-customer-downloadable-products
    title: Get All Customer Downloadable Products
    description: Retrieve all downloadable product purchases for the authenticated customer.
    request: |
      GET /api/shop/customer-downloadable-products
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 1,
          "productName": "Laravel E-Book",
          "name": "PDF Download",
          "file": "downloadable/laravel-ebook.pdf",
          "fileName": "laravel-ebook.pdf",
          "type": "file",
          "downloadBought": 5,
          "downloadUsed": 1,
          "status": "available",
          "downloadCanceled": 0,
          "createdAt": "2026-06-15T10:30:00+05:30",
          "updatedAt": "2026-06-15T10:30:00+05:30",
          "remainingDownloads": 4,
          "downloadUrl": "https://yourstore.com/api/shop/customer-downloadable-products/1/download",
          "customer": "/api/shop/customers/122",
          "order": "/api/shop/customer-orders/101"
        },
        {
          "id": 2,
          "productName": "Stock Photo Pack",
          "name": "High-Res Bundle",
          "url": "https://cdn.example.com/photo-pack.zip",
          "fileName": "photo-pack.zip",
          "type": "url",
          "downloadBought": 3,
          "downloadUsed": 3,
          "status": "expired",
          "downloadCanceled": 0,
          "createdAt": "2026-06-10T08:00:00+05:30",
          "updatedAt": "2026-06-12T14:00:00+05:30",
          "remainingDownloads": 0,
          "downloadUrl": "https://yourstore.com/api/shop/customer-downloadable-products/2/download",
          "customer": "/api/shop/customers/122",
          "order": "/api/shop/customer-orders/102"
        }
      ]
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

---

# Get Customer Downloadable Products

Retrieve all downloadable product purchases belonging to the authenticated customer. This is a **read-only** API — customers can view their purchased downloadable links, check download status, and see remaining downloads.

## Endpoint

```
GET /api/shop/customer-downloadable-products
```

## Request Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Content-Type` | `application/json` | Yes | Request content type |
| `X-STOREFRONT-KEY` | `pk_storefront_xxx` | Yes | Storefront API key |
| `Authorization` | `Bearer {token}` | Yes | Customer authentication token |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | Integer | Downloadable link purchase ID |
| `productName` | String | Name of the purchased product |
| `name` | String | Name of the downloadable link |
| `url` | String | Source URL of a `url`-type link. Absent on a `file`-type purchase. |
| `file` | String | Stored path of a `file`-type link. Absent on a `url`-type purchase. |
| `fileName` | String | Display name of the file |
| `type` | String | Link type: `file` or `url` |
| `downloadBought` | Integer | Total number of allowed downloads |
| `downloadUsed` | Integer | Number of times downloaded |
| `downloadCanceled` | Integer | Number of canceled downloads |
| `status` | String | Purchase status: `available`, `expired`, or `pending` |
| `remainingDownloads` | Integer | `downloadBought` minus used and canceled. `null` when the purchase has no download cap. |
| `order` | String | Path of the order, e.g. `/api/shop/customer-orders/384`. Not a nested object. |
| `customer` | String | Path of the owning customer. |
| `downloadUrl` | String | Absolute URL of the download route. It needs both auth headers, so it is a request URL rather than a shareable link. |
| `createdAt` | DateTime | Purchase creation date |
| `updatedAt` | DateTime | Purchase last update date |

### Status Values

Use any of these as the `?status=` filter value, or read them off the `status` field:

| Status | Description |
|--------|-------------|
| `available` | Download link is active and can be used |
| `pending` | Order has not been invoiced yet; download is not available |
| `expired` | All downloads have been used or the link has expired |

### Query Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `status` | string | — | Filter by purchase status (`available` / `pending` / `expired`). `?status=available` |
| `page` | integer | `1` | Page number. |
| `per_page` | integer | `10` | Items per page (max 50). |

Over GraphQL: `customerDownloadableProducts(status: "available", first: 10) { … }`.

## cURL Example

```bash
curl -X GET "https://api-demo.bagisto.com/api/shop/customer-downloadable-products" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json"
```

## Empty Collection

When the customer has no downloadable product purchases:

```json
[]
```

## Notes

- **Read-only API:** Only `GET` operations are available.
- **Customer isolation:** Purchases are automatically filtered by the authenticated customer. A customer can never see another customer's purchases.
- **Field naming:** REST responses use camelCase field names (e.g., `productName`, `downloadBought`, `remainingDownloads`).
- **Computed field:** `remainingDownloads` is calculated as `downloadBought - downloadUsed - downloadCanceled`. Returns `null` for unlimited downloads.
