---
outline: false
apiType: rest
examples:
  - id: rest
    title: Export Tax Rates (CSV)
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-rates/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        -o tax-rates.csv
    response: |
      ID,Identifier,State,Country,"Zip Code","Zip From","Zip To","Tax Rate"
      3,us-ca-bay,CA,US,,94000,94999,8.25
      1,us-il-7,IL,US,62704,,,7.25
  - id: rest-xlsx
    title: Export Tax Rates (XLSX)
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-rates/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        -o tax-rates.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="tax-rates.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: rest-xls
    title: Export Tax Rates (XLS)
    query: |
      curl -X GET "https://your-domain.com/api/admin/settings/tax-rates/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        -o tax-rates.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="tax-rates.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
---

# Export Tax Rates

Downloads the Tax Rates list as a csv, xls or xlsx file — the API equivalent of the **Export** button on the Tax Rates screen.

- `?format=` accepts `csv` (the default), `xls` and `xlsx`; any other value returns `422`.
- Send an `Accept` header matching the format — `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. The response is an attachment named `tax-rates.<format>`.
- Columns: ID, Identifier, State, Country, Zip Code, Zip From, Zip To, Tax Rate.
- Honours the **same filters** as the [list endpoint](./list) — `identifier`, `country`, `state`, `tax_rate_from`, `tax_rate_to`. The export returns every matching row, not just the current page.
- This endpoint is REST only (there is no GraphQL equivalent for binary downloads).

Permission: `settings.taxes.tax_rates`.
