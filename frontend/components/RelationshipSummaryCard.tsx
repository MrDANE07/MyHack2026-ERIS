import { Brain } from 'lucide-react'
import { Card } from '@/components/ui/card'

export interface RelationshipSummaryCardProps {
  summary: string | null
}

export default function RelationshipSummaryCard({ summary }: RelationshipSummaryCardProps) {
  return (
    <Card className="p-4 border-l-2 border-l-cyan-400/30">
      <div className="flex items-center gap-2 mb-2">
        <Brain size={14} className="text-cyan-400/60" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          AI Relationship Summary
        </span>
      </div>
      {summary !== null ? (
        <p className="text-sm leading-relaxed italic text-zinc-400">
          {summary}
        </p>
      ) : (
        <p className="text-sm text-muted-foreground/50">
          No summary yet. Submit an interaction to generate one.
        </p>
      )}
    </Card>
  )
}
