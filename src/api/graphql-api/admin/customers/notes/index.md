---
outline: false
---

# Notes

The Notes menu records internal notes against a customer — the running log of comments the team keeps on an account (a support interaction, a fraud flag, a follow-up reminder). It mirrors the notes panel on the admin customer view screen.

## How notes work

Notes are **append-only**: each note is a separate, timestamped entry, and adding one never overwrites an earlier note. The notes list shows them newest-first. There is no edit or delete in this menu — the log is a permanent trail.

## Notifying the customer

When adding a note you can set `customerNotified` to email the note's text to the customer. Leave it off to keep the note purely internal. Each note records whether the customer was notified.

## Field meanings

| Field | Meaning |
|-------|---------|
| `note` | The note text. |
| `customerId` | The customer the note belongs to. |
| `customerNotified` | Whether the customer was emailed this note. |
| `createdAt` | When the note was added. |

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Notes](./list.md) | `adminCustomerNotes(customerId:)` query |
| [Add Note](./create.md) | `createAdminCustomerNote` mutation |

Permission: `customers.customers.edit`.
