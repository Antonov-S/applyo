# Mission: Sprint 1 — validated *and* cached data for the Job Application Tracker

Sprint 1 of my study routine is "Validation and data": **Zod → TanStack Query**. I'm
building Applyo (a job-application tracker) as my learning backbone, and I want its real
data flow to be both *safe at the edges* (Zod validates every form submission) and *managed
in the client* (TanStack Query caches and syncs the server-owned data). This one mission
spans both halves; the second half is the current focus.

## Part A — Validation with Zod  ✅ largely delivered
Reject bad form input safely and get clean, typed data, without hand-writing fragile
TypeScript types that drift from the actual validation.
- [x] Opportunity schema with `z.infer` deriving the TS type from one source of truth.
- [x] `safeParse` success/error branching; per-field messages via `issues`/`path`,
      `flattenError` vs `treeifyError`, and a hand-rolled `toFieldErrors` map.
- [x] Coercion & massaging (`coerce`/`preprocess`/`transform`/`pipe`) and the seam where
      `.refine()` is a *validator*, not a massager.
- [ ] (Open, deferred) cross-field `.refine()` depth, `.extend()`/`.partial()` for the
      Application form, and wiring Zod into a React 19 form / Server Action.

## Part B — Server state with TanStack Query  ← current focus
I want the tracker to read its opportunities/applications through a cache that knows when the
data is stale, instead of hand-rolled `useState` + `useEffect` fetching.

### Success looks like
- I can explain *why* server state is a different kind of state from client state — and
  why that makes TanStack Query an async **state manager**, not a `fetch` wrapper.
- I can wire a `useQuery` against Applyo's data: a correct `queryKey` (cache address), a
  `queryFn` that throws on failure, and a component that renders pending/error/success —
  reading `status` vs `fetchStatus` correctly.
- I can control caching deliberately with `staleTime` (fresh → stale → refetch) instead of
  fighting the defaults, and design query keys for list / filtered / by-id endpoints.
- I can write a `useMutation` for create/convert and invalidate the right queries so the UI
  reflects the change (converting an opportunity → application is the marquee case).
- I can explain, in an interview, when to reach for TanStack Query vs plain client state.

### Constraints
- ~50 min main block per morning; lessons must be short and finishable.
- I implement first, then ask for review/hints — don't hand me whole features. (Infra
  boilerplate like the App Router `QueryClientProvider` is fair to hand over — stuck-rule.)
- Stack is fixed: Next.js 16 App Router, React 19 (React Compiler on — no manual memo), TS
  strict, Zod v4, TanStack Query v5.
- **No database yet** (Phase 1 is manual-only). Until the DB sprint, "server state" is served
  by mock Next.js Route Handlers returning `Opportunity[]`. The queries are written the same
  way they will be against a real DB — only the handler's body changes later.

### Out of scope (for now)
- Mutations/optimistic updates until the read path (query/cache/staleTime) is solid.
- RSC → client hydration / streaming initial data (needs its own lesson; see RESOURCES gap).
- React Hook Form or any form library; auth; the real database — later sprints.
