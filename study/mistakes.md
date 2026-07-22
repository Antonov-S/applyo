## 2026-07-13 — Zod: Opportunity schema (spike)

- **Zod `refine`:** A condition such as `min === undefined || max === undefined || min <= max` accepts the object when at least one value is missing. It does not require both values to be present.
- **Optional nested object:** `salaryRange: Schema.optional()` allows the entire object to be omitted, but it does not prevent `salaryRange: {}`. A separate validation rule is required to ensure that at least `min` or `max` is provided.
- **Salary range validation:** Two separate rules are required: at least one value must be present, and when both values are present, `min <= max`.

## 2026-07-14 — Zod: Lesson 2 warm up

- **`any` vs `unknown`:** Both types can hold any value, but `any` disables type checking. An `unknown` value must be narrowed or validated before it can be used safely.
- **Type assertion:** `as SomeType` does not validate or convert runtime data. It only tells TypeScript to treat the value as that type, so invalid external data may cause errors later when used.
- **`parse()` vs `safeParse()`:** `parse()` returns validated data or throws a `ZodError`. `safeParse()` returns a discriminated union: `{ success: true, data }` or `{ success: false, error }`.
- **Runtime validation terminology:** Zod validates an actual runtime value against a schema; it does not validate a TypeScript type. TypeScript types are erased during transpilation.

## 2026-07-14 — Zod: labeling refine

- **`refine` is not a massaging tool:** I labeled `.refine()` as `preprocess`. Wrong
  category — `coerce`/`preprocess`/`transform`/`pipe` _change_ the value; `.refine()`
  only _checks_ it (passes it through unchanged, or raises an issue). Fix: ask "does
  this change the value or just check it?" before reaching for a label.
- **transform vs refine (mirror):** `.transform()` reshapes but can't reject;
  `.refine()` can reject but doesn't reshape. Both run after the base gate.

## 2026-07-15 — Zod: Lesson 3 warm up

- **Discriminated union terminology:** A discriminated union is not a function. It is a union of object types that share a common property with different literal values, allowing TypeScript to narrow to the correct variant.
- **Type narrowing vs assertion:** Narrowing checks the value at runtime, while `as` only changes how TypeScript sees it and may hide invalid assumptions.
- **`||` vs `??`:** An empty string is falsy, so `"" || "default"` returns `"default"`. The `??` operator replaces only `null` and `undefined`.

## 2026-07-16 – 2026-07-17 — no session (skipped)

## 2026-07-18 — TanStack Query: Lesson 1 warm up

- Closure explanation: Include both the definition and the concrete output. The counter prints 1, 2, and 3 because each call uses the same preserved count variable.
- Closure state: const counter = createCounter() creates one preserved count, so repeated calls return 1, 2, and 3. Results of 1, 1, and 1 require creating a new counter each time.

## 2026-07-18 — TanStack Query: Lesson 1

- none

## 2026-07-18 — TanStack Query: Lesson 2 warm up

### TypeScript: `interface` vs `type` — intersection and union

**Mistake:**
I said that a `type` cannot be extended and that types can be combined using a union (`|`).

**Correction:**
A type alias can compose or extend an object shape using an intersection (`&`):

```ts
type A = { id: number };
type B = A & { name: string };
```

`B` must contain both `id` and `name`.

A union (`|`) does not extend or merge object shapes. It represents alternatives — `A` or `B`:

```ts
type Result = { data: string } | { error: string };
```

**Rule to remember:**

```ts
A & B; // A and B
A | B; // A or B
```

Interfaces compose through `extends`, while type aliases usually compose object shapes through intersections using `&`.

Interfaces and types can also interoperate:

```ts
type HasId = { id: number };

interface User extends HasId {
  name: string;
}
```

```ts
interface HasId {
  id: number;
}

type User = HasId & {
  name: string;
};
```

## 2026-07-19 — TanStack Query: Lesson 2

**Mistake:** Data is still fresh. A second component mounts with the same key. What happens? — I answered "a single background refetch is fired".

**Correction:** Not while it's fresh. A refetch trigger (mount/focus/reconnect) only actually fetches if the data is already stale. Fresh data is served straight from cache with zero requests — that's the whole point of staleTime.

## 2026-07-20 — no session (missed)

## 2026-07-21 — TanStack Query: Lesson 3 warm up

**Mistake:** I said the boundary is drawn simply at the file level and that React uses the import tree rather than the render tree. This was too absolute and did not clearly explain what happens during rendering.

**Correction:** "use client" creates a client entry point in the module dependency graph. That file and the modules it imports become part of the client bundle, but this does not propagate upward to the Server Component that imports it. The parent still renders on the server, while the RSC payload contains a reference to the Client Component, which is then hydrated in the browser.

## 2026-07-21 — TanStack Query: Lesson 3

**Mistake:** -

**Correction:** -
