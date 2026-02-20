---
outline: false
examples:
  - id: download-invoice-with-bearer-token
    title: Download Invoice PDF with Bearer Token
    description: Download a customer invoice as PDF using the downloadUrl with Bearer token authentication.
    query: |
      curl -X GET "http://localhost:8000/api/shop/customer-invoices/1/pdf" \
        -H "X-STOREFRONT-KEY: <storefrontKey>" \
        -H "Authorization: Bearer <accessToken>" \
        -o invoice-1.pdf
    variables: |
      {}
    response: |
      HTTP/1.1 200 OK
      Content-Type: application/pdf
      Content-Disposition: attachment; filename="invoice-1-02-19-2026.pdf"
      Content-Length: 4352
      
      [PDF Binary Content]
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Invoice with specified ID does not exist or does not belong to the customer
        solution: Verify the invoice ID and ensure it belongs to the authenticated customer
      - error: FORBIDDEN
        cause: Customer is trying to download another customer's invoice
        solution: Verify the invoice ID belongs to the authenticated customer

  - id: download-invoice-via-graphql-url
    title: Get Invoice Download URL via GraphQL
    description: Retrieve the downloadUrl for a customer invoice via GraphQL, then use it to download the PDF.
    query: |
      query GetInvoiceDownloadUrl {
        customerInvoice(id: "/api/shop/customer-invoices/1") {
          _id
          incrementId
          downloadUrl
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "customerInvoice": {
            "_id": 1,
            "incrementId": "INV-001",
            "downloadUrl": "http://localhost:8000/api/shop/customer-invoices/1/pdf"
          }
        }
      }
    commonErrors:
      - error: UNAUTHENTICATED
        cause: Missing or invalid Bearer token
        solution: Login and provide a valid customer authentication token
      - error: NOT_FOUND
        cause: Invoice with specified ID does not exist
        solution: Verify the invoice ID and ensure it belongs to the authenticated customer

---

# Download Invoice

## About

The `downloadUrl` field from invoice queries provides a direct link to download customer invoices as PDF files. This REST endpoint allows customers to:

- Download invoices as PDF files
- Use the `downloadUrl` directly from GraphQL invoice queries
- Implement invoice download functionality in customer portals
- Generate invoice archives
- Email invoices to customers

The download endpoint is secured with Bearer token authentication and enforces customer isolation — customers can only download their own invoices.

## Authentication

The download endpoint requires customer authentication:

- **Method**: Bearer Token in Authorization header
- **Header**: `Authorization: Bearer <accessToken>`
- **Storefront Key**: `X-STOREFRONT-KEY: <storefrontKey>`

Obtain the access token via the [Customer Login API](/api/graphql-api/shop/mutations/customer-login).

## Getting the Download URL

### Via GraphQL

Retrieve the `downloadUrl` from any invoice query:

```graphql
query GetInvoiceDownloadUrl {
  customerInvoice(id: "/api/shop/customer-invoices/1") {
    downloadUrl
  }
}
```

Or retrieve multiple download URLs:

```graphql
query GetInvoiceList {
  customerInvoices(first: 10) {
    edges {
      node {
        _id
        incrementId
        downloadUrl
      }
    }
  }
}
```

## Download Endpoint

### URL Format

```
GET /api/shop/customer-invoices/{invoiceId}/pdf
```

### Parameters

| Parameter | Type | Location | Required | Description |
|-----------|------|----------|----------|-------------|
| `invoiceId` | Integer | URL Path | ✅ Yes | The numeric invoice ID to download. |

### Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Authorization` | `Bearer <token>` | ✅ Yes | Valid customer authentication token. |
| `X-STOREFRONT-KEY` | `<storefrontKey>` | ✅ Yes | Storefront API key. |

## Download Examples

### Using cURL with Bearer Token

```bash
curl -X GET "http://localhost:8000/api/shop/customer-invoices/1/pdf" \
  -H "X-STOREFRONT-KEY: pk_storefront_qrr4vsdbs6xNpL7DN0GHUcB0XnhjnjIS" \
  -H "Authorization: Bearer 4|RZI3ySNlzbcz5osLbnfuAcTgy2eqRN5i987eUsMS22e18f1c" \
  -o invoice-1.pdf
```

