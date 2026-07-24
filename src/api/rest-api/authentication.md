# Authentication

Complete guide to API authentication methods including customer authentication, admin authentication, and token management using the REST API.

## Customer Authentication

### Customer Registration

Register a new customer account.

**Endpoint:**
```
POST /api/shop/customers
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/customers" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "password": "SecurePassword123!",
    "password_confirmation": "SecurePassword123!",
    "phone": "1234567890"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/customers', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    password: 'SecurePassword123!',
    password_confirmation: 'SecurePassword123!',
    phone: '1234567890'
  })
});

const customer = await response.json();
console.log(customer);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/shop/customers',
    headers={'Content-Type': 'application/json'},
    json={
        'first_name': 'John',
        'last_name': 'Doe',
        'email': 'john@example.com',
        'password': 'SecurePassword123!',
        'password_confirmation': 'SecurePassword123!',
        'phone': '1234567890'
    }
)

customer = response.json()
print(customer)
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/Customer",
  "@id": "/api/shop/customers/10",
  "@type": "Customer",
  "id": 10,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "status": 1,
  "created_at": "2024-01-20T10:30:00Z"
}
```

### Customer Login

Authenticate a customer and receive bearer token.

**Endpoint:**
```
POST /api/shop/customer/login
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123!"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/customer/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'SecurePassword123!'
  })
});

const data = await response.json();
localStorage.setItem('authToken', data.access_token);
console.log('Access Token:', data.access_token);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/shop/customer/login',
    headers={'Content-Type': 'application/json'},
    json={
        'email': 'john@example.com',
        'password': 'SecurePassword123!'
    }
)

data = response.json()
print(f"Token: {data['access_token']}")
```

:::

**Response (200 OK):**

```json
{
  "@context": "/api/contexts/Customer",
  "@type": "Token",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "token_type": "Bearer",
  "expires_in": 86400,
  "customer": {
    "id": 10,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  }
}
```

### Verify Authentication Token

Verify if authentication token is still valid.

::: tip Checking "am I logged in?"
There is no dedicated session/status endpoint. To check whether a stored token is still valid, call `POST /api/shop/verify-tokens` — or simply call any protected endpoint (e.g. `GET /api/shop/customer` profile). A `200` means the token is valid; a `401`/`403` means it is missing, invalid, or expired — treat any of those as "not logged in" and send the user back through login (tokens do not auto-refresh; re-login to get a new one).
:::

**Endpoint:**
```
POST /api/shop/verify-tokens
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/verify-tokens" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/shop/verify-tokens', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const result = await response.json();
console.log('Token valid:', result.is_valid);
```

== Python

```python
import requests

token = 'YOUR_ACCESS_TOKEN'

response = requests.post(
    'https://your-domain.com/api/shop/verify-tokens',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

result = response.json()
print(f"Token valid: {result['is_valid']}")
```

:::

**Response (200 OK):**

```json
{
  "@type": "TokenVerification",
  "is_valid": true,
  "customer_id": 10,
  "expires_at": "2024-01-21T10:30:00Z"
}
```

## Admin Authentication

Admin API requests authenticate with a pre-issued **Integration token** — there is no admin login endpoint. Generate a token from the **Integration** menu in the admin panel (a store owner can generate tokens here and share them with the sub-admins who need API access), then send it on every admin request:

```
Authorization: Bearer <id>|<token>
```

See [Admin Authentication](/api/rest-api/admin/authentication) for the full token lifecycle, IP allowlists, and rate limits.

## Cart Token Generation

### Create Cart Token

Generate a guest cart token for unauthenticated users.

**Endpoint:**
```
POST /api/shop/cart-tokens
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/cart-tokens" \
  -H "Content-Type: application/json" \
  -d '{}'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/cart-tokens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});

const cart = await response.json();
localStorage.setItem('cartToken', cart.token);
console.log('Cart Token:', cart.token);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/shop/cart-tokens',
    headers={'Content-Type': 'application/json'},
    json={}
)

cart = response.json()
print(f"Cart Token: {cart['token']}")
```

:::

**Response (201 Created):**

```json
{
  "@context": "/api/contexts/Cart",
  "@id": "/api/shop/cart-tokens/xyz-token-123",
  "@type": "Cart",
  "token": "xyz-token-123",
  "items": [],
  "total": 0,
  "created_at": "2024-01-20T10:30:00Z"
}
```

## Password Management

### Forgot Password

Request password reset for customer account.

**Endpoint:**
```
POST /api/shop/forgot-passwords
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/forgot-passwords" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }'
```

== Node.js

```javascript
const response = await fetch('https://your-domain.com/api/shop/forgot-passwords', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com'
  })
});

const result = await response.json();
console.log(result.message);
```

== Python

```python
import requests

response = requests.post(
    'https://your-domain.com/api/shop/forgot-passwords',
    headers={'Content-Type': 'application/json'},
    json={'email': 'john@example.com'}
)

result = response.json()
print(result['message'])
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "If that email address is in our database, we will send you an email with password reset instructions."
}
```

### Change Password

There is no standalone change-password endpoint. A logged-in customer changes their password through the **Customer Profile Update** endpoint (`PUT /api/shop/customer-profile-updates/{id}`) by sending the current password alongside the new password.

## Token Revocation

### Logout & Revoke Token

Invalidate current authentication token.

**Endpoint:**
```
POST /api/shop/customer/logout
```

:::tabs

== cURL

```bash
curl -X POST "https://your-domain.com/api/shop/customer/logout" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

== Node.js

```javascript
const token = localStorage.getItem('authToken');

const response = await fetch('https://your-domain.com/api/shop/customer/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

localStorage.removeItem('authToken');
console.log('Logged out successfully');
```

== Python

```python
import requests

token = 'YOUR_ACCESS_TOKEN'

response = requests.post(
    'https://your-domain.com/api/shop/customer/logout',
    headers={
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
)

print('Logged out successfully')
```

:::

**Response (200 OK):**

```json
{
  "@type": "Message",
  "message": "Successfully logged out"
}
```

### Admin Logout

Admin tokens are not logged out over the API. To revoke an admin Integration token, open the **Integration** menu in the admin panel and click **Revoke** (or use the signed one-click link in the lifecycle email). A revoked token stops working immediately.

## Authentication Headers

### Using Bearer Token

Include bearer token in Authorization header for authenticated requests.

```
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Using Cart Token

Include cart token in X-Cart-Token header for guest cart operations.

```
X-Cart-Token: YOUR_CART_TOKEN
```

### Using API Key (if available)

Some endpoints may accept API Key authentication.

```
X-API-Key: YOUR_API_KEY
```

## Error Handling

### Authentication Errors

**401 Unauthorized:**

```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "An error occurred",
  "hydra:description": "Invalid credentials or expired token"
}
```

**403 Forbidden:**

```json
{
  "@context": "/api/contexts/Error",
  "@type": "hydra:Error",
  "hydra:title": "Access Denied",
  "hydra:description": "Insufficient permissions for this operation"
}
```

## Best Practices

- Store tokens securely (use httpOnly cookies or secure storage)
- Implement token refresh mechanisms before expiration
- Use HTTPS for all authentication requests
- Validate tokens on every request
- Revoke tokens on logout
- Implement rate limiting on authentication endpoints
- Use strong passwords (minimum 8 characters, mixed case, numbers, special characters)

## Related Resources

- [Customer Management](/api/rest-api/customers)
- [Best Practices](/api/rest-api/best-practices)
- [Shop Resources](/api/rest-api/shop-resources)
