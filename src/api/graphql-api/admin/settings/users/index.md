---
outline: false
---

# Users

The Users menu manages **admin users** — the back-office accounts that sign in to the admin panel. It mirrors the admin **Settings → Users** screen. Each admin user is assigned a single **Role**, and that role is what grants the permissions the user has across the panel and the admin API.

## What an admin user is

An admin user is a staff login: a `name`, a unique `email`, a hashed `password`, and a `roleId` pointing at the role that defines what they can do. Admin users are distinct from storefront **Customers** — customers shop the store, admin users run it.

## Field meanings

| Field | Meaning |
|-------|---------|
| `id` / `_id` | The resource IRI and the numeric user id. |
| `name` | Display name of the admin user. |
| `email` | Login email — must be unique across admin users. |
| `roleId` / `roleName` | The assigned role's id and name. The role determines the user's permissions. |
| `status` | `1` = active (can log in), `0` = inactive. |
| `image` / `imageUrl` | The profile-image storage path and its public URL (both `null` when no image is set). |
| `createdAt` / `updatedAt` | Timestamps. |

The `password` and `api_token` values are **never returned** by any user operation.

## Create, update, delete

- **Create** — `name`, `email`, `password`, and `roleId` are required; `status` defaults to active. The password is stored hashed.
- **Update** — partial: send only what changes. `password` is **optional** — include it to set a new password, omit it to keep the current one. `email` must stay unique.
- **Delete** — removes another admin user. On success the mutation returns a snapshot of the deleted record (`id`, `name`, `email`, `roleId`, `roleName`, `status`).

## Delete guards

| Guard | Rule |
|-------|------|
| **No self-delete via the id endpoint** | [Delete User](./delete) refuses to delete the caller's own account — use [Delete My Account](./delete-self) instead. |
| **No last admin** | Neither delete path will remove the final remaining admin, so the store always keeps at least one login. |

## Delete My Account (self-delete)

A separate [Delete My Account](./delete-self) mutation lets an admin remove **their own** account. It requires re-confirming the caller's current password, refuses the last remaining admin, and — because the account owns the calling token — **invalidates that Bearer token** on success.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List admin users](./list) | `adminSettingsUsers` query |
| [Get an admin user](./detail) | `adminSettingsUser(id:)` query |
| [Create admin user](./create) | `createAdminSettingsUser` mutation |
| [Update admin user](./update) | `updateAdminSettingsUser` mutation |
| [Delete admin user](./delete) | `deleteAdminSettingsUser` mutation |
| [Delete my account](./delete-self) | `createAdminSettingsUserDeleteSelf` mutation |

Permissions: `settings.users.users.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
