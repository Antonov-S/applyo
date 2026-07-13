# Job Application Tracker — Product Concept and Scope

## 1. Product definition

The Job Application Tracker is a **personal job-search CRM** for managing the full hiring journey—from discovering an interesting vacancy to receiving an offer, rejection, or withdrawing from the process.

It is not merely a list of submitted applications, and it is not intended to become another general-purpose job portal. Its purpose is to centralize opportunities found across fragmented sources, help the user decide where to apply, track every interaction and next step, and make the overall job search measurable.

The product should support two distinct but connected workflows:

1. **Opportunity management** — saving and evaluating vacancies before applying.
2. **Application management** — tracking the actual hiring process after applying.

The first version is designed primarily for a single user, but the architecture should not prevent multi-user support later.

---

## 2. Product goals

The application should help the user:

- keep interesting vacancies in one place;
- distinguish saved opportunities from submitted applications;
- avoid losing track of deadlines, interviews, recruiter conversations, and follow-ups;
- compare roles and companies before applying;
- understand which sources, technologies, and application strategies lead to interviews;
- maintain a structured watchlist of Bulgarian companies;
- capture vacancies from company career pages, DEV.BG, Jobs.bg, LinkedIn Jobs, referrals, recruiter messages, and other sources;
- continue working even when automatic metadata extraction or source-specific integrations are unavailable.

The product should remain useful with **manual entry alone**. Every automated import mechanism is an optional convenience, not a critical dependency.

---

## 3. Non-goals

The project is not intended to:

- become a complete Bulgarian job-search engine;
- continuously crawl every job portal or company website;
- bypass authentication, CAPTCHAs, access controls, anti-bot protections, or website restrictions;
- depend on undocumented private APIs;
- mirror the complete contents of DEV.BG, Jobs.bg, LinkedIn, or another portal;
- automate job applications without explicit user review;
- generate or submit misleading application materials;
- introduce technologies only to satisfy a checklist when they do not solve a real product problem.

---

## 4. Core domain distinction

### 4.1 Opportunity

An **opportunity** is a vacancy the user has discovered and may be considering, but has not necessarily applied for.

Suggested fields:

- title;
- company;
- source;
- original URL;
- location;
- work model: remote, hybrid, or on-site;
- employment type;
- salary range, when available;
- description;
- required technologies;
- preferred technologies;
- seniority;
- publication date;
- closing date;
- date discovered;
- personal match score;
- priority;
- notes;
- status.

Suggested opportunity statuses:

- `saved`;
- `reviewing`;
- `ready_to_apply`;
- `ignored`;
- `expired`;
- `converted`.

### 4.2 Application

An **application** represents an actual submission and the hiring process that follows.

Suggested fields:

- linked opportunity;
- application date;
- CV version;
- cover-letter version;
- current pipeline stage;
- recruiter or hiring contact;
- next action;
- next-action due date;
- expected response date;
- compensation expectations;
- notes;
- outcome;
- timestamps.

Suggested application stages:

- `draft`;
- `applied`;
- `screening`;
- `technical_interview`;
- `take_home_assignment`;
- `final_interview`;
- `offer`;
- `rejected`;
- `withdrawn`;
- `closed`.

An opportunity can exist without an application. Converting an opportunity into an application should preserve the original source data and create the initial application timeline event.

---

## 5. Core user workflows

### 5.1 Save and evaluate an opportunity

1. The user finds a vacancy on a company career page, DEV.BG, Jobs.bg, LinkedIn Jobs, through a recruiter, or through a referral.
2. The user saves it manually or pastes its URL.
3. The Tracker creates an editable draft.
4. The user reviews the role, company, technologies, location, and deadline.
5. The user assigns a priority and decides whether to ignore it, continue reviewing it, or prepare an application.

### 5.2 Convert an opportunity into an application

1. The user chooses **Apply / Convert to application**.
2. The Tracker records the application date and selected CV or cover-letter version.
3. The opportunity becomes linked to an active application.
4. The application receives its first timeline event.
5. The user sets a follow-up or expected-response date.

### 5.3 Track the hiring pipeline

1. The user moves the application through the pipeline.
2. Every meaningful stage change creates a timeline event.
3. Interview dates, assignments, recruiter messages, and decisions are recorded.
4. The dashboard surfaces overdue or upcoming actions.
5. Closed applications contribute to the analytics view.

### 5.4 Review target companies

1. The user opens the company watchlist.
2. The Tracker shows which career pages have not been checked recently.
3. The user opens the relevant career page or portal profile.
4. Interesting vacancies are saved into the Tracker.
5. The company record stores the latest review date and notes.

---

## 6. Full product functionality (reference)

This section describes the complete target functionality across all phases — it is **not** a build-first list. What gets built first is defined by Phase 1 (section 8) and the eight-week spine note (section 10); contacts, tasks, full company profiles, and the timeline described below arrive in later phases.

