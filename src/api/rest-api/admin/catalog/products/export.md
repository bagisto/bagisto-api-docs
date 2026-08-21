---
outline: false
apiType: rest
examples:
  - id: admin-products-export
    title: Export Products (CSV)
    description: Download the products datagrid as a CSV file — the same data the admin Catalog → Products "Export" button produces. Honours the same filters as the listing and exports EVERY matching row (not just the current page).
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/export?format=csv" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output products.csv
    response: |
      # Binary response: a text/csv attachment is written to products.csv
      # (Content-Type: text/csv; charset=UTF-8
      #  Content-Disposition: attachment; filename="products.csv"). Sample contents:

      ID,Name,SKU,"Attribute Family",Price,Quantity,Status,Category,Type
      1,"Coastal Breeze Men's Blue Zipper Hoodie",COASTALBREEZEMENSHOODIE,Default,$100.00,10000,Active,Fashion,simple
      22,"Acme Drawstring Bag",bagistoNGRY3424234KJCKJK,Default,"$3,000.00",0,Active,,bundle
      2705,,temporary-sku-8816cd,Default,,1,Disabled,,simple
  - id: admin-products-export-xlsx
    title: Export Products (XLSX)
    description: Download the products datagrid as an XLSX file — the same data the admin Catalog → Products "Export" button produces. Honours the same filters as the listing and exports EVERY matching row (not just the current page).
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
        --output products.xlsx
    response: |
      # Binary response: an XLSX workbook is written to disk
      # (Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      #  Content-Disposition: attachment; filename="products.xlsx").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-products-export-xls
    title: Export Products (XLS)
    description: Download the products datagrid as an XLS file — the same data the admin Catalog → Products "Export" button produces. Honours the same filters as the listing and exports EVERY matching row (not just the current page).
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/export?format=xls" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: application/vnd.ms-excel" \
        --output products.xls
    response: |
      # Binary response: an XLS workbook is written to disk
      # (Content-Type: application/vnd.ms-excel
      #  Content-Disposition: attachment; filename="products.xls").
      # Same columns as the CSV export, as the first sheet's header row plus one row per record.
  - id: admin-products-export-filtered
    title: Export Products (filtered)
    description: The export honours every listing filter — pass them as query params to export exactly the rows you are viewing. Here only active products of one attribute family within a price band are exported.
    query: |
      curl -X GET "https://your-domain.com/api/admin/catalog/products/export?format=csv&status=1&attribute_family=1&price_from=50&price_to=200" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv" \
        --output products.csv
    response: |
      # Only rows matching status=1 AND attribute_family=1 AND price in [50,200]
      # are written. Filters are AND-combined (see below).

      ID,Name,SKU,"Attribute Family",Price,Quantity,Status,Category,Type
      1,"Coastal Breeze Men's Blue Zipper Hoodie",COASTALBREEZEMENSHOODIE,Default,$100.00,10000,Active,Fashion,simple
  - id: admin-products-export-bad-format
    title: Unsupported format (422)
    description: Only format=csv is supported. Any other value returns 422.
    query: |
      curl -i -X GET "https://your-domain.com/api/admin/catalog/products/export?format=xlsx" \
        -H "Authorization: Bearer <token>" \
        -H "Accept: text/csv"
    response: |
      HTTP/1.1 422 Unprocessable Content
      Content-Type: application/json

      {
        "message": "Only the csv export format is supported."
      }
---

# Export Products

Downloads the products datagrid as a **csv, xls or xlsx file** — the same data the admin **Catalog → Products** "Export" button produces. The response is a binary file attachment, not JSON.

Unlike the [listing](/api/rest-api/admin/catalog/products), the export is **not paginated** — it streams **every row that matches the current filters**, so you can export a whole filtered catalog in one call.

Export is REST-only. The response is a file stream, which GraphQL cannot express, so there is no matching operation on the GraphQL endpoint.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/export` | GET |

## Request headers

| Header | Value |
|--------|-------|
| `Authorization` | `Bearer <token>` |
| `Accept` | `text/csv` — **required**. The endpoint only produces `text/csv`; sending `Accept: application/json` returns `406 Not Acceptable`. |

## Query parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `format` | string | Export format — `csv` (the default), `xls` or `xlsx`. Any other value returns `422`. Send a matching `Accept` header: `text/csv`, `application/vnd.ms-excel` or `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`. |

The export also accepts the **same filters as the [listing](/api/rest-api/admin/catalog/products)**, AND-combined (more filters = narrower result):

| Filter | Type | Description |
|--------|------|-------------|
| `channel` | string | Channel code for value resolution. |
| `name` | string | Partial product-name match. |
| `sku` | string | Partial SKU match. |
| `attribute_family` | integer | Attribute-family ID. |
| `price_from` / `price_to` | number | Price band (inclusive). `price=50,200` is shorthand for both. |
| `product_id` | string | A single ID or a comma-separated list (e.g. `1,22,2705`). |
| `status` | integer | `0` (disabled) or `1` (active). |
| `type` | string | `simple`, `virtual`, `downloadable`, `grouped`, `bundle`, `configurable`, `booking`. |

## Columns

The export carries the nine datagrid columns, in order:

| Header | Value |
|--------|-------|
| `ID` | Product ID. |
| `Name` | Product name for the resolved locale (empty for draft products with no name yet). |
| `SKU` | Product SKU. |
| `Attribute Family` | The product's attribute-family name. |
| `Price` | The base price, formatted (e.g. `$100.00`). Empty for composite types (`configurable` / `bundle` / `grouped` / `booking`) that carry no own price. |
| `Quantity` | Total stock across inventory sources. |
| `Status` | `Active` or `Disabled`. |
| `Category` | The primary category name (empty when uncategorised). |
| `Type` | The product type. |

## Permission

`catalog.products`
