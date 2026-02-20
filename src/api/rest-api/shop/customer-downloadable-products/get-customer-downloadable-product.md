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
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: 404 Not Found
        cause: The downloadable product purchase ID does not exist or belongs to another customer
        solution: Verify the purchase ID and ensure you are authenticated as the correct customer
      - error: 403 Forbidden
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

## cURL Example

```bash
curl -X GET "http://localhost:8000/api/shop/customer-downloadable-products/1" \
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
