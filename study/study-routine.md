# Morning Study Routine — Revised Plan

This plan keeps what was good in your original idea (active learning, feedback, progressive difficulty, accumulating context in one place) and fixes the four weak spots: the lack of a backbone project, unrealistic depth on the infrastructure topics, the missing review cycle, and the missing external signal for interviews.

---

## 1. Backbone project (the most important change)

Instead of disconnected daily micro-tasks — **one real application** that everything hangs off. Every new technology enters it, every practice task is a real feature in it, every test tests it.

**Project recommendation: Job Application Tracker.**
It's meta — you're job hunting, so you'll actually use it, which kills the temptation to abandon it. And it covers your whole stack naturally:

- Next.js + TypeScript frontend
- SQL database + ORM (Prisma — decided; Drizzle optional as a later spike) — applications, companies, statuses, notes (managed Postgres, e.g. Neon free tier — nothing to install locally until the Docker sprint)
- Auth (Better Auth) — your own login
- Form validation (Zod)
- Data and caching (TanStack Query)
- Real places for tests, Docker, CI, etc.

Job Tracker is **an example, not a mandate**. More important than the specific choice are three criteria: the project should be large enough to cover the whole stack; it should interest you for **at least a few months** (otherwise you'll drop it); and it should use everything on the list naturally. Pick any app with CRUD + auth + an external API, as long as it meets all three.

**Keep the learning project separate from your real product.** If Spendly (or another serious project of yours) is your main development work, don't turn it into a learning playground — there you can't break and experiment freely without affecting the real codebase. The learning backbone should be a place where mistakes have no cost.

**The sprints own the calendar; the product roadmap is only a backlog.** If the project has its own concept/phase document, that document supplies features — it never sets pacing. Each sprint pulls one small, relevant feature from the backlog and applies the sprint's technology to it. Never wait for an entire product phase to be "finished" before moving on to testing, auth, or Docker: when the testing sprint starts, you test whatever exists.

A technology you touch once and never again gets forgotten; a technology embedded in a living project stays.

---

## 2. Daily structure (~90 min, honestly)

Four different cognitive modes every morning make you shallow everywhere. So: **two things are the core every day, the third slot rotates.**

| Slot | Time | What |
|------|------|------|
| Warm-up | 20 min | One interview question + answer + feedback |
| Main block | 50 min | Build on the backbone project, including the current sprint's technology |
| Rotating slot | 20 min | Mon/Wed/Fri → English · Tue/Thu → review + mistakes |

Note: the new technology is **not a separate slot** — you learn it by embedding it in the main block. That way you don't hop between domains and don't learn in the abstract.

**90 minutes, not 120.** If the day is short, the **rotating slot** (English/review) is what drops, not the build.

**Minimum viable routine (truly busy days): 30 minutes.** A 10-minute warm-up question + 20 minutes on the smallest completable step of the current feature. Zero days break the habit; tiny days don't. And a guard so the drop rule above doesn't quietly eat the rotating slot: if English or review has already been dropped **twice in the same week**, the next short day flips priority — warm-up + rotating slot, the build waits. The weekly retrospective checks whether this guard is firing.

**Don't interrupt the main block in the middle of a task.** If you're 15–20 minutes from finishing the feature, extend the session rather than leaving context "hanging." A half-broken feature the next day costs more time to re-enter than you save today.

**The stuck-rule (the mirror of the rule above).** If you're blocked on environment or configuration — a Docker error, a WSL2 install issue, a mysterious connection string — for **30 minutes**, stop digging: write the exact error and what you already tried into the mistakes log — that queues it for the next Tue/Thu review session, where you tackle it with fresh eyes (and your AI mentor's help) — and return to feature work. This is not giving up; sinking a whole block into infra quicksand is how sprints 3–4 kill routines. (Blocked on *your own code* doesn't count — that's the actual learning.)

