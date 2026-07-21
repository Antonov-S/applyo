# Teaching Notes — working scratchpad

## Learner preferences
- Implements first, then wants review/hints — do NOT write whole features unprompted
  (this is a hard rule from the study routine, not just a preference).
- Learns visually and by doing; short, finishable lessons (~50 min main block).
- Wants lessons grounded in the *real* Applyo forms, not toy examples.

## Calibration (TanStack Query, session 3→4, 2026-07-18)
- Self-rated **"used it lightly"** on TanStack Query + chose the mock Route Handler practice
  path. Given the Zod precedent (underrates then overships, see [[0002-recalibrate-upward-strong-zod-output]]),
  treat "used it lightly" as a floor, not a ceiling — Lesson 1 already skips "what's a hook"
  and pitches the mental model + `status`/`fetchStatus` nuance. If they ship the whole read
  path (provider + route + query + states) clean, recalibrate up again for Lesson 2.
- **Signal (2026-07-18, mid-lesson): caught a factual error in L1.** The original "prove the
  cache: open two tabs" task was wrong — they reasoned that each tab gets its own
  `new QueryClient()` → own in-memory cache → nothing shared across tabs, *before* wiring it up.
  Correct model of QueryClient instance scope. Same underrate-then-overship pattern as Zod
  ([[0002-recalibrate-upward-strong-zod-output]]). Lesson fixed (in-tab: two components, same
  key → one request). Pitch L2 harder — cache-instance / staleTime internals, no hand-holding.
- **No DB yet** → server state is faked via mock Next.js Route Handlers returning `Opportunity[]`,
  typed from their real `z.infer` `Opportunity`. Queries are written the same as they'll be
  against a real DB; only the handler body changes at the DB sprint. Don't let this become a
  detour into building a fake backend — the handler is a fixture, the *query* is the lesson.

## Calibration (Zod, session 1, 2026-07-12)
- Zod: "used it lightly" — has written a basic schema before. Don't over-explain
  `z.object` / `z.string`. Anchor depth on the higher-value stuff (inference,
  safeParse narrowing, coercion, refine).
- TypeScript: "still shaky" — interfaces, generics, inferred types feel fuzzy.
  Implication: sell Zod as the thing that *removes* type burden (schema → type via
  `z.infer`), and go gently whenever a `z.infer<typeof X>` / generic appears.

## Teaching arc — Part B: TanStack Query (server-state / data half of Sprint 1)
1. **Server state & your first query** — server vs client state, `queryKey` as cache address,
   `queryFn` throw rule, `status` vs `fetchStatus`; App Router provider given, they build the
   route + query + 3 states. ← TQ Lesson 1 (file 0004) ✅ delivered.
2. **`staleTime` & the fresh→stale→refetch model** — the one knob; stop fighting defaults.
   Anchored in L1's "navigate away & back, no refetch within stale window" cliffhanger.
   ← TQ Lesson 2 (file `0005`) ✅ delivered (2026-07-19, bonus weekend session). Recalibrated
   UP: L1 shipped clean (no mistakes logged, strong journal note on status/fetchStatus) so L2
   pitches cache internals harder — fresh/stale as *trust*, the `staleTime` vs `gcTime` two-clocks
   split, and *why* the default 0 refetches so eagerly. Harvested both planted seeds:
   `isPending`/`isFetching` reused as the "background refetch doesn't blank the list" payoff, and
   Devtools used as the live fresh/stale instrument. Verify signal: their answer to "refocus at
   t=10s vs t=30s with staleTime:20_000, and why" — that's the own-the-model check, not "it runs".
3. **Query keys as structure** — array keys, keys-as-dependencies, filtered/by-id lists;
   sets up cache invalidation. Ground in Applyo's status filter.
4. **Mutations & invalidation** — `useMutation` for create + the opportunity→application
   convert (the marquee domain action); `invalidateQueries` so the list reflects the change.
5. (Later) RSC → client hydration / streaming initial data — needs the RESOURCES gap filled.

### Planted seeds to harvest later (Part B)
- `isLoading` = `isPending && isFetching` (first load only) — mentioned in L1's v5-naming note;
  reinforce when background refetch/`isFetching` becomes visible (L2).
- Devtools recommended in L1's task — if they installed it, use the live cache panel to *show*
  stale→refetch in L2 instead of describing it.

## Teaching arc — Part A: Zod (planned, delivered)
1. One schema, two payoffs — schema as single source of truth (`z.infer` + safeParse). ← Lesson 1 ✅ delivered
2. ~~Field-by-field~~ **Coerce vs preprocess vs transform** — the "where in the pipeline" model,
   grounded in their salary preprocess. ← Lesson 2 ✅ delivered. (Field walkthrough dropped:
   they already shipped the whole Opportunity schema, so this is their self-identified gap instead.)
3. **Per-field errors** — `error.issues` + `path`, `flattenError` vs `treeifyError`, and a
   hand-rolled `toFieldErrors` map. ← Lesson 3 ✅ delivered. Closed the loop: the `path: ["max"]`
   they wrote in their salary refine (L2) is what routes the message here. Grounded in the real
   nested/array shape of their form (verified flatten collapses `salaryRange.max` + `tech[1]`).
4. Cross-field rules with `.refine()` (salary min ≤ max, date not in future) — they've already
   written two refines; deepen rather than introduce. Consider merging/interleaving with 5.
5. Reusing/extending schemas: Application form; `.partial()`/`.extend()` for edit vs create.
(6+. Wiring into a React 19 form / Server Action — after the form-library gap is filled.)

### Planted seeds to harvest later
- `z.input` vs `z.infer` (output) — introduced lightly in Lesson 2's type-nuance note. Reinforce
  when it next matters (edit forms / server boundary).
- `preferredTechnologies` `[undefined]` bug from LR0002 is **already fixed** in their file
  (inner `.optional()` removed) — do NOT re-teach as live; can use as a retrieval callback only.

## Glossary candidates (promote to a GLOSSARY if it grows)
- schema, parse/safeParse, issue, `z.infer`, coercion, refinement.
