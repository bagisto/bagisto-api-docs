---
outline: false
apiType: rest
examples:
  - id: rest
    title: Update Channel
    query: |
      curl -X PUT "https://your-domain.com/api/admin/settings/channels/2" -H "X-Admin-Key: <key>" -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{ "translations": { "en": { "name": "United States Store", "description": "Our US storefront", "seo_description": "Welcome" } } }'
    response: |
      { "id": 2, "code": "us", "name": "United States Store" }
---

# Update Channel

Code/hostname uniqueness excludes self. Use `translations` map for locale-nested attributes (name, description, home_page_content, footer_content, seo_*, maintenance_mode_text). Top-level scalar fields broadcast to every configured locale via the repository.

Permission: `settings.channels.edit`.
