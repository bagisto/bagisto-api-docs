---
outline: false
examples:
  - id: get-all-attributes
    title: Get All Attributes
    description: Retrieve all product attributes from the admin panel.
    query: |
      # This page documents a legacy Shop GraphQL stub; the actual Admin API
      # query is `adminAttributes`. See: ./catalog/attributes/attributes-listing.md
    variables: |
      {}
    response: |
      {}

---

# Attributes

## About

The `attributes` admin query retrieves product attribute definitions and configurations. Use this query to:

- Display attribute management interfaces
- Build product attribute assignment forms
- Retrieve attribute types and options
- Manage attribute properties and validation rules
- Export attribute metadata
- Sync attributes with external systems
- Build dynamic product forms based on attributes

This query provides complete attribute definitions including type, options, validation, and visibility settings needed for attribute management.

## Arguments

| Argument | Type | Description |
|----------|------|-------------|
| `first` | `Int` | Attributes per page (max: 100). Default: 20. |
| `after` | `String` | Pagination cursor for forward pagination. |
| `last` | `Int` | Attributes for backward pagination (max: 100). |
| `before` | `String` | Pagination cursor for backward pagination. |
| `type` | `[AttributeType!]` | Filter by type: `select`, `text`, `textarea`, `price`, `boolean`, `date`. |
| `sortKey` | `AttributeSortKeys` | Sort by: `CODE`, `NAME`, `POSITION`. Default: `POSITION` |
| `isFilterable` | `Boolean` | Filter by visibility in layered navigation. |
| `isSearchable` | `Boolean` | Filter by searchability in catalog search. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `edges` | `[AttributeEdge!]!` | Attribute edges with pagination. |
| `edges.node` | `Attribute!` | Attribute object. |
| `edges.node.id` | `ID!` | Attribute ID. |
| `edges.node.code` | `String!` | Unique attribute code. |
| `edges.node.name` | `String!` | Attribute display name. |
| `edges.node.type` | `String!` | Attribute type (select, text, textarea, etc.). |
| `edges.node.isRequired` | `Boolean!` | Whether attribute is mandatory for products. |
| `edges.node.isFilterable` | `Boolean!` | Available in layered navigation. |
| `edges.node.isSearchable` | `Boolean!` | Searchable in catalog search. |
| `edges.node.isVisibleOnFront` | `Boolean!` | Visible on product pages. |
| `edges.node.options` | `[AttributeOption!]` | Available options (for select/multiselect types). |
| `edges.node.options.id` | `ID!` | Option ID. |
| `edges.node.options.label` | `String!` | Option display label. |
| `edges.node.options.value` | `String!` | Option value. |
| `edges.node.validation` | `AttributeValidation` | Validation rules and constraints. |
| `edges.node.position` | `Int!` | Display order. |
| `nodes` | `[Attribute!]!` | Flattened attribute array. |
| `pageInfo` | `PageInfo!` | Pagination metadata. |
| `totalCount` | `Int!` | Total attributes. |

