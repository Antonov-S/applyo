# `.refine()` breaks the coerce/preprocess/transform/pipe taxonomy — it's a validator

Session 2 (2026-07-15). The learner did Lesson 2's audit task — labelling every
data-massaging step in `opportunity.ts` as coerce / preprocess / transform / pipe —
and got stuck on the four `.refine()` calls, labelling two of them "preprocess" and
leaving two blank.

**This is a gap in the Lesson 2 framework, not a learner error.** The four labels
are all *data-massaging* tools (they change the value). `.refine()` is a different
category: a **validation check** that runs a predicate on the already-parsed value
and either passes it through *unchanged* or adds an issue. It belongs to the gate,
not to the before/after-the-gate axis. The learner correctly *sensed* it didn't fit
("difficulty choosing a label") — good metacognition, same pattern as the
coerce/preprocess gap they self-identified in [[0002-recalibrate-upward-strong-zod-output]].

**The clarifying contrast that landed it:** transform and refine are mirror images —
both run after the base gate; transform reshapes the value but can't reject (changes
`z.infer`), refine can reject but returns the value untouched (`z.infer` unchanged).

**Implications for teaching:**
- Lesson 2's "Massaging input" taxonomy is about *transformation* tools only. Whenever
  it's presented as a way to classify *all* schema methods, explicitly carve out
  `.refine()`/`.check()` as validation, not massaging. Cheatsheet got a one-line note.
- Lesson 4 (cross-field `.refine()`) should open from *this* moment — they already
  wrote four working refines; the lesson deepens (refine vs superRefine, `path`,
  when a refine should instead be a `.pipe()` into a stricter schema) rather than
  introduces. Anchor it in their salary + date refines.
- Keep watching for the healthy signal: they get stuck at exactly the right seams and
  can articulate *why* something feels off. Reward that, don't smooth it over.
