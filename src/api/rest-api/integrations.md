# Integration Guides

Language and framework examples for the Bagisto **REST** API. Every example carries the required headers.

- **Base URL:** `https://your-domain.com/api/shop`
- **Required on every request:** `X-STOREFRONT-KEY: <your key>` (and `Content-Type: application/json` on writes).
- **Customer operations** additionally send `Authorization: Bearer <token>` — the `token` from login (not `apiToken`). See [Authentication](/api/rest-api/authentication).
- **List responses** are a flat JSON array; paging totals come back in `X-Total-Count` / `X-Page` / `X-Per-Page` / `X-Total-Pages` headers (see [Pagination](/api/pagination)). **Errors** are signalled by the HTTP status — see [Status Codes](/api/errors).

Paths used below: products `GET /products`, login `POST /customer/login`, profile `GET /customer-profile`, orders `GET /customer-orders`.

## JavaScript / Node.js

### Using Fetch API

```javascript
const BASE_URL = 'https://your-domain.com/api/shop';
const STOREFRONT_KEY = 'pk_storefront_xxxxxxxxxxxxx';

async function api(path, { method = 'GET', body, token } = {}) {
  const headers = { 'X-STOREFRONT-KEY': STOREFRONT_KEY };
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// Public — list products (with paging + filters)
async function getProducts() {
  return api('/products?per_page=20&sort=name-asc');
}

// Login — returns the customer Bearer token
async function login(email, password) {
  const data = await api('/customer/login', { method: 'POST', body: { email, password } });
  return data.token;
}

// Authenticated — customer profile
async function getCustomerProfile(token) {
  return api('/customer-profile', { token });
}
```

### Axios

```bash
npm install axios
```

```javascript
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://your-domain.com/api/shop',
  headers: { 'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx' },
});

// after login, attach the token:
// client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const { data } = await client.get('/products', { params: { per_page: 20, sort: 'price-asc' } });
```

### Next.js

```typescript
// lib/api.ts
export async function api(path: string, init: RequestInit & { token?: string } = {}) {
  const headers: Record<string, string> = {
    'X-STOREFRONT-KEY': process.env.STOREFRONT_KEY!,
    ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    ...(init.token ? { Authorization: `Bearer ${init.token}` } : {}),
  };
  const res = await fetch(`https://your-domain.com/api/shop${path}`, { ...init, headers });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

## Python

### Using requests

```python
import requests

BASE_URL = "https://your-domain.com/api/shop"
STOREFRONT_KEY = "pk_storefront_xxxxxxxxxxxxx"

def api(path, method="GET", body=None, token=None):
    headers = {"X-STOREFRONT-KEY": STOREFRONT_KEY}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    res = requests.request(method, f"{BASE_URL}{path}", json=body, headers=headers)
    res.raise_for_status()
    return res.json()

def get_products():
    return api("/products?per_page=20&sort=name-asc")

def login(email, password):
    data = api("/customer/login", method="POST", body={"email": email, "password": password})
    return data["token"]

def get_customer_profile(token):
    return api("/customer-profile", token=token)
```

### Django

```python
# services/bagisto.py
import requests
from django.conf import settings

def get_products():
    res = requests.get(
        "https://your-domain.com/api/shop/products",
        params={"per_page": 100},
        headers={"X-STOREFRONT-KEY": settings.BAGISTO_STOREFRONT_KEY},
    )
    res.raise_for_status()
    return res.json()
```

## PHP

### Using cURL

```php
<?php

class BagistoRest
{
    private string $base;
    private string $storefrontKey;
    private ?string $token;

    public function __construct(string $base, string $storefrontKey, ?string $token = null)
    {
        $this->base = rtrim($base, '/');
        $this->storefrontKey = $storefrontKey;
        $this->token = $token;
    }

    public function request(string $method, string $path, ?array $body = null): array
    {
        $headers = ['X-STOREFRONT-KEY: ' . $this->storefrontKey];
        if ($body !== null) {
            $headers[] = 'Content-Type: application/json';
        }
        if ($this->token) {
            $headers[] = 'Authorization: Bearer ' . $this->token;
        }

        $ch = curl_init($this->base . $path);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        if ($body !== null) {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
        }

        $response = curl_exec($ch);
        $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($status >= 400) {
            throw new Exception("HTTP $status: $response");
        }
        return json_decode($response, true);
    }

    public function getProducts(): array
    {
        return $this->request('GET', '/products?per_page=20');
    }

    public function login(string $email, string $password): string
    {
        $data = $this->request('POST', '/customer/login', compact('email', 'password'));
        return $data['token'];
    }
}

$client = new BagistoRest('https://your-domain.com/api/shop', 'pk_storefront_xxxxxxxxxxxxx');
print_r($client->getProducts());
```

### Using Laravel HTTP Client

