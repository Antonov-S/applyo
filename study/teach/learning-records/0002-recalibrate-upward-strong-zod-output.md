# Recalibrate upward: learner works well ahead of stated level

Session 1 (2026-07-13). Aimed at Lesson 1 (three fields + `safeParse` + `z.infer`);
the learner instead shipped a **complete Opportunity schema** — `z.preprocess`,
`.pipe(z.iso.date())`, a nested `SalaryRangeSchema` sub-schema, and two cross-field
`.refine`s — that typechecks clean on Zod 4.4.3.

Supersedes the depth assumption in [[0001-prior-knowledge-baseline]] (the TS-shaky /
Zod-light framing was an undersell). Keep 0001's *emotional* hook (Zod reduces type
burden) but raise the difficulty ceiling.

**Evidence of genuine understanding, not just output:** their DoD note correctly
stated the Lesson 1 idea (runtime validation + `z.infer` type from one schema), and
they self-identified a precise gap — *when to use `z.preprocess` vs `z.coerce` vs
`.transform()`*. That is exactly the right seam and shows they know what they don't
know.

**Implications:**
- Pitch lessons harder; skip basic field-type tours.
- Lesson 2 is now driven by their own question (coerce/preprocess/transform), not a
  generic field walkthrough. Also fold in the real bug found in review:
  `preferredTechnologies: z.array(z.string().trim().optional()).optional()` accepts
  `[undefined]` — the inner `.optional()` is wrong.
- Watch for over-scoping: shipping four lessons deep in one sitting risks the
  "did the learning actually happen" trap. Keep verifying understanding by asking
  them to explain their own lines, not just by whether code compiles.
