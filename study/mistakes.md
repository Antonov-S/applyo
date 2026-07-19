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
