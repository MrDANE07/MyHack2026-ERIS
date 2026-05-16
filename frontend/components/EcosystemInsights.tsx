"use client"
export interface EcosystemInsightsProps {
  liveStats?: {
    total_relationships: number
    active_relationships: number
    total_interactions: number
    top_mentor_domains: string[]
  }
  staticInsights?: string[]
}

export default function EcosystemInsights({ liveStats, staticInsights }: EcosystemInsightsProps) {
  const stats = [
    {
      label: 'Total Relationships',
      value: liveStats?.total_relationships,
      color: 'bg-blue-500'
    },
    {
      label: 'Active',
      value: liveStats?.active_relationships,
      color: 'bg-emerald-500'
    },
    {
      label: 'Interactions',
      value: liveStats?.total_interactions,
      color: 'bg-amber-500'
    },
    {
      label: 'Domains',
      value: liveStats?.top_mentor_domains?.length,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="flex gap-6 bg-[#0a0f1a]/80 backdrop-blur-sm border border-white/10 rounded-xl px-5 py-4">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2.5">
          <span className={`w-2 h-2 rounded-full ${stat.color} animate-pulse`} />
          <span className="text-sm font-medium text-white/90">
            {stat.value ?? '—'}
          </span>
          <span className="text-xs text-gray-400">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
