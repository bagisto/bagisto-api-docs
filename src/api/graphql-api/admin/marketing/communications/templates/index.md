---
outline: false
---

# Email Templates

An **email template** is a reusable HTML email body that a campaign sends to a customer group. It mirrors the admin **Marketing → Communications → Email Templates** screen.

## How an email template works

A template has three parts: a **name** to identify it, a **status** that controls whether it can be used, and the **content** — the raw HTML of the email.

- **`name`** — a human-readable label for the template in the admin list.
- **`status`** — one of `active`, `inactive`, or `draft`. Only active templates are intended for live sends; `draft` and `inactive` let you stage a template before it goes out.
- **`content`** — the raw HTML body of the email. Whatever markup you save here is the message recipients receive.

**How it's used.** A template is referenced by a **Campaign**, which pairs the template with a customer group (and optionally an event) and sends it. Editing a template changes what every campaign that references it will send next.

**No mass delete.** The admin screen exposes single-row delete only — there is no bulk delete for email templates.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/communications/templates-list) | `adminMarketingTemplates` query |
| [Detail](/api/graphql-api/admin/marketing/communications/templates-detail) | `adminMarketingTemplate` query |
| [Create](/api/graphql-api/admin/marketing/communications/templates-create) | `createAdminMarketingTemplate` mutation |
| [Update](/api/graphql-api/admin/marketing/communications/templates-update) | `updateAdminMarketingTemplate` mutation |
| [Delete](/api/graphql-api/admin/marketing/communications/templates-delete) | `deleteAdminMarketingTemplate` mutation |

All Email Templates operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
