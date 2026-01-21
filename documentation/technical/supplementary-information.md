
# `supplementaryInformation` – Modelling Supplementary and Promotional Data

The `supplementaryInformation` structure provides a generic and extensible way to
include additional, promotional, contextual, or visually rich information within
OOAPI resources. This pattern separates the *technical media form* (`type`) from
the *semantic purpose* (`role`), resulting in a clean and implementation-friendly
method to enrich educational offerings without modifying the core schema.

This enables platforms such as **EduXchange** to present offerings in a more
inspirational and student-centred manner, while ensuring the data model remains
predictable and interoperable across institutions.

## 1. Overview

`supplementaryInformation` is an array of structured entries.
Each entry consists of three components:

| Field  | Purpose                                                     |
|--------|-------------------------------------------------------------|
| `type` | Defines the *media form* (text, image, video, http)         |
| `role` | Defines the *semantic intent* (marketing, badge, announcement, promo) |
| `value`| One or more `LanguageTypedString` objects containing the content |

This model is **extensible**: institutions may add additional entries using
`x-` prefixed custom values for both `type` and `role`.

## 2. When to use supplementaryInformation

Use `supplementaryInformation` when including:

- promotional or inspirational text
- badges and visual markers
- images for student-facing platforms
- promotional or informative videos
- announcements or highlight blocks
- institution-specific content via custom (`x-*`) roles or types

Do **not** use this field for core academic information, such as formal
descriptions, learning outcomes, credits, or admission requirements.

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

| Code    | Description                               |
|---------|-------------------------------------------|
| `image` | Visual media referenced via a URI         |
| `text`  | Free-form or Markdown-based text          |
| `video` | Video media referenced via a URI          |
| `http`  | HTTP-encoded textual content              |

### 3.3 Roles

| Code           | Description                                         |
|----------------|-----------------------------------------------------|
| `announcement` | General-purpose announcement or notice              |
| `badge`        | Visual label or achievement marker                  |
| `marketing`    | Promotional or marketing-related content            |
| `promo`        | Short promotional highlight or teaser               |

Both enumerations are *extensible* with `x-*` prefixed values.

## 4. Examples

### 4.1 Marketing text

```yaml
supplementaryInformation:
  - type: text
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
  - type: image
    role: promo
    value:
      - language: und
        text: "https://example.edu/media/programme-banner.jpg"
```

### 4.3 Badge (achievement label)

```yaml
supplementaryInformation:
  - type: image
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
  - type: text
    role: announcement
    value:
      - language: en
        text: |
          Enrolment for the 2025 cohort opens in January.
```

### 4.6 Custom semantic role

```yaml
supplementaryInformation:
  - type: text
    role: x-alumniQuote
    value:
      - language: en
        text: |
          "This course completely changed the way I think about technology."
```

## 5. Validation considerations

- `type` MUST be consistent with the content held in each `value` entry
  (e.g. `image` and `video` MUST contain valid URIs).
- `role` MUST NOT duplicate or encode the technical form defined by `type`.
- Consumers SHOULD gracefully handle unknown `x-*` roles and types.
- Institutions SHOULD document any custom (`x-*`) roles they publish.

## 6. Benefits

- Enables richer and more inspiring presentation layers.
- Keeps the core schema stable and clean.
- Prevents schema proliferation for promotional use cases.
- Provides a future-proof, generic extension mechanism.

## 7. Summary

`supplementaryInformation` provides a robust, extensible and technically clean
way to attach promotional, contextual, or visually enriched material to OOAPI
resources. By decoupling **media form** (`type`) and **semantic purpose** (`role`),
the model remains clear, predictable and interoperable across institutions.
