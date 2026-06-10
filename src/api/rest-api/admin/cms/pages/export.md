---
outline: false
apiType: rest
examples:
  - id: admin-cms-pages-export
    title: Export CMS Pages (CSV)
    description: Download the CMS pages datagrid as a CSV file — the same data the admin CMS → Pages "Export" button produces. Honours the same filters as the listing and exports every matching row (not just the current page).
    query: |
      curl -X GET "https://your-domain.com/api/admin/cms/pages/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output cms-pages.csv
    response: |
      # Binary response: a text/csv attachment is written to cms-pages.csv
      # (Content-Type: text/csv; charset=UTF-8
      #  Content-Disposition: attachment; filename="cms-pages.csv"). Sample contents:

      ID,"Page Title","URL Key",Channel,Locale
      11,"Privacy Policy",privacy-policy,default,en
      13,"What's new",whats-new1,default,en
      1,"About Us",about-us,default,en
  - id: admin-cms-pages-export-filtered
    title: Export CMS Pages (filtered)
    description: The export honours every listing filter. Here only pages on the default channel in the en locale whose title contains "policy" are exported.
    query: |
      curl -X GET "https://your-domain.com/api/admin/cms/pages/export?format=csv&channel=1&locale=en&page_title=policy" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output cms-pages.csv
    response: |
      ID,"Page Title","URL Key",Channel,Locale
      11,"Privacy Policy",privacy-policy,default,en
  - id: admin-cms-pages-export-bad-format
    title: Unsupported format (422)
    description: Only format=csv is supported. Any other value returns 422.
    query: |
      curl -i -X GET "https://your-domain.com/api/admin/cms/pages/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv"
    response: |
      HTTP/1.1 422 Unprocessable Content
      Content-Type: application/json

      {
        "message": "Only the csv export format is supported."
      }
---

# Export CMS Pages

Downloads the CMS pages datagrid as a **CSV file** — the same data the admin **CMS → Pages** "Export" button produces. The response is a binary `text/csv` attachment, not JSON.

Unlike the [listing](/api/rest-api/admin/cms/pages-list), the export is **not paginated** — it streams **every page that matches the current filters**.

::: tip REST only
There is no GraphQL counterpart — binary file streams aren't expressible over GraphQL. Use this REST endpoint for the export.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/cms/pages/export` | GET |

## Request headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |
| `Accept` | `text/csv` — **required**. The endpoint only produces `text/csv`; sending `Accept: application/json` returns `406 Not Acceptable`. |

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | Export format — **only `csv` is supported** (the default). Any other value returns `422`. |

The export also accepts the **same filters as the [listing](/api/rest-api/admin/cms/pages-list)**:

| Filter | Type | Description |
|--------|------|-------------|
| `id` | integer | Filter by page ID. |
| `page_title` | string | Partial title match. |
| `url_key` | string | Partial url_key match. |
| `channel` | integer | Channel ID. |
| `locale` | string | Locale code used for translation resolution. |

## Columns

The CSV carries the five datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Page ID. |
| `Page Title` | Page title for the resolved locale. |
| `URL Key` | The storefront URL slug. |
| `Channel` | Channel code. |
| `Locale` | Resolved locale code. |

## Permission

`cms`
