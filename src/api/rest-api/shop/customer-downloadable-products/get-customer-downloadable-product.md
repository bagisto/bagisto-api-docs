---
outline: false
examples:
  - id: get-customer-downloadable-product
    title: Get Single Customer Downloadable Product
    description: Retrieve details of a specific downloadable product purchase by its ID.
    request: |
      GET /api/shop/customer-downloadable-products/1
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

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
      }
    commonErrors:
      - error: 403 Forbidden
        cause: Missing or invalid customer Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: The downloadable product purchase ID does not exist or belongs to another customer
        solution: Verify the purchase ID and ensure you are authenticated as the correct customer
      - error: 401 Unauthorized
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

---

# Get Customer Downloadable Product

Retrieve details of a specific downloadable product purchase by its ID. This is a **read-only** API — customers can view a single purchased downloadable link, check its download status, and see remaining downloads.

## Endpoint

```
GET /api/shop/customer-downloadable-products/{id}
```

## Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | Integer | Yes | The downloadable product purchase ID |

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
| `remainingDownloads` | Integer | Computed remaining downloads (`null` if unlimited) |
| `order` | String | Path of the order, e.g. `/api/shop/customer-orders/384`. Not a nested object. |
| `customer` | String | Path of the owning customer. |
| `downloadUrl` | String | Absolute URL of the download route. It needs both auth headers, so it is a request URL rather than a shareable link. |
| `createdAt` | DateTime | Purchase creation date |
| `updatedAt` | DateTime | Purchase last update date |

## cURL Example

```bash
curl -X GET "https://api-demo.bagisto.com/api/shop/customer-downloadable-products/1" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json"
```

## Error Responses

### Item Not Found (404)

```json
{
  "message": "Customer downloadable product with ID \"999\" not found"
}
```

### Accessing Another Customer's Purchase (404)

Requesting a purchase that belongs to a different customer returns the same 404 response, preventing enumeration attacks:

```json
{
  "message": "Customer downloadable product with ID \"5\" not found"
}
```

## Notes

- **Customer isolation:** A customer can only access their own purchases. Requesting another customer's purchase returns a 404.
- **Computed field:** `remainingDownloads` is calculated as `downloadBought - downloadUsed - downloadCanceled`. Returns `null` for unlimited downloads.
