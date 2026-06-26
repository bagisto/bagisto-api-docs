---
outline: false
---

# Inventory Sources

Inventory Sources are the physical or logical **stock locations** your products draw quantity from — a warehouse, a store backroom, a drop-ship hub. Each product carries a per-source quantity, sources are assigned to channels, and the source a shipment ships from is chosen at shipment time. This menu mirrors the admin **Settings → Inventory Sources** screen.

## What an inventory source represents

A source is a named place that holds stock. When you set a product's inventory, you enter a quantity *per source*; the storefront's available-to-sell quantity is the sum across the sources assigned to the active channel. When you create a shipment for an order, you pick which source the items ship from, and that source's quantity is decremented.

## Field meanings

| Field | Meaning |
|-------|---------|
| `code` | Unique machine identifier (letters, digits, dashes/underscores). Used internally and in imports; cannot collide with another source. |
| `name` | Human-readable label shown in the admin. |
| `description` | Optional free-text note. |
| `contactName`, `contactEmail`, `contactNumber`, `contactFax` | Contact details for the location's operator. |
| `country`, `state`, `city`, `street`, `postcode` | The source's physical address. |
| `latitude`, `longitude` | Optional geo-coordinates (used by distance-based source selection if configured). |
| `priority` | Ordering hint when several sources could fulfil an item — lower numbers are preferred first. |
| `status` | `1` = active (available for stock + fulfilment), `0` = inactive. |
| `createdAt`, `updatedAt` | Timestamps. The seeded `default` source may report `null` for these. |

## Creating, updating & deleting

- **Create** registers a new source. `code`, `name`, the contact fields and the address fields are required; `priority`, `status` and the geo-coordinates are optional.
- **Update** is a partial patch — send the `id` plus only the fields you want to change.
- **Delete** removes a single source; **Mass Delete** removes several by id in one call.

### Delete guards

A delete (single or mass) is **refused** when:

- it would remove the **last remaining** inventory source — a store must always have at least one; or
- the source is still **referenced by product inventories** — some product holds stock at that source.

A refused delete returns an error (equivalent to HTTP 422 on REST). Re-assign or zero out the product quantities at that source first, then retry.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List inventory sources](/api/graphql-api/admin/settings/inventory-sources/list) | `adminSettingsInventorySources` query |
| [Get a single source](/api/graphql-api/admin/settings/inventory-sources/detail) | `adminSettingsInventorySource(id:)` query |
| [Create a source](/api/graphql-api/admin/settings/inventory-sources/create) | `createAdminSettingsInventorySource` mutation |
| [Update a source](/api/graphql-api/admin/settings/inventory-sources/update) | `updateAdminSettingsInventorySource` mutation |
| [Delete a source](/api/graphql-api/admin/settings/inventory-sources/delete) | `deleteAdminSettingsInventorySource` mutation |
| [Mass delete sources](/api/graphql-api/admin/settings/inventory-sources/mass-delete) | `createAdminSettingsInventorySourceMassDelete` mutation |

Permissions: `settings.inventory_sources.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
