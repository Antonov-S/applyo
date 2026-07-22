"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchOpportunities } from "@/lib/api/opportunities";
import type { OpportunityStatus } from "@/lib/schemas/opportunity";

const statuses: OpportunityStatus[] = [
  "saved",
  "reviewing",
  "ready_to_apply",
  "ignored",
  "expired",
  "converted"
];

export default function OpportunitiesList() {
  const [status, setStatus] = useState<OpportunityStatus | undefined>(
    undefined
  );

  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["opportunities", "list", { status }],
    queryFn: () => fetchOpportunities(status),
    staleTime: 20_000
  });

  return (
    <section>
      <label>
        Status:{" "}
        <select
          value={status ?? ""}
          onChange={event => {
            const selectedStatus = event.target.value;

            setStatus(
              selectedStatus === ""
                ? undefined
                : (selectedStatus as OpportunityStatus)
            );
          }}
        >
          <option value="">All</option>

          {statuses.map(statusOption => (
            <option key={statusOption} value={statusOption}>
              {statusOption}
            </option>
          ))}
        </select>
      </label>

      {isPending && <p>Loading…</p>}

      {isError && <p>{error.message}</p>}

      {!isPending && !isError && (
        <>
          {isFetching && <p>Updating…</p>}

          <ul>
            {data.map(opportunity => (
              <li key={opportunity.title}>{opportunity.title}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
