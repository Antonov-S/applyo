import { NextRequest, NextResponse } from "next/server";
import type { Opportunity } from "@/lib/schemas/opportunity";

const MOCK: Opportunity[] = [
  {
    title: "Full Stack Engineer (React, Node & Nest)",
    company: "Tieto",
    workModel: "hybrid",
    description:
      "We are looking to hire a Senior Full Stack Engineer, who will play a key role in developing scalable web applications and backend-for-frontend services using React, TypeScript, Node.js, and NestJS. Working closely with cross-functional teams, you will help deliver reliable, user-focused healthcare solutions while contributing across the full software development lifecycle. The role combines hands-on engineering, collaboration, and continuous improvement, with strong emphasis on code quality, automated testing, maintainability, and Agile delivery practices.",
    requiredTechnologies: ["React", "TypeScript", "Node.js", "NestJS"],
    publicationDate: "04.07.2026",
    dateDiscovered: "06.07.2026",
    profileMatchLevel: "partial",
    priority: "low",
    status: "reviewing"
  },
  {
    title: "Software Engineer",
    company: "Experian",
    workModel: "hybrid",
    description:
      "We are seeking a Software Engineer to join our development team and contribute to the design, development, and maintenance of scalable backend and frontend services. You will support core platform functionality across team-owned services, working with technologies including Python, Java, and React.",
    requiredTechnologies: ["Python", "Java", " React"],
    publicationDate: "05.07.2026",
    dateDiscovered: "07.07.2026",
    profileMatchLevel: "weak",
    priority: "low",
    status: "saved"
  }
];

export async function GET(request: NextRequest) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const status = request.nextUrl.searchParams.get("status");

  const opportunities = status
    ? MOCK.filter(opportunity => opportunity.status === status)
    : MOCK;

  return NextResponse.json(opportunities);
}
