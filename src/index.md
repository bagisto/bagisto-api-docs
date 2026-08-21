---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Bagisto API Documentation"
  text: "GraphQL & REST APIs"
  tagline: "Complete API reference for Bagisto integration"
  actions:
    - theme: brand
      text: Get Started →
      link: /api/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/bagisto/bagisto-api
  image:
    src: /logo-large.png
    alt: Bagisto

features:
  - title: GraphQL API
    details: Query exactly the data you need with a flexible GraphQL API. Perfect for modern frontend applications, mobile apps, and optimized API consumption.
    icon: ⚙️
    link: /api/graphql-api/introduction
  - title: REST API
    details: Explore comprehensive REST endpoints for managing products, orders, customers, categories, and more. Easy integration with any programming language or framework.
    icon: 🔗
    link: /api/rest-api/introduction
  - title: Authentication
    details: Secure your API requests with token-based authentication. Learn about Bearer tokens, Storefront API keys, and Laravel Sanctum integration for public, customer, and admin APIs.
    icon: 🔐
    link: /api/authentication
  - title: Setup & Configuration
    details: Complete installation guide for Bagisto APIs. Choose between Quick Setup or Manual Installation, configure environment variables, verify installation, and troubleshoot common issues.
    icon: 🛠️
    link: /api/setup
  - title: Storefront Key Management
    details: Generate, rotate, and manage your API keys securely. Monitor key usage, set rate limits, and implement security best practices for production environments.
    icon: 🔑
    link: /api/storefront-api-key-management-guide
  - title: Integration Guides
    details: Ready-to-paste client code for JavaScript, Python, PHP, Ruby, Go, Java, and cURL — REST and GraphQL both, each already sending the right headers, with login and an authenticated call wired up.
    icon: 📚
    link: /api/integrations
---
