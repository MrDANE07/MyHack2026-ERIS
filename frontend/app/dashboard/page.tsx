"use client";

import { useRouter } from 'next/navigation';
import StartupCard from '@/components/StartupCard';
import EcosystemInsights from '@/components/EcosystemInsights';

const startup = {
  id: "startup_1",
  name: "NeuroFlow AI",
  domain: ["AI", "Healthcare"],
  stage: 2,
  needs: ["Fundraising", "B2B Sales"],
  goals: ["Product-Market Fit"],
  verified: true
};

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
      <h1 className="font-heading">Dashboard</h1>
      <div className="border-b border-white/5" />
      <EcosystemInsights liveStats={undefined} />
      <StartupCard
        {...startup}
        onGenerateMatches={() => router.push('/matching')}
      />
    </main>
  );
}
