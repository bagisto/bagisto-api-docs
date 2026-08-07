---
outline: false
examples:
  - id: get-customer-downloadable-product
    title: Get Single Customer Downloadable Product
    description: Retrieve details of a specific downloadable product purchase by its IRI identifier.
    query: |
      query GetCustomerDownloadableProduct {
        customerDownloadableProduct(id: "/api/shop/customer-downloadable-products/4") {
          _id
          productName
          name
          fileName
          type
          downloadBought
          downloadUsed
          downloadCanceled
          status
          downloadUrl
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
            "_id": 4,
            "productName": "Complete Personal Finance Guide (eBook PDF)",
            "name": "Full eBook PDF",
            "fileName": null,
            "type": "url",
            "downloadBought": 10,
            "downloadUsed": 1,
            "downloadCanceled": 0,
            "status": "available",
            "downloadUrl": "https://api-demo.bagisto.com/api/shop/customer-downloadable-products/4/download",
            "remainingDownloads": "9",
            "order": {
              "_id": 531,
              "incrementId": "531",
              "status": "completed",
              "grandTotal": 138
            },
            "createdAt": "2026-04-02T18:54:41+05:30",
            "updatedAt": "2026-04-02T18:55:29+05:30"
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
    downloadUrl
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
| `id` | ID! | Yes | The IRI of the downloadable product purchase (e.g., `/api/shop/customer-downloadable-products/1`). The numeric ID used in this IRI is the `_id` field from the [Get Downloadable Products](/api/graphql-api/shop/queries/get-customer-downloadable-products) query. |

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
| `downloadUrl` | String | Direct REST API URL to download the purchased file. Use this URL with a GET request and customer authentication to download the file. See [Download Downloadable Product](/api/graphql-api/shop/queries/download-downloadable-product). |
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

## Example with cURL

```bash
curl -X POST "https://api-demo.bagisto.com/api/graphql" \
  -H "X-STOREFRONT-KEY: pk_storefront_your_key_here" \
  -H "Authorization: Bearer YOUR_CUSTOMER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { customerDownloadableProduct(id: \"/api/shop/customer-downloadable-products/1\") { _id productName name fileName type downloadBought downloadUsed status downloadUrl remainingDownloads createdAt } }"
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