### 6.1 Dashboard

The dashboard should show:

- active applications by stage;
- upcoming interviews;
- overdue follow-ups;
- applications waiting for a response;
- recently saved opportunities;
- companies due for a career-page review;
- basic statistics, such as applications submitted, interviews received, offers, and response rate.

The initial dashboard can be simple. It should prioritize actionable information over decorative charts.

### 6.2 Opportunities

Users should be able to:

- create an opportunity manually;
- edit and delete an opportunity;
- paste and store the original vacancy URL;
- assign company, source, location, work model, salary, seniority, and technologies;
- add notes and a personal match score;
- filter and search opportunities;
- identify expired opportunities;
- convert an opportunity into an application;
- see possible duplicates before saving.

Useful views:

- table or list;
- saved/reviewing/ready-to-apply filters;
- technology tags;
- source filters;
- priority filters.

### 6.3 Applications

Users should be able to:

- create an application from an opportunity or directly;
- update its stage;
- record interviews, assignments, messages, offers, and rejections;
- set the next action and deadline;
- attach or reference the CV and cover-letter versions used;
- add contacts;
- view the complete timeline;
- close or reopen an application.

Useful views:

- pipeline or Kanban;
- sortable table;
- application detail page;
- timeline;
- calendar-oriented list of upcoming actions.

### 6.4 Companies

A company profile should contain:

- name;
- website;
- career-page URL;
- LinkedIn company URL;
- DEV.BG or Jobs.bg profile URL, when available;
- location;
- company size or industry, when useful;
- priority;
- preferred roles or technologies;
- last checked date;
- check frequency;
- notes;
- linked opportunities, applications, and contacts.

### 6.5 Contacts

The product may track:

- recruiter;
- hiring manager;
- interviewer;
- referrer;
- other relevant contact.

Suggested fields:

- name;
- role;
- company;
- email;
- LinkedIn URL;
- notes;
- last contact date;
- next follow-up date.

### 6.6 Tasks and follow-ups

Users should be able to create lightweight tasks connected to:

- an opportunity;
- an application;
- a company;
- a contact.

Examples:

- tailor CV;
- prepare cover letter;
- send follow-up;
- prepare for technical interview;
- complete assignment;
- check company career page;
- review offer.

### 6.7 Activity timeline

Important changes should be represented as timeline events:

- opportunity created;
- application submitted;
- stage changed;
- interview scheduled;
- recruiter contacted;
- task completed;
- offer received;
- application closed.

This creates a reliable history without forcing the user to reconstruct events from free-form notes.

---

## 7. Suggested domain model

The exact schema may evolve, but the following entities provide a strong starting point:

- `users`;
- `companies`;
- `company_watchlist_entries`;
- `opportunities`;
- `applications`;
- `application_events`;
- `contacts`;
- `tasks`;
- `tags`;
- `opportunity_tags`;
- `application_documents`;
- `source_imports`.

Key relationships:

- a company has many opportunities;
- an opportunity may have zero or one application;
- an application belongs to one opportunity when created from a saved vacancy;
- an application has many timeline events;
- a company has many contacts;
- tasks may belong to an opportunity, application, company, or contact;
- opportunities may have many technology or skill tags;
- source imports record how external data entered the system.

The first implementation does not need every entity immediately. The schema should grow with real features rather than being fully designed upfront.

---

## 8. Product phases

### Phase 1 — Core Personal Tracker

The first phase establishes the complete manual workflow.

#### Scope

- companies;
- opportunities;
- applications;
- manual opportunity entry;
- opportunity-to-application conversion;
- pipeline stages;
- notes;
- next actions;
- basic dashboard;
- filters and search;
- learning journal and mistakes log for the development process.

#### Definition of Done

The phase is complete when the user can manually save a vacancy, evaluate it, convert it into an application, move it through the hiring pipeline, record follow-ups, and close the process.

This phase should be useful without external APIs, browser extensions, automated extraction, Redis, realtime features, or background jobs.

---

### Phase 2 — Workflow Quality and Reliability

The second phase improves the user experience and engineering quality of the core workflow.

#### Possible scope

- authentication;
- validation with Zod;
- server-state management and caching;
- optimistic updates where appropriate;
- advanced filters;
- saved views;
- application timeline;
- accessible forms and interactions;
- Vitest tests for domain logic;
- Playwright tests for critical workflows;
- Storybook for reusable UI components;
- responsive layout;
- empty, loading, and error states;
- duplicate warnings;
- export or backup.

#### Definition of Done

The phase is complete when the core application workflow is reliable, tested, accessible, and pleasant to use on both desktop and mobile.

---

### Phase 3 — Source Monitoring and Assisted Job Capture

