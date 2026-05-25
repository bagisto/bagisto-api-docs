---
outline: false
examples:
  - id: gql
    title: Create Catalog Rule
    query: |
      mutation Create($input: createAdminMarketingCatalogRuleInput!) {
        createAdminMarketingCatalogRule(input: $input) {
          adminMarketingCatalogRule { id _id name actionType discountAmount }
        }
      }
    variables: |
      { "input": { "name": "Summer 10% off", "channels": [1], "customer_groups": [1, 2], "action_type": "by_percent", "discount_amount": 10 } }
    response: |
      { "data": { "createAdminMarketingCatalogRule": { "adminMarketingCatalogRule": { "id": "/api/admin/marketing/catalog-rules/1", "_id": 1, "name": "Summer 10% off", "actionType": "by_percent", "discountAmount": 10 } } } }
---

# Create Catalog Rule (GraphQL)

Mutation: `createAdminMarketingCatalogRule`.

Permission: `marketing.promotions.catalog_rules.create`.
