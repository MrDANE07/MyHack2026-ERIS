import { ArrowRight } from 'lucide-react'

export interface RelationshipOverviewProps {
  startupName: string
  mentorName: string
  compatibilityScore: number
  status: 'Created' | 'Active' | 'Completed' | 'Failed'
  createdAt: string
}

const statusConfig = {
  Created: {
    bg: 'bg-cyan-950/50',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30'
  },
  Active: {
    bg: 'bg-emerald-950/50',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  Completed: {
    bg: 'bg-white/5',
    text: 'text-muted-foreground',
    border: 'border-white/10'
  },
  Failed: {
    bg: 'bg-red-950/50',
    text: 'text-red-400',
    border: 'border-red-500/30'
  }
}

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  return 'text-red-400'
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

export default function RelationshipOverview({
  startupName,
  mentorName,
  compatibilityScore,
  status,
  createdAt
}: RelationshipOverviewProps) {
  const statusStyle = statusConfig[status]
  const scoreColor = getScoreColor(compatibilityScore)
  const formattedDate = formatDate(createdAt)

  return (
    <div className="flex items-center justify-between p-4 bg-card border border-white/[0.06] rounded-xl">
      <div className="flex items-center gap-3">
        <span className="text-white font-medium">{startupName}</span>
        <ArrowRight className="w-3.5 h-3.5 text-white/20" size={14} />
        <span className="text-white font-medium">{mentorName}</span>
      </div>

      <div className="flex items-center gap-4">
        <span className={`text-xs rounded-full px-2.5 py-0.5 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
          {status}
        </span>

        <span className="text-xs text-muted-foreground">
          Score: <span className={`font-medium ${scoreColor}`}>{compatibilityScore}</span>
        </span>

        <span className="text-xs text-muted-foreground/50">{formattedDate}</span>
      </div>
    </div>
  )
}
