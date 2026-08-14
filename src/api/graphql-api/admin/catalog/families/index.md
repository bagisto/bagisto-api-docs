---
outline: false
---

# Attribute Families

An attribute family is the **template of fields a product carries**. Every product belongs to exactly one family, and the family decides which attributes (and in what layout) appear on that product's edit form. The Attribute Families menu lists, creates, edits, and deletes them. It mirrors the admin **Catalog → Attribute Families** screen.

## How a family is structured

A family is a set of **attribute groups**, and each group holds a list of **attributes**:

- **Groups** (e.g. `General`, `Description`, `Meta Description`, `Price`, `Inventories`, `Images`) organise the edit form into sections. Each group has a `column` (1 or 2) and a `position` (order).
- **Attributes** within a group are references to entries from the [Attributes](/api/graphql-api/admin/catalog/attributes/) menu, each with its own `position` and `isRequired` flag.

## Nested data is returned whole

On the single-family query, `attributeGroups` (each group with its nested `attributes`) is returned as **whole JSON** — query it as a bare field (`attributeGroups`, not `attributeGroups { … }`); the entire structure comes back, and it resolves over GraphQL. The listing is slim (`id`, `code`, `name` only) — fetch the structure by id.

## Editing the structure

Create and update accept the nested `attributeGroups` (with `customAttributes`). On update, groups are matched by id; a group keyed `group_*` is created, and an existing group id omitted from the payload is removed (and so are omitted attributes within a kept group). This mirrors the admin form's add/remove behaviour.

## Delete guards

A family **cannot be deleted** if it is the last remaining family, or if any product is still assigned to it — both return an error. Reassign or remove those products first.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List families](/api/graphql-api/admin/catalog/families/families-listing) | `adminAttributeFamilies` query |
| [Family detail](/api/graphql-api/admin/catalog/families/families-detail) | `adminAttributeFamily(id:)` query |
| [Create family](/api/graphql-api/admin/catalog/families/families-create) | `createAdminAttributeFamily` mutation |
| [Update family](/api/graphql-api/admin/catalog/families/families-update) | `updateAdminAttributeFamily` mutation |
| [Delete family](/api/graphql-api/admin/catalog/families/families-delete) | `deleteAdminAttributeFamily` mutation |

Reads require `catalog.families.view`; writes require the matching `catalog.families.create` / `.edit` / `.delete` permission.
