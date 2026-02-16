## Versioning: how it works

OOAPI uses an explicit, single-choice versioning model.

For each request, the client specifies exactly one OOAPI version and exactly one consumer version using HTTP headers. The server does not negotiate between alternatives.

This is referred to as the *closed* versioning approach.

In practice this means:

- the client sends one explicit OOAPI version via `Content-Type`
- the client sends one explicit consumer version via `OOAPI-Consumer-Version`
- the server either accepts that version, or falls back to a lower compatible minor version within the same major
- if no compatible version exists, the server rejects the request

Only minor fallback is allowed. Major version fallback is never permitted.

The server MUST always indicate the actual versions used in the response headers.

If the requested version cannot be satisfied (and no compatible minor version is available), the server MUST return `406 Not Acceptable`, including the requested version and the list of supported versions in the response body.

OOAPI deliberately does not use:

- HTTP `Accept` negotiation
- query parameters for versioning
- version attributes in the request body

In short: the client chooses, the server validates. There is no negotiation.

---

## Versioning: examples

### Example 1: successful request (exact version match)

Client:

```http
GET /courses
Content-Type: application/vnd.ooapi.v6.1+json

OOAPI-Consumer-Name: mbo-oke-roster-service
OOAPI-Consumer-Version: 1.0
```

Server:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.ooapi.v6.1+json

OOAPI-Consumer-Name: mbo-oke-roster-service
OOAPI-Consumer-Version: 1.0
```

The requested OOAPI and consumer versions are fully supported.  
The server returns exactly the same versions as requested.

---

### Example 2: minor fallback

Client:

```http
GET /courses
Content-Type: application/vnd.ooapi.v6.1+json

OOAPI-Consumer-Name: mbo-oke-roster-service
OOAPI-Consumer-Version: 1.0
```

Server:

```http
HTTP/1.1 200 OK
Content-Type: application/vnd.ooapi.v6.0+json

OOAPI-Consumer-Name: mbo-oke-roster-service
OOAPI-Consumer-Version: 0.94
```

Because both versions share the same major (6), the server falls back to the highest compatible minor and explicitly reports the versions used.

---

### Example 3: unsupported version

Client:

```http
POST /enrolments
Content-Type: application/vnd.ooapi.v7.0+json

OOAPI-Consumer-Version: 2.0
```

Server:

```http
HTTP/1.1 406 Not Acceptable
```

Response body:

```json
{
  "error": "Unsupported OOAPI or consumer version",
  "requestedVersion": "2.0",
  "supportedVersions": ["0.94", "1.0"]
}
```

The requested major version is not supported.  
Fallback is not permitted and the request is rejected.
