---
outline: false
examples:
  - id: delete-customer-profile
    title: Delete Customer Profile
    description: Permanently delete the authenticated customer's account. The account is identified by the Bearer token; the body carries nothing.
    request: |
      POST /api/shop/customer-profile-deletes/1821
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer 12|Iy8NExampleCustomerAccessToken

      {}
    response: |
      HTTP/1.1 201 Created

      null
    commonErrors:
      - error: 401 Unauthorized
        cause: The Bearer token is missing, invalid, or already revoked by an earlier delete
        solution: Log the customer in and send the token returned by the login response
      - error: 401 on every later request
        cause: This is expected — deleting the account revokes all of its tokens
        solution: Clear the stored token client-side and return the shopper to a logged-out state

---

# Delete Customer Profile

Permanently delete the authenticated customer's account.

## Endpoint

```
POST /api/shop/customer-profile-deletes/{id}
```

The `{id}` is the authenticated customer's ID. The account acted on is always the one the Bearer token belongs to — an ID belonging to someone else does not delete their account.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token of the customer being deleted |

## Request Body

Send `{}`. No field is read — deletion is not password-confirmed at the API level, so treat the call itself as the point of no return and confirm intent in the UI.

## Response

`201 Created` with a body of `null`. There is no message payload; the status is the confirmation.

## What Deletion Removes

| Data | Outcome |
|------|---------|
| Customer record and profile image | Deleted. |
| Access tokens | All revoked — every later request with them answers `401`. |
| Saved addresses | Deleted. |
| Cart, wishlist, and compare list | Deleted. |
| Customer notes, social accounts, GDPR requests | Deleted. |
| Purchased downloadable links | Deleted, so the shopper loses access to files they had bought. |
| Orders | Kept, with the customer link cleared. The name and email captured on the order at checkout remain on the order record. |
| Invoices, shipments, refunds | Kept, attached to those orders. |
| Newsletter subscription | Kept, with the customer link cleared — the address stays subscribed. |
| Product reviews | Kept and still displayed. |
| EU withdrawal requests | Kept, with the customer link cleared. |

The email address becomes free again the moment the record is gone, so the shopper can register a fresh account with it.

## Use Cases

- **Account-closure screen** — call once from a confirmed "delete my account" action, then discard the stored token and route the shopper to the logged-out home page.
- **GDPR erasure by the shopper** — this is the self-service counterpart to raising a `delete` [GDPR request](/api/rest-api/shop/gdpr-requests/create-gdpr-request), which instead queues the erasure for an admin to action.

## Best Practices

- **Confirm in the UI, not in the payload** — no password or confirmation field is checked, so the only guard against an accidental deletion is the one you build.
- **Warn about downloadable purchases first** — purchased download links are removed with the account, unlike orders, which survive.
- **Clear the token immediately after the call** — reusing it produces `401` on every endpoint, which is easy to misread as an outage.
- **Point shoppers who only want to stop emails at the newsletter opt-out** — the subscription survives account deletion, so deleting the account does not unsubscribe them.

## Related Resources

- [Get Customer Profile](/api/rest-api/shop/customers/get-customer-profile) — read the authenticated customer's account details
- [Update Customer Profile](/api/rest-api/shop/customers/update-customer-profile) — patch name, email, phone, and other profile fields
- [Customer Logout](/api/rest-api/shop/customers/customer-logout) — revoke the token used on the request
