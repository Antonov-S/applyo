## 2026-07-14 — Zod: Opportunity schema (spike)

- **Zod `refine`:** A condition such as `min === undefined || max === undefined || min <= max` accepts the object when at least one value is missing. It does not require both values to be present.
- **Optional nested object:** `salaryRange: Schema.optional()` allows the entire object to be omitted, but it does not prevent `salaryRange: {}`. A separate validation rule is required to ensure that at least `min` or `max` is provided.
- **Salary range validation:** Two separate rules are required: at least one value must be present, and when both values are present, `min <= max`.