**Definition of Done — for every feature, no exceptions.** A main-block task counts as finished only when all four hold: the code works, types/lint/tests pass, it's committed, and you've written a 2–3 line learning note (what you learned, what's still unclear). "Almost working, uncommitted" is not done — it's tomorrow's re-entry cost.

**Lighter DoD for exploratory spikes.** When a session's goal is understanding, not shipping — trying a library, following a course module, poking at an unfamiliar API — the full DoD doesn't apply. A spike is done when the 2–3 line learning note is written and the scratch code is either deleted or committed clearly marked as a spike. Don't force tests and polish onto code whose purpose was to be thrown away — but the learning note is never optional; it's the difference between a spike and wasted time.

---

## 3. Thematic sprints (instead of hopping between domains)

The original order mixes testing, infrastructure, and backend concepts day by day. Group them into sprints of several days, each applied to the backbone:

**Sprint 1 — Validation and data (≈1 week)**
Zod → TanStack Query. Real output: the tracker's forms are type-validated, data is read/cached through Query.

**Sprint 2 — Testing (≈2 weeks)**
Vitest → Playwright → Storybook. Real output: unit tests on the logic, e2e for "add application," isolated components.

- **Storybook is provisional — pre-registered drop rule.** Its real value is shared UI in team/design-system contexts, which a solo tracker doesn't have; in junior interviews "can you test?" means Vitest and Playwright. So: one honest session. If it hasn't shown you something the other two aren't already giving *this* app, drop it — no "finishing the tutorial first" — and the freed time goes to Playwright depth (more e2e flows, CI integration), not to a new topic. Unit + e2e were always the sprint's real deliverable.

**Sprint 3 — Auth and backing services (≈3 weeks)**
Better Auth → Redis (narrow scope) → SSE. These need hours, not 30 minutes. Real output: login, rate-limited auth endpoints, live updates via Server-Sent Events.

- **Redis is scoped to one real use: rate limiting, via Upstash.** A solo CRUD app has no natural need for a cache, and Better Auth keeps sessions in your SQL database — so don't invent a caching layer to justify the tech. Rate limiting your auth endpoints is a genuine security feature, small enough to finish, and a pattern you'll meet in real codebases. Upstash (free tier, SDK over HTTP) means zero local install — important, since Redis has no official Windows build and you won't have Docker yet at this point. "Done" = auth endpoints are rate-limited and you can explain how.
- **SSE instead of WebSockets.** Same realtime concept in interviews, far less pain in practice: serverless platforms (Vercel-style) don't support long-lived WebSocket connections, so a WebSocket feature built here would break at deploy time. SSE works within the platform. If a specific job ad demands WebSockets later, learn them then — on a small separate Node server, knowing the constraint in advance.
- **SSE is provisional (same status as Storybook).** A single-user tracker has no natural stream of external events, so don't build a fake "live" feature just to check the box. When the sprint arrives, attach SSE to a genuine need — e.g. streaming URL-extraction progress while an import runs — or let that week's retrospective swap it for a more valuable topic.

**Sprint 4 — Docker and CI (≈2 weeks)**
Docker → GitHub Actions → public deploy. Real output: app + Postgres run via one `docker compose up`, tests run on every PR, project deployed publicly (Vercel or similar).

- **No Docker exists in the plan before this sprint.** Weeks 1–6 the tracker runs on a managed Postgres (Neon free tier — create a DB in the web UI, paste the connection string into `.env`, done). You walk into the course knowing nothing; that's the starting state a beginner course assumes, and setup is its first lesson, not a prerequisite.
- **The "aha" exercise that makes it click:** run Postgres in a container and point the tracker's connection string at `localhost` instead of Neon. Same app, same code — only the database moved from the cloud to your laptop. After that, "daily use" is just `docker compose up -d` in the morning and `docker compose down` when done — all the learning is in this sprint; the routine afterward is two commands.
- **Docker via a video course is fine — with one rule.** You learn visually and by doing, so a course is a legitimate entry path, but only if every session ends by applying what you watched to the tracker (watch a module → do it in your repo, same morning). A course consumed passively start-to-finish is the exact "vocabulary, not competence" trap.
- **Budget day 1 for setup.** Docker Desktop on Windows requires WSL2; getting that installed and working is realistically a full session on its own. Plan it explicitly so it doesn't feel like falling behind.
- "Done" for Docker = a Dockerfile for the app + a compose file with Postgres, both working. Not Kubernetes, not swarm, not orchestration.
- **The public deploy ships with a demo account.** Presentability doesn't require the full auth surface (verification, password reset) — it requires a seeded demo user with visible credentials on the sign-in page ("Try it: demo@… / …") landing on realistic pre-seeded data mid-pipeline, plus a README with screenshots. Reviewers spend minutes and never register; the demo login is what they'll use. Same pattern as Spendly's seed script — about an hour of work.

**Cut from the plan: AWS and Cloudflare Workers.** "AWS Basics" is a multi-month rabbit hole with low interview ROI for a Next.js-stack developer, and Cloudflare Workers overlaps with the edge/serverless concepts you already get from your deploy platform. Both move to a "later, only if a concrete job ad demands it" list. The ~2 freed weeks are what give Docker and Redis the real hours this section keeps insisting on.

Honestly: Docker in half an hour a day gives you vocabulary, not competence. That's why it now gets the freed time — don't fool yourself that a watched video module equals a learned tool until it runs in your own repo.

---

## 4. Weekly rhythm

| Day | Warm-up | Main block | Rotating slot |
|-----|---------|------------|---------------|
| Mon | Interview | Build + sprint technology | English |
| Tue | Interview | Build + sprint technology | Review + mistakes |
| Wed | Interview | Build + sprint technology | English |
| Thu | Interview | Build + sprint technology | Review + mistakes |
| Fri | Interview | Build + sprint technology | English |
| Sat (optional) | — | Longer consolidation session / real mock interview | — |

**Real mock interviews every 1–2 weeks.** An LLM interviewer is an excellent daily practice partner — always available, endlessly patient, ideal for rehearsing the structure and wording of your answers. What it can't be is your evaluator: it flatters and it's inconsistent, so don't read its "you're doing great" as a signal. Validate progress periodically through a real mock — Pramp, interviewing.io, or an experienced colleague. That reads *how you communicate under pressure*, which the model won't give you honestly.

**English 2–3 times a week**, not every day — if your English is already decent, daily is overkill. If it's weak, bump it to 4–5.

---

## 5. Review cycle (was completely missing)

A forward-only routine = you learn and it leaks out. The mechanism:

- **Tue/Thu rotating slot:** review the "mistakes log" — what you got wrong in interviews/code this week, why, how to fix it.
- **Learning journal (separate from the mistakes log):** the 2–3 line notes from each feature's Definition of Done accumulate here — insights, surprises, open questions. The mistakes log captures what went wrong; the journal captures what you understood and what you still don't. The weekly retrospective reads both.
- **Flashcards / spaced repetition:** make cards for the things you keep tripping over (Anki or similar). 5 minutes of review at the start of the review slot.
- **Saturday consolidation:** return to a technology from 2 weeks ago — can you still use it without documentation? If not — it isn't learned.
- **Where they live (decided, not optional):** `mistakes.md` and `journal.md` in the root of the tracker repo. Versioned with the project, open in the editor you're already in — the DoD's learning note is just an edit + commit like everything else. No separate app, no new tool.
- **Weekly retrospective (10–15 min, e.g. Saturday):** answer five questions in writing — What did I learn this week? Where did I struggle most? Which mistakes recurred? What will I do differently next week? Which topic can I now explain without help? This shows you real progress, not just checked-off tasks — and gives you data to adjust the plan around your weak spots instead of driving blind.

---

## 6. Role of the tools (honestly)

**ChatGPT** — mentor, interview warm-up, explanations. Good for structure; weak as an evaluator, so don't trust its "you're doing great."

**Codex** — not just "isolated tasks" (I undersold that in the previous version). Agentic Codex works directly in the repo: generating small tasks, reviewing real PRs, catching regressions, analyzing architecture, working on the project.

**Claude Code** — essentially the same class of tool: work in the real repo, pair programming, reviews, architectural discussions.

Honestly about these two: **they overlap heavily.** The difference is ergonomic and a matter of preference, not a difference in capability. If Codex takes on the repo work, Claude Code becomes redundant for you — and vice versa. You don't need both for the same thing. Pick **one** for the in-project work and don't split your attention.

**One rule for whichever repo agent you pick: it reviews and hints only after your own attempt.** You implement first — however roughly — then ask it to review, suggest improvements, or unblock you. An agent that writes the feature before you've tried robs the main block of exactly the practice it exists to build. (The exception is the stuck-rule: environment and infra errors can go to it directly — debugging WSL2 is not the skill you're training.)

