---
outline: false
---

# Customers

The Customers menu manages the shopper accounts registered in your store — listing and searching them, viewing a full profile, and creating, editing, deleting, or bulk-managing them. It mirrors the admin **Customers → Customers** screen.

## What a customer record holds

Every customer carries their identity (`firstName`, `lastName`, `email`, `phone`, `gender`, `dateOfBirth`), an enabled/suspended status, and a Customer Group they belong to. The single-record query additionally returns the group as a nested object and a set of activity aggregates.

## When a row appears here

A row exists for every registered customer — whether they signed up on the storefront or were created here by an admin. Guest checkouts do **not** create a customer row.

## Field meanings

| Field | Meaning |
|-------|---------|
| `firstName` / `lastName` / `email` / `phone` | Identity and contact details. `email` is unique across the store. |
| `gender` / `dateOfBirth` | Optional profile details. |
| `status` | Whether the account is enabled. A suspended customer cannot sign in. |
| `group` | The customer's group, returned on the detail query as a nested object `{ id, code, name }`. |
| `customerGroupName` | The group name surfaced inline on listing rows. |
| `totalOrders` | Count of the customer's orders. **Detail-only.** |
| `totalAddresses` | Number of saved addresses. **Detail-only.** |
| `totalAmountSpent` | Lifetime invoiced spend. **Detail-only.** |
| `createdAt` / `updatedAt` | Timestamps. |

The activity aggregates (`totalOrders`, `totalAddresses`, `totalAmountSpent`) are computed only on the single-customer query — listing rows leave them null to keep the list fast.

## What create / update / delete do

- **Create** adds a customer. Set `sendPassword` (default on) to auto-generate a password and email the credentials to the customer; turn it off to supply a `password` yourself. A Customer Group is required.
- **Update** edits a customer; it is partial, so send only the fields you change alongside the `id`. Email stays unique (excluding the customer themselves); supplying a `password` re-hashes it.
- **Delete** removes a customer — blocked when they have pending or processing orders (settle or cancel those first).

## Bulk actions

- **Mass Delete** removes several customers at once. A customer with active orders is skipped (reported under `skipped`) rather than aborting the whole batch.
- **Mass Update Status** enables or disables several customers in one call (`value` is `0` or `1`).

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Customers](./list.md) | `adminCustomers` query |
| [Customer Detail](./detail.md) | `adminCustomer(id:)` query |
| [Create Customer](./create.md) | `createAdminCustomer` mutation |
| [Update Customer](./update.md) | `updateAdminCustomer` mutation |
| [Delete Customer](./delete.md) | `deleteAdminCustomer` mutation |
| [Mass Delete](./mass-delete.md) | `createAdminCustomerMassDelete` mutation |
| [Mass Update Status](./mass-update-status.md) | `createAdminCustomerMassUpdateStatus` mutation |

Permissions: `customers.customers.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
