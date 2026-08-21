---
outline: false
---

# Email Templates

An **email template** is a reusable HTML email body that a campaign sends to a customer group. It mirrors the admin **Marketing → Communications → Email Templates** screen.

## How an email template works

A template is intentionally simple — a name, a status, and an HTML body.

- **`name`** — a human-readable label used to pick the template when building a campaign.
- **`status`** — `active`, `inactive`, or `draft`. A draft or inactive template is kept for later but is not meant to be sent.
- **`content`** — the raw HTML email body. This is the markup delivered to recipients.

**How templates are used.** A campaign references a template plus a customer group; when the campaign sends, the template's HTML is delivered to every subscribed member of that group. The template itself holds no recipient or schedule information — that lives on the campaign.

**No mass delete.** Templates are removed one at a time; the admin screen offers no bulk-delete action, so the API exposes none either.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/communications/templates-list) | `GET /api/admin/marketing/templates` |
| [Detail](/api/rest-api/admin/marketing/communications/templates-detail) | `GET /api/admin/marketing/templates/{id}` |
| [Create](/api/rest-api/admin/marketing/communications/templates-create) | `POST /api/admin/marketing/templates` |
| [Update](/api/rest-api/admin/marketing/communications/templates-update) | `PUT /api/admin/marketing/templates/{id}` |
| [Delete](/api/rest-api/admin/marketing/communications/templates-delete) | `DELETE /api/admin/marketing/templates/{id}` |
