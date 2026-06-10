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
does **not** expose one endpoint per screen. Three generic endpoints cover the
entire Configuration area — current and future:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| [`/api/admin/configuration/menu`](./menu) | GET | **Discover** the schema — which fields exist, their type, default, scoping, validation, and options |
| [`/api/admin/configuration`](./values) | GET | **Read** the current effective values for a slug |
| [`/api/admin/configuration`](./update) | POST | **Write** new values for a slug |

## How the three work together

A client edits a section in four steps:

1. **Discover** — `GET /configuration/menu?slug=<section.group>` to learn the
   fields under a section: each field's dotted `code`, `type`, whether it is
   `channelBased` / `localeBased`, its `validation`, and any `options`.
2. **Read** — `GET /configuration?slug=<section.group>` to load the current
   values into your form.
3. **Write** — `POST /configuration` with the changed `code → value` map.
4. **Refresh** — the POST returns the re-resolved values, so you can update your
   form state without another read.

Or skip steps 1–2 and call `GET /configuration/menu?slug=...&include_values=true`
to get the schema and the current values in a single round trip.

## Core concepts

- **Slug** — a dotted path (`section.group`, e.g. `sales.order_settings`) that
  scopes a request to one subtree of the schema. Required by Values and Update;
  optional on Menu (omit it to get the whole tree).
- **Code** — the fully-qualified field path
  (`sales.order_settings.reorder.admin`). This is the unit you read and write.
- **Scoping** — `channelBased` / `localeBased` (reported by Menu) decide whether
  the `channel` / `locale` parameters matter for a field. A field with both
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
- **File / image fields** are set via `multipart/form-data` on the Update
  endpoint only — JSON / GraphQL cannot carry binaries.
- **Custom fields** — fields reported as `type: "custom"` are blade-rendered in
  the admin and are **read-only** through the API.
- **Password fields** are masked in the UI but stored as plaintext (a Bagisto
  core behaviour, not an API limitation).

All Configuration endpoints require an admin Bearer token — see
[Authentication](/api/rest-api/admin/authentication).
