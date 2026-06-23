---
outline: false
---

# Configuration (Admin)

The admin **Configuration** screen edits Bagisto's store-wide settings — order
settings, currencies, email, SEO, inventory, and everything every installed
module adds. Internally these are one flat key/value store; the form layout you
see in the admin (Section → Group → Field group → Field) is a **schema** that
each module registers at runtime.

Because that schema has hundreds of fields and grows with every plugin, the API
does **not** expose one endpoint per screen. Three generic operations cover the
entire Configuration area — current and future:

| Operation | Type | Purpose |
|-----------|------|---------|
| [`menuAdminConfigurationMenu`](./menu) | Query | **Discover** the schema — which fields exist, their type, default, scoping, validation, and options |
| [`listAdminConfigurationSlug`](./slugs) | Query | **List** every slug (section / group key) to pass to Values and Update |
| [`valuesAdminConfigurationValues`](./values) | Query | **Read** the current effective values for a slug |
| [`createAdminConfigurationUpdate`](./update) | Mutation | **Write** new values for a slug |

## How the three work together

A client edits a section in four steps:

1. **Discover** — call the Menu query (scoped with `slug`) to learn the fields
   under a section: each field's dotted `code`, `type`, whether it is
   `channelBased` / `localeBased`, its `validation`, and any `options`.
2. **Read** — call the Values query for that slug to load the current values
   into your form.
3. **Write** — call the Update mutation with the changed `code → value` map.
4. **Refresh** — Update returns the re-resolved values, so you can update your
   form state without another read.

Or skip steps 1–2 and call the Menu query with `include_values: true` to get the
schema and the current values in a single round trip.

## Core concepts

- **Slug** — a dotted path (`section.group`, e.g. `sales.order_settings`) that
  scopes a request to one subtree of the schema. Required by Values and Update;
  optional on Menu (omit it to get the whole tree).
- **Code** — the fully-qualified field path
  (`sales.order_settings.reorder.admin`). This is the unit you read and write.
- **Scoping** — `channelBased` / `localeBased` (reported by Menu) decide whether
  the `channel` / `locale` arguments matter for a field. A field with both
  `false` is global; passing `channel` / `locale` for it is harmless but ignored.
- **Values are strings** — the store column is text, so booleans, numbers, and
  JSON all come back as strings (`"1"`, `"0"`, `"49.99"`).
- **Defaults** — a field with no saved value falls back to the schema `default`
  reported by Menu.

## Rules to know

- **Stay in scope** — every key you write must start with the request's `slug.`.
  You cannot accidentally overwrite a field in another section.
- **Validation is server-side** — it is taken from each field's schema
  `validation` (discovered via Menu), never trusted from the client.
- **File / image fields** are set via the REST multipart endpoint only —
  GraphQL has no binary transport.
- **Custom fields** — fields reported as `type: "custom"` are blade-rendered in
  the admin and are **read-only** through the API.
- **Password fields** are masked in the UI but stored as plaintext (a Bagisto
  core behaviour, not an API limitation).

All Configuration operations require an admin Bearer token — see
[Authentication](/api/graphql-api/admin/authentication).
