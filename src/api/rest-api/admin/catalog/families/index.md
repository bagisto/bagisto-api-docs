---
outline: false
apiType: rest
---

# Attribute Families

An attribute family is the **template of fields a product carries**. Every product belongs to exactly one family, and the family decides which attributes (and in what layout) appear on that product's edit form. The Attribute Families menu lists, creates, edits, and deletes them. It mirrors the admin **Catalog → Attribute Families** screen.

## How a family is structured

A family is a set of **attribute groups**, and each group holds a list of **attributes**:

- **Groups** (e.g. `General`, `Description`, `Meta Description`, `Price`, `Inventories`, `Images`) organise the edit form into sections. Each group has a `column` (1 or 2) controlling which side of the form it renders on, and a `position` (order).
- **Attributes** within a group are references to entries from the [Attributes](/api/rest-api/admin/catalog/attributes/) menu, each with its own `position` and `isRequired` flag.

The single-family endpoint returns the full `attributeGroups` array (each group with its nested `attributes`) inline; the listing is slim (id, code, name only) — fetch the structure by id.

## Editing the structure

Create and update accept the nested `attribute_groups` (with `custom_attributes`). On update, groups are matched by id; a group keyed `group_*` is created, and an existing group id omitted from the payload is removed (and so are omitted attributes within a kept group). This mirrors the admin form's add/remove behaviour.

## Delete guards

A family **cannot be deleted** if it is the last remaining family, or if any product is still assigned to it — both return an error. Reassign or remove those products first.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List families](/api/rest-api/admin/catalog/families/families-listing) | `GET /api/admin/catalog/families` |
| [Family detail](/api/rest-api/admin/catalog/families/families-detail) | `GET /api/admin/catalog/families/{id}` |
| [Create family](/api/rest-api/admin/catalog/families/families-create) | `POST /api/admin/catalog/families` |
| [Update family](/api/rest-api/admin/catalog/families/families-update) | `PUT /api/admin/catalog/families/{id}` |
| [Delete family](/api/rest-api/admin/catalog/families/families-delete) | `DELETE /api/admin/catalog/families/{id}` |

Reads require `catalog.families.view`; writes require the matching `catalog.families.create` / `.edit` / `.delete` permission.
