# Baseline: light Zod, shaky TypeScript types

Established at the start of the teaching relationship (2026-07-12), before any lesson.

The learner has **used Zod lightly** — written at least one basic schema before — so
`z.object` / `z.string()` are familiar and don't need slow re-teaching. They rate
their **TypeScript types as still shaky**: interfaces, generics, and especially
*inferred* types feel fuzzy.

**Implications for teaching:**
- Frame Zod as *reducing* the TypeScript burden, not adding to it — `z.infer` lets
  them stop hand-writing types. This is the emotional hook for the whole mission.
- Spend lesson depth on the higher-value, less-familiar mechanics (inference,
  `safeParse` result narrowing, coercion, `.refine`), not on basic field types.
- Treat any generic syntax (`z.infer<typeof Schema>`) as a place to slow down and
  reassure, since generics are a known fuzzy spot.
