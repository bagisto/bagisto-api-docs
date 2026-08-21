---
outline: false
examples:
  - id: admin-customer-address-detail-gql
    title: Customer Address Detail
    query: |
      query AdminCustomerAddress($customerId: Int!, $id: ID!) {
        adminCustomerAddress(customerId: $customerId, id: $id) {
          id
          _id
          customerId
          addressType
          firstName
          lastName
          companyName
          address
          city
          state
          country
          postcode
          email
          phone
          vatId
          defaultAddress
        }
      }
    variables: |
      {
        "customerId": 14,
        "id": "/api/admin/customers/14/addresses/27"
      }
    response: |
      {
        "data": {
          "adminCustomerAddress": {
            "id": "/api/admin/customers/14/addresses/27",
            "_id": 27,
            "customerId": 14,
            "addressType": "customer",
            "firstName": "Jane",
            "lastName": "Doe",
            "companyName": "Acme Inc.",
            "address": "742 Evergreen Terrace",
            "city": "Springfield",
            "state": "IL",
            "country": "US",
            "postcode": "62704",
            "email": "jane@example.com",
            "phone": "+15551234567",
            "vatId": "GB123456789",
            "defaultAddress": true
          }
        }
      }
---

# Customer Address Detail (GraphQL)

Fetches a single saved address for a customer by its id. The address must belong to the `customerId` passed in, otherwise an error is returned.

See the [Customer Addresses overview](/api/graphql-api/admin/customers/) for how the address book fits into the customer screen.
