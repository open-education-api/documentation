# `supplementaryInformation` – Modelling Supplementary and Promotional Data

The `supplementaryInformation` structure provides a generic and extensible way
to include additional, promotional, contextual, or visually rich information
within OEAPI resources. This pattern separates the **technical media form**
(`type`) from the **semantic purpose** (`role`), resulting in a clean and
implementation-friendly method to enrich educational offerings without requiring
resource-specific schema extensions.

This enables platforms such as **EduXchange** to present offerings in a more
inspirational and student-centred manner, while ensuring the data model remains
predictable and interoperable across institutions.

## 1. Overview

`supplementaryInformation` is an array of structured entries.

Each entry consists of three components:

| Field   | Purpose                                                     |
|---------|------------------------------------------------------------------|
| `type`  | Defines the **media form** of the content                        |
| `role`  | Defines the **semantic intent** of the content                   |
| `value` | One or more `LanguageTypedString` objects containing the content |

This model is **extensible**. Institutions may introduce additional values
using `x-` prefixed custom values for both `type` and `role`.

## 2. When to use supplementaryInformation

Use `supplementaryInformation` when including:

- Promotional or inspirational text
- Badges and visual markers
- Images for student-facing platforms
- Promotional or informative videos
- Announcements or highlight blocks
- Institution-specific content using custom (`x-*`) roles or types

Do **not** use this field for core academic or administrative information
already modelled elsewhere in OEAPI, such as:

- Formal descriptions
- Learning outcomes
- Credits
- Admission requirements

## 3. Structure

### 3.1 Schema

```yaml
supplementaryInformation:
  type: array
  items:
    type: object
    properties:
      role:
        $ref: '../enumerations/supplementaryRole.yaml'
      type:
        $ref: '../enumerations/supplementaryType.yaml'
      value:
        type: array
        minItems: 1
        items:
          $ref: './LanguageTypedString.yaml'
    required:
      - role
      - type
      - value
```

### 3.2 Types

The following predefined `type` values are available:

| Code         | Description                                 |
|--------------|---------------------------------------------|
| `image`      | Visual media referenced via a URI           |
| `text_http`  | HTML-encoded textual content                |
| `text_md`    | Markdown-encoded textual content            |
| `text_plain` | Plain textual content                       |
| `uri`        | URI-based content                           |
| `video`      | Video media referenced via a URI            |

This enumeration is **extensible** using `x-*` prefixed values.

### 3.3 Roles

The following predefined `role` values are available:

| Code           | Description                                         |
|----------------|-----------------------------------------------------|
| `announcement` | General-purpose announcement or notice              |
| `badge`        | Visual label or achievement marker                  |
| `marketing`    | Promotional or marketing-related content            |
| `promo`        | Short promotional highlight or teaser               |

This enumeration is **extensible** using `x-*` prefixed values.

## 4. Examples

### 4.1 Marketing text

```yaml
supplementaryInformation:
  - type: text_md
    role: marketing
    value:
      - language: en
        text: |
          Discover how this programme helps you build real-world skills through
          engaging, hands-on learning.
```

### 4.2 Promotional image

```yaml
supplementaryInformation:
  - type: uri
    role: promo
    value:
      - language: und
        text: "https://example.edu/media/programme-banner.jpg"
```

### 4.3 Badge (achievement label)

```yaml
supplementaryInformation:
  - type: uri
    role: badge
    value:
      - language: und
        text: "https://example.edu/badges/excellence.png"
```

### 4.4 Promotional video

```yaml
supplementaryInformation:
  - type: video
    role: marketing
    value:
      - language: und
        text: "https://youtu.be/abcd1234"
```

### 4.5 Announcement block

```yaml
supplementaryInformation:
  - type: text_plain
    role: announcement
    value:
      - language: en
        text: |
          Enrolment for the 2025 cohort opens in January.
```

### 4.6 Custom semantic role

```yaml
supplementaryInformation:
  - type: text_md
    role: x-alumniQuote
    value:
      - language: en
        text: |
          "This course completely changed the way I think about technology."
```

## 5. Validation considerations

- `type` should be consistent with the content held in each `value` entry.
- `role` should not duplicate or encode the technical form defined by `type`.
- Consumers should gracefully handle unknown `x-*` roles and types.
- Institutions should document any custom (`x-*`) roles they publish.
- URI-oriented content are expected to contain valid URI.

## 6. Benefits

- Enables richer and more inspiring presentation layers.
- Keeps the core schema stable and clean.
- Prevents schema proliferation for presentation-oriented use cases.
- Provides a future-proof and generic extension mechanism.

## 7. Summary

`supplementaryInformation` provides a robust, extensible and technically clean
way to attach promotional, contextual, or visually enriched material to OEAPI
resources.

By decoupling **media form** (`type`) and **semantic purpose** (`role`), the
model remains clear, predictable and interoperable across institutions.
