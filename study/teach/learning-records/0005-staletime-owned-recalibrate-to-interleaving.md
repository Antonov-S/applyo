# staleTime is owned — teaching shifts from exposition to deliberate-break interleaving

Session 5→6 (2026-07-19 → 2026-07-22). Evidence from the learner's own logs after TQ Lesson 2:

- `journal.md` 2026-07-19 states the fresh/stale model, the three refetch triggers, and the
  `gcTime` retention split **correctly and unprompted**.
- `mistakes.md` 2026-07-19 logs exactly one error — expecting a background refetch for a *fresh*
  query on a second mount — and the correction is stated in the right terms (a trigger only
  fetches if the data is *already* stale). One clean, well-diagnosed error is a mastery signal,
  not a gap.
- `mistakes.md` 2026-07-21 (RSC boundary warm-up) shows self-correction of an *over-absolute*
  claim ("React uses the import tree, not the render tree") into the accurate module-graph +
  RSC-payload-reference model. They now catch their own imprecision, not just their errors.

Third consecutive confirmation of [[0002-recalibrate-upward-strong-zod-output]]: this learner
underrates and overships. **Stop budgeting lesson space for "does the concept land".** It lands.

**Consequence for lesson design, starting with Lesson 3 (file `0006`):** the scarce resource is
no longer explanation, it's *durability under interference*. So the format shifts:

- **Interleave the previous lesson into the new one's failure mode.** L3's central bug — a filter
  missing from the `queryKey` — is only *fully* visible because of L2's `staleTime: 20_000`
  (same address + still fresh = served from cache, zero requests, UI looks dead). One exercise
  now tests both lessons, and shows the two settings are one system.
- **"Break it on purpose" as a required step, with a written prediction before the click.**
  Predict → observe → restore. This is retrieval practice under a real feedback loop, and it
  costs 30 seconds. Reserve it for bugs they will genuinely meet in the wild.
- **Ship structure before the feature that needs it.** L3 builds the key *hierarchy* and factory
  a lesson ahead of `invalidateQueries` needing it, so L4's payoff is felt rather than described.

**Watch for:** the failure mode of a confident learner is skipping the boring refactor (step 5,
the key factory) because "it changes nothing at runtime". That step is the one that pays off in
L4. If they skip it, don't re-teach — ask them to invalidate all lists but no detail views and
let the missing structure bite.

**Open thread to harvest later:** the "unclear" note in their 2026-07-21 journal entry is about
RSC payload → hydration. That is the same gap `RESOURCES.md` flags (no good TQ + RSC hydration
resource). Two independent signals now point at that lesson — fill the resource gap before the
arc reaches it.
