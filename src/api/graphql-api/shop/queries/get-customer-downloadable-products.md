---
outline: false
examples:
  - id: get-customer-downloadable-products-basic
    title: Get All Customer Downloadable Products
    description: Retrieve a paginated list of downloadable product purchases for the authenticated customer using cursor-based pagination.
    query: |
      query GetCustomerDownloadableProducts {
        customerDownloadableProducts(first: 10) {
          edges {
            cursor
            node {
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
              }
              createdAt
              updatedAt
            }
          }
          pageInfo {
            endCursor
            startCursor
            hasNextPage
            hasPreviousPage
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerDownloadableProducts": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
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
                    "status": "completed"
                  },
                  "createdAt": "2025-06-15T10:30:00+00:00",
                  "updatedAt": "2025-06-15T10:30:00+00:00"
                }
              },
              {
                "cursor": "Mg==",
                "node": {
                  "_id": 2,
                  "productName": "Stock Photo Pack",
                  "name": "High-Res Bundle",
                  "fileName": "photo-pack.zip",
                  "type": "url",
                  "downloadBought": 3,
                  "downloadUsed": 3,
                  "downloadCanceled": 0,
                  "status": "expired",
                  "remainingDownloads": 0,
                  "order": {
                    "_id": 102,
                    "incrementId": "102",
                    "status": "completed"
                  },
                  "createdAt": "2025-06-10T08:00:00+00:00",
                  "updatedAt": "2025-06-12T14:00:00+00:00"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "startCursor": "MQ==",
              "hasNextPage": false,
              "hasPreviousPage": false
            },
            "totalCount": 2
          }
        }
      }
    commonErrors:
      - error: Unauthenticated
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: Invalid storefront key
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header

  - id: get-customer-downloadable-products-filter-status
    title: Filter by Status
    description: Filter downloadable product purchases by status (available, expired, or pending).
    query: |
      query GetAvailableDownloads {
        customerDownloadableProducts(first: 10, status: "available") {
          edges {
            cursor
            node {
              _id
              productName
              name
              status
              downloadBought
              downloadUsed
              remainingDownloads
            }
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerDownloadableProducts": {
            "edges": [
              {
                "cursor": "MQ==",
                "node": {
                  "_id": 1,
                  "productName": "Laravel E-Book",
                  "name": "PDF Download",
                  "status": "available",
                  "downloadBought": 5,
                  "downloadUsed": 1,
                  "remainingDownloads": 4
                }
              }
            ],
            "totalCount": 1
          }
        }
      }

  - id: get-customer-downloadable-products-pagination
    title: Pagination — Forward
    description: Use the `after` cursor to paginate forward through downloadable product results.
    query: |
      query GetNextPage {
        customerDownloadableProducts(first: 5, after: "MQ==") {
          edges {
            cursor
            node {
              _id
              productName
              name
              status
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
          totalCount
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerDownloadableProducts": {
            "edges": [
              {
                "cursor": "Mg==",
                "node": {
                  "_id": 2,
                  "productName": "Stock Photo Pack",
                  "name": "High-Res Bundle",
                  "status": "expired"
                }
              }
            ],
            "pageInfo": {
              "endCursor": "Mg==",
              "hasNextPage": false
            },
            "totalCount": 2
          }
        }
      }
---

# Get Customer Downloadable Products

Retrieve a paginated list of downloadable product purchases belonging to the authenticated customer. This is a **read-only** API — customers can view their purchased downloadable links, check download status, and see remaining downloads.

## Query

```graphql
query GetCustomerDownloadableProducts {
  customerDownloadableProducts(first: 10) {
    edges {
      cursor
      node {
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
        }
        createdAt
        updatedAt
      }
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
      hasPreviousPage
    }
    totalCount
  }
}
```

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `first` | Int | No | Number of items to return from the start (default: 10) |
| `last` | Int | No | Number of items to return from the end |
| `after` | String | No | Cursor to start pagination after |
| `before` | String | No | Cursor to start pagination before |
| `status` | String | No | Filter by status: `available`, `expired`, or `pending` |

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

### Status Values

| Status | Description |
|--------|-------------|
| `available` | Download link is active and can be used |
| `pending` | Order has not been invoiced yet; download is not available |
| `expired` | All downloads have been used or the link has expired |

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
    "query": "query { customerDownloadableProducts(first: 10) { edges { cursor node { _id productName name fileName type downloadBought downloadUsed status remainingDownloads createdAt } } pageInfo { endCursor hasNextPage } totalCount } }"
  }'
```

## Notes

- **Read-only API:** Only `GET` / query operations are available.
- **Customer isolation:** Purchases are automatically filtered by the authenticated customer. A customer can never see another customer's purchases.
- **Status filtering:** Use the `status` parameter to filter by `available`, `expired`, or `pending`.
- **Cursor pagination:** Uses cursor-based pagination. Use `first`/`after` for forward pagination and `last`/`before` for backward pagination.
- **Computed field:** `remainingDownloads` is calculated as `downloadBought - downloadUsed - downloadCanceled`. Returns `null` for unlimited downloads.
