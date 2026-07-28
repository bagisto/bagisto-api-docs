---
outline: false
examples:
  - id: admin-authenticated-query
    title: Authenticated Query
    description: Every Admin GraphQL request carries the admin Bearer token. This example reads the authenticated admin's own profile to confirm the token works.
    query: |
      query {
        readAdminProfile {
          id
          name
          email
          status
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
            "status": "1"
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

A query or mutation for an action the token isn't permitted to perform fails with a **Forbidden** entry in the GraphQL `errors[]`.

### IP allowlist

Optionally restrict a token to specific client IPs. Individual **IPv4** and **IPv6** addresses and **CIDR ranges** are all supported. Leave the allowlist empty to allow any IP. A request from an address that isn't on the list is rejected as **401 Unauthenticated**. (`127.0.0.1` is always allowed, for local development.)

### Expiry

A token can have an **expiry date** (default: one year after generation) or be set to **never expire**. After the expiry date the token stops working (**401**).

### Rate limits

Each token is throttled by two independent buckets:

| Bucket | Default |
|---|---|
| Per minute | 60 requests |
| Per day | 10,000 requests |

Exceeding either limit returns **429 Too Many Requests**.

**Unlimited rate limit** — when generating or editing the token, choose the **Unlimited** option for the per-minute and/or per-day limit. That removes the cap for that bucket; set **both** to Unlimited for a fully unthrottled token.

## Token lifecycle

- **One active token per admin.** Each admin user holds a single active (or draft) token at a time. To issue a new one, revoke or regenerate the existing token first — the generate form only offers admins who don't already have one.
- **States.** A token moves through **draft** (created but not yet generated — no secret), **active** (generated and usable), **revoked** (manually killed — stops working immediately, kept for audit), and **regenerated** (superseded by a newer token — the old row is retired but kept for audit).
- **Regenerate.** Issues a fresh secret on a new token row and retires the old one; the new plaintext is shown **once**. Use it when a token may be compromised, without losing the audit trail.
- **Revoke.** Kills the token immediately — from the Integration menu, or the one-click link in the lifecycle email.
- **Email notifications.** The owning admin is emailed on generate, regenerate, and revoke. Generate and regenerate emails carry a **signed, 7-day, login-free revoke link** so the owner can kill a token from their inbox. The plaintext token is **never** included in any email.

## Errors

| Condition | Result |
|---|---|
| Missing / malformed / expired / revoked token, or client IP not on the token's allowlist | `401 Unauthenticated` |
| Token valid but lacks permission for the action | GraphQL `errors[]` (Forbidden) |
| Per-minute or per-day rate limit exceeded | `429 Too Many Requests` |

## Examples

Use the interactive example on the right to see an authenticated request in GraphQL, cURL, Node.js, React, and PHP.
