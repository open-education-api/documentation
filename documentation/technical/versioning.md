# Versioning

## OEAPI Versioning

OEAPI uses semantic versioning with a major and minor version number:

```text
vMAJOR.MINOR
```

Examples:

```text
v5.0
v6.0
v6.1
```

Patch versions are not used.

### Major versions

A new major version is created when the specification contains breaking changes.

A change is considered breaking when an existing implementation may no longer work without modification. Examples include:

- Removing an endpoint, object, attribute, or enum value.
- Renaming an endpoint, object, attribute, or enum value.
- Changing the meaning of an existing attribute.
- Changing the type or structure of an existing attribute.
- Adding a new mandatory attribute to an existing request or response.
- Changing validation rules in a way that rejects previously valid data.

### Minor versions

A new minor version is created for non-breaking changes.

A change is considered non-breaking when existing implementations that support the previous minor version can continue to operate without modification. Examples include:

- Adding optional attributes.
- Adding optional enum values.
- Adding new endpoints.
- Extending descriptions, examples, or documentation.
- Clarifying existing behaviour without changing its meaning.

Minor versions are therefore backwards and forwards compatible within the same major version.

### Compatibility

Implementations that support a specific minor version within a major version should also support later minor versions of the same major version, provided they ignore unknown optional fields.

For example, an implementation supporting `v6.0` should also be able to process responses from `v6.1`.

Implementations must not assume that future minor versions contain exactly the same set of attributes. Additional optional data may be introduced in any minor version.

### Consumer versioning

Consumer definitions use semantic versioning with a major and minor version number:

```text
vMAJOR.MINOR
```

A new major version is created when the consumer definition contains breaking changes.

A change is considered breaking when an existing implementation of the consumer may no longer work without modification. Examples include:

- Removing a consumer attribute.
- Renaming a consumer attribute.
- Changing the meaning of a consumer attribute.
- Changing the type or structure of a consumer attribute.
- Adding a new mandatory consumer attribute.

A new minor version is created for non-breaking changes.

A change is considered non-breaking when existing implementations can continue to operate without modification. Examples include:

- Adding optional consumer attributes.
- Adding optional enum values.
- Extending descriptions, examples, or documentation.
- Clarifying existing behaviour without changing its meaning.

Minor versions are therefore backwards compatible within the same major version.

#### Consumer compatibility examples

Each consumer version defines the minimum OEAPI version it requires.

| Consumer version | Minimum OEAPI version |
|------------------|-----------------------|
| v2.0             | v6.1                  |
| v2.1             | v6.1                  |
| v3.0             | v6.2                  |

In this example:

- Consumer version `v2.1` is a non-breaking update of `v2.0` and therefore continues to require OEAPI `v6.1`.
- Consumer version `v3.0` introduces breaking changes and requires OEAPI `v6.2`.
- A request using consumer version `v3.0` cannot be served by an OEAPI implementation that only supports `v6.1`.

## Header based versioning model

OEAPI uses a header-based, explicit, single-choice versioning model.

For each request, the client specifies exactly one OEAPI version and may
optionally include exactly one consumer tuple, consisting of one consumer and
one consumer version, using the `Accept` header.

The server does not perform HTTP content negotiation between multiple
alternative versions.

This is referred to as the *closed* versioning approach.

In practice this means:

- the client sends one explicit OEAPI version via `Accept`
- the client may include one consumer tuple via `Accept`, consisting of one
  consumer and one consumer version
- the server evaluates whether the requested version or a compatible higher or
  lower minor version within the same major can be provided
- the same principle applies to the optional consumer tuple
- if no compatible version exists, the server rejects the request

Only minor version fallback is allowed. Major version fallback is never
permitted.

The server always indicates the actual versions used in the response via the
`Content-Type` header.

If the requested version cannot be satisfied and no compatible minor version is
available, the server returns `406 Not Acceptable`, including the requested
version and the list of supported versions in the response body.

OEAPI deliberately does not use:

- multiple alternative versions in the `Accept` header
- HTTP standard `Accept` negotiation
- query parameters for versioning
- version attributes in the request body

In short: the client chooses, the server validates. There is no negotiation.

---

### Versioning: examples

#### Example 1: successful request (exact version match)

Client:

```http
GET /courses
Accept: application/vnd.oeapi+json;version=6.1;consumer=mbo-oke-roster-service;consumer-version=6.0
```

Server:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.oeapi+json;version=6.1;consumer=mbo-oke-roster-service;consumer-version=6.0
```

The requested OEAPI and consumer versions are fully supported.  
The server returns exactly the same versions as requested.

---

#### Example 2: minor version fallback (higher or lower)

Client:

```http
GET /courses
Accept: application/vnd.oeapi+json;version=6.1;consumer=mbo-oke-roster-service;consumer-version=6.0
```

Server:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.oeapi+json;version=6.0;consumer=mbo-oke-roster-service;consumer-version=6.1
```

Because the versions share the same major version, the server may return a
compatible higher or lower minor version and explicitly reports the versions
used.

---

#### Example 3: unsupported OEAPI version

Client:

```http
POST /enrolments
Accept: application/vnd.oeapi+json;version=7.0;consumer=mbo-oke-roster-service;consumer-version=6.0
```

Server:

```http
HTTP/1.1 406 Not Acceptable
```

Response body:

```json
{
  "type": "https://api.example.org/problems/version-not-acceptable",
  "title": "Version not acceptable",
  "status": 406,
  "detail": "The requested OEAPI version '7.0' cannot be served.",
  "requestedVersion": "7.0",
  "supportedVersions": ["5.0", "6.1"],
  "instance": "https://api.example.org/courses"
}
```

The requested major version is not supported.  
Fallback is not permitted and the request is rejected.

---

#### Example 4: unsupported consumer version

Client:

```http
POST /enrolments
Accept: application/vnd.oeapi+json;version=6.1;consumer=mbo-oke-roster-service;consumer-version=7.0
```

Server:

```http
HTTP/1.1 406 Not Acceptable
```

Response body:

```json
{
  "type": "https://api.example.org/problems/version-not-acceptable",
  "title": "Version not acceptable",
  "status": 406,
  "detail": "The requested consumer version '7.0' cannot be served.",
  "consumer": {
    "consumerKey": "mbo-oke-roster-service"
  },
  "requestedVersion": "7.0",
  "supportedVersions": ["0.95", "1.0", "6.1"],
  "instance": "https://api.example.org/courses"
}
```

The requested consumer version is not supported.  
Fallback is not permitted and the request is rejected.