```php
<?php

use Illuminate\Support\Facades\Http;

class BagistoService
{
    private string $base = 'https://your-domain.com/api/shop';
    private string $key = 'pk_storefront_xxxxxxxxxxxxx';

    private function client(?string $token = null)
    {
        $request = Http::withHeaders(['X-STOREFRONT-KEY' => $this->key]);
        return $token ? $request->withToken($token) : $request;
    }

    public function getProducts(): array
    {
        return $this->client()->get("{$this->base}/products", ['per_page' => 20])->throw()->json();
    }

    public function login(string $email, string $password): string
    {
        return $this->client()
            ->post("{$this->base}/customer/login", compact('email', 'password'))
            ->throw()->json('token');
    }

    public function getCustomerOrders(string $token): array
    {
        return $this->client($token)->get("{$this->base}/customer-orders")->throw()->json();
    }
}
```

## Ruby

### Using Net::HTTP

```ruby
require 'net/http'
require 'json'
require 'uri'

class BagistoRest
  def initialize(base, storefront_key, token = nil)
    @base = base
    @storefront_key = storefront_key
    @token = token
  end

  def request(method, path, body = nil)
    uri = URI("#{@base}#{path}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = uri.scheme == 'https'

    klass = method == 'POST' ? Net::HTTP::Post : Net::HTTP::Get
    req = klass.new(uri)
    req['X-STOREFRONT-KEY'] = @storefront_key
    req['Authorization'] = "Bearer #{@token}" if @token
    if body
      req['Content-Type'] = 'application/json'
      req.body = body.to_json
    end

    res = http.request(req)
    raise "HTTP #{res.code}" if res.code.to_i >= 400
    JSON.parse(res.body)
  end

  def get_products
    request('GET', '/products?per_page=20')
  end

  def login(email, password)
    request('POST', '/customer/login', { email: email, password: password })['token']
  end
end

client = BagistoRest.new('https://your-domain.com/api/shop', 'pk_storefront_xxxxxxxxxxxxx')
puts client.get_products
```

## Go

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const (
	baseURL       = "https://your-domain.com/api/shop"
	storefrontKey = "pk_storefront_xxxxxxxxxxxxx"
)

func api(method, path string, body interface{}, token string) ([]byte, error) {
	var reader io.Reader
	if body != nil {
		payload, _ := json.Marshal(body)
		reader = bytes.NewReader(payload)
	}

	req, _ := http.NewRequest(method, baseURL+path, reader)
	req.Header.Set("X-STOREFRONT-KEY", storefrontKey)
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	data, _ := io.ReadAll(resp.Body)
	if resp.StatusCode >= 400 {
		return nil, fmt.Errorf("HTTP %d: %s", resp.StatusCode, data)
	}
	return data, nil
}

func main() {
	data, err := api("GET", "/products?per_page=20", nil, "")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(string(data))
}
```

## Java

### Using OkHttp

```java
import okhttp3.*;

public class BagistoRestClient {
    private final String base;
    private final String storefrontKey;
    private final String token;
    private final OkHttpClient client = new OkHttpClient();

    public BagistoRestClient(String base, String storefrontKey, String token) {
        this.base = base;
        this.storefrontKey = storefrontKey;
        this.token = token;
    }

    public String get(String path) throws Exception {
        Request.Builder builder = new Request.Builder()
            .url(base + path)
            .get()
            .addHeader("X-STOREFRONT-KEY", storefrontKey);

        if (token != null && !token.isEmpty()) {
            builder.addHeader("Authorization", "Bearer " + token);
        }

        try (Response response = client.newCall(builder.build()).execute()) {
            if (!response.isSuccessful()) {
                throw new Exception("HTTP " + response.code());
            }
            return response.body().string();
        }
    }

    public static void main(String[] args) throws Exception {
        BagistoRestClient client = new BagistoRestClient(
            "https://your-domain.com/api/shop",
            "pk_storefront_xxxxxxxxxxxxx",
            null
        );
        System.out.println(client.get("/products?per_page=20"));
    }
}
```

## cURL

```bash
# Public — list products (paged + sorted)
curl -X GET "https://your-domain.com/api/shop/products?per_page=20&sort=name-asc" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"

# Login — returns the customer token
curl -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"email":"user@example.com","password":"password"}'

# Authenticated — customer profile
curl -X GET "https://your-domain.com/api/shop/customer-profile" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Best practices

- **Always send `X-STOREFRONT-KEY`.** Every shop request needs it; a missing/invalid key returns `401`.
- **Branch on the HTTP status,** not the message text — `2xx` success, `401` renew credential, `403`/`404` not available, `409`/`422` fix the request, `429` back off. See [Status Codes](/api/errors).
- **Use `token`, not `apiToken`.** Login returns both; the Bearer is `token`. There is **no refresh token** — on a `401`, log in again.
- **Read paging headers.** Loop until `X-Page` reaches `X-Total-Pages`; control page size with `per_page` (cap `50`). See [Pagination](/api/pagination).
- **Rate limiting.** Back off and retry on `429`. See [Rate Limiting](/api/rate-limiting).

## Related Documentation

- [Authentication](/api/rest-api/authentication)
- [Status Codes](/api/errors)
- [Pagination](/api/pagination)
