---
outline: false
examples:
  - id: admin-authenticated-query
    title: Authenticated Query
    description: Every Admin GraphQL request carries the admin Bearer token. This example reads the authenticated admin's own profile to confirm the token works, and selects every field the query returns.
    query: |
      query {
        readAdminProfile {
          id
          name
          email
          image
          status
          roleId
          roleName
          success
          message
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "readAdminProfile": {
            "id": "/api/admin/admin_profiles/4",
            "name": "Admin User",
            "email": "admin@example.com",
            "image": null,
            "status": "1",
            "roleId": 1,
            "roleName": "Administrator",
            "success": true,
            "message": null
          }
        }
      }
---

# Admin Authentication

The Bagisto Admin GraphQL API authenticates every request with a pre-issued **Integration token**. There is no login mutation — you generate a token once in the admin panel and send it on every request.

## Endpoint

```
POST /api/admin/graphql
Authorization: Bearer <id>|<token>
Content-Type: application/json
```

Admin GraphQL has its **own** endpoint, separate from the shop GraphQL endpoint (`POST /api/graphql`). The admin endpoint authenticates with the Bearer token **only** — the storefront key is not used here. An interactive playground is available at `GET /api/admin/graphiql`.

## How to authenticate

1. In the admin panel, open the **Integration** menu (`Admin → Integration`) and generate a token.
2. Copy the token the moment it is shown — it is displayed **once**.
3. Send it on every Admin GraphQL request as a Bearer token:

```
Authorization: Bearer <id>|<token>
```

## About the token

- The token belongs to a specific admin user and carries that admin's permissions. A request can never do more than the owning admin is allowed to do.
- The plaintext format is `<id>|<random>`. Send it verbatim.
- A token can be locked down with scoped **permissions**, an **IP allowlist**, an **expiry date**, and **rate limits** — see [Token security](#token-security) below.
- Revoke or regenerate a token at any time from the same **Integration** menu. A revoked token stops working immediately.

## Token security

Each Integration token can be locked down at generation time in the **Integration** menu. Four independent controls scope what a token can do:

### Permissions (ACL)

A token is tied to one admin and **inherits that admin's role permissions** — it can never do more than its owner. When generating the token you choose a permission mode:

- **All** — every action the owner's role allows.
- **Custom** — a specific subset of permissions you select, frozen onto the token.
- **Same as web** — always mirrors the owner's current role, so the token automatically follows any later changes to that role.

A query or mutation for an action the token isn't permitted to perform returns HTTP `200` with the failure described in the GraphQL `errors[]` array, and `null` in `data` for that field:

```json
{
  "errors": [
    {
      "message": "You do not have permission to view this sales resource.",
      "path": ["adminInvoices"]
    }
  ],
  "data": {
    "adminInvoices": null
  }
}
```

### IP allowlist

Optionally restrict a token to specific client IPs. Individual **IPv4** and **IPv6** addresses and **CIDR ranges** are all supported. Leave the allowlist empty to allow any IP. A request from an address that isn't on the list is rejected as **401 Unauthenticated**. (`127.0.0.1` is always allowed, for local development.)

### Expiry

A token can have an **expiry date** (default: one year after generation) or be set to **never expire**. After the expiry date the token stops working (**401**).

### Rate limits

Each token carries two independent caps, both set when the token is generated:

| Bucket | Default |
|---|---|
| Per minute | 60 requests |
| Per day | 10,000 requests |

Exceeding either returns HTTP `429` with `{"message": "Too Many Attempts.", "error": "rate_limit_exceeded"}` and these headers:

| Header | Meaning |
|---|---|
| `Retry-After` | Seconds until the bucket refills |
| `X-RateLimit-Limit` | The cap that was hit |
| `X-RateLimit-Remaining` | Requests left, `0` on a 429 |
| `X-RateLimit-Reset` | Unix timestamp when the window resets |

Three details worth knowing:

- **The two caps are separate buckets.** Hitting the per-minute cap does not consume the daily allowance, and the `Retry-After` you get back tells you which one you hit — roughly a minute versus the remainder of the day.
- **The cap is per token, not per admin or per IP.** Two tokens owned by the same admin have independent allowances.
- **REST and GraphQL share one bucket.** `/api/admin/graphql` draws on the same per-token allowance as the REST routes, so a client using both must budget across the two.

Choose **Unlimited** for either bucket when generating or editing the token to remove that cap; set both to Unlimited for an unthrottled token.

## Token lifecycle

- **One active token per admin.** Each admin user holds a single active (or draft) token at a time. To issue a new one, revoke or regenerate the existing token first — the generate form only offers admins who don't already have one.
- **States.** A token moves through **draft** (created but not yet generated — no secret), **active** (generated and usable), **revoked** (manually killed — stops working immediately, kept for audit), and **regenerated** (superseded by a newer token — the old row is retired but kept for audit).
- **Regenerate.** Issues a fresh secret on a new token row and retires the old one; the new plaintext is shown **once**. Use it when a token may be compromised, without losing the audit trail.
- **Revoke.** Kills the token immediately — from the Integration menu, or the one-click link in the lifecycle email.
- **Email notifications.** The owning admin is emailed on generate, regenerate, and revoke. Generate and regenerate emails carry a **signed, 7-day, login-free revoke link** so the owner can kill a token from their inbox. The plaintext token is **never** included in any email.

## Errors

| Condition | Result |
|---|---|
| Missing / malformed / expired / revoked token, or client IP not on the token's allowlist | HTTP `401` with `{"message": "Unauthenticated.", "error": "unauthenticated"}` |
| Token valid but lacks permission for the action | HTTP `200` with the failure in GraphQL `errors[]` and `null` in `data` for that field |
| Malformed query or unknown field | HTTP `200` with a validation entry in GraphQL `errors[]` |
| Per-minute or per-day rate limit exceeded | HTTP `429` with `{"message": "Too Many Attempts.", "error": "rate_limit_exceeded"}` |

Authentication failures are returned by the transport before the GraphQL layer runs, so they carry a plain JSON body rather than a GraphQL `errors[]` array.

## Examples

Use the interactive example on the right to see an authenticated request in GraphQL, cURL, Node.js, React, and PHP.
