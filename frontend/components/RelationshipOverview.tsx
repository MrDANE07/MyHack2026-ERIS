import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Relationship } from '@/lib/types'

interface RelationshipOverviewProps {
  startupName: string
  mentorName: string
  compatibilityScore: number
  status: Relationship['status']
  createdAt: string
}

function getStatusColor(status: Relationship['status']): string {
  switch (status) {
    case 'Created': return 'bg-muted text-muted-foreground'
    case 'Active': return 'bg-chart-3/10 text-chart-3 border-chart-3/30'
    case 'Completed': return 'bg-chart-1/10 text-chart-1 border-chart-1/30'
    case 'Failed': return 'bg-chart-2/10 text-chart-2 border-chart-2/30'
    default: return 'bg-muted text-muted-foreground'
  }
}

export function RelationshipOverview({
  startupName,
  mentorName,
  compatibilityScore,
  status,
  createdAt
}: RelationshipOverviewProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">
              {startupName}
              <span className="text-muted-foreground mx-2">×</span>
              {mentorName}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Established {formattedDate}
            </p>
          </div>
          <Badge className={cn('border', getStatusColor(status))}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-chart-1">{compatibilityScore}</div>
            <div className="text-sm text-muted-foreground">Compatibility</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {status === 'Active' ? 'Ongoing' : status}
            </div>
            <div className="text-sm text-muted-foreground">Status</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-chart-3">
              {Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24 * 7))}
            </div>
            <div className="text-sm text-muted-foreground">Weeks</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
