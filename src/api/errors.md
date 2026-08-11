# Status Codes

How the API reports failures. The two transports signal errors differently — REST uses the HTTP status, GraphQL always returns `200` and puts the failure in `errors[]` — but both draw from the same set of conditions below.

## REST vs GraphQL error shape

**REST** — the HTTP status carries the outcome; the body carries the message.

```
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{ "detail": "The email field is required.", "status": 422 }
```

Branch on the **status code**, not on the message text (messages are localised and may change).

**GraphQL** — the HTTP status is almost always `200`. A failed operation returns its field as `null` and the reason in a top-level `errors[]` array.

```json
{
  "data": { "createCheckoutOrder": null },
  "errors": [
    { "message": "Please select a payment method." }
  ]
}
```

A partial success is possible: some fields resolve while `errors[]` lists what did not. Always check `errors[]` even when `data` is present.

## Status codes

| Status | Meaning | Typical cause | What to do |
|--------|---------|---------------|------------|
| `200` | OK | Success (GraphQL: also check `errors[]`) | — |
| `201` | Created | Resource created (register, place order, add address) | — |
| `204` | No Content | Deleted successfully | — |
| `400` | Bad Request | Missing/invalid input, business-rule violation | Fix the request body |
| `401` | Unauthorized | Missing/invalid/expired credential | Get a new credential (re-login / rotate / regenerate) — there is no refresh token |
| `403` | Forbidden | Authenticated but not allowed (wrong owner, missing permission) | Use the right account/token |
| `404` | Not Found | Entity does not exist, or is not yours | Verify the id |
| `409` | Conflict | Out-of-sequence step (e.g. shipping before an address is set), or empty cart | Complete the prerequisite step first |
| `422` | Unprocessable Entity | Validation failed, or stock unavailable | Correct the fields / quantities |
| `429` | Too Many Requests | Rate limit exceeded | Back off — see [Rate Limiting](/api/rate-limiting) |
| `500` | Server Error | Unexpected server fault | Retry; report if it persists |

GraphQL maps the same conditions into `errors[]` (there is no HTTP `422`/`404` over GraphQL — the message identifies the cause).

## The two 401 messages

A `401` comes back with one of two messages — treat both identically:

- `Unauthenticated. Please login to perform this action`
- `Invalid or expired authentication token`

Both mean "get a new credential." There is no refresh flow — see [Authentication → Credential lifetimes](/api/authentication#credential-lifetimes).

## Common conditions

| Condition | REST | GraphQL |
|-----------|------|---------|
| No / wrong storefront key | `401` `missing_key` / `invalid_key` | `401` at the transport (same key check) |
| Not logged in for a customer action | `401` | `errors[]` "unauthenticated" |
| Accessing another customer's resource | `403` / `404` | `errors[]` |
| Validation failure | `422` | `errors[]` with the field message |
| Cart empty at checkout | `409` | `errors[]` |
| Checkout step out of order | `409` | `errors[]` |
| Out of stock | `422` | `errors[]` |

## Handling pattern

1. **REST:** switch on the status code. `2xx` → success; `401` → renew credential; `403`/`404` → surface "not available"; `409`/`422` → show the body message to the user; `429` → back off; `5xx` → retry.
2. **GraphQL:** treat any non-empty `errors[]` as a failure even on `200`; read `errors[0].message` for the reason; do not rely on `data` being null.
