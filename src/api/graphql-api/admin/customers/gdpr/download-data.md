---
outline: false
examples:
  - id: admin-customer-gdpr-download-data-gql
    title: Download GDPR Data Export
    query: |
      mutation DownloadGdpr($input: createAdminCustomerGdprDownloadDataInput!) {
        createAdminCustomerGdprDownloadData(input: $input) {
          adminCustomerGdprDownloadData { customerId customerEmail generatedAt data }
        }
      }
    variables: |
      { "input": { "customerId": 14 } }
    response: |
      { "data": { "createAdminCustomerGdprDownloadData": { "adminCustomerGdprDownloadData": { "customerId": 14, "customerEmail": "jane@example.com", "generatedAt": "2026-05-25 10:00:00", "data": { "customer": { "id": 14 }, "addresses": [], "orders": [], "reviews": [], "wishlist": [], "notes": [] } } } } }
---

# Download GDPR Data Export (GraphQL)

Ad-hoc dump (not bound to a request). `password` / `remember_token` stripped from `customer`. Permission: `customers.gdpr_requests.view`.
