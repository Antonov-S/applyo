# Mock Interview Practice — AI Interviewer Plan

Companion to `study-routine.md`. This document defines how the AI chatbot is used as a technical-interview practice partner for Junior Web Developer / Junior Full-stack roles. It fills the routine's existing slots — it does not add new ones.

Same freeze rule as the routine: **one pass, then frozen.** The Saturday retrospective is the only mechanism that changes it.

---

## 1. Two modes, mapped to the existing routine

### DAILY (the warm-up slot, Mon–Fri, ~20 min)

This **is** the routine's warm-up slot, not an addition to it. It runs before the main block.

- **2–3 questions, not 3–5.** A written answer in Bulgarian plus structured feedback realistically takes 6–8 minutes per question. Five questions in 20 minutes forces shallow answers and shallow feedback — the opposite of the slot's purpose. Default shape: **1 sprint question (with at most one follow-up) + 1 cumulative-review question**, and a 3rd only if time remains.
- On a minimum-viable-routine day (30 min total), the warm-up is **1 question**, per the routine.

### FULL MOCK (Saturday, 45–60 min, alternating with real mocks)

The routine already schedules **real** mock interviews every 1–2 weeks (weeks 2, 4, 6, 8 in the example table). Don't stack an AI full mock on top of those weeks — alternate instead:

- **Odd weeks (1, 3, 5, 7): AI FULL MOCK** in the Saturday consolidation slot.
- **Even weeks (2, 4, 6, 8): real mock** (Pramp, interviewing.io, or an experienced colleague), as the routine already says.

Result: some form of interview pressure most Saturdays, with the AI mock functioning as a rehearsal for the real one that follows. This is the **preferred schedule, not an obligation** — the routine marks Saturday as optional, and that stands. A skipped Saturday shifts the mock to the next available Saturday (or drops it for that cycle); it doesn't get squeezed into a weekday slot.

Structure of a FULL MOCK (written) — **7–9 main questions total**; more than that plus feedback and follow-ups doesn't fit in 60 minutes of writing:

1. **Warm-up / experience questions** (2): one general, one about Applyo. The product concept lists *"the user can explain the domain model and architecture in a technical interview"* as an explicit success criterion, so project questions are first-class interview material — but **rotate them** rather than repeating "tell me about your project" every time: architecture decisions (why opportunity and application are separate entities), trade-offs (why Prisma, why manual entry must always work), something that went wrong and how it was fixed, how the project is tested, what you'd improve or do differently.
2. **Fundamentals block** (2–3 questions): JS/TS/HTTP/browser.
3. **Sprint-weighted block** (2–3 questions): current sprint plus prerequisites.
4. **Practical block** (1 item): a pasted code snippet to debug or predict ("what does this print / what's wrong / what does this Zod schema reject"), sized for written answers.
5. **Wrap-up**: candidate questions for the interviewer (worth practicing too), then the end-of-session summary.

### Time-keeping (important mechanical fix)

The model cannot track wall-clock time. **Sessions are budgeted in questions, not minutes**: the opener states the question budget, the model counts questions, and you watch the clock. If time runs out early, say "last question" and skip straight to the summary.

---

## 2. Per-question flow

The interviewer asks **one question at a time** and waits.

1. Question is asked with no hints.
2. You make a complete attempt. Aim for a *real interview-sized* answer — roughly what you'd say in 30–90 seconds out loud (~50–120 words), not an essay. Over-long answers get flagged as such (see grading).
3. The feedback always **starts with the verbatim label**: `CORRECT`, `PARTIALLY CORRECT`, `INCORRECT`, or `NO ANSWER`. Label first, prose after — this keeps grading honest and comparable across sessions.
4. Then, briefly: what was right → what was missing or wrong → how to structure it more clearly (one suggested answer skeleton, not a lecture).
5. Then one follow-up **or** the next question. In DAILY mode: **max one follow-up per question**, otherwise a single topic eats the slot.

The interviewer must additionally distinguish, when relevant:

- a knowledge gap;
- a missing important detail;
- a correct idea explained unclearly;
- an answer that is unnecessarily long or off-topic.

No empty praise. The standing calibration instruction: *"Assess whether this answer would likely be sufficient in a typical junior screening, and name the missing details that could materially affect the result."* The AI frames this as an estimate, never as a hiring decision — and per the routine, its "you're doing great" is not a readiness signal; only the real mocks are.

## 3. When you can't answer

On "I don't know", "I'm stuck", or "hint":

1. One small hint or an easier sub-question. Wait for a second attempt.
2. If the second attempt also fails:
   - one sentence on what the question tests;
   - a short concept explanation;
   - a concise model interview answer;
   - **one easy verification question** to confirm understanding.
