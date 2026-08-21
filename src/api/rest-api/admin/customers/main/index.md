---
outline: false
apiType: rest
---

# Customers

The Customers menu manages the shopper accounts registered in your store — listing and searching them, viewing a full profile, and creating, editing, deleting, or bulk-managing them. It mirrors the admin **Customers → Customers** screen.

## What a customer record holds

Every customer carries their identity (`firstName`, `lastName`, `email`, `phone`, `gender`, `dateOfBirth`), an enabled/suspended status, and a Customer Group they belong to. The group is returned as a nested object, and the single-record `GET` additionally returns a set of activity aggregates.

## When a row appears here

A row exists for every registered customer — whether they signed up on the storefront or were created here by an admin. Guest checkouts do **not** create a customer row.

## Field meanings

| Field | Meaning |
|-------|---------|
| `firstName` / `lastName` / `email` / `phone` | Identity and contact details. `email` is unique across the store. |
| `gender` / `dateOfBirth` | Optional profile details. |
| `status` | Whether the account is enabled. A suspended customer cannot sign in. |
| `group` | The customer's group, returned as a nested object `{ id, code, name }` on both list rows and the detail response. |
| `totalOrders` | Count of the customer's orders. **Detail-only.** |
| `totalAddresses` | Number of saved addresses. **Detail-only.** |
| `totalAmountSpent` | Lifetime invoiced spend. **Detail-only.** |
| `createdAt` / `updatedAt` | Timestamps. |

The activity aggregates (`totalOrders`, `totalAddresses`, `totalAmountSpent`) are computed only on the single-customer `GET` — listing rows leave them null to keep the list fast.

## Filtering & sorting the listing

`GET /api/admin/customers` accepts name (first/last), `email`, `phone`, `customer_group_id`, `status`, `channel_id`, and date-of-birth / created-at ranges as query params; supplying several narrows the result (logical AND). Sort by `id` (default, descending), `email`, or `first_name`.

## What create / update / delete do

- **Create** (`POST`) adds a customer. Set `send_password` (default on) to auto-generate a password and email the credentials to the customer; turn it off to supply a `password` yourself. A Customer Group is required.
- **Update** (`PUT`) edits a customer; it is partial, so send only the fields you change. Email stays unique (excluding the customer themselves); supplying a `password` re-hashes it.
- **Delete** (`DELETE`) removes a customer — blocked when they have pending or processing orders (settle or cancel those first).

## Bulk actions

- **Mass Delete** removes several customers at once. A customer with active orders is skipped (reported under `skipped`) rather than aborting the whole batch.
- **Mass Update Status** enables or disables several customers in one call (`value` is `0` or `1`).

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List Customers](./list.md) | `GET /api/admin/customers` |
| [Customer Detail](./detail.md) | `GET /api/admin/customers/{id}` |
| [Create Customer](./create.md) | `POST /api/admin/customers` |
| [Update Customer](./update.md) | `PUT /api/admin/customers/{id}` |
| [Delete Customer](./delete.md) | `DELETE /api/admin/customers/{id}` |
| [Mass Delete](./mass-delete.md) | `POST /api/admin/customers/mass-delete` |
| [Mass Update Status](./mass-update-status.md) | `POST /api/admin/customers/mass-update-status` |

Permissions: `customers.customers.create` / `.edit` / `.delete`.
