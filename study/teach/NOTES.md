# Teaching Notes — working scratchpad

## Learner preferences
- Implements first, then wants review/hints — do NOT write whole features unprompted
  (this is a hard rule from the study routine, not just a preference).
- Learns visually and by doing; short, finishable lessons (~50 min main block).
- Wants lessons grounded in the *real* Applyo forms, not toy examples.

## Calibration (session 1, 2026-07-12)
- Zod: "used it lightly" — has written a basic schema before. Don't over-explain
  `z.object` / `z.string`. Anchor depth on the higher-value stuff (inference,
  safeParse narrowing, coercion, refine).
- TypeScript: "still shaky" — interfaces, generics, inferred types feel fuzzy.
  Implication: sell Zod as the thing that *removes* type burden (schema → type via
  `z.infer`), and go gently whenever a `z.infer<typeof X>` / generic appears.

## Teaching arc (planned, adjust as we go)
1. One schema, two payoffs — schema as single source of truth (`z.infer` + safeParse). ← Lesson 1
2. Field-by-field: modelling the whole Opportunity form (coerce, enum, optional, url).
3. Turning `ZodError.issues` into per-field messages in the UI.
4. Cross-field rules with `.refine()` (salary min ≤ max, closing date after publish).
5. Reusing/extending schemas: Application form; `.partial()` for edit vs create.
(6+. Wiring into a React 19 form / Server Action — after the form-library gap is filled.)

## Glossary candidates (promote to a GLOSSARY if it grows)
- schema, parse/safeParse, issue, `z.infer`, coercion, refinement.
