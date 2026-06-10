---
outline: false
apiType: rest
examples:
  - id: admin-marketing-subscriber-detail
    title: Newsletter Subscriber Detail
    query: |
      curl -X GET "https://your-domain.com/api/admin/marketing/subscribers/1" \
        -H "Authorization: Bearer <token>"
    response: |
      { "id": 1, "email": "subscriber@example.com", "channelId": 1, "channelName": "Default", "customerId": 12, "customerName": "Jane Doe", "isSubscribed": true }
---

# Newsletter Subscriber Detail

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/subscribers/{id}` | GET |
