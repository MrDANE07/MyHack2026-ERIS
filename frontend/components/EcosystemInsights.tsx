import { Badge } from '@/components/ui/badge'
import type { EcosystemStats } from '@/lib/types'
import { TrendingUp, Users, MessageCircle, Award, Activity } from 'lucide-react'

interface EcosystemInsightsProps {
  liveStats?: EcosystemStats
  staticInsights: string[]
}

export function EcosystemInsights({
  liveStats,
  staticInsights
}: EcosystemInsightsProps) {
  return (
    <div className="glass-card p-6 hover-glow h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="relative">
          <Activity className="h-6 w-6 text-accent" />
          <div className="absolute inset-0 bg-accent/30 blur-lg" />
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-wide">Ecosystem Intel</h2>
          <span className="data-id">Live Data Feed</span>
        </div>
        <span className="bio-dot bio-dot-amber ml-auto" />
      </div>

      {/* Live Stats */}
      {liveStats && (
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={Users}
            value={liveStats.total_relationships}
            label="Relationships"
            color="teal"
          />
          <StatCard
            icon={TrendingUp}
            value={liveStats.active_relationships}
            label="Active"
            color="violet"
          />
          <StatCard
            icon={MessageCircle}
            value={liveStats.total_interactions}
            label="Interactions"
            color="amber"
          />
          <StatCard
            icon={Award}
            value={liveStats.top_mentor_domains.length}
            label="Domains"
            color="teal"
          />
        </div>
      )}

      {/* Top Domains */}
      {liveStats && liveStats.top_mentor_domains.length > 0 && (
        <div className="mb-6 pb-6 border-b border-border/30">
          <span className="data-label">Top Mentor Expertise</span>
          <div className="flex flex-wrap gap-2 mt-3">
            {liveStats.top_mentor_domains.map(domain => (
              <Badge 
                key={domain} 
                variant="secondary" 
                className="font-mono text-xs bg-secondary/10 text-secondary border border-secondary/30"
              >
                {domain}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Static Insights */}
      <div className="space-y-3">
        <span className="data-label">System Analysis</span>
        {staticInsights.map((insight, index) => (
          <div key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="font-mono text-primary text-xs mt-0.5 glow-teal">
              [{String(index + 1).padStart(2, '0')}]
            </span>
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  value,
  label,
  color
}: {
  icon: React.ElementType
  value: number
  label: string
  color: 'teal' | 'violet' | 'amber'
}) {
  const colorClasses = {
    teal: {
      icon: 'text-[hsl(166,100%,50%)]',
      value: 'glow-teal',
      border: 'border-[hsl(166,100%,50%)]/20',
      bg: 'bg-[hsl(166,100%,50%)]/5'
    },
    violet: {
      icon: 'text-[hsl(275,100%,69%)]',
      value: 'glow-violet',
      border: 'border-[hsl(275,100%,69%)]/20',
      bg: 'bg-[hsl(275,100%,69%)]/5'
    },
    amber: {
      icon: 'text-[hsl(38,100%,59%)]',
      value: 'glow-amber',
      border: 'border-[hsl(38,100%,59%)]/20',
      bg: 'bg-[hsl(38,100%,59%)]/5'
    }
  }

  const styles = colorClasses[color]

  return (
    <div className={`relative p-3 rounded-lg border ${styles.border} ${styles.bg} backdrop-blur-sm`}>
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${styles.icon}`} />
        <span className={`text-xl font-bold font-mono number-pulse ${styles.value}`}>
          {value}
        </span>
      </div>
      <span className="data-label">{label}</span>
    </div>
  )
}
