import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface RelationshipSummaryCardProps {
  summary: string
}

export function RelationshipSummaryCard({ summary }: RelationshipSummaryCardProps) {
  return (
    <Card className="border-border/50 bg-primary/5">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2 text-primary">
          <Lightbulb className="h-4 w-4" />
          AI Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground leading-relaxed">{summary}</p>
      </CardContent>
    </Card>
  )
}
