---
outline: false
---

# Customer Groups

The Customer Groups menu manages the named groups customers are sorted into — such as *general*, *wholesale*, and *guest*. A group is the lever that drives group-specific pricing and promotions: every customer belongs to exactly one group, and catalog/cart rules can target a group. It mirrors the admin **Customers → Groups** screen.

## What a group holds

A group has a `code` (a stable identifier) and a `name` (the display label), plus a flag marking whether it is a built-in system group or an admin-created one. The single-group query also returns how many customers belong to it.

## System groups vs. user-defined groups

The store ships with built-in **system groups** (e.g. *general*, *wholesale*, *guest*) that other parts of the store rely on. These are protected:

- Their `code` cannot be changed and they cannot be re-flagged — only the `name` is editable.
- They cannot be deleted.

Groups you create through this menu are **user-defined** and fully editable.

## Delete guards

A group cannot be deleted when:

- It is a **system group**, or
- It is **in use** — one or more customers still belong to it. Re-assign those customers to another group first.

In a single delete the guard surfaces as an `errors[]` entry; in mass delete the blocked id is reported under `skipped` while the rest of the batch proceeds.

## Field meanings

| Field | Meaning |
|-------|---------|
| `code` | Stable group identifier. Unique; immutable on system groups. |
| `name` | Display label. |
| `isUserDefined` | Whether the group was created by an admin (vs. a built-in system group). |
| `customersCount` | Number of customers in the group. **Detail-only.** |
| `createdAt` / `updatedAt` | Timestamps. |

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Groups](./list.md) | `adminCustomerGroups` query |
| [Group Detail](./detail.md) | `adminCustomerGroup(id:)` query |
| [Create Group](./create.md) | `createAdminCustomerGroup` mutation |
| [Update Group](./update.md) | `updateAdminCustomerGroup` mutation |
| [Delete Group](./delete.md) | `deleteAdminCustomerGroup` mutation |
| [Mass Delete](./mass-delete.md) | `createAdminCustomerGroupMassDelete` mutation |

Permissions: `customers.groups.create` / `.edit` / `.delete`.