The application does not attempt to become another job portal or automatically aggregate every vacancy in Bulgaria. Job discovery remains in the places where Bulgarian employers already publish positions:

- company career pages;
- DEV.BG;
- Jobs.bg;
- LinkedIn Jobs;
- recruiter messages;
- referrals;
- other manually selected sources.

The Tracker acts as the central workspace where relevant opportunities are captured, evaluated, normalized, deduplicated, and converted into applications.

#### 3.1 Company watchlist

Users can maintain a list of companies they are interested in.

Each watched company contains:

- company name;
- careers-page URL;
- LinkedIn company URL;
- DEV.BG or Jobs.bg profile URL, when available;
- preferred technologies or roles;
- priority;
- last checked date;
- check frequency;
- notes.

The dashboard shows companies whose career pages have not been checked recently.

The first version does not crawl these websites automatically. It provides a structured review workflow and direct links.

#### 3.2 Quick Save from URL

A user can paste a vacancy URL from a company website, DEV.BG, Jobs.bg, LinkedIn, or another source.

The Tracker creates a draft opportunity with:

- source;
- original URL;
- job title;
- company;
- location;
- work model;
- employment type;
- publication or closing date;
- description;
- technology tags;
- date discovered.

The user reviews and confirms the information before it is saved.

Manual entry always remains available, so the application never depends on a specific portal, API, or parser.

#### 3.3 Assisted metadata extraction

When the user pastes a URL, the application may attempt to extract publicly available metadata from the page.

Extraction priority:

1. `JobPosting` JSON-LD structured data;
2. Open Graph and standard HTML metadata;
3. page title and other safe public metadata;
4. user-selected or pasted job-description text;
5. manual entry as a fallback.

The extracted information is treated as an editable suggestion, not as authoritative data.

The system does not continuously crawl portals and does not bypass authentication, CAPTCHAs, access controls, anti-bot protections, or other restrictions.

#### 3.4 Browser bookmarklet or extension

After the basic Tracker is complete, an optional bookmarklet or browser extension may provide a **Save to Job Tracker** action.

While viewing a vacancy, the user can send:

- the current URL;
- page title;
- selected job-description text;
- source domain.

The Tracker opens a prefilled draft that the user reviews before saving.

This provides most of the convenience of an integration without requiring a private API or maintaining a fragile central scraper.

#### 3.5 Alerts as discovery inputs

Job discovery can use the existing alert systems of LinkedIn, Jobs.bg, DEV.BG, and company career platforms.

Initially, the user opens an alert and saves relevant results manually.

Later optional enhancements may accept:

- a forwarded alert email;
- pasted email content;
- a CSV export;
- a manually imported list of URLs.

The application extracts candidate opportunities and asks the user to confirm each one before adding it.

#### 3.6 Source normalization and deduplication

Every opportunity stores:

- `sourceType`;
- `sourceName`;
- `sourceUrl`;
- `externalId`, when available;
- `canonicalUrl`;
- `importMethod`;
- `discoveredAt`;
- `lastCheckedAt`;
- `expiresAt`;
- `sourceStatus`.

Possible import methods:

- `manual`;
- `url_metadata`;
- `bookmarklet`;
- `browser_extension`;
- `email_alert`;
- `csv_import`;
- `source_adapter`.

Duplicate detection uses, in order:

1. source plus external ID;
2. canonical URL;
3. normalized company, title, and location.

The user decides whether a possible duplicate should be merged or kept separately.

#### 3.7 Optional source adapters

A source-specific adapter may be added only when a company career platform exposes a documented public feed, structured data, or a stable endpoint that permits this use.

Each adapter should be isolated behind a common interface so that removing one source does not affect the rest of the application.

DEV.BG, Jobs.bg, LinkedIn, and company-site scraping are not dependencies of the product. Their vacancies can always be saved through manual entry, URL import, or the browser extension.

A suitable adapter boundary might expose operations such as:

```ts
interface JobSourceAdapter {
  canHandle(url: URL): boolean;
  extract(input: SourceInput): Promise<NormalizedOpportunityDraft>;
}
```

The normalized result must always be reviewed by the user before persistence.

#### 3.8 Crawler and scraper boundary

A **crawler** automatically navigates websites, follows links, and discovers many pages.

A **scraper** extracts specific data from a known page.

A large automated system often combines both: the crawler discovers vacancy pages, and the scraper extracts the job data.

This product does not require a central crawler. Continuous crawling would create unnecessary maintenance, legal and operational uncertainty, bot-detection problems, and fragile dependencies on third-party page structures.

Limited extraction from a URL deliberately provided by the user is a different and narrower workflow. Even then, the system should prefer structured metadata, respect access restrictions, and preserve manual entry as the fallback.

#### 3.9 Definition of Done

This phase is complete when the user can:

