---
outline: false
examples:
  - id: get-customer-profile
    title: Get Customer Profile
    description: Retrieve the authenticated customer's profile information.
    request: |
      GET /api/shop/customer-profile
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": "1821",
          "firstName": "Doc",
          "lastName": "Check",
          "email": "doc.check@example.com",
          "phone": null,
          "gender": null,
          "dateOfBirth": null,
          "status": "1",
          "subscribedToNewsLetter": false,
          "isVerified": "0",
          "isSuspended": "0",
          "image": null,
          "password": null,
          "confirmPassword": null,
          "success": null,
          "message": null
        }
      ]
    commonErrors:
      - error: 401 Unauthorized
        cause: Customer not authenticated
        solution: Provide valid Bearer token
      - error: 404 Not Found
        cause: Customer profile not found
        solution: Verify authentication token validity

---

# Get Customer Profile

Retrieve the authenticated customer's profile information.

## Endpoint

```
GET /api/shop/customer-profile
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Response

The response is an array holding exactly one object — the authenticated customer. There is no `customer` wrapper key; read `[0]`.

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Customer ID, returned as a string on this endpoint. |
| `firstName` / `lastName` | string | Name on the account. |
| `email` | string | Email address, also the login identifier. |
| `phone` | string | Phone number, `null` until one is saved. |
| `gender` | string | `Male`, `Female`, or `Other`. Absent from the payload until first set. |
| `dateOfBirth` | string | Birth date as `YYYY-MM-DD`. Absent until first set. |
| `status` | string | `"1"` while the account is active. |
| `subscribedToNewsLetter` | boolean | Newsletter subscription state. |
| `isVerified` | string | `"1"` once the email has been verified, `"0"` otherwise. |
| `isSuspended` | string | `"1"` when an admin has suspended the account. |
| `image` | string | Profile image path, `null` when none is set. |
| `password` / `confirmPassword` | string | Always `null` — they exist because the same shape backs the update endpoint, and the stored hash is never returned. |
| `success` / `message` | string | Always `null` on a read; they carry values only on [Update Profile](/api/rest-api/shop/customers/update-customer-profile). |

Note the flags differ by endpoint: this read returns `isVerified` and `isSuspended` as `"0"` / `"1"`, while the update response returns them as `"false"` / `"true"`.

## Use Cases

- **Account dashboard** — one call returns everything the account screen shows, so no per-field lookups are needed.
- **Pre-fill the edit form** — read here, submit the changed subset to [Update Profile](/api/rest-api/shop/customers/update-customer-profile); the update is a partial patch.
- **Session-state check on load** — `401` means the stored token is dead; a `200` doubles as confirmation the session is live.

## Best Practices

- **Unwrap the array first** — the payload is `[{…}]`, not `{…}`, and a client that reads it as an object gets undefined everywhere.
- **Do not treat missing `gender` or `dateOfBirth` as an error** — the keys are simply absent until the customer sets them.
- **Ignore `password`, `confirmPassword`, `success`, and `message` here** — they are structural placeholders on the read path.

## Related Resources

- [Update Customer Profile](/api/rest-api/shop/customers/update-customer-profile) — patch name, email, phone, and other profile fields
- [Get Customer Addresses](/api/rest-api/shop/customers/get-customer-addresses) — the customer's saved address book
- [Get Customer Orders](/api/rest-api/shop/customer-orders/get-customer-orders) — the customer's order history
