"use client"

import ProgrammeCard from '@/components/ProgrammeCard';
import EcosystemInsights from '@/components/EcosystemInsights';

const programmes = [
  {
    id: "prog_1",
    name: "Cradle CIP Accelerate 2026 — Malaysia",
    country: "Malaysia",
    focus_areas: ["AI", "Healthcare", "FinTech"],
    status: "Active" as const,
    cohort_size: 12
  },
  {
    id: "prog_2",
    name: "Cradle GENESIS 2025 — Singapore",
    country: "Singapore",
    focus_areas: ["SaaS", "B2B", "Enterprise"],
    status: "Completed" as const,
    cohort_size: 8
  }
];

const partners = [
  { name: "Sunway Group", type: "Corporate", country: "Malaysia" },
  { name: "MDEC", type: "Government", country: "Malaysia" }
];

const serviceProviders = [
  { name: "LegalEase MY", services: ["Company Incorporation", "IP Filing"] },
  { name: "CloudScale Asia", services: ["Cloud Infrastructure", "DevOps"] }
];

export default function ProgrammesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-10">
      <h1 className="font-heading text-3xl font-semibold text-white">
        Programmes & Partners
      </h1>

      <EcosystemInsights liveStats={undefined} />

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium text-white">
          Accelerator Programmes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programmes.map((programme) => (
            <ProgrammeCard key={programme.id} {...programme} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium text-white">
          Ecosystem Partners
        </h2>
        <div className="flex flex-col gap-3">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-card border border-white/6 rounded-lg cursor-pointer hover:bg-white/5 transition-colors duration-200"
            >
              <span className="text-sm text-white font-medium">
                {partner.name}
              </span>
              <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                {partner.type}
              </span>
              <span className="text-xs text-white/60 ml-auto">
                {partner.country}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl font-medium text-white">
          Service Providers
        </h2>
        <div className="flex flex-col gap-3">
          {serviceProviders.map((provider, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-card border border-white/6 rounded-lg cursor-pointer hover:bg-white/5 transition-colors duration-200"
            >
              <span className="text-sm text-white font-medium">
                {provider.name}
              </span>
              <div className="flex items-center gap-2 ml-auto">
                {provider.services.map((service, serviceIndex) => (
                  <span
                    key={serviceIndex}
                    className="text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
