## Versioning: how it works

OEAPI uses a header-based, explicit, single-choice versioning model.

For each request, the client specifies exactly one OEAPI version and
optionally one consumer with exactly one consumer version using the
`Accept` header. The server does not negotiate between alternatives.

This is referred to as the *closed* versioning approach.

In practice this means:

- the client sends one explicit OEAPI version via `Accept`
- the client can include one consumer and one consumer version via `Accept`
- the server evaluates whether the requested version or a compatible minor
  version within the same major can be provided (this may be lower or higher)
- the same principle applies to the optional consumer version
- if no compatible version exists, the server rejects the request

Only minor fallback is allowed. Major version fallback is never permitted.

The server always indicates the actual versions used in the response via
the `Content-Type` header.

If the requested version cannot be satisfied (and no compatible minor version
is available), the server returns `406 Not Acceptable`, including the
requested version and the list of supported versions in the response body.

OEAPI deliberately does not use:

- multiple alternative versions in the `Accept` header
- HTTP standard `Accept` negotiation
- query parameters for versioning
- version attributes in the request body

In short: the client chooses, the server validates. There is no negotiation.

---

## Versioning: examples

### Example 1: successful request (exact version match)

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

### Example 2: minor fallback (higher or lower)

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

Because the versions share the same major (6), the server may return a
compatible minor version, higher or lower, and explicitly reports the
versions used.

---

### Example 3: unsupported OEAPI version

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

### Example 4: unsupported consumer version

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
