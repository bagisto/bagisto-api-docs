# Integration Guides

Language and framework examples for the Bagisto **GraphQL** API. Every example targets the shop endpoint and carries the required headers.

- **Endpoint:** `POST https://your-domain.com/api/graphql`
- **Required on every request:** `Content-Type: application/json` and `X-STOREFRONT-KEY: <your key>`.
- **Customer operations** additionally send `Authorization: Bearer <token>` — the `token` from login (not `apiToken`). See [Authentication](/api/graphql-api/authentication).

Field notes used below: the product list is `products(first: N)` (channel comes from the `X-CHANNEL` header, not a query argument — see [Pagination](/api/pagination)); the profile query is `readCustomerProfile { customer { … } }`; login is `createCustomerLogin`. On action mutations select **result fields**, not `id` — see [Identifiers](/api/graphql-api/identifiers).

## JavaScript / Node.js

### Using Fetch API

```javascript
const API_URL = 'https://your-domain.com/api/graphql';
const STOREFRONT_KEY = 'pk_storefront_xxxxxxxxxxxxx';

async function gql(query, variables = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    'X-STOREFRONT-KEY': STOREFRONT_KEY,
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// Public — list products
async function getProducts() {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { id name sku } }
        pageInfo { hasNextPage endCursor }
      }
    }
  `;
  const data = await gql(query, { first: 10 });
  return data.products;
}

// Login — returns the customer Bearer token
async function login(email, password) {
  const mutation = `
    mutation Login($email: String!, $password: String!) {
      createCustomerLogin(input: { email: $email, password: $password }) {
        customerLogin { token success message }
      }
    }
  `;
  const data = await gql(mutation, { email, password });
  return data.createCustomerLogin.customerLogin.token;
}

// Authenticated — customer profile
async function getCustomerProfile(token) {
  const query = `
    query {
      readCustomerProfile {
        customer { id firstName lastName email }
      }
    }
  `;
  const data = await gql(query, {}, token);
  return data.readCustomerProfile.customer;
}
```

### Using Apollo Client (React)

```bash
npm install @apollo/client graphql
```

```javascript
import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://your-domain.com/api/graphql',
    headers: {
      'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx',
      // add after login:
      // Authorization: `Bearer ${token}`,
    },
  }),
  cache: new InMemoryCache(),
});

const PRODUCTS_QUERY = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges { node { id name sku } }
      pageInfo { hasNextPage endCursor }
    }
  }
`;

const { data } = await client.query({ query: PRODUCTS_QUERY, variables: { first: 20 } });
```

### Using graphql-request

```bash
npm install graphql-request
```

```javascript
import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://your-domain.com/api/graphql', {
  headers: {
    'X-STOREFRONT-KEY': 'pk_storefront_xxxxxxxxxxxxx',
    // Authorization: `Bearer ${token}`,  // customer operations
  },
});

const query = gql`
  query GetProduct($id: Int!) {
    product(id: $id) { id name sku }
  }
`;

const data = await client.request(query, { id: 1 });
```

### Next.js

```typescript
// lib/graphql.ts
export async function gql(query: string, variables = {}, token?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-STOREFRONT-KEY': process.env.STOREFRONT_KEY!,
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch('https://your-domain.com/api/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}
```

## Python

### Using requests

```python
import requests

API_URL = "https://your-domain.com/api/graphql"
STOREFRONT_KEY = "pk_storefront_xxxxxxxxxxxxx"

def gql(query, variables=None, token=None):
    headers = {
        "Content-Type": "application/json",
        "X-STOREFRONT-KEY": STOREFRONT_KEY,
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"

    res = requests.post(API_URL, json={"query": query, "variables": variables or {}}, headers=headers)
    body = res.json()
    if body.get("errors"):
        raise Exception(body["errors"][0]["message"])
    return body["data"]

def get_products():
    query = """
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges { node { id name sku } }
        pageInfo { hasNextPage endCursor }
      }
    }
    """
    return gql(query, {"first": 10})["products"]

def login(email, password):
    mutation = """
    mutation Login($email: String!, $password: String!) {
      createCustomerLogin(input: { email: $email, password: $password }) {
        customerLogin { token success message }
      }
    }
    """
    data = gql(mutation, {"email": email, "password": password})
    return data["createCustomerLogin"]["customerLogin"]["token"]

def get_customer_profile(token):
    query = """
    query {
      readCustomerProfile { customer { id firstName lastName email } }
    }
    """
    return gql(query, token=token)["readCustomerProfile"]["customer"]
```

