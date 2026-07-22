import type { Opportunity, OpportunityStatus } from "@/lib/schemas/opportunity";

export async function fetchOpportunities(
  status?: OpportunityStatus
): Promise<Opportunity[]> {
  const params = new URLSearchParams();

  if (status) {
    params.set("status", status);
  }

  const queryString = params.toString();

  const url = queryString
    ? `/api/opportunities?${queryString}`
    : "/api/opportunities";

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  return response.json();
}
