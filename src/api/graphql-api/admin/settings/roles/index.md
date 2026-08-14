---
outline: false
---

# Roles

The Roles menu manages the named permission sets that govern what each admin user can do. It mirrors the admin **Settings → Users → Roles** screen.

## What a role is

A **role** is a named bundle of permissions assigned to admin users. It controls which areas of the admin panel a user can reach and which actions they can take there. Every admin user is assigned exactly one role; that role is the single source of truth for their access. Roles are referenced when you create or edit an admin user — the user inherits whatever the role grants.

## Field meanings

| Field | Meaning |
|-------|---------|
| `id` / `_id` | The role's IRI id and numeric id. |
| `name` | Display name of the role (e.g. *Administrator*, *Sales*). |
| `description` | Free-text note describing the role's purpose. |
| `permissionType` | `all` or `custom` — see below. |
| `permissions` | The granted permission keys (see below). |
| `createdAt` / `updatedAt` | Timestamps. The seeded Administrator role has `null` timestamps. |

### `permissionType` — `all` vs `custom`

- **`all`** — the role has **full access** to every area of the admin. No explicit key list is stored, so `permissions` is `null` (and is forced to `[]` whenever you switch an existing role to `all`).
- **`custom`** — the role grants only the permission keys listed in `permissions`. Anything not in the list is denied.

### `permissions` — the key list

For a `custom` role this is a **string array** of permission keys. Keys are hierarchical and dotted — a menu key (`catalog`), a sub-menu key (`catalog.products`), and per-action keys under it (`catalog.products.create`, `catalog.products.edit`, `catalog.products.delete`, `catalog.products.view`). To grant an action you typically include its key together with its parent menu/sub-menu keys. A `custom` role can hold well over a hundred keys.

## Create, update & delete

- **Create** — supply `name`, `description`, and `permissionType`. For `custom`, also supply the `permissions` array; for `all`, omit it.
- **Update** — change any field. **Switching `permissionType` to `all` clears `permissions` to `[]`** (full access has no explicit list). For `custom`, send the full `permissions` array you want — it replaces the previous list.
- **Delete** — removes the role, subject to the guards below.

## Delete guards

Deletion is refused when:

- The role is **assigned to one or more admins** — you can't delete a role still in use; reassign those admins to another role first.
- It is the **last remaining role** — you can't delete the last role; at least one must always exist.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List roles](/api/graphql-api/admin/settings/roles/list) | `adminSettingsRoles` query |
| [Get a single role](/api/graphql-api/admin/settings/roles/detail) | `adminSettingsRole(id:)` query |
| [Create a role](/api/graphql-api/admin/settings/roles/create) | `createAdminSettingsRole` mutation |
| [Update a role](/api/graphql-api/admin/settings/roles/update) | `updateAdminSettingsRole` mutation |
| [Delete a role](/api/graphql-api/admin/settings/roles/delete) | `deleteAdminSettingsRole` mutation |

Permissions: `settings.roles.create` / `.edit` / `.delete`.