### Using gql

```bash
pip install "gql[requests]"
```

```python
from gql import Client, gql as parse
from gql.transport.requests import RequestsHTTPTransport

transport = RequestsHTTPTransport(
    url="https://your-domain.com/api/graphql",
    headers={"X-STOREFRONT-KEY": "pk_storefront_xxxxxxxxxxxxx"},
)
client = Client(transport=transport, fetch_schema_from_transport=False)

query = parse("""
    query GetProducts($first: Int!) {
      products(first: $first) { edges { node { id name sku } } }
    }
""")

print(client.execute(query, variable_values={"first": 10}))
```

## PHP

### Using cURL

```php
<?php

class BagistoGraphQL
{
    private string $url;
    private string $storefrontKey;
    private ?string $token;

    public function __construct(string $url, string $storefrontKey, ?string $token = null)
    {
        $this->url = $url;
        $this->storefrontKey = $storefrontKey;
        $this->token = $token;
    }

    public function query(string $query, array $variables = []): array
    {
        $headers = [
            'Content-Type: application/json',
            'X-STOREFRONT-KEY: ' . $this->storefrontKey,
        ];
        if ($this->token) {
            $headers[] = 'Authorization: Bearer ' . $this->token;
        }

        $ch = curl_init($this->url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['query' => $query, 'variables' => $variables]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $body = json_decode(curl_exec($ch), true);
        curl_close($ch);

        if (! empty($body['errors'])) {
            throw new Exception($body['errors'][0]['message']);
        }
        return $body['data'];
    }

    public function getProducts(): array
    {
        return $this->query('
            query { products(first: 10) { edges { node { id name sku } } } }
        ')['products'];
    }
}

$client = new BagistoGraphQL('https://your-domain.com/api/graphql', 'pk_storefront_xxxxxxxxxxxxx');
print_r($client->getProducts());
```

### Using Laravel HTTP Client

```php
<?php

use Illuminate\Support\Facades\Http;

class BagistoService
{
    private string $url = 'https://your-domain.com/api/graphql';
    private string $key = 'pk_storefront_xxxxxxxxxxxxx';

    private function gql(string $query, array $variables = [], ?string $token = null): array
    {
        $request = Http::withHeaders(['X-STOREFRONT-KEY' => $this->key]);
        if ($token) {
            $request = $request->withToken($token);
        }

        $body = $request->post($this->url, ['query' => $query, 'variables' => $variables])->json();
        if (! empty($body['errors'])) {
            throw new Exception($body['errors'][0]['message']);
        }
        return $body['data'];
    }

    public function getProducts(): array
    {
        return $this->gql('query { products(first: 20) { edges { node { id name sku } } } }')['products'];
    }

    public function login(string $email, string $password): string
    {
        $data = $this->gql('
            mutation ($email: String!, $password: String!) {
                createCustomerLogin(input: { email: $email, password: $password }) {
                    customerLogin { token }
                }
            }
        ', ['email' => $email, 'password' => $password]);

        return $data['createCustomerLogin']['customerLogin']['token'];
    }

    public function getCustomerOrders(string $token): array
    {
        return $this->gql('
            query { customerOrders(first: 20) { edges { node { id incrementId status grandTotal } } } }
        ', [], $token)['customerOrders'];
    }
}
```

## Ruby

### Using Net::HTTP

```ruby
require 'net/http'
require 'json'
require 'uri'

class BagistoClient
  def initialize(url, storefront_key, token = nil)
    @uri = URI(url)
    @storefront_key = storefront_key
    @token = token
  end

  def query(query_string, variables = {})
    http = Net::HTTP.new(@uri.host, @uri.port)
    http.use_ssl = @uri.scheme == 'https'

    request = Net::HTTP::Post.new(@uri.path)
    request['Content-Type'] = 'application/json'
    request['X-STOREFRONT-KEY'] = @storefront_key
    request['Authorization'] = "Bearer #{@token}" if @token
    request.body = { query: query_string, variables: variables }.to_json

    body = JSON.parse(http.request(request).body)
    raise body['errors'][0]['message'] if body['errors']
    body['data']
  end

  def get_products
    query('query { products(first: 10) { edges { node { id name sku } } } }')['products']
  end

  def login(email, password)
    data = query(
      'mutation ($email: String!, $password: String!) {
         createCustomerLogin(input: { email: $email, password: $password }) {
           customerLogin { token }
         }
       }',
      { email: email, password: password }
    )
    data['createCustomerLogin']['customerLogin']['token']
  end
end

client = BagistoClient.new('https://your-domain.com/api/graphql', 'pk_storefront_xxxxxxxxxxxxx')
puts client.get_products
```

