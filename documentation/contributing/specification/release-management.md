# GitHub versioning: how we work

This repository manages OEAPI API specifications using a simple branch and release model.

The model distinguishes between:

- active specification development on `main`
- maintenance of published releases on `release/x.y`
- formally published versions via tags
- automatic publication to the website

Publication works as follows:

- `main` is published to `specification/unreleased`
- release candidate tags (`vX.Y-rcZ`) and stable tags (`vX.Y`) are published to `specification/vX.Y`

This repository contains API specifications.

---

## Main branch

`main` represents active development.

This is where:

- new specification changes are introduced
- improvements and clarifications are made
- upcoming versions are prepared

`main` always contains the latest development state, even if that state is not yet released.

---

## Release branches

For each published minor version (or release candidate), a corresponding release branch exists.

Examples:

- `release/6.0`
- `release/6.1`

Release branches are used for:

- bug fixes
- clarifications
- documentation updates
- small corrections that apply to an already published version

They do not receive new features or structural changes.

When fixes are applied to a release branch, they are also merged back into `main`.

---

## Development branches

Individual changes are developed in short lived branches created from either `main` or a release branch.

Examples:

- `clarify-version-negotiation`
- `schema-correction`

These branches:

- focus on a specific change
- exist only for review and discussion
- are removed after merge

---

## Releases and tags

Published versions are represented by Git tags.

Examples:

- `v6.0-rc1`
- `v6.0`
- `v6.1-rc1`

A tag:

- marks the exact state of a published specification
- is created from `main` or from a release branch
- never changes after creation

Tags define the official version history.

A stable tag (`vX.Y`) is only created once development of the next minor or major version has started through a release candidate (for example `v6.1-rc1` causing `v6.0` to become stable).

---

## Typical workflow

1. A change is proposed.
2. A branch is created from `main` or `release/x.y`.
3. The change is made.
4. A pull request is opened.
5. After review, the change is merged.
6. Release candidate tags may be created for validation.
7. The stable tag is created once the next version line starts.

---

## Summary

- `main` is active development and publishes to `specification/unreleased`
- `release/x.y` may exist for published versions
- tags represent official releases and publish to `specification/vX.Y`
- release candidates use `vX.Y-rcZ`
- stable releases use `vX.Y`
- branches are temporary and used for review
