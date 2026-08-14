---
outline: false
apiType: rest
examples:
  - id: rest
    title: Delete Channel
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/settings/channels/2" -H "Authorization: Bearer <token>"
    response: |
      { "message": "Channel deleted." }
---

# Delete Channel

### Two guards (HTTP 400)

- **Last channel** — refuses if this is the only channel left.
- **Default channel** — refuses if its `code` matches the application-wide default (`config('app.channel')`).

Permission: `settings.channels.delete`.
