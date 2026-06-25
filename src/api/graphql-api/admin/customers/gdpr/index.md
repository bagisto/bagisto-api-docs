---
outline: false
---

# GDPR Requests

The GDPR Requests menu manages the privacy requests customers raise — to **export** their personal data or to **delete** their account. It is the admin's queue for reviewing and actioning those requests, plus an ad-hoc data export you can run for any customer. It mirrors the admin **Customers → GDPR Data Request** screen.

## What a request holds

A request records the customer (or email), the request `type` (`update` or `delete`), a `status`, and an optional message. New requests arrive from the storefront; admins move them through the workflow.

## Status workflow

A request's `status` moves between: `pending`, `processing`, `declined`, `approved`, and `revoked`. **Update** is a plain metadata change — set the status and message as the request is triaged. The destructive action happens through **Process**, not Update.

## Process — the explicit action

**Process** approves a request and carries out what it asks for:

- For a **delete** request, processing cascades into removing the customer's account and related data.
- For an **update** request, processing marks it approved; the admin then applies the requested changes through the regular customer update.

Processing refuses to re-run on a request that is already approved or revoked.

## Data download

**Download Data Export** is an ad-hoc export — run it for any customer, not tied to a specific request. It returns a structured bundle of the customer's data (profile, addresses, orders, reviews, wishlist, notes), with sensitive fields such as passwords stripped.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Requests](./list.md) | `adminCustomerGdprRequests` query |
| [Request Detail](./detail.md) | `adminCustomerGdprRequest(id:)` query |
| [Update Request](./update.md) | `updateAdminCustomerGdprRequest` mutation |
| [Process (Approve + Execute)](./process.md) | `createAdminCustomerGdprProcess` mutation |
| [Delete Request](./delete.md) | `deleteAdminCustomerGdprRequest` mutation |
| [Download Data Export](./download-data.md) | `createAdminCustomerGdprDownloadData` mutation |

Permissions: `customers.gdpr_requests.view` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
