# Sorting and language selection

In OEAPI, certain fields such as `name` are defined as languageTypedString,
meaning they may contain multiple values in different languages.

When sorting is applied to such fields, the API must first resolve which
language value is used for comparison. Sorting is always performed on a
single resolved language value per record and never across multiple
languages.

The proposed behaviour is as follows.

1. Primary  
The provider uses the institution’s default language configuration. This is
the baseline and ensures predictable behaviour when no consumer preference is
supplied.

2. Secondary (optional)  
If the consuming system explicitly provides a preferred language, and that
language exists for the given field in the source system, that value may be
used instead.

3. Fallback  
If neither the institution default nor the consumer-requested language is
available, the provider may fall back to any available language value. This
fallback must be applied consistently across all records within the same
response.

## Key principles

- Sorting is deterministic within a response.
- Only one language is used for sorting per request.
- Providers retain flexibility in implementation, but must document their
  behaviour.
- Consumers should not assume a specific language unless they explicitly
  request one.

This approach balances predictability for consumers with practical
flexibility for providers, while avoiding implicit or mixed-language sorting.
