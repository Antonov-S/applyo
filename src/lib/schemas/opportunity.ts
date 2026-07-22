import * as z from "zod";

// preprocess
const optionalSalaryNumber = z.preprocess(value => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
}, z.number().nonnegative().optional());

const SalaryRangeSchema = z
  .object({
    min: optionalSalaryNumber,
    max: optionalSalaryNumber,
    currency: z.enum(["BGN", "EUR", "USD"]),
    period: z.enum(["hour", "month", "year"])
  })
  // preprocess
  .refine(({ min, max }) => min !== undefined || max !== undefined, {
    message: "At least one salary value is required",
    path: ["min"]
  })
  // preprocess
  .refine(
    ({ min, max }) => min === undefined || max === undefined || min <= max,
    {
      message: "Maximum salary must be greater than or equal to the minimum.",
      path: ["max"]
    }
  );

// preprocess
const OptionalSalaryRangeSchema = z.preprocess(value => {
  if (value === null || value === undefined) {
    return undefined;
  }

  if (typeof value !== "object") {
    return value;
  }

  const salary = value as Record<string, unknown>;

  const isEmpty = [
    salary.min,
    salary.max,
    salary.currency,
    salary.period
  ].every(field => field === "" || field === null || field === undefined);

  return isEmpty ? undefined : value;
}, SalaryRangeSchema.optional());

function getCurrentLocalDate() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60_000;

  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

const PublicationDateSchema = z
  .string()
  .min(1, { error: "Publication date is required" })
  // pipe
  .pipe(
    z.iso.date({
      error: "Publication date must be a valid date"
    })
  )
  .refine(date => date <= getCurrentLocalDate(), {
    error: "Publication date cannot be in the future"
  });

const DateDiscoveredSchema = z
  .string()
  .min(1, { error: "Discovered date is required" })
  // pipe
  .pipe(
    z.iso.date({
      error: "Discovered date must be a valid date"
    })
  )
  .refine(date => date <= getCurrentLocalDate(), {
    error: "Discovered date cannot be in the future"
  });

const PrioritySchema = z.enum(["low", "medium", "high"]);

// Deviations from the product concept's suggested Opportunity fields (docs §4.1):
//   • closingDate — DROPPED. DEV.BG / Jobs.bg / LinkedIn Jobs rarely publish a
//     reliable closing/expiry date, so in practice the field would almost always
//     be blank. Vacancy expiry is tracked manually via the "expired" status below.
//   • personal match score — RESHAPED into `profileMatchLevel` (strong/partial/weak)
//     instead of a 0–100 number: a coarse honest judgement beats fake precision.
// Every other suggested field is kept; the optional ones are portal data that is
// frequently missing (source, location, salaryRange, employmentType, seniority…).
const OpportunitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company name is required"),
  source: z.string().optional(),
  sourceUrl: z.url().optional(),
  location: z.string().optional(),
  workModel: z.enum(["remote", "hybrid", "on-site"]),
  employmentType: z.string().optional(),
  salaryRange: OptionalSalaryRangeSchema,
  description: z.string().min(1, "Description is required"),
  requiredTechnologies: z
    .array(z.string().trim().min(1, "Technology name cannot be empty"))
    .min(1, "At least one required technology is required"),
  preferredTechnologies: z.array(z.string().trim()).optional(),
  seniority: z.string().optional(),
  publicationDate: PublicationDateSchema,
  dateDiscovered: DateDiscoveredSchema,
  profileMatchLevel: z.enum(["strong", "partial", "weak"]),
  priority: PrioritySchema.default("medium"),
  notes: z.string().optional(),
  status: z.enum([
    "saved",
    "reviewing",
    "ready_to_apply",
    "ignored",
    "expired",
    "converted"
  ])
});

export type Opportunity = z.infer<typeof OpportunitySchema>;

export type OpportunityStatus = Opportunity["status"];
