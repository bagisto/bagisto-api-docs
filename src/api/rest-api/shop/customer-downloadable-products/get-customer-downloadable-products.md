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
      [
        {
          "id": 1,
          "productName": "Laravel E-Book",
          "name": "PDF Download",
          "url": null,
          "file": "downloadable/laravel-ebook.pdf",
          "fileName": "laravel-ebook.pdf",
          "type": "file",
          "downloadBought": 5,
          "downloadUsed": 1,
          "downloadCanceled": 0,
          "status": "available",
          "remainingDownloads": 4,
          "customerId": 1,
          "orderId": 101,
          "orderItemId": 201,
          "order": {
            "id": 101,
            "incrementId": "101",
            "status": "completed"
          },
          "createdAt": "2025-06-15T10:30:00.000000Z",
          "updatedAt": "2025-06-15T10:30:00.000000Z"
        },
        {
          "id": 2,
          "productName": "Stock Photo Pack",
          "name": "High-Res Bundle",
          "url": "https://cdn.example.com/photo-pack.zip",
          "file": null,
          "fileName": "photo-pack.zip",
          "type": "url",
          "downloadBought": 3,
          "downloadUsed": 3,
          "downloadCanceled": 0,
          "status": "expired",
          "remainingDownloads": 0,
          "customerId": 1,
          "orderId": 102,
          "orderItemId": 202,
          "order": {
            "id": 102,
            "incrementId": "102",
            "status": "completed"
          },
          "createdAt": "2025-06-10T08:00:00.000000Z",
          "updatedAt": "2025-06-12T14:00:00.000000Z"
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 403 Forbidden
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
| `url` | String\|null | External download URL (for URL-type links) |
| `file` | String\|null | File path (for file-type links) |
| `fileName` | String | Display name of the file |
| `type` | String | Link type: `file` or `url` |
| `downloadBought` | Integer | Total number of allowed downloads |
| `downloadUsed` | Integer | Number of times downloaded |
| `downloadCanceled` | Integer | Number of canceled downloads |
| `status` | String | Purchase status: `available`, `expired`, or `pending` |
| `remainingDownloads` | Integer | Computed remaining downloads (`null` if unlimited) |
| `customerId` | Integer | ID of the customer who purchased |
| `orderId` | Integer | Associated order ID |
| `orderItemId` | Integer | Associated order item ID |
| `order` | Object | Associated order details |
| `createdAt` | DateTime | Purchase creation date |
| `updatedAt` | DateTime | Purchase last update date |

### Status Values

| Status | Description |
|--------|-------------|
| `available` | Download link is active and can be used |
| `pending` | Order has not been invoiced yet; download is not available |
| `expired` | All downloads have been used or the link has expired |

## cURL Example

```bash
curl -X GET "http://localhost:8000/api/shop/customer-downloadable-products" \
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
