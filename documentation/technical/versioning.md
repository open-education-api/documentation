## Versioning: how it works

OEAPI uses an explicit, single-choice versioning model.

For each request, the client specifies exactly one OEAPI version and exactly one consumer version using HTTP headers. The server does not negotiate between alternatives.

This is referred to as the *closed* versioning approach.

In practice this means:

- the client sends one explicit OEAPI version via `Accept`
- the client sends one explicit consumer version via `OEAPI-Consumer-Version`
- the server either accepts that version, or falls back to a lower compatible minor version within the same major
- if no compatible version exists, the server rejects the request

Only minor fallback is allowed. Major version fallback is never permitted.

The server MUST always indicate the actual versions used in the response headers.

If the requested version cannot be satisfied (and no compatible minor version is available), the server MUST return `406 Not Acceptable`, including the requested version and the list of supported versions in the response body.

OEAPI deliberately does not use:

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
Content-Type: application/vnd.oeapi+json;version=6.1
```

Server:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.oeapi+json;version=6.1
```

The requested OEAPI and consumer versions are fully supported.  
The server returns exactly the same versions as requested.

---

### Example 2: minor fallback

Client:

```http
GET /courses
Content-Type: application/vnd.oeapi+json;version=6.1
```

Server:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.oeapi+json;version=6.0
```

Because both versions share the same major (6), the server falls back to the highest compatible minor and explicitly reports the versions used.

---

### Example 3: unsupported OEAPI version

Client:

```http
POST /enrolments
Content-Type: application/vnd.oeapi+json;version=7.0
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
Content-Type: application/vnd.oeapi+json;version=6.0

OEAPI-Consumer-Name: mbo-oke-roster-service
OEAPI-Consumer-Version: 7.0
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