**Cowork** — optional, only if you feel real pain. Its idea is the meta-layer around the routine (generating exercises, compiling a weekly review, researching a technology into a hands-on plan). But for a solo learner early on, adding it risks tool sprawl — one more tool to switch between with no clear gain. **Start with three: ChatGPT + one of Codex/Claude Code + real mock interviews.** Add a fourth layer only when a concrete pain justifies it.

General warning: the more AI ecosystems you juggle, the more friction. Fewer tools used deeply beat more tools used shallowly.

---

## 7. Example 8-week schedule

| Week | Sprint technology | Interview topics (warm-up) | Mock interview |
|------|-------------------|-----------------------------|----------------|
| 1 | Zod + TanStack Query | JS fundamentals, TS types | — |
| 2 | Vitest + Playwright | React, hooks | ✅ real |
| 3 | Playwright + Storybook | Next.js, rendering | — |
| 4 | Better Auth | SQL, ORM, queries | ✅ real |
| 5 | Redis — rate limiting via Upstash | Auth, sessions, security | — |
| 6 | SSE — live updates | System design basics | ✅ real |
| 7 | Docker (course + apply to tracker; WSL2 setup day 1) | CI/CD, deployment | — |
| 8 | Docker wrap-up + GitHub Actions + public deploy | Infrastructure, scaling | ✅ real |

The table is **default pacing, not deadlines.** If Better Auth takes eight days instead of five, the schedule shifts and nothing has "failed" — the retrospective adjusts the remaining weeks. What's not allowed is the opposite direction: declaring a technology done ahead of pace without meeting its "Done" definition. Speed adjusts; the bar doesn't.

---

## Core principle (kept, extended)

Don't learn passively. Instead: answer questions, build a real product, get feedback, log and analyze your mistakes, review what you've learned, raise the difficulty. The difference from the original plan is that now everything hangs on **one living project** and there's a **mechanism so you don't forget** what you've learned — the two things that make the routine close to real work rather than a collection of disconnected exercises.

**This document is done.** From here, the biggest gains come from following it consistently for 8–12 weeks — not from refining it further. Every additional editing pass is procrastination wearing a productivity costume. Freeze the plan, start Monday, and let the weekly retrospective (not new rewrites) be the only mechanism that changes it.
