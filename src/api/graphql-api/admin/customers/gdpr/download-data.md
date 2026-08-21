---
outline: false
examples:
  - id: admin-customer-gdpr-download-data-gql
    title: Download GDPR Data Export
    description: Ad-hoc JSON dump of every table referencing the customer. `data` is a JSON value — query it bare.
    query: |
      mutation DownloadGdpr($input: createAdminCustomerGdprDownloadDataInput!) {
        createAdminCustomerGdprDownloadData(input: $input) {
          adminCustomerGdprDownloadData {
            id
            _id
            customerId
            customerEmail
            generatedAt
            data
          }
        }
      }
    variables: |
      {
        "input": {
          "customerId": 14
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerGdprDownloadData": {
            "adminCustomerGdprDownloadData": {
              "id": "/api/admin/customers/14/gdpr-download-data",
              "_id": 14,
              "customerId": 14,
              "customerEmail": "jane@example.com",
              "generatedAt": "2026-06-24 10:00:00",
              "data": {
                "customer": {
                  "id": 14,
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "email": "jane@example.com"
                },
                "addresses": [
                  {
                    "id": 31,
                    "city": "Mountain View",
                    "country": "US",
                    "postcode": "94043"
                  }
                ],
                "orders": [
                  {
                    "id": 1042,
                    "incrementId": "1042",
                    "grandTotal": 4000,
                    "status": "completed"
                  }
                ],
                "reviews": [
                  {
                    "id": 21,
                    "productId": 2358,
                    "rating": 5,
                    "status": "approved"
                  }
                ],
                "wishlist": [
                  {
                    "id": 88,
                    "productId": 2358
                  }
                ],
                "notes": [
                  {
                    "id": 7,
                    "note": "Called the customer about delivery."
                  }
                ]
              }
            }
          }
        }
      }
---

# Download GDPR Data Export (GraphQL)

Returns an ad-hoc JSON export of every table that references the customer — profile, addresses, orders, reviews, wishlist and notes. Not bound to a GDPR request; can be run on any customer. The `password` and `remember_token` fields are stripped from the `customer` block.

The `data` field is a JSON value — query it bare (no sub-selection).

Permission: `customers.gdpr_requests.view`.

See the [GDPR overview](/api/graphql-api/admin/customers/gdpr/) for how requests are processed.
