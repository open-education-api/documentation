# Sorting / Ordering

The order of records returned by the server is not defined and is entirely
determined by the provider. The server must, however, return records in a
consistent order within the same request context, for example to ensure that
pagination behaves correctly.

Clients are responsible for applying their own ordering or sorting if a
specific order is required.

Providers may use any internal ordering strategy. This internal ordering is
implementation specific and must not be relied upon by clients.

## Key principles

- Server ordering exists only to ensure stable pagination.
- Final sorting of results is the responsibility of the client.
