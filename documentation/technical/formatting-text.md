
### Formatting text

Most resources include attributes intended to convey longer texts, such as `description`.
These fields can be formatted to improve readability by using a subset of Markdown. OOAPI
supports the [GitHub Flavoured Markdown Specification](https://github.github.com/gfm/),
but only a restricted set of elements is permitted to ensure consistent rendering across
tools and documentation systems.

#### Supported Markdown elements

The following Markdown features are supported within OOAPI fields:

- Headings (levels 1–3)
- Paragraphs and line breaks
- Emphasis (bold `**text**` and italic `*text*`)
- Ordered and unordered lists
- Links and inline URLs
- Inline code and fenced code blocks
- Blockquotes
- Horizontal rules
- Tables (using standard GitHub Flavoured Markdown syntax)

#### Unsupported Markdown elements

To ensure optimal interoperability, Markdown-formatted text in OOAPI should not use:

- Task list items
- The image element (`![alt](url)`)
- Raw HTML
- Automatic HTML attributes (e.g. `<div>`, `<span>`)
- Embedded media or iframes

GitHub Flavoured Markdown was chosen because it offers a familiar and lightweight syntax
while providing additional formatting options compared with specifications such as
CommonMark Markdown. By limiting the supported subset, OOAPI ensures predictable rendering
in OpenAPI documentation tools and API client implementations.
