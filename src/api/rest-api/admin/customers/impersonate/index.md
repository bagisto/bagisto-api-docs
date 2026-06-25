---
outline: false
apiType: rest
---

# Impersonate

The Impersonate menu is the API equivalent of the admin datagrid's **"Login as Customer"** action — it lets an admin act as a customer to reproduce an issue, check what the customer sees, or place an order in their shoes.

## How "Login as Customer" works headlessly

In the admin panel, "Login as Customer" logs the admin into the storefront as that customer through a browser session. That session-based flow doesn't translate to a stateless API, so the API does the headless equivalent: it **issues a short-lived customer token**. The admin uses that token as the customer's Bearer token to call the storefront API (`/api/shop/*`) as the customer.

So "login as customer" becomes "get a customer token".

## Token semantics

- The issued token is **short-lived — it expires one hour after issue**.
- It is tagged with the issuing admin's id for audit, so impersonation is traceable.
- The response returns the token plus the customer's id, email, and name, the issuing admin id, and the expiry time.

## Field meanings

| Field | Meaning |
|-------|---------|
| `token` | The customer Bearer token to use against the storefront API. |
| `customerId` / `customerEmail` / `customerName` | Who the token acts as. |
| `impersonatedByAdminId` | The admin who issued it (audit). |
| `expiresAt` | When the token stops working (one hour from issue). |

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [Issue Impersonation Token](./create.md) | `POST /api/admin/customers/{customerId}/impersonate` |

Permission: `customers.customers.edit`.

All endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
