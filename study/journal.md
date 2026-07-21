# Learning Journal — Applyo

## 2026-07-13 — Zod: Opportunity schema (spike)

**Learned:** Zod can preprocess and validate form data at runtime, while `z.infer`
creates the matching TypeScript type from the same schema.

**Still unclear:** I am not fully confident when to use `z.preprocess`, `z.coerce`,
or `.transform()`.

## 2026-07-14 — Zod: Lesson 2 warm up

**Learned:** TypeScript provides static type checking before the program runs. Its types are erased when the code is transpiled to JavaScript, so a type such as JobFormData does not exist at runtime. Data from a form or an API is external input and may not match the declared type. That is why we need runtime validation, for example with Zod, to check the actual value before treating it as valid JobFormData.

**Still unclear:** Discriminated unions, narrowing through result.success, and exact Zod result structures.

## 2026-07-14 — Zod: the massage/check split

**Learned:** The coerce/preprocess/transform/pipe question is only about tools that
_change_ a value, decided by where they run (before vs after the validation gate).
`.refine()` sits outside that family — it's validation, not massaging. Resolves my
2026-07-13 "when to use preprocess vs coerce vs transform" uncertainty.

**Still unclear:** superRefine, and when a cross-field refine should instead be a
.pipe() into a stricter schema. (→ Lesson 4.)

## 2026-07-14 — Zod: Lesson 3 warm up

**Learned:** Discriminated union is a union of object types that share a common property with different literal values. Here, success is the discriminant. When we check whether it is true or false, TypeScript narrows result to the matching object type. Therefore, data exists only in the success branch, while error exists only in the failure branch.

External data should be treated as unknown and narrowed through runtime checks. Type assertions do not validate data; they only tell TypeScript to trust the declared type.

Use `??` for defaults when `0`, `false`, or `""` are valid values. Unlike `||`, it replaces only `null` and `undefined`.

**Still unclear:** Some falsy values as ""

## 2026-07-14 — Zod: Lesson 3

**Learned:** On a failed safeParse I read error.issues — each has a path addressing the field and a message. For a flat form z.flattenError gives me fieldErrors directly; for nested objects or arrays I use z.treeifyError or map the issues myself by path.join('.'), because flatten collapses nested paths onto the top-level key.

**Still unclear:** Index and path in deeper nested error objects.

## 2026-07-16 – 2026-07-17 — no session (skipped)

## 2026-07-18 — TanStack Query: Lesson 1 warm up

**Learned:** A closure is a function together with its lexical environment. It can retain access to outer variables even after the outer function has finished.

Calling the outer function once creates one closure with persistent state.

**Still unclear:** Calling the outer function repeatedly creates separate closures with independent state.

## 2026-07-18 — TanStack Query: Lesson 1

**Learned:** TanStack Query is an async server-state manager, not a fetch wrapper. Each query has a queryKey that addresses its data in a shared cache — so identical keys dedupe and share one request — and a queryFn that returns a Promise and throws on failure. I read status (pending/error/success) for whether I have data, and fetchStatus separately for whether it's currently fetching, which is how background refetches keep stale data on screen.

**Still unclear:** Why doesn't importing a Client Component into a Server Component turn the parent into a
▎ Client Component? Where exactly does the server/client boundary get drawn — at the import, or at the
▎ "use client" file?

## 2026-07-19 — TanStack Query: Lesson 2 warm up (bonus weekend lesson)

**Learned:** Both interface and type can describe object shapes. Interfaces compose through extends, while type aliases usually compose object shapes through intersections using &. A union with | is different: it represents alternatives — A or B — rather than an extended shape containing both.

Type aliases can also represent primitives, unions, tuples, mapped types, and conditional types. Interfaces are mainly for object shapes, but unlike type aliases, they support declaration merging.

Declaration merging means multiple interface declarations with the same name in the same applicable scope are combined. This is useful for library augmentation, but it can be a footgun when the merging happens unintentionally and silently changes the required shape.

In practice, I use interface for straightforward public object contracts and type when I need unions, tuples, intersections, or computed types.

**Still unclear:** The idea that `z.infer<typeof schema>` produces a type expression, which we then normally assign to a type alias, is still a little fuzzy for me.

## 2026-07-19 — TanStack Query: Lesson 2 (bonus weekend lesson)

**Learned:** TanStack Query keeps each cached query as fresh or stale, and staleTime is the age at which fresh becomes stale. Fresh data is served from cache with no request; stale data is still shown but refetches in the background.

Actions that may cause refetching:

- mount (component)
- window refocus
- reconnect

gcTime (default 5 min) is a separate clock, about retention: how long unused data survives in the cache before garbage collection.

**Still unclear:** The sequence of some events:
the last component stops using the query -> the query becomes inactive -> gcTime starts -> the query is deleted from the cache.

## 2026-07-20 — no session (missed)

## 2026-07-21 — TanStack Query: Lesson 3 warm up

**Learned:** Importing a Client Component does not turn its Server Component parent into client code because the boundary follows the module dependency graph. `"use client"` marks a client entry point and its imports as part of the client bundle, but it does not propagate upward.

**Still unclear:** This part is little fuzzy: The parent renders on the server, while the RSC payload contains a reference to the Client Component, which is then hydrated in the browser.
