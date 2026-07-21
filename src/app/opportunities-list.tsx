"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchOpportunities } from "@/lib/api/opportunities";

export default function OpportunitiesList() {
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["opportunities"],
    queryFn: fetchOpportunities,
    staleTime: 20_000
  });

  if (isPending) {
    return <p>Loading…</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  return (
    <section>
      {isFetching && <p>Updating…</p>}

      <ul>
        {data.map(opportunity => (
          <li key={opportunity.title}>{opportunity.title}</li>
        ))}
      </ul>
    </section>
  );
}
