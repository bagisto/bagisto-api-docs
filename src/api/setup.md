# Setup & Configuration

Get the Bagisto API up and running in just a few minutes. Choose the installation method that works best for your setup.

## Prerequisites

Before installing, ensure you have:

- **Bagisto v2.0 or higher** ([Bagisto Installation Guide](https://devdocs.bagisto.com/getting-started/installation))
- **Composer 2.0+**

## Installation Methods

### Method 1: Quick Start (Composer Installation – Recommended)

The fastest way to get started:

```bash
# 1. Install the Bagisto API package
composer require bagisto/bagisto-api

# 2. Run the installer
php artisan bagisto-api-platform:install

```
Your APIs are now ready! Access them at:

- **API Documentation**: 
`https://your-domain.com/api`
<br>
 (e.g., [https://api-demo.bagisto.com/api](https://api-demo.bagisto.com/api))
 
### Method 2: Manual Installation

Use this method if you need more control over the setup.

#### Step 1: Download and Extract

1. Download the BagistoApi package from [GitHub](https://github.com/bagisto/bagisto-api)
2. Extract it to: `packages/Webkul/BagistoApi/`

#### Step 2: Register Service Provider

Edit `bootstrap/providers.php`:

```php
<?php

return [
    // ...existing providers...
    Webkul\BagistoApi\Providers\BagistoApiServiceProvider::class,
    // ...rest of providers...
];
```

#### Step 3: Update Autoloading

Edit `composer.json` and update the `autoload` section:

```json
{
  "autoload": {
    "psr-4": {
      "Webkul\\BagistoApi\\": "packages/Webkul/BagistoApi/src"
    }
  }
}
```

#### Step 4: Install Dependencies

```bash
# Install required packages
composer require api-platform/laravel:v4.1.25
composer require api-platform/graphql:v4.2.3
```

#### Step 5: Run the installation
```bash
composer dump-autoload
php artisan bagisto-api-platform:install
```

#### Step 9: Environment Setup (Update in the .env)
```
STOREFRONT_DEFAULT_RATE_LIMIT=100
STOREFRONT_CACHE_TTL=60
STOREFRONT_KEY_PREFIX=storefront_key_
STOREFRONT_PLAYGROUND_KEY=pk_storefront_vxLIYv5PIp7jkujPNGLFQoDvIdsh2RMF 
API_PLAYGROUND_AUTO_INJECT_STOREFRONT_KEY=true
```

### Access Points

Once verified, access the APIs at:

- **API Documentation**: [https://your-domain.com/api](https://api-demo.bagisto.com/api)
- **REST API (Shop)**:  [https://your-domain.com/api/shop](https://api-demo.bagisto.com/api/shop)
- **REST API (Admin)**: [https://your-domain.com/api/admin](https://api-demo.bagisto.com/api/admin)
- **GraphQL Endpoint**: `https://your-domain.com/api/graphql`
- **GraphQL Playground**: [https://your-domain.com/api/graphiql](https://api-demo.bagisto.com/api/graphiql)


## Troubleshooting

### Provider Not Found

**Error**: `Class 'Webkul\BagistoApi\Providers\BagistoApiServiceProvider' not found`

**Solution**:
```bash
composer dump-autoload
php artisan cache:clear
php artisan config:clear
```

### 404 Errors on API Endpoints

**Error**: API endpoints return 404 Not Found

**Solutions**:
1. Ensure routes are published: `php artisan vendor:publish --tag=routes`
2. Clear route cache: `php artisan route:clear`
3. Check `.htaccess` file is present in your web root
4. Verify `APP_URL` in `.env` matches your domain

### Permission Denied Errors

**Error**: `Permission denied` on file operations

**Solution**:
```bash
# Set proper permissions
chmod -R 775 storage bootstrap/cache
chmod -R 755 public

# If using Docker/VM
chown -R www-data:www-data storage bootstrap
```

### Database Connection Errors

**Error**: `SQLSTATE[HY000]: General error: 1030 Got error`

**Solutions**:
1. Verify database credentials in `.env`
2. Run migrations: `php artisan migrate`
3. Check database encoding: `utf8mb4`
4. Ensure sufficient disk space

### Rate Limiting Issues

**Error**: `429 Too Many Requests`

**Solutions**:
1. Check rate limit configuration: `php artisan config:show bagisto-api`
2. Update rate limit in `.env`: `BAGISTO_API_RATE_LIMIT=200`
3. Clear rate limit cache: `php artisan cache:forget rate_limit`

### CORS Errors in Browser

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Verify CORS is configured in `config/cors.php`
2. Check `FRONTEND_URL` environment variable
3. Ensure `supports_credentials` is set properly
4. Clear browser cache

## Performance Optimization

Ensure the application is running in a production environment and that APP_DEBUG is set to false.

```bash
# Clear cached configuration and other optimized files
php artisan optimize:clear

# Rebuild and optimize caches
php artisan optimize
```

## What's Next?

Ready to start using the APIs?

- 🔐 [Authentication Guide](./authentication) - Learn about authentication methods
- 🔗 [REST API Guide](./rest-api/introduction.html) - Explore REST API endpoints
- ⚡ [GraphQL API Guide](./graphql-api/introduction.html) - Discover GraphQL capabilities
- 🔑 [API Key Management](./storefront-api-key-management-guide) - Generate and manage API keys