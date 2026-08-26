---
outline: false
---

# Test & Ship

An endpoint is not done when it returns data in Postman. It is done when both transports are covered by tests and integrators can discover it.

## Test both transports

Your provider is shared, so a REST test passing tells you nothing about GraphQL — the failure modes that bite live in the transport layer: an untagged resolver, an undeclared argument, a camelCase property that resolves null. Write one test per transport per operation.

```php
/** Post a GraphQL query to the real endpoint as the given customer. */
protected function graphql(string $query, ?object $customer = null): TestResponse
{
    return $this->postJson('/api/graphql', ['query' => $query], [
        'X-STOREFRONT-KEY' => 'pk_test_'.str_repeat('a', 32),
        // plus the customer Bearer when the endpoint needs one
    ]);
}

public function test_graphql_question_query_returns_full_data(): void
{
    $res = $this->graphql(
        "{ productQuestion(id: {$question->id}) { id productId customerName question createdAt } }",
    );

    $res->assertOk();
    $this->assertNull($res->json('errors'));
    $this->assertSame($question->id, $res->json('data.productQuestion.id'));
}
```

**Assert `errors` is null.** A GraphQL failure still returns HTTP `200`, so `assertOk()` alone passes on a query that resolved nothing. This is the single most common way a green suite hides a broken field.

Cover, for every endpoint: the happy path, a missing credential, and another customer's record. The third is the one that catches a missing ownership check, and it is the one most likely to be skipped.

Select the **multi-word** fields explicitly in at least one test. `id` and other single-word fields resolve whether or not the properties are named correctly, so a test that selects only those passes on a class where every camelCase field returns null.

## Verify against the real schema

Before shipping, confirm the schema agrees with your documentation:

```bash
# Your REST paths
php artisan route:list --path=api/shop | grep product-questions

# Your GraphQL fields, from the running server
curl -s -X POST http://your-domain.com/api/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ __schema { queryType { fields { name } } } }"}' | grep -i productQuestion
```

Introspection needs no credential, so this works before you have a key.

## Ship the schema

Export the machine-readable schema so integrators can import it without a running store:

```bash
php artisan bagisto-api-platform:export-schema
```

That writes the REST OpenAPI JSON and the GraphQL SDL for both surfaces, your endpoints included. Committing the exported files alongside your module gives consumers a Postman collection and codegen input for free.

Your endpoints also appear automatically in the interactive playgrounds — Swagger UI at `/api/shop` and `/api/admin`, GraphiQL at `/api/graphiql` and `/api/admin/graphiql`. If they are missing there, the resource is not registered; see [Register Your Package](/api/for-developers/register-your-package).

## Document what you built

Whatever the host generates from your `openapi` blocks covers the wire shape. What it cannot express is the behaviour a consumer has to know: which endpoints need a token, what makes a record appear, and what each error means. A short reference shipped with the module — one REST page, one GraphQL page — closes that gap.

Two conventions worth borrowing from this documentation:

- **Describe behaviour, never internals.** No class, file, or method names — an integrator cannot act on them.
- **Verify every example against the live endpoint.** Copy the real request and the real response rather than writing what you expect them to be. Invented examples are the most common defect in API documentation, and the most damaging, because they fail only after someone has trusted them.

## Release checklist

- Endpoints reachable on both transports, with the tags and examples filled in
- Ownership enforced on every id a client supplies
- Errors thrown as the host's exception types, messages from your lang files
- Tests: happy path, missing credential, and another user's record — per transport
- Multi-word fields asserted non-null over GraphQL
- `interface_exists` guard present, so the module installs on a store without the API package
- `php artisan bagisto-api-platform:optimize` run, and the caches left warm
