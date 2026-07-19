import type { Opportunity } from "@/lib/schemas/opportunity";

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const response = await fetch("/api/opportunities");

  if (!response.ok) {
    throw new Error("Failed to load opportunities");
  }

  return response.json();
}
