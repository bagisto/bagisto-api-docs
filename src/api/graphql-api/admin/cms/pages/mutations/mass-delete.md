---
outline: false
examples:
  - id: admin-cms-pages-mass-delete
    title: Mass Delete CMS Pages
    description: Bulk-delete CMS pages. Non-existent IDs are silently skipped.
    query: |
      mutation MassDeleteCmsPages($input: createAdminCmsPageMassDeleteInput!) {
        createAdminCmsPageMassDelete(input: $input) {
          adminCmsPageMassDelete {
            id
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": { "indices": [12, 18] }
      }
    response: |
      {
        "data": {
          "createAdminCmsPageMassDelete": {
            "adminCmsPageMassDelete": {
              "id": "/api/admin/cms_page_mass_deletes/1",
              "deleted": [12, 18],
              "message": "CMS pages deleted successfully."
            }
          }
        }
      }
---

# CMS Pages — Mass Delete

Equivalent to [`POST /api/admin/cms/pages/mass-delete`](/api/rest-api/admin/cms/pages-mass-delete).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCmsPageMassDelete` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | `[Int!]!` | yes | CMS page IDs to delete. Must be non-empty. |

## Behaviour

Bulk-deletes every page in `indices` in one call. **Non-existent IDs are silently skipped** — the operation does not fail the whole batch for a missing id. The response's `deleted` array lists the IDs actually removed; `message` is a human-readable summary. Each removed page also has its storefront redirects (url rewrites) cleaned up.

`deleted` is returned as a **plain array of IDs** over GraphQL.

## Errors

| Condition | Result |
|-----------|--------|
| `indices` empty or missing | validation error |
| Admin role lacks `cms.delete` | permission error |