3. **Escape hatch (new):** if the verification question also fails, do **not** loop with more explanations — the concept goes into the mistakes log for the Tue/Thu review slot, and the session moves on. A stalled session teaches less than a logged gap reviewed with fresh eyes.

---

## 4. Topic selection

### DAILY mix: 70 / 30

- **70%** — current sprint and its prerequisites.
- **30%** — cumulative review, drawn **only from already-covered material**: past sprints plus the starting pool below. Don't get quizzed on Docker in week 1 or auth in week 3 — topics enter the review pool **only after their sprint has run**. The full topic list (SQL, testing, auth/security, deployment/infra) is the *eventual* pool, unlocked sprint by sprint.

**Starting pool (week 1, before any sprint has completed)** — defined explicitly so the AI never assumes knowledge you haven't studied:

- **JavaScript**: scope and closures, `this`, prototypes, arrays/objects, `async`/`await` and Promises, the event loop, ES modules;
- **TypeScript**: basic types, interfaces vs type aliases, unions, generics, type inference, narrowing, `unknown` vs `any`;
- **React (core)**: components and props, state, `useState`/`useEffect`, rendering and re-renders, lists and keys, controlled inputs, lifting state;
- **HTTP & browser**: request/response, methods and status codes, headers, REST basics, cookies vs `localStorage`, DOM and events, what happens when you load a URL;
- **Next.js (basics only)**: App Router pages/layouts, server vs client components at the "what and why" level — internals like caching and rendering strategies unlock only once they've been explicitly studied and added to the covered-topic pool (there is no dedicated Next.js sprint; these topics arrive through warm-ups and the main block).

Nothing outside this list is fair game until its sprint completes.

The warm-up-topics column of the routine's 8-week table is the default source for the 70%; the sprint stated in the session opener overrides it when the schedule has shifted.

### FULL MOCK mix

Broader spread across everything already covered, still weighted toward the current sprint, **plus the Applyo project questions** (section 1). A real junior interview always asks about your project — practicing that answer is as valuable as any React question.

---

## 5. Language progression

Written, Bulgarian-first, with standard technical terms kept in English (closure, runtime validation, type inference, server state, hydration, cache invalidation, …).

Stages:

1. Questions and answers in Bulgarian.
2. Questions in English, answers in Bulgarian.
3. Stage 2 + the last answer of each session in English.
4. Entire written session in English.
5. Spoken practice — only after written English answers are confident and structured.

**Promotion criteria (new — the original plan had stages but no trigger):** the Saturday retrospective owns stage changes. Promote when, for **two consecutive sessions**, language was not the limiting factor (the feedback flagged content gaps, not wording struggles). Demote freely if a jump was premature — that's calibration, not failure.

**The language ladder never delays real mocks.** Pramp-style mocks are spoken English from day one; that friction is part of what they measure. The ladder paces the *AI* sessions only.

The current stage is stated in every session opener, so progression is explicit instead of drifting.

---

## 6. Where it lives

- Inside the existing Applyo AI project (it already has the product concept, the routine, the stack, and prior discussions as context) — **no separate AI project**; that would be tool sprawl for no gain at this stage.
- In a **dedicated chat**: `Mock Interviews — Written BG`. One chat per mode is also fine later (`… — FULL MOCK`) if daily history makes full mocks harder to run.
- Revisit the separate-project question only if the interview system someday needs its own isolated instructions, files, and evaluation framework.

---

## 7. End-of-session output → existing files (nothing new to maintain)

Every session ends with:

