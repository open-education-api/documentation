
# Contributing Guidelines

## General

The following general rules apply for this project:

- All contributions, including documentation, file names, and discussions, must be written in British English.

## Issue tracker

Our [issue tracker](https://github.com/open-education-api/specification/issues) is used to discuss problems or additions to the current and next versions of the Open Education API specification.

Before opening an issue, please ensure that:

- The issue is not a duplicate of an existing issue..
- The issue is relevant to the specification.

## Formatting / naming conventions

- The specification must comply with the
  [OpenAPI Specification v3.1](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md)
- The specification files must be written in
  [YAML 1.2 format](https://yaml.org/spec/1.2.2/)
- YAML indentation should use two spaces (not tabs)
- YAML string keys and values should be unquoted when quotation is not required
- YAML string keys and values should be single-quoted when quotation is required
- Duplication should be avoided where possible (e.g. using
  [`$ref`](https://json-schema.org/draft/2020-12/json-schema-core#section-8.2.3.1)
  references)
- Whether property and relation names are written as singular or plural depends
  on the cardinality of the property or relation.
- Parameter or property names are written in
  [lowerCamelCase](https://en.wikipedia.org/wiki/CamelCase), including
  abbreviations (e.g. `organisationUnitId`).
- Path names are written in
  [kebab-case](https://en.wikipedia.org/wiki/Kebab_case), for example
  `/learning-component-offerings/{learningComponentOfferingId}`.
- The default order of properties is:
  - Identifier
  - Properties
  - Meta properties (e.g. `createdAt`)
- Links should have descriptive names (e.g. `ccordinators` instead of `person` for
  indicating the person that is n charge of coordinating the course).
- Nesting of properties is allowed.
- Date and date-time properties are formatted in accordance with
  [RFC 3339](https://www.rfc-editor.org/rfc/rfc3339.html).

## Versioning and Branching Strategy

This chapter describes how versioning and branching are handled for the OOAPI
specification repository.

### `main` as the single integration branch

The repository uses **`main`** as its only long-lived integration branch.

There is **no dedicated release branch for the highest active major version**.
For example, when version 7.0 is the highest working version, there is **no
`release/7.0` branch**. Development for the highest version always happens
directly on `main`.

`main` therefore always represents:
- the latest in-development specification, and
- the next intended major or minor release.

**Clarification (to avoid confusion):**
`main` is **not** the latest stable release. It is the **integration branch for ongoing work**.
The latest stable release is defined by the **most recent Git tag** (for example
`v6.0.0` or `v6.1.0`), not by a branch.

This means it is expected that `main` is both:
- actively being worked on, and
- the place where the next release is assembled.

---

### Release branches for maintained versions only

Release branches are created **only** for versions that require maintenance after
a newer version has become active.

A release branch:
- is named `release/<major>.<minor>` (for example `release/6.0`);
- contains the specification source in a single, generic `/source/` directory;
- is used exclusively for bug fixes and clarifications within that version line.

Release branches are **not** used for feature development or breaking changes.

**Patch releases are the exception, not the rule:**
In principle, the specification does **not** publish patch releases (for example
`v6.0.1`). Patch releases are only created under **special circumstances**, such as:
- a serious error in a published tag that must be corrected,
- an urgent clarification needed to prevent incorrect implementations,
- a critical backwards-compatible fix required by the community.

In all normal cases, fixes and improvements are delivered through the next planned
minor or major release on `main`.

**Example scenario:**
If `main` is currently developing **6.1**, but an issue is found that must be fixed
in **6.0**, then under exceptional circumstances a patch release may be created:

- fix goes into `release/6.0`
- release via tag: `v6.0.1`
- then forward-merge the fix into:
  - `main` (and into any newer maintained release branches if applicable)

If there is **no maintained `release/6.0` branch**, then 6.0 is **not maintained**,
and fixes will only land in the active development line (for example 6.1 on `main`).

---

### Feature branches (where new 6.1 work is parked)

New features intended for the upcoming release line (for example **6.1**) are
developed in **short-lived feature branches** branched off from `main`, such as:

- `feature/add-result-type-x`
- `feature/extend-mode-of-study`
- `feature/adr-0012-...`

These feature branches are merged back into `main` via pull requests and removed
after merging.

---

### Tags as the authoritative version markers

Semantic versions are defined **exclusively by Git tags**, not by branches or
directory structures.

Examples:
- `v6.1.0`
- `v6.1.1`
- `v7.0.0`

A tag always points to an immutable commit and represents the authoritative state
of the specification for that version. Documentation and published artefacts are
always generated from tagged commits.

---

### Workflow overview

The general workflow is as follows:

1. **Active development**
   - Takes place on `main`.
   - Results in new major or minor versions.

2. **Creating a maintained version**
   - When a version requires long-term maintenance, a release branch
     (`release/x.y`) is created from the relevant release tag or commit.

3. **Bug fixes**
   - If the bug affects a maintained older version and exceptional circumstances
     justify a patch release:
     - start on the **lowest maintained release branch**
     - tag a patch release (e.g. `v6.0.1`)
     - forward-merge into newer maintained branches if applicable
     - finally forward-merge into `main`
   - Otherwise:
     - fix directly on `main` and include it in the next planned minor or major release

4. **Releases**
   - Are created by tagging the appropriate commit on `main` or on a
     `release/x.y` branch.
   - No release exists without a corresponding tag.

---

### Key principles

- `main` is the single source of truth for the highest working version **in development**.
- There is no “latest release” branch.
- Release branches exist only when maintenance is required.
- Release branches are for **patches only** (bug fixes / clarifications), not features.
- Patch releases are **not issued by default**, only in exceptional circumstances.
- Feature development happens in short-lived branches merged into `main`.
- Tags, not branches or folders, define versions.
- Published documentation is always traceable to an exact tagged commit.

This approach keeps the branching model minimal and ensures fully reproducible
and auditable releases.