- maintain a watchlist of Bulgarian companies;
- see which company sources are due for review;
- save a vacancy from any source through a URL;
- review and correct extracted metadata;
- identify possible duplicate opportunities;
- record where and when the vacancy was found;
- convert the saved opportunity into an application;
- complete the workflow even when automatic extraction fails.

The goal is not to build a Bulgarian job-search engine. The goal is to make opportunities found across fragmented sources easy to capture, compare, and manage.

---

### Phase 4 — Follow-ups, Reminders, and Automation

This phase focuses on the repetitive work surrounding an active job search.

#### Possible scope

- email or in-app reminders;
- scheduled follow-up tasks;
- reminders for application deadlines;
- reminders to re-check company career pages;
- automatic expiration review;
- stale-application detection;
- recurring review tasks;
- optional calendar integration;
- optional email-alert import;
- background processing for imports.

Realtime technologies should be introduced only when a real use case appears. For a single-user tracker, scheduled jobs and reminders are usually more valuable than forced WebSocket or SSE features.

#### Definition of Done

The phase is complete when the system reliably surfaces what the user should do next without requiring them to inspect every record manually.

---

### Phase 5 — Analytics and Decision Support

The final optional phase helps the user learn from completed applications.

#### Possible metrics

- applications submitted;
- response rate;
- interview rate;
- offer rate;
- average time to first response;
- average time spent in each pipeline stage;
- conversion by source;
- conversion by company type;
- conversion by role or technology;
- outcomes by CV version;
- reasons for rejection or withdrawal;
- follow-up effectiveness.

#### Possible decision-support features

- compare required technologies with the user's skill profile;
- highlight recurring missing skills;
- surface sources that generate interviews;
- identify companies with repeated activity;
- suggest overdue follow-ups;
- identify stalled applications;
- compare personal match scores with actual outcomes.

The first version of these features should use deterministic rules and transparent statistics. AI-based summaries can be explored later, but should not replace the underlying data or reasoning.

---

## 9. Technical learning value

The project is suitable as a learning backbone because it naturally supports:

- TypeScript domain modelling;
- React and Next.js rendering patterns;
- forms and validation;
- server actions or API route design;
- PostgreSQL relationships and queries;
- Prisma ORM (decided — zero-friction start; Drizzle remains a candidate for a later exploratory spike);
- TanStack Query;
- filtering, sorting, pagination, and search;
- authentication and authorization;
- accessible UI with Tailwind CSS and shadcn/ui;
- unit, integration, and end-to-end testing;
- background jobs and reminders;
- normalization of external data;
- deduplication;
- browser-extension or bookmarklet development;
- Docker and CI;
- deployment and environment management.

New technologies should be added only when the current product phase creates a genuine need for them.

One honest classification: assisted metadata extraction (Phase 3) is an **external HTTP integration** — fetching and parsing a page the user provided — not a true external *API* integration. It still teaches data normalization and deduplication, but it should not be counted as API-consumption experience. A real third-party API belongs in the product only when it solves a genuine product problem, not to complete a skills checklist.

---

## 10. Recommended implementation order

A practical implementation sequence is:

1. create companies;
2. create opportunities manually;
3. list and filter opportunities;
4. convert an opportunity into an application;
5. update application stages;
6. add next actions and deadlines;
7. add the application timeline;
8. add the dashboard;
9. add authentication;
10. add tests and workflow quality;
11. add company watchlists;
12. add Save from URL;
13. add metadata extraction and duplicate detection;
14. add bookmarklet or browser extension;
15. add reminders and automation;
16. add analytics.

Do not start with portal integration, scraping, a browser extension, Redis, realtime updates, or advanced analytics. The manual end-to-end workflow should work first.

**Study-plan window (first eight weeks): build only the essential spine** — minimal companies, opportunities, applications, opportunity-to-application conversion, pipeline stages, and next actions (roughly steps 1–10 above). Order *within* the spine follows the study plan's sprints, not the numbered list: Zod validation arrives in week 1 and tests precede authentication. Contacts, advanced tasks, company watchlists, URL imports, reminders, and analytics are deliberately deferred to the months after. Pacing is owned by the study plan's sprints; this document is the backlog they draw features from, never the calendar.

---

## 11. Product success criteria

The project is successful when:

- the user genuinely uses it during a job search;
- every active application has a clear current stage and next action;
- interesting vacancies from different Bulgarian sources can be captured consistently;
- no specific portal is a critical dependency;
- manual entry remains reliable;
- the user can explain the domain model and architecture in a technical interview;
- the application demonstrates more than generic CRUD by showing a complete workflow, history, validation, source normalization, deduplication, testing, and decision support.

---

## 12. One-sentence product description

> A personal job-search CRM for discovering or manually saving opportunities, tracking the complete hiring pipeline, managing companies, contacts, and follow-ups, and analyzing which job-search strategies produce results—without depending on fragile scraping or private portal APIs.
