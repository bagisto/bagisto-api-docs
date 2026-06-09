---
outline: false
apiType: rest
examples:
  - id: rest
    title: Download Error Report
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/data-transfer/imports/12/download-error-report" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/octet-stream" \
        -o error-report.csv
    response: |
      (binary file download — the import error report)
---

# Download Error Report

| Endpoint | Method |
|----------|--------|
| `/api/admin/settings/data-transfer/imports/{id}/download-error-report` | GET |

Downloads the error report generated for an import. The report lists the rows that failed validation or processing along with the reason. The response is a binary attachment — send `Accept: application/octet-stream` and write the body to disk with `-o`. The `{id}` is the import id.

Returns `404` when no error report exists for the import.

::: tip REST only
Binary file downloads are not available over GraphQL.
:::

Permission: `settings.data_transfer.imports.view`.
