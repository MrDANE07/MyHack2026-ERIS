import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Programme } from '@/lib/types'
import { MapPin, Users } from 'lucide-react'

interface ProgrammeCardProps extends Programme {}

function getStatusStyles(status: Programme['status']): string {
  switch (status) {
    case 'Active': return 'bg-chart-3/10 text-chart-3 border-chart-3/30'
    case 'Completed': return 'bg-muted text-muted-foreground border-border'
    case 'Upcoming': return 'bg-chart-1/10 text-chart-1 border-chart-1/30'
    default: return 'bg-muted text-muted-foreground border-border'
  }
}

export function ProgrammeCard({
  name,
  country,
  focus_areas,
  status,
  cohort_size
}: ProgrammeCardProps) {
  return (
    <Card className="border-border/50 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight">{name}</CardTitle>
            <CardDescription className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {country}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {cohort_size} startups
              </span>
            </CardDescription>
          </div>
          <Badge className={cn('border shrink-0', getStatusStyles(status))}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <span className="text-sm font-medium text-muted-foreground">Focus Areas</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {focus_areas.map(area => (
              <Badge key={area} variant="secondary">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