### Using JavaScript/Fetch

```javascript
const invoiceId = 1;
const downloadUrl = `http://localhost:8000/api/shop/customer-invoices/${invoiceId}/pdf`;
const accessToken = '<your-access-token>';
const storefrontKey = '<your-storefront-key>';

fetch(downloadUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'X-STOREFRONT-KEY': storefrontKey
  }
})
.then(response => response.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'invoice.pdf';
  a.click();
  window.URL.revokeObjectURL(url);
});
```

### Using Python Requests

```python
import requests

invoice_id = 1
download_url = f"http://localhost:8000/api/shop/customer-invoices/{invoice_id}/pdf"
access_token = '<your-access-token>'
storefront_key = '<your-storefront-key>'

headers = {
    'Authorization': f'Bearer {access_token}',
    'X-STOREFRONT-KEY': storefront_key
}

response = requests.get(download_url, headers=headers)

if response.status_code == 200:
    with open(f'invoice-{invoice_id}.pdf', 'wb') as f:
        f.write(response.content)
    print("Invoice downloaded successfully!")
else:
    print(f"Error: {response.status_code}")
```

## Response

### Success Response

```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="invoice-1-02-19-2026.pdf"
Content-Length: 4352

[PDF Binary Content]
```

### Response Headers

| Header | Value | Description |
|--------|-------|-------------|
| `Content-Type` | `application/pdf` | MIME type indicating PDF file. |
| `Content-Disposition` | `attachment; filename="..."` | Instructions to download as file attachment. |
| `Content-Length` | `{size}` | Size of the PDF file in bytes. |

## Error Responses

### 401 Unauthorized - Missing Token

```
HTTP/1.1 401 Unauthorized
Content-Type: text/html

Redirects to login page
```

**Cause**: Missing `Authorization` header or invalid token

**Solution**: Provide a valid customer access token via `Authorization: Bearer <token>` header

### 403 Forbidden - Invalid Token

```json
{
  "message": "Unauthenticated. Please login to perform this action",
  "exception": "AuthorizationException"
}
```

**Cause**: Bearer token is invalid or expired

**Solution**: Login again to obtain a fresh access token

### 404 Not Found

```json
{
  "errors": [
    {
      "message": "Invoice with ID \"999\" not found",
      "path": ["customerInvoice"]
    }
  ]
}
```

**Cause**: Invoice does not exist or belongs to another customer

**Solution**: Verify the invoice ID and ensure it belongs to the authenticated customer

## Use Cases

- **Customer Dashboard**: Direct download button for each invoice
- **Invoice Archive**: Batch download multiple invoices
- **Email Integration**: Attach invoices to customer emails
- **Document Management**: Store invoices locally for recordkeeping
- **Accounting Software**: Import invoices into accounting systems
- **Receipt Generation**: Generate customer receipts with invoice details

## Notes

- **Authentication Required**: All downloads require a valid Bearer token
- **Customer Isolation**: Customers can only download their own invoices
- **PDF Format**: Invoices are generated as standard PDF documents (version 1.7)
- **File Size**: PDF size varies based on invoice complexity (typically 3-10KB)
- **Caching**: Download URLs are unique per invoice and do not expire
- **Rate Limiting**: Subject to API rate limiting Same as other authenticated endpoints

## Implementation Workflow

1. **Get Invoice List**: Query `customerInvoices` to retrieve invoice IDs and `downloadUrl`
2. **Extract Download URL**: Use the `downloadUrl` from the GraphQL response
3. **Add Download Link**: Create a download button/link using the URL
4. **User Clicks Download**: Browser requests the PDF with authentication headers
5. **Receive PDF**: Browser downloads the invoice PDF file

## Related Resources

- [Get Customer Invoice](/api/graphql-api/shop/queries/get-customer-invoice) — Query a single invoice with downloadUrl
- [Get All Customer Invoices](/api/graphql-api/shop/queries/get-customer-invoices) — Query all invoices with downloadUrl
- [Customer Login](/api/graphql-api/shop/mutations/customer-login) — Obtain authentication token
- [REST API Authentication](/api/rest-api/authentication) — Learn more about API authentication
