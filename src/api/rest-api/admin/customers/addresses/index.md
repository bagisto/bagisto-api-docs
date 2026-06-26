---
outline: false
apiType: rest
---

# Addresses

The Addresses menu manages a customer's address book — the billing and shipping addresses saved against their account. It mirrors the address section of the admin customer screen, and the addresses here are what an admin picks from when placing an order on the customer's behalf.

## What an address holds

An address carries the recipient's name, company, the street/city/state/country/postcode, and a phone number. One address per customer can be marked the **default**; that one is pre-selected at checkout and in the admin Create-Order flow.

## Default-address semantics

A customer has at most one default address. When you create or update an address with the default flag set, the previously-default address is automatically un-flagged — there is never more than one default. The dedicated **Set as Default** endpoint flips an existing address to default and clears the flag on all the customer's other addresses.

## Ownership guard

Every address belongs to exactly one customer. Address endpoints are nested under that customer (`/customers/{customerId}/addresses/...`), and an address whose owner doesn't match the `customerId` in the path is rejected with a `403` — one customer's addresses can never be read or modified through another customer.

## What create / update / delete do

- **Create** (`POST`) adds an address to the customer's book. Setting the default flag promotes it (and demotes the old default).
- **Update** (`PUT`) edits an address; it is partial. Editing across customers is blocked by the ownership guard.
- **Set as Default** (`POST`) marks an address as the customer's default.
- **Delete** (`DELETE`) removes an address from the book.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List Addresses](../addresses.md) | `GET /api/admin/customers/{customerId}/addresses` |
| [Address Detail](./detail.md) | `GET /api/admin/customers/{customerId}/addresses/{id}` |
| [Create Address](./create.md) | `POST /api/admin/customers/{customerId}/addresses` |
| [Update Address](./update.md) | `PUT /api/admin/customers/{customerId}/addresses/{id}` |
| [Delete Address](./delete.md) | `DELETE /api/admin/customers/{customerId}/addresses/{id}` |
| [Set as Default](./set-default.md) | `POST /api/admin/customers/{customerId}/addresses/{id}/set-default` |

Permissions: `customers.addresses.create` / `.edit` / `.delete`.

All endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
