import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Spinner } from '@/components/ui/spinner'
import { VerificationBadge } from './VerificationBadge'
import { cn } from '@/lib/utils'

interface MatchResultCardProps {
  mentorName: string
  compatibilityScore: number
  explanation: string
  expertise?: string[]
  availability?: string
  verified?: boolean
  onCreateRelationship: () => void
  isCreating?: boolean
}

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-chart-3' // Green
  if (score >= 60) return 'text-chart-5' // Yellow/Amber
  return 'text-chart-2' // Red
}

function getScoreBgColor(score: number): string {
  if (score >= 80) return 'bg-chart-3/10'
  if (score >= 60) return 'bg-chart-5/10'
  return 'bg-chart-2/10'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Strong Match'
  if (score >= 60) return 'Good Match'
  return 'Potential Match'
}

export function MatchResultCard({
  mentorName,
  compatibilityScore,
  explanation,
  expertise = [],
  availability,
  verified = false,
  onCreateRelationship,
  isCreating = false
}: MatchResultCardProps) {
  const scoreColor = getScoreColor(compatibilityScore)
  const scoreBgColor = getScoreBgColor(compatibilityScore)
  const scoreLabel = getScoreLabel(compatibilityScore)

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl">{mentorName}</CardTitle>
              <VerificationBadge verified={verified} />
            </div>
            {availability && (
              <CardDescription>
                Available: {availability}
              </CardDescription>
            )}
          </div>
          
          {/* Score Display */}
          <div className={cn('text-center px-4 py-2 rounded-lg', scoreBgColor)}>
            <div className={cn('text-3xl font-bold', scoreColor)}>
              {compatibilityScore}
            </div>
            <div className={cn('text-xs font-medium', scoreColor)}>
              {scoreLabel}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Explanation */}
        <p className="text-muted-foreground">{explanation}</p>

        {/* Expertise Tags */}
        {expertise.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {expertise.map(exp => (
              <Badge key={exp} variant="secondary">
                {exp}
              </Badge>
            ))}
          </div>
        )}

        {/* Action */}
        <div className="pt-2">
          <Button
            onClick={onCreateRelationship}
            disabled={isCreating}
            className="w-full sm:w-auto"
          >
            {isCreating ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Creating...
              </>
            ) : (
              'Create Relationship'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
