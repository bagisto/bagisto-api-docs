---
outline: false
examples:
  - id: update-customer-profile
    title: Update Customer Profile
    description: Update the authenticated customer's profile information.
    request: |
      PUT /api/shop/customer-profile-updates/{id}
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "gender": "M",
        "dateOfBirth": "1990-01-15"
      }
    response: |
      HTTP/1.1 200 OK

      {
        "id": "1821",
        "_id": "1821",
        "firstName": "Docs",
        "lastName": "Checked",
        "email": "doc.check@example.com",
        "phone": "12125550111",
        "status": "1",
        "subscribedToNewsLetter": false,
        "isVerified": "false",
        "isSuspended": "false",
        "success": true,
        "message": "Customer profile updated successfully"
      }
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 422 Unprocessable Entity
        cause: Email already exists
        solution: Use unique email address
      - error: 400 Bad Request
        cause: Invalid data format
        solution: Verify all fields match required format

---

# Update Customer Profile

Update the authenticated customer's profile information.

## Endpoint

```
PUT /api/shop/customer-profile-updates/{id}
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "1234567890",
  "gender": "M",
  "dateOfBirth": "1990-01-15"
}
```

## Request Parameters

Every field is optional — the update is a partial patch. Send only what changes; omitted fields keep their stored value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `firstName` | string | First name. |
| `lastName` | string | Last name. |
| `email` | string | Email address. Must not already belong to another customer. |
| `phone` | string | Digits only — a value carrying `+`, spaces, or dashes is rejected with "Mobile number can only contain digits. Special characters are not allowed". |
| `gender` | string | `Male`, `Female`, or `Other`. |
| `dateOfBirth` | string | Birth date as `YYYY-MM-DD`. |
| `currentPassword` | string | Required only when changing the password — see [Change Password](/api/rest-api/shop/customers/change-password). |
| `password` / `confirmPassword` | string | The new password and its confirmation. Both are needed together, and they must match. |

## Response Fields (200 OK)

The response is the updated profile itself — a flat object, not a wrapper.

| Field | Type | Description |
|-------|------|-------------|
| `id` / `_id` | string | Customer ID. |
| `firstName` / `lastName` | string | Updated name. |
| `email` | string | Updated email. |
| `phone` | string | Updated phone. |
| `gender` | string | Present once a gender has been set. |
| `dateOfBirth` | string | Present once a birth date has been set. |
| `status` | string | `"1"` when the account is active. |
| `subscribedToNewsLetter` | boolean | Newsletter subscription state. |
| `isVerified` / `isSuspended` | string | Account verification and suspension flags, returned as `"true"` / `"false"` on this endpoint. |
| `success` | boolean | `true` on a successful update. |
| `message` | string | Confirmation message. |

## Use Cases

- **Save a partial edit** — an account form that posts only the touched fields works as-is; the endpoint patches what it receives and leaves the rest alone.
- **Complete a profile after signup** — `gender` and `dateOfBirth` are absent from the profile until first written, and appear in every later read once set.
- **Rotate a password** — send `currentPassword`, `password`, and `confirmPassword` together; see [Change Password](/api/rest-api/shop/customers/change-password) for the failure cases.

## Best Practices

- **Strip formatting from the phone before sending** — the field takes digits only, so `+1 (212) 555-0111` is rejected; normalise to `12125550111` on the client.
- **Check the email is free before submitting** — an address already registered to another account is rejected with a `400` and the profile is left untouched.
- **Read the response instead of re-fetching** — the body is the full updated profile, so the account screen can be re-rendered from it directly.
- **Do not treat an email change as pending** — the new address takes effect immediately and the customer's next login uses it; there is no confirmation step to wait on.

## Related Resources

- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
- [Delete Customer Profile](/api/rest-api/shop/customers/delete-customer-profile) — permanently close the account
