---
outline: false
---

# Data Transfer Imports

The Data Transfer Imports menu bulk-imports records into the store from a CSV / XLSX / XML file — products, customers, tax rates, and any other entity your store exposes as an importer. It mirrors the admin **Settings → Data Transfer → Imports** screen.

Each import is a job: an uploaded file, the entity it targets (`code`), whether it adds or removes rows (`action`), and a `state` that tracks how far it has run.

## The import lifecycle

A client drives an import through a fixed sequence of stages. Each stage is a separate call so you can validate, watch progress, and abort between steps.

| Step | What it does |
|------|--------------|
| **Create** | Upload the source file and choose the entity + options. **REST only** — see below. |
| **Validate** | Check the file's columns and rows without importing anything. Surfaces `errors[]` and the `isValid` flag. |
| **Start** | Process the next batch of rows. Call repeatedly until no batches remain. |
| **Link** | Post-process stage — resolves relationships between the imported records. |
| **Index** | Final stage — makes the imported records searchable and visible on the storefront. |
| **Stats** | Poll progress at any point without advancing the job — drives a progress bar. |
| **Cancel** | Abort a `pending` or `processing` job. |

Poll [stats](./stats.md) between [start](./start.md) / [link](./link.md) / [index](./index.md) to know when each stage has finished (`remaining: 0`).

## Field meanings

- `code` — the entity being imported (`products`, `customers`, `tax_rates`, …).
- `action` — `append` (insert/update rows) or `delete` (remove rows).
- `state` — lifecycle position: `pending`, `validated`, `processing`, `processed`, `linked`, `indexed`, `completed`, `cancelled`, …
- `validationStrategy` / `allowedErrors` — `stop-on-errors` or `skip-errors`, and the error budget for the latter.
- `processedRowsCount` / `invalidRowsCount` / `errorsCount` — progress and validation counters.
- `errors` — the list of validation messages (null on listing rows; fetch the detail to read it).
- `summary` — created/updated/deleted counts after a run (null until the run completes).
- `filePath` / `errorFilePath` / `imagesDirectoryPath` — storage paths. The source file and error report are **downloadable over REST only**.

## REST-only operations

- **Create** requires a multipart file upload, which a JSON GraphQL request cannot carry — the GraphQL `create` mutation always rejects with a pointer to REST.
- **File downloads** (source file, error report, sample template) are binary and have no GraphQL counterpart.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List imports](./list.md) | `adminSettingsDataTransferImports` query |
| [Get a single import](./detail.md) | `adminSettingsDataTransferImport(id:)` query |
| [Create import](./create.md) | REST only (multipart upload) |
| [Validate import](./validate.md) | `validateAdminSettingsDataTransferImportValidate` mutation |
| [Start import](./start.md) | `startAdminSettingsDataTransferImportStart` mutation |
| [Link import](./link.md) | `linkAdminSettingsDataTransferImportLink` mutation |
| [Index import](./index.md) | `indexAdminSettingsDataTransferImportIndex` mutation |
| [Import stats](./stats.md) | `adminSettingsDataTransferImportStats(id:)` query |
| [Delete import](./delete.md) | `deleteAdminSettingsDataTransferImport` mutation |
| [Cancel import](./cancel.md) | `cancelAdminSettingsDataTransferImportCancel` mutation |

Permissions: `settings.data_transfer.imports.create` / `.edit` / `.delete` / `.view`.
