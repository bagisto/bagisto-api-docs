---
outline: false
examples:
  - id: admin-cms-pages-create
    title: Create a CMS Page
    description: Top-level fields are broadcast to every locale at creation.
    query: |
      mutation CreateCmsPage($input: createAdminCmsPageInput!) {
        createAdminCmsPage(input: $input) {
          adminCmsPage {
            id
            _id
            urlKey
            pageTitle
            htmlContent
            metaTitle
            metaKeywords
            metaDescription
            locale
            previewUrl
            createdAt
            updatedAt
            translations {
              edges {
                node {
                  locale
                  urlKey
                  pageTitle
                  htmlContent
                  metaTitle
                  metaKeywords
                  metaDescription
                }
              }
            }
            channels {
              edges {
                node {
                  _id
                  code
                  name
                }
              }
            }
          }
        }
      }
    variables: |
      {
        "input": {
          "urlKey": "about-us",
          "pageTitle": "About Us",
          "htmlContent": "<h1>About Us</h1>",
          "metaTitle": "About Us",
          "metaKeywords": "about,us,company",
          "metaDescription": "Learn more about our company.",
          "channels": [1]
        }
      }
    response: |
      {
        "data": {
          "createAdminCmsPage": {
            "adminCmsPage": {
              "id": "/api/admin/cms/pages/7",
              "_id": 7,
              "urlKey": "about-us",
              "pageTitle": "About Us",
              "htmlContent": "<h1>About Us</h1>",
              "metaTitle": "About Us",
              "metaKeywords": "about,us,company",
              "metaDescription": "Learn more about our company.",
              "locale": "en",
              "previewUrl": "https://store.example.com/page/about-us",
              "createdAt": "2026-06-23T11:49:19+00:00",
              "updatedAt": "2026-06-23T11:49:19+00:00",
              "translations": {
                "edges": [
                  {
                    "node": {
                      "locale": "en",
                      "urlKey": "about-us",
                      "pageTitle": "About Us",
                      "htmlContent": "<h1>About Us</h1>",
                      "metaTitle": "About Us",
                      "metaKeywords": "about,us,company",
                      "metaDescription": "Learn more about our company."
                    }
                  }
                ]
              },
              "channels": {
                "edges": [
                  { "node": { "_id": 1, "code": "default", "name": "Default" } }
                ]
              }
            }
          }
        }
      }
---

# CMS Page — Create

Creates a new CMS page. Equivalent to [`POST /api/admin/cms/pages`](/api/rest-api/admin/cms/pages-create).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCmsPage` | Mutation |

## Input

GraphQL input fields are **camelCase**.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `urlKey` | `String!` | yes | Unique slug (lowercase, hyphen-separated). Serves the page at `/page/{urlKey}`. |
| `pageTitle` | `String!` | yes | |
| `htmlContent` | `String!` | yes | Page body (HTML). |
| `channels` | `[Int!]!` | yes | Non-empty list of channel IDs the page is published to. |
| `metaTitle` | `String` | no | |
| `metaKeywords` | `String` | no | |
| `metaDescription` | `String` | no | |

## Broadcast to every locale

Create takes **flat top-level fields** and **broadcasts them to every configured locale** — the new page starts with the same `pageTitle` / `htmlContent` / `urlKey` / SEO values in each language. Translate individual languages afterwards with [Update](/api/graphql-api/admin/cms/pages/mutations/update) (which is locale-nested).

## Response

The mutation returns the **created page**. All scalars resolve, and `translations` / `channels` are **field-selectable connections** (`{ edges { node { … } } }`) — `translations` carries one entry per configured locale (the broadcast content). Select only what you need.

## Errors

| Condition | Result |
|-----------|--------|
| `urlKey`, `pageTitle`, or `htmlContent` missing | validation error |
| `urlKey` not a valid slug, or already in use | validation error |
| `channels` empty or contains an unknown ID | validation error |
| Admin role lacks `cms.create` | permission error |
