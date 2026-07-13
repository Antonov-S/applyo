# Mission: Validating the Job Application Tracker's forms with Zod

## Why
I'm building Applyo (a job-application tracker) as my learning backbone, and Sprint 1
of my study routine is validation. I want the tracker's real forms — saving an
opportunity, converting it to an application — to reject bad input safely and give
me clean, typed data to work with, without me hand-writing fragile TypeScript types
that drift out of sync with the actual validation.

## Success looks like
- I can write a Zod schema for the Opportunity form (and later the Application form)
  and derive its TypeScript type from that one schema with `z.infer`.
- I can validate a form submission with `safeParse` and handle the success/error
  branches correctly, surfacing per-field messages to the user.
- I can coerce raw form input (strings, dates, numbers) into the right types and
  express real rules: required fields, enums for status, optional URLs, salary
  min ≤ max.
- I can explain, in an interview, why schema-first validation beats hand-written
  types + manual `if` checks.

## Constraints
- ~50 min main block per morning; lessons must be short and finishable.
- I implement first, then ask for review/hints — don't hand me whole features.
- Stack is fixed: Next.js 16 App Router, React 19, TS strict, Zod (v4).
- TypeScript types still feel fuzzy to me — lean on Zod's inference to help, not
  add, type burden.

## Out of scope (for now)
- TanStack Query / server-state caching (next step in Sprint 1, not yet).
- React Hook Form or any form library — learn Zod on its own first.
- Server Actions / API route wiring, auth, database (later sprints).
- Async refinements (e.g. "company already exists" DB checks) until there's a DB.
