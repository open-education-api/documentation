# Implementing versioning

The versioning policy and header requirements are defined in the
Specification section. The examples below illustrate how to apply them.

---

## Example 1: successful request (exact version match)

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

## Example 2: minor version fallback (higher or lower)

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

## Example 3: unsupported OEAPI version

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

## Example 4: unsupported consumer version

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
