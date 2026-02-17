---
outline: false
examples:
  - id: customer-verify-token
    title: Verify Email Token
    description: Verify a customer's email using a verification token.
    query: |
      mutation createVerifyToken {
        createVerifyToken(input: {}) {
          verifyToken {
            isValid
            message
          }
        }
      }
    response: |
      {
        "data": {
          "createVerifyToken": {
            "verifyToken": {
              "isValid": true,
              "message": "Token is valid"
            }
          }
        }
      }
---

# Verify Customer Token

Verify a customer's token is valid or not.

## Request Headers

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `Authorization` | String | ✅ Yes | Customer login token use as Bearer Token |
| `X-STOREFRONT-KEY` | String | ✅ Yes | Storefront API key for authentication |
 
## Response

| Field | Type | Description |
|-------|------|-------------|
| `message` | String | Success or error message |
| `isValid` | Boolean | Verification success status |

## Use Cases

- Check user login or not
- Customer token is valid or not
- Account activation

## Error Responses

```json
{
  "errors": {
    "token": ["Unauthenticated. Please login to perform this action"]
  }
}
```
 
## Related Documentation

- [Customer Registration](/api/graphql-api/shop/mutations/customer-registration)
- [Authentication Guide](/api/graphql-api/authentication)
