---
outline: false
examples:
  - id: delete-customer-profile
    title: Delete Customer Account
    description: Permanently delete the authenticated customer's account.
    query: |
      mutation deleteCustomerProfile {
        createCustomerProfileDelete(input: {}) {
          customerProfileDelete {
            id
          }
        } 
      }
    response: |
      {
        "data": {
          "createCustomerProfileDelete": {
            "customerProfileDelete": null
          }
        }
      }
---

# Delete Customer Account

Permanently delete the authenticated customer's account and all associated data.

## Authentication

 This query requires a valid customer authentication token in the `Authorization` header. Use the [Customer Login API](/api/graphql-api/shop/mutations/customer-login) to retrieve the token.

```
Authorization: Bearer <accessToken>
```


## Important Notes

⚠️ **This action is permanent and cannot be undone**

When a customer account is deleted:
- All personal information is removed
- Order history is archived (for legal compliance)
- Wishlist items are removed
- Addresses are deleted
- Authentication tokens are invalidated

## Error Responses

```json
{
  "errors": {
    "message": "Invalid or expired token",
  }
}
```

## Related Documentation

- [Update Customer Profile](/api/graphql-api/shop/mutations/update-customer-profile)
- [Customer Logout](/api/graphql-api/shop/mutations/customer-logout)
