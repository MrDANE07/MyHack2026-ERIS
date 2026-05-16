import { Badge } from '@/components/ui/badge'
import { VerificationBadge } from './VerificationBadge'

interface MentorCardProps {
  id: string
  name: string
  expertise: string[]
  preferred_stage: number
  availability: string
  verified: boolean
}

const stageLabels: Record<number, string> = {
  1: 'Pre-seed',
  2: 'Seed',
  3: 'Series A',
  4: 'Series B+',
}

export function MentorCard({
  name,
  expertise,
  preferred_stage,
  availability,
  verified
}: MentorCardProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>
            <VerificationBadge verified={verified} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Prefers Stage {preferred_stage}: {stageLabels[preferred_stage] || 'Unknown'}
          </p>
        </div>
        <Badge variant="outline" className="shrink-0">
          {availability}
        </Badge>
      </div>

      {/* Expertise */}
      <div>
        <span className="text-sm font-medium text-muted-foreground">Expertise</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {expertise.map(exp => (
            <Badge key={exp} variant="secondary">
              {exp}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
