# Sprint 1 — Validation & Data Resources

Sprint 1 has two halves: **Zod** (validation — mission largely delivered) and **TanStack Query**
(server-state/data — current focus). Resources for both live here.

---

# TanStack Query (server state) Resources

## Knowledge

- [TanStack Query docs — Overview](https://tanstack.com/query/latest/docs/framework/react/overview)
  The canonical *what*. Frames server state vs client state ("server state is totally
  different"), and the problems it solves that `useState`/`useEffect` don't (caching,
  dedup, background sync, GC). Use for: the pitch and the problem statement. This is **v5**.
- [TanStack Query docs — Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
  The exact v5 `useQuery({ queryKey, queryFn })` API and the `status` vs `fetchStatus`
  split (`pending`/`error`/`success` vs `fetching`/`paused`/`idle`). Use for: reading
  query results correctly; the `isPending` vs `isFetching` distinction.
- [TanStack Query docs — Query Keys](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys)
  Keys are arrays compared by value; put every `queryFn` dependency in the key. Use for:
  designing keys for Applyo's list / filtered-list / by-id endpoints.
- [TkDodo — "React Query as a State Manager"](https://tkdodo.eu/blog/react-query-as-a-state-manager)
  **Highest-trust *why*.** The maintainer's own framing: React Query is an *async state
  manager*, not a data-fetching library; `staleTime` is usually the only knob you need.
  Use for: the mental model, and Lesson 2 (`staleTime`). The whole "Practical React Query"
  series at [tkdodo.eu/blog](https://tkdodo.eu/blog) is the reference for this stack.

## Wisdom (Communities)

- [TanStack Discord / GitHub Discussions](https://github.com/TanStack/query/discussions)
  Maintainer-adjacent Q&A. Use for: "how do I model this query/mutation" once attempted.

## Gaps
- No single great resource yet on **TanStack Query + React 19 Server Components / Next.js 16
  App Router hydration** (streaming initial data from an RSC into the client cache). Fine to
  defer — Applyo can run client-fetch-only through Lesson 1–2; fill before the SSR/hydration
  lesson.

---

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
  the `error` parameter as string or function. Use for: writing the messages.
- [Zod official docs — Formatting errors](https://zod.dev/error-formatting)
  The v4 page for consuming a `ZodError` in the UI: `z.treeifyError` (nested),
  `z.flattenError` (flat forms), `z.prettifyError` (readable string); `formatError`
  is deprecated. Use for: turning a failed `safeParse` into per-field messages
  (Lesson 3). Verified against Zod 4.4.3 — flatten collapses nested/array paths.
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
