# Sprint 1 pivots from Zod to TanStack Query — mission broadened, not replaced

Session 3→4 (2026-07-18). The learner invoked `/teach TanStack Query Lesson 1`, moving from
the validation half of Sprint 1 to the data half. This is the *planned* progression the Zod
mission doc itself flagged ("TanStack Query / server-state caching — next step in Sprint 1"),
so the user's invocation IS the go-ahead; no separate confirmation needed.

**Mission handling:** `MISSION.md` was broadened, not overwritten, into one Sprint-1 mission
with **Part A (Zod, ✅ largely delivered)** and **Part B (TanStack Query, current focus)**.
Zod's accomplishments are preserved as a checklist; the open Zod items (cross-field refine
depth, `.extend()`/`.partial()` for the Application form, form wiring) are parked, not dropped
— they can interleave later, especially the form-library lesson that both halves feed into.

**The teaching problem this topic creates:** TanStack Query manages *server* state, but Applyo
has no backend yet (schema only, no API route, no DB — Phase 1 is manual-only). Resolved by
serving mock **Next.js Route Handlers** returning `Opportunity[]` typed from their real
`z.infer`. The queries are written exactly as they'll be against a real DB; only the handler
body changes at the Docker/DB sprint. Risk to watch: this must not become a detour into
building a fake backend — the handler is a fixture, the *query* is the lesson.

**Calibration:** self-rated "used it lightly." Per [[0002-recalibrate-upward-strong-zod-output]]
this learner underrates then overships, so "used it lightly" is treated as a floor. TQ Lesson 1
(file `0004`) already skips "what's a hook" and spends its budget on the two things "used it
lightly" people typically can't articulate: **server state ≠ client state** (TkDodo's
async-state-manager framing) and **`queryKey` = cache address**, plus the v5 `status` vs
`fetchStatus` split and the `fetch`-doesn't-throw gotcha.

**Implications for teaching:**
- Give infra boilerplate (the App Router `QueryClientProvider` singleton pattern) directly —
  it's stuck-rule territory (SSR client-per-request gotcha), not the skill being trained. Keep
  the *query + state rendering* as their own implementation.
- If they ship the full read path clean (provider + route + query + 3 states), recalibrate up
  again before Lesson 2, same as the Zod arc.
- Verify understanding by asking them to explain *why* `queryFn` must throw and what the
  `queryKey` shares — not just whether the list renders. The "used it lightly" trap is code
  that works by copy without the model underneath.
