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
---

# Export Tax Rates (CSV)

Downloads the Tax Rates list as a CSV file — the API equivalent of the **Export** button on the Tax Rates screen.

- Send `Accept: text/csv`. The response is a `text/csv` attachment named `tax-rates.csv`.
- Columns: ID, Identifier, State, Country, Zip Code, Zip From, Zip To, Tax Rate.
- Honours the **same filters** as the [list endpoint](./list) — `identifier`, `country`, `state`, `tax_rate_from`, `tax_rate_to`. The export returns every matching row, not just the current page.
- `?format=` accepts only `csv`; any other value returns `422`.
- This endpoint is REST only (there is no GraphQL equivalent for binary downloads).

Permission: `settings.taxes.tax_rates`.