## Go

```go
package main

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
)

const (
	apiURL        = "https://your-domain.com/api/graphql"
	storefrontKey = "pk_storefront_xxxxxxxxxxxxx"
)

func gql(query string, variables map[string]interface{}, token string) (map[string]interface{}, error) {
	payload, _ := json.Marshal(map[string]interface{}{"query": query, "variables": variables})

	req, _ := http.NewRequest("POST", apiURL, bytes.NewReader(payload))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-STOREFRONT-KEY", storefrontKey)
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var out struct {
		Data   map[string]interface{}   `json:"data"`
		Errors []struct{ Message string } `json:"errors"`
	}
	json.Unmarshal(body, &out)
	if len(out.Errors) > 0 {
		return nil, errors.New(out.Errors[0].Message)
	}
	return out.Data, nil
}

func main() {
	data, err := gql(`query { products(first: 10) { edges { node { id name sku } } } }`, nil, "")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}
	fmt.Println(data["products"])
}
```

## Java

### Using OkHttp

```java
import okhttp3.*;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Map;

public class BagistoGraphQLClient {
    private final String apiUrl;
    private final String storefrontKey;
    private final String token;
    private final OkHttpClient client = new OkHttpClient();
    private final Gson gson = new Gson();

    public BagistoGraphQLClient(String apiUrl, String storefrontKey, String token) {
        this.apiUrl = apiUrl;
        this.storefrontKey = storefrontKey;
        this.token = token;
    }

    public String query(String graphqlQuery, Map<String, Object> variables) throws Exception {
        JsonObject payload = new JsonObject();
        payload.addProperty("query", graphqlQuery);
        payload.add("variables", gson.toJsonTree(variables));

        Request.Builder builder = new Request.Builder()
            .url(apiUrl)
            .post(RequestBody.create(payload.toString(), MediaType.parse("application/json")))
            .addHeader("Content-Type", "application/json")
            .addHeader("X-STOREFRONT-KEY", storefrontKey);

        if (token != null && !token.isEmpty()) {
            builder.addHeader("Authorization", "Bearer " + token);
        }

        try (Response response = client.newCall(builder.build()).execute()) {
            return response.body().string();
        }
    }

    public static void main(String[] args) throws Exception {
        BagistoGraphQLClient client = new BagistoGraphQLClient(
            "https://your-domain.com/api/graphql",
            "pk_storefront_xxxxxxxxxxxxx",
            null
        );
        System.out.println(client.query(
            "query { products(first: 10) { edges { node { id name sku } } } }", Map.of()));
    }
}
```

## cURL

```bash
# Public — list products
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"query":"query { products(first: 10) { edges { node { id name sku } } } }"}'

# Login — returns the customer token
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"query":"mutation { createCustomerLogin(input: { email: \"user@example.com\", password: \"password\" }) { customerLogin { token } } }"}'

# Authenticated — customer profile
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"query":"query { readCustomerProfile { customer { id firstName email } } }"}'
```

## Best practices

- **Always send `X-STOREFRONT-KEY`.** Every shop GraphQL request needs it; without it the request is rejected before the query runs.
- **Check `errors[]`.** GraphQL returns HTTP `200` even on failure — the reason is in the top-level `errors` array with `data` fields `null`. See [Status Codes](/api/errors).
- **Use `token`, not `apiToken`.** Login returns both; the Bearer is `token`. There is **no refresh token** — on a `401`, log in again to get a new one.
- **Paginate with cursors.** Page forward with `first` + `after: <endCursor>` until `pageInfo.hasNextPage` is `false`. See [Pagination](/api/pagination).
- **Select result fields on action mutations,** never `id` — see [Identifiers](/api/graphql-api/identifiers).
- **Rate limiting.** Back off and retry on `429`. See [Rate Limiting](/api/rate-limiting).

## Related Documentation

- [Authentication](/api/graphql-api/authentication)
- [Status Codes](/api/errors)
- [Pagination](/api/pagination)
- [Identifiers (`id` vs `_id`)](/api/graphql-api/identifiers)
- [REST ↔ GraphQL Mapping](/api/rest-graphql-mapping/)
