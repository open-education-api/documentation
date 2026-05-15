# Sorting / Ordering

The order of records returned by the server is not defined and is entirely
determined by the provider.

The server must, however, return records in a consistent and deterministic
order within the same request context. This is required to ensure that
pagination behaves correctly and that records are not skipped or duplicated
between pages.

Clients must not rely on the default ordering of records returned by a
provider. If a specific ordering is required, clients are responsible for
applying their own sorting after retrieving the data.

Providers may use any internal ordering strategy. The applied ordering is
implementation specific and may differ between providers or implementations.

## Key principles

1. Server-side ordering exists primarily to ensure stable pagination.
2. Default ordering is implementation specific.
3. Clients must not rely on provider-specific ordering behaviour.
4. Final sorting or presentation ordering is the responsibility of the client.
