---
outline: false
examples:
  - id: get-customer-downloadable-product
    title: Get Single Customer Downloadable Product
    description: Retrieve details of a specific downloadable product purchase by its IRI identifier.
    query: |
      query GetCustomerDownloadableProduct {
        customerDownloadableProduct(id: "/api/shop/customer-downloadable-products/1") {
          _id
          productName
          name
          fileName
          type
          downloadBought
          downloadUsed
          downloadCanceled
          status
          remainingDownloads
          order {
            _id
            incrementId
            status
            grandTotal
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerDownloadableProduct": {
            "_id": 1,
            "productName": "Laravel E-Book",
            "name": "PDF Download",
            "fileName": "laravel-ebook.pdf",
            "type": "file",
            "downloadBought": 5,
            "downloadUsed": 1,
            "downloadCanceled": 0,
            "status": "available",
            "remainingDownloads": 4,
            "order": {
              "_id": 101,
              "incrementId": "101",
              "status": "completed",
              "grandTotal": 29.99
            },
            "createdAt": "2025-06-15T10:30:00+00:00",
            "updatedAt": "2025-06-15T10:30:00+00:00"
          }
        }
      }
    commonErrors:
      - error: Unauthenticated
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: Not Found
        cause: The downloadable product purchase ID does not exist or belongs to another customer
        solution: Verify the purchase ID and ensure you are authenticated as the correct customer
---

# Get Customer Downloadable Product

Retrieve details of a specific downloadable product purchase by its IRI identifier. This is a **read-only** API — customers can view a single purchased downloadable link, check its download status, and see remaining downloads.

## Query

```graphql
query GetCustomerDownloadableProduct {
  customerDownloadableProduct(id: "/api/shop/customer-downloadable-products/1") {
    _id
    productName
    name
    fileName
    type
    downloadBought
    downloadUsed
    downloadCanceled
    status
    remainingDownloads
    order {
      _id
      incrementId
      status
      grandTotal
    }
    createdAt
    updatedAt
  }
}
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | ID! | Yes | The IRI of the downloadable product purchase (e.g., `/api/shop/customer-downloadable-products/1`) |

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | Int | Downloadable link purchase ID |
| `productName` | String | Name of the purchased product |
| `name` | String | Name of the downloadable link |
| `fileName` | String | Display name of the file |
| `type` | String | Link type: `file` or `url` |
| `downloadBought` | Int | Total number of allowed downloads |
| `downloadUsed` | Int | Number of times downloaded |
| `downloadCanceled` | Int | Number of canceled downloads |
| `status` | String | Purchase status: `available`, `expired`, or `pending` |
| `remainingDownloads` | Int | Computed remaining downloads (`null` if unlimited) |
| `order` | Object | Associated order details |
| `createdAt` | DateTime | Purchase creation date |
| `updatedAt` | DateTime | Purchase last update date |

## Request Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Content-Type` | `application/json` | Yes | Request content type |
| `X-STOREFRONT-KEY` | `pk_storefront_xxx` | Yes | Storefront API key |
| `Authorization` | `Bearer {token}` | Yes | Customer authentication token |

## cURL Example

```bash
curl -X POST "http://localhost:8000/api/graphql" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { customerDownloadableProduct(id: \"/api/shop/customer-downloadable-products/1\") { _id productName name fileName type downloadBought downloadUsed status remainingDownloads createdAt } }"
  }'
```

## Error Responses

### Item Not Found

```json
{
  "errors": [
    {
      "message": "Customer downloadable product with ID \"999\" not found",
      "locations": [{ "line": 2, "column": 3 }],
      "path": ["customerDownloadableProduct"]
    }
  ]
}
```

## Notes

- **IRI format:** The `id` argument uses the IRI format `/api/shop/customer-downloadable-products/{id}`.
- **Customer isolation:** A customer can only access their own purchases. Requesting another customer's purchase returns a not found error.
- **Computed field:** `remainingDownloads` is calculated as `downloadBought - downloadUsed - downloadCanceled`. Returns `null` for unlimited downloads.
