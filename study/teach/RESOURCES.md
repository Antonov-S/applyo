# Zod (form validation) Resources

## Knowledge

- [Zod official docs — Basics](https://zod.dev/basics)
  The canonical primary source. Covers `z.object`, `parse` vs `safeParse`, the
  error/result shape, and `z.infer`. Use for: anything about defining schemas and
  parsing. This is Zod **v4** — top-level format validators (`z.email()`, `z.url()`)
  and the `error` parameter replace v3's `z.string().email()` / `message` /
  `required_error`.
- [Zod official docs — Defining schemas / API](https://zod.dev/api)
  The full validator catalogue: string min/max, numbers, `z.enum`, `z.coerce.*`,
  `optional`/`nullable`/`default`, `z.url()`, `.refine()`. Use for: looking up the
  exact validator for a field.
- [Zod official docs — Error customization](https://zod.dev/error-customization)
  How to attach human-readable messages: `z.string("...")`, `.min(5, "Too short")`,
  the `error` parameter as string or function. Use for: turning `ZodError.issues`
  into per-field form messages.
- [Total TypeScript — Matt Pocock (Zod tutorials & articles)](https://www.totaltypescript.com/tutorials)
  High-trust TS educator; strong on *why* schema-first inference beats hand-written
  types. Use for: deepening the TypeScript intuition that still feels fuzzy.

## Wisdom (Communities)

- [Zod GitHub Discussions](https://github.com/colinhacks/zod/discussions)
  Maintainer-moderated Q&A. Use for: "how do I model X" questions and v3→v4
  migration gotchas, once you've attempted it yourself.
- [r/typescript](https://reddit.com/r/typescript)
  General TS community, decent signal. Use for: schema/type-inference design
  critique when a Zod-specific answer isn't enough.

## Gaps
- No single great resource yet on **Zod + React 19 forms without a form library**
  (plain `<form>` + Server Action / `useActionState`). Fill this before Sprint 1's
  form-wiring lesson.