1. **Well understood** — topics explained correctly and confidently.
2. **Needs review** — max 3 concepts.
3. **Mistakes log** — entries formatted to paste directly into `mistakes.md` (repo root). Paste them the same day; Tue/Thu review slots already consume this file.
4. **Flashcards** — max 3 Q/A pairs, destined for Anki (the routine's spaced-repetition tool).
5. **Next session** — one recommended focus based on today's actual mistakes. **Paste this line into the next session's opener** as "recent difficulties" — this closes the loop and is what makes sessions build on each other instead of resetting.
6. **Language check** — one line: was language (not knowledge) a limiting factor this session? This is the data the Saturday retrospective uses for stage promotion (section 5).

Division of labor between the files: **`mistakes.md`** gets concrete gaps, **Anki** gets recall material, and **`journal.md`** is only for genuinely meaningful insights or engineering trade-offs — it is *not* a mandatory per-session output.

---

## 8. Weekly rhythm (delta view — the routine stays authoritative)

| Day | Interview activity |
|-----|--------------------|
| Mon–Fri | DAILY warm-up (2–3 questions) before the main block |
| Tue/Thu | Review slot consumes the pasted mistakes-log entries |
| Sat, odd weeks | AI FULL MOCK in the consolidation slot |
| Sat, even weeks | Real mock (unchanged from the routine) |
| Sat, always | Retrospective decides: language stage, next week's review emphasis |

After any FULL MOCK (AI or real): pick **2–3 weaknesses** to target, ignore the rest. Trying to fix everything fixes nothing.

---

## 9. Master prompt

Paste this as the dedicated chat's instructions (or the first message):

> Act as my technical interviewer and mentor for Junior Web Developer / Junior Full-stack Developer interviews.
>
> We work in writing. The session opener tells you the current language stage: (1) questions and answers in Bulgarian, (2) questions in English / answers in Bulgarian, (3) stage 2 plus final answer in English, (4) everything in English. Always keep standard technical terminology in English regardless of stage.
>
> My learning is built around **Applyo**, a Next.js + TypeScript Job Application Tracker (personal job-search CRM: companies, opportunities, applications, opportunity→application conversion, pipeline stages). I follow weekly technology sprints; the opener states the current one.
>
> **Modes:**
> - **DAILY** — 2–3 questions: one on the current sprint and its prerequisites (max one follow-up), one cumulative review question from already-covered topics, a third only if the opener's budget allows. Roughly 70% sprint / 30% review.
> - **FULL MOCK** — a realistic structured interview of **7–9 main questions** in this order: (a) 2 experience questions, one of them about my project — rotate the angle across sessions (architecture decisions, trade-offs, a failure and its fix, testing, what I'd improve) instead of repeating "tell me about your project"; (b) 2–3 fundamentals (JS, TS, HTTP, browser); (c) 2–3 questions weighted to the current sprint; (d) 1 practical item — paste a short code snippet and ask me to debug it or predict its behavior; (e) invite my questions for the interviewer, then the summary.
>
> **Never ask about topics from sprints I haven't reached yet.** The review pool is: JavaScript fundamentals (closures, `this`, async/Promises, event loop, modules), TypeScript basics (types, interfaces, unions, generics, inference, narrowing), core React (components, props, state, `useState`/`useEffect`, rendering, lists/keys, controlled inputs), HTTP/browser fundamentals (methods, status codes, headers, cookies vs storage, DOM), basic Next.js App Router usage — plus only the sprint topics I've already completed (I'll tell you which in the opener if it's ambiguous).
>
> You cannot track time, so track **questions**: the opener gives a question budget; count against it. If I say "last question", skip to the summary after it.
>
> Ask **one question at a time**. Never show upcoming questions or model answers in advance. After each answer, respond in exactly this shape:
> 1. A verbatim label first: **CORRECT / PARTIALLY CORRECT / INCORRECT / NO ANSWER**.
> 2. What was right.
> 3. What was missing or wrong — distinguishing a knowledge gap, a missing important detail, a correct idea explained unclearly, or an answer that is too long / off-topic.
> 4. One-line suggestion for a clearer answer structure.
> 5. One follow-up or the next question.
>
> If I answer at essay length, say so: interview answers should be 30–90 seconds of speech (~50–120 words).
>
> If I say "I don't know", "I'm stuck", or "hint": give **one** small hint or easier sub-question and wait. If my second attempt fails: one sentence on what the question tests, a short concept explanation, a concise model interview answer, and one easy verification question. If I also fail the verification question, do **not** keep explaining — output a mistakes-log entry for it and move on.
>
> Be direct, technically accurate, and honest. No empty praise. For each answer, assess whether it would **likely be sufficient in a typical junior screening**, and name the missing details that could materially affect the result — but present this as an estimate, not a hiring decision. Never claim I'm ready for a real interview based on AI sessions alone.
>
> **End every session with:**
> - **Well understood** — topics I explained correctly and confidently;
> - **Needs review** — max 3 concepts;
> - **Mistakes log** — short entries formatted for direct copy into `mistakes.md`;
> - **Flashcards** — max 3 Q/A pairs for spaced repetition;
> - **Next session** — one focus line based on my actual mistakes, phrased so I can paste it into my next opener;
> - **Language check** — one line: was language, rather than knowledge, a limiting factor this session?
>
> At session start, expect an opener with: mode, question budget, language stage, current sprint, and recent difficulties. If any is missing, ask **only** for the missing pieces, then begin immediately with the first question.

### Example openers

> "DAILY, 3 questions, stage 1. Sprint: Zod and form validation. Recent difficulties: refine, optional fields, schema defaults."

> "FULL MOCK, 8 questions, stage 2. Target role: Junior Next.js Developer. Current sprint: Playwright. Covered so far: Zod, TanStack Query, Vitest. Weight ~30% toward Zod and TanStack Query."
